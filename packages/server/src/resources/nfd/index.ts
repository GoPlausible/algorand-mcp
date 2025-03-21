import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResourceDefinition, ResourceContent } from '../types.js';
import { URI_TEMPLATES } from '../uri-config.js';
import { handleNFDTools } from '../../tools/resource_tools/nfd/index.js';

// NFD Resources
export const nfdResources: ResourceDefinition[] = [
  {
    uri: URI_TEMPLATES.NFD_GET,
    name: 'Get NFD by name or ID',
    description: 'Get a specific NFD by name or by its application ID',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.NFD_ADDRESS,
    name: 'Get NFDs for address',
    description: 'Get NFDs owned by specific addresses',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.NFD_ACTIVITY,
    name: 'Get NFD activity',
    description: 'Get activity/changes for NFDs',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.NFD_ANALYTICS,
    name: 'Get NFD analytics',
    description: 'Get analytics data for NFDs',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.NFD_BROWSE,
    name: 'Browse NFDs',
    description: 'Browse NFDs with various filters',
    mimeType: 'application/json'
  },
  {
    uri: URI_TEMPLATES.NFD_SEARCH,
    name: 'Search NFDs',
    description: 'Search NFDs with various filters',
    mimeType: 'application/json'
  }
];

// NFD Resource Schemas
export const nfdResourceSchemas = {
  [URI_TEMPLATES.NFD_GET]: {
    type: 'object',
    properties: {
      nameOrID: { type: 'string' },
      view: { type: 'string', enum: ['tiny', 'brief', 'full'] },
      poll: { type: 'boolean' },
      nocache: { type: 'boolean' }
    },
    required: ['nameOrID']
  },
  [URI_TEMPLATES.NFD_ADDRESS]: {
    type: 'object',
    properties: {
      address: { type: 'array', items: { type: 'string' } },
      limit: { type: 'integer' },
      view: { type: 'string', enum: ['tiny', 'thumbnail', 'brief', 'full'] }
    },
    required: ['address']
  },
  [URI_TEMPLATES.NFD_ACTIVITY]: {
    type: 'object',
    properties: {
      name: { type: 'array', items: { type: 'string' } },
      type: { type: 'string', enum: ['changes'] },
      afterTime: { type: 'string', format: 'date-time' },
      limit: { type: 'integer' },
      sort: { type: 'string', enum: ['timeDesc', 'timeAsc'] }
    },
    required: ['name']
  },
  [URI_TEMPLATES.NFD_ANALYTICS]: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      buyer: { type: 'string' },
      seller: { type: 'string' },
      event: { type: 'array', items: { type: 'string' } },
      requireBuyer: { type: 'boolean' },
      includeOwner: { type: 'boolean' },
      excludeNFDAsSeller: { type: 'boolean' },
      category: { type: 'array', items: { type: 'string', enum: ['curated', 'premium', 'common'] } },
      minPrice: { type: 'integer' },
      maxPrice: { type: 'integer' },
      limit: { type: 'integer' },
      offset: { type: 'integer' },
      sort: { type: 'string', enum: ['timeDesc', 'priceAsc', 'priceDesc'] }
    }
  },
  [URI_TEMPLATES.NFD_BROWSE]: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      category: { type: 'array', items: { type: 'string', enum: ['curated', 'premium', 'common'] } },
      saleType: { type: 'array', items: { type: 'string', enum: ['auction', 'buyItNow'] } },
      state: { type: 'array', items: { type: 'string', enum: ['reserved', 'forSale', 'owned', 'expired'] } },
      owner: { type: 'string' },
      minPrice: { type: 'integer' },
      maxPrice: { type: 'integer' },
      limit: { type: 'integer' },
      offset: { type: 'integer' },
      sort: { type: 'string', enum: ['createdDesc', 'timeChangedDesc', 'soldDesc', 'priceAsc', 'priceDesc', 'highestSaleDesc', 'saleTypeAsc'] },
      view: { type: 'string', enum: ['tiny', 'brief', 'full'] }
    }
  },
  [URI_TEMPLATES.NFD_SEARCH]: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      category: { type: 'array', items: { type: 'string', enum: ['curated', 'premium', 'common'] } },
      saleType: { type: 'array', items: { type: 'string', enum: ['auction', 'buyItNow'] } },
      state: { type: 'array', items: { type: 'string', enum: ['reserved', 'forSale', 'owned', 'expired'] } },
      owner: { type: 'string' },
      minPrice: { type: 'integer' },
      maxPrice: { type: 'integer' },
      limit: { type: 'integer' },
      offset: { type: 'integer' },
      sort: { type: 'string', enum: ['createdDesc', 'timeChangedDesc', 'soldDesc', 'priceAsc', 'priceDesc', 'highestSaleDesc', 'saleTypeAsc'] },
      view: { type: 'string', enum: ['tiny', 'brief', 'full'] }
    }
  }
};

// Handle NFD Resources
export async function handleNFDResources(uri: string): Promise<ResourceContent[]> {
  const match = uri.match(/^algorand:\/\/nfd\/([^/]+)\/(.+)$/);
  if (!match) {
    throw new McpError(ErrorCode.InvalidRequest, `Invalid NFD URI format: ${uri}`);
  }

  const [, resourceType, params] = match;

  try {
    let result;
    switch (resourceType) {
      case 'nfd':
        result = await handleNFDTools('resource_nfd_get_nfd', { nameOrID: params });
        break;
      case 'address': {
        const addressMatch = params.match(/^([^/]+)\/nfds$/);
        if (!addressMatch) {
          throw new McpError(ErrorCode.InvalidRequest, 'Invalid address NFD URI format');
        }
        result = await handleNFDTools('resource_nfd_get_nfds_for_addresses', { address: [addressMatch[1]] });
        break;
      }
      case 'activity':
        result = await handleNFDTools('resource_nfd_get_nfd_activity', { name: [params] });
        break;
      case 'analytics':
        result = await handleNFDTools('resource_nfd_get_nfd_analytics', {});
        break;
      case 'browse':
        result = await handleNFDTools('resource_nfd_browse_nfds', {});
        break;
      case 'search':
        result = await handleNFDTools('resource_nfd_search_nfds', {});
        break;
      default:
        throw new McpError(ErrorCode.InvalidRequest, `Unknown NFD resource type: ${resourceType}`);
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
      `Failed to handle NFD resource: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
