/**
 * Alpha Arcade read-only market tools: get_live_markets, get_reward_markets, get_market, get_orderbook
 */
import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { extractNetwork } from '../../../algorand-client.js';
import { withCommonParams } from '../../commonParams.js';
import {
  createReadOnlyClient,
  formatPriceFromProb,
  ALPHA_API_KEY,
} from './alphaClient.js';

export const marketTools: Tool[] = [
  {
    name: 'alpha_get_live_markets',
    description: 'Fetch all live Alpha Arcade prediction markets. Returns summary: id, title, marketAppId, prices, volume. Multi-choice markets have an options[] array — use options[].marketAppId for trading.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {},
      required: [],
    }),
  },
  {
    name: 'alpha_get_reward_markets',
    description: 'Fetch Alpha Arcade markets with liquidity rewards (totalRewards, rewardsPaidOut, etc.). Same shape as alpha_get_live_markets but includes reward info. Requires ALPHA_API_KEY.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {},
      required: [],
    }),
  },
  {
    name: 'alpha_get_market',
    description: 'Fetch full details for a single Alpha Arcade prediction market. Pass marketAppId (numeric, always required) and optionally marketId (UUID) for richer API data.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: {
          type: 'number',
          description: 'The market application ID (numeric, always required)',
        },
        marketId: {
          type: 'string',
          description: 'The market UUID (optional, used for API mode when ALPHA_API_KEY is set)',
        },
      },
      required: ['marketAppId'],
    }),
  },
  {
    name: 'alpha_get_orderbook',
    description: 'Fetch the on-chain orderbook as a unified YES-perspective view. Merges all 4 sides (YES bids/asks + NO bids/asks). Includes spread calculation.',
    inputSchema: withCommonParams({
      type: 'object',
      properties: {
        marketAppId: {
          type: 'number',
          description: 'The market app ID',
        },
      },
      required: ['marketAppId'],
    }),
  },
];

function formatMarketSummary(m: any): Record<string, unknown> {
  const vol = typeof m.volume === 'number' ? m.volume : Number.parseFloat(String(m.volume ?? ''));
  const entry: Record<string, unknown> = {
    id: m.id,
    title: m.title || `Market ${m.marketAppId}`,
    marketAppId: m.marketAppId,
    image: m.image,
    yesAssetId: m.yesAssetId || undefined,
    noAssetId: m.noAssetId || undefined,
    yesPrice: m.yesProb != null ? formatPriceFromProb(m.yesProb) : undefined,
    noPrice: m.noProb != null ? formatPriceFromProb(m.noProb) : undefined,
    volume: !Number.isNaN(vol) ? `$${vol.toFixed(2)}` : undefined,
    endsAt: m.endTs ? new Date(m.endTs * 1000).toISOString() : undefined,
    isResolved: m.isResolved ?? false,
    source: m.source ?? 'unknown',
  };
  if (m.categories?.length) entry.categories = m.categories;
  if (m.feeBase != null) entry.feeBase = m.feeBase;
  if (m.options?.length) {
    entry.options = m.options.map((o: any) => ({
      title: o.title || `Option ${o.marketAppId}`,
      marketAppId: o.marketAppId,
      yesAssetId: o.yesAssetId,
      noAssetId: o.noAssetId,
    }));
  }
  return entry;
}

