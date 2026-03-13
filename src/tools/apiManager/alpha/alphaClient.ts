/**
 * Alpha Arcade client factory for the local MCP wallet system.
 * Creates AlphaClient instances backed by the WalletManager keychain signer.
 */
import { AlphaClient } from '@alpha-arcade/sdk';
import algosdk from 'algosdk';
import { getAlgodClient, getIndexerClient, extractNetwork, type NetworkId } from '../../../algorand-client.js';
import { WalletManager } from '../../walletManager.js';

// ── Constants ──────────────────────────────────────────────────────────────

export const MATCHER_APP_ID = 3078581851;
export const USDC_ASSET_ID = 31566704;
export const API_BASE_URL = 'https://platform.alphaarcade.com/api';

// Read optional env vars once
const ALPHA_API_KEY = process.env.ALPHA_API_KEY || '';
const ALPHA_API_BASE_URL = process.env.ALPHA_API_BASE_URL || API_BASE_URL;

// ── Formatting helpers ─────────────────────────────────────────────────────

export const formatPrice = (microunits: number): string => `$${(microunits / 1e6).toFixed(2)}`;
export const formatQty = (microunits: number): string => `${(microunits / 1e6).toFixed(2)} shares`;
export const formatPriceFromProb = (microunits: number): string => `$${(microunits / 1e6).toFixed(2)}`;

// ── Friendly error messages ────────────────────────────────────────────────

export function friendlyTradeError(msg: string): string {
  const m = msg || 'Unknown error';
  const isUsdcError = m.includes(String(USDC_ASSET_ID)) || /usdc/i.test(m);

  const overspendAlgo = m.match(/overspend.*?MicroAlgos:\{Raw:(\d+)\}.*?tried to spend \{(\d+)\}/i);
  if (overspendAlgo) {
    const have = (Number.parseInt(overspendAlgo[1], 10) / 1e6).toFixed(2);
    const need = (Number.parseInt(overspendAlgo[2], 10) / 1e6).toFixed(2);
    return `Insufficient ALGO balance. You have ~${have} ALGO but need ~${need} ALGO (escrow collateral + fees). Please fund your wallet with more ALGO.`;
  }
  const overspendAsset = m.match(/overspend.*?asset.*?(\d+).*?holding:\{Amount:(\d+)\}.*?tried to spend \{(\d+)\}/i);
  if (overspendAsset) {
    const assetId = overspendAsset[1];
    const have = (Number.parseInt(overspendAsset[2], 10) / 1e6).toFixed(2);
    const need = (Number.parseInt(overspendAsset[3], 10) / 1e6).toFixed(2);
    const label = assetId === String(USDC_ASSET_ID) ? 'USDC' : `asset ${assetId}`;
    return `Insufficient ${label} balance. You have ~$${have} but need ~$${need}. Please add more ${label} to your wallet.`;
  }
  if (/overspend/i.test(m)) {
    const label = isUsdcError ? 'USDC' : 'ALGO';
    return `Insufficient ${label} balance to cover this transaction. Please add more ${label} to your wallet.`;
  }
  if (/underflow/i.test(m)) {
    const label = isUsdcError ? 'USDC' : 'token';
    return `Insufficient ${label} balance for this operation. Make sure you hold enough ${label} before trading.`;
  }
  if (/asset \d+ missing/i.test(m) || /not opted in/i.test(m)) {
    if (isUsdcError) return "Your account hasn't opted in to USDC. Please opt in to USDC (asset 31566704) first.";
    return "Your account hasn't opted in to a required asset. Please opt in first.";
  }
  if (/below min/i.test(m) || /min balance/i.test(m)) {
    return 'This transaction would drop your account below the minimum ALGO balance. Please add more ALGO.';
  }
  if (/account.*has been closed/i.test(m) || /dead account/i.test(m)) {
    return 'The target account has been closed and cannot receive transactions.';
  }
  if (/group size/i.test(m)) {
    return 'Transaction group error. Please try again.';
  }
  if (/logic eval error/i.test(m) || /rejected by logic/i.test(m)) {
    return 'The smart contract rejected this transaction. The order parameters may be invalid or the market conditions have changed. Please try again.';
  }
  if (/timeout/i.test(m) || /network/i.test(m) || /ECONNREFUSED/i.test(m)) {
    return 'Network error reaching the Algorand node. Please try again in a moment.';
  }
  return m;
}

// ── Client factories ───────────────────────────────────────────────────────

/**
 * Create a read-only AlphaClient (no signing capability).
 * Used for market queries, orderbook, positions lookups.
 */
export function createReadOnlyClient(network: NetworkId): AlphaClient {
  const algodClient = getAlgodClient(network);
  const indexerClient = getIndexerClient(network);
  const dummySigner: algosdk.TransactionSigner = async () => [];

  return new AlphaClient({
    algodClient,
    indexerClient,
    signer: dummySigner,
    activeAddress: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
    matcherAppId: MATCHER_APP_ID,
    usdcAssetId: USDC_ASSET_ID,
    apiBaseUrl: ALPHA_API_BASE_URL,
    apiKey: ALPHA_API_KEY || undefined,
  });
}

/**
 * Create a trading AlphaClient backed by the local wallet keychain.
 * Uses the active wallet account's secret key for signing.
 */
export async function createTradingClient(network: NetworkId): Promise<AlphaClient> {
  const account = await WalletManager.getActiveWalletAccount();
  const sk = await WalletManager.getActiveWalletSecretKey();
  const address = account.address;

  const algodClient = getAlgodClient(network);
  const indexerClient = getIndexerClient(network);

  const signer: algosdk.TransactionSigner = async (
    txnGroup: algosdk.Transaction[],
    indexesToSign: number[],
  ): Promise<Uint8Array[]> => {
    return indexesToSign.map(
      (idx) => algosdk.signTransaction(txnGroup[idx], sk).blob,
    );
  };

  return new AlphaClient({
    algodClient,
    indexerClient,
    signer,
    activeAddress: address,
    matcherAppId: MATCHER_APP_ID,
    usdcAssetId: USDC_ASSET_ID,
    apiBaseUrl: ALPHA_API_BASE_URL,
    apiKey: ALPHA_API_KEY || undefined,
  });
}

/**
 * Resolve wallet address — uses provided address or falls back to active wallet.
 */
export async function resolveWalletAddress(walletAddress?: string): Promise<string> {
  if (walletAddress) return walletAddress;
  const account = await WalletManager.getActiveWalletAccount();
  return account.address;
}

export { ALPHA_API_KEY };
