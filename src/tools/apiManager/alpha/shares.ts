/**
 * Alpha Arcade share management tools: split_shares, merge_shares, claim
 */
import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { extractNetwork } from '../../../algorand-client.js';
import { withCommonParams } from '../../commonParams.js';
import {
  createTradingClient,
  friendlyTradeError,
  formatPrice,
  formatQty,
} from './alphaClient.js';

export const shareTools: Tool[] = [
  {
    name: 'alpha_split_shares',
    description: 'Split USDC into equal YES and NO outcome tokens on Alpha Arcade. 1 USDC (1000000 microunits) = 1 YES + 1 NO.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: { type: 'number', description: 'The market app ID' },
        amount: { type: 'number', description: 'Amount to split in microunits (e.g. 1000000 = $1.00 USDC)' },
      },
      required: ['marketAppId', 'amount'],
    }),
  },
  {
    name: 'alpha_merge_shares',
    description: 'Merge equal YES and NO outcome tokens back into USDC on Alpha Arcade. 1 YES + 1 NO = 1 USDC.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: { type: 'number', description: 'The market app ID' },
        amount: { type: 'number', description: 'Amount to merge in microunits' },
      },
      required: ['marketAppId', 'amount'],
    }),
  },
  {
    name: 'alpha_claim',
    description: 'Claim USDC from a resolved Alpha Arcade market by redeeming outcome tokens. Winning = 1:1 USDC.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: { type: 'number', description: 'The market app ID' },
        assetId: { type: 'number', description: 'The outcome token ASA ID to redeem' },
        amount: { type: 'number', description: 'Amount to claim in microunits (omit to claim entire balance)' },
      },
      required: ['marketAppId', 'assetId'],
    }),
  },
];

export async function handleShareTools(args: any): Promise<any> {
  const { name } = args;
  const network = extractNetwork(args);

  switch (name) {
    case 'alpha_split_shares': {
      const { marketAppId, amount } = args;
      try {
        const client = await createTradingClient(network);
        const result = await client.splitShares({ marketAppId, amount });
        return {
          type: 'split',
          marketAppId,
          amount: formatQty(amount),
          amountUSDC: formatPrice(amount),
          txIds: result.txIds,
          confirmedRound: result.confirmedRound,
        };
      } catch (error: any) {
        return { error: `Error splitting shares: ${friendlyTradeError(error.message)}` };
      }
    }

    case 'alpha_merge_shares': {
      const { marketAppId, amount } = args;
      try {
        const client = await createTradingClient(network);
        const result = await client.mergeShares({ marketAppId, amount });
        return {
          type: 'merge',
          marketAppId,
          amount: formatQty(amount),
          amountUSDC: formatPrice(amount),
          txIds: result.txIds,
          confirmedRound: result.confirmedRound,
        };
      } catch (error: any) {
        return { error: `Error merging shares: ${friendlyTradeError(error.message)}` };
      }
    }

    case 'alpha_claim': {
      const { marketAppId, assetId, amount } = args;
      try {
        const client = await createTradingClient(network);
        const result = await client.claim({ marketAppId, assetId, amount });
        return {
          type: 'claim',
          marketAppId,
          assetId,
          amountRequested: amount != null ? formatQty(amount) : 'Full balance',
          amountClaimed: formatQty(result.amountClaimed),
          txIds: result.txIds,
          confirmedRound: result.confirmedRound,
        };
      } catch (error: any) {
        return { error: `Error claiming: ${friendlyTradeError(error.message)}` };
      }
    }

    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown Alpha share tool: ${name}`);
  }
}
