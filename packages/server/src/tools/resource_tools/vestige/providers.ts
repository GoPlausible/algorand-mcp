import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResponseProcessor } from '../../utils/responseProcessor.js';
import { env } from '../../../env.js';

export const providerTools: Tool[] = [
  {
    name: 'resource_vestige_view_providers',
    description: 'Get all supported providers (ids used with other endpoints)',
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
  {
    name: 'resource_vestige_view_providers_tvl_simple_90d',
    description: 'Get provider TVL for the last 90 days',
    inputSchema: {
      type: 'object',
      properties: {
        provider: {
          type: 'string',
          description: 'Optional provider ID'
        },
        currency: {
          type: 'string',
          description: 'Optional currency parameter'
        }
      }
    }
  },
  {
    name: 'resource_vestige_view_providers_tvl_simple_30d',
    description: 'Get provider TVL for the last 30 days',
    inputSchema: {
      type: 'object',
      properties: {
        provider: {
          type: 'string',
          description: 'Optional provider ID'
        },
        currency: {
          type: 'string',
          description: 'Optional currency parameter'
        }
      }
    }
  },
  {
    name: 'resource_vestige_view_providers_tvl_simple_7d',
    description: 'Get provider TVL for the last 7 days',
    inputSchema: {
      type: 'object',
      properties: {
        provider: {
          type: 'string',
          description: 'Optional provider ID'
        },
        currency: {
          type: 'string',
          description: 'Optional currency parameter'
        }
      }
    }
  },
  {
    name: 'resource_vestige_view_providers_tvl_simple_1d',
    description: 'Get provider TVL for the last day',
    inputSchema: {
      type: 'object',
      properties: {
        provider: {
          type: 'string',
          description: 'Optional provider ID'
        },
        currency: {
          type: 'string',
          description: 'Optional currency parameter'
        }
      }
    }
  }
];



export const handleProviderTools = ResponseProcessor.wrapResourceHandler(async function handleProviderTools(args: any): Promise<any> {
  const name = args.name;
  const baseUrl = env.vestige_api_url;
  let endpoint = '';

  switch (name) {
    case 'resource_vestige_view_providers':
      endpoint = '/providers';
      break;
    case 'resource_vestige_view_providers_tvl_simple_90d':
      endpoint = '/providers/tvl/simple/90D';
      break;
    case 'resource_vestige_view_providers_tvl_simple_30d':
      endpoint = '/providers/tvl/simple/30D';
      break;
    case 'resource_vestige_view_providers_tvl_simple_7d':
      endpoint = '/providers/tvl/simple/7D';
      break;
    case 'resource_vestige_view_providers_tvl_simple_1d':
      endpoint = '/providers/tvl/simple/1D';
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
      if (value !== undefined) {
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

    // Return data directly for providers endpoint, wrap TVL data in object
    if (name === 'resource_vestige_view_providers') {
      return data;
    }

    // Structure TVL response
    if (name.startsWith('resource_vestige_view_providers_tvl_simple_')) {
      return {
        tvlData: data
      };
    }

    return data;
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to fetch provider data: ${error instanceof Error ? error.message : String(error)}`
    );
  }
});
