[![smithery badge](https://smithery.ai/badge/@GoPlausible/algorand-mcp)](https://smithery.ai/server/@GoPlausible/algorand-mcp)
[![npm version](https://badge.fury.io/js/algorand-mcp.svg)](https://badge.fury.io/js/algorand-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Algorand MCP Server

## Overview
The Algorand MCP Server provides a comprehensive set of tools and resources for interacting with the Algorand blockchain through the Model Context Protocol (MCP). Running exclusively in Node.js environments, it enables seamless blockchain interactions with built-in support for account management, asset operations, application interactions, and blockchain queries.

## Requirements
- Node.js v23.6.1 or later
- npm v10.2.4 or later

## Features
- 113 total tools:
  - 40 base tools (account, asset, application, transaction management)
  - 30 resource tools (algod and indexer)
  - 6 NFDomains (NFD) tools for name services
  - 28 Vestige tools for DeFi analytics
  - 9 Tinyman tools for AMM interactions
- 30 resource endpoints for data access
- Built-in default configuration for quick setup
- Comprehensive transaction management
- Complete application lifecycle support
- Asset creation and management
- Real-time and historical data access
- NFDomains integration for name resolution and management
- Vestige integration for DeFi analytics and tracking
- Tinyman AMM integration for decentralized trading

## Project Structure

```
src/
├── resources/                # MCP Resources
│   ├── algod/               # Real-time blockchain state
│   ├── indexer/            # Historical blockchain data
│   ├── nfd/               # NFDomains resources
│   ├── vestige/           # Vestige DeFi resources
│   └── tinyman/           # Tinyman AMM resources
├── tools/                  # MCP Tools
│   ├── accountManager.ts    # Account operations
│   ├── algodManager.ts      # Node interactions
│   ├── utilityManager.ts    # Utility functions
│   ├── resource_tools/      # Resource Tools
│   │   ├── algod/          # Algod resource tools
│   │   ├── indexer/        # Indexer resource tools
│   │   ├── nfd/            # NFDomains tools
│   │   ├── vestige/        # Vestige DeFi tools
│   │   └── tinyman/        # Tinyman AMM tools
│   └── transactionManager/ # Transaction handling
└── index.ts               # Server entry point
```

## Installation

```bash
# Install the server package
npm install algorand-mcp

# Optional: Create .env file for custom configuration
cp .env.example .env
```
### Via Smithery (for Claude Desktop)

Simply run this command in terminal:

```bash
npx -y @smithery/cli@latest install @GoPlausible/algorand-mcp --client claude --config "{\"NFD_API_KEY\":\"\",\"NFD_API_URL\":\"https://api.nf.domains\",\"ALGORAND_ALGOD\":\"https://testnet-api.algonode.cloud\",\"ALGORAND_TOKEN\":\"\",\"ITEMS_PER_PAGE\":\"10\",\"VESTIGE_API_KEY\":\"\",\"VESTIGE_API_URL\":\"https://api.vestigelabs.org\",\"ALGORAND_INDEXER\":\"https://testnet-idx.algonode.cloud\",\"ALGORAND_NETWORK\":\"testnet\",\"ALGORAND_ALGOD_API\":\"https://testnet-api.algonode.cloud/v2\",\"ALGORAND_ALGOD_PORT\":\"\",\"ALGORAND_INDEXER_API\":\"https://testnet-idx.algonode.cloud/v2\",\"ALGORAND_INDEXER_PORT\":\"\"}"

```

### Via Smithery (for Cursor)

Simply run this command in terminal:

```bash
npx -y @smithery/cli@latest install @GoPlausible/algorand-mcp --client cursor --config "{\"NFD_API_KEY\":\"\",\"NFD_API_URL\":\"https://api.nf.domains\",\"ALGORAND_ALGOD\":\"https://testnet-api.algonode.cloud\",\"ALGORAND_TOKEN\":\"\",\"ITEMS_PER_PAGE\":\"10\",\"VESTIGE_API_KEY\":\"\",\"VESTIGE_API_URL\":\"https://api.vestigelabs.org\",\"ALGORAND_INDEXER\":\"https://testnet-idx.algonode.cloud\",\"ALGORAND_NETWORK\":\"testnet\",\"ALGORAND_ALGOD_API\":\"https://testnet-api.algonode.cloud/v2\",\"ALGORAND_ALGOD_PORT\":\"\",\"ALGORAND_INDEXER_API\":\"https://testnet-idx.algonode.cloud/v2\",\"ALGORAND_INDEXER_PORT\":\"\"}"

```

The server comes with built-in defaults for testnet, no additional configuration required:
```bash
# Default configuration
ALGORAND_NETWORK="testnet"
ALGORAND_ALGOD_API="https://testnet-api.algonode.cloud/v2"
ALGORAND_ALGOD="https://testnet-api.algonode.cloud"
ALGORAND_INDEXER_API="https://testnet-idx.algonode.cloud/v2"
ALGORAND_INDEXER="https://testnet-idx.algonode.cloud"
NFD_API_URL=https://api.nf.domains
VESTIGE_API_URL=https://api.vestigelabs.org
ITEMS_PER_PAGE=10
```

Override defaults by doing either:
- Setting environment variables
- Creating a .env file
- Configuring in Claude Desktop/Cursor settings (see root README)

## Available Tools

### Resource Tools
It is important to note that the resource tools are read-only and do not modify the blockchain state. They provide a way to access real-time and historical data from the Algorand blockchain.

Resource tools are designed as a redundant sets of resource accessing doing the same functionality as Resources do and this is because in majority of Agent systems the interpretation of MCP protocol capabilities is that Resources are invokable by users and tools are invokable by Agents. Therefore, the resource tools are designed as resources to be invokable by Agents in cases that Agent apps does not allow agent LLM to interact with Resources directly and autonomously(if allowed by user indeed).

#### Algod Resource Tools
- resource_algod_get_account_info: Get current account balance, assets, and auth address from algod
- resource_algod_get_account_application_info: Get account-specific application information from algod
- resource_algod_get_account_asset_info: Get account-specific asset information from algod
- resource_algod_get_application_by_id: Get application information
- resource_algod_get_application_box: Get application box by name
- resource_algod_get_application_boxes: Get all application boxes
- resource_algod_get_asset_by_id: Get current asset information from algod
- resource_algod_get_pending_transaction: Get pending transaction information
- resource_algod_get_pending_transactions_by_address: Get pending transactions for an address
- resource_algod_get_pending_transactions: Get all pending transactions
- resource_algod_get_transaction_params: Get suggested transaction parameters
- resource_algod_get_node_status: Get current node status
- resource_algod_get_node_status_after_block: Get node status after a specific round

#### Indexer Resource Tools
- resource_indexer_lookup_account_by_id: Get account information from indexer
- resource_indexer_lookup_account_transactions: Get account transaction history
- resource_indexer_lookup_account_assets: Get account assets
- resource_indexer_lookup_account_app_local_states: Get account application local states
- resource_indexer_lookup_account_created_applications: Get applications created by this account
- resource_indexer_lookup_applications: Get application information from indexer
- resource_indexer_lookup_application_logs: Get application log messages
- resource_indexer_lookup_application_box: Get application box by name
- resource_indexer_lookup_application_boxes: Get all application boxes
- resource_indexer_lookup_asset_by_id: Get asset information and configuration
- resource_indexer_lookup_asset_balances: Get accounts holding this asset and their balances
- resource_indexer_lookup_asset_transactions: Get transactions involving this asset
- resource_indexer_lookup_transaction_by_id: Get transaction information by ID
- resource_indexer_search_accounts: Search for accounts with various criteria
- resource_indexer_search_for_applications: Search for applications with various criteria
- resource_indexer_search_for_assets: Search for assets with various criteria
- resource_indexer_search_for_transactions: Search for transactions with various criteria

#### NFDomains (NFD) Resource Tools
- resource_nfd_get_nfd: Get a specific NFD by name or application ID
- resource_nfd_get_nfds_for_addresses: Get NFDs for specific addresses
- resource_nfd_get_nfd_activity: Get activity/changes for NFDs
- resource_nfd_get_nfd_analytics: Get analytics data for NFDs
- resource_nfd_browse_nfds: Browse NFDs with various filters
- resource_nfd_search_nfds: Search NFDs with various filters

#### Vestige Resource Tools

1. View Tools:
- resource_vestige_view_networks: Get all networks
- resource_vestige_view_network_by_id: Get network by id
- resource_vestige_view_protocols: Get all protocols
- resource_vestige_view_protocol_by_id: Get protocol by id
- resource_vestige_view_protocol_volumes: Get protocol volumes at specific day
- resource_vestige_view_assets: Get data about assets
- resource_vestige_view_assets_list: Get asset list
- resource_vestige_view_assets_search: Search assets by query
- resource_vestige_view_asset_price: Get asset prices
- resource_vestige_view_asset_candles: Get asset candles
- resource_vestige_view_asset_history: Get asset volume, swaps, total lockup, vwap and confidence history
- resource_vestige_view_asset_composition: Get asset lockups based on protocol and pair
- resource_vestige_view_pools: Get pools
- resource_vestige_view_vaults: Get all vaults
- resource_vestige_view_balances: Get balances by network id, protocol id and asset id
- resource_vestige_view_notes: Get notes by network id and optionally asset id
- resource_vestige_view_first_asset_notes: Get first note for assets
- resource_vestige_view_asset_notes_count: Get notes count for assets
- resource_vestige_view_swaps: Get swaps

2. Swap Tools:
- resource_vestige_get_best_v4_swap_data: Get best V4 swap data
- resource_vestige_get_v4_swap_discount: Get V4 swap discount
- resource_vestige_get_v4_swap_data_transactions: Get V4 swap data transactions
- resource_vestige_get_aggregator_stats: Get aggregator stats

3. Currency Tools:
- resource_vestige_view_currency_prices: Get all latest currency prices
- resource_vestige_view_currency_price_history: Get currency prices by timestamp range
- resource_vestige_view_currency_price: Get currency price by timestamp
- resource_vestige_view_currency_average_price: Get average price for currency
- resource_vestige_view_currency_prices_simple_30d: Get currency prices for last 30 days

#### Tinyman Resource Tools
- resource_tinyman_get_pool: Get Tinyman pool information by asset pair
  - Parameters: asset1Id, asset2Id, version (v1_1 or v2)
  - Returns: Pool status, validator app ID, assets, and reserves

- resource_tinyman_get_pool_analytics: Get analytics for a Tinyman pool
  - Parameters: asset1Id, asset2Id, version
  - Returns: Pool status, emptiness check, pair ratio, and reserves

- resource_tinyman_get_pool_creation_quote: Get quote for creating a new pool
  - Parameters: asset1Id, asset2Id, initiatorAddr, version
  - Returns: Transaction count and estimated fees

- resource_tinyman_get_liquidity_quote: Get quote for adding liquidity
  - Parameters: asset1Id, asset2Id, asset1Amount, asset2Amount, mode (initial/flexible/singleAsset), version
  - Returns: Liquidity quote with expected pool tokens

- resource_tinyman_get_remove_liquidity_quote: Get quote for removing liquidity
  - Parameters: asset1Id, asset2Id, poolTokenAmount, initiatorAddr, slippage, singleAssetMode, version
  - Returns: Remove liquidity quote with expected asset amounts

- resource_tinyman_get_swap_quote: Get quote for swapping assets
  - Parameters: assetIn, assetOut, amount, mode (fixedInput/fixedOutput), version
  - Returns: Swap quote with expected output/input amount

- resource_tinyman_get_asset_optin_quote: Get quote for opting into pool token
  - Parameters: assetId, initiatorAddr
  - Returns: Transaction count and estimated fees

- resource_tinyman_get_validator_optin_quote: Get quote for opting into validator
  - Parameters: initiatorAddr, version
  - Returns: Transaction count and estimated fees

- resource_tinyman_get_validator_optout_quote: Get quote for opting out of validator
  - Parameters: initiatorAddr, version
  - Returns: Transaction count and estimated fees

### Account Management Tools

1. `create_account`
   - Creates a new Algorand account
   - Returns address and mnemonic
   - No parameters required

2. `rekey_account`
   - Rekeys an account to a new address
   - Parameters:
     ```typescript
     {
       sourceAddress: string,  // Account to rekey
       targetAddress: string   // New authorized address
     }
     ```

3. `mnemonic_to_mdk`
   - Converts mnemonic to master derivation key
   - Parameters: `{ mnemonic: string }`

4. `mdk_to_mnemonic`
   - Converts master derivation key to mnemonic
   - Parameters: `{ mdk: string }`

5. `secret_key_to_mnemonic`
   - Converts secret key to mnemonic
   - Parameters: `{ secretKey: string }`

6. `mnemonic_to_secret_key`
   - Converts mnemonic to secret key
   - Parameters: `{ mnemonic: string }`

7. `seed_from_mnemonic`
   - Generates seed from mnemonic
   - Parameters: `{ mnemonic: string }`

8. `mnemonic_from_seed`
   - Generates mnemonic from seed
   - Parameters: `{ seed: string }`

9. `validate_address`
   - Validates Algorand address format
   - Parameters: `{ address: string }`

10. `encode_address`
    - Encodes public key to address
    - Parameters: `{ publicKey: string }`

11. `decode_address`
    - Decodes address to public key
    - Parameters: `{ address: string }`

### Application Tools

12. `make_app_create_txn`
    - Creates application creation transaction
    - Parameters:
      ```typescript
      {
        from: string,
        approvalProgram: string,
        clearProgram: string,
        numGlobalByteSlices: number,
        numGlobalInts: number,
        numLocalByteSlices: number,
        numLocalInts: number,
        extraPages?: number,
        note?: string,
        lease?: string,
        rekeyTo?: string,
        appArgs?: string[],
        accounts?: string[],
        foreignApps?: number[],
        foreignAssets?: number[]
      }
      ```

13. `make_app_update_txn`
    - Creates application update transaction
    - Parameters: Similar to create with appIndex

14. `make_app_delete_txn`
    - Creates application deletion transaction
    - Parameters: `{ from: string, appIndex: number }`

15. `make_app_optin_txn`
    - Creates application opt-in transaction
    - Parameters: `{ from: string, appIndex: number }`

16. `make_app_closeout_txn`
    - Creates application close-out transaction
    - Parameters: `{ from: string, appIndex: number }`

17. `make_app_clear_txn`
    - Creates application clear state transaction
    - Parameters: `{ from: string, appIndex: number }`

18. `make_app_call_txn`
    - Creates application call transaction
    - Parameters:
      ```typescript
      {
        from: string,
        appIndex: number,
        appArgs?: string[],
        accounts?: string[],
        foreignApps?: number[],
        foreignAssets?: number[]
      }
      ```

19. `get_application_address`
    - Gets application's escrow address
    - Parameters: `{ appId: number }`

### Asset Tools

20. `make_asset_create_txn`
    - Creates asset creation transaction
    - Parameters:
      ```typescript
      {
        from: string,
        total: number,
        decimals: number,
        defaultFrozen: boolean,
        unitName?: string,
        assetName?: string,
        assetURL?: string,
        assetMetadataHash?: string,
        manager?: string,
        reserve?: string,
        freeze?: string,
        clawback?: string
      }
      ```

21. `make_asset_config_txn`
    - Creates asset configuration transaction
    - Parameters:
      ```typescript
      {
        from: string,
        assetIndex: number,
        manager?: string,
        reserve?: string,
        freeze?: string,
        clawback?: string,
        strictEmptyAddressChecking: boolean
      }
      ```

22. `make_asset_destroy_txn`
    - Creates asset destruction transaction
    - Parameters: `{ from: string, assetIndex: number }`

23. `make_asset_freeze_txn`
    - Creates asset freeze transaction
    - Parameters:
      ```typescript
      {
        from: string,
        assetIndex: number,
        freezeTarget: string,
        freezeState: boolean
      }
      ```

24. `make_asset_transfer_txn`
    - Creates asset transfer transaction
    - Parameters:
      ```typescript
      {
        from: string,
        to: string,
        assetIndex: number,
        amount: number,
        closeRemainderTo?: string
      }
      ```

### Transaction Tools

25. `make_payment_txn`
    - Creates payment transaction
    - Parameters:
      ```typescript
      {
        from: string,
        to: string,
        amount: number,
        closeRemainderTo?: string
      }
      ```

26. `assign_group_id`
    - Assigns group ID to transactions
    - Parameters: `{ transactions: Transaction[] }`

27. `sign_transaction`
    - Signs transaction with secret key
    - Parameters:
      ```typescript
      {
        transaction: Transaction,
        sk: string
      }
      ```

28. `sign_bytes`
    - Signs arbitrary bytes
    - Parameters: `{ bytes: string, sk: string }`

29. `send_raw_transaction`
    - Broadcasts signed transactions
    - Parameters: `{ signedTxns: string[] }`

30. `simulate_raw_transactions`
    - Simulates raw transactions
    - Parameters: `{ txns: string[] }`

### Key Management Tools

31. `generate_key_pair`
    - Generates new public/private key pair
    - Parameters: None
    - Returns: `{ publicKey: string, privateKey: string }`

32. `derive_key`
    - Derives a key from a master key
    - Parameters: `{ masterKey: string, index: number }`

### Utility Tools

33. `encode_obj`
    - Encodes object to msgpack
    - Parameters: `{ obj: any }`

34. `decode_obj`
    - Decodes msgpack to object
    - Parameters: `{ bytes: string }`

35. `bytes_to_bigint`
    - Converts bytes to BigInt
    - Parameters: `{ bytes: string }`

36. `bigint_to_bytes`
    - Converts BigInt to bytes
    - Parameters: `{ value: string, size: number }`

37. `encode_uint64`
    - Encodes uint64 to bytes
    - Parameters: `{ value: string }`

38. `decode_uint64`
    - Decodes bytes to uint64
    - Parameters: `{ bytes: string }`

39. `compile_teal`
    - Compiles TEAL source code
    - Parameters: `{ source: string }`

40. `disassemble_teal`
    - Disassembles TEAL bytecode
    - Parameters: `{ bytecode: string }`

## Available Resources

### Algod Resources (Real-time State)

1. `algorand://algod/accounts/{address}`
   - Gets current account information
   - Returns: Balance, assets, auth address

2. `algorand://algod/accounts/{address}/application/{app-id}`
   - Gets account's application state
   - Returns: Local state for specific app

3. `algorand://algod/accounts/{address}/asset/{asset-id}`
   - Gets account's asset holding
   - Returns: Asset balance and frozen state

4. `algorand://algod/applications/{app-id}`
   - Gets application information
   - Returns: Global state, creator, approval/clear programs

5. `algorand://algod/applications/{app-id}/box/{name}`
   - Gets application box contents
   - Returns: Box value

6. `algorand://algod/applications/{app-id}/boxes`
   - Lists all application boxes
   - Returns: Box names and sizes

7. `algorand://algod/assets/{asset-id}`
   - Gets asset information
   - Returns: Asset parameters and current state

8. `algorand://algod/transactions/pending/{txid}`
   - Gets pending transaction
   - Returns: Transaction details

9. `algorand://algod/accounts/{address}/transactions/pending`
   - Lists pending transactions for account
   - Returns: Array of transactions

10. `algorand://algod/transactions/pending`
    - Lists all pending transactions
    - Returns: Array of transactions

11. `algorand://algod/transactions/params`
    - Gets suggested parameters
    - Returns: Current network parameters

12. `algorand://algod/status`
    - Gets node status
    - Returns: Current round, versions

### Block Resources

1. `algorand://algod/blocks/latest`
   - Gets latest block information
   - Returns: Latest block header and transactions

2. `algorand://algod/blocks/{round}`
   - Gets specific block information
   - Returns: Block header and transactions

3. `algorand://algod/blocks/{round}/transactions`
   - Gets transactions in specific block
   - Returns: Array of transactions

4. `algorand://indexer/blocks/{round}`
   - Gets historical block information
   - Returns: Block details with transactions

### Health Resources

5. `algorand://algod/health`
   - Gets node health status
   - Returns: Node health information

6. `algorand://indexer/health`
   - Gets indexer health status
   - Returns: Indexer health information

### Genesis Resources

7. `algorand://algod/genesis`
   - Gets genesis information
   - Returns: Network genesis configuration

8. `algorand://indexer/genesis`
   - Gets historical genesis information
   - Returns: Network genesis details

### Network Resources

9. `algorand://algod/versions`
   - Gets supported protocol versions
   - Returns: Supported versions information

10. `algorand://algod/metrics`
    - Gets node metrics
    - Returns: Performance metrics

### Supply Resources

11. `algorand://algod/ledger/supply`
    - Gets current supply information
    - Returns: Total and online stake

12. `algorand://indexer/supply`
    - Gets historical supply information
    - Returns: Historical supply data

### Participation Resources

13. `algorand://algod/participation`
    - Gets participation key information
    - Returns: Key registration info

14. `algorand://algod/participation/keys`
    - Lists participation keys
    - Returns: Array of keys

15. `algorand://algod/participation/keys/{id}`
    - Gets specific participation key
    - Returns: Key details

### Fee Resources

16. `algorand://algod/transactions/fee`
    - Gets suggested fee
    - Returns: Current fee information

17. `algorand://indexer/fee-distribution`
    - Gets historical fee distribution
    - Returns: Fee statistics

### Protocol Resources

18. `algorand://algod/protocol`
    - Gets current protocol parameters
    - Returns: Protocol configuration

19. `algorand://indexer/protocol-upgrades`
    - Gets protocol upgrade history
    - Returns: Upgrade information

### Node Resources

20. `algorand://algod/ready`
    - Checks if node is ready
    - Returns: Readiness status

21. `algorand://algod/sync`
    - Gets node sync status
    - Returns: Sync information

22. `algorand://algod/peers`
    - Lists connected peers
    - Returns: Peer information

23. `algorand://algod/catchup`
    - Gets catchup information
    - Returns: Catchup status

### Compile Resources

24. `algorand://algod/compile/teal`
    - Compiles TEAL program
    - Returns: Compilation result

25. `algorand://algod/compile/teal/disassemble`
    - Disassembles TEAL bytecode
    - Returns: Source code

26. `algorand://algod/compile/teal/dryrun`
    - Dry runs TEAL program
    - Returns: Execution result

### Debug Resources

27. `algorand://algod/debug/accounts/{address}`
    - Gets detailed account debug info
    - Returns: Internal state

28. `algorand://algod/debug/txns/{txid}`
    - Gets transaction debug info
    - Returns: Execution details

29. `algorand://algod/debug/blocks/{round}`
    - Gets block debug info
    - Returns: Internal state

30. `algorand://algod/debug/ledger`
    - Gets ledger debug info
    - Returns: Database state

### Indexer Resources (Historical Data)

31. `algorand://indexer/accounts/{address}`
    - Gets account history
    - Returns: Historical account state

32. `algorand://indexer/accounts/{address}/transactions`
    - Gets account transactions
    - Returns: Transaction history

33. `algorand://indexer/accounts/{address}/apps-local-state`
    - Gets account's application states
    - Returns: All local states

34. `algorand://indexer/accounts/{address}/created-applications`
    - Gets created applications
    - Returns: Applications created by account

35. `algorand://indexer/applications/{app-id}`
    - Gets application history
    - Returns: Historical application state

36. `algorand://indexer/applications/{app-id}/logs`
    - Gets application logs
    - Returns: Historical log messages

37. `algorand://indexer/applications/{app-id}/box/{name}`
    - Gets historical box state
    - Returns: Box value at specific round

38. `algorand://indexer/applications/{app-id}/boxes`
    - Lists historical boxes
    - Returns: Box names at specific round

39. `algorand://indexer/applications`
    - Searches applications
    - Returns: Matching applications

40. `algorand://indexer/assets/{asset-id}`
    - Gets asset history
    - Returns: Historical asset state

41. `algorand://indexer/assets/{asset-id}/balances`
    - Gets asset holders
    - Returns: Accounts holding asset

42. `algorand://indexer/assets/{asset-id}/transactions`
    - Gets asset transactions
    - Returns: Transactions involving asset

43. `algorand://indexer/assets/{asset-id}/balances/{address}`
    - Gets historical asset balance
    - Returns: Account's asset balance

44. `algorand://indexer/assets/{asset-id}/transactions/{txid}`
    - Gets specific asset transaction
    - Returns: Transaction details

45. `algorand://indexer/assets`
    - Searches assets
    - Returns: Matching assets

46. `algorand://indexer/transactions/{txid}`
    - Gets transaction details
    - Returns: Historical transaction

47. `algorand://indexer/transactions`
    - Searches transactions
    - Returns: Matching transactions

## Response Format

All responses follow a standardized format using ResponseProcessor:

```typescript
{
  "data": {
    // Response data here
  },
  "metadata": {  // Only for paginated responses
    "totalItems": number,
    "itemsPerPage": number,
    "currentPage": number,
    "totalPages": number,
    "hasNextPage": boolean,
    "pageToken": string,
    "arrayField": string  // Name of paginated array field
  }
}
```


## Error Handling

The server provides detailed error messages for common issues:

- Invalid parameters
- Network connection errors
- Transaction failures
- Resource not found errors
- Authorization errors

Errors are returned in a standardized format:
```typescript
{
  "error": {
    "code": string,
    "message": string
  }
}
```


## License
MIT
