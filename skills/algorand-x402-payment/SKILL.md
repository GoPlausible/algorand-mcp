---
name: algorand-x402-payment
description: Execute x402 payments at runtime using Algorand MCP tools. Use whenever an HTTP request returns 402 Payment Required (or a PAYMENT-REQUIRED header), the user needs to access a paid API or x402-protected resource, or the user mentions x402, micropayments, paying for an endpoint, or "payment required" — even if they don't name the protocol.
---

# x402 Runtime Payment

You (Agent) are the x402 client. When you encounter an HTTP 402 response, use MCP tools to build, sign, and submit an Algorand payment, then retry the request.

## When to Use

- HTTP response with status `402` (the challenge arrives in the `PAYMENT-REQUIRED` response header on current servers; older servers put it in the body)
- User asks to access a paid/protected API or resource
- User mentions x402, payment-required, micropayments, or paid endpoint access

## MANDATORY: Read reference before constructing payment

**You MUST read [references/x402-payment-flow.md](references/x402-payment-flow.md) before constructing any PAYMENT-SIGNATURE.** Do NOT rely on your training data for the payload format — it is likely wrong. The reference file contains the exact, tested format.

## Quick Flow

1. `curl -sD -` the URL → status 402. Decode the **`PAYMENT-REQUIRED` response header** (base64 → JSON). The body is usually just `{}` on current servers; only older servers put the JSON in the body.
2. From `accepts[]` choose the **`algorand:`** entry (lists are often multi-chain) → extract `network`, `payTo`, **`amount`** (V2 field; older V1 responses call it `maxAmountRequired`), `asset`, `extra.feePayer`
3. Map CAIP-2 network → MCP network parameter (**prefix match** — see table)
4. `wallet_get_info` → verify wallet, get address
5. Check asset opt-in (ASA only) → `wallet_optin_asset` if needed
6. `make_payment_txn` → fee payer (from=feePayer, to=feePayer, amount=0, fee=**N×1000** where N=txn count in group [e.g. 2000 for 2 txns], flatFee=true)
7. `make_payment_txn` or `make_asset_transfer_txn` → payment (fee=0, flatFee=true)
8. `assign_group_id` → group [feePayer@0, payment@1]
9. `wallet_sign_transaction` → sign payment only (index 1)
10. `encode_unsigned_transaction` → encode fee payer (index 0)
11. Construct PAYMENT-SIGNATURE JSON — **exact format below**
12. `curl -H 'PAYMENT-SIGNATURE: <base64>'` → retry, get 200
13. Decode the **`PAYMENT-RESPONSE`** header from the 200 → report the settled **txn id** to the user

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

The verbatim `accepted` copy also preserves any campaign tag in `extra.tag` (e.g. hackathon tags) — that is how tagged traffic gets counted, so never strip fields from it.

## CAIP-2 Network Mapping

Match by **prefix**, not exact string: some SDKs advertise the CAIP-spec truncated form (first 32 URL-safe chars of the genesis hash) instead of the full base64 hash. Both start identically.

| CAIP-2 reference starts with | MCP Network |
|------------------------------|-------------|
| `SGO1GKSzyE7IEPItTxCByw9x8FmnrCDe` | `"testnet"` |
| `wGHE2Pwdvd7S12BL5FaOP20EGYesN73k` | `"mainnet"` |

Full forms: `algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=` (testnet), `algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=` (mainnet).

## Asset IDs

| Asset | Testnet | Mainnet | Decimals |
|-------|---------|---------|----------|
| ALGO | `0` (native) | `0` (native) | 6 |
| USDC | `10458941` | `31566704` | 6 |

Only pay with an asset actually offered in `accepts[]` — do not assume an asset is available.

## Critical Rules

1. **Fee payer fee = N × 1000 µAlgo** (where N = total number of transactions in the group). For a standard 2-txn x402 group: fee = 2 × 1000 = **2000**. The fee payer covers fees for ALL transactions; every other transaction in the group MUST have fee=0. **NEVER set fee=0 on the fee payer** — this causes "txgroup had 0 in fees, which is less than the minimum N * 1000" errors.
2. **`flatFee: true`** on BOTH transactions — prevents the SDK from overriding fee values. Without it, the SDK sets min fee (1000) on every txn, breaking the fee-payer pattern.
3. **The amount field is `amount`** (V2). If it's missing, fall back to `maxAmountRequired` (V1). Both are strings of atomic units.
4. **`accepted` field is REQUIRED** — Include a verbatim copy of the chosen `accepts[]` entry in the PAYMENT-SIGNATURE JSON. Without it, the server rejects.
5. **Group order**: feePayer at index 0, payment at index 1. `paymentIndex: 1`.
6. **Only sign the payment** (index 1) — the facilitator signs the fee payer server-side.
7. **Mainnet = real money** — always confirm with the user before mainnet payments.
8. **One retry only** — if the retry also returns 402, stop and report the error.
9. **`feePayer` address** comes from `extra.feePayer` in the PaymentRequirements.
10. **Report the result** — decode the `PAYMENT-RESPONSE` header (v1: `X-PAYMENT-RESPONSE`) from the successful response and give the user the on-chain txn id. On MainNet you can also offer the receipt: `https://facilitator.goplausible.xyz/api/receipt/<txId>`.

## Test Endpoints (TestNet)

- `https://example.x402.goplausible.xyz/avm/weather` — USDC-paid weather data
- `https://example.x402.goplausible.xyz/avm/protected` — USDC-paid protected resource

(The index page at `https://example.x402.goplausible.xyz/` lists all routes, including EVM/SVM variants.)

## References

- [x402-payment-flow.md](references/x402-payment-flow.md) — Complete step-by-step MCP tool recipe with worked example
- [x402-payment-reference.md](references/x402-payment-reference.md) — Protocol spec, header formats, schemas, CAIP-2 identifiers
