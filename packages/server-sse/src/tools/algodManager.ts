/**
 * Algod Manager for Algorand Remote MCP
 * Handles interactions with Algorand node (algod) for operations like TEAL compilation and simulation
 */

import algosdk from 'algosdk';
import { z } from 'zod';
import { ResponseProcessor } from '../utils';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env, Props } from '../types';
import { en } from 'zod/v4/locales';

/**
 * Create and validate an Algorand client
 */
function createAlgoClient(algodUrl: string , token:string): algosdk.Algodv2 | null {
  if (!algodUrl) {
    console.error('Algorand node URL not configured');
    return null;
  }
  
  return new algosdk.Algodv2(token, algodUrl, '');
}

/**
 * Register Algod tools to the MCP server
 */
export function registerAlgodTools(server: McpServer,env: Env, props: Props): void {
  // Compile TEAL code
  server.tool(
    'compile_teal',
    'Compile TEAL source code',
    { 
      source: z.string().describe('Logic that executes when the app is called (TEAL source)')
    },
    async ({ source }) => {
      
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
        
        // Ensure proper line endings and add final newline
        let processedSource = source.replace(/\r\n/g, '\n');
        if (!processedSource.endsWith('\n')) {
          processedSource += '\n';
        }
        
        // Convert to Uint8Array
        const sourceBytes = new TextEncoder().encode(processedSource);
        
        // Compile TEAL source
        const response = await algodClient.compile(sourceBytes).do();
        
        return ResponseProcessor.processResponse({
          result: response,
          hash: response.hash,
          result_base64: response.result
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error compiling TEAL: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Disassemble TEAL bytecode
  server.tool(
    'disassemble_teal',
    'Disassemble TEAL bytecode into source code',
    { 
      bytecode: z.string().describe('TEAL bytecode to disassemble (base64-encoded)')
    },
    async ({ bytecode }) => {
      
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
        
        // Decode base64 bytecode if necessary
        const bytecodeBytes = Buffer.from(bytecode, 'base64');
        
        // Disassemble TEAL bytecode
        const response = await algodClient.disassemble(bytecodeBytes).do();
        
        return ResponseProcessor.processResponse({
          result: response.result
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error disassembling TEAL: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Send raw transaction
  server.tool(
    'send_raw_transaction',
    'Submit signed transactions to the Algorand network',
    { 
      signedTxns: z.array(z.string()).describe('Array of base64-encoded signed transactions')
    },
    async ({ signedTxns }) => {

      
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
        
        // Decode base64 transactions
        const txnsBytes = signedTxns.map(txn => Buffer.from(txn, 'base64'));
        
        // Send transactions
        const response = await algodClient.sendRawTransaction(txnsBytes).do();
        
        return ResponseProcessor.processResponse({
          txId: response.txId
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error sending transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Simulate raw transactions
  server.tool(
    'simulate_raw_transactions',
    'Simulate raw transactions',
    { 
      txns: z.array(z.string()).describe('Array of base64-encoded transactions to simulate')
    },
    async ({ txns }) => {

      
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
        
        // Decode base64 transactions
        const txnsBytes = txns.map(txn => Buffer.from(txn, 'base64'));
        
        // Simulate transactions
        const response = await algodClient.simulateRawTransactions(txnsBytes).do();
        
        return ResponseProcessor.processResponse({
          result: response
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error simulating transactions: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Simplified simulation tool for encoded transactions
  server.tool(
    'simulate_transactions',
    'Simulate encoded transactions',
    { 
      encodedTxns: z.array(z.string()).describe('Array of base64-encoded transactions to simulate'),
      options: z.object({
        allowEmptySignatures: z.boolean().optional().describe('Allow transactions without signatures'),
        allowMoreLogging: z.boolean().optional().describe('Enable additional logging during simulation')
      }).optional().describe('Simulation options')
    },
    async ({ encodedTxns, options }) => {
      
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
        
        // Decode base64 transactions
        const txnsBytes = encodedTxns.map(txn => Buffer.from(txn, 'base64'));
        
        // Use raw transaction simulation which doesn't require complex object types
        // and is more compatible with the worker environment
        const response = await algodClient.simulateRawTransactions(txnsBytes).do();
        
        return ResponseProcessor.processResponse({
          result: response
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error simulating transactions: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
