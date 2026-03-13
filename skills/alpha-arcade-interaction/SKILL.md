---
name: alpha-arcade-interaction
description: Trade on Alpha Arcade prediction markets on Algorand — browse markets, read orderbooks, place limit/market orders, manage positions, cancel/amend orders, split/merge shares, and claim winnings. Use when user asks about prediction markets, event betting, YES/NO shares, orderbooks, or Alpha Arcade.
---

# Alpha Arcade — Prediction Markets on Algorand

Interact with Alpha Arcade prediction markets via the Alpha Arcade MCP server (15 tools across read-only and trading categories).

## Key Characteristics

- **On-chain prediction markets** — all orders and settlements happen on Algorand
- **Binary and multi-choice markets** — bet on YES/NO outcomes or choose from multiple options
- **USDC-denominated** — all collateral and payouts in USDC (ASA 31566704)
- **Microunit inputs** — all prices and quantities in tool inputs use microunits (1,000,000 = $1.00 or 1 share)
- **Formatted outputs** — read tools return human-readable strings like "$0.50" and "2.50 shares"

## Setup

Alpha Arcade tools are built into the Algorand MCP server. Trading uses the local wallet (OS keychain) — no separate mnemonic needed.

| Variable | Required | Description |
|----------|----------|-------------|
| `ALPHA_API_KEY` | For reward markets | Alpha Arcade API key |
| `ALPHA_API_BASE_URL` | No | API base URL (default: https://platform.alphaarcade.com/api) |

Read-only tools work without a wallet. Trading tools require an active wallet account (see `wallet_get_info`).

## Units & Price Format

All prices and quantities in tool **inputs** use **microunits**: 1,000,000 = $1.00 or 1 share.

| Human value | Microunit value |
|---|---|
| $0.50 | 500,000 |
| $0.05 slippage | 50,000 |
| 1 share | 1,000,000 |
| 30 shares | 30,000,000 |

Tool **outputs** from read tools (`get_orderbook`, `get_open_orders`, `get_positions`) return pre-formatted strings. Write tools accept raw microunit integers.

### API probability fields are microunits, NOT percentages

**Critical**: The `yesProb` and `noProb` fields returned by market data (e.g., `get_market`, `get_live_markets`) are in **microunits** (0–1,000,000), NOT percentages (0–100).

| `yesProb` value | Meaning | Display price |
|---|---|---|
| 862,500 | 86.25% chance | $0.86 |
| 500,000 | 50% chance | $0.50 |
| 50,000 | 5% chance | $0.05 |

To convert for display: `price = yesProb / 1,000,000` → e.g., `862500 / 1000000 = $0.86`

**Do NOT** divide by 100 or treat as a percentage — this produces values like 8,625,000,000 which overflow uint64 and cause transaction failures.

## Market Data Model

### Binary markets
A standard yes/no market has a single `marketAppId`, `yesAssetId`, and `noAssetId`. Use `marketAppId` for all trading calls.

### Multi-choice markets
Multi-choice markets (e.g., "Who wins the election?") have an `options[]` array. Each option is its own binary market with its own `marketAppId`:

```json
{
  "title": "Presidential Election Winner 2028",
  "options": [
    { "title": "Candidate A", "marketAppId": 100001, "yesAssetId": 111, "noAssetId": 112 },
    { "title": "Candidate B", "marketAppId": 100002, "yesAssetId": 113, "noAssetId": 114 }
  ]
}
```

**Always trade using the option's `marketAppId`, not the parent.**

## Orderbook Mechanics

### Four-sided book
The orderbook has four sides: YES bids, YES asks, NO bids, NO asks.

### Cross-side equivalence
Because YES + NO always = $1.00:
- A **YES bid at $0.30** is equivalent to a **NO ask at $0.70**
- A **NO bid at $0.71** is equivalent to a **YES ask at $0.29**

The `get_orderbook` tool returns a unified YES-perspective view that merges all 4 sides automatically.

### Limit vs market orders
- **Limit order** (`create_limit_order`): Sits on the orderbook at your exact price. No matching happens. Appears in `get_open_orders` as an unfilled order until matched or cancelled.
- **Market order** (`create_market_order`): Auto-matches against existing orders within your slippage tolerance. Returns the actual fill price. Filled immediately — does NOT appear in open orders.

### Positions vs open orders
- **Positions** (`get_positions`): YES/NO token balances the wallet holds. These come from filled market orders, split shares, or received transfers. Positions represent ownership of outcome tokens.
- **Open orders** (`get_open_orders`): Unfilled limit orders sitting on the orderbook. Each has an `escrowAppId` that can be used to cancel or amend.

A common mistake is checking only open orders after a market order — market orders fill immediately and become positions, not open orders. Always check both.

## Collateral

Every order requires **both ALGO and USDC/tokens**:

- **ALGO**: ~0.957 ALGO locked per order as minimum balance requirement (MBR) for the on-chain escrow. Refunded on cancel or fill.
- **Buy orders**: Lock USDC as trade collateral (proportional to quantity × price).
- **Sell orders**: Lock outcome tokens (YES or NO) as collateral.

If a trade fails with an "overspend" error, the wallet lacks sufficient ALGO or USDC. Check both balances before retrying.

## Tools

### Read-only tools (no wallet required)

| Tool | Purpose |
|------|---------|
| `alpha_get_live_markets` | Fetch all live markets with prices, volume, categories |
| `alpha_get_reward_markets` | Fetch markets with liquidity rewards (requires `ALPHA_API_KEY`) |
| `alpha_get_market` | Fetch full details for a single market by ID |
| `alpha_get_orderbook` | Fetch unified YES-perspective orderbook for a market |
| `alpha_get_open_orders` | Fetch all open orders for a wallet on a specific market |
| `alpha_get_positions` | Fetch all YES/NO token positions for a wallet across all markets |

### Trading tools (require active wallet account)

| Tool | Purpose |
|------|---------|
| `alpha_create_limit_order` | Place a limit order at a specific price |
| `alpha_create_market_order` | Place a market order with auto-matching and slippage |
| `alpha_cancel_order` | Cancel an open order (refunds collateral) |
| `alpha_amend_order` | Edit an existing unfilled order in-place |
| `alpha_propose_match` | Propose a match between a maker order and your wallet |
| `alpha_split_shares` | Split USDC into equal YES + NO tokens |
| `alpha_merge_shares` | Merge equal YES + NO tokens back into USDC |
| `alpha_claim` | Claim USDC from a resolved market |

## Key Workflows

### Buying shares
1. `get_live_markets` — find a market (or `get_reward_markets` for markets with liquidity rewards)
2. `get_orderbook` — check available liquidity
3. `create_market_order` (auto-matches) or `create_limit_order` (rests on book)
4. Save the returned `escrowAppId` — you need it to cancel

### Checking your portfolio
1. `get_positions` — see all YES/NO token balances with market titles and asset IDs
2. For open orders on a specific market: `get_open_orders` with the `marketAppId`

### Editing an order (amend)
1. `get_open_orders` — find the `escrowAppId`
2. `amend_order` with `marketAppId`, `escrowAppId`, new `price`, and new `quantity`
3. Faster and cheaper than cancel + recreate. Only works on unfilled orders.

### Cancelling an order
1. `get_open_orders` — find the `escrowAppId` and `owner` address
2. `cancel_order` with `marketAppId`, `escrowAppId`, and `orderOwner`

### Claiming from a resolved market
1. `get_positions` — find markets with token balances; note the `yesAssetId` or `noAssetId`
2. `claim` with `marketAppId` and the winning token's `assetId`

### Providing liquidity (split/merge)
1. `split_shares` — convert USDC into equal YES + NO tokens
2. Place limit orders on both sides of the book for market making
3. `merge_shares` — convert matched YES + NO tokens back to USDC

## Common Pitfalls

- **Probabilities are microunits, NOT percentages**: `yesProb` / `noProb` range from 0–1,000,000 (not 0–100). Treating them as percentages causes uint64 overflow and transaction failures. To display: divide by 1,000,000. To pass as price: use as-is.
- **Market orders become positions, not open orders**: After a market order fills, check `get_positions` for token balances — not `get_open_orders`. Open orders only shows unfilled limit orders.
- **Multi-choice markets**: The parent has no `marketAppId` for trading. Use `options[].marketAppId`.
- **Prices are microunits in inputs**: $0.50 = 500,000, not 0.5 or 50.
- **Both ALGO and USDC needed**: Orders require ALGO for MBR (~0.957 per order) AND USDC for buy collateral. An "overspend" error means one of these is insufficient.
- **Orderbook cross-side**: If you only check YES asks, you miss cheaper liquidity from NO bids. The `get_orderbook` tool handles this automatically.
- **Save escrowAppId**: It's the only way to cancel or amend your order later.
- **USDC opt-in**: The wallet must be opted into USDC (ASA 31566704) before trading.
- **Wallet required for trading**: Read-only tools work without a wallet, but trading tools require an active wallet account via `wallet_get_info`.
- **Mainnet by default**: The server defaults to mainnet. Real money is at stake. Pass `network: "testnet"` for testing.

## Links

- Alpha Arcade: https://alphaarcade.com
- Alpha Arcade API: https://platform.alphaarcade.com
