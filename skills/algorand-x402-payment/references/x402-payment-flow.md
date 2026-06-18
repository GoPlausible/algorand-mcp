# x402 Runtime Payment Flow

Step-by-step recipe for you (the Agent) to pay for x402-protected resources using Algorand MCP tools.

---

## Step 1: Detect 402

Make the initial request with `curl`:

```
curl -s -w "\n%{http_code}" <url>
```

If the HTTP status is `402` and the body contains `"x402Version"` and `"accepts"`, this is an x402-protected resource. Parse the JSON body.

---

## Step 2: Parse PaymentRequirements

From the 402 response body, extract the `accepts` array. Choose an entry that matches a supported network and asset. Store it as `chosen`:

```json
{
  "scheme": "exact",
  "network": "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
  "maxAmountRequired": "1000000",
  "payTo": "RECEIVER_ADDRESS",
  "asset": "10458941",
  "extra": {
    "name": "USDC",
    "decimals": 6,
    "feePayer": "FACILITATOR_ADDRESS"
  }
}
```

Extract these values:
- `network_caip2` = `chosen.network`
- `amount` = `chosen.maxAmountRequired` (as integer)
- `payTo` = `chosen.payTo`
- `asset` = `chosen.asset`
- `feePayer` = `chosen.extra.feePayer`
- `is_algo` = `asset == "0"`

**Save the entire `chosen` object** — you need it verbatim in the PAYMENT-SIGNATURE header.

---

## Step 3: Map CAIP-2 to MCP Network

| CAIP-2 genesis hash | MCP `network` parameter |
|----------------------|-------------------------|
| `SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=` | `"testnet"` |
| `wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=` | `"mainnet"` |

Extract the hash after `algorand:` and match. If mainnet, **confirm with the user** before proceeding — real funds.

---

## Step 4: Check Wallet

```
wallet_get_info { "network": "<mcp_network>" }
```

Verify:
- An active account exists
- Note the wallet `address` for subsequent steps

**If no account**: Guide user to `wallet_add_account`.

---

## Step 5: Check Asset Opt-In (ASA only)

Skip this step if `is_algo` is true (native ALGO needs no opt-in).

```
api_algod_get_account_asset_info {
  "address": "<wallet_address>",
  "assetId": <asset>,
  "network": "<mcp_network>"
}
```

**If not opted in**, opt in first:
```
wallet_optin_asset {
  "assetId": <asset>,
  "network": "<mcp_network>"
}
```

Also verify the wallet has sufficient balance for the payment amount.

---

## Step 6: Build Fee Payer Transaction

The facilitator sponsors fees for the entire atomic group. The fee payer transaction's fee must equal **N × 1000 µAlgo**, where N is the total number of transactions in the group. For the standard 2-transaction x402 group: fee = 2 × 1000 = **2000 µAlgo**.

```
make_payment_txn {
  "from": "<feePayer>",
  "to": "<feePayer>",
  "amount": 0,
  "fee": 2000,
  "flatFee": true,
  "network": "<mcp_network>"
}
```

> **CRITICAL**: The fee payer's `fee` MUST cover ALL transactions in the group (N × 1000 µAlgo minimum). Setting fee=0 or fee=1000 on the fee payer causes: `"txgroup had 0 in fees, which is less than the minimum 2 * 1000"`. Every other transaction in the group MUST have fee=0.
> `flatFee: true` is required on BOTH transactions — without it, the SDK overrides fees automatically.

Save the returned transaction object as `fee_payer_txn`.

---

## Step 7: Build Payment Transaction

**For native ALGO** (asset = "0"):
```
make_payment_txn {
  "from": "<wallet_address>",
  "to": "<payTo>",
  "amount": <amount>,
  "fee": 0,
  "flatFee": true,
  "network": "<mcp_network>"
}
```

**For ASA** (USDC or other):
```
make_asset_transfer_txn {
  "from": "<wallet_address>",
  "to": "<payTo>",
  "assetIndex": <asset>,
  "amount": <amount>,
  "fee": 0,
  "flatFee": true,
  "network": "<mcp_network>"
}
```

> `fee: 0` + `flatFee: true` ensures the fee payer covers this transaction's fee.

Save the returned transaction object as `payment_txn`.

---

## Step 8: Assign Group ID

Group both transactions atomically. **Order matters**: fee payer at index 0, payment at index 1.

```
assign_group_id {
  "transactions": [<fee_payer_txn>, <payment_txn>]
}
```

The tool returns both transactions with matching `groupID` fields. Save them as `grouped_fee_payer` (index 0) and `grouped_payment` (index 1).

---

## Step 9: Sign Payment Transaction Only (Index 1)

Sign only the payment transaction using the wallet:

