/**
 * API Manager for Algorand Remote MCP
 * Handles interactions with external APIs like indexer, NFD, and other ecosystem services
 */

import { z } from 'zod';
import { ResponseProcessor } from '../../utils';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env, Props } from '../../types';
import { registerAlgodApiTools } from './algod';
import { registerIndexerApiTools } from './indexer';
import { registerNfdApiTools } from './nfd';

/**
 * Register API tools to the MCP server
 */
export function registerApiTools(server: McpServer,env: Env, props: Props): void {
  // Register algod API tools
  registerAlgodApiTools(server, env);
  
  // Register indexer API tools
  registerIndexerApiTools(server, env);
  
  // Register NFD API tools
  registerNfdApiTools(server, env);
  
  // Generic API request tool
  server.tool(
    'api_request',
    'Make a request to an external API',
    {
      url: z.string().describe('API endpoint URL'),
      method: z.enum(['GET', 'POST', 'PUT', 'DELETE']).default('GET').describe('HTTP method'),
      headers: z.record(z.string()).optional().describe('HTTP headers'),
      body: z.any().optional().describe('Request body')
    },
    async ({ url, method, headers = {}, body }) => {
      try {
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
        };
        
        if (body && (method === 'POST' || method === 'PUT')) {
          options.body = JSON.stringify(body);
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const contentType = response.headers.get('Content-Type') || '';
        let data;
        
        if (contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = {
            text: await response.text(),
            contentType
          };
        }
        
        return ResponseProcessor.processResponse(data);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `API request error: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Algorand indexer search tool
  server.tool(
    'api_indexer_search',
    'Search the Algorand indexer for accounts, transactions, assets, or applications',
    {
      type: z.enum(['accounts', 'transactions', 'assets', 'applications']).describe('Type of entity to search'),
      query: z.record(z.any()).describe('Query parameters'),
      limit: z.number().int().min(1).max(1000).default(100).describe('Max number of results')
    },
    async ({ type, query, limit }) => {
      
      if (!env.ALGORAND_INDEXER) {
        return {
          content: [{
            type: 'text',
            text: 'Algorand indexer URL not configured'
          }]
        };
      }
      
      try {
        // Build the indexer URL
        const baseUrl = env.ALGORAND_INDEXER;
        let url = `${baseUrl}/v2/${type}`;
        
        // Add query parameters
        const queryParams = new URLSearchParams();
        Object.entries(query).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
        
        // Add limit parameter
        queryParams.append('limit', String(limit));
        
        // Append query string
        if (queryParams.toString()) {
          url += '?' + queryParams.toString();
        }
        
        // Make the request
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Indexer request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        return ResponseProcessor.processResponse(data);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Indexer search error: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // The NFD lookup tool has been moved to the nfd module with additional NFD-specific tools
}
