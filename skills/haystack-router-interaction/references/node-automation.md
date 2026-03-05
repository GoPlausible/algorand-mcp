# Node.js Automation (Algorand MCP)

Automate swaps using Algorand MCP tools. The `api_haystack_execute_swap` tool handles quoting, signing, and submission in one call.

## Single Swap

```
1. wallet_get_info { network: "testnet" }
   → Get address and confirm ALGO balance is sufficient

2. api_haystack_needs_optin { address, assetId: 31566704, network: "testnet" }
   → Check if output asset needs opt-in

3. (If needsOptIn) wallet_optin_asset { assetId: 31566704, network: "testnet" }
   → Opt into output asset

4. api_haystack_get_swap_quote {
     fromASAID: 0, toASAID: 31566704, amount: 1000000,
     address: "<wallet_address>", network: "testnet"
   }
   → Preview quote → confirm with user

5. api_haystack_execute_swap {
     fromASAID: 0, toASAID: 31566704, amount: 1000000,
     slippage: 1, note: "order-123", network: "testnet"
   }
   → Signs via wallet, submits, waits for confirmation
   → Returns: confirmedRound, txIds, summary with exact amounts
```

## Batch Swaps

For multiple sequential swaps, repeat steps 4–5 for each pair:

```
Swap pairs example:
  - 0 → 31566704, amount: 1000000   (1 ALGO → USDC)
  - 0 → 312769,   amount: 2000000   (2 ALGO → USDt)

For each pair:
  → api_haystack_get_swap_quote { ... }  → show user
  → api_haystack_execute_swap { ... }    → execute after confirmation
```

## Key Rules

- **Use `api_haystack_execute_swap`** — it handles signing via the active wallet
- **Always confirm each swap with the user** before executing
- **Each execute call gets a fresh quote** — no stale quote issues
- **Check opt-in** before first swap to a new ASA using `api_haystack_needs_optin`
- **Default to testnet** unless user explicitly requests mainnet
