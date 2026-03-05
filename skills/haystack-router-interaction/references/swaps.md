# Swaps

The `api_haystack_execute_swap` tool handles the entire swap lifecycle: quoting, signing (via active wallet), submission, and confirmation — all in one call. **No manual signing or transaction assembly needed.**

## Quick Swap (Single Tool)

```
→ api_haystack_execute_swap {
    fromASAID: 0,             // ALGO
    toASAID: 31566704,        // USDC
    amount: 1000000,          // 1 ALGO in base units
    slippage: 1,              // 1% tolerance
    network: "mainnet"
  }

Returns:
  status: "confirmed"
  confirmedRound: "12345678"
  txIds: ["TXID1...", "TXID2...", ...]
  signer: "<wallet_address>"
  nickname: "<account_nickname>"
  quote: { expectedOutput, usdIn, usdOut, userPriceImpact, route }
  summary: { inputAmount, outputAmount, totalFees, transactionCount }
```

## Complete Workflow (with preview)

For best UX, preview the quote before executing:

```
1. Check wallet state
   → wallet_get_info { network: "mainnet" }
   → Note the address and ALGO balance

2. Check output asset opt-in (skip for ALGO)
   → api_haystack_needs_optin { address, assetId: 31566704, network: "mainnet" }
   → If needsOptIn is true:
     → wallet_optin_asset { assetId: 31566704, network: "mainnet" }

3. Preview quote (show user before executing)
   → api_haystack_get_swap_quote {
       fromASAID: 0, toASAID: 31566704, amount: 1000000,
       address: "<wallet_address>", network: "mainnet"
     }
   → Present to user: expected output, USD values, route, price impact

4. User confirms → Execute (all-in-one)
   → api_haystack_execute_swap {
       fromASAID: 0, toASAID: 31566704, amount: 1000000,
       slippage: 1, network: "mainnet"
     }
   → Returns confirmed result with exact summary
```

## Important Rules

- **Always check wallet first** — Use `wallet_get_info` to confirm address, balance, and network
- **Always confirm with user** — Show quote details and ask for confirmation before executing
- **Use `api_haystack_execute_swap`** — It handles signing via the active wallet account
- **Check opt-in for ASAs** — Use `api_haystack_needs_optin` + `wallet_optin_asset` if needed
- **Default to testnet** — Unless user explicitly requests mainnet
- **Handle quote staleness** — Quotes are time-sensitive; execute promptly after user confirms

## Slippage Guidance

| Pair Type         | Recommended Slippage |
| ----------------- | -------------------- |
| Stable pairs      | 0.5–1%               |
| Volatile pairs    | 1–3%                 |
| Low liquidity     | 3–5%                 |

Slippage is verified on the **final output** of the swap, not individual hops.

## Error Handling

Common errors:

- **Slippage exceeded** — price moved beyond tolerance, refetch quote
- **Insufficient balance** — check with `wallet_get_info`
- **Asset not opted in** — use `wallet_optin_asset`
- **Transaction rejected** — user declined or signing failed
- **Network timeout** — retry after brief delay

Quotes are time-sensitive. If a quote is stale (prices moved significantly), refetch before executing.
