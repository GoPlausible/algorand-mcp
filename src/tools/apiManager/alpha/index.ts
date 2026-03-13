import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { marketTools, handleMarketTools } from './markets.js';
import { positionTools, handlePositionTools } from './positions.js';
import { tradingTools, handleTradingTools } from './trading.js';
import { shareTools, handleShareTools } from './shares.js';

// Combine all Alpha Arcade tools
export const alphaTools: Tool[] = [
  ...marketTools,
  ...positionTools,
  ...tradingTools,
  ...shareTools,
];

// Handle all Alpha Arcade tools
export async function handleAlphaTools(name: string, args: any): Promise<any> {
  try {
    const combinedArgs = { name, ...args };

    // Market query tools
    if (
      name === 'alpha_get_live_markets' ||
      name === 'alpha_get_reward_markets' ||
      name === 'alpha_get_market' ||
      name === 'alpha_get_orderbook'
    ) {
      return handleMarketTools(combinedArgs);
    }

    // Position/order query tools
    if (name === 'alpha_get_open_orders' || name === 'alpha_get_positions') {
      return handlePositionTools(combinedArgs);
    }

    // Trading tools
    if (
      name === 'alpha_create_limit_order' ||
      name === 'alpha_create_market_order' ||
      name === 'alpha_cancel_order' ||
      name === 'alpha_amend_order' ||
      name === 'alpha_propose_match'
    ) {
      return handleTradingTools(combinedArgs);
    }

    // Share management tools
    if (
      name === 'alpha_split_shares' ||
      name === 'alpha_merge_shares' ||
      name === 'alpha_claim'
    ) {
      return handleShareTools(combinedArgs);
    }

    throw new McpError(
      ErrorCode.MethodNotFound,
      `Unknown Alpha Arcade tool: ${name}`
    );
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle Alpha Arcade tool: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
