# Algorand MCP — Workflow Examples

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
generate_algorand_qrcode {
  "address": "[wallet_address]",
  "amount": 5000000,
  "note": "Fund testnet account"
}
```
Response returns `{ qr, uri, link, expires_in }` — display the `qr` text block, `uri`, and `link` to the user.
Or direct user to: https://lora.algokit.io/testnet/fund

### Step 4: If account needs USDC funding
```
generate_algorand_qrcode {
  "address": "[wallet_address]",
  "asset": 10458941, // USDC on testnet
  "amount": 1000000, // 1 USDC with 6 decimals
  "note": "Fund testnet account with USDC"
}
```
Response returns `{ qr, uri, link, expires_in }` — display the `qr` text block, `uri`, and `link` to the user.
Or direct user to: https://faucet.circle.com/

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

### Get a swap quote (ALGO -> USDC)
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

### Get pool analytics (volume, TVL, fees)
```
api_tinyman_get_pool_analytics {
  "asset1Id": 0,
  "asset2Id": 31566704,
  "network": "mainnet"
}
```

> For more Tinyman workflows (liquidity, pool creation, validator opt-in/out), use the Tinyman tools directly. For best-price swaps across multiple DEXes, use Haystack Router below.

---

## Haystack Router — Best-Price Swap (DEX Aggregator)

Haystack Router aggregates quotes across Tinyman, Pact, Folks, and LST protocols to find the optimal swap route. For detailed configuration and batch workflows, load the `haystack-router-interaction` skill.

### CRITICAL: Swap Direction (`type` parameter)

The `type` parameter controls whether `amount` is exact input or exact output. **Wrong direction = wrong amount spent/received.**

| User says | `type` | `amount` is | `fromASAID` | `toASAID` |
|-----------|--------|-------------|-------------|-----------|
| "Buy 10 ALGO with USDC" | `"fixed-output"` | 10000000 (desired output) | USDC | ALGO |
| "Sell 10 ALGO for USDC" | `"fixed-input"` | 10000000 (exact spend) | ALGO | USDC |
| "Swap 10 ALGO to USDC" | `"fixed-input"` | 10000000 (exact spend) | ALGO | USDC |
| "Use 10 ALGO to buy USDC" | `"fixed-input"` | 10000000 (exact spend) | ALGO | USDC |
| "Buy USDC for 10 ALGO" | `"fixed-input"` | 10000000 (exact spend) | ALGO | USDC |

**Rule: "buy X of Y" = fixed-output. "sell/swap/use X of Y" = fixed-input. If ambiguous, ask.**

### Example: fixed-input ("Swap 1 ALGO to USDC" — spend exactly 1 ALGO)

#### Step 1: Check wallet
```
wallet_get_info { "network": "testnet" }
```

#### Step 2: Execute swap
```
api_haystack_execute_swap {
  "fromASAID": 0,
  "toASAID": 31566704,
  "amount": 1000000,
  "type": "fixed-input",
  "slippage": 0.5,
  "network": "testnet"
}
```
> User spends exactly 1 ALGO. Output USDC varies based on market price.

### Example: fixed-output ("Buy 1 USDC with ALGO" — receive exactly 1 USDC)

```
api_haystack_execute_swap {
  "fromASAID": 0,
  "toASAID": 31566704,
  "amount": 1000000,
  "type": "fixed-output",
  "slippage": 0.5,
  "network": "testnet"
}
```
> User receives exactly 1 USDC. Input ALGO varies based on market price.

### Recommended workflow with preview (4 steps)

#### Step 1: Check wallet
```
wallet_get_info { "network": "testnet" }
```

#### Step 2: Check if opt-in is needed
```
api_haystack_needs_optin {
  "address": "[wallet_address]",
  "assetId": 31566704,
  "network": "testnet"
}
```
If `needsOptIn` is true:
```
wallet_optin_asset { "assetId": 31566704, "network": "testnet" }
```

#### Step 3: Preview quote (show user before executing)
```
api_haystack_get_swap_quote {
  "fromASAID": 0,
  "toASAID": 31566704,
  "amount": 1000000,
  "type": "fixed-input",
  "address": "[wallet_address]",
  "network": "testnet"
}
```
> Show user: expected output, USD values, route, price impact. **Always confirm before executing.**
> Set `type` based on user intent — see direction table above.

#### Step 4: Execute after user confirms
```
api_haystack_execute_swap {
  "fromASAID": 0,
  "toASAID": 31566704,
  "amount": 1000000,
  "type": "fixed-input",
  "slippage": 0.5,
  "network": "testnet"
}
```

### Slippage guidance

| Pair Type | Recommended Slippage |
|-----------|---------------------|
| ALGO <-> USDC (deep liquidity) | 0.1-0.5% |
| Major ASAs | 0.5-1% |
| Low-liquidity pairs | 1-3% |

---

## Pera Asset Verification

Verify asset legitimacy before transacting. Mainnet only — uses Pera Wallet's verification database.

### Check if an asset is verified
```
api_pera_asset_verification_status {
  "assetId": 31566704
}
```
> Returns verification tier: `verified`, `trusted`, `suspicious`, or `unverified`. Warn user about suspicious/unverified assets before proceeding.

### Get detailed asset info (name, USD value, logo, supply)
```
api_pera_verified_asset_details {
  "assetId": 31566704
}
```

### Search for verified assets by name
```
api_pera_verified_asset_search {
  "query": "USDC",
  "verifiedOnly": true
}
```
> Set `verifiedOnly: true` to filter out suspicious and unverified assets.

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
generate_algorand_qrcode {
  "address": "[wallet_address]",
  "amount": 5000000,
  "note": "Fund account for transaction"
}
```

