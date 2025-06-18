/**
 * Knowledge Manager for Algorand Remote MCP
 * Handles access to Algorand documentation stored in Cloudflare R2
 */

import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ResponseProcessor } from '../utils';
import { Env, Props } from '../types';

/**
 * Register knowledge tools to the MCP server
 * @param server The MCP server instance
 * @param env The environment object containing Cloudflare bindings
 */
export function registerKnowledgeTools(server: McpServer, env: Env, props: Props): void {
  // Get knowledge document
  server.tool(
    'get_knowledge_doc',
    'Get markdown content for specified knowledge documents',
    {
      documents: z.array(z.string()).describe('Array of document keys (e.g. ["ARCs:specs:arc-0020.md"])')
    },
    async ({ documents }) => {
      
      try {
        if (!env.PLAUSIBLEAI) {
          console.error('R2 bucket not available');
          return {
            content: [{
              type: 'text',
              text: 'R2 bucket not available for knowledge documents'
            }]
          };
        }
        
        // Process document keys and fetch content from R2
        const results = await Promise.all(documents.map(async (docKey) => {
          try {
            // Format the document key for R2 path
            // The docKey will be something like "ARCs:specs:arc-0020.md"
            // We need to convert the colons to forward slashes for the R2 path
            // Maybe the file is stored under a slightly different key structure
            // Let's try looking for it with and without any taxonomy prefix
            const r2Key = docKey.replace(/:/g, '/');
            console.log(`Looking for document at key: ${r2Key}`);
            
            // Get the document from R2 bucket
            // @ts-ignore - We've checked PLAUSIBLEAI exists above
            let object = await env.PLAUSIBLEAI.get(r2Key);
            
            // If not found, try listing objects with this prefix to see what's available
            if (!object) {
              console.log(`Object not found at ${r2Key}, trying to list similar objects`);
              const similarObjects = await env.PLAUSIBLEAI.list({
                prefix: r2Key.split('/')[0], // Get just the first segment
                delimiter: '/'
              });
              
              console.log(`Found ${similarObjects.objects.length} similar objects`);
              if (similarObjects.objects.length > 0) {
                console.log(`Similar objects: ${similarObjects.objects.map(o => o.key).join(', ')}`);
                
                // Try an exact match from the list of similar objects
                const exactMatch = similarObjects.objects.find(o => 
                  o.key.replace(/\//g, ':') === docKey
                );
                
                if (exactMatch) {
                  console.log(`Found exact match: ${exactMatch.key}`);
                  object = await env.PLAUSIBLEAI.get(exactMatch.key);
                }
              }
            }
            
            if (!object) {
              console.error(`Document not found: ${docKey}`);
              return `Document not found: ${docKey}`;
            }
            
            // Get the text content
            const content = await object.text();
            return content;
          } catch (error) {
            console.error(`Failed to read document ${docKey}:`, error);
            return `Failed to read document ${docKey}: ${error instanceof Error ? error.message : 'Unknown error'}`;
          }
        }));
        
        return ResponseProcessor.processResponse({
          documents: results
        });
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error retrieving knowledge documents: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
  
  // List available knowledge documents
  server.tool(
    'list_knowledge_docs',
    'List available knowledge documents by category',
    {
      prefix: z.string().optional().default('').describe('Optional prefix to filter documents')
    },
    async ({ prefix }) => {
      
      try {
        if (!env.PLAUSIBLEAI) {
          console.error('R2 bucket not available');
          return {
            content: [{
              type: 'text',
              text: 'R2 bucket not available for knowledge documents'
            }]
          };
        }
        
        // Format the prefix for R2 listing
        // If no specific prefix given, don't use any prefix to list all objects at root
        const r2Prefix = prefix ? `${prefix.replace(/:/g, '/')}` : '';
        console.log(`Listing objects with prefix: '${r2Prefix}'`);
        
        // List objects from the R2 bucket with the given prefix
        // @ts-ignore - We've checked PLAUSIBLEAI exists above
        const objects = await env.PLAUSIBLEAI.list({
          prefix: r2Prefix,
          delimiter: '/'
        });
        
        console.log(`Found ${objects.objects.length} objects and ${objects.delimitedPrefixes.length} prefixes`);
        // Log the first few objects for debugging
        if (objects.objects.length > 0) {
          console.log(`First object key: ${objects.objects[0].key}`);
        }
        if (objects.delimitedPrefixes.length > 0) {
          console.log(`First prefix: ${objects.delimitedPrefixes[0]}`);
        }
        
        // Format the results
        const results = {
          files: objects.objects.map((obj) => {
            // Convert R2 path back to document key format
            const key = obj.key.replace('taxonomy/', '').replace(/\//g, ':');
            return {
              key,
              size: obj.size,
              uploaded: obj.uploaded instanceof Date ? obj.uploaded.toISOString() : String(obj.uploaded)
            };
          }),
          commonPrefixes: objects.delimitedPrefixes.map((prefix) => {
            // Convert R2 path prefix back to document key format
            return prefix.replace('taxonomy/', '').replace(/\//g, ':');
          })
        };
        
        return ResponseProcessor.processResponse(results);
      } catch (error: any) {
        return {
          content: [{
            type: 'text',
            text: `Error listing knowledge documents: ${error.message || 'Unknown error'}`
          }]
        };
      }
    }
  );
}
