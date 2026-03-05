import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import algosdk from 'algosdk';
import { RouterClient } from '@txnlab/haystack-router';
import { extractNetwork } from '../../../algorand-client.js';
import { WalletManager } from '../../walletManager.js';
import { withCommonParams } from '../../commonParams.js';
import { getRouterClient } from './routerClient.js';

export const swapTools: Tool[] = [
  {
    name: 'api_haystack_execute_swap',
    description: 'Execute an optimized token swap via Haystack Router — gets the best route across multiple DEXes (Tinyman V2, Pact, Folks) and LST protocols, then signs and submits the atomic transaction group using the active wallet account. This is an all-in-one tool: quote → sign → submit → confirm. All amounts are in base units (e.g., 1000000 = 1 ALGO).',
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
        slippage: {
          type: 'number',
          description: 'Slippage tolerance percentage (e.g., 1 = 1%). Recommended: 0.5-1% stable pairs, 1-3% volatile, 3-5% low liquidity',
          default: 1
        },
        type: {
          type: 'string',
          enum: ['fixed-input', 'fixed-output'],
          description: 'Quote type: fixed-input (specify input, default) or fixed-output (specify desired output)',
          default: 'fixed-input'
        },
        note: {
          type: 'string',
          description: 'Optional note to attach to the input transaction (plain text)'
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

export async function handleSwapTools(args: any): Promise<any> {
  const {
    name,
    fromASAID,
    toASAID,
    amount,
    slippage = 1,
    type = 'fixed-input',
    note,
    maxGroupSize,
    maxDepth,
  } = args;

  const network = extractNetwork(args);

  if (network === 'localnet') {
    throw new McpError(ErrorCode.InvalidRequest, 'Haystack Router is not available on localnet');
  }

  if (name === 'api_haystack_execute_swap') {
    try {
      // 1. Get active wallet account and secret key
      const account = await WalletManager.getActiveWalletAccount();
      const sk = await WalletManager.getActiveWalletSecretKey();
      const address = account.address;

      // 2. Create a signer using the wallet's secret key
      const signer = async (
        txnGroup: algosdk.Transaction[],
        indexesToSign: number[],
      ): Promise<Uint8Array[]> => {
        return indexesToSign.map(
          (index) => algosdk.signTransaction(txnGroup[index], sk).blob,
        );
      };

      // 3. Get router client and fetch quote
      const router = getRouterClient(network);

      const quoteParams: any = {
        fromASAID,
        toASAID,
        amount: BigInt(amount),
        type,
        address,
      };
      if (maxGroupSize !== undefined) quoteParams.maxGroupSize = maxGroupSize;
      if (maxDepth !== undefined) quoteParams.maxDepth = maxDepth;

      const quote = await router.newQuote(quoteParams);

      // 4. Check spending limits (estimate based on input amount for ALGO sends)
      const estimatedSpend = fromASAID === 0 ? Number(amount) : 0;
      WalletManager.checkWalletSpendingLimits(account, estimatedSpend);

      // 5. Build and execute swap
      const swapConfig: any = {
        quote,
        address,
        signer,
        slippage,
      };
      if (note) {
        swapConfig.note = new TextEncoder().encode(note);
      }

      const swap = await router.newSwap(swapConfig);
      const result = await swap.execute();

      // 6. Record spend
      await WalletManager.recordWalletSpend(address, estimatedSpend);

      // 7. Get swap summary
      const summary = swap.getSummary();
      const inputTxnId = swap.getInputTransactionId();

      // 8. Build response
      const response: any = {
        status: 'confirmed',
        confirmedRound: result.confirmedRound.toString(),
        txIds: result.txIds,
        signer: address,
        nickname: account.nickname,
        network,
        quote: {
          fromASAID: quote.fromASAID,
          toASAID: quote.toASAID,
          expectedOutput: quote.quote.toString(),
          inputAmount: quote.amount.toString(),
          type: quote.type,
          usdIn: quote.usdIn,
          usdOut: quote.usdOut,
          userPriceImpact: quote.userPriceImpact,
          route: quote.flattenedRoute,
        },
        slippage,
      };

      if (summary) {
        response.summary = {
          inputAssetId: summary.inputAssetId.toString(),
          outputAssetId: summary.outputAssetId.toString(),
          inputAmount: summary.inputAmount.toString(),
          outputAmount: summary.outputAmount.toString(),
          totalFees: summary.totalFees.toString(),
          transactionCount: summary.transactionCount,
          inputTxnId: summary.inputTxnId,
          outputTxnId: summary.outputTxnId,
        };
      }

      if (inputTxnId) {
        response.inputTransactionId = inputTxnId;
      }

      return response;
    } catch (error) {
      if (error instanceof McpError) throw error;
      throw new McpError(
        ErrorCode.InternalError,
        `Haystack swap failed: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  throw new McpError(
    ErrorCode.MethodNotFound,
    `Unknown Haystack swap tool: ${name}`
  );
}
