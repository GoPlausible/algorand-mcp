/**
 * Alpha Arcade trading tools: create_limit_order, create_market_order, cancel_order, amend_order, propose_match
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

export const tradingTools: Tool[] = [
  {
    name: 'alpha_create_limit_order',
    description: 'Place a limit order on an Alpha Arcade prediction market. Price and quantity in microunits (500000 = $0.50, 1000000 = 1 share). Locks ~0.957 ALGO collateral. Returns escrowAppId — save it for cancel_order.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: { type: 'number', description: 'The market app ID' },
        position: { type: 'number', enum: [0, 1], description: '1 = Yes, 0 = No' },
        price: { type: 'number', description: 'Price in microunits (e.g. 500000 = $0.50)' },
        quantity: { type: 'number', description: 'Quantity in microunits (e.g. 1000000 = 1 share)' },
        isBuying: { type: 'boolean', description: 'true = buy order, false = sell order' },
      },
      required: ['marketAppId', 'position', 'price', 'quantity', 'isBuying'],
    }),
  },
  {
    name: 'alpha_create_market_order',
    description: 'Place a market order with auto-matching on Alpha Arcade. Price, quantity, and slippage in microunits. Returns escrowAppId, matched quantity, and actual fill price.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: { type: 'number', description: 'The market app ID' },
        position: { type: 'number', enum: [0, 1], description: '1 = Yes, 0 = No' },
        price: { type: 'number', description: 'Price in microunits (e.g. 500000 = $0.50)' },
        quantity: { type: 'number', description: 'Quantity in microunits (e.g. 1000000 = 1 share)' },
        isBuying: { type: 'boolean', description: 'true = buy order, false = sell order' },
        slippage: { type: 'number', description: 'Slippage tolerance in microunits (e.g. 50000 = $0.05)' },
      },
      required: ['marketAppId', 'position', 'price', 'quantity', 'isBuying', 'slippage'],
    }),
  },
  {
    name: 'alpha_cancel_order',
    description: 'Cancel an open Alpha Arcade order. Requires escrowAppId and orderOwner. Refunds USDC/tokens and ~0.957 ALGO collateral.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: { type: 'number', description: 'The market app ID' },
        escrowAppId: { type: 'number', description: 'The escrow app ID of the order to cancel' },
        orderOwner: { type: 'string', description: 'The Algorand address that owns the order' },
      },
      required: ['marketAppId', 'escrowAppId', 'orderOwner'],
    }),
  },
  {
    name: 'alpha_amend_order',
    description: 'Edit an existing unfilled Alpha Arcade order in-place (change price, quantity, or slippage). Faster than cancel + recreate.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: { type: 'number', description: 'The market app ID' },
        escrowAppId: { type: 'number', description: 'The escrow app ID of the order to amend' },
        price: { type: 'number', description: 'New price in microunits' },
        quantity: { type: 'number', description: 'New quantity in microunits' },
        slippage: { type: 'number', description: 'New slippage in microunits (default 0)' },
      },
      required: ['marketAppId', 'escrowAppId', 'price', 'quantity'],
    }),
  },
  {
    name: 'alpha_propose_match',
    description: 'Propose a match between an existing maker order and your wallet as taker on Alpha Arcade.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: { type: 'number', description: 'The market app ID' },
        makerEscrowAppId: { type: 'number', description: 'The escrow app ID of the maker order' },
        makerAddress: { type: 'string', description: 'The Algorand address of the maker' },
        quantityMatched: { type: 'number', description: 'Quantity to match in microunits' },
      },
      required: ['marketAppId', 'makerEscrowAppId', 'makerAddress', 'quantityMatched'],
    }),
  },
];

export async function handleTradingTools(args: any): Promise<any> {
  const { name } = args;
  const network = extractNetwork(args);

  switch (name) {
    case 'alpha_create_limit_order': {
      const { marketAppId, position, price, quantity, isBuying } = args;
      const safePrice = Math.max(0, Math.round(price));
      const safeQty = Math.max(0, Math.round(quantity));

      if (safePrice <= 0 || safePrice > 1_000_000) {
        return { error: `Invalid price: ${price}. Price must be between 1 and 1000000 microunits ($0.000001–$1.00).` };
      }
      if (safeQty <= 0 || safeQty > 1_000_000_000_000) {
        return { error: `Invalid quantity: ${quantity}. Quantity must be positive and reasonable.` };
      }

      try {
        const client = await createTradingClient(network);
        const result = await client.createLimitOrder({
          marketAppId,
          position: position as 0 | 1,
          price: safePrice,
          quantity: safeQty,
          isBuying,
        });
        const posLabel = position === 1 ? 'YES' : 'NO';
        const sideLabel = isBuying ? 'BUY' : 'SELL';
        return {
          type: 'limit',
          marketAppId,
          escrowAppId: result.escrowAppId,
          position: posLabel,
          side: sideLabel,
          price: formatPrice(price),
          quantity: formatQty(quantity),
          txIds: result.txIds,
          confirmedRound: result.confirmedRound,
        };
      } catch (error: any) {
        return { error: `Error creating limit order: ${friendlyTradeError(error.message)}` };
      }
    }

    case 'alpha_create_market_order': {
      const { marketAppId, position, price, quantity, isBuying, slippage } = args;
      const safePrice = Math.max(0, Math.round(price));
      const safeQty = Math.max(0, Math.round(quantity));
      const safeSlip = Math.max(0, Math.round(slippage));

      if (safePrice <= 0 || safePrice > 1_000_000) {
        return { error: `Invalid price: ${price}. Price must be between 1 and 1000000 microunits ($0.000001–$1.00).` };
      }
      if (safeQty <= 0 || safeQty > 1_000_000_000_000) {
        return { error: `Invalid quantity: ${quantity}. Quantity must be positive and reasonable.` };
      }
      const estFund = Math.floor((safeQty * (safePrice + safeSlip)) / 1_000_000);
      if (estFund < 0 || estFund > Number.MAX_SAFE_INTEGER) {
        return { error: `Computed fund amount (${estFund}) would overflow. Reduce your trade amount.` };
      }

      try {
        const client = await createTradingClient(network);
        const result = await client.createMarketOrder({
          marketAppId,
          position: position as 0 | 1,
          price: safePrice,
          quantity: safeQty,
          isBuying,
          slippage: safeSlip,
        });
        const posLabel = position === 1 ? 'YES' : 'NO';
        const sideLabel = isBuying ? 'BUY' : 'SELL';
        return {
          type: 'market',
          marketAppId,
          escrowAppId: result.escrowAppId,
          position: posLabel,
          side: sideLabel,
          price: formatPrice(price),
          quantity: formatQty(quantity),
          fillPrice: formatPrice(result.matchedPrice ?? 0),
          matchedQuantity: formatQty(result.matchedQuantity ?? 0),
          txIds: result.txIds,
          confirmedRound: result.confirmedRound,
        };
      } catch (error: any) {
        return { error: `Error creating market order: ${friendlyTradeError(error.message)}` };
      }
    }

    case 'alpha_cancel_order': {
      const { marketAppId, escrowAppId, orderOwner } = args;
      try {
        const client = await createTradingClient(network);
        const result = await client.cancelOrder({ marketAppId, escrowAppId, orderOwner });
        const success = result.success !== false;
        return {
          type: 'cancel',
          success,
          marketAppId,
          escrowAppId,
          orderOwner,
          txIds: result.txIds ?? [],
          confirmedRound: result.confirmedRound ?? 0,
        };
      } catch (error: any) {
        return { error: `Error cancelling order: ${friendlyTradeError(error.message)}` };
      }
    }

    case 'alpha_amend_order': {
      const { marketAppId, escrowAppId, price, quantity, slippage } = args;
      try {
        const client = await createTradingClient(network);
        const result = await client.amendOrder({
          marketAppId,
          escrowAppId,
          price,
          quantity,
          slippage,
        });
        const success = result.success !== false;
        return {
          type: 'amend',
          success,
          marketAppId,
          escrowAppId,
          newPrice: formatPrice(price),
          newQuantity: formatQty(quantity),
          txIds: result.txIds ?? [],
          confirmedRound: result.confirmedRound ?? 0,
        };
      } catch (error: any) {
        return { error: `Error amending order: ${friendlyTradeError(error.message)}` };
      }
    }

    case 'alpha_propose_match': {
      const { marketAppId, makerEscrowAppId, makerAddress, quantityMatched } = args;
      try {
        const client = await createTradingClient(network);
        const result = await client.proposeMatch({
          marketAppId,
          makerEscrowAppId,
          makerAddress,
          quantityMatched,
        });
        const success = result.success !== false;
        return {
          type: 'match',
          success,
          marketAppId,
          makerEscrowAppId,
          makerAddress,
          quantityMatched: formatQty(quantityMatched),
          txIds: result.txIds ?? [],
          confirmedRound: result.confirmedRound ?? 0,
        };
      } catch (error: any) {
        return { error: `Error proposing match: ${error.message || 'Unknown error'}` };
      }
    }

    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown Alpha trading tool: ${name}`);
  }
}
