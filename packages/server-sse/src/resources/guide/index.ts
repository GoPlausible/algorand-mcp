/**
 * Guide Resource for Algorand Remote MCP
 * Provides access to comprehensive guide for using algorand-remote-mcp
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { guide } from '../../utils/Guide.js';
import { Env, Props } from '../../types';

/**
 * Register guide resource to the MCP server
 */
export function registerGuideResource(server: McpServer, env: Env, props: Props): void {
  // Main guide resource
  server.resource("Algorand MCP Guide", "algorand://remote-mcp-guide", (uri) => {
    return {
      contents: [{
        uri: uri.href,
        text: guide
      }]
    };
  });
}
