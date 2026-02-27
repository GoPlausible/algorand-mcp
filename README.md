# Algorand MCP Server

[![npm downloads](https://img.shields.io/npm/dm/algorand-mcp.svg)](https://www.npmjs.com/package/algorand-mcp)
[![npm version](https://badge.fury.io/js/algorand-mcp.svg)](https://badge.fury.io/js/algorand-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server that gives AI agents and LLMs full access to the Algorand blockchain. Built by [GoPlausible](https://goplausible.com).

Algorand is a carbon-negative, pure proof-of-stake Layer 1 blockchain with instant finality, low fees, and built-in support for smart contracts (AVM), standard assets (ASAs), and atomic transactions.

## What is MCP?

[Model Context Protocol](https://modelcontextprotocol.io/) is an open standard that lets AI applications connect to external tools and data sources. This server exposes Algorand blockchain operations as MCP tools that any compatible AI client can use — Claude Desktop, Claude Code, Cursor, Windsurf, and others.

## Features

- Account creation, key management, and rekeying
- Transaction building, signing, and submission (payments, assets, applications, key registration)
- Atomic transaction groups
- TEAL compilation and disassembly
- Full Algod and Indexer API access
- NFDomains (NFD) name service integration
- Tinyman AMM integration (pools, swaps, liquidity)
- ARC-26 URI and QR code generation
- Algorand knowledge base with full developer documentation taxonomy
- Paginated responses for large datasets
- Wallet resources for agent-managed accounts

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
      "args": ["/absolute/path/to/algorand-mcp/dist/index.js"],
      "env": {
        "ALGORAND_NETWORK": "testnet",
        "ALGORAND_ALGOD": "https://testnet-api.algonode.cloud",
        "ALGORAND_ALGOD_API": "https://testnet-api.algonode.cloud/v2",
        "ALGORAND_INDEXER": "https://testnet-idx.algonode.cloud",
        "ALGORAND_INDEXER_API": "https://testnet-idx.algonode.cloud/v2",
        "NFD_API_URL": "https://api.nf.domains",
        "ITEMS_PER_PAGE": "10"
      }
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
      "args": ["/absolute/path/to/algorand-mcp/dist/index.js"],
      "env": {
        "ALGORAND_NETWORK": "testnet",
        "ALGORAND_ALGOD": "https://testnet-api.algonode.cloud",
        "ALGORAND_ALGOD_API": "https://testnet-api.algonode.cloud/v2",
        "ALGORAND_INDEXER": "https://testnet-idx.algonode.cloud",
        "ALGORAND_INDEXER_API": "https://testnet-idx.algonode.cloud/v2",
        "NFD_API_URL": "https://api.nf.domains",
        "ITEMS_PER_PAGE": "10"
      }
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
      "command": "algorand-mcp",
      "env": {
        "ALGORAND_NETWORK": "mainnet",
        "ALGORAND_ALGOD": "https://mainnet-api.algonode.cloud",
        "ALGORAND_ALGOD_API": "https://mainnet-api.algonode.cloud/v2",
        "ALGORAND_INDEXER": "https://mainnet-idx.algonode.cloud",
        "ALGORAND_INDEXER_API": "https://mainnet-idx.algonode.cloud/v2",
        "NFD_API_URL": "https://api.nf.domains",
        "ITEMS_PER_PAGE": "10"
      }
    }
  }
}
```

## Environment Variables

All configuration is passed via environment variables in your MCP config. No `.env` file is needed.

### Required

| Variable | Description | Example |
|---|---|---|
| `ALGORAND_NETWORK` | Network name | `testnet`, `mainnet` |
| `ALGORAND_ALGOD` | Algod node base URL | `https://testnet-api.algonode.cloud` |
| `ALGORAND_ALGOD_API` | Algod API URL (with version) | `https://testnet-api.algonode.cloud/v2` |
| `ALGORAND_INDEXER` | Indexer base URL | `https://testnet-idx.algonode.cloud` |
| `ALGORAND_INDEXER_API` | Indexer API URL (with version) | `https://testnet-idx.algonode.cloud/v2` |

### Optional

| Variable | Description | Default |
|---|---|---|
| `ALGORAND_TOKEN` | API token for private nodes | `""` |
| `ALGORAND_ALGOD_PORT` | Custom Algod port | `""` |
| `ALGORAND_INDEXER_PORT` | Custom Indexer port | `""` |
| `ALGORAND_AGENT_WALLET` | Agent wallet mnemonic (25 words) | `""` |
| `NFD_API_URL` | NFDomains API endpoint | `https://api.nf.domains` |
| `ITEMS_PER_PAGE` | Pagination page size | `5` |

### Network presets

**Testnet** (default):
```json
"ALGORAND_ALGOD": "https://testnet-api.algonode.cloud",
"ALGORAND_ALGOD_API": "https://testnet-api.algonode.cloud/v2",
"ALGORAND_INDEXER": "https://testnet-idx.algonode.cloud",
"ALGORAND_INDEXER_API": "https://testnet-idx.algonode.cloud/v2"
```

**Mainnet**:
```json
"ALGORAND_ALGOD": "https://mainnet-api.algonode.cloud",
"ALGORAND_ALGOD_API": "https://mainnet-api.algonode.cloud/v2",
"ALGORAND_INDEXER": "https://mainnet-idx.algonode.cloud",
"ALGORAND_INDEXER_API": "https://mainnet-idx.algonode.cloud/v2"
```

**Localnet** (AlgoKit):
```json
"ALGORAND_ALGOD": "http://localhost:4001",
"ALGORAND_ALGOD_API": "http://localhost:4001/v2",
"ALGORAND_INDEXER": "http://localhost:8980",
"ALGORAND_INDEXER_API": "http://localhost:8980/v2",
"ALGORAND_TOKEN": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
```

### Minimal configuration

If you only need read-only blockchain access (no wallet, no DeFi integrations):

```json
{
  "mcpServers": {
    "algorand-mcp": {
      "command": "node",
      "args": ["/path/to/algorand-mcp/dist/index.js"],
      "env": {
        "ALGORAND_NETWORK": "mainnet",
        "ALGORAND_ALGOD": "https://mainnet-api.algonode.cloud",
        "ALGORAND_ALGOD_API": "https://mainnet-api.algonode.cloud/v2",
        "ALGORAND_INDEXER": "https://mainnet-idx.algonode.cloud",
        "ALGORAND_INDEXER_API": "https://mainnet-idx.algonode.cloud/v2"
      }
    }
  }
}
```

## Available Tools

### Account Management (8 tools)

| Tool | Description |
|---|---|
| `create_account` | Create a new Algorand account |
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

### Example Tools (1 tool)

| Tool | Description |
|---|---|
| `api_example_get_balance` | Get account balance and assets |

## Resources

The server exposes MCP resources for direct data access:

### Wallet Resources (requires `ALGORAND_AGENT_WALLET`)

| URI | Description |
|---|---|
| `algorand://wallet/address` | Wallet address |
| `algorand://wallet/publickey` | Wallet public key |
| `algorand://wallet/secretkey` | Wallet secret key |
| `algorand://wallet/mnemonic` | Wallet mnemonic |
| `algorand://wallet/account` | Account balance and assets |
| `algorand://wallet/assets` | Asset holdings |

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
│   ├── env.ts                   # Environment configuration
│   ├── algorand-client.ts       # Algod/Indexer client setup
│   ├── types.ts                 # Shared types (Zod schemas)
│   ├── resources/               # MCP Resources
│   │   ├── knowledge/           # Documentation taxonomy
│   │   └── wallet/              # Wallet resources
│   ├── tools/                   # MCP Tools
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
│   │       ├── vestige/         # Vestige analytics
│   │       ├── ultrade/         # Ultrade DEX
│   │       └── example/         # Example tools
│   └── utils/
│       └── responseProcessor.ts # Pagination and formatting
├── dist/                        # Compiled output
├── package.json
└── tsconfig.json
```

## Response Format

All tool responses follow the MCP content format. API responses include automatic pagination:

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

Pass `pageToken` from a previous response to fetch the next page.

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

## Dependencies

- [algosdk](https://github.com/algorand/js-algorand-sdk) v3 — Algorand JavaScript SDK
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) — MCP TypeScript SDK
- [@tinymanorg/tinyman-js-sdk](https://github.com/tinymanorg/tinyman-js-sdk) — Tinyman AMM SDK
- [zod](https://github.com/colinhacks/zod) — Runtime type validation
- [qrcode](https://github.com/soldair/node-qrcode) — QR code generation for ARC-26

## License

MIT
