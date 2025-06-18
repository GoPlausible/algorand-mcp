/**
 * Group Transaction Manager for Algorand Remote MCP
 * Handles transaction groups and atomic operations
 */

import algosdk from 'algosdk';
import { z } from 'zod';
import { ResponseProcessor } from '../../utils';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env, Props } from '../../types';
/**
 * Register group transaction tools to the MCP server
 */
export function registerGroupTransactionTools(server: McpServer,env: Env, props: Props): void {
  // Assign group ID to transactions
  server.tool(
    'assign_group_id',
    'Assign a group ID to a set of transactions for atomic execution',
    { 
      encodedTxns: z.array(z.string()).describe('Array of base64-encoded unsigned transactions')
    },
    async ({ encodedTxns }) => {
      try {
        // Decode transactions
        const decodedTxns = encodedTxns.map(txn => {
          return algosdk.decodeUnsignedTransaction(
            Buffer.from(txn, 'base64')
          );
        });
        
        // Assign group ID
        const txnGroup = algosdk.assignGroupID(decodedTxns);
        
        // Re-encode transactions with group ID
        const groupedTxns = txnGroup.map(txn => 
          Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64')
        );
        
        // Return the transactions with group IDs
        return ResponseProcessor.processResponse({
          groupId: Buffer.from(decodedTxns[0].group!).toString('base64'),
          groupedTxns
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error assigning group ID: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Create atomic transaction group
  server.tool(
    'create_atomic_group',
    'Create an atomic transaction group from multiple transactions',
    {
      transactions: z.array(z.object({
        type: z.enum(['payment', 'asset_transfer', 'asset_config', 'app_call']).describe('Transaction type'),
        params: z.any().describe('Transaction-specific parameters')
      })).describe('Array of transaction specifications')
    },
    async ({ transactions }) => {
      try {
        // This is a placeholder for creating multiple transactions
        // In a real implementation, we'd create all transactions of different types
        // and then assign them a group ID
        
        return ResponseProcessor.processResponse({
          message: "Atomic transaction group tool is not fully implemented yet.",
          txCount: transactions.length,
          tip: "Use individual transaction creation tools followed by assign_group_id for now."
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating atomic transaction group: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Atomic transaction sending helper
  server.tool(
    'send_atomic_group',
    'Sign and submit an atomic transaction group in one operation',
    {
      encodedTxns: z.array(z.string()).describe('Array of base64-encoded unsigned transactions'),
      mnemonics: z.array(z.string()).describe('Array of mnemonics for signing transactions')
    },
    async ({ encodedTxns, mnemonics }) => {
      try {
        if (encodedTxns.length !== mnemonics.length) {
          throw new Error('Number of transactions must match number of mnemonics.');
        }
        
        // Decode transactions
        const decodedTxns = encodedTxns.map(txn => {
          return algosdk.decodeUnsignedTransaction(
            Buffer.from(txn, 'base64')
          );
        });
        
        // Assign group ID if not already assigned
        let groupedTxns;
        if (!decodedTxns[0].group) {
          groupedTxns = algosdk.assignGroupID(decodedTxns);
        } else {
          groupedTxns = decodedTxns;
        }
        
        // Sign each transaction with corresponding mnemonic
        const signedTxns = groupedTxns.map((txn, i) => {
          const account = algosdk.mnemonicToSecretKey(mnemonics[i]);
          return txn.signTxn(account.sk);
        });
        
        // Return the signed transactions
        return ResponseProcessor.processResponse({
          signedTxns: signedTxns.map(stxn => Buffer.from(stxn).toString('base64'))
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error processing atomic transaction group: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
