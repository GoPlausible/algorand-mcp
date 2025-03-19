import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';

export const vaultTools: Tool[] = [
  // Individual Vault Info
  {
    name: 'resource_tool_view_vault',
    description: 'Get vault by id',
    inputSchema: {
      type: 'object',
      properties: {
        vault_id: {
          type: 'integer',
          description: 'Vault ID'
        }
      },
      required: ['vault_id']
    }
  },

  // Recent Vaults
  {
    name: 'resource_tool_view_recent_vaults',
    description: 'Get last 100 vaults',
    inputSchema: {
      type: 'object',
      properties: {
        owner: {
          type: 'string',
          description: 'Optional owner address filter'
        },
        include_all: {
          type: 'boolean',
          description: 'Include additional data',
          default: false
        }
      }
    }
  }
];

export async function handleVaultTools(name: string, args: any): Promise<any> {
  const baseUrl = 'https://free-api.vestige.fi';
  let endpoint = '';

  switch (name) {
    case 'resource_tool_view_vault':
      endpoint = `/vault/${args.vault_id}`;
      break;
    case 'resource_tool_view_recent_vaults':
      endpoint = '/vaults';
      break;
    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
  }

  try {
    // Add query parameters if they exist
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(args)) {
      if (value !== undefined && key !== 'vault_id') {
        queryParams.append(key, String(value));
      }
    }
    const url = `${baseUrl}${endpoint}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new McpError(
        ErrorCode.InternalError,
        `Vestige API error: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(data, null, 2)
      }]
    };
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to fetch vault data: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
