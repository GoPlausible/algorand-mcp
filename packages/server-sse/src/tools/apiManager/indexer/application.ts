/**
 * Indexer Application API Tools
 * Direct access to Algorand indexer application data
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
 * Register indexer application API tools to the MCP server
 */
export function registerIndexerApplicationTools(server: McpServer,env: Env): void {
  // Lookup applications
  server.tool(
    'api_indexer_lookup_applications',
    'Get application information from indexer',
    { 
      appId: z.number().int().describe('Application ID')
    },
    async ({ appId }) => {
      
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
        
        // Lookup application by ID
        const response = await indexerClient.lookupApplications(Number(appId)).do();
        
        // Return just the application object (not the whole response)
        return ResponseProcessor.processResponse({
          application: response.application || {}
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up application: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Lookup application logs
  server.tool(
    'api_indexer_lookup_application_logs',
    'Get application log messages',
    { 
      appId: z.number().int().describe('Application ID'),
      limit: z.number().int().optional().describe('Maximum number of logs to return'),
      minRound: z.number().int().optional().describe('Only return logs after this round'),
      maxRound: z.number().int().optional().describe('Only return logs before this round'),
      txid: z.string().optional().describe('Filter by transaction ID'),
      sender: z.string().optional().describe('Filter by sender address'),
      nextToken: z.string().optional().describe('Token for retrieving the next page of results')
    },
    async ({ appId, limit, minRound, maxRound, txid, sender, nextToken }) => {
      
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
        let search = indexerClient.lookupApplicationLogs(Number(appId));
        
        if (limit) {
          search = search.limit(Number(limit));
        }
        if (minRound) {
          search = search.minRound(Number(minRound));
        }
        if (maxRound) {
          search = search.maxRound(Number(maxRound));
        }
        if (txid) {
          search = search.txid(String(txid));
        }
        if (sender) {
          search = search.sender(String(sender));
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
            text: `Error looking up application logs: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Search for applications
  server.tool(
    'api_indexer_search_for_applications',
    'Search for applications with various criteria',
    {
      limit: z.number().int().optional().describe('Maximum number of applications to return'),
      creator: z.string().optional().describe('Filter by creator address'),
      nextToken: z.string().optional().describe('Token for retrieving the next page of results')
    },
    async ({ limit, creator, nextToken }) => {
      
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
        let search = indexerClient.searchForApplications();
        
        if (limit) {
          search = search.limit(Number(limit));
        }
        if (creator) {
          search = search.creator(String(creator));
        }
        if (nextToken) {
          search = search.nextToken(String(nextToken));
        }
        
        // Execute search
        const response = await search.do();
        
        // Format response to only return the applications array
        return ResponseProcessor.processResponse({
          applications: response.applications || []
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error searching applications: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Lookup application box
  server.tool(
    'api_indexer_lookup_application_box',
    'Get application box by name',
    { 
      appId: z.number().int().describe('Application ID'),
      boxName: z.string().describe('Box name (string, base64, or number)')
    },
    async ({ appId, boxName }) => {
      
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
        
        // Convert box name to bytes
        let boxNameBytes: Buffer;
        
        // Check if string is a valid number
        if (!isNaN(Number(boxName))) {
          boxNameBytes = Buffer.from(boxName);
        }
        // Check if string is a valid Algorand address
        else if (algosdk.isValidAddress(boxName)) {
          boxNameBytes = Buffer.from(boxName);
        }
        // Try to decode as base64, if it fails then treat as regular string
        else {
          try {
            // Test if the string is valid base64
            Buffer.from(boxName, 'base64').toString('base64');
            // If we get here, it's valid base64
            boxNameBytes = Buffer.from(boxName, 'base64');
          } catch {
            // If base64 decoding fails, treat as regular string
            boxNameBytes = Buffer.from(boxName);
          }
        }
        
        // Lookup box
        const response = await indexerClient.lookupApplicationBoxByIDandName(Number(appId), boxNameBytes).do();
        
        // Add a human-readable value if possible
        let valueAsString = "";
        try {
          // Try to decode base64 string to text
          valueAsString = Buffer.from(response.value || '', 'base64').toString('utf8');
        } catch (e) {
          valueAsString = "(Cannot decode value)";
        }
        
        const enhancedResponse = {
          ...response,
          valueAsString
        };
        
        return ResponseProcessor.processResponse(enhancedResponse);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up application box: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Lookup application boxes
  server.tool(
    'api_indexer_lookup_application_boxes',
    'Get all application boxes',
    { 
      appId: z.number().int().describe('Application ID'),
      maxBoxes: z.number().int().optional().describe('Maximum number of boxes to return')
    },
    async ({ appId, maxBoxes }) => {
      
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
        
        // Setup search
        let search = indexerClient.searchForApplicationBoxes(Number(appId));
        
        if (maxBoxes !== undefined) {
          search = search.limit(Number(maxBoxes));
        }
        
        // Execute search
        const response = await search.do();
        
        // Format the response to include readable box names if possible
        const enhancedBoxes = (response.boxes || []).map(box => {
          try {
            // Try to decode base64 string to text directly
            const nameAsString = Buffer.from(box.name || '', 'base64').toString('utf8');
            return {
              ...box,
              nameAsString
            };
          } catch (e) {
            return {
              ...box,
              nameAsString: "(Cannot decode name)"
            };
          }
        });
        
        return ResponseProcessor.processResponse({
          boxes: enhancedBoxes
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error looking up application boxes: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
