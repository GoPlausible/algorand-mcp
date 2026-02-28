# Algorand MCP — Agent Guide

This document describes how AI agents should interact with the Algorand blockchain through the Algorand MCP server. It covers tool usage patterns, transaction workflows, safety rules, and common pitfalls.

## Overview

Algorand MCP is a **local** MCP server that runs on the user's machine. It provides 99 tools across 11 categories for full Algorand blockchain access. Private keys are stored in the **OS keychain** — they never appear in tool responses, logs, or MCP messages.

**Key difference from remote MCP servers**: This server runs locally, signing happens on the user's machine using OS keychain-stored keys, and the agent provides the `network` parameter (`mainnet`, `testnet`, or `localnet`) on each tool call.

## Session Start

At the beginning of every Algorand session:

1. **Check wallet** — Call `wallet_get_info` with the target network to verify a wallet account exists and is active.
2. **If no accounts** — Guide the user to create one with `wallet_add_account` (sets nickname and spending limits).
3. **If account needs funding** — Generate an ARC-26 QR code with `generate_algorand_uri` or direct the user to the testnet faucet: https://lora.algokit.io/testnet/fund

## Network Selection

Every tool that interacts with the blockchain accepts a `network` parameter:

| Value | Description |
|-------|-------------|
| `mainnet` | Algorand mainnet (default if omitted) — **real value, exercise caution** |
| `testnet` | Algorand testnet — safe for development and testing |
| `localnet` | Local development network (requires `ALGORAND_LOCALNET_URL` env var) |

Always confirm with the user which network to use before transactions. Default to `testnet` during development.

## Amounts and Decimals

| Asset | Unit | 1 Whole Token = |
|-------|------|-----------------|
| ALGO | microAlgos | 1,000,000 |
| USDC (ASA 31566704) | micro-units | 1,000,000 (6 decimals) |
| Custom ASAs | base units | Depends on `decimals` field |

Always check the asset's `decimals` field with `api_algod_get_asset_by_id` before computing amounts.

## Common Mainnet Assets

| Asset | ASA ID | Decimals |
|-------|--------|----------|
| ALGO | native | 6 |
| USDC | 31566704 | 6 |
| USDT | 312769 | 6 |
| goETH | 386192725 | 8 |
| goBTC | 386195940 | 8 |

> Always verify asset IDs on-chain — scam tokens use similar names.

## Pre-Transaction Checklist

Before ANY transaction:

1. **MBR (Minimum Balance Requirement)** — Account needs 0.1 ALGO base + 0.1 ALGO per asset opt-in + 0.1 ALGO per app opt-in.
2. **Asset opt-in** — Verify with `api_algod_get_account_asset_info` before ASA transfers. If not opted in, opt-in first.
3. **Fees** — Every transaction costs 0.001 ALGO (1,000 microAlgos) minimum.
4. **Balance check** — Fetch current balance with `wallet_get_info` or `api_algod_get_account_info` before signing.
5. **Spending limits** — The wallet enforces per-transaction (`allowance`) and daily (`dailyAllowance`) spending limits set at account creation.
6. **Order** — Fund the account with ALGO first, then do asset transactions.

## Transaction Types

| Type | Code | Tools |
|------|------|-------|
| ALGO payment | `pay` | `make_payment_txn` |
| Asset transfer / opt-in | `axfer` | `make_asset_transfer_txn` |
| Asset create / config / destroy | `acfg` | `make_asset_create_txn`, `make_asset_config_txn`, `make_asset_destroy_txn` |
| Asset freeze | `afrz` | `make_asset_freeze_txn` |
| Application (smart contract) | `appl` | `make_app_create_txn`, `make_app_call_txn`, `make_app_update_txn`, `make_app_delete_txn`, `make_app_optin_txn`, `make_app_closeout_txn`, `make_app_clear_txn` |
| Key registration | `keyreg` | `make_keyreg_txn` |

## Wallet Transaction Workflow (Recommended)

Use the wallet tools for signing — they enforce spending limits and keep keys in the OS keychain.

