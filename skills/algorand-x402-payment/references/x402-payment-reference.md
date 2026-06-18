# x402 Payment Protocol Reference

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
| `accepted` | `object` | **Required.** Exact copy of the chosen `accepts[]` entry. Without this, the server rejects with 402. |

---

## 402 Response Body (PaymentRequired V2)

When a server returns HTTP 402, the JSON body contains:

```json
{
  "x402Version": 2,
  "resource": {
    "url": "/api/data",
    "description": "Premium weather data",
    "mimeType": "application/json"
  },
  "accepts": [
    {
      "scheme": "exact",
      "network": "algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=",
      "maxAmountRequired": "1000000",
      "resource": "/api/data",
      "description": "Premium weather data",
      "mimeType": "application/json",
      "payTo": "ALGORAND_ADDRESS_58_CHARS",
      "maxTimeoutSeconds": 300,
      "asset": "10458941",
      "outputSchema": null,
      "extra": {
        "name": "USDC",
        "decimals": 6,
        "feePayer": "FACILITATOR_ADDRESS_58_CHARS"
      }
    }
  ],
  "error": "Payment Required"
}
```

### PaymentRequirements Fields

| Field | Type | Description |
|-------|------|-------------|
| `scheme` | `string` | Payment scheme — `"exact"` for Algorand |
| `network` | `string` | CAIP-2 identifier for the target network |
| `maxAmountRequired` | `string` | Amount in atomic units (e.g., `"1000000"` = 1 USDC) |
| `payTo` | `string` | 58-character Algorand address to receive payment |
| `asset` | `string` | `"0"` for native ALGO, or ASA ID as string |
| `maxTimeoutSeconds` | `number` | Transaction validity window in seconds |
| `extra.name` | `string` | Token name (e.g., `"USDC"`) |
| `extra.decimals` | `number` | Token decimals (e.g., `6`) |
| `extra.feePayer` | `string` | Facilitator address that sponsors transaction fees |

---

## CAIP-2 Network Identifiers

[CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) format: `algorand:<base64 genesis hash>`

| Network | CAIP-2 Identifier | MCP `network` param |
|---------|-------------------|---------------------|
| Testnet | `algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=` | `"testnet"` |
| Mainnet | `algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=` | `"mainnet"` |

V1 legacy identifiers (`algorand-testnet`, `algorand-mainnet`) are mapped automatically by servers.

---

## Asset Configuration

| Asset | Testnet ASA ID | Mainnet ASA ID | Decimals | 1 whole token = |
|-------|---------------|----------------|----------|-----------------|
| ALGO | `0` (native) | `0` (native) | 6 | 1,000,000 atomic units |
| USDC | `10458941` | `31566704` | 6 | 1,000,000 atomic units |

`maxAmountRequired` is always in **atomic units** (base units). For USDC with 6 decimals: `"1000000"` = 1.00 USDC.

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
5. Confirms finality (~3.3 seconds)

The facilitator address comes from `extra.feePayer` in the PaymentRequirements.

---

## V1 vs V2 Differences

IMPORTANT: YOU MUST USE V2 ALWAYS! V1 is deprecated and may be removed without notice. V2 has critical differences:

| Aspect | V1 | V2 |
|--------|----|----|
| Network identifiers | `"algorand-testnet"` | CAIP-2: `"algorand:SGO1..."` |
| `x402Version` | `1` | `2` |
| `accepted` field | Not required | **Required** in payment header |
| Response structure | Flat | Nested with `resource` and `accepts[]` |
