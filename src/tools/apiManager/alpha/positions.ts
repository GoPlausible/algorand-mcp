/**
 * Alpha Arcade position and order query tools: get_open_orders, get_positions
 */
import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { extractNetwork } from '../../../algorand-client.js';
import { withCommonParams } from '../../commonParams.js';
import {
  createReadOnlyClient,
  resolveWalletAddress,
  formatPrice,
  formatQty,
} from './alphaClient.js';

export const positionTools: Tool[] = [
  {
    name: 'alpha_get_open_orders',
    description: 'Fetch all open orders for a wallet on a specific Alpha Arcade market. Uses your active MCP wallet if walletAddress is not provided.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: {
          type: 'number',
          description: 'The market app ID',
        },
        walletAddress: {
          type: 'string',
          description: 'Algorand wallet address (uses active MCP wallet if omitted)',
        },
      },
      required: ['marketAppId'],
    }),
  },
  {
    name: 'alpha_get_positions',
    description: 'Fetch all YES/NO token positions for a wallet across all Alpha Arcade markets. Uses your active MCP wallet if walletAddress is not provided.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        walletAddress: {
          type: 'string',
          description: 'Algorand wallet address (uses active MCP wallet if omitted)',
        },
      },
      required: [],
    }),
  },
];

export async function handlePositionTools(args: any): Promise<any> {
  const { name, marketAppId, walletAddress } = args;
  const network = extractNetwork(args);
  const client = createReadOnlyClient(network);

  switch (name) {
    case 'alpha_get_open_orders': {
      if (!marketAppId) {
        throw new McpError(ErrorCode.InvalidParams, 'marketAppId is required');
      }
      const address = await resolveWalletAddress(walletAddress);
      const orders = await client.getOpenOrders(marketAppId, address);
      const formatted = orders.map((o: any) => ({
        escrowAppId: o.escrowAppId,
        position: o.position === 1 ? 'YES' : 'NO',
        side: o.side === 1 ? 'BUY' : 'SELL',
        price: formatPrice(o.price),
        quantity: formatQty(o.quantity),
        filled: formatQty(o.quantityFilled),
        remaining: formatQty(o.quantity - o.quantityFilled),
      }));
      return { orders: formatted, marketAppId, walletAddress: address };
    }

    case 'alpha_get_positions': {
      const address = await resolveWalletAddress(walletAddress);
      const positions = await client.getPositions(address);
      const formatted = positions.map((p: any) => ({
        marketAppId: p.marketAppId,
        title: p.title || `Market ${p.marketAppId}`,
        yesBalance: formatQty(p.yesBalance),
        noBalance: formatQty(p.noBalance),
        yesAssetId: p.yesAssetId,
        noAssetId: p.noAssetId,
      }));
      return { positions: formatted, walletAddress: address };
    }

    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown Alpha position tool: ${name}`);
  }
}