| Step | Tool | Purpose |
|------|------|---------|
| 1 | `wallet_get_info` | Verify active account, check balance |
| 2 | Query tools | Get blockchain data (account info, asset info, etc.) |
| 3 | `make_*_txn` | Build the transaction |
| 4 | `wallet_sign_transaction` | Sign with active wallet account (enforces limits) |
| 5 | `send_raw_transaction` | Submit signed transaction to network |
| 6 | Query tools | Verify result on-chain |

### One-Step Asset Opt-In

For asset opt-ins, use the shortcut:

```
wallet_optin_asset { assetId: 31566704, network: "testnet" }
```

This creates, signs, and submits the opt-in in a single call.

## External Key Transaction Workflow

When the user provides their own secret key (not using the wallet):

| Step | Tool | Purpose |
|------|------|---------|
| 1 | `make_*_txn` | Build the transaction |
| 2 | `sign_transaction` | Sign with provided secret key hex |
| 3 | `send_raw_transaction` | Submit signed transaction |

## Atomic Group Transaction Workflow

For atomic (all-or-nothing) multi-transaction groups:

| Step | Tool | Purpose |
|------|------|---------|
| 1 | `make_*_txn` (multiple) | Build each transaction |
| 2 | `assign_group_id` | Assign group ID to all transactions |
| 3 | `wallet_sign_transaction_group` | Sign all transactions in group with wallet |
| 4 | `send_raw_transaction` | Submit all signed transactions |

## Tool Categories

### Wallet (10 tools)
Secure wallet with OS keychain storage. Keys never exposed to agents.

| Tool | Purpose |
|------|---------|
| `wallet_add_account` | Create or import account with nickname + spending limits |
| `wallet_remove_account` | Remove account by nickname or index |
| `wallet_list_accounts` | List all accounts with nicknames and addresses |
| `wallet_switch_account` | Switch active account by nickname or index |
| `wallet_get_info` | Active account info: address, balance, limits |
| `wallet_get_assets` | Asset holdings for active account |
| `wallet_sign_transaction` | Sign single transaction (enforces spending limits) |
| `wallet_sign_transaction_group` | Sign atomic group (auto-assigns group ID) |
| `wallet_sign_data` | Sign arbitrary hex data with raw Ed25519 |
| `wallet_optin_asset` | One-step asset opt-in (create + sign + submit) |

### Account Management (8 tools)
Key derivation and account creation (keys returned in the clear — use wallet tools for secure storage).

`create_account`, `rekey_account`, `mnemonic_to_mdk`, `mdk_to_mnemonic`, `secret_key_to_mnemonic`, `mnemonic_to_secret_key`, `seed_from_mnemonic`, `mnemonic_from_seed`

### Utility (13 tools)
Address validation, encoding, signing, and server health.

`ping`, `validate_address`, `encode_address`, `decode_address`, `get_application_address`, `bytes_to_bigint`, `bigint_to_bytes`, `encode_uint64`, `decode_uint64`, `verify_bytes`, `sign_bytes`, `encode_obj`, `decode_obj`

### Transaction Building (16 tools)
Build unsigned transaction objects. Must be signed before submission.

`make_payment_txn`, `make_keyreg_txn`, `make_asset_create_txn`, `make_asset_config_txn`, `make_asset_destroy_txn`, `make_asset_freeze_txn`, `make_asset_transfer_txn`, `make_app_create_txn`, `make_app_update_txn`, `make_app_delete_txn`, `make_app_optin_txn`, `make_app_closeout_txn`, `make_app_clear_txn`, `make_app_call_txn`, `assign_group_id`, `sign_transaction`

### Algod (5 tools)
TEAL compilation, transaction simulation, and submission.

`compile_teal`, `disassemble_teal`, `send_raw_transaction`, `simulate_raw_transactions`, `simulate_transactions`

### Algod API (13 tools)
Direct algod node queries for account, asset, application, and transaction data.

