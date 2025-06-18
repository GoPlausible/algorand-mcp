/**
 * Knowledge Resources for Algorand Remote MCP
 * Provides URI-based access to knowledge and documentation
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Env, Props } from '../../types';
import { guide } from '../../utils/Guide.js';

// These categories will be dynamically fetched from R2
const categoryNames = [
  'arcs', 'sdks', 'algokit', 'algokit-utils',
  'tealscript', 'puya', 'liquid-auth', 'python',
  'developers', 'clis', 'nodes', 'details'
];

/**
 * Load a JSON file from R2 storage
 */
async function loadJsonFromR2(env: Env, filename: string): Promise<any> {
  if (!env.PLAUSIBLEAI) {
    console.error('R2 bucket not available for knowledge resources');
    return null;
  }

  try {
    const path = `taxonomy-categories/${filename}`;
    const object = await env.PLAUSIBLEAI.get(path);
    
    if (!object) {
      console.error(`Resource not found: ${path}`);
      return null;
    }
    
    const content = await object.text();
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading JSON from R2: ${error}`);
    return null;
  }
}

/**
 * Maps internal category names to display names
 */
const categoryDisplayNames: Record<string, string> = {
  'arcs': 'Algorand Request for Comments',
  'sdks': 'Software Development Kits',
  'algokit': 'AlgoKit',
  'algokit-utils': 'AlgoKit Utils',
  'tealscript': 'TEALScript',
  'puya': 'Puya',
  'liquid-auth': 'Liquid Auth',
  'python': 'Python Development',
  'developers': 'Developer Documentation',
  'clis': 'CLI Tools',
  'nodes': 'Node Management',
  'details': 'Developer Details'
};

/**
 * Register knowledge resources to the MCP server
 * @param server The MCP server instance
 * @param env The environment object containing Cloudflare bindings
 */
export function registerKnowledgeResources(server: McpServer, env: Env, props: Props): void {
  // Register full taxonomy resource
  server.resource("Algorand Knowledge Full Taxonomy", "algorand://knowledge/taxonomy", async (uri) => {
    try {
      if (!env.PLAUSIBLEAI) {
        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              error: "R2 bucket not available for knowledge resources"
            }, null, 2)
          }]
        };
      }
      
      // Load all category data from R2
      const categoryDataPromises = categoryNames.map(category => 
        loadJsonFromR2(env, `${category}.json`)
      );
      
      const categoriesData = await Promise.all(categoryDataPromises);
      const categories = categoriesData.filter(data => data !== null);
      
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({ categories }, null, 2)
        }]
      };
    } catch (error: any) {
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify({
            error: `Error retrieving taxonomy: ${error.message || 'Unknown error'}`
          }, null, 2)
        }]
      };
    }
  });

  
  // Register individual category resources
  categoryNames.forEach(category => {
    const displayName = categoryDisplayNames[category] || category;
    server.resource(displayName, `algorand://knowledge/taxonomy/${category}`, async (uri) => {
      try {
        // Load the category data from R2
        const categoryData = await loadJsonFromR2(env, `${category}.json`);
        
        if (!categoryData) {
          return {
            contents: [{
              uri: uri.href,
              text: JSON.stringify({
                error: `Category data not found: ${category}`
              }, null, 2)
            }]
          };
        }
        
        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify(categoryData, null, 2)
          }]
        };
      } catch (error: any) {
        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify({
              error: `Error retrieving category data: ${error.message || 'Unknown error'}`
            }, null, 2)
          }]
        };
      }
    });
  });
  

}
