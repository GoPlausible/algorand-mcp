/**
 * Asset Transaction Manager for Algorand Remote MCP
 * Handles asset-related transaction operations on the Algorand blockchain
 */

import algosdk from 'algosdk';
import { z } from 'zod';
import { ResponseProcessor } from '../../utils';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env, Props } from '../../types';

/**
 * Create and validate an Algorand client
 */
function createAlgoClient(algodUrl: string, token: string): algosdk.Algodv2 | null {
  if (!algodUrl) {
    console.error('Algorand node URL not configured');
    return null;
  }
  
  return new algosdk.Algodv2(token, algodUrl, '');
}

/**
 * Register asset transaction management tools to the MCP server
 */
export function registerAssetTransactionTools(server: McpServer,env: Env, props: Props): void {
  // Create a new Algorand Standard Asset (ASA)
  server.tool(
    'create_asset',
    'Create a new Algorand Standard Asset (ASA)',
    { 
      creator: z.string().describe('Creator address'),
      name: z.string().describe('Asset name'),
      unitName: z.string().describe('Unit name (ticker)'),
      totalSupply: z.number().describe('Total supply'),
      decimals: z.number().min(0).max(19).default(0).describe('Decimal precision (0-19)'),
      defaultFrozen: z.boolean().default(false).describe('Whether accounts are frozen by default'),
      url: z.string().optional().describe('URL for asset information'),
      metadataHash: z.string().optional().describe('Metadata hash (32-byte string)'),
      manager: z.string().optional().describe('Manager address'),
      reserve: z.string().optional().describe('Reserve address'),
      freeze: z.string().optional().describe('Freeze address'),
      clawback: z.string().optional().describe('Clawback address'),
      note: z.string().optional().describe('Optional transaction note')
    },
    async ({ creator, name, unitName, totalSupply, decimals, defaultFrozen, 
            url, metadataHash, manager, reserve, freeze, clawback, note }) => {
      
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
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Process optional note
        let noteBytes: Uint8Array | undefined;
        if (note) {
          const encoder = new TextEncoder();
          noteBytes = encoder.encode(note);
        }
        
        // Process optional metadataHash
        let metadataHashBytes: Uint8Array | undefined;
        if (metadataHash) {
          try {
            metadataHashBytes = new Uint8Array(Buffer.from(metadataHash, 'base64'));
          } catch (error) {
            throw new Error('Invalid metadataHash format. Expected base64 encoded string.');
          }
        }
        
        // Create asset creation transaction
        const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
          from: creator,
          total: totalSupply,
          decimals,
          defaultFrozen,
          assetName: name,
          unitName,
          assetURL: url,
          assetMetadataHash: metadataHashBytes,
          manager,
          reserve,
          freeze,
          clawback,
          suggestedParams: params,
          note: noteBytes
        });
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            type: 'asset-create',
            creator,
            assetName: name,
            unitName,
            totalSupply,
            decimals,
            fee: params.fee,
            firstRound: params.firstRound,
            lastRound: params.lastRound
          }
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating asset transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Opt-in to an asset
  server.tool(
    'asset_optin',
    'Opt-in to an Algorand Standard Asset (ASA)',
    { 
      address: z.string().describe('Account address to opt-in'),
      assetID: z.number().describe('Asset ID to opt-in to'),
      note: z.string().optional().describe('Optional transaction note')
    },
    async ({ address, assetID, note }) => {
      
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
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Process optional note
        let noteBytes: Uint8Array | undefined;
        if (note) {
          const encoder = new TextEncoder();
          noteBytes = encoder.encode(note);
        }
        
        // Create asset opt-in transaction
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: address,
          to: address, // For opt-in, to and from are the same
          amount: 0, // For opt-in, amount is 0
          assetIndex: assetID,
          suggestedParams: params,
          note: noteBytes
        });
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            type: 'asset-optin',
            address,
            assetID,
            fee: params.fee,
            firstRound: params.firstRound,
            lastRound: params.lastRound
          }
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error creating asset opt-in transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Transfer asset
  server.tool(
    'transfer_asset',
    'Transfer an Algorand Standard Asset (ASA)',
    { 
      from: z.string().describe('Sender address'),
      to: z.string().describe('Receiver address'),
      assetID: z.number().describe('Asset ID to transfer'),
      amount: z.number().describe('Amount of asset to transfer'),
      note: z.string().optional().describe('Optional transaction note')
    },
    async ({ from, to, assetID, amount, note }) => {
      
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
        
        // Get suggested transaction parameters
        const params = await algodClient.getTransactionParams().do();
        
        // Process optional note
        let noteBytes: Uint8Array | undefined;
        if (note) {
          const encoder = new TextEncoder();
          noteBytes = encoder.encode(note);
        }
        
        // Create asset transfer transaction
        const txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from,
          to,
          amount,
          assetIndex: assetID,
          suggestedParams: params,
          note: noteBytes
        });
        
        // Return the encoded transaction
        return ResponseProcessor.processResponse({
          txID: txn.txID(),
          encodedTxn: Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString('base64'),
          txnInfo: {
            type: 'asset-transfer',
            from,
            to,
            assetID,
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
            text: `Error creating asset transfer transaction: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
