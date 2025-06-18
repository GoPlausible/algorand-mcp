/**
 * ARC-26 Manager for Algorand Remote MCP
 * Handles Algorand URI generation following ARC-26 specification
 * https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0026.md
 */

import { z } from 'zod';
import { ResponseProcessor } from '../utils';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env, Props } from '../types';
/**
 * Generate Algorand URI following ARC-26 specification
 */
function generateAlgorandUri(
  action: string,
  parameters: Record<string, string | number | boolean>,
  amount?: number,
  assetId?: number,
  note?: string
): string {
  // Build the base URI with action
  let uri = `algorand://${action}`;
  
  // Build query parameters
  const queryParams: string[] = [];
  
  // Add regular parameters
  Object.entries(parameters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  });
  
  // Add optional amount
  if (amount !== undefined) {
    queryParams.push(`amount=${amount}`);
  }
  
  // Add optional assetId
  if (assetId !== undefined) {
    queryParams.push(`asset=${assetId}`);
  }
  
  // Add optional note
  if (note !== undefined) {
    queryParams.push(`note=${encodeURIComponent(note)}`);
  }
  
  // Append query string if we have parameters
  if (queryParams.length > 0) {
    uri += '?' + queryParams.join('&');
  }
  
  return uri;
}

/**
 * Register ARC-26 tools to the MCP server
 */
export function registerArc26Tools(server: McpServer,env: Env, props: Props): void {
  // Generate Algorand URI
  server.tool(
    'generate_algorand_uri',
    'Generate a URI following the ARC-26 specification',
    {
      action: z.enum(['pay', 'axfer', 'acfg', 'afrz', 'appl']).describe('Action to perform'),
      parameters: z.record(z.union([z.string(), z.number(), z.boolean()])).describe('URI parameters'),
      amount: z.number().optional().describe('Amount in microAlgos (for payment)'),
      assetId: z.number().optional().describe('Asset ID (for asset transfer)'),
      note: z.string().optional().describe('Optional note')
    },
    async ({ action, parameters, amount, assetId, note }) => {
      try {
        const uri = generateAlgorandUri(action, parameters, amount, assetId, note);
        return ResponseProcessor.processResponse({ uri });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error generating Algorand URI: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Generate payment URI helper
  server.tool(
    'generate_payment_uri',
    'Generate a payment URI following the ARC-26 specification',
    {
      receiver: z.string().describe('Receiver address'),
      amount: z.number().optional().describe('Amount in microAlgos'),
      label: z.string().optional().describe('Label for the transaction'),
      note: z.string().optional().describe('Optional note')
    },
    async ({ receiver, amount, label, note }) => {
      try {
        const parameters: Record<string, string | number | boolean> = { receiver };
        
        if (label) {
          parameters.label = label;
        }
        
        const uri = generateAlgorandUri('pay', parameters, amount, undefined, note);
        return ResponseProcessor.processResponse({ uri });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error generating payment URI: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Generate asset transfer URI helper
  server.tool(
    'generate_asset_transfer_uri',
    'Generate an asset transfer URI following the ARC-26 specification',
    {
      receiver: z.string().describe('Receiver address'),
      assetId: z.number().describe('Asset ID'),
      amount: z.number().optional().describe('Amount of asset to transfer'),
      label: z.string().optional().describe('Label for the transaction'),
      note: z.string().optional().describe('Optional note')
    },
    async ({ receiver, assetId, amount, label, note }) => {
      try {
        const parameters: Record<string, string | number | boolean> = { receiver };
        
        if (label) {
          parameters.label = label;
        }
        
        const uri = generateAlgorandUri('axfer', parameters, amount, assetId, note);
        return ResponseProcessor.processResponse({ uri });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error generating asset transfer URI: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
