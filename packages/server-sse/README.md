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

3. Configure environment variables:
   - Environment variables are set in `wrangler.jsonc` under the `vars` section
   - Sensitive values should be set as secrets (see Deployment section)

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

2. Configure your environment:
   - Edit `wrangler.jsonc` to set your environment variables
   - Set up secrets for sensitive information:
   ```bash
   # Set up the agent wallet mnemonic as a secret
   npx wrangler secret put ALGORAND_AGENT_WALLET
   # (You'll be prompted to enter the value)
   ```
   Don't forget to remove the ALGORAND_AGENT_WALLET value from wrangler.jsonc file sothat it could only be served from secrets. GoPlausible has configured a public wallet in wrangler.jsonc just to make it to work. Using that on MAINNET is not recommended!

3. Deploy to Cloudflare Workers:
   ```bash
   npm run deploy
   ```

Your MCP server will be available at `https://algorand-remote-mcp.[your-worker-subdomain].workers.dev`.

## Environment Variables

> **⚠️ IMPORTANT SECURITY WARNING**
> 
> For the `ALGORAND_AGENT_WALLET` variable containing your wallet mnemonic, it is **strongly recommended** to use Cloudflare Worker secrets instead of defining it in wrangler.jsonc. Store sensitive credentials using:
> 
> ```bash
> npx wrangler secret put ALGORAND_AGENT_WALLET
> ```
> 
> This ensures your mnemonic is encrypted and not stored in plaintext configuration files.

The MCP server relies on the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `ALGORAND_NETWORK` | Network to connect to (mainnet/testnet) | testnet |
| `ALGORAND_ALGOD` | Base URL for Algorand node | https://testnet-api.algonode.cloud |
| `ALGORAND_ALGOD_API` | Full API URL with version | https://testnet-api.algonode.cloud/v2 |
| `ALGORAND_INDEXER` | Base URL for Algorand indexer | https://testnet-idx.algonode.cloud |
| `ALGORAND_INDEXER_API` | Full API URL with version | https://testnet-idx.algonode.cloud/v2 |
| `ALGORAND_TOKEN` | API token for Algorand nodes | "" |
| `NFD_API_URL` | NFD API URL for name resolution | https://api.nf.domains |
| `ITEMS_PER_PAGE` | Default pagination items per page | 10 |

### Secrets

The following secrets should be set using `wrangler secret put`:

- `ALGORAND_AGENT_WALLET`: Mnemonic phrase for the agent's Algorand wallet (**CRITICAL**: Always use secret storage for this sensitive value)

When deploying, you'll be interactively prompted to enter the secret value securely:

```bash
# Set the wallet mnemonic as a secret (RECOMMENDED)
npx wrangler secret put ALGORAND_AGENT_WALLET
# Enter your mnemonic when prompted
```

### R2 Bucket Configuration

The knowledge resources are stored in a Cloudflare R2 bucket. Configure the bucket in the `wrangler.jsonc` file:

```jsonc
"r2_buckets": [
  {
    "binding": "PLAUSIBLEAI",
    "bucket_name": "your-bucket-name"
  }
]
```

Make sure to create the bucket in your Cloudflare dashboard and upload the knowledge documents.

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
- `update_application`: Update an existing smart contract application
- `delete_application`: Delete an existing smart contract application
- `closeout_application`: Close out from an Algorand application
- `clear_application`: Clear state for an Algorand application

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

#### General API Tools
- `api_request`: Make a request to an external API
- `api_indexer_search`: Search the Algorand indexer for accounts, transactions, assets, or applications

#### NFD API Tools
- `api_nfd_get_nfd`: Get NFD domain information by name
- `api_nfd_get_nfds_for_address`: Get all NFD domains owned by an address
- `api_nfd_get_nfd_activity`: Get activity for an NFD domain
- `api_nfd_get_nfd_analytics`: Get analytics for an NFD domain
- `api_nfd_browse_nfds`: Browse NFD domains with filtering options
- `api_nfd_search_nfds`: Search for NFD domains

