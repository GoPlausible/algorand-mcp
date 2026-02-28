# Algorand MCP (Local) — Tool Reference

> **Server**: Local MCP server on user's machine
> **Signing**: OS keychain (wallet tools) or user-provided secret key
> **Networks**: `mainnet`, `testnet`, `localnet`

## Table of Contents

1. [Wallet Management Tools](#wallet-management-tools)
2. [Account Management Tools](#account-management-tools)
3. [Utility Tools](#utility-tools)
4. [Transaction Building Tools](#transaction-building-tools)
5. [Algod Tools](#algod-tools)
6. [Algod API Tools](#algod-api-tools)
7. [Indexer API Tools](#indexer-api-tools)
8. [NFDomains API Tools](#nfdomains-api-tools)
9. [Tinyman DEX API Tools](#tinyman-dex-api-tools)
10. [ARC-26 URI Tools](#arc-26-uri-tools)
11. [Knowledge Base Tools](#knowledge-base-tools)

---

## Wallet Management Tools

Secure wallet with OS keychain storage. Keys never exposed to agents.

### wallet_add_account
- **Purpose**: Create a new Algorand account (or import from mnemonic) and store in OS keychain with nickname and spending limits
- **Parameters**:
```json
{
  "nickname": "my-account",
  "mnemonic": "optional 25-word mnemonic to import",
  "allowance": 5000000,
  "dailyAllowance": 10000000
}
```
- **Returns**: `{ address, publicKey, nickname }` — mnemonic is NEVER returned

### wallet_remove_account
- **Purpose**: Remove an account from the wallet by nickname or index
- **Parameters**: `{ "nickname": "my-account" }` or `{ "index": 0 }`

### wallet_list_accounts
- **Purpose**: List all wallet accounts with nicknames, addresses, and spending limits
- **Parameters**: `{}`

### wallet_switch_account
- **Purpose**: Switch the active wallet account by nickname or index
- **Parameters**: `{ "nickname": "my-account" }` or `{ "index": 0 }`

### wallet_get_info
- **Purpose**: Get active wallet account info including address, balance, and spending limits
- **Parameters**: `{ "network": "testnet" }`
- **Use**: FIRST tool in EVERY session

### wallet_get_assets
- **Purpose**: Get all asset holdings for the active wallet account
- **Parameters**: `{ "network": "testnet" }`

### wallet_sign_transaction
- **Purpose**: Sign a single transaction with the active wallet account. Enforces spending limits.
- **Parameters**:
```json
{
  "transaction": { "...transaction object from make_*_txn..." },
  "network": "testnet"
}
```

### wallet_sign_transaction_group
- **Purpose**: Sign a group of transactions. Assigns group ID automatically and enforces spending limits.
- **Parameters**:
```json
{
  "transactions": [ "...array of transaction objects..." ],
  "network": "testnet"
}
```

### wallet_sign_data
- **Purpose**: Sign arbitrary hex data with raw Ed25519 (no Algorand SDK prefix)
- **Parameters**: `{ "data": "48656c6c6f" }`
- **Returns**: `{ signature, publicKey, dataLength }`

### wallet_optin_asset
- **Purpose**: One-step asset opt-in — creates, signs, and submits the transaction
- **Parameters**: `{ "assetId": 31566704, "network": "testnet" }`

---

## Account Management Tools

Key derivation and account creation. Keys returned in the clear — use wallet tools for secure storage.

### create_account
- **Purpose**: Create a new Algorand account (returns address, secretKey, mnemonic)
- **Parameters**: `{}`
- **⚠️ Warning**: Secret key returned in response. Use `wallet_add_account` for secure storage.

### rekey_account
- **Purpose**: Rekey an Algorand account to a new address
- **Parameters**: `{ "sourceAddress": "...", "targetAddress": "..." }`

### mnemonic_to_mdk
- **Purpose**: Convert mnemonic to master derivation key
- **Parameters**: `{ "mnemonic": "25-word mnemonic" }`

### mdk_to_mnemonic
- **Purpose**: Convert master derivation key to mnemonic
- **Parameters**: `{ "mdk": "hex string" }`

### secret_key_to_mnemonic
- **Purpose**: Convert secret key to mnemonic
- **Parameters**: `{ "secretKey": "hex string" }`

### mnemonic_to_secret_key
- **Purpose**: Convert mnemonic to secret key
- **Parameters**: `{ "mnemonic": "25-word mnemonic" }`

### seed_from_mnemonic
- **Purpose**: Generate seed from mnemonic
- **Parameters**: `{ "mnemonic": "25-word mnemonic" }`

### mnemonic_from_seed
- **Purpose**: Generate mnemonic from seed
- **Parameters**: `{ "seed": "hex string" }`

---

## Utility Tools

Address validation, encoding, signing, and server health.

### ping
- **Purpose**: Verify server connectivity
- **Parameters**: `{}`

### validate_address
- **Purpose**: Check if an Algorand address is valid
- **Parameters**: `{ "address": "ALGO_ADDRESS" }`

### encode_address
- **Purpose**: Encode a public key to an Algorand address
- **Parameters**: `{ "publicKey": "hex string" }`

### decode_address
- **Purpose**: Decode an Algorand address to a public key
- **Parameters**: `{ "address": "ALGO_ADDRESS" }`

### get_application_address
- **Purpose**: Get the address for a given application ID
- **Parameters**: `{ "appId": 123456 }`

### bytes_to_bigint
- **Purpose**: Convert bytes to BigInt
- **Parameters**: `{ "bytes": "hex string" }`

### bigint_to_bytes
- **Purpose**: Convert BigInt to bytes
- **Parameters**: `{ "value": "12345", "size": 8 }`

### encode_uint64
- **Purpose**: Encode uint64 to bytes
- **Parameters**: `{ "value": "12345" }`

### decode_uint64
- **Purpose**: Decode bytes to uint64
- **Parameters**: `{ "bytes": "hex string" }`

### verify_bytes
- **Purpose**: Verify a signature against bytes with an Algorand address
- **Parameters**: `{ "bytes": "hex", "signature": "base64", "address": "ALGO_ADDRESS" }`
- **Returns**: `{ verified: boolean }`

### sign_bytes
- **Purpose**: Sign bytes with a secret key
- **Parameters**: `{ "bytes": "hex", "sk": "hex" }`

### encode_obj
- **Purpose**: Encode object to msgpack format
- **Parameters**: `{ "obj": { "key": "value" } }`

### decode_obj
- **Purpose**: Decode msgpack bytes to object
- **Parameters**: `{ "bytes": "base64 string" }`

---

## Transaction Building Tools

Build unsigned transaction objects. Must be signed before submission.

### make_payment_txn
- **Purpose**: Create an ALGO payment transaction
- **Parameters**:
```json
{
  "from": "sender_address",
  "to": "receiver_address",
  "amount": 1000000,
  "note": "optional note",
  "closeRemainderTo": "optional",
  "rekeyTo": "optional",
  "network": "testnet"
}
```
> Amount in microAlgos: 1 ALGO = 1,000,000

### make_keyreg_txn
- **Purpose**: Create a key registration transaction for consensus participation
- **Parameters**:
```json
{
  "from": "address",
  "voteKey": "base64",
  "selectionKey": "base64",
  "stateProofKey": "base64",
  "voteFirst": 1000,
  "voteLast": 2000000,
  "voteKeyDilution": 10000,
  "nonParticipation": false,
  "network": "testnet"
}
```

### make_asset_create_txn
- **Purpose**: Create an asset (ASA) creation transaction
- **Parameters**:
```json
{
  "from": "creator_address",
  "total": 1000000,
  "decimals": 6,
  "defaultFrozen": false,
  "unitName": "TKN",
  "assetName": "My Token",
  "assetURL": "https://example.com",
  "manager": "optional",
  "reserve": "optional",
  "freeze": "optional",
  "clawback": "optional",
  "network": "testnet"
}
```

### make_asset_config_txn
- **Purpose**: Reconfigure an asset (change manager, reserve, freeze, clawback)
- **Parameters**:
```json
{
  "from": "manager_address",
  "assetIndex": 12345,
  "strictEmptyAddressChecking": true,
  "manager": "optional",
  "reserve": "optional",
  "freeze": "optional",
  "clawback": "optional",
  "network": "testnet"
}
```

### make_asset_destroy_txn
- **Purpose**: Destroy an asset (all units must be held by creator)
- **Parameters**: `{ "from": "creator_address", "assetIndex": 12345, "network": "testnet" }`

### make_asset_freeze_txn
- **Purpose**: Freeze or unfreeze an asset for a specific account
- **Parameters**:
```json
{
  "from": "freeze_address",
  "assetIndex": 12345,
  "freezeTarget": "target_address",
  "freezeState": true,
  "network": "testnet"
}
```

### make_asset_transfer_txn
- **Purpose**: Transfer an ASA or opt-in (0-amount self-transfer)
- **Parameters**:
```json
{
  "from": "sender_address",
  "to": "receiver_address",
  "assetIndex": 31566704,
  "amount": 1000000,
  "network": "testnet"
}
```

### make_app_create_txn
- **Purpose**: Deploy a smart contract
- **Parameters**:
```json
{
  "from": "creator_address",
  "approvalProgram": "base64 compiled TEAL",
  "clearProgram": "base64 compiled TEAL",
  "numGlobalByteSlices": 0,
  "numGlobalInts": 1,
  "numLocalByteSlices": 0,
  "numLocalInts": 0,
  "extraPages": 0,
  "appArgs": ["base64 arg1"],
  "accounts": ["address1"],
  "foreignApps": [123],
  "foreignAssets": [456],
  "network": "testnet"
}
```

### make_app_update_txn
- **Purpose**: Update a smart contract's approval and clear programs
- **Parameters**:
```json
{
  "from": "creator_address",
  "appIndex": 123456,
  "approvalProgram": "base64 compiled TEAL",
  "clearProgram": "base64 compiled TEAL",
  "network": "testnet"
}
```

### make_app_delete_txn
- **Purpose**: Delete a smart contract
- **Parameters**: `{ "from": "creator_address", "appIndex": 123456, "network": "testnet" }`

### make_app_optin_txn
- **Purpose**: Opt-in to a smart contract (allocate local state)
- **Parameters**: `{ "from": "user_address", "appIndex": 123456, "network": "testnet" }`

### make_app_closeout_txn
- **Purpose**: Close out of a smart contract (deallocate local state)
- **Parameters**: `{ "from": "user_address", "appIndex": 123456, "network": "testnet" }`

### make_app_clear_txn
- **Purpose**: Force-clear local state for a smart contract
- **Parameters**: `{ "from": "user_address", "appIndex": 123456, "network": "testnet" }`

### make_app_call_txn
- **Purpose**: Call a smart contract method (NoOp)
- **Parameters**:
```json
{
  "from": "caller_address",
  "appIndex": 123456,
  "appArgs": ["base64 encoded args"],
  "accounts": ["referenced addresses"],
  "foreignApps": [789],
  "foreignAssets": [101],
  "network": "testnet"
}
```

### assign_group_id
- **Purpose**: Assign a group ID to multiple transactions for atomic execution
- **Parameters**: `{ "transactions": [ txn1, txn2, ... ] }`

### sign_transaction
- **Purpose**: Sign a transaction with a provided secret key (not the wallet)
- **Parameters**:
```json
{
  "transaction": { "...transaction object..." },
  "sk": "hex encoded secret key"
}
```
- **Returns**: `{ txID, blob }`

---

## Algod Tools

TEAL compilation, transaction simulation, and submission.

### compile_teal
- **Purpose**: Compile TEAL source code to bytecode
- **Parameters**: `{ "source": "#pragma version 10\nint 1\nreturn", "network": "testnet" }`
- **Returns**: `{ result (base64 bytecode), hash }`

### disassemble_teal
- **Purpose**: Disassemble TEAL bytecode back to source
- **Parameters**: `{ "bytecode": "base64 encoded bytecode", "network": "testnet" }`

### send_raw_transaction
- **Purpose**: Submit signed transactions to the network
- **Parameters**:
```json
{
  "signedTxns": ["base64 encoded signed transaction"],
  "network": "testnet"
}
```

### simulate_raw_transactions
- **Purpose**: Simulate raw transactions without submitting
- **Parameters**: `{ "txns": ["base64 encoded transactions"], "network": "testnet" }`

### simulate_transactions
- **Purpose**: Simulate transactions with detailed configuration
- **Parameters**:
```json
{
  "txnGroups": [ "...transaction groups..." ],
  "allowEmptySignatures": true,
  "allowMoreLogging": true,
  "allowUnnamedResources": true,
  "network": "testnet"
}
```

---

## Algod API Tools

Direct algod node queries. All accept optional `network`, `itemsPerPage`, `pageToken`.

### api_algod_get_account_info
- **Purpose**: Get account balance, assets, auth address, and app local states
- **Parameters**: `{ "address": "ALGO_ADDRESS", "network": "testnet" }`

### api_algod_get_account_application_info
- **Purpose**: Get account-specific application local state
- **Parameters**: `{ "address": "ALGO_ADDRESS", "appId": 123456, "network": "testnet" }`

### api_algod_get_account_asset_info
- **Purpose**: Check if account holds a specific asset and get balance
- **Parameters**: `{ "address": "ALGO_ADDRESS", "assetId": 31566704, "network": "testnet" }`

### api_algod_get_application_by_id
- **Purpose**: Get application information (global state, programs)
- **Parameters**: `{ "appId": 123456, "network": "testnet" }`

### api_algod_get_application_box
- **Purpose**: Get a specific application box by name
- **Parameters**: `{ "appId": 123456, "boxName": "box_name", "network": "testnet" }`

### api_algod_get_application_boxes
- **Purpose**: Get all boxes for an application
- **Parameters**: `{ "appId": 123456, "maxBoxes": 100, "network": "testnet" }`

### api_algod_get_asset_by_id
- **Purpose**: Get asset configuration (total, decimals, unit name, manager, etc.)
- **Parameters**: `{ "assetId": 31566704, "network": "testnet" }`

### api_algod_get_pending_transaction
- **Purpose**: Get pending transaction info by ID
- **Parameters**: `{ "txId": "TXID", "network": "testnet" }`

### api_algod_get_pending_transactions_by_address
- **Purpose**: Get pending transactions for a specific address
- **Parameters**: `{ "address": "ALGO_ADDRESS", "network": "testnet" }`

### api_algod_get_pending_transactions
- **Purpose**: Get all pending transactions in the pool
- **Parameters**: `{ "maxTxns": 100, "network": "testnet" }`

### api_algod_get_transaction_params
- **Purpose**: Get suggested transaction parameters (fee, first/last valid round, genesis info)
- **Parameters**: `{ "network": "testnet" }`

### api_algod_get_node_status
- **Purpose**: Get current node status (last round, time since last round, etc.)
- **Parameters**: `{ "network": "testnet" }`

### api_algod_get_node_status_after_block
- **Purpose**: Wait for a specific round and get node status
- **Parameters**: `{ "round": 12345678, "network": "testnet" }`

---

## Indexer API Tools

Historical blockchain queries. All accept optional `network`, `itemsPerPage`, `pageToken`.

### api_indexer_lookup_account_by_id
- **Purpose**: Get historical account information
- **Parameters**: `{ "address": "ALGO_ADDRESS", "network": "testnet" }`

### api_indexer_lookup_account_assets
- **Purpose**: Get all assets held by an account
- **Parameters**: `{ "address": "ALGO_ADDRESS", "network": "testnet" }`

### api_indexer_lookup_account_app_local_states
- **Purpose**: Get all application local states for an account
- **Parameters**: `{ "address": "ALGO_ADDRESS", "network": "testnet" }`

### api_indexer_lookup_account_created_applications
- **Purpose**: Get all applications created by an account
- **Parameters**: `{ "address": "ALGO_ADDRESS", "network": "testnet" }`

### api_indexer_search_for_accounts
- **Purpose**: Search for accounts with various filters
- **Parameters**: `{ "assetId": 31566704, "limit": 10, "network": "testnet" }`

### api_indexer_lookup_applications
- **Purpose**: Get application information from indexer
- **Parameters**: `{ "appId": 123456, "network": "testnet" }`

### api_indexer_lookup_application_logs
- **Purpose**: Get application log messages
- **Parameters**: `{ "appId": 123456, "network": "testnet" }`

### api_indexer_search_for_applications
- **Purpose**: Search for applications with filters
- **Parameters**: `{ "limit": 10, "network": "testnet" }`

### api_indexer_lookup_application_box
- **Purpose**: Get a specific application box from indexer
- **Parameters**: `{ "appId": 123456, "boxName": "box_name", "network": "testnet" }`

### api_indexer_lookup_application_boxes
- **Purpose**: Get all boxes for an application from indexer
- **Parameters**: `{ "appId": 123456, "network": "testnet" }`

### api_indexer_lookup_asset_by_id
- **Purpose**: Get asset information and configuration
- **Parameters**: `{ "assetId": 31566704, "network": "testnet" }`

### api_indexer_lookup_asset_balances
- **Purpose**: Get all accounts holding a specific asset
- **Parameters**: `{ "assetId": 31566704, "network": "testnet" }`

### api_indexer_lookup_asset_transactions
- **Purpose**: Get transactions involving a specific asset
- **Parameters**: `{ "assetId": 31566704, "network": "testnet" }`

### api_indexer_search_for_assets
- **Purpose**: Search for assets by name, unit, or creator
- **Parameters**: `{ "name": "USDC", "limit": 10, "network": "testnet" }`

### api_indexer_lookup_transaction_by_id
- **Purpose**: Get transaction details by ID
- **Parameters**: `{ "txId": "TXID", "network": "testnet" }`

### api_indexer_lookup_account_transactions
- **Purpose**: Get transaction history for an account
- **Parameters**: `{ "address": "ALGO_ADDRESS", "network": "testnet" }`

### api_indexer_search_for_transactions
- **Purpose**: Search for transactions with various filters
- **Parameters**: `{ "limit": 10, "network": "testnet" }`

---

## NFDomains API Tools

Algorand Name Service (`.algo` names).

### api_nfd_get_nfd
- **Purpose**: Get NFD info by name or application ID
- **Parameters**:
```json
{
  "nameOrID": "example.algo",
  "view": "brief",
  "poll": false,
  "nocache": false,
  "network": "mainnet"
}
```
- **⚠️ CRITICAL**: Use `depositAccount` for transactions, NOT other address fields!

### api_nfd_get_nfds_for_addresses
- **Purpose**: Get NFDs owned by specific addresses
- **Parameters**:
```json
{
  "address": ["ALGO_ADDRESS_1", "ALGO_ADDRESS_2"],
  "limit": 10,
  "view": "brief",
  "network": "mainnet"
}
```

### api_nfd_get_nfd_activity
- **Purpose**: Get activity/changes for NFDs
- **Parameters**:
```json
{
  "name": ["example.algo"],
  "type": "changes",
  "limit": 10,
  "sort": "timeDesc",
  "network": "mainnet"
}
```

### api_nfd_get_nfd_analytics
- **Purpose**: Get analytics data for NFD sales and transfers
- **Parameters**:
```json
{
  "name": "example.algo",
  "buyer": "address",
  "seller": "address",
  "limit": 10,
  "sort": "timeDesc",
  "network": "mainnet"
}
```

### api_nfd_browse_nfds
- **Purpose**: Browse NFDs with filters (category, sale type, price range)
- **Parameters**:
```json
{
  "category": ["curated"],
  "saleType": ["buyItNow"],
  "minPrice": 0,
  "maxPrice": 1000000,
  "limit": 10,
  "sort": "priceAsc",
  "view": "brief",
  "network": "mainnet"
}
```

### api_nfd_search_nfds
- **Purpose**: Search NFDs by name
- **Parameters**:
```json
{
  "name": "algo",
  "limit": 10,
  "view": "brief",
  "network": "mainnet"
}
```

---

## Tinyman DEX API Tools

Decentralized exchange operations on Tinyman AMM.

### api_tinyman_get_pool
- **Purpose**: Get pool information for an asset pair
- **Parameters**:
```json
{
  "asset1Id": 0,
  "asset2Id": 31566704,
  "version": "v2",
  "network": "mainnet"
}
```
> Asset ID 0 = ALGO

### api_tinyman_get_pool_analytics
- **Purpose**: Get pool analytics data (volume, TVL, fees)
- **Parameters**: `{ "asset1Id": 0, "asset2Id": 31566704, "network": "mainnet" }`

### api_tinyman_get_pool_creation_quote
- **Purpose**: Get a quote for creating a new liquidity pool
- **Parameters**: Pool creation parameters

### api_tinyman_get_liquidity_quote
- **Purpose**: Get a quote for adding liquidity to a pool
- **Parameters**: Liquidity parameters

### api_tinyman_get_remove_liquidity_quote
- **Purpose**: Get a quote for removing liquidity from a pool
- **Parameters**: Removal parameters

### api_tinyman_get_swap_quote
- **Purpose**: Get a swap quote (price, slippage, route)
- **Parameters**: Swap parameters including asset IDs and amount

### api_tinyman_get_asset_optin_quote
- **Purpose**: Get a quote for opting into a Tinyman asset
- **Parameters**: Asset opt-in parameters

### api_tinyman_get_validator_optin_quote
- **Purpose**: Get a quote for opting into the Tinyman validator
- **Parameters**: Validator opt-in parameters

### api_tinyman_get_validator_optout_quote
- **Purpose**: Get a quote for opting out of the Tinyman validator
- **Parameters**: Validator opt-out parameters

---

## ARC-26 URI Tools

### generate_algorand_uri
- **Purpose**: Generate an Algorand payment URI and QR code per ARC-26 specification
- **Parameters**:
```json
{
  "address": "receiver_address",
  "label": "Payment label",
  "amount": 1000000,
  "asset": 31566704,
  "note": "Payment note",
  "xnote": "Exclusive note"
}
```
- **Returns**: URI string + SVG QR code

---

## Knowledge Base Tools

### get_knowledge_doc
- **Purpose**: Get markdown content for specified knowledge documents
- **Parameters**: `{ "documents": ["arcs:specs:arc-0003.md"] }`
- **Categories**:
  - `arcs`: Algorand Request for Comments
  - `sdks`: Software Development Kits
  - `algokit`: AlgoKit
  - `algokit-utils`: AlgoKit Utils
  - `tealscript`: TEALScript
  - `puya`: Puya
  - `liquid-auth`: Liquid Auth
  - `python`: Python Development
  - `developers`: Developer Documentation
  - `clis`: CLI Tools
  - `nodes`: Node Management
  - `details`: Developer Details

---

## Error Reference

| Error | Cause | Solution |
|-------|-------|----------|
| `No active account` | No wallet account configured | Guide user to `wallet_add_account` |
| `Invalid Algorand address format` | Bad address | Check with `validate_address` |
| `Spending limit exceeded` | Transaction exceeds `allowance` or `dailyAllowance` | Inform user, adjust limits |
| `Asset hasn't been opted in` | Recipient not opted in to ASA | Opt-in first with `wallet_optin_asset` or `make_asset_transfer_txn` |
| `Overspend` / negative balance | Insufficient funds for amount + fee + MBR | Add funds or reduce amount |
| `Do not know how to serialize a BigInt` | BigInt in JSON response | Should not occur (patched globally) |
