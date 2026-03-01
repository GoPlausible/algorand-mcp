# Algorand MCP Server

[![npm downloads](https://img.shields.io/npm/dm/@goplausible/algorand-mcp.svg)](https://www.npmjs.com/package/@goplausible/algorand-mcp)
[![npm version](https://badge.fury.io/js/algorand-mcp.svg)](https://badge.fury.io/js/algorand-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that gives AI agents and LLMs full access to the Algorand blockchain. Built by [GoPlausible](https://goplausible.com).

Algorand is a carbon-negative, pure proof-of-stake Layer 1 blockchain with instant finality, low fees, and built-in support for smart contracts (AVM), standard assets (ASAs), and atomic transactions.

## What is MCP?

[Model Context Protocol](https://modelcontextprotocol.io/) is an open standard that lets AI applications connect to external tools and data sources. This server exposes Algorand blockchain operations as MCP tools that any compatible AI client can use — Claude Desktop, Claude Code, Cursor, Windsurf, and others.

## Features

- Secure wallet management via OS keychain — private keys never exposed to agents or LLMs
- Account creation, key management, and rekeying
- Transaction building, signing, and submission (payments, assets, applications, key registration)
- Atomic transaction groups
- TEAL compilation and disassembly
- Full Algod and Indexer API access
- NFDomains (NFD) name service integration
- Tinyman AMM integration (pools, swaps, liquidity)
- ARC-26 URI and QR code generation
- Algorand knowledge base with full developer documentation taxonomy
- Per-tool-call network selection (mainnet, testnet, localnet) and pagination

## Requirements

- Node.js v20 or later
- npm, pnpm, or yarn

## Installation

### From npm

```bash
npm install -g algorand-mcp
```

### From source

```bash
git clone https://github.com/GoPlausible/algorand-mcp.git
cd algorand-mcp
npm install
npm run build
```

## MCP Configuration

The server runs over stdio. Add it to your MCP client configuration to start using it.

### Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/algorand-mcp/dist/index.js"]
    }
  }
}
```

### Claude Code

Create `.mcp.json` in your project root (project scope) or configure in `~/.claude.json` (user scope):

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "type": "stdio",
      "command": "node",
      "args": ["/absolute/path/to/algorand-mcp/dist/index.js"]
    }
  }
}
```

### Cursor / Windsurf

These editors use the same JSON format as Claude Desktop. Add the server entry to the MCP settings panel or the corresponding config file for your editor.

### Using global npm install

If you installed globally via `npm install -g algorand-mcp`, you can use the binary name directly:

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "algorand-mcp"
    }
  }
}
```

That's it — **no environment variables are required** for standard use. Network selection, pagination, and node URLs are all handled dynamically.

## Network Selection

Every tool accepts an optional `network` parameter: `"mainnet"` (default), `"testnet"`, or `"localnet"`. Algod and Indexer URLs are built-in for mainnet and testnet via [AlgoNode](https://algonode.io/).

Example tool call:
```json
{ "name": "api_algod_get_account_info", "arguments": { "address": "ABC...", "network": "testnet" } }
```

If no `network` is provided, tools default to **mainnet**.

## Pagination

API responses are automatically paginated. Every tool accepts an optional `itemsPerPage` parameter (default: 10). Pass the `pageToken` from a previous response to fetch the next page.

## Secure Wallet

### Architecture

The wallet system has two layers of storage, each with a distinct security role:

| Layer | What it stores | Where | Encryption |
|---|---|---|---|
| **OS Keychain** | Mnemonics (secret keys) | macOS Keychain / Linux libsecret / Windows Credential Manager | OS-managed, hardware-backed where available |
| **Embedded SQLite** | Account metadata (nicknames, allowances, spend tracking) | `~/.algorand-mcp/wallet.db` | Plaintext (no secrets) |

**Private key material never appears in tool responses, MCP config files, environment variables, or logs.** The agent only sees addresses, public keys, and signed transaction blobs.

### How it works

```
  Agent (LLM)                    MCP Server                     Storage
  ──────────                     ──────────                     ───────
       │                              │                              │
       │  wallet_add_account          │                              │
       │  { nickname: "main" }        │                              │
       │ ──────────────────────────►  │  generate keypair            │
       │                              │  store mnemonic ──────────►  │  OS Keychain (encrypted)
       │                              │  store metadata ──────────►  │  SQLite (nickname, limits)
       │  ◄─ { address, publicKey }   │                              │
       │                              │                              │
       │  wallet_sign_transaction     │                              │
       │  { transaction: {...} }      │                              │
       │ ──────────────────────────►  │  check spending limits       │
       │                              │  retrieve mnemonic ◄──────  │  OS Keychain
       │                              │  sign in memory              │
       │  ◄─ { txID, blob }          │  (key discarded)             │
       │                              │                              │
