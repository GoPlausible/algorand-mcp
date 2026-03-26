---
name: haystack-router-interaction
description: "Route and execute optimal token swaps on Algorand using Haystack Router via Algorand MCP tools. Use when getting best-price quotes across multiple Algorand DEXes and LST protocols, executing atomic swaps, and checking asset opt-in — all through the Algorand MCP server."
---

# Haystack Router (Interaction)

This skill is for **interacting** with Haystack Router through Algorand MCP tools — getting quotes, executing swaps, and checking opt-in status. All operations use the Algorand MCP wallet for signing; no SDK installation or API keys needed.

> **Building an application** that integrates Haystack Router directly? Use the **haystack-router-development** skill instead — it covers the `@txnlab/haystack-router` SDK, React integration, Node.js automation, middleware, and the full API surface.

Haystack Router is a DEX aggregator and smart order routing protocol on Algorand. It finds optimal swap routes across multiple DEXes (Tinyman V2, Pact, Folks) and LST protocols (tALGO, xALGO), then executes them atomically through on-chain smart contracts.

## Algorand MCP Haystack Router Tools

Three dedicated Algorand MCP tools provide full Haystack Router functionality. These handle quoting, execution (with wallet signing), and opt-in checking — no raw mnemonics or secret keys needed.

### `api_haystack_get_swap_quote`

Get an optimized swap quote without executing. Use to preview pricing, route, and price impact before confirming with user.

```
-> api_haystack_get_swap_quote {
    fromASAID: 0,             // Input asset (0 = ALGO)
    toASAID: 31566704,        // Output asset (USDC)
    amount: 1000000,          // 1 ALGO in base units
    type: "fixed-input",      // or "fixed-output"
    address: "<address>",     // optional, for opt-in detection
    maxGroupSize: 16,         // optional
    maxDepth: 4,              // optional
    network: "mainnet"
  }

Returns: expectedOutput, inputAmount, usdIn, usdOut, userPriceImpact,
         route, flattenedRoute, requiredAppOptIns, protocolFees
```

### `api_haystack_execute_swap`

All-in-one swap: quote -> sign (via wallet) -> submit -> confirm. Uses the active wallet account for signing. Enforces wallet spending limits.

```
-> api_haystack_execute_swap {
    fromASAID: 0,             // Input asset
    toASAID: 31566704,        // Output asset
    amount: 1000000,          // Amount in base units
    slippage: 1,              // 1% slippage tolerance
    type: "fixed-input",      // optional
    note: "my swap",          // optional text note
    maxGroupSize: 16,         // optional
    maxDepth: 4,              // optional
    network: "mainnet"
  }

Returns: status, confirmedRound, txIds, signer, nickname, quote details,
         summary (inputAmount, outputAmount, totalFees, transactionCount)
```

### `api_haystack_needs_optin`

Check if an address needs to opt into an asset before swapping.

```
-> api_haystack_needs_optin {
    address: "<address>",
    assetId: 31566704,
    network: "mainnet"
  }

Returns: { address, assetId, needsOptIn: true/false, network }
```

## Algorand MCP Agent Swap Workflow

```
Step 1: Check wallet
  -> wallet_get_info { network }

Step 2: Check opt-in (if swapping to an ASA)
  -> api_haystack_needs_optin { address, assetId, network }
  -> If needed: wallet_optin_asset { assetId, network }

Step 3: Preview quote (recommended — show user before executing)
  -> api_haystack_get_swap_quote { fromASAID, toASAID, amount, address, network }
  -> Present to user: expected output, USD values, route, price impact

Step 4: User confirms -> Execute
  -> api_haystack_execute_swap { fromASAID, toASAID, amount, slippage, network }
  -> Returns confirmed result with summary
```

**Key rules:**
- Always check wallet with `wallet_get_info` before any swap
- Always confirm with the user before executing (show quote details)
- The execute tool handles signing via the active wallet — no manual signing needed
- Default to testnet during development; confirm before mainnet
- Quotes are time-sensitive — execute promptly after user confirms

## CRITICAL: Swap Direction Rules

The `type` parameter determines whether the `amount` is the exact input or the exact output. **Getting this wrong means the user spends or receives the wrong amount.**

### How to parse user intent

| Pattern | `type` | `amount` refers to | Example |
|---------|--------|--------------------|---------|
| **"Buy X of Y"** | `"fixed-output"` | Desired output (Y) | "Buy 10 ALGO" → amount=10000000, toASAID=ALGO |
| **"Sell/swap/convert X of Y"** | `"fixed-input"` | Exact input spend (Y) | "Sell 10 ALGO" → amount=10000000, fromASAID=ALGO |
| **"Buy Y for/with X of Z"** | `"fixed-input"` | Exact input spend (Z) | "Buy USDC for 10 ALGO" → amount=10000000, fromASAID=ALGO |

- **`fixed-input`**: `amount` = exact spend, output varies. **`fixed-output`**: `amount` = exact receipt, input varies.
- **If ambiguous, ASK the user** — wrong direction = wrong amount spent/received.

## Reference Files

Read the appropriate file based on the task:

| Task                                        | Reference                                             |
| ------------------------------------------- | ----------------------------------------------------- |
| Quick start and Algorand MCP tool reference | [getting-started.md](references/getting-started.md)   |
| Get swap quotes, display pricing            | [quotes.md](references/quotes.md)                     |
| Execute swaps via Algorand MCP tools        | [swaps.md](references/swaps.md)                       |
| Automate swaps via Algorand MCP tools       | [node-automation.md](references/node-automation.md)   |
| Network, slippage, rate limits, ASA IDs     | [configuration.md](references/configuration.md)       |
