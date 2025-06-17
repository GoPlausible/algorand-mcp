export const guide = `# Algorand Remote MCP Guide for Agents

## 🚨 CRITICAL: FIRST STEPS FOR EVERY NEW SESSION

⚠️ **AGENTS MUST PERFORM THESE ACTIONS AT THE START OF EACH SESSION WITH ALGORAND-REMOTE-MCP:**

**Check Wallet Configuration:**
   - Resource: \`algorand://wallet/account\`
   - Purpose: Verify wallet exists and is correctly configured
   - Action Required: Access this resource FIRST in EVERY session
   - If wallet exists: Proceed to check available resources
   - If no wallet or error response:
     * Check if ALGORAND_AGENT_WALLET is properly set in environment
     * Inform user to add wallet mnemonic via Wrangler secret:
       \`\`\`
       npx wrangler secret put ALGORAND_AGENT_WALLET
       \`\`\`
     * Wait for user to confirm environment is updated
     * Access wallet resource again to verify

⚠️ **ALWAYS verify wallet configuration at the start of EVERY session before attempting any blockchain operations!**

## 📋 Session Workflow Quick Reference

| Step | Action | Tool/Resource | Purpose |
|------|--------|---------------|---------|
| 1 | Check wallet | \`algorand://wallet/account\` | Verify wallet configuration |
| 2 | Verify resources | Knowledge resources | Check knowledge availability |
| 3 | Explore APIs | Get API documentation | Understand available actions |
| 4 | Create transactions | Transaction tools | Prepare blockchain operations |
| 5 | Sign transactions | \`sign_transaction\` | Authorize operations |
| 6 | Submit transactions | \`submit_transaction\` | Execute on blockchain |
| 7 | Verify results | API query tools | Confirm operation success |

## Quick Start for LLM Agents

As an LLM agent, here's how to quickly perform basic Algorand operations using direct tool invocation pattern:

### Minimal Working Example - Send Payment

1. First, check the wallet configuration:
   ```
   access_resource: algorand://wallet/account
   ```

2. If wallet exists, create a payment transaction:
   ```
   use_tool: create_payment_transaction
   parameters: {
     "from": "sender_address",
     "to": "receiver_address",
     "amount": 1000000
   }
   ```

3. Sign the transaction:
   ```
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[encoded_transaction_from_step_2]",
     "mnemonic": "[wallet_mnemonic]" 
   }
   ```

4. Submit the transaction:
   ```
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_3]"
   }
   ```

5. Verify the result:
   ```
   use_tool: api_algod_get_transaction_info
   parameters: {
     "txid": "[transaction_id_from_step_4]"
   }
   ```

### Common Error Messages and Solutions

| Error Message | Likely Cause | Solution |
|---------------|--------------|----------|
| `No active wallet mnemonic configured` | Missing ALGORAND_AGENT_WALLET | Inform user to configure secret via `npx wrangler secret put ALGORAND_AGENT_WALLET` |
| `Error fetching account info` | Network connection or invalid address | Check ALGORAND_ALGOD setting and address format |
| `Transaction would result in negative balance` | Insufficient funds | Ensure sender has enough ALGOs (remember min balance requirements) |
| `Asset hasn't been opted in` | Asset not in receiver's account | Receiver must opt in to asset first |
| `Cannot access knowledge resources` | R2 bucket misconfiguration | Verify R2 bucket setup and permissions |
| `Overspend` | Transaction fee + amount exceeds balance | Reduce amount or add funds to account |

## Understanding Resource Types

1. Wallet Resources
   - Type: User account data
   - Examples: Wallet Account, Wallet Address
   - Purpose: Access account information
   - Note: Requires proper wallet configuration

2. Knowledge Resources
   - Type: Documentation and specifications
   - Examples: ARCs, SDKs, Developer Documentation
   - Purpose: Understand blockchain capabilities
   - Note: Requires proper R2 bucket configuration

3. API Resources
   - Type: Blockchain interaction endpoints
   - Examples: Algod, Indexer
   - Purpose: Query blockchain state
   - Note: Requires proper API endpoint configuration

## Available Resources & Tools

