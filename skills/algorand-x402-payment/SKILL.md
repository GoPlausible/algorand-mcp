---
name: algorand-x402-payment
description: Execute x402 payments at runtime using Algorand MCP tools. Use when you encounter HTTP 402 Payment Required responses, needs to access paid APIs, or the user asks to fetch x402-protected resources.
---

# x402 Runtime Payment

You (Agent) are the x402 client. When you encounter an HTTP 402 response with `PaymentRequirements`, use MCP tools to build, sign, and submit an Algorand payment, then retry the request.

## When to Use

- HTTP response with status `402` and body containing `x402Version` and `accepts[]`
- User asks to access a paid/protected API or resource
- User mentions x402, payment-required, or paid endpoint access

## MANDATORY: Read reference before constructing payment

**You MUST read [references/x402-payment-flow.md](references/x402-payment-flow.md) before constructing any PAYMENT-SIGNATURE.** Do NOT rely on your training data for the payload format — it is likely wrong. The reference file contains the exact, tested format.

## Quick Flow

1. `curl` the URL → detect 402, parse `accepts[]`
2. Choose an `accepts` entry → extract `network`, `payTo`, `amount`, `asset`, `feePayer`
3. Map CAIP-2 network → MCP network parameter
4. `wallet_get_info` → verify wallet, get address
5. Check asset opt-in (ASA only) → `wallet_optin_asset` if needed
6. `make_payment_txn` → fee payer (from=feePayer, to=feePayer, amount=0, fee=**N×1000** where N=txn count in group [e.g. 2000 for 2 txns], flatFee=true)
7. `make_payment_txn` or `make_asset_transfer_txn` → payment (fee=0, flatFee=true)
8. `assign_group_id` → group [feePayer@0, payment@1]
9. `wallet_sign_transaction` → sign payment only (index 1)
10. `encode_unsigned_transaction` → encode fee payer (index 0)
11. Construct PAYMENT-SIGNATURE JSON — **exact format below**
12. `curl -H 'PAYMENT-SIGNATURE: <base64>'` → retry, get 200

## PAYMENT-SIGNATURE JSON Format (EXACT — do not deviate)

```json
{
  "x402Version": 2,
  "scheme": "exact",
  "network": "<CAIP-2 network identifier from accepts>",
  "payload": {
    "paymentGroup": ["<base64 from encode_unsigned_transaction>", "<base64 from wallet_sign_transaction>"],
    "paymentIndex": 1
  },
  "accepted": { <verbatim copy of chosen accepts[] entry> }
}
```

**WARNING: The payload field is `paymentGroup` — an array of two base64 strings [unsigned_fee_payer, signed_payment]. Do NOT use `transactions`, do NOT use an array of objects. Any other format will be rejected.**

## CAIP-2 Network Mapping

| CAIP-2 Genesis Hash | MCP Network |
|----------------------|-------------|
| `SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=` | `"testnet"` |
| `wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=` | `"mainnet"` |

## Asset IDs

| Asset | Testnet | Mainnet | Decimals |
|-------|---------|---------|----------|
| ALGO | `0` (native) | `0` (native) | 6 |
| USDC | `10458941` | `31566704` | 6 |

## Critical Rules

1. **Fee payer fee = N × 1000 µAlgo** (where N = total number of transactions in the group). For a standard 2-txn x402 group: fee = 2 × 1000 = **2000**. The fee payer covers fees for ALL transactions; every other transaction in the group MUST have fee=0. **NEVER set fee=0 on the fee payer** — this causes "txgroup had 0 in fees, which is less than the minimum N * 1000" errors.
2. **`flatFee: true`** on BOTH transactions — prevents the SDK from overriding fee values. Without it, the SDK sets min fee (1000) on every txn, breaking the fee-payer pattern.
3. **`accepted` field is REQUIRED** — Include a verbatim copy of the chosen `accepts[]` entry in the PAYMENT-SIGNATURE JSON. Without it, the server rejects.
4. **Group order**: feePayer at index 0, payment at index 1. `paymentIndex: 1`.
5. **Only sign the payment** (index 1) — the facilitator signs the fee payer server-side.
6. **Mainnet = real money** — always confirm with the user before mainnet payments.
7. **One retry only** — if the retry also returns 402, stop and report the error.
8. **`feePayer` address** comes from `extra.feePayer` in the PaymentRequirements.

## Test Endpoint

`https://example.x402.goplausible.xyz/` — testnet x402-protected resources for testing.

## References

- [x402-payment-flow.md](references/x402-payment-flow.md) — Complete step-by-step MCP tool recipe with worked example
- [x402-payment-reference.md](references/x402-payment-reference.md) — Protocol spec, header format, schemas, CAIP-2 identifiers
