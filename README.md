# Algorand MCP Implementation
[![smithery badge](https://smithery.ai/badge/@GoPlausible/algorand-mcp)](https://smithery.ai/server/@GoPlausible/algorand-mcp)
[![npm version](https://badge.fury.io/js/algorand-mcp.svg)](https://badge.fury.io/js/algorand-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview
Model context protocol:

Quoting from [MCP website](https://modelcontextprotocol.io/), MCP (Model Context Protocol) is an open protocol that standardizes how applications provide context to LLMs. Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect your devices to various peripherals and accessories, MCP provides a standardized way to connect AI models to different data sources and tools.

![Screenshot 2025-03-15 at 17 47 54](https://github.com/user-attachments/assets/db561f9f-5f95-4b07-914b-a71f48bb5399)

[MCP Github](https://github.com/modelcontextprotocol) contains more information and different tools and specifications plus documentation of MCP.

This repository is a Model Context Protocol (MCP) implementation for Algorand blockchain interactions. The implementation consists of:
- (PRODUCTION) A server package for blockchain interactions (Node.js only)
- (WIP) A client package for wallet management and transaction signing (supports both browser and Node.js)

**📦 Packages:**
- **[Algorand MCP Server](packages/server/README.md)** - Algorand MCP server full implementation.
- **[Algorand MCP Client](packages/client/README.md)** - Algorand MCP Client for client side Wallet management and transaction signing, as well as integration by other Agent hosts.

**📦 Smithery:**
- **[Algorand MCP Server on Smithery](https://smithery.ai/server/@GoPlausible/algorand-mcp)** - Algorand MCP server implementation via smithery.


IMPORTANT: The client package is still a work in progress and is not yet fully functional. The server package, however, is fully operational and can be used for to integrate Algorand blockchain to any agent system that supports Model Context Protocol (MCP).

## Features
- Complete Algorand blockchain interaction capabilities
- Extensive wallet management system
- Comprehensive transaction handling
- Rich blockchain state querying
- Built-in security features
- Support for Claude Desktop and Cursor integration

## Requirements
- Node.js v23.6.1 or later
- npm v10.2.4 or later

## Installation

### Via NPM (for developers who wish to run their own instances)
```bash
# Install both client and server packages
npm install algorand-mcp

```

### Via Smithery (For all users)
Go to [Algorand MCP Server on Smithery](https://smithery.ai/server/@GoPlausible/algorand-mcp) and select your AI tool and platform. Copy either command or copy depending on if you are using the command or MCP config JSON to connect to MCP Server. Click connect to start!

![Screenshot 2025-03-15 at 00 50 12](https://github.com/user-attachments/assets/f9ea0572-6919-44b0-85e7-c6153fce9b2f)

#### Using command

First let's copy the command from Smithery (Please make sure your tool of choice and platform are selected correctly!)

![Screenshot 2025-03-15 at 14 45 24](https://github.com/user-attachments/assets/d747ea60-732a-43e9-957f-051bfec5d134)

Then paste that in the command field of New MCP server dialog

![Screenshot 2025-03-15 at 14 51 06](https://github.com/user-attachments/assets/5f5d9c1a-297c-4685-928d-ddc6ed3950fa)

Then The MCP server is detected and loading tools and resources

![Screenshot 2025-03-15 at 14 51 31](https://github.com/user-attachments/assets/badfc6e9-fe98-4ba1-9b14-1cd4c11829ce)

And it is good to go!

![Screenshot 2025-03-15 at 14 51 43](https://github.com/user-attachments/assets/d2505413-61d7-4af4-9ba0-18eb58b70a51)


#### Using settings JSON

Copy the JSON from Smithery

![Screenshot 2025-03-15 at 15 09 04](https://github.com/user-attachments/assets/9d9dbcfe-9870-4dd6-bf0c-ebe895480951)

Now open MCP settings in your tool of choice (Claud Desktop, Cursor,...) and Paste the copied JSON there as a whole and save the file.

You are good to go!

![6z7Q0fuH (1)](https://github.com/user-attachments/assets/4f62ac1e-4e16-47ee-85c5-296d80b4039e)

#### Important note for Windows OS Users
Please not that if you receive "Server Closed" or "Connection Closed" Then you need to try and change the `cmd` command with `C:\Windows\System32\cmd.exe` as suggested by Smithery!

![Screenshot 2025-03-15 at 15 51 13](https://github.com/user-attachments/assets/c5b013a9-33c4-4a5f-bd7a-00502334e747)


#### Important note for Cursor Users
Cursor does not yet support the `Resources` Capability of MCP protocol! They are working on it.

#### MCP Server Feature support matrix

| Client                               | [Resources] | [Prompts] | [Tools] | [Sampling] | Roots | Notes                                                              |
| ------------------------------------ | ----------- | --------- | ------- | ---------- | ----- | ------------------------------------------------------------------ |
| [Claude Desktop App][Claude]         | ✅           | ✅         | ✅       | ❌          | ❌     | Full support for all MCP features                                  |
| [5ire][5ire]                         | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools.                                                    |
| [BeeAI Framework][BeeAI Framework]   | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools in agentic workflows.                               |
| [Cline][Cline]                       | ✅           | ❌         | ✅       | ❌          | ❌     | Supports tools and resources.                                      |
| [Continue][Continue]                 | ✅           | ✅         | ✅       | ❌          | ❌     | Full support for all MCP features                                  |
| [Cursor][Cursor]                     | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools.                                                    |
| [Emacs Mcp][Mcp.el]                  | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools in Emacs.                                           |
| [Firebase Genkit][Genkit]            | ⚠️          | ✅         | ✅       | ❌          | ❌     | Supports resource list and lookup through tools.                   |
| [GenAIScript][GenAIScript]           | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools.                                                    |
| [Goose][Goose]                       | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools.                                                    |
| [LibreChat][LibreChat]               | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools for Agents                                          |
| [mcp-agent][mcp-agent]               | ❌           | ❌         | ✅       | ⚠️         | ❌     | Supports tools, server connection management, and agent workflows. |
| [oterm][oterm]                       | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools.                                                    |
| [Roo Code][Roo Code]                 | ✅           | ❌         | ✅       | ❌          | ❌     | Supports tools and resources.                                      |
| [Sourcegraph Cody][Cody]             | ✅           | ❌         | ❌       | ❌          | ❌     | Supports resources through OpenCTX                                 |
| [Superinterface][Superinterface]     | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools                                                     |
| [TheiaAI/TheiaIDE][TheiaAI/TheiaIDE] | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools for Agents in Theia AI and the AI-powered Theia IDE |
| [Windsurf Editor][Windsurf]          | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools with AI Flow for collaborative development.         |
| [Zed][Zed]                           | ❌           | ✅         | ❌       | ❌          | ❌     | Prompts appear as slash commands                                   |
| [SpinAI][SpinAI]                     | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools for Typescript AI Agents                            |
| [OpenSumi][OpenSumi]                 | ❌           | ❌         | ✅       | ❌          | ❌     | Supports tools in OpenSumi                                         |
| [Daydreams Agents][Daydreams]        | ✅           | ✅         | ✅       | ❌          | ❌     | Support for drop in Servers to Daydreams agents                    |

## Project Architecture

The project follows a modular architecture with two main packages:

1. **Server Package (`@algorand-mcp/server`)**
   - Provides MCP tools and resources
   - Manages blockchain interactions
   - Handles transaction creation and submission
   - Offers comprehensive blockchain queries

2. **Client Package (`@algorand-mcp/client`)**
   - Handles wallet connections and transaction signing
   - Supports both local and external wallets
   - Universal compatibility (browser/Node.js)
   - Secure credential management
   - Still work in progress (Server works irrelevant to client status)



## Project Structure

```
algorand-mcp/
├── packages/
│   ├── client/                    # Client Package
│   │   ├── src/
│   │   │   ├── index.ts          # Client entry point and wallet management
│   │   │   └── LocalWallet.ts    # Local wallet implementation
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── server/                    # Server Package
│       ├── src/
│       │   ├── resources/         # MCP Resources
│       │   │   ├── algod/        # Real-time blockchain state
│       │   │   └── indexer/      # Historical blockchain data
│       │   ├── tools/            # MCP Tools
│       │   │   ├── accountManager.ts     # Account operations
│       │   │   ├── algodManager.ts       # Node interactions
│       │   │   ├── utilityManager.ts     # Utility functions
│       │   │   └── transactionManager/   # Transaction handling
│       │   │       ├── accountTransactions.ts
│       │   │       ├── assetTransactions.ts
│       │   │       ├── generalTransaction.ts
│       │   │       └── appTransactions/
│       │   ├── env.ts            # Environment configuration
│       │   └── index.ts          # Server entry point
│       ├── package.json
│       └── tsconfig.json
├── package.json                   # Root package file
└── tsconfig.json                 # Root TypeScript config
```

## Core Functionalities

### Client Features
- Local wallet with secure storage
- External wallet support (Pera, Defly, Daffi)
- Transaction signing
- Session management
- Universal ES module support

### Server Features
- Account management
- Asset operations
- Application interactions
- Transaction creation and submission
- Blockchain state queries
- Comprehensive utility functions

## Available Tools and Resources

The Algorand MCP implementation provides 100+ tools and resources for blockchain interaction. For detailed documentation and usage instructions, please refer to the server package README.

### Available Tools (40)

#### Account Management Tools
- create_account
- rekey_account
- mnemonic_to_mdk
- mdk_to_mnemonic
- secret_key_to_mnemonic
- mnemonic_to_secret_key
- seed_from_mnemonic
- mnemonic_from_seed
- validate_address
- encode_address
- decode_address

#### Application Tools
- make_app_create_txn
- make_app_update_txn
- make_app_delete_txn
- make_app_optin_txn
- make_app_closeout_txn
- make_app_clear_txn
- make_app_call_txn
- get_application_address

#### Asset Tools
- make_asset_create_txn
- make_asset_config_txn
- make_asset_destroy_txn
- make_asset_freeze_txn
- make_asset_transfer_txn

#### Transaction Tools
- make_payment_txn
- assign_group_id
- sign_transaction
- sign_bytes
- send_raw_transaction
- simulate_raw_transactions

#### Key Management Tools
- generate_key_pair
- derive_key

#### Utility Tools
- encode_obj
- decode_obj
- bytes_to_bigint
- bigint_to_bytes
- encode_uint64
- decode_uint64
- compile_teal
- disassemble_teal

### Available Resources (60)

#### Algod Resources
- accounts/{address}
- accounts/{address}/application/{app-id}
- accounts/{address}/asset/{asset-id}
- applications/{app-id}
- applications/{app-id}/box/{name}
- applications/{app-id}/boxes
- assets/{asset-id}
- transactions/pending/{txid}
- accounts/{address}/transactions/pending
- transactions/pending
- transactions/params
- status

#### Block Resources
- blocks/latest
- blocks/{round}
- blocks/{round}/transactions
- indexer/blocks/{round}

#### Health Resources
- health
- indexer/health

#### Genesis Resources
- genesis
- indexer/genesis

#### Network Resources
- versions
- metrics

#### Supply Resources
- ledger/supply
- indexer/supply

#### Participation Resources
- participation
- participation/keys
- participation/keys/{id}

#### Fee Resources
- transactions/fee
- indexer/fee-distribution

#### Protocol Resources
- protocol
- indexer/protocol-upgrades

#### Node Resources
- ready
- sync
- peers
- catchup

#### Compile Resources
- compile/teal
- compile/teal/disassemble
- compile/teal/dryrun

#### Debug Resources
- debug/accounts/{address}
- debug/txns/{txid}
- debug/blocks/{round}
- debug/ledger

#### Indexer Resources
- indexer/accounts/{address}
- indexer/accounts/{address}/transactions
- indexer/accounts/{address}/apps-local-state
- indexer/accounts/{address}/created-applications
- indexer/applications/{app-id}
- indexer/applications/{app-id}/logs
- indexer/applications/{app-id}/box/{name}
- indexer/applications/{app-id}/boxes
- indexer/applications
- indexer/assets/{asset-id}
- indexer/assets/{asset-id}/balances
- indexer/assets/{asset-id}/transactions
- indexer/assets/{asset-id}/balances/{address}
- indexer/assets/{asset-id}/transactions/{txid}
- indexer/assets
- indexer/transactions/{txid}
- indexer/transactions


Note: The server path in the configuration should be the absolute path to your compiled server's index.js file.

## Dependencies

- algosdk: Algorand JavaScript SDK
- @perawallet/connect: Pera Wallet connector
- @blockshake/defly-connect: Defly Wallet connector
- @daffiwallet/connect: Daffi Wallet connector

## License

MIT