1. Core Wallet Resources
   - Resource: \`algorand://wallet/account\`
   - Purpose: Get current wallet account information
   - Returns: Account address, balance, assets

   - Resource: \`algorand://wallet/assets\`
   - Purpose: Get assets held by the wallet
   - Returns: List of ASAs in wallet

   - Resource: \`algorand://wallet/address\`
   - Purpose: Get wallet address
   - Returns: Algorand account address

   - Resource: \`algorand://wallet/publickey\`
   - Purpose: Get wallet public key
   - Returns: Public key for wallet

   - Resource: \`algorand://wallet/secretkey\`
   - Purpose: Get wallet secret key
   - Returns: Secret key for wallet (sensitive!)

   - Resource: \`algorand://wallet/mnemonic\`
   - Purpose: Get wallet mnemonic
   - Returns: Mnemonic phrase (sensitive!)

2. Knowledge Resources
   - Resource: \`algorand://knowledge/taxonomy\`
   - Purpose: Get full knowledge taxonomy
   - Returns: Complete documentation structure

   - Resource: \`algorand://knowledge/taxonomy/{category}\`
   - Purpose: Get category-specific knowledge
   - Returns: Documentation for specific category
   - Example Categories:
     * \`arcs\` - Algorand Request for Comments
     * \`sdks\` - Software Development Kits
     * \`algokit\` - AlgoKit
     * \`tealscript\` - TEALScript
     * \`puya\` - Puya
     * \`liquid-auth\` - Liquid Auth
     * \`python\` - Python Development
     * \`developers\` - Developer Documentation
     * \`clis\` - CLI Tools
     * \`nodes\` - Node Management

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
   - Purpose: Get NFD domain info
   - Parameters:
     \`\`\`
     {
       name: string,
       view?: "brief" | "full",
       includeSales?: boolean
     }
     \`\`\`

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
   - Test applications before mainnet deployment
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

1. Check wallet configuration:
   ```
   access_resource: algorand://wallet/account
   ```

2. Get sender address from the response.

3. Create payment transaction:
   ```
   use_tool: create_payment_transaction
   parameters: {
     "from": "[sender_address]",
     "to": "[receiver_address]",
     "amount": 1000000,
     "note": "Payment example"
   }
   ```

4. Sign the transaction:
   ```
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[transaction_from_step_3]",
     "mnemonic": "[wallet_mnemonic]"
   }
   ```

5. Submit the transaction:
   ```
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_4]"
   }
   ```

6. Verify transaction confirmation:
   ```
   use_tool: api_indexer_lookup_transaction_by_id
   parameters: {
     "txid": "[transaction_id_from_step_5]"
   }
   ```

### Asset Opt-In Workflow

1. Check wallet configuration:
   ```
   access_resource: algorand://wallet/account
   ```

2. Get user address from the response.

3. Check if already opted in (optional):
   ```
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[user_address]",
     "assetId": 12345
   }
   ```

4. Create asset opt-in transaction:
   ```
   use_tool: asset_optin
   parameters: {
     "address": "[user_address]",
     "assetID": 12345
   }
   ```

5. Sign the transaction:
   ```
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[transaction_from_step_4]",
     "mnemonic": "[wallet_mnemonic]"
   }
   ```

6. Submit the transaction:
   ```
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_5]"
   }
   ```

7. Verify opt-in success:
   ```
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[user_address]",
     "assetId": 12345
   }
   ```

### Asset Transfer Workflow

1. Check wallet configuration:
   ```
   access_resource: algorand://wallet/account
   ```

2. Get sender address from the response.

3. Check sender's asset balance:
   ```
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[sender_address]",
     "assetId": 12345
   }
   ```

4. Verify recipient has opted in:
   ```
   use_tool: api_algod_get_account_asset_info
   parameters: {
     "address": "[recipient_address]",
     "assetId": 12345
   }
   ```

5. Create asset transfer transaction:
   ```
   use_tool: transfer_asset
   parameters: {
     "from": "[sender_address]",
     "to": "[recipient_address]",
     "assetID": 12345,
     "amount": 1
   }
   ```

6. Sign the transaction:
   ```
   use_tool: sign_transaction
   parameters: {
     "encodedTxn": "[transaction_from_step_5]",
     "mnemonic": "[wallet_mnemonic]"
   }
   ```

7. Submit the transaction:
   ```
   use_tool: submit_transaction
   parameters: {
     "signedTxn": "[signed_transaction_from_step_6]"
   }
   ```

8. Verify transfer success:
   ```
   use_tool: api_indexer_lookup_transaction_by_id
   parameters: {
     "txid": "[transaction_id_from_step_7]"
   }
   ```

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
   - Is ALGORAND_AGENT_WALLET correctly set as a secret?
   - Can you access wallet resources successfully?
   - Are you getting proper wallet information responses?

2. **Network Configuration:**
   - Are ALGORAND_ALGOD and ALGORAND_INDEXER properly set?
   - Are you experiencing network connectivity issues?
   - Is the configured network (testnet/mainnet) correct?

3. **Transaction Issues:**
   - Check minimum balance requirements (0.1A per asset, 0.1A per app)
   - Verify transaction parameters are correct
   - Check for encoding issues in parameters
   - Verify proper signing of transactions

4. **Resource Access Issues:**
   - Check R2 bucket configuration for knowledge resources
   - Verify API endpoints are accessible
   - Check for rate limiting issues
   - Verify proper URL formatting for resources

## Security Guidelines

1. **Sensitive Data Protection**
   - Never expose mnemonics
   - Never reveal private keys
   - Never display secret keys to users
   - Use securely stored wallet configuration
   - Use Wrangler secrets for sensitive values

2. **Transaction Best Practices**
   - Always verify transaction outputs
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