The response includes:
- **`qr`**: UTF-8 text QR code (Unicode block characters) — paste directly in a code block
- **`uri`**: The `algorand://` URI for wallet deep links
- **`link`**: Shareable URL to the hosted QR code (e.g. `https://qrclaw.goplausible.xyz/q/abc123...`)
- **`expires_in`**: How long the hosted link remains valid (e.g. `"24h"`)

Display the QR code text block, the URI, and the shareable link to the user.

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

---

## x402 Payment Workflow

> **STOP: Before using this reference, you MUST load the `algorand-x402-payment` skill first.** That skill contains the authoritative payment flow, critical rules, and correct PAYMENT-SIGNATURE format. Do NOT attempt x402 payments using only the examples below — they are a reference supplement, not a standalone guide. Load the skill: `algorand-x402-payment`

When an HTTP request returns a 402 response, follow these steps to pay for the resource.

### Understanding the 402 Response

The 402 response contains an `accepts` array. Each entry has:
- `scheme` — payment scheme (e.g., `"exact"`)
- `network` — CAIP-2 network identifier
- `maxAmountRequired` — amount to pay (in base units)
- `asset` — `"0"` for native ALGO, or ASA ID as string
- `payTo` — recipient address
- `extra.feePayer` — facilitator address that pays transaction fees

### CAIP-2 Network Mapping

| CAIP-2 Identifier | Network |
|--------------------|---------|
| `algorand:SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=` | `testnet` |
| `algorand:wGHE2Pwdvd7S12BL5FaOP20EGYesN73ktiC1qzkkit8=` | `mainnet` |

### Step 1: Check wallet
```
wallet_get_info { "network": "<network>" }
```

### Step 2: Build fee payer transaction

The facilitator sponsors fees for the entire group. The fee payer's `fee` must equal **N x 1000 uAlgo** (N = total transactions in group). For a 2-txn group: fee = 2 x 1000 = **2000**.

```
make_payment_txn {
  "from": "<feePayer>",
  "to": "<feePayer>",
  "amount": 0,
  "fee": 2000,
  "flatFee": true,
  "network": "<network>"
}
```

### Step 3: Build payment transaction

The payment transaction fee is 0 since the facilitator covers it.

**For native ALGO (asset = "0"):**
```
make_payment_txn {
  "from": "<your_address>",
  "to": "<payTo>",
  "amount": <maxAmountRequired>,
  "fee": 0,
  "flatFee": true,
  "network": "<network>"
}
```

**For ASA (asset is an ASA ID):**
```
make_asset_transfer_txn {
  "from": "<your_address>",
  "to": "<payTo>",
  "assetIndex": <asset>,
  "amount": <maxAmountRequired>,
  "fee": 0,
  "flatFee": true,
  "network": "<network>"
}
```

