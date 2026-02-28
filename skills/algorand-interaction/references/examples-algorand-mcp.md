# Algorand MCP (Local) — Workflow Examples

> All examples use `network: "testnet"` unless noted. For mainnet, change to `"mainnet"` and confirm with user.
> USDC ASA ID: 31566704 (6 decimals). 1 ALGO = 1,000,000 microAlgos.

---

## Session Start

### Step 1: Verify wallet
```
wallet_get_info { "network": "testnet" }
```

### Step 2: If no account exists
```
wallet_add_account {
  "nickname": "my-wallet",
  "allowance": 5000000,
  "dailyAllowance": 10000000
}
```

### Step 3: If account needs funding
```
generate_algorand_uri {
  "address": "[wallet_address]",
  "amount": 5000000,
  "note": "Fund testnet account"
}
```
Or direct user to: https://lora.algokit.io/testnet/fund

---

## ALGO Payment Workflow

### Step 1: Get wallet info
```
wallet_get_info { "network": "testnet" }
```

### Step 2: Create payment transaction
```
make_payment_txn {
  "from": "[sender_address]",
  "to": "[receiver_address]",
  "amount": 1000000,
  "note": "Payment of 1 ALGO",
  "network": "testnet"
}
```
> Amount in microAlgos: 1 ALGO = 1,000,000

### Step 3: Sign the transaction
```
wallet_sign_transaction {
  "transaction": { "...transaction object from step 2..." },
  "network": "testnet"
}
```

### Step 4: Submit the transaction
```
send_raw_transaction {
  "signedTxns": ["[base64_blob_from_step_3]"],
  "network": "testnet"
}
```

### Step 5: Verify (optional)
```
api_indexer_lookup_transaction_by_id {
  "txId": "[txID_from_step_3]",
  "network": "testnet"
}
```

---

## Asset Opt-In Workflow (One-Step)

The simplest way to opt-in to an asset:

```
wallet_optin_asset {
  "assetId": 31566704,
  "network": "testnet"
}
```

This creates, signs, and submits the opt-in transaction in a single call.

---

## Asset Opt-In Workflow (Manual)

### Step 1: Check if already opted in
```
api_algod_get_account_asset_info {
  "address": "[sender_address]",
  "assetId": 31566704,
  "network": "testnet"
}
```

### Step 2: Create opt-in transaction (0-amount self-transfer)
```
make_asset_transfer_txn {
  "from": "[sender_address]",
  "to": "[sender_address]",
  "assetIndex": 31566704,
  "amount": 0,
  "network": "testnet"
}
```

### Step 3: Sign
```
wallet_sign_transaction {
  "transaction": { "...transaction from step 2..." },
  "network": "testnet"
}
```

### Step 4: Submit
```
send_raw_transaction {
  "signedTxns": ["[base64_blob_from_step_3]"],
  "network": "testnet"
}
```

---

## Asset Transfer Workflow (USDC Example)

### Step 1: Get wallet info
```
wallet_get_info { "network": "testnet" }
```

### Step 2: Get asset info (verify decimals)
```
api_algod_get_asset_by_id {
  "assetId": 31566704,
  "network": "testnet"
}
```

### Step 3: Check sender's asset balance
```
api_algod_get_account_asset_info {
  "address": "[sender_address]",
  "assetId": 31566704,
  "network": "testnet"
}
```

### Step 4: Verify recipient has opted in
```
api_algod_get_account_asset_info {
  "address": "[recipient_address]",
  "assetId": 31566704,
  "network": "testnet"
}
```

### Step 5: Create transfer (1 USDC = 1,000,000 with 6 decimals)
```
make_asset_transfer_txn {
  "from": "[sender_address]",
  "to": "[recipient_address]",
  "assetIndex": 31566704,
  "amount": 1000000,
  "network": "testnet"
}
```

### Step 6: Sign
```
wallet_sign_transaction {
  "transaction": { "...transaction from step 5..." },
  "network": "testnet"
}
```

### Step 7: Submit
```
send_raw_transaction {
  "signedTxns": ["[base64_blob_from_step_6]"],
  "network": "testnet"
}
```

---

## Atomic Group Transaction Workflow

### Step 1: Build individual transactions
```
make_payment_txn {
  "from": "[address_A]",
  "to": "[address_B]",
  "amount": 1000000,
  "network": "testnet"
}
```
```
make_asset_transfer_txn {
  "from": "[address_B]",
  "to": "[address_A]",
  "assetIndex": 31566704,
  "amount": 500000,
  "network": "testnet"
}
```

### Step 2: Assign group ID
```
assign_group_id {
  "transactions": [txn1_from_step1, txn2_from_step1]
}
```

### Step 3: Sign group with wallet
```
wallet_sign_transaction_group {
  "transactions": [grouped_txn1, grouped_txn2],
  "network": "testnet"
}
```

### Step 4: Submit
```
send_raw_transaction {
  "signedTxns": ["[blob1]", "[blob2]"],
  "network": "testnet"
}
```

> Atomic groups are all-or-nothing: either all transactions succeed or none do.

---

## Create an ASA (Algorand Standard Asset)