export async function handleMarketTools(args: any): Promise<any> {
  const { name, marketAppId, marketId } = args;
  const network = extractNetwork(args);
  const client = createReadOnlyClient(network);

  switch (name) {
    case 'alpha_get_live_markets': {
      let markets: any[];
      try {
        markets = await client.getLiveMarkets();
      } catch (apiErr: any) {
        if (ALPHA_API_KEY) {
          markets = await client.getMarketsOnChain();
        } else {
          throw apiErr;
        }
      }
      const summary = markets.map(formatMarketSummary);
      return { markets: summary, type: 'live' };
    }

    case 'alpha_get_reward_markets': {
      if (!ALPHA_API_KEY) {
        return { error: 'Reward markets require an ALPHA_API_KEY. Set it in your environment to access reward market data.' };
      }
      const markets = await client.getRewardMarkets();
      const summary = markets.map((m) => {
        const entry = formatMarketSummary(m);
        if (m.totalRewards != null) entry.totalRewards = m.totalRewards;
        if (m.rewardsPaidOut != null) entry.rewardsPaidOut = m.rewardsPaidOut;
        if (m.rewardsSpreadDistance != null) entry.rewardsSpreadDistance = m.rewardsSpreadDistance;
        if (m.rewardsMinContracts != null) entry.rewardsMinContracts = m.rewardsMinContracts;
        if (m.lastRewardAmount != null) entry.lastRewardAmount = m.lastRewardAmount;
        if (m.lastRewardTs != null) entry.lastRewardTs = new Date(m.lastRewardTs).toISOString();
        return entry;
      });
      return { markets: summary, type: 'reward' };
    }

    case 'alpha_get_market': {
      if (!marketAppId) {
        throw new McpError(ErrorCode.InvalidParams, 'marketAppId is required');
      }
      let market: any = null;

      if (ALPHA_API_KEY && marketId) {
        try {
          market = await client.getMarketFromApi(marketId);
        } catch {
          // fall through to on-chain
        }
      }
      if (!market) {
        market = await client.getMarketOnChain(marketAppId).catch(() => null);
      }
      if (!market) {
        return { error: `Market ${marketAppId} not found.` };
      }
      return market;
    }

    case 'alpha_get_orderbook': {
      if (!marketAppId) {
        throw new McpError(ErrorCode.InvalidParams, 'marketAppId is required');
      }
      const book = await client.getOrderbook(marketAppId);

      type RawEntry = { price: number; quantity: number; escrowAppId: number; owner: string };
      type UnifiedEntry = { price: string; priceRaw: number; shares: string; total: string; escrowAppId: number; owner: string; source: string };

      const toUnified = (e: RawEntry, source: string, priceOverride?: number): UnifiedEntry => {
        const p = priceOverride ?? e.price;
        const priceCents = p / 1_000_000;
        const shares = e.quantity / 1_000_000;
        return {
          price: `${(priceCents * 100).toFixed(2)}¢`,
          priceRaw: p,
          shares: `${shares.toFixed(2)}`,
          total: `$${(priceCents * shares).toFixed(2)}`,
          escrowAppId: e.escrowAppId,
          owner: e.owner,
          source,
        };
      };

      const asks: UnifiedEntry[] = [
        ...book.yes.asks.map((e: RawEntry) => toUnified(e, 'YES ask')),
        ...book.no.bids.map((e: RawEntry) => toUnified(e, 'NO bid (= YES ask)', 1_000_000 - e.price)),
      ].sort((a, b) => a.priceRaw - b.priceRaw);

      const bids: UnifiedEntry[] = [
        ...book.yes.bids.map((e: RawEntry) => toUnified(e, 'YES bid')),
        ...book.no.asks.map((e: RawEntry) => toUnified(e, 'NO ask (= YES bid)', 1_000_000 - e.price)),
      ].sort((a, b) => b.priceRaw - a.priceRaw);

      const bestAsk = asks.length > 0 ? asks[0].priceRaw : null;
      const bestBid = bids.length > 0 ? bids[0].priceRaw : null;
      const spread = bestAsk != null && bestBid != null
        ? `${((bestAsk - bestBid) / 10_000).toFixed(2)}¢`
        : 'N/A';

      const totalOrders = book.yes.bids.length + book.yes.asks.length + book.no.bids.length + book.no.asks.length;
      return { unified: { asks, bids, spread }, totalOrders, marketAppId };
    }

    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown Alpha market tool: ${name}`);
  }
}
