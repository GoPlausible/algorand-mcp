# Getting Started

When operating as an Algorand MCP agent, use Algorand MCP tools directly. No SDK installation or API key management needed — the Algorand MCP server handles this internally.

## Quick Swap (2 steps)

```
1. wallet_get_info { network: "testnet" }
   → Get wallet address and balance

2. api_haystack_execute_swap {
     fromASAID: 0, toASAID: 31566704, amount: 1000000,
     slippage: 1, network: "testnet"
   }
   → Quotes, signs via wallet, submits, confirms — all in one call
```

## With Preview (recommended for user-facing swaps)

```
1. wallet_get_info { network: "testnet" }
2. api_haystack_needs_optin { address, assetId: 31566704, network: "testnet" }
   → If needed: wallet_optin_asset { assetId: 31566704, network: "testnet" }
3. api_haystack_get_swap_quote { fromASAID: 0, toASAID: 31566704, amount: 1000000, network: "testnet" }
   → Show user the quote → get confirmation
4. api_haystack_execute_swap { fromASAID: 0, toASAID: 31566704, amount: 1000000, slippage: 1, network: "testnet" }
```

## Algorand MCP Tool Reference

| Tool                            | Purpose                                          |
| ------------------------------- | ------------------------------------------------ |
| `api_haystack_get_swap_quote`   | Preview swap quote with routing and pricing       |
| `api_haystack_execute_swap`     | Execute swap: quote + sign + submit + confirm     |
| `api_haystack_needs_optin`      | Check if address needs asset opt-in               |
| `wallet_get_info`               | Get wallet address and ALGO balance               |
| `wallet_optin_asset`            | Opt into an ASA (one-step build+sign+submit)      |

See [swaps.md](swaps.md) for detailed workflow and [quotes.md](quotes.md) for quote parameters.

## Amounts and Units

All amounts are in **base units** (smallest denomination):

| Asset               | Decimals | 1 unit in base | Example              |
| ------------------- | -------- | -------------- | -------------------- |
| ALGO (ASA 0)        | 6        | 1,000,000      | `1_000_000` = 1 ALGO |
| USDC (ASA 31566704) | 6        | 1,000,000      | `5_000_000` = 5 USDC |
