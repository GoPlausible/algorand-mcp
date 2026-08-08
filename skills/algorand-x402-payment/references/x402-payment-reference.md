# x402 Payment Protocol Reference

## Protocol Headers at a Glance

| Direction | V2 header | V1 header (legacy) | Content |
|-----------|-----------|--------------------|---------|
| Server → client (402 challenge) | `PAYMENT-REQUIRED` | JSON in response body | Base64 PaymentRequired JSON |
| Client → server (payment) | `PAYMENT-SIGNATURE` | `X-PAYMENT` | Base64 PaymentPayload JSON |
| Server → client (settle result) | `PAYMENT-RESPONSE` | `X-PAYMENT-RESPONSE` | Base64 SettleResponse JSON |

Current servers send the 402 challenge in the `PAYMENT-REQUIRED` header with a body of
`{}` — always check the header first and treat body JSON as the legacy fallback.

---

## PAYMENT-SIGNATURE Header

HTTP header name: `PAYMENT-SIGNATURE`
Header value: Base64-encoded JSON string of the payment payload.

### PaymentPayload Schema

```json
{
  "x402Version": 2,
  "scheme": "exact",
  "network": "<CAIP-2 network identifier>",
  "payload": {
    "paymentGroup": [
      "<base64 unsigned fee payer txn (index 0)>",
      "<base64 signed payment txn (index 1)>"
    ],
    "paymentIndex": 1
  },
  "accepted": { "<verbatim copy of the chosen accepts[] entry>" }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `x402Version` | `number` | Always `2` for V2 protocol |
| `scheme` | `string` | Always `"exact"` for Algorand |
| `network` | `string` | CAIP-2 network identifier from `accepts[]` |
| `payload.paymentGroup` | `string[]` | Array of base64-encoded msgpack transaction bytes |
| `payload.paymentIndex` | `number` | Index of the payment transaction in the group (`1`) |
| `accepted` | `object` | **Required.** Exact copy of the chosen `accepts[]` entry. Without this, the server rejects with 402. The verbatim copy also preserves campaign tags (`extra.tag`). |

---

## 402 Challenge (PaymentRequired V2)

Delivered base64-encoded in the **`PAYMENT-REQUIRED` response header** (body is `{}`
on current servers; legacy servers put this JSON in the body instead):

```json
{
  "x402Version": 2,
  "error": "Payment required",
  "resource": {
    "url": "https://api.example.com/data",
    "description": "Premium weather data",
    "mimeType": "application/json"
  },
  "accepts": [
    {
      "scheme": "exact",
      "network": "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
      "amount": "1000",
      "asset": "10458941",
      "payTo": "ALGORAND_ADDRESS_58_CHARS",
      "maxTimeoutSeconds": 300,
      "extra": {
        "name": "USDC",
        "decimals": 6,
        "feePayer": "FACILITATOR_ADDRESS_58_CHARS"
      }
    }
  ]
}
```

`accepts` is often **multi-chain** (Algorand + EVM + SVM entries) — select the entry
whose `network` starts with `algorand:`.

### PaymentRequirements Fields (V2)

| Field | Type | Description |
|-------|------|-------------|
| `scheme` | `string` | Payment scheme — `"exact"` for Algorand |
| `network` | `string` | CAIP-2 identifier for the target network |
| `amount` | `string` | Amount in atomic units (e.g., `"1000000"` = 1 USDC). **V1 called this `maxAmountRequired`** — fall back to that name if `amount` is absent. |
| `payTo` | `string` | 58-character Algorand address to receive payment |
| `asset` | `string` | `"0"` for native ALGO, or ASA ID as string |
| `maxTimeoutSeconds` | `number` | Transaction validity window in seconds |
| `extra.name` | `string` | Token name (e.g., `"USDC"`) |
| `extra.decimals` | `number` | Token decimals (e.g., `6`) |
| `extra.feePayer` | `string` | Facilitator address that sponsors transaction fees |
| `extra.tag` | `string` | Optional campaign tag (e.g. hackathons) — preserved automatically by the verbatim `accepted` copy |

---

## PAYMENT-RESPONSE Header (settle result)

On a successful paid request the server returns HTTP 200 with the protected resource
**and** a `PAYMENT-RESPONSE` header (legacy: `X-PAYMENT-RESPONSE`) — base64 JSON:

```json
{
  "success": true,
  "transaction": "ON_CHAIN_TXN_ID",
  "network": "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
  "payer": "PAYER_ADDRESS"
}
```

Always decode it and report the `transaction` id to the user. On MainNet a shareable
receipt is available at `https://facilitator.goplausible.xyz/api/receipt/<transaction>`.

