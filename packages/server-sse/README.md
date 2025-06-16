# Algorand Remote MCP Server
This repository contains a remote Model Context Protocol (MCP) server for Algorand, designed to facilitate interaction with the Algorand blockchain using the MCP protocol. It is built on Cloudflare Workers and utilizes Server-Sent Events (SSE) for real-time communication.

# Getting Started
## Connect Claude Desktop to your MCP server

You can connect to your remote MCP server from local MCP clients using the [mcp-remote proxy](https://www.npmjs.com/package/mcp-remote). 

To connect to your MCP server from Claude Desktop, follow [Anthropic's Quickstart](https://modelcontextprotocol.io/quickstart/user) and within Claude Desktop go to Settings > Developer > Edit Config.

Update with this configuration:

```json
{
  "mcpServers": {
    "algorand-remote-mcp": {
      "command": "npx",
      "args": [
        "mcp-remote",
        "https://algorand-remote-mcp.your-account.workers.dev/sse"  // or http://localhost:8787/sse for local development
      ]
    }
  }
}
```

Restart Claude and you should see the tools become available.

# Development:

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (Cloudflare Workers CLI)
- An Algorand node access (via AlgoNode, PureStake, or your own node)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GoPlausible/algorand-mcp.git
   cd algorand-mcp/packages/server-sse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   ```

4. Update the environment variables in `.env` with your Algorand node details and other configuration.

## Development

To run the server locally for development:

```bash
npm run dev
```

This starts the server on `localhost:8787`.

## Deployment

To deploy to Cloudflare Workers:

1. Authenticate with Cloudflare (if not already done):
   ```bash
   npx wrangler login
   ```

2. Deploy to Cloudflare Workers:
   ```bash
   npm run deploy
   ```

Your MCP server will be available at `https://algorand-remote-mcp.[your-worker-subdomain].workers.dev`.

# Available Tools and Resources

## Tools

### Account Management Tools
- `create_account`: Create a new Algorand account
- `recover_account`: Recover an Algorand account from mnemonic
- `check_balance`: Check the balance of an Algorand account

### Utility Tools
- `validate_address`: Check if an Algorand address is valid
- `encode_address`: Encode a public key to an Algorand address
- `decode_address`: Decode an Algorand address to a public key
- `get_application_address`: Get the address for a given application ID
- `bytes_to_bigint`: Convert bytes to a BigInt
- `bigint_to_bytes`: Convert a BigInt to bytes
- `encode_uint64`: Encode a uint64 to bytes
- `decode_uint64`: Decode bytes to a uint64
- `verify_bytes`: Verify a signature against bytes with an Algorand address
- `sign_bytes`: Sign bytes with a secret key
- `encode_obj`: Encode an object to msgpack format
- `decode_obj`: Decode msgpack bytes to an object

### Transaction Management Tools

#### Payment Transaction Tools
- `create_payment_transaction`: Create a payment transaction on Algorand
- `sign_transaction`: Sign an Algorand transaction with a mnemonic
- `submit_transaction`: Submit a signed transaction to the Algorand network

#### Asset Transaction Tools
- `create_asset`: Create a new Algorand Standard Asset (ASA)
- `asset_optin`: Opt-in to an Algorand Standard Asset (ASA)
- `transfer_asset`: Transfer an Algorand Standard Asset (ASA)

#### Application Transaction Tools
- `create_application`: Create a new smart contract application on Algorand
- `call_application`: Call a smart contract application on Algorand
- `optin_application`: Opt-in to an Algorand application

#### Group Transaction Tools
- `assign_group_id`: Assign a group ID to a set of transactions for atomic execution
- `create_atomic_group`: Create an atomic transaction group from multiple transactions
- `send_atomic_group`: Sign and submit an atomic transaction group in one operation

### Algorand Node Interaction Tools
- `compile_teal`: Compile TEAL source code
- `disassemble_teal`: Disassemble TEAL bytecode into source code
- `send_raw_transaction`: Submit signed transactions to the Algorand network
- `simulate_raw_transactions`: Simulate raw transactions
- `simulate_transactions`: Simulate encoded transactions

### ARC-26 URI Tools
- `generate_algorand_uri`: Generate a URI following the ARC-26 specification
- `generate_payment_uri`: Generate a payment URI following the ARC-26 specification
- `generate_asset_transfer_uri`: Generate an asset transfer URI following the ARC-26 specification

### API Integration Tools
- `api_request`: Make a request to an external API
- `api_indexer_search`: Search the Algorand indexer for accounts, transactions, assets, or applications
- `api_nfd_lookup`: Look up an Algorand Name Service (NFD) name or address

## Resources

### Wallet Resources
- `algorand://wallets`: List all wallets
- `algorand://wallets/account/{address}`: Get account information for a specific address

# Architecture

This MCP server is built using:

- **Cloudflare Workers**: For serverless, edge-based execution
- **Server-Sent Events (SSE)**: For real-time communication with MCP clients
- **Algorand JavaScript SDK**: For interacting with the Algorand blockchain

The architecture follows these key patterns:

- **McpAgent Pattern**: For handling MCP protocol communication
- **Modular Tools & Resources**: Organized by functionality category
- **Tool Managers**: Separate managers for different categories of tools (transaction, utility, etc.)
- **Resource Providers**: Organized access to blockchain data

## Project Structure

```
packages/server-sse/
├── src/
│   ├── index.ts                  # Main entry point
│   ├── types.ts                  # Type definitions
│   ├── resources/                # Resource implementations
│   │   └── wallet/               # Wallet resources
│   ├── tools/                    # Tool implementations
│   │   ├── accountManager.ts     # Account management tools
│   │   ├── utilityManager.ts     # Utility tools
│   │   ├── algodManager.ts       # Algorand node interaction tools
│   │   ├── arc26Manager.ts       # ARC-26 URI generation tools
│   │   ├── apiManager/           # API integration tools
│   │   └── transactionManager/   # Transaction tools
│   │       ├── generalTransaction.ts  # Payment transactions
│   │       ├── assetTransactions.ts   # Asset operations
│   │       ├── appTransactions.ts     # Application operations
│   │       └── groupTransactions.ts   # Atomic group operations
│   └── utils/                    # Utility functions
│       └── responseProcessor.ts  # Response formatting
```

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# License

This project is licensed under the [MIT License](LICENSE).