```

1. **Account creation** (`wallet_add_account`) — Generates a keypair (or imports a mnemonic), stores the mnemonic in the OS keychain, and stores metadata (nickname, spending limits) in SQLite. Returns **only** address and public key.
2. **Active account** — One account is active at a time. `wallet_switch_account` changes it by nickname or index. All signing and query tools operate on the active account.
3. **Transaction signing** (`wallet_sign_transaction`) — Checks per-transaction and daily spending limits, retrieves the key from the keychain, signs in memory, discards the key. Returns only the signed blob.
4. **Data signing** (`wallet_sign_data`) — Signs arbitrary hex data using raw Ed25519 via the [`@noble/curves`](https://github.com/paulmillr/noble-curves) library (no Algorand SDK prefix). Useful for off-chain authentication.
5. **Asset opt-in** (`wallet_optin_asset`) — Creates, signs, and submits an opt-in transaction for the active account in one step.

### Spending limits

Each account has two configurable limits (in microAlgos, 0 = unlimited):

- **`allowance`** — Maximum amount per single transaction. Rejects any transaction exceeding this.
- **`dailyAllowance`** — Maximum total spend per calendar day across all transactions. Automatically resets at midnight. Tracked in SQLite.

### Platform keychain support

The keychain backend is provided by [`@napi-rs/keyring`](https://github.com/nicolo-ribaudo/napi-keyring) (Rust-based, prebuilt binaries):

| Platform | Backend |
|---|---|
| macOS | Keychain Services (the system Keychain app) |
| Linux | libsecret (GNOME Keyring) or KWallet |
| Windows | Windows Credential Manager |

All credentials are stored under the service name `algorand-mcp`. You can inspect them with your OS keychain app (e.g. Keychain Access on macOS).

## Optional Environment Variables

Environment variables are only needed for special setups. Pass them via the `env` block in your MCP config.

| Variable | Description | Default | When needed |
|---|---|---|---|
| `ALGORAND_TOKEN` | API token for private/authenticated nodes | `""` | Connecting to a private Algod/Indexer node |
| `ALGORAND_LOCALNET_URL` | Localnet base URL | `""` | Using `network: "localnet"` (e.g. `http://localhost:4001`) |

