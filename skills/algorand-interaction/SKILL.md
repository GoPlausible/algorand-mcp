---
name: algorand-interaction
description: Interact with Algorand blockchain via the Algorand MCP server — wallet operations, ALGO/ASA transactions, smart contracts, account info, NFD lookups, atomic groups, Tinyman swaps, Haystack Router best-price swaps, Alpha Arcade prediction markets, Pera asset verification, TEAL compilation, knowledge base. Use when user asks about Algorand wallet, balances, sending ALGO or tokens, asset opt-in, transactions, NFD names, DEX swaps, DEX aggregation, best-price routing, prediction markets, Alpha Arcade, asset verification, smart contracts, or account details.
---

# Algorand MCP Interaction

Interact with Algorand blockchain through the Algorand MCP server (126 tools across 15 categories).

## Key Characteristics

- **Agent-wallet signing** — use `wallet_*` tools to sign; the MCP server holds the mnemonics in a local SQLite DB and signs on your behalf. Mnemonics are never returned in tool responses.
- **Multi-network** — supports `mainnet`, `testnet`, and `localnet`

## Calling MCP Tools

MCP tools are **deferred** — you MUST use `ToolSearch` to load them before calling:

```
ToolSearch("+algorand wallet")                                    # Search by keyword — loads matching tools
ToolSearch("select:mcp__algorand-mcp__wallet_get_info")           # Load a specific tool by full name
```

Once loaded, call them normally:
```
mcp__algorand-mcp__wallet_get_info { "network": "testnet" }
mcp__algorand-mcp__make_payment_txn { "from": "ADDR", "to": "ADDR", "amount": 1000000, "network": "testnet" }
```

Full tool name pattern: `mcp__algorand-mcp__<tool_name>`. If you get "tool not found", use `ToolSearch("+algorand <keyword>")` to load it first.

## Session Start Checklist

**At EVERY session start:**

1. **Load tools first**: Call `ToolSearch("+algorand wallet")` to load wallet tools — MCP tools are deferred and MUST be loaded via ToolSearch before use
2. **Check wallet**: `mcp__algorand-mcp__wallet_get_info` with target `network` — verify an account exists and is active
3. **If no accounts**: Guide user to create one with `wallet_add_account` (load via ToolSearch first)
4. **If needs funding**: Generate ARC-26 QR with `generate_algorand_qrcode` — returns `{ qr, uri, link, expires_in }`. Display the `qr` text block and shareable `link`. Or direct to testnet faucet: https://lora.algokit.io/testnet/fund
5. **If needs USDC funding**: Generate ARC-26 QR with `generate_algorand_qrcode` — returns `{ qr, uri, link, expires_in }`. Display the `qr` text block and shareable `link`. Or direct to testnet faucet: https://faucet.circle.com/
6. **Confirm network**: Always confirm which network (`mainnet`, `testnet`, `localnet`) before transactions
7. **Load additional tools as needed**: Use `ToolSearch("+algorand <keyword>")` to load tools for the task at hand

## Network Selection

Every tool that touches the blockchain accepts a `network` parameter:

| Value | Description |
|-------|-------------|
| `mainnet` | Algorand mainnet (default) — **real value, exercise caution** |
| `testnet` | Algorand testnet — safe for development |
| `localnet` | Local dev network (requires `ALGORAND_LOCALNET_URL` env var) |

Default to `testnet` during development.

## Pre-Transaction Validation

Before ANY transaction:

1. **MBR Check**: Account needs 0.1 ALGO base + 0.1 per asset/app opt-in
2. **Asset Opt-In**: Verify with `api_algod_get_account_asset_info` before ASA transfers
3. **Fees**: Every txn costs 0.001 ALGO (1,000 microAlgos) minimum
4. **Balance Check**: Fetch current balance with `wallet_get_info` or `api_algod_get_account_info`
5. **Order**: Fund account with ALGO first, then asset transactions

## Common Mainnet Assets

| Asset | ASA ID | Decimals |
|-------|--------|----------|
| ALGO | native | 6 |
| USDC | 31566704 | 6 |
| USDT | 312769 | 6 |
| goETH | 386192725 | 8 |
| goBTC | 386195940 | 8 |

> Always verify asset IDs on-chain — scam tokens use similar names. Use `api_pera_asset_verification_status` to check verification tier before transacting unknown assets.

## Amounts and Decimals

| Asset | Unit | 1 Whole Token = |
|-------|------|-----------------|
| ALGO | microAlgos | 1,000,000 |
| USDC (ASA 31566704) | micro-units | 1,000,000 (6 decimals) |
| Custom ASAs | base units | Depends on `decimals` field |