#### Algod API Tools
- `api_algod_get_account_info`: Get current account balance, assets, and auth address
- `api_algod_get_account_application_info`: Get account-specific application information
- `api_algod_get_account_asset_info`: Get account-specific asset information
- `api_algod_get_application_info`: Get application details
- `api_algod_get_application_box_value`: Get application box contents
- `api_algod_get_application_boxes`: Get all application boxes
- `api_algod_get_application_state`: Get application global state
- `api_algod_get_asset_info`: Get asset details
- `api_algod_get_asset_holding`: Get asset holding information for an account
- `api_algod_get_transaction_info`: Get transaction details by transaction ID
- `api_algod_get_pending_transactions`: Get pending transactions from algod mempool

#### Indexer API Tools
- `api_indexer_lookup_account_by_id`: Get account information from indexer
- `api_indexer_lookup_account_assets`: Get account assets
- `api_indexer_lookup_account_app_local_states`: Get account application local states
- `api_indexer_lookup_account_created_applications`: Get applications created by this account
- `api_indexer_search_for_accounts`: Search for accounts with various criteria
- `api_indexer_lookup_applications`: Get application information from indexer
- `api_indexer_lookup_application_logs`: Get application log messages
- `api_indexer_search_for_applications`: Search for applications with various criteria
- `api_indexer_lookup_application_box`: Get application box by name
- `api_indexer_lookup_application_boxes`: Get all application boxes
- `api_indexer_lookup_asset_by_id`: Get asset information from indexer
- `api_indexer_lookup_asset_balances`: Get accounts that hold a specific asset
- `api_indexer_search_for_assets`: Search for assets with various criteria
- `api_indexer_lookup_transaction_by_id`: Get transaction details from indexer
- `api_indexer_lookup_account_transactions`: Get transactions related to an account
- `api_indexer_search_for_transactions`: Search for transactions with various criteria

### Knowledge Management Tools
- `get_knowledge_doc`: Get markdown content for specified knowledge documents
- `list_knowledge_docs`: List available knowledge documents by category

## Resources

### Wallet Resources
- `Wallet Account`: Account information for the configured wallet
- `Wallet Account Assets`: Asset holdings for the configured wallet
- `Wallet Account Address`: Algorand address of the configured wallet
- `Wallet Mnemonic`: Mnemonic phrase of the configured wallet
- `Wallet Public Key`: Public key of the configured wallet
- `Wallet Secret Key`: Secret key of the configured wallet

### Knowledge Resources
- `Algorand Knowledge Full Taxonomy`: Complete taxonomy of Algorand documentation
- `Algorand Request for Comments`: ARCs documentation
- `Software Development Kits`: SDKs documentation
- `AlgoKit`: AlgoKit documentation
- `AlgoKit Utils`: AlgoKit utilities documentation
- `TEALScript`: TEALScript documentation
- `Puya`: Puya documentation
- `Liquid Auth`: Liquid Auth documentation
- `Python Development`: Python development documentation
- `Developer Documentation`: General developer documentation
- `CLI Tools`: Command-line interface tools documentation
- `Node Management`: Node management documentation
- `Developer Details`: Developer details documentation

# Architecture

This MCP server is built using:

- **Cloudflare Workers**: For serverless, edge-based execution
- **Server-Sent Events (SSE)**: For real-time communication with MCP clients
- **Algorand JavaScript SDK**: For interacting with the Algorand blockchain
- **Cloudflare R2 Storage**: For storing and retrieving knowledge documentation

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
│   │   ├── knowledgeManager.ts   # Knowledge management tools
│   │   ├── apiManager/           # API integration tools
│   │   │   ├── algod/            # Algod API tools
│   │   │   ├── indexer/          # Indexer API tools
│   │   │   └── nfd/              # NFD API tools
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