### Example: localnet (AlgoKit)

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "node",
      "args": ["/path/to/algorand-mcp/dist/index.js"],
      "env": {
        "ALGORAND_LOCALNET_URL": "http://localhost:4001",
        "ALGORAND_TOKEN": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }
  }
}
```

Then use `"network": "localnet"` in your tool calls.

## Available Tools

### Wallet Tools (10 tools)

See [Secure Wallet](#secure-wallet) for full architecture details.

| Tool | Description |
|---|---|
| `wallet_add_account` | Create a new Algorand account with nickname and spending limits (returns address + public key only) |
| `wallet_remove_account` | Remove an account from the wallet by nickname or index |
| `wallet_list_accounts` | List all accounts with nicknames, addresses, and limits |
| `wallet_switch_account` | Switch the active account by nickname or index |
| `wallet_get_info` | Get active account info: address, public key, balance, and spending limits |
| `wallet_get_assets` | Get all asset holdings for the active account |
| `wallet_sign_transaction` | Sign a single transaction with the active account (enforces spending limits) |
| `wallet_sign_transaction_group` | Sign a group of transactions with the active account (auto-assigns group ID) |
| `wallet_sign_data` | Sign arbitrary hex data with raw Ed25519 (noble, no SDK prefix) |
| `wallet_optin_asset` | Opt the active account into an asset (creates, signs, and submits) |

### Account Management (8 tools)

| Tool | Description |
|---|---|
| `create_account` | Create a new Algorand account (returns address + mnemonic in the clear) |
| `rekey_account` | Rekey an account to a new address |
| `mnemonic_to_mdk` | Convert mnemonic to master derivation key |
| `mdk_to_mnemonic` | Convert master derivation key to mnemonic |
| `secret_key_to_mnemonic` | Convert secret key to mnemonic |
| `mnemonic_to_secret_key` | Convert mnemonic to secret key |
| `seed_from_mnemonic` | Generate seed from mnemonic |
| `mnemonic_from_seed` | Generate mnemonic from seed |

### Utility Tools (13 tools)

| Tool | Description |
|---|---|
| `ping` | Server connectivity check and info |
| `validate_address` | Check if an Algorand address is valid |
| `encode_address` | Encode a public key to an Algorand address |
| `decode_address` | Decode an Algorand address to a public key |
| `get_application_address` | Get address for a given application ID |
| `bytes_to_bigint` | Convert bytes to BigInt |
| `bigint_to_bytes` | Convert BigInt to bytes |
| `encode_uint64` | Encode uint64 to bytes |
| `decode_uint64` | Decode bytes to uint64 |
| `verify_bytes` | Verify signature against bytes |
| `sign_bytes` | Sign bytes with a secret key |
| `encode_obj` | Encode object to msgpack |
| `decode_obj` | Decode msgpack to object |

### Transaction Tools (16 tools)

| Tool | Description |
|---|---|
| `make_payment_txn` | Create a payment transaction |
| `make_keyreg_txn` | Create a key registration transaction |
| `make_asset_create_txn` | Create an asset creation transaction |
| `make_asset_config_txn` | Create an asset configuration transaction |
| `make_asset_destroy_txn` | Create an asset destroy transaction |
| `make_asset_freeze_txn` | Create an asset freeze transaction |
| `make_asset_transfer_txn` | Create an asset transfer transaction |
| `make_app_create_txn` | Create an application creation transaction |
| `make_app_update_txn` | Create an application update transaction |
| `make_app_delete_txn` | Create an application delete transaction |
| `make_app_optin_txn` | Create an application opt-in transaction |
| `make_app_closeout_txn` | Create an application close-out transaction |
| `make_app_clear_txn` | Create an application clear state transaction |
| `make_app_call_txn` | Create an application call transaction |
| `assign_group_id` | Assign group ID for atomic transactions |
| `sign_transaction` | Sign a transaction with a secret key |

### Algod Tools (5 tools)

| Tool | Description |
|---|---|
| `compile_teal` | Compile TEAL source code |
| `disassemble_teal` | Disassemble TEAL bytecode to source |
| `send_raw_transaction` | Submit signed transactions to the network |
| `simulate_raw_transactions` | Simulate raw transactions |
| `simulate_transactions` | Simulate transactions with detailed config |

### Algod API Tools (13 tools)

| Tool | Description |
|---|---|
| `api_algod_get_account_info` | Get account balance, assets, and auth address |
| `api_algod_get_account_application_info` | Get account-specific application info |
| `api_algod_get_account_asset_info` | Get account-specific asset info |
| `api_algod_get_application_by_id` | Get application information |
| `api_algod_get_application_box` | Get application box by name |
| `api_algod_get_application_boxes` | Get all application boxes |
| `api_algod_get_asset_by_id` | Get asset information |
| `api_algod_get_pending_transaction` | Get pending transaction info |
| `api_algod_get_pending_transactions_by_address` | Get pending transactions for an address |
| `api_algod_get_pending_transactions` | Get all pending transactions |
| `api_algod_get_transaction_params` | Get suggested transaction parameters |
| `api_algod_get_node_status` | Get current node status |
| `api_algod_get_node_status_after_block` | Get node status after a specific round |

### Indexer API Tools (17 tools)

| Tool | Description |
|---|---|
| `api_indexer_lookup_account_by_id` | Get account information |
| `api_indexer_lookup_account_assets` | Get account assets |
| `api_indexer_lookup_account_app_local_states` | Get account app local states |
| `api_indexer_lookup_account_created_applications` | Get apps created by account |
| `api_indexer_search_for_accounts` | Search accounts with filters |
| `api_indexer_lookup_applications` | Get application information |
| `api_indexer_lookup_application_logs` | Get application log messages |
| `api_indexer_search_for_applications` | Search applications |
| `api_indexer_lookup_application_box` | Get application box by name |
| `api_indexer_lookup_application_boxes` | Get all application boxes |
| `api_indexer_lookup_asset_by_id` | Get asset info and configuration |
| `api_indexer_lookup_asset_balances` | Get asset holders and balances |
| `api_indexer_lookup_asset_transactions` | Get transactions for an asset |
| `api_indexer_search_for_assets` | Search assets |
| `api_indexer_lookup_transaction_by_id` | Get transaction by ID |
| `api_indexer_lookup_account_transactions` | Get account transaction history |
| `api_indexer_search_for_transactions` | Search transactions |

### NFDomains Tools (6 tools)

| Tool | Description |
|---|---|
| `api_nfd_get_nfd` | Get NFD by name or application ID |
| `api_nfd_get_nfds_for_addresses` | Get NFDs for specific addresses |
| `api_nfd_get_nfd_activity` | Get activity/changes for NFDs |
| `api_nfd_get_nfd_analytics` | Get NFD analytics data |
| `api_nfd_browse_nfds` | Browse NFDs with filters |
| `api_nfd_search_nfds` | Search NFDs |

### Tinyman AMM Tools (9 tools)

| Tool | Description |
|---|---|
| `api_tinyman_get_pool` | Get pool info by asset pair |
| `api_tinyman_get_pool_analytics` | Get pool analytics |
| `api_tinyman_get_pool_creation_quote` | Get quote for creating a pool |
| `api_tinyman_get_liquidity_quote` | Get quote for adding liquidity |
| `api_tinyman_get_remove_liquidity_quote` | Get quote for removing liquidity |
| `api_tinyman_get_swap_quote` | Get quote for swapping assets |
| `api_tinyman_get_asset_optin_quote` | Get quote for asset opt-in |
| `api_tinyman_get_validator_optin_quote` | Get quote for validator opt-in |
| `api_tinyman_get_validator_optout_quote` | Get quote for validator opt-out |

### ARC-26 URI Tools (1 tool)

| Tool | Description |
|---|---|
| `generate_algorand_uri` | Generate Algorand URI and QR code per ARC-26 spec |

### Knowledge Tools (1 tool)

| Tool | Description |
|---|---|
| `get_knowledge_doc` | Get markdown content for Algorand knowledge documents |


## Resources

The server exposes MCP resources for direct data access. Wallet resources are described in the [Secure Wallet](#secure-wallet) section above.

### Knowledge Resources

| URI | Description |
|---|---|
| `algorand://knowledge/taxonomy` | Full Algorand knowledge taxonomy |
| `algorand://knowledge/taxonomy/arcs` | Algorand Request for Comments |
| `algorand://knowledge/taxonomy/sdks` | SDK documentation |
| `algorand://knowledge/taxonomy/algokit` | AlgoKit documentation |
| `algorand://knowledge/taxonomy/algokit-utils` | AlgoKit Utils documentation |
| `algorand://knowledge/taxonomy/tealscript` | TEALScript documentation |
| `algorand://knowledge/taxonomy/puya` | Puya documentation |
| `algorand://knowledge/taxonomy/liquid-auth` | Liquid Auth documentation |
| `algorand://knowledge/taxonomy/python` | Python SDK documentation |
| `algorand://knowledge/taxonomy/developers` | Developer documentation |
| `algorand://knowledge/taxonomy/clis` | CLI tools documentation |
| `algorand://knowledge/taxonomy/nodes` | Node management documentation |
| `algorand://knowledge/taxonomy/details` | Technical details documentation |