Always check asset's `decimals` field with `api_algod_get_asset_by_id` before computing amounts.

## Transaction Types

- **pay**: ALGO transfers → `make_payment_txn`
- **axfer**: Asset transfers, opt-in, clawback → `make_asset_transfer_txn`
- **acfg**: Asset create/configure/destroy → `make_asset_create_txn`, `make_asset_config_txn`, `make_asset_destroy_txn`
- **afrz**: Asset freeze/unfreeze → `make_asset_freeze_txn`
- **appl**: Smart contract calls → `make_app_create_txn`, `make_app_call_txn`, `make_app_update_txn`, `make_app_delete_txn`, `make_app_optin_txn`, `make_app_closeout_txn`, `make_app_clear_txn`
- **keyreg**: Consensus key registration → `make_keyreg_txn`

## Transaction Workflows

All workflows follow: **build → sign → submit → verify**.

| Workflow | Signing | Steps |
|----------|---------|-------|
| **Wallet (recommended)** | `wallet_sign_transaction` | `wallet_get_info` → query → `make_*_txn` → sign → `send_raw_transaction` → verify |
| **External key** | `sign_transaction` (secret key hex) | `make_*_txn` → sign → `send_raw_transaction` |
| **Atomic group** | `wallet_sign_transaction_group` | `make_*_txn` (multiple) → `assign_group_id` → sign → `send_raw_transaction` |

**One-step asset opt-in shortcut:** `wallet_optin_asset { assetId: 31566704, network: "testnet" }`

## Best-Price Swap via Haystack Router (DEX Aggregator)

Haystack Router aggregates quotes across multiple Algorand DEXes (Tinyman, Pact, Folks) and LST protocols (tALGO, xALGO) to find the optimal swap route.

| Step | Tool | Purpose |
|------|------|---------|
| 1 | `wallet_get_info` | Verify active account, check balance |
| 2 | `api_haystack_needs_optin` | Check if address needs opt-in for the target asset |
| 3 | `wallet_optin_asset` | Opt-in if needed |
| 4 | `api_haystack_get_swap_quote` | Preview best-price quote — show user output, USD values, route, price impact |
| 5 | User confirms | Always confirm before executing |
| 6 | `api_haystack_execute_swap` | All-in-one: quote + sign via wallet + submit + confirm |

> **CRITICAL — Swap direction (`type` parameter):**
> - **"Buy 10 ALGO"** → user wants exactly 10 ALGO **out** → `type: "fixed-output"`, `amount` = 10000000
> - **"Sell/swap 10 ALGO"** → user spends exactly 10 ALGO → `type: "fixed-input"`, `amount` = 10000000
> - **"Buy USDC for 10 ALGO"** → user spends exactly 10 ALGO → `type: "fixed-input"`, `amount` = 10000000
> - Rule: **"buy X of Y" = fixed-output**. **"sell/swap/use X of Y" = fixed-input**. If ambiguous, ask.

> For detailed Haystack Router workflows (batch swaps, configuration, slippage guidance), load the `haystack-router-interaction` skill.
> For building swap UIs or integrating the `@txnlab/haystack-router` SDK, load the `haystack-router-development` skill.

## Alpha Arcade Prediction Markets

Trade on-chain prediction markets (YES/NO outcomes) denominated in USDC via the Alpha Arcade integration (14 tools).

| Step | Tool | Purpose |
|------|------|---------|
| 1 | `wallet_get_info` | Verify active account, check ALGO + USDC balance |
| 2 | `alpha_get_live_markets` | Browse available markets |
| 3 | `alpha_get_orderbook` | Check liquidity and prices for a market |
| 4 | `alpha_create_market_order` or `alpha_create_limit_order` | Place an order |
| 5 | `alpha_get_positions` / `alpha_get_open_orders` | Check portfolio |

All prices and quantities use **microunits** (1,000,000 = $1.00 or 1 share). Orders require both ALGO (~0.957 per escrow) and USDC collateral.

> For detailed Alpha Arcade workflows (orderbook mechanics, multi-choice markets, split/merge shares, claiming, collateral model), load the `alpha-arcade-interaction` skill.

## Tool Categories

**Wallet** (10): `wallet_add_account`, `wallet_remove_account`, `wallet_list_accounts`, `wallet_switch_account`, `wallet_get_info`, `wallet_get_assets`, `wallet_sign_transaction`, `wallet_sign_transaction_group`, `wallet_sign_data`, `wallet_optin_asset`

