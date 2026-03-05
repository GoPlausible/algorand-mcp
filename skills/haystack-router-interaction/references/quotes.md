# Quotes

## Getting a Quote

```
→ api_haystack_get_swap_quote {
    fromASAID: 0,           // ALGO
    toASAID: 31566704,      // USDC
    amount: 1000000,        // 1 ALGO in base units
    type: "fixed-input",    // or "fixed-output"
    address: "<wallet_address>",  // optional, for opt-in detection
    network: "mainnet"
  }

Response includes:
  - expectedOutput: output amount in base units
  - inputAmount: original input amount
  - usdIn / usdOut: USD values
  - userPriceImpact: price impact percentage
  - route: detailed routing path
  - flattenedRoute: protocol split percentages (e.g., "TinymanV2: 60%", "Pact: 40%")
  - requiredAppOptIns: app IDs needing opt-in
  - protocolFees: fee breakdown
```

## Parameters

| Parameter      | Type     | Required | Description                                     |
| -------------- | -------- | -------- | ----------------------------------------------- |
| `fromASAID`    | `number` | Yes      | Input asset ID (0 = ALGO)                       |
| `toASAID`      | `number` | Yes      | Output asset ID                                 |
| `amount`       | `number` | Yes      | Amount in base units                            |
| `type`         | `string` | No       | `"fixed-input"` (default) or `"fixed-output"`   |
| `address`      | `string` | No       | User address (for opt-in detection)             |
| `maxGroupSize` | `number` | No       | Max transactions in group (default: 16)         |
| `maxDepth`     | `number` | No       | Max routing hops (default: 4)                   |
| `network`      | `string` | No       | `"mainnet"` (default) or `"testnet"`            |

## Quote Types

**Fixed-input** (default): Specify exact input amount, receive variable output.

```
→ api_haystack_get_swap_quote {
    fromASAID: 0, toASAID: 31566704,
    amount: 1000000,        // Exact: send 1 ALGO
    type: "fixed-input", network: "mainnet"
  }
// expectedOutput = USDC to receive
```

**Fixed-output**: Specify desired output, send variable input.

```
→ api_haystack_get_swap_quote {
    fromASAID: 0, toASAID: 31566704,
    amount: 1000000,        // Exact: receive 1 USDC
    type: "fixed-output", network: "mainnet"
  }
// inputAmount = ALGO required to send
```

## Asset Opt-In Detection

Use the dedicated `api_haystack_needs_optin` tool to check:

```
1. api_haystack_needs_optin { address: "<address>", assetId: <toASAID>, network }
   → Returns { needsOptIn: true/false }

2. If needsOptIn is true:
   → wallet_optin_asset { assetId: <toASAID>, network }
   → This handles build, sign, and submit in one step

3. Then proceed with quote or execute:
   → api_haystack_get_swap_quote { fromASAID, toASAID, amount, address, network }
   → api_haystack_execute_swap { fromASAID, toASAID, amount, slippage, network }
```

Note: `api_haystack_execute_swap` automatically handles opt-in detection when the RouterClient is configured with `autoOptIn: true` (default for Algorand MCP tools).
