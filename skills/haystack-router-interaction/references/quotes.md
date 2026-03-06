# Quotes

## Getting a Quote

```
-> api_haystack_get_swap_quote {
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

## Quote Types — CRITICAL: Choosing the Right Direction

**Getting `type` wrong means the user spends or receives the wrong amount. Parse user intent carefully.**

### Parsing rules

| User says | `type` | `amount` is | `fromASAID` | `toASAID` |
|-----------|--------|-------------|-------------|-----------|
| "Buy 10 ALGO with USDC" | `"fixed-output"` | 10000000 (the ALGO — desired output) | USDC | ALGO |
| "Sell 10 ALGO for USDC" | `"fixed-input"` | 10000000 (the ALGO — exact spend) | ALGO | USDC |
| "Swap 10 ALGO to USDC" | `"fixed-input"` | 10000000 (the ALGO — exact spend) | ALGO | USDC |
| "Use 10 ALGO to buy USDC" | `"fixed-input"` | 10000000 (the ALGO — exact spend) | ALGO | USDC |
| "Buy USDC for 10 ALGO" | `"fixed-input"` | 10000000 (the ALGO — exact spend) | ALGO | USDC |
| "Get me 5 USDC" | `"fixed-output"` | 5000000 (the USDC — desired output) | (ask) | USDC |

**Rule: "Buy X of Y" = fixed-output. "Sell/swap/use X of Y" = fixed-input. If ambiguous, ask the user.**

### Fixed-input (default): User specifies exact input, output varies

```
-> api_haystack_get_swap_quote {
    fromASAID: 0, toASAID: 31566704,
    amount: 1000000,        // Exact: spend 1 ALGO
    type: "fixed-input", network: "mainnet"
  }
// expectedOutput = USDC to receive (variable based on market)
```

### Fixed-output: User specifies exact output, input varies

```
-> api_haystack_get_swap_quote {
    fromASAID: 0, toASAID: 31566704,
    amount: 1000000,        // Exact: receive 1 USDC
    type: "fixed-output", network: "mainnet"
  }
// inputAmount = ALGO required to send (variable based on market)
```

## Asset Opt-In Detection

Use the dedicated `api_haystack_needs_optin` tool to check:

```
1. api_haystack_needs_optin { address: "<address>", assetId: <toASAID>, network }
   -> Returns { needsOptIn: true/false }

2. If needsOptIn is true:
   -> wallet_optin_asset { assetId: <toASAID>, network }
   -> This handles build, sign, and submit in one step

3. Then proceed with quote or execute:
   -> api_haystack_get_swap_quote { fromASAID, toASAID, amount, address, network }
   -> api_haystack_execute_swap { fromASAID, toASAID, amount, slippage, network }
```

Note: `api_haystack_execute_swap` automatically handles opt-in detection when the RouterClient is configured with `autoOptIn: true` (default for Algorand MCP tools).