**Account** (8): `create_account`, `rekey_account`, `mnemonic_to_mdk`, `mdk_to_mnemonic`, `secret_key_to_mnemonic`, `mnemonic_to_secret_key`, `seed_from_mnemonic`, `mnemonic_from_seed`

**Utility** (13): `ping`, `validate_address`, `encode_address`, `decode_address`, `get_application_address`, `bytes_to_bigint`, `bigint_to_bytes`, `encode_uint64`, `decode_uint64`, `verify_bytes`, `sign_bytes`, `encode_obj`, `decode_obj`

**Transaction** (18): `make_payment_txn`, `make_keyreg_txn`, `make_asset_create_txn`, `make_asset_config_txn`, `make_asset_destroy_txn`, `make_asset_freeze_txn`, `make_asset_transfer_txn`, `make_app_create_txn`, `make_app_update_txn`, `make_app_delete_txn`, `make_app_optin_txn`, `make_app_closeout_txn`, `make_app_clear_txn`, `make_app_call_txn`, `assign_group_id`, `sign_transaction`, `encode_unsigned_transaction`, `decode_signed_transaction`

**Algod** (5): `compile_teal`, `disassemble_teal`, `send_raw_transaction`, `simulate_raw_transactions`, `simulate_transactions`

**Algod API** (13): `api_algod_get_account_info`, `api_algod_get_account_application_info`, `api_algod_get_account_asset_info`, `api_algod_get_application_by_id`, `api_algod_get_application_box`, `api_algod_get_application_boxes`, `api_algod_get_asset_by_id`, `api_algod_get_pending_transaction`, `api_algod_get_pending_transactions_by_address`, `api_algod_get_pending_transactions`, `api_algod_get_transaction_params`, `api_algod_get_node_status`, `api_algod_get_node_status_after_block`

**Indexer API** (17): `api_indexer_lookup_account_by_id`, `api_indexer_lookup_account_assets`, `api_indexer_lookup_account_app_local_states`, `api_indexer_lookup_account_created_applications`, `api_indexer_search_for_accounts`, `api_indexer_lookup_applications`, `api_indexer_lookup_application_logs`, `api_indexer_search_for_applications`, `api_indexer_lookup_application_box`, `api_indexer_lookup_application_boxes`, `api_indexer_lookup_asset_by_id`, `api_indexer_lookup_asset_balances`, `api_indexer_lookup_asset_transactions`, `api_indexer_search_for_assets`, `api_indexer_lookup_transaction_by_id`, `api_indexer_lookup_account_transactions`, `api_indexer_search_for_transactions`

**NFDomains** (6): `api_nfd_get_nfd`, `api_nfd_get_nfds_for_addresses`, `api_nfd_get_nfd_activity`, `api_nfd_get_nfd_analytics`, `api_nfd_browse_nfds`, `api_nfd_search_nfds`

**Tinyman DEX** (9): `api_tinyman_get_pool`, `api_tinyman_get_pool_analytics`, `api_tinyman_get_pool_creation_quote`, `api_tinyman_get_liquidity_quote`, `api_tinyman_get_remove_liquidity_quote`, `api_tinyman_get_swap_quote`, `api_tinyman_get_asset_optin_quote`, `api_tinyman_get_validator_optin_quote`, `api_tinyman_get_validator_optout_quote`

**Haystack Router** (3): `api_haystack_get_swap_quote`, `api_haystack_execute_swap`, `api_haystack_needs_optin`

**Pera Asset Verification** (3): `api_pera_asset_verification_status`, `api_pera_verified_asset_details`, `api_pera_verified_asset_search`

**Alpha Arcade** (14): `alpha_get_live_markets`, `alpha_get_reward_markets`, `alpha_get_market`, `alpha_get_orderbook`, `alpha_get_open_orders`, `alpha_get_positions`, `alpha_create_limit_order`, `alpha_create_market_order`, `alpha_cancel_order`, `alpha_amend_order`, `alpha_propose_match`, `alpha_split_shares`, `alpha_merge_shares`, `alpha_claim`

**x402 HTTP Payments** (5): `x402_discover_payment_requirements`, `make_http_request_with_x402`, `bazaar_list`, `bazaar_search`, `bazaar_get_resource_details` — Coinbase Wallet MCP-compatible x402 payment tools plus Bazaar discovery directory queries against `facilitator.goplausible.xyz`

**ARC-26 URI** (1): `generate_algorand_qrcode`

**Knowledge Base** (1): `get_knowledge_doc`

## Pagination

API responses are paginated. All API tools accept optional `itemsPerPage` (default 10) and `pageToken` parameters. Pass `pageToken` from a previous response to fetch the next page.

## x402 Payment Workflow

