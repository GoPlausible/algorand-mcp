/**
 * Indexer Asset API Tools
 * Direct access to Algorand indexer asset data
 */

import algosdk from 'algosdk';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ResponseProcessor } from '../../../utils';
import { Env } from '../../../types';

/**
 * Create and validate an Indexer client
 */
function createIndexerClient(indexerUrl: string | undefined): algosdk.Indexer | null {
  if (!indexerUrl) {
    console.error('Algorand indexer URL not configured');
    return null;
  }
  
  return new algosdk.Indexer('', indexerUrl, '');
}

/**
 * Register indexer asset API tools to the MCP server
 */
export function registerIndexerAssetTools(server: McpServer,env: Env): void {
  // Lookup asset by ID
  server.tool(
    'api_indexer_lookup_asset_by_id',
    'Get asset information from indexer',
    { 
      assetId: z.number().int().describe('Asset ID')
    },
    async ({ assetId }) => {
      
      if (!env.ALGORAND_INDEXER) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand indexer URL not configured'
          }]
        };
      }
      
      try {
        // Create indexer client
        const indexerClient = createIndexerClient(env.ALGORAND_INDEXER);
        if (!indexerClient) {
          throw new Error('Failed to create Algorand indexer client');
        }
        
        // Lookup asset by ID
        const response = await indexerClient.lookupAssetByID(Number(assetId)).do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up asset: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Lookup asset balances
  server.tool(
    'api_indexer_lookup_asset_balances',
    'Get accounts that hold a specific asset',
    { 
      assetId: z.number().int().describe('Asset ID'),
      limit: z.number().int().optional().describe('Maximum number of accounts to return'),
      currencyGreaterThan: z.number().int().optional().describe('Filter by minimum balance'),
      currencyLessThan: z.number().int().optional().describe('Filter by maximum balance'),
      nextToken: z.string().optional().describe('Token for retrieving the next page of results')
    },
    async ({ assetId, limit, currencyGreaterThan, currencyLessThan, nextToken }) => {
      
      if (!env.ALGORAND_INDEXER) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand indexer URL not configured'
          }]
        };
      }
      
      try {
        // Create indexer client
        const indexerClient = createIndexerClient(env.ALGORAND_INDEXER);
        if (!indexerClient) {
          throw new Error('Failed to create Algorand indexer client');
        }
        
        // Setup lookup with parameters
        let search = indexerClient.lookupAssetBalances(Number(assetId));
        
        if (limit) {
          search = search.limit(Number(limit));
        }
        if (currencyGreaterThan) {
          search = search.currencyGreaterThan(Number(currencyGreaterThan));
        }
        if (currencyLessThan) {
          search = search.currencyLessThan(Number(currencyLessThan));
        }
        if (nextToken) {
          search = search.nextToken(String(nextToken));
        }
        
        // Execute lookup
        const response = await search.do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up asset balances: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Search for assets
  server.tool(
    'api_indexer_search_for_assets',
    'Search for assets with various criteria',
    {
      name: z.string().optional().describe('Filter by asset name'),
      unit: z.string().optional().describe('Filter by asset unit name'),
      creator: z.string().optional().describe('Filter by creator address'),
      limit: z.number().int().optional().describe('Maximum number of assets to return'),
      nextToken: z.string().optional().describe('Token for retrieving the next page of results')
    },
    async ({ name, unit, creator, limit, nextToken }) => {
      
      if (!env.ALGORAND_INDEXER) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand indexer URL not configured'
          }]
        };
      }
      
      try {
        // Create indexer client
        const indexerClient = createIndexerClient(env.ALGORAND_INDEXER);
        if (!indexerClient) {
          throw new Error('Failed to create Algorand indexer client');
        }
        
        // Setup search with parameters
        let search = indexerClient.searchForAssets();
        
        if (name) {
          search = search.name(String(name));
        }
        if (unit) {
          search = search.unit(String(unit));
        }
        if (creator) {
          search = search.creator(String(creator));
        }
        if (limit) {
          search = search.limit(Number(limit));
        }
        if (nextToken) {
          search = search.nextToken(String(nextToken));
        }
        
        // Execute search
        const response = await search.do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error searching assets: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
