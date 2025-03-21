import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResourceDefinition, ResourceContent } from '../types.js';
import { URI_TEMPLATES } from '../uri-config.js';
import { handleVestigeTools } from '../../tools/resource_tools/vestige/index.js';

// Vestige Resources
export const vestigeResources: ResourceDefinition[] = [
  // Provider resources
  {
    uri: URI_TEMPLATES.VESTIGE_PROVIDERS,
    name: 'Get Vestige providers',
    description: 'Get all supported providers',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_PROVIDERS_TVL_90D,
    name: 'Get provider TVL 90d',
    description: 'Get provider TVL for the last 90 days',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_PROVIDERS_TVL_30D,
    name: 'Get provider TVL 30d',
    description: 'Get provider TVL for the last 30 days',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_PROVIDERS_TVL_7D,
    name: 'Get provider TVL 7d',
    description: 'Get provider TVL for the last 7 days',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_PROVIDERS_TVL_1D,
    name: 'Get provider TVL 1d',
    description: 'Get provider TVL for the last day',
    mimeType: 'application/json'
  },

  // Asset resources
  {
    uri: URI_TEMPLATES.VESTIGE_ASSETS,
    name: 'Get Vestige assets',
    description: 'Get all tracked assets',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_ASSETS_LIST,
    name: 'Get Vestige assets list',
    description: 'Get all tracked assets in a list format',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_ASSETS_SEARCH,
    name: 'Search Vestige assets',
    description: 'Get assets that fit search query',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_ASSET,
    name: 'Get Vestige asset',
    description: 'Get asset info',
    mimeType: 'application/json'
  },

  // Pool resources
  {
    uri: URI_TEMPLATES.VESTIGE_POOLS_VOLUMES,
    name: 'Get pool volumes',
    description: 'Get pool volumes and APY across providers',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_POOLS_PROVIDER,
    name: 'Get provider pools',
    description: 'Get tracked pools for a provider',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_POOL_INFO,
    name: 'Get pool info',
    description: 'Get pool information',
    mimeType: 'application/json'
  },

  // Currency resources
  {
    uri: URI_TEMPLATES.VESTIGE_CURRENCY_PRICES,
    name: 'Get currency prices',
    description: 'Get all latest currency prices',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_CURRENCY_PRICE,
    name: 'Get currency price',
    description: 'Get currency price by timestamp',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_CURRENCY_HISTORY,
    name: 'Get currency price history',
    description: 'Get currency prices by timestamp range',
    mimeType: 'application/json'
  },

  // Vault resources
  {
    uri: URI_TEMPLATES.VESTIGE_VAULT,
    name: 'Get vault info',
    description: 'Get vault by id',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.VESTIGE_VAULTS_RECENT,
    name: 'Get recent vaults',
    description: 'Get last 100 vaults',
    mimeType: 'application/json'
  }
];

