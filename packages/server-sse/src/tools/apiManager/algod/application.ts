/**
 * Algod Application API Tools
 * Direct access to Algorand node application data
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
 * Register application API tools to the MCP server
 */
export function registerApplicationApiTools(server: McpServer,env: Env): void {
  // Get application information
  server.tool(
    'api_algod_get_application_info',
    'Get application details from algod',
    { 
      appId: z.number().int().describe('The application ID')
    },
    async ({ appId }) => {
      
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
        
        // Get application information
        const response = await algodClient.getApplicationByID(Number(appId)).do();
        
        return ResponseProcessor.processResponse(response);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting application info: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get application box (storage) value
  server.tool(
    'api_algod_get_application_box_value',
    'Get application box contents from algod',
    { 
      appId: z.number().int().describe('The application ID'),
      name: z.string().describe('The box name (will be UTF-8 encoded)')
    },
    async ({ appId, name }) => {
      
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
        
        // Encode box name as bytes
        const nameBytes = new TextEncoder().encode(name);
        
        // Get application box value
        const response = await algodClient.getApplicationBoxByName(Number(appId), nameBytes).do();
        
        // Format response with both raw bytes (base64) and UTF-8 string interpretation
        const value = response.value;
        const formattedResponse = {
          name: Buffer.from(response.name).toString('base64'),
          value: Buffer.from(value).toString('base64'),
          valueAsString: new TextDecoder().decode(new Uint8Array(value)),
          appId: appId
        };
        
        return ResponseProcessor.processResponse(formattedResponse);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting application box value: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get application boxes
  server.tool(
    'api_algod_get_application_boxes',
    'Get all application boxes from algod',
    { 
      appId: z.number().int().describe('The application ID'),
      maxResults: z.number().int().min(1).max(100).default(20).describe('Maximum number of results to return')
    },
    async ({ appId, maxResults }) => {
      
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
        
        // Get application boxes
        const response = await algodClient.getApplicationBoxes(Number(appId)).max(Number(maxResults)).do();
        
        // Format the response to include readable box names
        const formattedResponse = {
          boxes: response.boxes ? response.boxes.map((box: any) => {
            try {
              // Use a safe way to decode box name
              const nameAsString = new TextDecoder().decode(new Uint8Array(box.name));
              return {
                name: box.name,
                nameAsString
              };
            } catch (e) {
              return {
                name: box.name,
                nameAsString: "Unable to decode"
              };
            }
          }) : []
        };
        
        return ResponseProcessor.processResponse(formattedResponse);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting application boxes: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get application state
  server.tool(
    'api_algod_get_application_state',
    'Get application global state from algod',
    { 
      appId: z.number().int().describe('The application ID')
    },
    async ({ appId }) => {
      
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
        
        // Get application information first to extract global state
        const appInfo = await algodClient.getApplicationByID(Number(appId)).do();
        
        // Extract and process global state
        const globalState = appInfo.params?.['global-state'] || [];
        const processedState = globalState.map((stateItem: any) => {
          const key = Buffer.from(stateItem.key, 'base64').toString('utf-8');
          const value = stateItem.value;
          
          // Process value based on its type
          let processedValue;
          if (value.type === 1) { // bytes
            // Try to decode as UTF-8 string if possible
            const bytes = Buffer.from(value.bytes, 'base64');
            try {
              processedValue = {
                raw: value.bytes,
                asString: bytes.toString('utf-8'),
                type: 'bytes'
              };
            } catch (e) {
              processedValue = {
                raw: value.bytes,
                type: 'bytes'
              };
            }
          } else { // uint
            processedValue = {
              raw: value.uint,
              type: 'uint'
            };
          }
          
          return {
            key,
            keyAsBase64: stateItem.key,
            value: processedValue
          };
        });
        
        return ResponseProcessor.processResponse({
          appId: appId,
          globalState: processedState,
          raw: globalState
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error getting application state: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
