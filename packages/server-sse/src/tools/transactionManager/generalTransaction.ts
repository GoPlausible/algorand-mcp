/**
 * General Transaction Manager for Algorand Remote MCP
 * Handles payment transaction operations on the Algorand blockchain
 */

import algosdk from 'algosdk';
import { z } from 'zod';
import { ResponseProcessor } from '../../utils';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env } from '../../types';

/**
 * Create and validate an Algorand client
 */
function createAlgoClient(algodUrl: string | undefined): algosdk.Algodv2 | null {
  if (!algodUrl) {
    console.error('Algorand node URL not configured');
    return null;
  }
  
  return new algosdk.Algodv2('', algodUrl, '');
}

/**
 * Register general transaction management tools to the MCP server
 */
export function registerGeneralTransactionTools(server: McpServer): void {
  // Create payment transaction tool
  server.tool(
    'create_payment_transaction',
    'Create a payment transaction on Algorand',
    { 
      from: z.string().describe('Sender address'),
      to: z.string().describe('Receiver address'),
      amount: z.number().describe('Amount in microAlgos'),
      note: z.string().optional().describe('Optional transaction note')
    },
    async ({ from, to, amount, note }, extra) => {
      const env = extra as unknown as Env;
      
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
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD);
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Create payment transaction
        let noteBytes: Uint8Array | undefined;
        if (note) {
          const encoder = new TextEncoder();
          noteBytes = encoder.encode(note);
        }
        
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from,
          to,
          amount,
          note: noteBytes,
          suggestedParams: params
        });
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            from,
            to,
            amount,
            fee: params.fee,
            firstRound: params.firstRound,
            lastRound: params.lastRound
          }
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Sign transaction with mnemonic
  server.tool(
    'sign_transaction',
    'Sign an Algorand transaction with a mnemonic',
    { 
      encodedTxn: z.string().describe('Base64 encoded transaction'),
      mnemonic: z.string().describe('Account mnemonic')
    },
    async ({ encodedTxn, mnemonic }) => {
      try {
        // Decode transaction
        const txn = algosdk.decodeUnsignedTransaction(Buffer.from(encodedTxn, 'base64'));
        
        // Get secret key from mnemonic
        const account = algosdk.mnemonicToSecretKey(mnemonic);
        
        // Sign transaction
        const signedTxn = txn.signTxn(account.sk);
        
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          signedTxn: Buffer.from(signedTxn).toString('base64')
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error signing transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Submit signed transaction
  server.tool(
    'submit_transaction',
    'Submit a signed transaction to the Algorand network',
    { signedTxn: z.string().describe('Base64 encoded signed transaction') },
    async ({ signedTxn }, extra) => {
      const env = extra as unknown as Env;
      
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
        const algodClient = createAlgoClient(env.ALGORAND_ALGOD);
        if (!algodClient) {
          throw new Error('Failed to create Algorand client');
        }
        
        // Decode and submit transaction
        const decodedTxn = Buffer.from(signedTxn, 'base64');
        const response = await algodClient.sendRawTransaction(decodedTxn).do();
        
        // Wait for confirmation
        const confirmedTxn = await algosdk.waitForConfirmation(algodClient, response.txId, 4);
        
        return ResponseProcessor.processResponse({
          confirmed: true,
          txID: response.txId,
          confirmedRound: confirmedTxn['confirmed-round'],
          txnResult: confirmedTxn
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error submitting transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
