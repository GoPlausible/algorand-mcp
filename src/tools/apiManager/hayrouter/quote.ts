import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { extractNetwork } from '../../../algorand-client.js';
import { withCommonParams } from '../../commonParams.js';
import { getRouterClient } from './routerClient.js';

export const quoteTools: Tool[] = [
  {
    name: 'api_haystack_get_swap_quote',
    description: 'Get an optimized swap quote from Haystack Router — a DEX aggregator that finds the best swap route across multiple Algorand DEXes (Tinyman V2, Pact, Folks) and LST protocols (tALGO, xALGO). Returns the best-price quote with route details, USD values, and price impact. Use this to preview a swap before executing. All amounts are in base units (e.g., 1000000 = 1 ALGO).',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        fromASAID: {
          type: 'integer',
          description: 'Input asset ID (0 = ALGO, 31566704 = USDC, 312769 = USDt, etc.)'
        },
        toASAID: {
          type: 'integer',
          description: 'Output asset ID (0 = ALGO, 31566704 = USDC, 312769 = USDt, etc.)'
        },
        amount: {
          type: 'integer',
          description: 'Amount in base units (e.g., 1000000 = 1 ALGO with 6 decimals)'
        },
        type: {
          type: 'string',
          enum: ['fixed-input', 'fixed-output'],
          description: 'Quote type: fixed-input (specify input amount, default) or fixed-output (specify desired output amount)',
          default: 'fixed-input'
        },
        address: {
          type: 'string',
          description: 'User Algorand address (optional, needed for auto opt-in detection)'
        },
        maxGroupSize: {
          type: 'integer',
          description: 'Maximum transactions in atomic group (default: 16)',
          default: 16
        },
        maxDepth: {
          type: 'integer',
          description: 'Maximum routing hops (default: 4)',
          default: 4
        }
      },
      required: ['fromASAID', 'toASAID', 'amount']
    })
  }
];

export async function handleQuoteTools(args: any): Promise<any> {
  const {
    name,
    fromASAID,
    toASAID,
    amount,
    type = 'fixed-input',
    address,
    maxGroupSize,
    maxDepth,
  } = args;

  const network = extractNetwork(args);

  if (network === 'localnet') {
    throw new McpError(ErrorCode.InvalidRequest, 'Haystack Router is not available on localnet');
  }

  const router = getRouterClient(network);

  if (name === 'api_haystack_get_swap_quote') {
    try {
      const quoteParams: any = {
        fromASAID,
        toASAID,
        amount: BigInt(amount),
        type,
      };

      if (address) {
        quoteParams.address = address;
      }
      if (maxGroupSize !== undefined) {
        quoteParams.maxGroupSize = maxGroupSize;
      }
      if (maxDepth !== undefined) {
        quoteParams.maxDepth = maxDepth;
      }

      const quote = await router.newQuote(quoteParams);

      // Serialize the quote response for MCP transport (convert BigInt to string)
      const result: any = {
        expectedOutput: quote.quote.toString(),
        inputAmount: quote.amount.toString(),
        fromASAID: quote.fromASAID,
        toASAID: quote.toASAID,
        type: quote.type,
        usdIn: quote.usdIn,
        usdOut: quote.usdOut,
        userPriceImpact: quote.userPriceImpact,
        marketPriceImpact: quote.marketPriceImpact,
        route: quote.route,
        flattenedRoute: quote.flattenedRoute,
        requiredAppOptIns: quote.requiredAppOptIns,
        protocolFees: quote.protocolFees,
        createdAt: quote.createdAt,
      };

      if (quote.address) {
        result.address = quote.address;
      }

      return result;
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get Haystack swap quote: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  throw new McpError(
    ErrorCode.MethodNotFound,
    `Unknown Haystack Router tool: ${name}`
  );
}
