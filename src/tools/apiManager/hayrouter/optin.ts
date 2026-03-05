import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { extractNetwork } from '../../../algorand-client.js';
import { withCommonParams } from '../../commonParams.js';
import { getRouterClient } from './routerClient.js';

export const optinTools: Tool[] = [
  {
    name: 'api_haystack_needs_optin',
    description: 'Check if an Algorand address needs to opt into an asset before swapping. Returns true if opt-in is needed, false otherwise. Always returns false for ALGO (ASA 0). Use before executing a swap to determine if wallet_optin_asset should be called first.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description: 'Algorand address to check'
        },
        assetId: {
          type: 'integer',
          description: 'Asset ID to check opt-in status for'
        }
      },
      required: ['address', 'assetId']
    })
  }
];

export async function handleOptinTools(args: any): Promise<any> {
  const { name, address, assetId } = args;

  const network = extractNetwork(args);

  if (network === 'localnet') {
    throw new McpError(ErrorCode.InvalidRequest, 'Haystack Router is not available on localnet');
  }

  if (name === 'api_haystack_needs_optin') {
    try {
      const router = getRouterClient(network);
      const needsOptIn = await router.needsAssetOptIn(address, assetId);

      return {
        address,
        assetId,
        needsOptIn,
        network,
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to check asset opt-in: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  throw new McpError(
    ErrorCode.MethodNotFound,
    `Unknown Haystack opt-in tool: ${name}`
  );
}