### Step 4: Group the transactions
```
assign_group_id {
  "transactions": [fee_payer_txn, payment_txn]
}
```

### Step 5: Sign ONLY the payment transaction (index 1)
```
wallet_sign_transaction {
  "transaction": <grouped_payment_txn>,
  "network": "<network>"
}
```
> Leave the fee payer transaction (index 0) unsigned — the facilitator signs it server-side.

### Step 6: Encode the unsigned fee payer transaction

Convert the grouped fee payer transaction (index 0) to base64 bytes:
```
encode_unsigned_transaction {
  "transaction": <grouped_fee_payer_txn>
}
```
> This produces the canonical `algosdk.encodeUnsignedTransaction()` base64 encoding needed for the PAYMENT-SIGNATURE payload.

### Step 7: Construct the PAYMENT-SIGNATURE payload

Build this JSON string:
```json
{
  "x402Version": 2,
  "scheme": "exact",
  "network": "<CAIP-2 network identifier from accepts>",
  "payload": {
    "paymentGroup": ["<base64 from encode_unsigned_transaction>", "<base64 from wallet_sign_transaction>"],
    "paymentIndex": 1
  },
  "accepted": <the exact accepts[] entry you chose to pay with — copy it verbatim as an object>
}
```

> **Critical**: The `accepted` field is REQUIRED. It must be an exact copy of the `accepts[]` entry you chose (including all fields: scheme, network, price, payTo, asset, maxAmountRequired, extra, etc.). Without it, the server cannot match your payment to a requirement and will reject with 402.

### Step 8: Retry with payment

Base64-encode the JSON from Step 7 and send it as the `PAYMENT-SIGNATURE` header using `curl`:

> **CRITICAL — Base64 blob handling**: NEVER manually copy-paste base64 blob strings inline into a JSON string or shell command. Base64 blobs are long and a single character corruption (e.g., `5` -> `4`) will cause "signature does not match sender" errors. Instead, ALWAYS:
> 1. Store each blob in a separate shell variable first
> 2. Interpolate variables into the JSON using `${VAR}` syntax
> 3. Use `printf '%s'` (not `echo`) to pipe JSON to `base64`
> 4. Strip newlines from base64 output with `tr -d '\n'` (macOS `base64` adds line breaks)

```bash
# Store blobs in variables — NEVER inline them manually
UNSIGNED_FEE_PAYER="<bytes from encode_unsigned_transaction>"
SIGNED_PAYMENT="<blob from wallet_sign_transaction>"

# Build JSON with variable interpolation
PAYMENT_JSON="{\"x402Version\":2,\"scheme\":\"exact\",\"network\":\"<CAIP-2 identifier>\",\"payload\":{\"paymentGroup\":[\"${UNSIGNED_FEE_PAYER}\",\"${SIGNED_PAYMENT}\"],\"paymentIndex\":1},\"accepted\":<accepted entry as JSON>}"

# Base64-encode and send — use printf, strip newlines
PAYMENT_B64=$(printf '%s' "$PAYMENT_JSON" | base64 | tr -d '\n')
curl -s -H "PAYMENT-SIGNATURE: ${PAYMENT_B64}" "<resource_url>"
```

The server verifies the payment, submits the transaction group, and returns the resource.

> **Important**: The `paymentGroup` array order must match: index 0 = unsigned fee payer txn, index 1 = signed payment txn. The `paymentIndex` indicates which transaction carries the actual payment.

### Common x402 Errors

| Error | Cause | Solution |
|-------|-------|---------|
| `Payment transaction signature does not match sender` | Base64 blob was corrupted during copy-paste into shell command | ALWAYS store blobs in shell variables first, then interpolate — never inline long base64 strings manually |
| `402` returned despite payment header | Missing `accepted` field in payload, or `accepted` doesn't match an `accepts[]` entry exactly | Copy the chosen `accepts[]` entry verbatim into the `accepted` field |
| `402` with expired transactions | Too much time between building transactions and sending payment | Rebuild transactions immediately before sending — `firstValid`/`lastValid` window is ~1000 rounds |
| `Simulation failed` | Insufficient balance, asset not opted in, or group structure wrong | Check USDC/ALGO balance, verify opt-in, ensure group order is [feePayer, payment] |
