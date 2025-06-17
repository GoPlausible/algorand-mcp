/**
 * NFD API Manager
 * Provides tools for interacting with the Algorand Name Service
 */

import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ResponseProcessor } from '../../../utils';
import { Env } from '../../../types';

/**
 * Register NFD API tools to the MCP server
 */
export function registerNfdApiTools(server: McpServer,env: Env): void {
  // NFD lookup tool is already registered in the main apiManager/index.ts file
  
  // Get NFD by name
  server.tool(
    'api_nfd_get_nfd',
    'Get NFD domain information by name',
    {
      name: z.string().describe('NFD domain name, e.g. "example.algo"'),
      view: z.enum(['brief', 'full']).optional().default('full').describe('View type - brief or full'),
      includeSales: z.boolean().optional().default(false).describe('Include sales data')
    },
    async ({ name, view, includeSales }) => {
      try {
        const apiBase = env.NFD_API_URL || 'https://api.nf.domains';
        
        let url = `${apiBase}/nfd/${encodeURIComponent(name)}`;
        const params = new URLSearchParams();
        
        if (view === 'brief') {
          params.append('view', 'brief');
        }
        
        if (includeSales) {
          params.append('includeSales', 'true');
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await fetch(url, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error(`NFD request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        return ResponseProcessor.processResponse(data);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `NFD lookup error: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get NFDs for address
  server.tool(
    'api_nfd_get_nfds_for_address',
    'Get all NFD domains owned by an address',
    {
      address: z.string().describe('Algorand address'),
      limit: z.number().optional().default(50).describe('Maximum number of results'),
      offset: z.number().optional().default(0).describe('Offset for pagination'),
      view: z.enum(['brief', 'full']).optional().default('brief').describe('View type - brief or full')
    },
    async ({ address, limit, offset, view }) => {
      try {
        const apiBase = env.NFD_API_URL || 'https://api.nf.domains';
        
        let url = `${apiBase}/nfd/address/${encodeURIComponent(address)}`;
        const params = new URLSearchParams();
        
        params.append('limit', String(limit));
        params.append('offset', String(offset));
        
        if (view) {
          params.append('view', view);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await fetch(url, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error(`NFD address lookup failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        return ResponseProcessor.processResponse(data);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `NFD domains lookup error: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get NFD activity
  server.tool(
    'api_nfd_get_nfd_activity',
    'Get activity for an NFD domain',
    {
      name: z.string().describe('NFD domain name, e.g. "example.algo"'),
      limit: z.number().optional().default(50).describe('Maximum number of results'),
      offset: z.number().optional().default(0).describe('Offset for pagination')
    },
    async ({ name, limit, offset }) => {
      try {
        const apiBase = env.NFD_API_URL || 'https://api.nf.domains';
        
        let url = `${apiBase}/nfd/activity/${encodeURIComponent(name)}`;
        const params = new URLSearchParams();
        
        params.append('limit', String(limit));
        params.append('offset', String(offset));
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await fetch(url, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error(`NFD activity request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        return ResponseProcessor.processResponse(data);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `NFD activity lookup error: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Get NFD analytics
  server.tool(
    'api_nfd_get_nfd_analytics',
    'Get analytics for an NFD domain',
    {
      name: z.string().describe('NFD domain name, e.g. "example.algo"'),
    },
    async ({ name }) => {
      try {
        const apiBase = env.NFD_API_URL || 'https://api.nf.domains';
        
        const url = `${apiBase}/nfd/analytics/${encodeURIComponent(name)}`;
        
        const response = await fetch(url, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error(`NFD analytics request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        return ResponseProcessor.processResponse(data);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `NFD analytics error: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Browse NFDs
  server.tool(
    'api_nfd_browse_nfds',
    'Browse NFD domains with filtering options',
    {
      limit: z.number().optional().default(50).describe('Maximum number of results'),
      offset: z.number().optional().default(0).describe('Offset for pagination'),
      sortBy: z.enum(['name', 'created', 'expiry', 'price']).optional().default('name').describe('Sort field'),
      sortOrder: z.enum(['asc', 'desc']).optional().default('asc').describe('Sort order'),
      view: z.enum(['brief', 'full']).optional().default('brief').describe('View type - brief or full'),
      tld: z.string().optional().describe('Top level domain filter (e.g. "algo")'),
      saleStatus: z.enum(['listed', 'unlisted']).optional().describe('Sale status'),
      nameFilter: z.string().optional().describe('Name filter (substring match)')
    },
    async ({ limit, offset, sortBy, sortOrder, view, tld, saleStatus, nameFilter }) => {
      try {
        const apiBase = env.NFD_API_URL || 'https://api.nf.domains';
        
        let url = `${apiBase}/nfd/browse`;
        const params = new URLSearchParams();
        
        params.append('limit', String(limit));
        params.append('offset', String(offset));
        params.append('sortBy', sortBy);
        params.append('sortOrder', sortOrder);
        
        if (view) {
          params.append('view', view);
        }
        
        if (tld) {
          params.append('tld', tld);
        }
        
        if (saleStatus) {
          params.append('saleStatus', saleStatus);
        }
        
        if (nameFilter) {
          params.append('nameFilter', nameFilter);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await fetch(url, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error(`NFD browse request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        return ResponseProcessor.processResponse(data);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `NFD browse error: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // Search NFDs
  server.tool(
    'api_nfd_search_nfds',
    'Search for NFD domains',
    {
      query: z.string().describe('Search query'),
      limit: z.number().optional().default(50).describe('Maximum number of results'),
      offset: z.number().optional().default(0).describe('Offset for pagination'),
      view: z.enum(['brief', 'full']).optional().default('brief').describe('View type - brief or full')
    },
    async ({ query, limit, offset, view }) => {
      try {
        const apiBase = env.NFD_API_URL || 'https://api.nf.domains';
        
        let url = `${apiBase}/nfd/search`;
        const params = new URLSearchParams();
        
        params.append('q', query);
        params.append('limit', String(limit));
        params.append('offset', String(offset));
        
        if (view) {
          params.append('view', view);
        }
        
        if (params.toString()) {
          url += `?${params.toString()}`;
        }
        
        const response = await fetch(url, {
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
          throw new Error(`NFD search request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        return ResponseProcessor.processResponse(data);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `NFD search error: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
