# x402 Runtime Payment Flow

Step-by-step recipe for you (the Agent) to pay for x402-protected resources using Algorand MCP tools.

---

## Step 1: Detect 402 and decode the challenge

Make the initial request with `curl`, capturing the **response headers** — on current
servers the payment challenge travels in the `PAYMENT-REQUIRED` header and the body is
just `{}`:

```bash
curl -s -D /tmp/x402_headers.txt -w "\n%{http_code}" <url>
```

If the HTTP status is `402`:

1. Look for a `PAYMENT-REQUIRED` header in the captured headers. Base64-decode its
   value → the PaymentRequired JSON (`x402Version`, `accepts[]`).
2. **Fallback (older servers only):** if there is no such header, the JSON is in the
   response body instead.

```bash
grep -i "^payment-required" /tmp/x402_headers.txt | sed 's/^[^:]*: //' | tr -d '\r' | base64 -d
```

---

## Step 2: Parse PaymentRequirements

From the decoded PaymentRequired JSON, take the `accepts` array. **It is often
multi-chain** (Algorand + EVM + SVM entries) — choose the entry whose `network`
starts with `algorand:`. Store it as `chosen`. A real V2 entry looks like:

```json
{
  "scheme": "exact",
  "network": "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
  "amount": "1000",
  "asset": "10458941",
  "payTo": "RECEIVER_ADDRESS",
  "maxTimeoutSeconds": 300,
  "extra": {
    "name": "USDC",
    "decimals": 6,
    "feePayer": "FACILITATOR_ADDRESS"
  }
}
```

Extract these values:
- `network_caip2` = `chosen.network`
- `amount` = `chosen.amount` (as integer) — **V2 field name.** If absent, this is a V1
  response: use `chosen.maxAmountRequired` instead.
- `payTo` = `chosen.payTo`
- `asset` = `chosen.asset`
- `feePayer` = `chosen.extra.feePayer`
- `is_algo` = `asset == "0"`

**Save the entire `chosen` object** — you need it verbatim in the PAYMENT-SIGNATURE
header (verbatim also preserves campaign tags like `extra.tag`, which is how tagged
traffic gets counted).

---

## Step 3: Map CAIP-2 to MCP Network

Match by **prefix** — some SDKs advertise the CAIP-spec truncated reference (first 32
URL-safe characters of the genesis hash) instead of the full base64 hash:

| `network` after `algorand:` starts with | MCP `network` parameter |
|------------------------------------------|-------------------------|
| `SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe` | `"testnet"` |
| `wGHE2Pwdvd7S12BL5FaOP20EGYesN73k` | `"mainnet"` |

If mainnet, **confirm with the user** before proceeding — real funds.

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
- `accepted` = **exact copy** of the `accepts[]` entry you chose — all fields including `scheme`, `network`, `amount`, `payTo`, `asset`, `extra`, etc. Without this, the server rejects.

Base64-encode the entire JSON string for the HTTP header.

---

## Step 12: Retry with Payment and Report the Result

```bash
curl -s -D /tmp/x402_paid_headers.txt -H "PAYMENT-SIGNATURE: $(echo '<JSON from step 11>' | base64)" <url>
```

The server:
1. Decodes the `PAYMENT-SIGNATURE` header
2. Forwards the payment group to the facilitator
3. Facilitator simulates, signs fee payer, submits atomically
4. Server returns HTTP 200 with the protected resource

**On success, decode the settle result** from the `PAYMENT-RESPONSE` response header
(older servers: `X-PAYMENT-RESPONSE`) — base64 JSON containing `success`,
`transaction` (the on-chain txn id), `network`, and `payer`. **Report the txn id to
the user.** On MainNet you can also offer the receipt:
`https://facilitator.goplausible.xyz/api/receipt/<txn id>`.

If you get another 402, the payment was rejected — check the error message.

---

## Error Handling

| Error | Cause | Recovery |
|-------|-------|----------|
| No `accepts` in body | Current servers put the challenge in the `PAYMENT-REQUIRED` header | Decode that header (Step 1) |
| `amount` missing | V1 response | Use `maxAmountRequired` instead |
| No active wallet account | Wallet not configured | `wallet_add_account` |
| Asset not opted in | Wallet hasn't opted into the ASA | `wallet_optin_asset` |
| Insufficient balance | Not enough ALGO/USDC | Inform user, show balance vs required |
| Invalid network | CAIP-2 identifier not recognized | Prefix-match per the mapping table (handles truncated form) |
| Simulation failed | Transaction would fail on-chain | Check balances, opt-in, group structure |
| Missing `accepted` field | PAYMENT-SIGNATURE lacks `accepted` | Add verbatim copy of chosen `accepts[]` entry |
| Second 402 after retry | Payment rejected by server/facilitator | Check error in response body, do not retry again |

---

## Worked Example

Accessing `https://example.x402.goplausible.xyz/avm/weather` on testnet with USDC:

### Initial request
```bash
curl -s -D /tmp/x402_headers.txt -w "\n%{http_code}" https://example.x402.goplausible.xyz/avm/weather
```
Response: status 402, body `{}`. Decode the `PAYMENT-REQUIRED` header → PaymentRequired
JSON whose `accepts` has three entries (Algorand, EVM, SVM). Choose the `algorand:` one.

### Parse (real values from this endpoint)
- `network_caip2` = `"algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI="` → `mcp_network` = `"testnet"`
- `amount` = `1000` (0.001 USDC)
- `payTo` = `"MPY54CLPH2OKEGC6S5N2LDAFDNO5BVNV532NBZ5VD6GOND3STPNXZYXOFE"`
- `asset` = `"10458941"` (testnet USDC)
- `feePayer` = `"ZMFK2OI7ZBD2U27ISERZC4S6LKM6WMFJPZQ4MYNJDZ2VNBNMBA67RA22AA"` (from `extra.feePayer`)

### MCP tool calls (in order)
1. `wallet_get_info { "network": "testnet" }` → address: `CCCC...`
2. `api_algod_get_account_asset_info { "address": "CCCC...", "assetId": 10458941, "network": "testnet" }` → opted in, balance: 5000000
3. `make_payment_txn { "from": "ZMFK2...", "to": "ZMFK2...", "amount": 0, "fee": 2000, "flatFee": true, "network": "testnet" }` → fee_payer_txn
4. `make_asset_transfer_txn { "from": "CCCC...", "to": "MPY54...", "assetIndex": 10458941, "amount": 1000, "fee": 0, "flatFee": true, "network": "testnet" }` → payment_txn
5. `assign_group_id { "transactions": [fee_payer_txn, payment_txn] }` → [grouped_fee_payer, grouped_payment]
6. `wallet_sign_transaction { "transaction": grouped_payment, "network": "testnet" }` → signed_payment_base64
7. `encode_unsigned_transaction { "transaction": grouped_fee_payer }` → unsigned_fee_payer_base64

### Construct header, retry, report
Build PAYMENT-SIGNATURE JSON with `paymentGroup: [unsigned_fee_payer_base64, signed_payment_base64]`, `paymentIndex: 1`, and the full `accepted` object. Base64-encode and retry with `curl -H`.

Response: 200 with weather data. Decode the `PAYMENT-RESPONSE` header → `{ "success": true, "transaction": "<txn id>", "network": "algorand:SGO1...", "payer": "CCCC..." }` — report the txn id to the user.