## Project Structure

```
algorand-mcp/
├── src/                         # TypeScript source
│   ├── index.ts                 # Server entry point
│   ├── networkConfig.ts         # Hardcoded network URLs and client factories
│   ├── algorand-client.ts       # Re-exports from networkConfig
│   ├── env.ts                   # Legacy env shim (unused)
│   ├── types.ts                 # Shared types (Zod schemas)
│   ├── resources/               # MCP Resources
│   │   ├── knowledge/           # Documentation taxonomy
│   │   └── wallet/              # Wallet resources
│   ├── tools/                   # MCP Tools
│   │   ├── commonParams.ts      # Network + pagination schema fragments
│   │   ├── walletManager.ts     # Secure wallet (keychain + SQLite)
│   │   ├── accountManager.ts    # Account operations
│   │   ├── utilityManager.ts    # Utility functions
│   │   ├── algodManager.ts      # TEAL compile, simulate, submit
│   │   ├── arc26Manager.ts      # ARC-26 URI generation
│   │   ├── knowledgeManager.ts  # Knowledge document access
│   │   ├── transactionManager/  # Transaction building
│   │   │   ├── accountTransactions.ts
│   │   │   ├── assetTransactions.ts
│   │   │   ├── appTransactions/
│   │   │   └── generalTransaction.ts
│   │   └── apiManager/          # API integrations
│   │       ├── algod/           # Algod API
│   │       ├── indexer/         # Indexer API
│   │       ├── nfd/             # NFDomains
│   │       ├── tinyman/         # Tinyman AMM
│   │       └── example/         # Example tools
│   └── utils/
│       └── responseProcessor.ts # Pagination and formatting
├── tests/                       # Test suite
│   ├── helpers/                 # Shared test utilities
│   │   ├── mockFactories.ts     # Mock algod/indexer/keychain factories
│   │   ├── testConfig.ts        # Category enable/disable logic
│   │   ├── e2eSetup.ts          # E2E account provisioning + invokeTool()
│   │   └── testConstants.ts     # Well-known testnet addresses and asset IDs
│   ├── unit/                    # 11 unit test suites (mocked, fast)
│   ├── e2e/                     # 11 E2E test suites (live testnet)
│   │   ├── globalSetup.ts       # Account provisioning + fund-check
│   │   └── globalTeardown.ts    # Cleanup
│   └── jest.config.e2e.js       # E2E-specific Jest config
├── dist/                        # Compiled output
├── jest.config.js               # Unit test Jest config
├── tsconfig.json                # Production TypeScript config
├── tsconfig.test.json           # Test TypeScript config
└── package.json
```