### Step 1: Create the asset
```
make_asset_create_txn {
  "from": "[creator_address]",
  "total": 1000000000,
  "decimals": 6,
  "defaultFrozen": false,
  "unitName": "MYT",
  "assetName": "My Token",
  "assetURL": "https://example.com/my-token",
  "manager": "[creator_address]",
  "reserve": "[creator_address]",
  "freeze": "[creator_address]",
  "clawback": "[creator_address]",
  "network": "testnet"
}
```

### Step 2: Sign
```
wallet_sign_transaction {
  "transaction": { "...transaction from step 1..." },
  "network": "testnet"
}
```

### Step 3: Submit
```
send_raw_transaction {
  "signedTxns": ["[base64_blob]"],
  "network": "testnet"
}
```

### Step 4: Look up the created asset
```
api_algod_get_pending_transaction {
  "txId": "[txID_from_step_2]",
  "network": "testnet"
}
```
> The `asset-index` field in the response contains the new ASA ID.

---

## Deploy a Smart Contract

### Step 1: Compile approval program
```
compile_teal {
  "source": "#pragma version 10\nint 1\nreturn",
  "network": "testnet"
}
```

### Step 2: Compile clear program
```
compile_teal {
  "source": "#pragma version 10\nint 1\nreturn",
  "network": "testnet"
}
```

### Step 3: Create the application
```
make_app_create_txn {
  "from": "[creator_address]",
  "approvalProgram": "[base64_from_step_1]",
  "clearProgram": "[base64_from_step_2]",
  "numGlobalByteSlices": 1,
  "numGlobalInts": 1,
  "numLocalByteSlices": 0,
  "numLocalInts": 0,
  "network": "testnet"
}
```

### Step 4: Sign and submit
```
wallet_sign_transaction {
  "transaction": { "...transaction from step 3..." },
  "network": "testnet"
}
```
```
send_raw_transaction {
  "signedTxns": ["[base64_blob]"],
  "network": "testnet"
}
```

---

## NFD Lookup

### Look up an NFD name
```
api_nfd_get_nfd {
  "nameOrID": "example.algo",
  "view": "full",
  "network": "mainnet"
}
```

### Get NFDs for an address
```
api_nfd_get_nfds_for_addresses {
  "address": ["ALGO_ADDRESS"],
  "view": "brief",
  "network": "mainnet"
}
```

> **CRITICAL**: When sending to an NFD, always use the `depositAccount` field from the response, NOT other address fields.

---

## Tinyman Swap Quote

### Get a swap quote (ALGO → USDC)
```
api_tinyman_get_swap_quote {
  "asset1Id": 0,
  "asset2Id": 31566704,
  "amount": 1000000,
  "network": "mainnet"
}
```
> Asset ID 0 = ALGO

### Get pool info
```
api_tinyman_get_pool {
  "asset1Id": 0,
  "asset2Id": 31566704,
  "version": "v2",
  "network": "mainnet"
}
```

---

## Using the Knowledge Base

### Get a specific document
```
get_knowledge_doc {
  "documents": ["arcs:specs:arc-0003.md"]
}
```

### Knowledge categories
- `arcs` — Algorand Request for Comments
- `sdks` — Software Development Kits
- `algokit` — AlgoKit
- `algokit-utils` — AlgoKit Utils
- `tealscript` — TEALScript
- `puya` — Puya compiler
- `liquid-auth` — Liquid Auth
- `python` — Python Development
- `developers` — Developer Documentation
- `clis` — CLI Tools
- `nodes` — Node Management
- `details` — Developer Details

---

## Compile and Disassemble TEAL

### Compile TEAL
```
compile_teal {
  "source": "#pragma version 10\nint 1\nreturn",
  "network": "testnet"
}
```

### Disassemble TEAL bytecode
```
disassemble_teal {
  "bytecode": "[base64_bytecode_from_compile]",
  "network": "testnet"
}
```

---

## Encode/Decode Objects (msgpack)

### Encode to msgpack
```
encode_obj {
  "obj": { "key": "value", "num": 42 }
}
```

### Decode from msgpack
```
decode_obj {
  "bytes": "[base64_msgpack_string]"
}
```

---

## Using External Keys (Non-Wallet Signing)

When a user provides their own secret key instead of using the wallet:

### Step 1: Build transaction
```
make_payment_txn {
  "from": "[sender_address]",
  "to": "[receiver_address]",
  "amount": 1000000,
  "network": "testnet"
}
```

### Step 2: Sign with external key
```
sign_transaction {
  "transaction": { "...transaction from step 1..." },
  "sk": "[hex_encoded_secret_key]"
}
```

### Step 3: Submit
```
send_raw_transaction {
  "signedTxns": ["[base64_blob_from_step_2]"],
  "network": "testnet"
}
```

---

## Top-Up QR Code (Insufficient Funds)

When balance is insufficient, generate an ARC-26 QR code for easy funding:

```
generate_algorand_uri {
  "address": "[wallet_address]",
  "amount": 5000000,
  "note": "Fund account for transaction"
}
```

The response includes a URI string and SVG QR code that can be scanned with any Algorand-compatible wallet.

---

## Simulate Before Submitting

### Simulate a transaction to check for errors
```
simulate_transactions {
  "txnGroups": [ "...transaction group..." ],
  "allowEmptySignatures": true,
  "allowMoreLogging": true,
  "network": "testnet"
}
```

This lets you verify a transaction will succeed before actually submitting it.