```
wallet_sign_transaction {
  "transaction": <grouped_payment>,
  "network": "<mcp_network>"
}
```

Returns a signed transaction blob (base64 encoded). Save as `signed_payment_base64`.

> **Do NOT sign the fee payer transaction** — the facilitator signs it server-side during settlement.

---

## Step 10: Encode Unsigned Fee Payer (Index 0)

Encode the fee payer transaction to base64 msgpack bytes:

```
encode_unsigned_transaction {
  "transaction": <grouped_fee_payer>
}
```

Returns base64-encoded unsigned transaction bytes. Save as `unsigned_fee_payer_base64`.

---

## Step 11: Construct PAYMENT-SIGNATURE

Build this JSON object:

```json
{
  "x402Version": 2,
  "scheme": "exact",
  "network": "<network_caip2 from step 2>",
  "payload": {
    "paymentGroup": [
      "<unsigned_fee_payer_base64>",
      "<signed_payment_base64>"
    ],
    "paymentIndex": 1
  },
  "accepted": <the entire chosen object from step 2, copied verbatim>
}
```

**Critical rules**:
- `paymentGroup[0]` = unsigned fee payer (index 0)
- `paymentGroup[1]` = signed payment (index 1)
- `paymentIndex` = `1` (the payment transaction)
- `accepted` = **exact copy** of the `accepts[]` entry you chose — all fields including `scheme`, `network`, `maxAmountRequired`, `payTo`, `asset`, `extra`, etc. Without this, the server rejects.

Base64-encode the entire JSON string for the HTTP header.

---

## Step 12: Retry with Payment

```bash
curl -s -H "PAYMENT-SIGNATURE: $(echo '<JSON from step 11>' | base64)" <url>
```

The server:
1. Decodes the `PAYMENT-SIGNATURE` header
2. Forwards the payment group to the facilitator
3. Facilitator simulates, signs fee payer, submits atomically
4. Server returns HTTP 200 with the protected resource

If you get another 402, the payment was rejected — check the error message.

---

## Error Handling

| Error | Cause | Recovery |
|-------|-------|----------|
| No active wallet account | Wallet not configured | `wallet_add_account` |
| Asset not opted in | Wallet hasn't opted into the ASA | `wallet_optin_asset` |
| Insufficient balance | Not enough ALGO/USDC | Inform user, show balance vs required |
| Invalid network | CAIP-2 identifier not recognized | Check mapping table |
| Simulation failed | Transaction would fail on-chain | Check balances, opt-in, group structure |
| Missing `accepted` field | PAYMENT-SIGNATURE lacks `accepted` | Add verbatim copy of chosen `accepts[]` entry |
| Second 402 after retry | Payment rejected by server/facilitator | Check error in response body, do not retry again |

---

## Worked Example

Accessing `https://example.x402.goplausible.xyz/weather` on testnet with USDC:

### Initial request
```bash
curl -s -w "\n%{http_code}" https://example.x402.goplausible.xyz/weather
```
Response: 402 with `accepts` containing USDC payment on testnet.

### Parse
- `network_caip2` = `"algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI="`
- `mcp_network` = `"testnet"`
- `amount` = `100` (0.0001 USDC)
- `payTo` = `"AAAA..."` (from response)
- `asset` = `"10458941"` (testnet USDC)
- `feePayer` = `"BBBB..."` (from `extra.feePayer`)

### MCP tool calls (in order)
1. `wallet_get_info { "network": "testnet" }` → address: `CCCC...`
2. `api_algod_get_account_asset_info { "address": "CCCC...", "assetId": 10458941, "network": "testnet" }` → opted in, balance: 5000000
3. `make_payment_txn { "from": "BBBB...", "to": "BBBB...", "amount": 0, "fee": 2000, "flatFee": true, "network": "testnet" }` → fee_payer_txn
4. `make_asset_transfer_txn { "from": "CCCC...", "to": "AAAA...", "assetIndex": 10458941, "amount": 100, "fee": 0, "flatFee": true, "network": "testnet" }` → payment_txn
5. `assign_group_id { "transactions": [fee_payer_txn, payment_txn] }` → [grouped_fee_payer, grouped_payment]
6. `wallet_sign_transaction { "transaction": grouped_payment, "network": "testnet" }` → signed_payment_base64
7. `encode_unsigned_transaction { "transaction": grouped_fee_payer }` → unsigned_fee_payer_base64

### Construct header and retry
Build PAYMENT-SIGNATURE JSON with `paymentGroup: [unsigned_fee_payer_base64, signed_payment_base64]`, `paymentIndex: 1`, and the full `accepted` object. Base64-encode and retry with `curl -H`.

Response: 200 with weather data.
