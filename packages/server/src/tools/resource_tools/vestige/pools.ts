import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResponseProcessor } from '../../utils/responseProcessor.js';
import { env } from '../../../env.js';

export const poolTools: Tool[] = [
  // Pool Volumes
  {
    name: 'resource_vestige_view_pool_volumes',
    description: 'Get pool volumes and APY across providers',
    inputSchema: {
      type: 'object',
      properties: {
        currency: {
          type: 'string',
          description: 'Optional currency parameter'
        }
      }
    }
  },

  // Pool Listings
  {
    name: 'resource_vestige_view_pools',
    description: 'Get tracked pools or all pools by asset id',
    inputSchema: {
      type: 'object',
      properties: {
        provider: {
          type: 'string',
          description: 'Provider ID'
        },
        assets: {
          type: 'string',
          description: 'Optional asset IDs filter'
        }
      },
      required: ['provider']
    }
  },

  // Individual Pool Info
  {
    name: 'resource_vestige_view_pool',
    description: 'Get pool info',
    inputSchema: {
      type: 'object',
      properties: {
        pool_id: {
          type: 'integer',
          description: 'Pool ID'
        }
      },
      required: ['pool_id']
    }
  },

  // Pool Volume Data
  {
    name: 'resource_vestige_view_pool_volume',
    description: 'Get pool volume and APY for a specific pool',
    inputSchema: {
      type: 'object',
      properties: {
        pool_id: {
          type: 'integer',
          description: 'Pool ID'
        },
        currency: {
          type: 'string',
          description: 'Optional currency parameter'
        }
      },
      required: ['pool_id']
    }
  },

  // Pool Price Data
  {
    name: 'resource_vestige_view_pool_price',
    description: 'Get last price of a pool',
    inputSchema: {
      type: 'object',
      properties: {
        pool_id: {
          type: 'integer',
          description: 'Pool ID'
        }
      },
      required: ['pool_id']
    }
  },

  // Pool Contributors
  {
    name: 'resource_vestige_view_pool_contributors',
    description: 'Get pool contributors',
    inputSchema: {
      type: 'object',
      properties: {
        pool_id: {
          type: 'integer',
          description: 'Pool ID'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of contributors to return',
          default: 100
        }
      },
      required: ['pool_id']
    }
  }
];



export const handlePoolTools = ResponseProcessor.wrapResourceHandler(async function handlePoolTools(args: any): Promise<any> {
  const name = args.name;
  const baseUrl = env.vestige_api_url;
  let endpoint = '';

  switch (name) {
    case 'resource_vestige_view_pool_volumes':
      endpoint = '/pools/volumes';
      break;
    case 'resource_vestige_view_pools':
      endpoint = `/pools/${args.provider}`;
      break;
    case 'resource_vestige_view_pool':
      endpoint = `/pool/${args.pool_id}`;
      break;
    case 'resource_vestige_view_pool_volume':
      endpoint = `/pool/${args.pool_id}/volume`;
      break;
    case 'resource_vestige_view_pool_price':
      endpoint = `/pool/${args.pool_id}/price`;
      break;
    case 'resource_vestige_view_pool_contributors':
      endpoint = `/pool/${args.pool_id}/contributors`;
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
      if (value !== undefined && key !== 'pool_id' && key !== 'provider') {
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
    return data;
    
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to fetch pool data: ${error instanceof Error ? error.message : String(error)}`
    );
  }
});
