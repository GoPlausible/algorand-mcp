/**
 * Algod Account API Tools
 * Direct access to Algorand node account data
 */

import algosdk from 'algosdk';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ResponseProcessor } from '../../../utils';
import { Env } from '../../../types';

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
 * Register account API tools to the MCP server
 */
export function registerAccountApiTools(server: McpServer,env: Env): void {
  // Get account information
  server.tool(
    'api_algod_get_account_info',
    'Get current account balance, assets, and auth address from algod',
    { 
      address: z.string().describe('The account public key')
    },
    async ({ address }) => {
      
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
        
        // Validate address format
        if (!algosdk.isValidAddress(address)) {
          throw new Error('Invalid Algorand address format');
        }
        
        // Get account information
        const response = await algodClient.accountInformation(String(address)).do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting account info: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get account application information
  server.tool(
    'api_algod_get_account_application_info',
    'Get account-specific application information from algod',
    { 
      address: z.string().describe('The account public key'),
      appId: z.number().int().describe('The application ID')
    },
    async ({ address, appId }) => {
      
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
        
        // Validate address format
        if (!algosdk.isValidAddress(address)) {
          throw new Error('Invalid Algorand address format');
        }
        
        // Get account application information
        const response = await algodClient.accountApplicationInformation(String(address), Number(appId)).do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting account application info: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get account asset information
  server.tool(
    'api_algod_get_account_asset_info',
    'Get account-specific asset information from algod',
    { 
      address: z.string().describe('The account public key'),
      assetId: z.number().int().describe('The asset ID')
    },
    async ({ address, assetId }) => {
      
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
        
        // Validate address format
        if (!algosdk.isValidAddress(address)) {
          throw new Error('Invalid Algorand address format');
        }
        
        // Get account asset information
        const response = await algodClient.accountAssetInformation(String(address), Number(assetId)).do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting account asset info: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