`api_algod_get_account_info`, `api_algod_get_account_application_info`, `api_algod_get_account_asset_info`, `api_algod_get_application_by_id`, `api_algod_get_application_box`, `api_algod_get_application_boxes`, `api_algod_get_asset_by_id`, `api_algod_get_pending_transaction`, `api_algod_get_pending_transactions_by_address`, `api_algod_get_pending_transactions`, `api_algod_get_transaction_params`, `api_algod_get_node_status`, `api_algod_get_node_status_after_block`

### Indexer API (17 tools)
Historical blockchain queries — accounts, assets, transactions, applications.

`api_indexer_lookup_account_by_id`, `api_indexer_lookup_account_assets`, `api_indexer_lookup_account_app_local_states`, `api_indexer_lookup_account_created_applications`, `api_indexer_search_for_accounts`, `api_indexer_lookup_applications`, `api_indexer_lookup_application_logs`, `api_indexer_search_for_applications`, `api_indexer_lookup_application_box`, `api_indexer_lookup_application_boxes`, `api_indexer_lookup_asset_by_id`, `api_indexer_lookup_asset_balances`, `api_indexer_lookup_asset_transactions`, `api_indexer_search_for_assets`, `api_indexer_lookup_transaction_by_id`, `api_indexer_lookup_account_transactions`, `api_indexer_search_for_transactions`

### NFDomains (6 tools)
Algorand Name Service (`.algo` names).

`api_nfd_get_nfd`, `api_nfd_get_nfds_for_addresses`, `api_nfd_get_nfd_activity`, `api_nfd_get_nfd_analytics`, `api_nfd_browse_nfds`, `api_nfd_search_nfds`

> **NFD Important**: When using NFD names for transactions, always use the `depositAccount` field from the NFD response, NOT other address fields.

### Tinyman AMM (9 tools)
Decentralized exchange operations.

`api_tinyman_get_pool`, `api_tinyman_get_pool_analytics`, `api_tinyman_get_pool_creation_quote`, `api_tinyman_get_liquidity_quote`, `api_tinyman_get_remove_liquidity_quote`, `api_tinyman_get_swap_quote`, `api_tinyman_get_asset_optin_quote`, `api_tinyman_get_validator_optin_quote`, `api_tinyman_get_validator_optout_quote`

### ARC-26 URI (1 tool)
Generate Algorand payment URIs and QR codes per the ARC-26 specification.

`generate_algorand_uri`

### Knowledge Base (1 tool)
Access the embedded Algorand developer documentation taxonomy.

`get_knowledge_doc`

Knowledge categories: `arcs`, `sdks`, `algokit`, `algokit-utils`, `tealscript`, `puya`, `liquid-auth`, `python`, `developers`, `clis`, `nodes`, `details`

## Pagination

API responses are paginated. Every API tool accepts optional `itemsPerPage` (default 10) and `pageToken` parameters. Pass `pageToken` from a previous response to fetch the next page.

## Security Rules

1. **Mainnet = real value** — Always confirm with the user before mainnet transactions.
2. **Private keys** — Never log, display, or store mnemonics/secret keys outside the wallet system. Use `wallet_add_account` to import keys securely.
3. **Address verification** — Validate addresses with `validate_address` before transactions. Transactions are irreversible.
4. **Asset verification** — Verify asset IDs on-chain before interacting. Scam tokens use similar names.
5. **Spending limits** — Respect wallet spending limits. If a transaction is rejected for exceeding limits, inform the user rather than bypassing.

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| `No active account` | No wallet account configured | Guide user to `wallet_add_account` |
| `Invalid Algorand address format` | Bad address | Check with `validate_address` |
| `Spending limit exceeded` | Transaction exceeds `allowance` or `dailyAllowance` | Inform user, adjust limits |
| `Asset hasn't been opted in` | Recipient not opted in to ASA | Opt-in first |
| `Overspend` / negative balance | Insufficient funds for amount + fee + MBR | Add funds or reduce amount |
| `Do not know how to serialize a BigInt` | BigInt in JSON response | Should not occur (patched globally) |

## Links

- GoPlausible: https://goplausible.com
- Testnet Faucet: https://lora.algokit.io/testnet/fund
- AlgoNode (public nodes): https://algonode.io
- Algorand Developer Docs: https://developer.algorand.org
