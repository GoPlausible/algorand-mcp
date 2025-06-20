/**
 * Algod Asset API Tools
 * Direct access to Algorand node asset data
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
 * Register asset API tools to the MCP server
 */
export function registerAssetApiTools(server: McpServer,env: Env): void {
  // Get asset information
  server.tool(
    'api_algod_get_asset_info',
    'Get asset details from algod',
    { 
      assetId: z.number().int().describe('The asset ID')
    },
    async ({ assetId }) => {
      
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
        
        // Get asset information
        const response = await algodClient.getAssetByID(Number(assetId)).do();
        
        // Format the response to include more readable asset information
        const assetParams = response.params;
        const formattedResponse = {
          ...response,
          readableParams: {
            name: assetParams.name,
            unitName: assetParams['unit-name'],
            total: assetParams.total,
            decimals: assetParams.decimals,
            defaultFrozen: assetParams['default-frozen'],
            creator: assetParams.creator,
            manager: assetParams.manager,
            reserve: assetParams.reserve,
            freeze: assetParams.freeze,
            clawback: assetParams.clawback,
            url: assetParams.url ? Buffer.from(assetParams.url).toString() : undefined,
            metadataHash: assetParams['metadata-hash'] 
              ? Buffer.from(assetParams['metadata-hash']).toString('hex') 
              : undefined
          }
        };
        
        return ResponseProcessor.processResponse(formattedResponse);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting asset info: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get asset holding information
  server.tool(
    'api_algod_get_asset_holding',
    'Get asset holding information for an account',
    { 
      address: z.string().describe('Account address'),
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
        
        // Validate address
        if (!algosdk.isValidAddress(address)) {
          throw new Error('Invalid Algorand address');
        }
        
        // Get asset holding information
        const accountInfo = await algodClient.accountInformation(String(address)).do();
        const assets = accountInfo.assets || [];
        
        // Find the specific asset
        const assetInfo = assets.find((asset: any) => asset['asset-id'] === assetId);
        
        if (!assetInfo) {
          return {
            content: [{
              type: 'text',
              text: `Account ${address} does not hold asset ${assetId}`
            }]
          };
        }
        
        const formattedResponse = {
          address,
          assetId,
          amount: assetInfo.amount,
          isFrozen: assetInfo['is-frozen'],
          optedIn: true
        };
        
        return ResponseProcessor.processResponse(formattedResponse);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting asset holding: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