---

## CAIP-2 Network Identifiers

[CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) format: `algorand:<genesis hash reference>`

Two reference forms exist in the wild — the x402 full base64 genesis hash, and the
CAIP/CASA-spec **truncated** form (first 32 characters of the URL-safe base64 hash),
used by some SDK constants. **Match by prefix**, never by exact string:

| Network | Full form | Truncated form | MCP `network` param |
|---------|-----------|----------------|---------------------|
| Testnet | `algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=` | `algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe` | `"testnet"` |
| Mainnet | `algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=` | `algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73k` | `"mainnet"` |

V1 legacy identifiers (`algorand-testnet`, `algorand-mainnet`) are mapped automatically by servers.

---

## Asset Configuration

| Asset | Testnet ASA ID | Mainnet ASA ID | Decimals | 1 whole token = |
|-------|---------------|----------------|----------|-----------------|
| ALGO | `0` (native) | `0` (native) | 6 | 1,000,000 atomic units |
| USDC | `10458941` | `31566704` | 6 | 1,000,000 atomic units |

`amount` is always in **atomic units** (base units). For USDC with 6 decimals: `"1000000"` = 1.00 USDC. Only pay with an asset actually offered in `accepts[]`.

---

## Fee Abstraction (Atomic Transaction Group)

The x402 payment uses a 2-transaction atomic group where the facilitator pays all fees:

| Index | Transaction | Sender | Receiver | Amount | Fee | Signed by |
|-------|------------|--------|----------|--------|-----|-----------|
| 0 | Fee payer | Facilitator | Facilitator | 0 | 2000 µAlgo | Facilitator (server-side) |
| 1 | Payment | Client (you) | payTo | from requirements | 0 | Client (wallet) |

- Both transactions share the same `groupID` — they execute atomically (all-or-nothing)
- **Fee formula**: Fee payer fee = **N × 1000 µAlgo** (where N = total transactions in group). For 2-txn group: 2 × 1000 = 2000 µAlgo. All other txns have fee=0.
- `flatFee: true` **must** be set on both — pass `fee` and `flatFee` directly as parameters to `make_*_txn` tools.
- The client sends the fee payer transaction **unsigned** — the facilitator signs it during settlement

---

## Facilitator

Public facilitator: `https://facilitator.goplausible.xyz`

The facilitator:
1. Receives the payment group from the resource server
2. Simulates the atomic group to verify validity
3. Signs the fee payer transaction (index 0)
4. Submits both transactions to the Algorand network
5. Confirms finality (~3 seconds)

The facilitator address comes from `extra.feePayer` in the PaymentRequirements.

---

## V1 vs V2 Differences

IMPORTANT: YOU MUST USE V2 ALWAYS! V1 is deprecated and may be removed without notice. V2 has critical differences:

| Aspect | V1 | V2 |
|--------|----|----|
| 402 challenge location | JSON response body | **`PAYMENT-REQUIRED` header** (base64) |
| Payment header | `X-PAYMENT` | `PAYMENT-SIGNATURE` |
| Settle-result header | `X-PAYMENT-RESPONSE` | `PAYMENT-RESPONSE` |
| Amount field | `maxAmountRequired` | **`amount`** |
| Network identifiers | `"algorand-testnet"` | CAIP-2: `"algorand:SGO1..."` |
| `x402Version` | `1` | `2` |
| `accepted` field | Not required | **Required** in payment header |
| Requirements entry | Carries `resource`, `mimeType`, `outputSchema` | Lean — resource info lives at the top level of PaymentRequired |
