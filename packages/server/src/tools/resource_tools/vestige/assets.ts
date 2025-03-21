import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResponseProcessor } from '../../utils/responseProcessor.js';
import { env } from '../../../env.js';

export const assetTools: Tool[] = [
  // Asset List and Search
  {
    name: 'resource_vestige_view_assets',
    description: 'Get all tracked assets',
    inputSchema: {
      type: 'object',
      properties: {
        page: {
          type: 'integer',
          description: 'Page number for paginated results',
          default: 0
        }
      }
    }
  },
  {
    name: 'resource_vestige_view_assets_list',
    description: 'Get all tracked assets in a list format',
    inputSchema: {
      type: 'object',
      properties: {
        provider: {
          type: 'string',
          description: 'Optional provider filter'
        },
        currency: {
          type: 'string',
          description: 'Optional currency parameter'
        }
      }
    }
  },
  {
    name: 'resource_vestige_view_assets_by_name',
    description: 'Get assets that fit search query',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query'
        },
        page: {
          type: 'integer',
          description: 'Page number (starts from 0)',
          default: 0
        },
        page_size: {
          type: 'integer',
          description: 'Number of results per page',
          default: 5
        }
      },
      required: ['query']
    }
  },

  // Asset Details
  {
    name: 'resource_vestige_view_asset',
    description: 'Get asset info',
    inputSchema: {
      type: 'object',
      properties: {
        asset_id: {
          type: 'integer',
          description: 'Asset ID'
        }
      },
      required: ['asset_id']
    }
  },
  {
    name: 'resource_vestige_view_asset_price',
    description: 'Get estimated asset price',
    inputSchema: {
      type: 'object',
      properties: {
        asset_id: {
          type: 'integer',
          description: 'Asset ID'
        },
        currency: {
          type: 'string',
          description: 'Optional currency parameter'
        },
        provider: {
          type: 'string',
          description: 'Optional provider parameter'
        }
      },
      required: ['asset_id']
    }
  },

  // Asset Views
  {
    name: 'resource_vestige_view_asset_views',
    description: 'Get asset views',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },

  // Asset Holders and Contributors
  {
    name: 'resource_vestige_view_asset_holders',
    description: 'Get asset holders',
    inputSchema: {
      type: 'object',
      properties: {
        asset_id: {
          type: 'integer',
          description: 'Asset ID'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of holders to return',
          default: 100
        }
      },
      required: ['asset_id']
    }
  },
  {
    name: 'resource_vestige_view_asset_contributors',
    description: 'Get asset liquidity contributors from top 5 biggest pools',
    inputSchema: {
      type: 'object',
      properties: {
        asset_id: {
          type: 'integer',
          description: 'Asset ID'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of contributors to return',
          default: 100
        }
      },
      required: ['asset_id']
    }
  }
];



export const handleAssetTools = ResponseProcessor.wrapResourceHandler(async function handleAssetTools(args: any): Promise<any> {
  const name = args.name;
  const baseUrl = env.vestige_api_url;
  let endpoint = '';

  switch (name) {
    case 'resource_vestige_view_assets':
      endpoint = '/assets';
      break;
    case 'resource_vestige_view_assets_list':
      endpoint = '/assets/list';
      break;
    case 'resource_vestige_view_assets_by_name':
      endpoint = '/assets/search';
      break;
    case 'resource_vestige_view_asset':
      endpoint = `/asset/${args.asset_id}`;
      break;
    case 'resource_vestige_view_asset_price':
      endpoint = `/asset/${args.asset_id}/price`;
      break;
    case 'resource_vestige_view_asset_views':
      endpoint = '/assets/views';
      break;
    case 'resource_vestige_view_asset_holders':
      endpoint = `/asset/${args.asset_id}/holders`;
      break;
    case 'resource_vestige_view_asset_contributors':
      endpoint = `/asset/${args.asset_id}/contributors`;
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
      if (value !== undefined && key !== 'asset_id') {
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
    let data = await response.json();
    
    // For view_assets endpoint, ensure we have the page parameter
    if (name === 'resource_vestige_view_assets' && typeof args.page === 'number') {
      // The response processor will handle pagination, but we need to pass the page
      data = {
        ...data,
        _page: args.page // Internal field for response processor
      };
    }

    return data;
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to fetch asset data: ${error instanceof Error ? error.message : String(error)}`
    );
  }
});
