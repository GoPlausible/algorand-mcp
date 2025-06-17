/**
 * Indexer Account API Tools
 * Direct access to Algorand indexer account data
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
 * Register indexer account API tools to the MCP server
 */
export function registerIndexerAccountTools(server: McpServer,env: Env): void {
  // Lookup account by ID
  server.tool(
    'api_indexer_lookup_account_by_id',
    'Get account information from indexer',
    { 
      address: z.string().describe('Account address')
    },
    async ({ address }) => {
      
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
        
        // Lookup account by ID
        const response = await indexerClient.lookupAccountByID(String(address)).do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up account: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Lookup account assets
  server.tool(
    'api_indexer_lookup_account_assets',
    'Get account assets',
    { 
      address: z.string().describe('Account address'),
      limit: z.number().int().optional().describe('Maximum number of assets to return'),
      assetId: z.number().int().optional().describe('Filter by asset ID'),
      nextToken: z.string().optional().describe('Token for retrieving the next page of results')
    },
    async ({ address, limit, assetId, nextToken }) => {
      
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
        let search = indexerClient.lookupAccountAssets(String(address));
        
        if (limit) {
          search = search.limit(Number(limit));
        }
        if (assetId) {
          search = search.assetId(Number(assetId));
        }
        if (nextToken) {
          search = search.nextToken(String(nextToken));
        }
        
        // Execute lookup
        const response = await search.do();
        
        // Format response to only return the assets array
        return ResponseProcessor.processResponse({
          assets: response.assets || []
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up account assets: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Lookup account app local states
  server.tool(
    'api_indexer_lookup_account_app_local_states',
    'Get account application local states',
    { 
      address: z.string().describe('Account address')
    },
    async ({ address }) => {
      
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
        
        // Lookup account app local states
        const response = await indexerClient.lookupAccountAppLocalStates(String(address)).do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up account app local states: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Lookup account created applications
  server.tool(
    'api_indexer_lookup_account_created_applications',
    'Get applications created by this account',
    { 
      address: z.string().describe('Account address')
    },
    async ({ address }) => {
      
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
        
        // Lookup account created applications
        const response = await indexerClient.lookupAccountCreatedApplications(String(address)).do();
        
        // Format response to only return the applications array
        return ResponseProcessor.processResponse({
          applications: response.applications || []
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up account created applications: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Search for accounts
  server.tool(
    'api_indexer_search_for_accounts',
    'Search for accounts with various criteria',
    {
      limit: z.number().int().optional().describe('Maximum number of accounts to return'),
      assetId: z.number().int().optional().describe('Filter by asset ID'),
      applicationId: z.number().int().optional().describe('Filter by application ID'),
      currencyGreaterThan: z.number().int().optional().describe('Filter by minimum balance'),
      currencyLessThan: z.number().int().optional().describe('Filter by maximum balance'),
      nextToken: z.string().optional().describe('Token for retrieving the next page of results')
    },
    async ({ limit, assetId, applicationId, currencyGreaterThan, currencyLessThan, nextToken }) => {
      
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
        let search = indexerClient.searchAccounts();
        
        if (limit) {
          search = search.limit(Number(limit));
        }
        if (assetId) {
          search = search.assetID(Number(assetId));
        }
        if (applicationId) {
          search = search.applicationID(Number(applicationId));
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
        
        // Execute search
        const response = await search.do();
        
        // Format response to only return the accounts array
        return ResponseProcessor.processResponse({
          accounts: response.accounts || []
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error searching accounts: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
