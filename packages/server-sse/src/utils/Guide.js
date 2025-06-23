/**
 * Guide content for Algorand Remote MCP
 * This file contains the full markdown documentation used by AI agents
 */

export const guide = `# Algorand Remote MCP Guide for Agents

> **🌐 NETWORK CONFIGURATION**: This system is configured for **Algorand Mainnet**. All examples and asset IDs reference mainnet assets (e.g., USDC ASA ID: 31566704).
> **🌐 SIGNING TRANSACTIONS**: This system is set to sign transactions on MCP server side not by LLM or agent therefore there is no need to get sensitive data like private key or mnemonic unless explicitly asked by user to use the tools to get those or summoned through an MCP Resource.

## 🚨 CRITICAL: FIRST STEPS FOR EVERY NEW SESSION

⚠️ **AGENTS MUST PERFORM THESE ACTIONS AT THE START OF EACH SESSION WITH ALGORAND-REMOTE-MCP:**

**Check Wallet Configuration:**
   - Tool: \`get_wallet_account\`
   - Purpose: Verify wallet exists and is correctly configured
   - Action Required: Use this tool FIRST in EVERY session
   - If wallet exists. Verify opt-in success:
   \`\`\`
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[user_address]",
     "assetId": 31566704  // USDC on Algorand Mainnet
   }
   \`\`\`
   proceed to perform blockchain operations
   - If no wallet or error response:
     * Inform user that wallet configuration is missing
     * Check wallet again to verify

⚠️ **ALWAYS verify wallet configuration at the start of EVERY session before attempting any blockchain operations!**

## 📋 Session Workflow Quick Reference

| Step | Action | Tool | Purpose |
|------|--------|------|---------|
| 1 | Check wallet | \`get_wallet_account\` | Verify wallet configuration |
| 2 | Get blockchain data | API query tools | Retrieve necessary information |
| 3 | Create transactions | Transaction tools | Prepare blockchain operations |
| 4 | Sign transactions | \`sign_transaction\` | Authorize operations |
| 5 | Submit transactions | \`submit_transaction\` | Execute on blockchain |
| 6 | Verify results | API query tools | Confirm operation success |

## Quick Start for LLM Agents

As an LLM agent, here's how to quickly perform basic Algorand operations using direct tool invocation pattern:

### Minimal Working Example - Send Payment

1. First, retrieve wallet information:
   \`\`\`
   use_tool: "get_wallet_account"
   parameters: {}
   \`\`\`

2. If wallet exists, create a payment transaction:
   \`\`\`
   use_tool: "create_payment_transaction"
   parameters: {
     "from": "[sender_address]",
     "to": "receiver_address",
     "amount": 1000000
   }
   \`\`\`

3. Sign the transaction:
   \`\`\`
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[encoded_transaction_from_step_2]"
   }
   \`\`\`

4. Submit the transaction:
   \`\`\`
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_3]"
   }
   \`\`\`

5. Verify the result:
   \`\`\`
   use_tool: api_algod_get_transaction_info
   parameters: {
     "txid": "[transaction_id_from_step_4]"
   }
   \`\`\`

### Minimal Working Example - Optin to Asset

1. First, retrieve wallet information:
   \`\`\`
   use_tool: "get_wallet_account"
   parameters: {}
   \`\`\`

2. If wallet exists, create an asset opt-in transaction:
   \`\`\`
   use_tool: "asset_optin"
   parameters: {
     "address": "[wallet_address]",
     "assetID": 31566704  // USDC on Algorand Mainnet
   }
   \`\`\`

3. Sign the transaction:
   \`\`\`
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[encoded_transaction_from_step_2]"
   }
   \`\`\`

4. Submit the transaction:
   \`\`\`
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_3]"
   }
   \`\`\`

5. Verify the result:
   \`\`\`
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[wallet_address]",
     "assetId": 31566704  // USDC on Algorand Mainnet
   }
   \`\`\`

### Minimal Working Example - Send Asset

1. First, retrieve wallet information:
   \`\`\`
   use_tool: "get_wallet_account"
   parameters: {}
   \`\`\`

2. If wallet exists, create an asset transfer transaction:
   \`\`\`
   use_tool: "transfer_asset"
   parameters: {
     "from": "[sender_address]",
     "to": "receiver_address",
     "assetID": 31566704,  // USDC on Algorand Mainnet
     "amount": 1000000     // 1 USDC (6 decimals)
   }
   \`\`\`

3. Sign the transaction:
   \`\`\`
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[encoded_transaction_from_step_2]"
   }
   \`\`\`

4. Submit the transaction:
   \`\`\`
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_3]"
   }
   \`\`\`

5. Verify the result:
   \`\`\`
   use_tool: api_algod_get_transaction_info
   parameters: {
     "txid": "[transaction_id_from_step_4]"
   }
   \`\`\`

## Common Algorand Mainnet Assets

Here are frequently used assets on Algorand Mainnet for reference:

| Asset Name | Asset ID | Decimals | Description |
|------------|----------|----------|-------------|
| USDC | 31566704 | 6 | USD Coin - Most common stablecoin |
| USDT | 312769 | 6 | Tether USD - Popular stablecoin |
| ALGO | N/A | 6 | Native Algorand token (no ASA ID needed) |
| goETH | 386192725 | 8 | Wrapped Ethereum |
| goBTC | 386195940 | 8 | Wrapped Bitcoin |
| PLANET | 27165954 | 6 | Planetwatch token |

> **Note**: Always verify asset IDs before transactions, as scam tokens may use similar names.

### Common Error Messages and Solutions

| Error Message | Likely Cause | Solution |
|---------------|--------------|----------|
| \`No active wallet mnemonic configured\` | Missing ALGORAND_AGENT_WALLET |Inform user and try again\` |
| \`Error fetching account info\` | Network connection or invalid address | Check ALGORAND_ALGOD setting and address format |
| \`Transaction would result in negative balance\` | Insufficient funds | Ensure sender has enough ALGOs (remember min balance requirements) |
| \`Asset hasn't been opted in\` | Asset not in receiver's account | Receiver must opt in to asset first |
| \`Cannot access knowledge resources\` | R2 bucket misconfiguration | Verify R2 bucket setup and permissions |
| \`Overspend\` | Transaction fee + amount exceeds balance | Reduce amount or add funds to account |

## Understanding Tool Categories

> **Note**: The following tools are directly accessible to LLM agents.

1. Wallet Management Tools
   - Type: Wallet data retrieval
   - Examples: \`get_wallet_address\`, \`get_wallet_account\`
   - Purpose: Access configured wallet information
   - Note: Requires proper server configuration

2. Account Information Tools
   - Type: Account data retrieval
   - Examples: \`api_algod_get_account_info\`, \`check_balance\`
   - Purpose: Access account information
   - Note: Requires valid Algorand address

3. Transaction Tools
   - Type: Blockchain transaction creation and submission
   - Examples: \`create_payment_transaction\`, \`submit_transaction\`
   - Purpose: Create and submit transactions
   - Note: Requires proper parameter validation

4. Asset Management Tools
   - Type: ASA operations
   - Examples: \`asset_optin\`, \`transfer_asset\`
   - Purpose: Manage Algorand Standard Assets
   - Note: Requires asset IDs and proper authorization

## Available Tools

1. Wallet Management Tools
   - Tool: \`get_wallet_address\`
   - Purpose: Get the address for the configured wallet
   - Parameters: None
   - Returns: Address of the configured wallet

   - Tool: \`get_wallet_account\`
   - Purpose: Get account information for the configured wallet
   - Parameters: None
   - Returns: Full account details including balance and assets

   - Tool: \`get_wallet_assets\`
   - Purpose: Get assets owned by the configured wallet
   - Parameters: None
   - Returns: List of assets owned by the wallet

   - Tool: \`get_wallet_mnemonic\`
   - Purpose: Get the mnemonic for the configured wallet
   - Parameters: None
   - Returns: The mnemonic phrase (sensitive!)

   - Tool: \`get_wallet_publickey\`
   - Purpose: Get the public key for the configured wallet
   - Parameters: None
   - Returns: The public key in hex format

   - Tool: \`get_wallet_secretkey\`
   - Purpose: Get the secret key for the configured wallet
   - Parameters: None
   - Returns: The secret key in hex format (sensitive!)
   
   - Tool: \`reset-wallet_account\`
   - Purpose: Reset the wallet account for the configured user
   - Parameters: None
   - Returns: Address of the new wallet
   - Note: This will generate a new Algorand account and replace the existing one

2. Account Information Tools
   - Tool: \`api_algod_get_account_info\`
   - Purpose: Get detailed account information
   - Parameters: \`{ address: string }\`
   - Returns: Account data including balance, status, apps, and assets

   - Tool: \`api_indexer_lookup_account_by_id\`
   - Purpose: Get comprehensive account information from the indexer
   - Parameters: \`{ address: string }\`
   - Returns: Full account details including participation information

   - Tool: \`check_balance\`
   - Purpose: Get simplified account balance
   - Parameters: \`{ address: string }\`
   - Returns: Account balance in microAlgos

3. Account Management Tools
   - Tool: \`create_account\`
   - Purpose: Create new Algorand account
   - Returns: Address and mnemonic

   - Tool: \`recover_account\`
   - Purpose: Recover account from mnemonic
   - Parameters: \`{ mnemonic: string }\`

   - Tool: \`check_balance\`
   - Purpose: Check account balance
   - Parameters: \`{ address: string }\`

4. Transaction Management Tools
   - Tool: \`create_payment_transaction\`
   - Purpose: Create payment transaction
   - Parameters:
     \`\`\`
     {
       from: string,
       to: string,
       amount: number,
       note?: string
     }
     \`\`\`

   - Tool: \`sign_transaction\`
   - Purpose: Sign transaction with mnemonic
   - Parameters:
     \`\`\`
     {
       encodedTxn: string,  // Base64 encoded
       mnemonic: string
     }
     \`\`\`

   - Tool: \`submit_transaction\`
   - Purpose: Submit signed transaction
   - Parameters: \`{ signedTxn: string }\`

5. Asset Management Tools
   - Tool: \`create_asset\`
   - Purpose: Create new Algorand Standard Asset
   - Parameters:
     \`\`\`
     {
       creator: string,
       name: string,
       unitName: string,
       totalSupply: number,
       decimals: number,
       ...
     }
     \`\`\`

   - Tool: \`asset_optin\`
   - Purpose: Opt-in to an ASA
   - Parameters:
     \`\`\`
     {
       address: string,
       assetID: number
     }
     \`\`\`

   - Tool: \`transfer_asset\`
   - Purpose: Transfer an ASA
   - Parameters:
     \`\`\`
     {
       from: string,
       to: string,
       assetID: number,
       amount: number
     }
     \`\`\`

6. Application Management Tools
   - Tool: \`create_application\`
   - Purpose: Create smart contract
   - Parameters:
     \`\`\`
     {
       creator: string,
       approvalProgram: string,
       clearProgram: string,
       ...
     }
     \`\`\`

   - Tool: \`call_application\`
   - Purpose: Call smart contract
   - Parameters:
     \`\`\`
     {
       sender: string,
       appId: number,
       appArgs?: string[],
       ...
     }
     \`\`\`

   - Tool: \`update_application\`
   - Purpose: Update smart contract
   - Parameters:
     \`\`\`
     {
       sender: string,
       appId: number,
       approvalProgram: string,
       clearProgram: string,
       ...
     }
     \`\`\`

7. API Query Tools
   - Tool: \`api_algod_get_account_info\`
   - Purpose: Get account details
   - Parameters: \`{ address: string }\`

   - Tool: \`api_indexer_lookup_account_transactions\`
   - Purpose: Get account transaction history
   - Parameters: \`{ address: string }\`

   - Tool: \`api_nfd_get_nfd\`
   - Purpose: Get NFD address info (use depositAccount for transactions)
   - Parameters:
     \`\`\`
     {
       name: string,
       view?: "brief" | "full",
       includeSales?: boolean
     }
     \`\`\`

      ### Important Note for NFD Transactions
      - When retrieving NFD data for NFD Address like emg110.algo, transactions should be targeted to depositAccount and not any other field!
      - Always verify the depositAccount field from the NFD data response for transaction operations.


8. Utility Tools
   - Tool: \`validate_address\`
   - Purpose: Validate Algorand address
   - Parameters: \`{ address: string }\`

   - Tool: \`encode_obj\`
   - Purpose: Encode object to msgpack
   - Parameters: \`{ obj: any }\`

   - Tool: \`decode_obj\`
   - Purpose: Decode msgpack to object
   - Parameters: \`{ bytes: string }\`

   - Tool: \`compile_teal\`
   - Purpose: Compile TEAL program
   - Parameters: \`{ source: string }\`

## Best Practices for Algorand Operations

1. **Transaction Security**
   - Always verify transaction parameters
   - Use suggested parameters from the network
   - Include reasonable fees for timely processing
   - Keep mnemonics and secret keys secure
   - Use proper error handling for transactions

2. **Account Management**
   - Verify account exists before operations
   - Check sufficient balance for operations
   - Verify asset opt-in before transfers
   - Handle account rekey operations carefully
   - Protect sensitive account information

3. **Smart Contract Interactions**
   - Applications are deployed directly to mainnet (exercise caution)
   - Verify application state before operations
   - Use proper argument encoding
   - Handle application state carefully
   - Understand application approval logic

4. **Asset Handling**
   - Verify asset configuration before operations
   - Check decimals for proper amount calculations
   - Always opt-in before receiving assets
   - Verify asset balances before transfers
   - Handle clawback operations carefully

## Complete Workflow Examples for LLM Agents

### Algo Payment Workflow

1. Retrieve wallet information:
   \`\`\`
   use_tool: get_wallet_account
   parameters: {}
   \`\`\`

2. Get sender address from the response.

3. Create payment transaction:
   \`\`\`
   use_tool: create_payment_transaction
   parameters: {
     "from": "[sender_address]",
     "to": "[receiver_address]",
     "amount": 1000000,
     "note": "Payment example"
   }
   \`\`\`

4. Get wallet mnemonic:
   \`\`\`
   use_tool: get_wallet_mnemonic
   parameters: {}
   \`\`\`

5. Sign the transaction:
   \`\`\`
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[transaction_from_step_3]",
     "mnemonic": "[mnemonic_from_step_4]"
   }
   \`\`\`

6. Submit the transaction:
   \`\`\`
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_5]"
   }
   \`\`\`

7. Verify transaction confirmation:
   \`\`\`
   use_tool: api_indexer_lookup_transaction_by_id
   parameters: {
     "txid": "[transaction_id_from_step_6]"
   }
   \`\`\`

### Asset Opt-In Workflow

1. Retrieve wallet information:
   \`\`\`
   use_tool: get_wallet_account
   parameters: {}
   \`\`\`

2. Get user address from the response.

3. Check if already opted in (optional):
   \`\`\`
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[user_address]",
     "assetId": 31566704  // USDC on Algorand Mainnet
   }
   \`\`\`

4. Create asset opt-in transaction:
   \`\`\`
   use_tool: asset_optin
   parameters: {
     "address": "[user_address]",
     "assetID": 31566704  // USDC on Algorand Mainnet
   }
   \`\`\`

5. Sign the transaction:
   \`\`\`
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[transaction_from_step_4]",
     "mnemonic": "[mnemonic_from_step_5]"
   }
   \`\`\`

6. Submit the transaction:
   \`\`\`
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_6]"
   }
   \`\`\`

7. Verify opt-in success:
   \`\`\`
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[user_address]",
     "assetId": 12345
   }
   \`\`\`

### Asset Transfer Workflow

1. Retrieve wallet information:
   \`\`\`
   use_tool: get_wallet_account
   parameters: {}
   \`\`\`

2. Get sender address from the response.

3. Check sender's asset balance:
   \`\`\`
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[sender_address]",
     "assetId": 31566704  // USDC on Algorand Mainnet
   }
   \`\`\`

4. Verify recipient has opted in:
   \`\`\`
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[recipient_address]",
     "assetId": 31566704  // USDC on Algorand Mainnet
   }
   \`\`\`

5. Create asset transfer transaction:
   \`\`\`
   use_tool: transfer_asset
   parameters: {
     "from": "[sender_address]",
     "to": "[recipient_address]",
     "assetID": 31566704,  // USDC on Algorand Mainnet
     "amount": 1000000     // 1 USDC (6 decimals)
   }
   \`\`\`

6. Sign the transaction:
   \`\`\`
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[transaction_from_step_5]",
     "mnemonic": "[mnemonic_from_step_6]"
   }
   \`\`\`

7. Submit the transaction:
   \`\`\`
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_7]"
   }
   \`\`\`

8. Verify transfer success:
   \`\`\`
   use_tool: api_indexer_lookup_transaction_by_id
   parameters: {
     "txid": "[transaction_id_from_step_8]"
   }
   \`\`\`

### USDC Opt-In Example (Mainnet)

1. Retrieve wallet information:
   \`\`\`
   use_tool: get_wallet_account
   parameters: {}
   \`\`\`

2. Get user address from the response.

3. Check if wallet is already opted-in to USDC:
   \`\`\`
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[user_address]",
     "assetId": 31566704  // USDC ASA ID on Algorand Mainnet
   }
   \`\`\`

4. If not opted-in, create USDC opt-in transaction:
   \`\`\`
   use_tool: asset_optin
   parameters: {
     "address": "[user_address]",
     "assetID": 31566704  // USDC ASA ID
   }
   \`\`\`

5. Get wallet mnemonic:
   \`\`\`
   use_tool: get_wallet_mnemonic
   parameters: {}
   \`\`\`

6. Sign the transaction:
   \`\`\`
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[transaction_from_step_4]",
     "mnemonic": "[mnemonic_from_step_5]"
   }
   \`\`\`

7. Submit the transaction:
   \`\`\`
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_6]"
   }
   \`\`\`

8. Verify opt-in success:
   \`\`\`
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[user_address]",
     "assetId": 31566704
   }
   \`\`\`

9. Inform the user that they can now receive USDC on Algorand.

### USDC Transfer Example (Mainnet)

1. Retrieve wallet information:
   \`\`\`
   use_tool: get_wallet_account
   parameters: {}
   \`\`\`

2. Get sender address from the response.

3. Check sender's USDC balance:
   \`\`\`
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[sender_address]",
     "assetId": 31566704  // USDC ASA ID on Algorand Mainnet
   }
   \`\`\`

4. Verify recipient has opted in to USDC:
   \`\`\`
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[recipient_address]",
     "assetId": 31566704
   }
   \`\`\`

5. Create USDC transfer transaction (remember USDC has 6 decimals):
   \`\`\`
   use_tool: transfer_asset
   parameters: {
     "from": "[sender_address]",
     "to": "[recipient_address]",
     "assetID": 31566704,
     "amount": 1000000  // 1 USDC (1,000,000 microUSDC)
   }
   \`\`\`

6. Get wallet mnemonic:
   \`\`\`
   use_tool: get_wallet_mnemonic
   parameters: {}
   \`\`\`

7. Sign the transaction:
   \`\`\`
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[transaction_from_step_5]",
     "mnemonic": "[mnemonic_from_step_6]"
   }
   \`\`\`

8. Submit the transaction:
   \`\`\`
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_7]"
   }
   \`\`\`

9. Verify transfer success:
   \`\`\`
   use_tool: api_indexer_lookup_transaction_by_id
   parameters: {
     "txid": "[transaction_id_from_step_8]"
   }
   \`\`\`

> **Note**: This system is configured for Algorand Mainnet. The examples above use USDC (ASA ID: 31566704). For TestNet testing, you would need to use different asset IDs for test assets. The workflow patterns remain the same, just substitute the appropriate asset ID for your target network.

## Working with Atomic Transactions

1. Transaction Grouping
   - Tool: \`assign_group_id\`
   - Purpose: Group transactions for atomic execution
   - Parameters: \`{ encodedTxns: string[] }\`
   - Effect: All transactions succeed or all fail

2. Atomic Group Creation
   - Tool: \`create_atomic_group\`
   - Purpose: Create multiple transactions as one unit
   - Parameters:
     \`\`\`
     {
       transactions: [
         { type: "payment", params: {...} },
         { type: "asset_transfer", params: {...} },
         ...
       ]
     }
     \`\`\`

3. Submitting Groups
   - Tool: \`send_atomic_group\`
   - Purpose: Sign and submit transaction group
   - Parameters:
     \`\`\`
     {
       encodedTxns: string[],
       mnemonics: string[]
     }
     \`\`\`

## Troubleshooting Session Issues

If operations are not working properly, verify:

1. **Wallet Configuration:**
   - Is wallet information retrievable with wallet tools?
   - Does the \`get_wallet_account\` tool return valid information?
   - If wallet tools return errors, suggest wallet configuration to the user

2. **Network Configuration:**
   - Are ALGORAND_ALGOD and ALGORAND_INDEXER properly set?
   - Are you experiencing network connectivity issues?
   - Is the configured network properly set to Mainnet?

3. **Transaction Issues:**
   - Check minimum balance requirements (0.1A per asset, 0.1A per app)
   - Verify transaction parameters are correct
   - Check for encoding issues in parameters
   - Verify proper signing of transactions

4. **API Issues:**
   - Verify API endpoints are accessible
   - Check for rate limiting issues
   - Ensure proper parameter formats in API calls


## Security Guidelines

⚠️ **MAINNET WARNING**: This system operates on Algorand Mainnet with real assets and real value. Exercise extreme caution with all operations.

1. **Sensitive Data Protection**
   - Never expose mnemonics
   - Never reveal private keys
   - Never display secret keys to users
   - Use securely stored wallet configuration
   - Use Wrangler secrets for sensitive values

2. **Transaction Best Practices**
   - Always verify transaction outputs before submission
   - Double-check recipient addresses (mainnet transactions are irreversible)
   - Check fee structures
   - Use proper atomic grouping for dependent operations
   - Implement proper error handling
   - Use simulation before submitting critical transactions

3. **API Security**
   - Use proper API authorization if possible
   - Handle rate limiting gracefully
   - Don't expose API tokens
   - Implement proper error handling
   - Validate inputs before API calls`