## Response Format

All tool responses follow the MCP content format. API responses include automatic pagination when datasets exceed `itemsPerPage` (default 10):

```json
{
  "data": { ... },
  "metadata": {
    "totalItems": 100,
    "itemsPerPage": 10,
    "currentPage": 1,
    "totalPages": 10,
    "hasNextPage": true,
    "pageToken": "eyJ..."
  }
}
```

Pass `pageToken` from a previous response to fetch the next page. Set `itemsPerPage` on any tool call to control page size.

## Development

```bash
# Install dependencies
npm install

# Type-check
npm run typecheck

# Build
npm run build

# Clean build output
npm run clean
```

## Testing

The project has a comprehensive dual-layer test suite: fast **unit tests** (mocked, no network) and real **E2E tests** (live testnet). Both use [Jest 29](https://jestjs.io/) with [ts-jest](https://kulshekhar.github.io/ts-jest/) and ESM support.

### Quick start

```bash
npm test                    # Unit tests (fast, no network)
npm run test:e2e            # E2E tests (testnet, generates account + fund link)
npm run test:all            # Both
```

### Unit tests

Unit tests cover all 11 tool categories with fully mocked network dependencies. They run in parallel and finish in ~5 seconds. No environment variables or funded accounts are needed.

```bash
npm test
```

**Coverage:** 11 suites, 75+ tests covering success paths, error handling, and edge cases for every tool category.

| Suite | What it tests |
|---|---|
| `accountManager` | Account creation, mnemonic round-trips, rekey parameter validation |
| `utilityManager` | Ping, address validation, encode/decode, sign/verify bytes, encode/decode objects |
| `walletManager` | Full lifecycle: add → list → switch → get info → sign data → remove (mocked keychain + SQLite) |
| `transactionManager` | Payment, asset, app transaction building; sign_transaction; assign_group_id |
| `algodManager` | TEAL compile/disassemble, send raw, simulate |
| `apiAlgod` | All 13 algod API tools with correct mock routing |
| `apiIndexer` | All 17 indexer API tools with fluent builder mocks |
| `apiNfd` | NFD get/search/browse with mocked fetch |
| `apiTinyman` | Tinyman pool/swap with error handling |
| `arc26Manager` | ARC-26 URI generation and QR code SVG output |
| `knowledgeManager` | Knowledge document retrieval and missing-doc error handling |

#### How mocking works

Unit tests use `jest.unstable_mockModule()` (ESM-compatible) to intercept imports before they load. The shared [tests/helpers/mockFactories.ts](tests/helpers/mockFactories.ts) provides:

- **`setupNetworkMocks()`** — Replaces `algorand-client.ts` with mock algod/indexer clients that return deterministic responses without any network calls.
- **`createKeychainMock()`** — Replaces `@napi-rs/keyring` with an in-memory `Map`, so wallet tests work without an OS keychain.
- **Fluent Proxy mocks** — Algorand's Indexer SDK uses a builder pattern (`.searchForAssets().limit(5).do()`). The mock factory uses ES `Proxy` objects that return themselves for any chained method and resolve when `.do()` is called.

### E2E tests

E2E tests call tool handlers directly against **Algorand testnet** (via [AlgoNode](https://algonode.io/) public nodes). They run serially to avoid rate-limiting.

```bash
npm run test:e2e
```

On first run (no mnemonic provided), the test setup:
1. Generates a new Algorand account
2. Prints the address and mnemonic
3. Prints a fund link: https://lora.algokit.io/testnet/fund
4. Runs all tests (unfunded tests still pass)

To run with a funded account:

```bash
E2E_MNEMONIC="word1 word2 ... word25" npm run test:e2e
```

**Coverage:** 11 suites, 35+ tests covering real network interactions.

| Suite | What it tests |
|---|---|
| `account` | Account creation, mnemonic-to-key round-trip chain |
| `utility` | Ping, address validation, encode/decode, sign/verify bytes, encode/decode objects |
| `wallet` | Full wallet lifecycle: add → list → switch → get info → get assets → sign data → remove |
| `transaction` | Build payment → sign → verify txID; build asset opt-in; build group with assign_group_id |
| `algod` | Compile + disassemble TEAL round-trip |
| `algodApi` | Account info, suggested params, node status, asset info via algod |
| `indexerApi` | Account lookup, asset/transaction/account search via indexer |
| `nfd` | Look up "algo.algo", search NFDs, browse NFDs |
| `tinyman` | Get ALGO/USDC pool |
| `arc26` | Generate ARC-26 URI, verify format + QR SVG |
| `knowledge` | Retrieve known knowledge doc content |

### Category activation

E2E tests can be selectively enabled by category or individual tool via environment variables. **By default all categories are enabled.**

#### Enable specific categories

```bash
E2E_WALLET=1 npm run test:e2e            # Only wallet tests
E2E_ALGOD=1 E2E_UTILITY=1 npm run test:e2e  # Algod + utility tests
```

#### Available category flags

| Env var | Category |
|---|---|
| `E2E_ALL=1` | All categories (explicit) |
| `E2E_WALLET=1` | Wallet tools |
| `E2E_ACCOUNT=1` | Account tools |
| `E2E_UTILITY=1` | Utility tools |
| `E2E_TRANSACTION=1` | Transaction tools |
| `E2E_ALGOD=1` | Algod tools |
| `E2E_ALGOD_API=1` | Algod API tools |
| `E2E_INDEXER_API=1` | Indexer API tools |
| `E2E_NFD=1` | NFDomains tools |
| `E2E_TINYMAN=1` | Tinyman tools |
| `E2E_ARC26=1` | ARC-26 tools |
| `E2E_KNOWLEDGE=1` | Knowledge tools |

**Important:** Setting any individual flag (e.g. `E2E_WALLET=1`) disables all other categories unless `E2E_ALL=1` is also set.

#### Enable specific tools

```bash
E2E_TOOLS=ping,validate_address npm run test:e2e
```

The `E2E_TOOLS` variable accepts a comma-separated list of tool names. Only tests for those specific tools will run.

### Test file structure

```
tests/
├── helpers/
│   ├── mockFactories.ts       # Mock algod/indexer/keychain factories
│   ├── testConfig.ts          # Category enable/disable logic
│   ├── e2eSetup.ts            # E2E account provisioning + invokeTool()
│   └── testConstants.ts       # Well-known testnet addresses and asset IDs
├── unit/                      # 11 unit test files (*.test.ts)
│   ├── accountManager.test.ts
│   ├── utilityManager.test.ts
│   ├── walletManager.test.ts
│   ├── transactionManager.test.ts
│   ├── algodManager.test.ts
│   ├── apiAlgod.test.ts
│   ├── apiIndexer.test.ts
│   ├── apiNfd.test.ts
│   ├── apiTinyman.test.ts
│   ├── arc26Manager.test.ts
│   └── knowledgeManager.test.ts
├── e2e/                       # 11 E2E test files (*.e2e.test.ts)
│   ├── globalSetup.ts         # Account provisioning + fund-check
│   ├── globalTeardown.ts      # Cleanup
│   ├── account.e2e.test.ts
│   ├── utility.e2e.test.ts
│   ├── wallet.e2e.test.ts
│   ├── transaction.e2e.test.ts
│   ├── algod.e2e.test.ts
│   ├── algodApi.e2e.test.ts
│   ├── indexerApi.e2e.test.ts
│   ├── nfd.e2e.test.ts
│   ├── tinyman.e2e.test.ts
│   ├── arc26.e2e.test.ts
│   └── knowledge.e2e.test.ts
└── jest.config.e2e.js         # E2E-specific Jest config
```

### Jest configuration

| Config | Purpose | Key settings |
|---|---|---|
| `jest.config.js` (root) | Unit tests | `testTimeout: 10s`, parallel workers, `testMatch: tests/unit/**` |
| `tests/jest.config.e2e.js` | E2E tests | `testTimeout: 60s`, `maxWorkers: 1` (serial), `globalSetup/globalTeardown` |
| `tsconfig.test.json` | TypeScript for tests | `rootDir: "."`, includes both `src/` and `tests/` |

### Writing new tests

**Unit test template:**

```typescript
import { jest } from '@jest/globals';
import { setupNetworkMocks } from '../helpers/mockFactories.js';

jest.unstable_mockModule('../../src/algorand-client.js', () => setupNetworkMocks());

const { YourManager } = await import('../../src/tools/yourManager.js');

describe('YourManager', () => {
  it('does something', async () => {
    const result = await YourManager.handleTool('tool_name', { arg: 'value' });
    const data = JSON.parse(result.content[0].text);
    expect(data.field).toBeDefined();
  });
});
```

**E2E test template:**

```typescript
import { describeIf, testConfig } from '../helpers/testConfig.js';
import { invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

describeIf(testConfig.isCategoryEnabled('your-category'))('Your Tools (E2E)', () => {
  it('does something on testnet', async () => {
    const data = parseToolResponse(
      await invokeTool('tool_name', { arg: 'value', network: 'testnet' }),
    );
    expect(data.field).toBeDefined();
  });
});
```

## Dependencies

- [algosdk](https://github.com/algorand/js-algorand-sdk) v3 — Algorand JavaScript SDK
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) — MCP TypeScript SDK
- [@napi-rs/keyring](https://github.com/nicolo-ribaudo/napi-keyring) — Native OS keychain access (macOS Keychain, Linux libsecret, Windows Credential Manager)
- [sql.js](https://github.com/sql-js/sql.js) — Embedded SQLite (WASM) for wallet metadata persistence
- [@noble/curves](https://github.com/paulmillr/noble-curves) — Pure JS Ed25519 for raw data signing (`wallet_sign_data`)
- [@tinymanorg/tinyman-js-sdk](https://github.com/tinymanorg/tinyman-js-sdk) — Tinyman AMM SDK
- [zod](https://github.com/colinhacks/zod) — Runtime type validation
- [qrcode](https://github.com/soldair/node-qrcode) — QR code generation for ARC-26

## License

MIT
