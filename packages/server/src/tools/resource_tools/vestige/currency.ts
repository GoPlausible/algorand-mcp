import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';

export const currencyTools: Tool[] = [
  // Current Currency Prices
  {
    name: 'resource_tool_view_currency_prices',
    description: 'Get all latest currency prices',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },

  // Currency Price History
  {
    name: 'resource_tool_view_currency_price_history',
    description: 'Get currency prices by timestamp range',
    inputSchema: {
      type: 'object',
      properties: {
        currency: {
          type: 'string',
          description: 'Currency code'
        },
        start: {
          type: 'integer',
          description: 'Start timestamp'
        },
        end: {
          type: 'integer',
          description: 'End timestamp'
        }
      },
      required: ['currency']
    }
  },

  // Single Currency Price
  {
    name: 'resource_tool_view_currency_price',
    description: 'Get currency price by timestamp',
    inputSchema: {
      type: 'object',
      properties: {
        currency: {
          type: 'string',
          description: 'Currency code'
        },
        timestamp: {
          type: 'integer',
          description: 'Optional timestamp'
        }
      },
      required: ['currency']
    }
  },

  // Currency Average Price
  {
    name: 'resource_tool_view_currency_average_price',
    description: 'Get average price for currency and starting timestamp',
    inputSchema: {
      type: 'object',
      properties: {
        currency: {
          type: 'string',
          description: 'Currency code'
        },
        timestamp: {
          type: 'integer',
          description: 'Optional timestamp (default 30 days ago)'
        }
      },
      required: ['currency']
    }
  },

  // Simple Price History Endpoints
  {
    name: 'resource_tool_view_currency_prices_simple_30d',
    description: 'Get currency prices for the last 30 days in 30 minute increments',
    inputSchema: {
      type: 'object',
      properties: {
        currency: {
          type: 'string',
          description: 'Currency code'
        }
      },
      required: ['currency']
    }
  },
  {
    name: 'resource_tool_view_currency_prices_simple_7d',
    description: 'Get currency prices for the last week in 30 minute increments',
    inputSchema: {
      type: 'object',
      properties: {
        currency: {
          type: 'string',
          description: 'Currency code'
        }
      },
      required: ['currency']
    }
  },
  {
    name: 'resource_tool_view_currency_prices_simple_1d',
    description: 'Get currency prices for the last day in 5 minute increments',
    inputSchema: {
      type: 'object',
      properties: {
        currency: {
          type: 'string',
          description: 'Currency code'
        }
      },
      required: ['currency']
    }
  }
];

export async function handleCurrencyTools(name: string, args: any): Promise<any> {
  const baseUrl = 'https://free-api.vestige.fi';
  let endpoint = '';

  switch (name) {
    case 'resource_tool_view_currency_prices':
      endpoint = '/currency/prices';
      break;
    case 'resource_tool_view_currency_price_history':
      endpoint = `/currency/${args.currency}/prices`;
      break;
    case 'resource_tool_view_currency_price':
      endpoint = `/currency/${args.currency}/price`;
      break;
    case 'resource_tool_view_currency_average_price':
      endpoint = `/currency/${args.currency}/average`;
      break;
    case 'resource_tool_view_currency_prices_simple_30d':
      endpoint = `/currency/${args.currency}/prices/simple/30D`;
      break;
    case 'resource_tool_view_currency_prices_simple_7d':
      endpoint = `/currency/${args.currency}/prices/simple/7D`;
      break;
    case 'resource_tool_view_currency_prices_simple_1d':
      endpoint = `/currency/${args.currency}/prices/simple/1D`;
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
      if (value !== undefined && key !== 'currency') {
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
      `Failed to fetch currency data: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
