/**
 * Algod Transaction API Tools
 * Direct access to Algorand node transaction data
 */

import algosdk from 'algosdk';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ResponseProcessor } from '../../../utils';
import { Env } from '../../../types';

/**
 * Create and validate an Algorand client
 */
function createAlgoClient(algodUrl: string, token:string): algosdk.Algodv2 | null {
  if (!algodUrl) {
    console.error('Algorand node URL not configured');
    return null;
  }
  
  return new algosdk.Algodv2(token, algodUrl, '');
}

/**
 * Register transaction API tools to the MCP server
 */
export function registerTransactionApiTools(server: McpServer,env: Env): void {
  // Get transaction information by ID
  server.tool(
    'api_algod_get_transaction_info',
    'Get transaction details from algod by transaction ID',
    { 
      txid: z.string().describe('The transaction ID')
    },
    async ({ txid }) => {

      
      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }
      
      try {
        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD, env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Get transaction information
        const response = await algodClient.pendingTransactionInformation(String(txid)).do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting transaction info: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get pending transactions
  server.tool(
    'api_algod_get_pending_transactions',
    'Get pending transactions from algod mempool',
    {
      maxResults: z.number().int().min(1).max(1000).default(50).describe('Maximum number of transactions to return')
    },
    async ({ maxResults }) => {
      
      if (!env.ALGORAND_ALGOD) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand node URL not configured'
          }]
        };
      }
      
      try {
        // Create algod client
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD, env.ALGORAND_TOKEN || '');
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Get pending transactions
        const response = await algodClient.pendingTransactionsInformation().max(Number(maxResults)).do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting pending transactions: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Note: Transaction proofs are available in newer versions of algosdk but not in the current version
}
