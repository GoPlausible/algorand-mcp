import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';

const PERA_API_BASE = 'https://mainnet.api.perawallet.app/v1/public';

export const peraAssetTools: Tool[] = [
  {
    name: 'api_pera_asset_verification_status',
    description: 'Get the verification status of an Algorand mainnet asset from Pera Wallet. Returns verification tier (verified, trusted, suspicious, unverified) and explorer URL.',
    inputSchema: {
      type: 'object',
      properties: {
        assetId: {
          type: 'integer',
          description: 'Asset ID to check verification status',
        },
      },
      required: ['assetId'],
    },
  },
  {
    name: 'api_pera_verified_asset_details',
    description: 'Get detailed information about an Algorand mainnet asset from Pera Wallet, including name, unit name, decimals, total supply, USD value, logo, verification tier, and collectible status.',
    inputSchema: {
      type: 'object',
      properties: {
        assetId: {
          type: 'integer',
          description: 'Asset ID to get detailed information',
        },
      },
      required: ['assetId'],
    },
  },
  {
    name: 'api_pera_verified_asset_search',
    description: 'Search Pera Wallet verified Algorand mainnet assets by name, unit name, or keyword. Returns matching assets with verification status, USD value, and logo.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query — asset name, unit name, or keyword',
        },
        verifiedOnly: {
          type: 'boolean',
          description: 'If true, only return assets with "verified" or "trusted" tier (default: false)',
        },
      },
      required: ['query'],
    },
  },
];

export async function handlePeraAssetTools(args: any): Promise<any> {
  const name = args.name;

  switch (name) {
    case 'api_pera_asset_verification_status': {
      const { assetId } = args;
      if (!assetId && assetId !== 0) {
        throw new McpError(ErrorCode.InvalidParams, 'assetId is required');
      }

      const response = await fetch(`${PERA_API_BASE}/asset-verifications/${assetId}/`);

      if (!response.ok) {
        if (response.status === 404) {
          return {
            asset_id: assetId,
            verification_tier: 'unverified',
            explorer_url: `https://explorer.perawallet.app/asset/${assetId}/`,
            message: 'Asset not found in Pera verification database',
          };
        }
        throw new McpError(
          ErrorCode.InternalError,
          `Pera API request failed with status: ${response.status}`
        );
      }

      const data = await response.json() as any;
      return {
        asset_id: data.asset_id,
        verification_tier: data.verification_tier,
        explorer_url: data.explorer_url,
      };
    }

    case 'api_pera_verified_asset_details': {
      const { assetId } = args;
      if (!assetId && assetId !== 0) {
        throw new McpError(ErrorCode.InvalidParams, 'assetId is required');
      }

      const response = await fetch(`${PERA_API_BASE}/assets/${assetId}/`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Asset with ID ${assetId} not found in Pera Wallet database`
          );
        }
        throw new McpError(
          ErrorCode.InternalError,
          `Pera API request failed with status: ${response.status}`
        );
      }

      return await response.json();
    }

    case 'api_pera_verified_asset_search': {
      const { query, verifiedOnly } = args;
      if (!query) {
        throw new McpError(ErrorCode.InvalidParams, 'query is required');
      }

      const url = `${PERA_API_BASE}/assets/?search=${encodeURIComponent(query)}&limit=50&has_collectible=false`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new McpError(
          ErrorCode.InternalError,
          `Pera API search failed with status: ${response.status}`
        );
      }

      const data = await response.json() as any;
      let results = data.results || [];

      if (verifiedOnly) {
        results = results.filter(
          (a: any) => a.verification_tier === 'verified' || a.verification_tier === 'trusted'
        );
      }

      return results.map((a: any) => ({
        asset_id: a.asset_id,
        name: a.name,
        unit_name: a.unit_name,
        decimals: a.fraction_decimals,
        verification_tier: a.verification_tier,
        usd_value: a.usd_value,
        logo: a.logo,
        creator_address: a.creator_address,
        is_deleted: a.is_deleted,
      }));
    }

    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown Pera tool: ${name}`
      );
  }
}