Use the two algorand-mcp x402 tools to access x402-protected HTTP resources — the MCP tools handle transaction construction, signing, base64 encoding, and `PAYMENT-SIGNATURE` assembly internally. You only orchestrate the discover → select → pay flow.

### Recommended supervised pattern (default)

1. **Probe** the endpoint to read what it costs:
   ```
   x402_discover_payment_requirements {
     baseURL: "https://example.x402.goplausible.xyz",
     path: "/avm/weather",
     method: "GET"
   }
   ```

2. **Inspect** the returned `accepts[]` array. Pick the entry you'll pay with — usually the cheapest Algorand entry on the network you want, within budget. On mainnet, confirm the cost with the user before continuing.

3. **Pay and fetch** in one call, passing the pre-fetched requirements back so the tool doesn't re-probe:
   ```
   make_http_request_with_x402 {
     baseURL: "https://example.x402.goplausible.xyz",
     path: "/avm/weather",
     method: "GET",
     paymentRequirements: <accepts[] from step 1>,
     preferredNetwork: "testnet",
     maxAmountPerRequest: 10000
   }
   ```

### Faster unsupervised pattern (testnet, known endpoints)

Skip step 1. Call `make_http_request_with_x402 { baseURL, path, method }` — it discovers, selects the cheapest affordable Algorand requirement, builds the atomic group, signs the payment leg with the active wallet, retries, and returns the resource. Always pass `maxAmountPerRequest` as a guardrail; pass `preferredNetwork` to pin testnet/mainnet.

### Bazaar discovery (find paid resources to call)

Three tools query the facilitator's directory of cataloged paid resources:

- `bazaar_list { network?, method?, merchantId?, limit?, offset?, full? }` — browse cataloged resources. Compact summary per item by default (URL, description, Algorand-payable accepts, popularity counters); pass `full: true` for verbatim records including `discoveryInfo`.
- `bazaar_search { query, limit?, network?, includeTestnets?, scheme?, maxUsdPrice?, asset?, payTo?, extensions? }` — keyword search with budget and asset filters.
- `bazaar_get_resource_details { resource }` — fetch a single resource by exact URL.

Then feed the chosen `accepts[]` (or the `resourceUrl`) into `make_http_request_with_x402`.

### Always

- **Mainnet = real money** — confirm cost with the user before mainnet payments. Use `maxAmountPerRequest` as a budget cap.
- Amounts are in **atomic units**. USDC has 6 decimals: 1,000,000 atomic units = $1.00.
- `preferredNetwork` accepts `mainnet | testnet | localnet`; if omitted, the selector picks the cheapest affordable Algorand entry regardless of which Algorand network it's on.
- **`paymentRequirements` is an ARRAY OF OBJECTS** — `preferredNetwork` and `maxAmountPerRequest` are TOP-LEVEL siblings, not array members. The schema rejects malformed inputs with a specific message.

For reference examples and common error reactions, see [references/examples-algorand-mcp.md](references/examples-algorand-mcp.md).

## NFD Important Note

When using NFD (`.algo` names), always use the `depositAccount` field from the NFD response for transactions, NOT other address fields.

## Security

- **Mainnet = real value** — always confirm with user before mainnet transactions
- Never log, display, or store mnemonics or secret keys — use `wallet_*` tools for signing
- Verify recipient addresses with `validate_address` — transactions are irreversible
- Verify asset IDs on-chain — scam tokens use similar names

## References

- **Tool Reference**: [references/algorand-mcp.md](references/algorand-mcp.md)
- **Workflow Examples** (including x402 payment): [references/examples-algorand-mcp.md](references/examples-algorand-mcp.md)

## Links

- [GoPlausible](https://goplausible.com) · [Algorand](https://algorand.co) · [Algorand Developer Docs](https://dev.algorand.co/)
- Testnet Faucets: [ALGO](https://lora.algokit.io/testnet/fund) · [USDC](https://faucet.circle.com/)
- x402: [Portal](https://x402.goplausible.xyz) · [Test Endpoints](https://example.x402.goplausible.xyz/) · [Facilitator](https://facilitator.goplausible.xyz) · [Documentation](https://github.com/GoPlausible/.github/blob/main/profile/algorand-x402-documentation/README.md) · [Examples](https://github.com/GoPlausible/x402-avm/tree/branch-v2-algorand-publish/examples/)
- [Algorand Developer Portal (GitHub)](https://github.com/algorandfoundation/devportal) · [Code Examples](https://github.com/algorandfoundation/devportal-code-examples)
- [CAIP-2 Specification](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) · [Coinbase x402 Protocol](https://github.com/coinbase/x402)