// Vestige Resource Schemas
export const vestigeResourceSchemas = {
  [URI_TEMPLATES.VESTIGE_PROVIDERS]: {
    type: 'object',
    properties: {
      currency: { type: 'string' }
    }
  },
  [URI_TEMPLATES.VESTIGE_PROVIDERS_TVL_90D]: {
    type: 'object',
    properties: {
      provider: { type: 'string' },
      currency: { type: 'string' }
    }
  },
  [URI_TEMPLATES.VESTIGE_PROVIDERS_TVL_30D]: {
    type: 'object',
    properties: {
      provider: { type: 'string' },
      currency: { type: 'string' }
    }
  },
  [URI_TEMPLATES.VESTIGE_PROVIDERS_TVL_7D]: {
    type: 'object',
    properties: {
      provider: { type: 'string' },
      currency: { type: 'string' }
    }
  },
  [URI_TEMPLATES.VESTIGE_PROVIDERS_TVL_1D]: {
    type: 'object',
    properties: {
      provider: { type: 'string' },
      currency: { type: 'string' }
    }
  },
  [URI_TEMPLATES.VESTIGE_ASSETS]: {
    type: 'object',
    properties: {
      page: { type: 'integer' }
    }
  },
  [URI_TEMPLATES.VESTIGE_ASSETS_LIST]: {
    type: 'object',
    properties: {
      provider: { type: 'string' },
      currency: { type: 'string' }
    }
  },
  [URI_TEMPLATES.VESTIGE_ASSETS_SEARCH]: {
    type: 'object',
    properties: {
      query: { type: 'string' },
      page: { type: 'integer' },
      page_size: { type: 'integer' }
    },
    required: ['query']
  },
  [URI_TEMPLATES.VESTIGE_ASSET]: {
    type: 'object',
    properties: {
      asset_id: { type: 'integer' }
    },
    required: ['asset_id']
  },
  [URI_TEMPLATES.VESTIGE_POOLS_VOLUMES]: {
    type: 'object',
    properties: {
      currency: { type: 'string' }
    }
  },
  [URI_TEMPLATES.VESTIGE_POOLS_PROVIDER]: {
    type: 'object',
    properties: {
      provider: { type: 'string' },
      assets: { type: 'string' }
    },
    required: ['provider']
  },
  [URI_TEMPLATES.VESTIGE_POOL_INFO]: {
    type: 'object',
    properties: {
      pool_id: { type: 'integer' }
    },
    required: ['pool_id']
  },
  [URI_TEMPLATES.VESTIGE_CURRENCY_PRICES]: {
    type: 'object',
    properties: {}
  },
  [URI_TEMPLATES.VESTIGE_CURRENCY_PRICE]: {
    type: 'object',
    properties: {
      currency: { type: 'string' },
      timestamp: { type: 'integer' }
    },
    required: ['currency']
  },
  [URI_TEMPLATES.VESTIGE_CURRENCY_HISTORY]: {
    type: 'object',
    properties: {
      currency: { type: 'string' },
      start: { type: 'integer' },
      end: { type: 'integer' }
    },
    required: ['currency']
  },
  [URI_TEMPLATES.VESTIGE_VAULT]: {
    type: 'object',
    properties: {
      vault_id: { type: 'integer' }
    },
    required: ['vault_id']
  },
  [URI_TEMPLATES.VESTIGE_VAULTS_RECENT]: {
    type: 'object',
    properties: {
      owner: { type: 'string' },
      include_all: { type: 'boolean' }
    }
  }
};

// Handle Vestige Resources
export async function handleVestigeResources(uri: string): Promise<ResourceContent[]> {
  const match = uri.match(/^algorand:\/\/vestige\/([^/]+)(?:\/(.+))?$/);
  if (!match) {
    throw new McpError(ErrorCode.InvalidRequest, `Invalid Vestige URI format: ${uri}`);
  }

  const [, resourceType, params] = match;

  try {
    let result;

    switch (resourceType) {
      case 'providers':
        if (!params) {
          result = await handleVestigeTools('resource_vestige_view_providers', {});
        } else if (params.startsWith('tvl/')) {
          const period = params.split('/')[1];
          result = await handleVestigeTools(`resource_vestige_view_providers_tvl_simple_${period}`, {});
        } else {
          throw new McpError(ErrorCode.InvalidRequest, `Invalid providers URI format: ${uri}`);
        }
        break;

      case 'assets':
        if (!params) {
          result = await handleVestigeTools('resource_vestige_view_assets', {});
        } else if (params === 'list') {
          result = await handleVestigeTools('resource_vestige_view_assets_list', {});
        } else if (params.startsWith('search/')) {
          const query = params.split('/')[1];
          result = await handleVestigeTools('resource_vestige_view_assets_by_name', { query });
        } else {
          result = await handleVestigeTools('resource_vestige_view_asset', { asset_id: parseInt(params) });
        }
        break;

      case 'pools':
        if (params === 'volumes') {
          result = await handleVestigeTools('resource_vestige_view_pool_volumes', {});
        } else if (params.includes('/info')) {
          const pool_id = parseInt(params);
          result = await handleVestigeTools('resource_vestige_view_pool', { pool_id });
        } else {
          result = await handleVestigeTools('resource_vestige_view_pools', { provider: params });
        }
        break;

      case 'currency':
        if (params === 'prices') {
          result = await handleVestigeTools('resource_vestige_view_currency_prices', {});
        } else {
          const [currency, action] = params.split('/');
          if (action === 'price') {
            result = await handleVestigeTools('resource_vestige_view_currency_price', { currency });
          } else if (action === 'history') {
            result = await handleVestigeTools('resource_vestige_view_currency_price_history', { currency });
          } else {
            throw new McpError(ErrorCode.InvalidRequest, `Invalid currency URI format: ${uri}`);
          }
        }
        break;

      case 'vaults':
        if (params === 'recent') {
          result = await handleVestigeTools('resource_vestige_view_recent_vaults', {});
        } else {
          result = await handleVestigeTools('resource_vestige_view_vault', { vault_id: parseInt(params) });
        }
        break;

      default:
        throw new McpError(ErrorCode.InvalidRequest, `Unknown Vestige resource type: ${resourceType}`);
    }

    return [{
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(result)
    }];
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle Vestige resource: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
