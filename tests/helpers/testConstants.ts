/**
 * Well-known addresses, asset IDs, and app IDs for use in tests.
 */

export const TESTNET = {
  /** A well-known funded address on testnet (Algorand dispenser) */
  KNOWN_ADDRESS: 'HZ57J3K46JIJXILONBBZOHX6BKPXEM2VVXNRFSUED6DKFD5ZD24PMJ3MVA',
  /** USDC ASA on testnet */
  USDC_ASSET_ID: 10458941,
  /** A well-known stable app on testnet */
  KNOWN_APP_ID: 6779767,
  /** Fund link for new accounts */
  FUND_URL: 'https://lora.algokit.io/testnet/fund',
  NETWORK: 'testnet' as const,
};

export const MAINNET = {
  /** A well-known NFD name */
  NFD_NAME: 'algo.algo',
  NETWORK: 'mainnet' as const,
};

/**
 * A deterministic test mnemonic — DO NOT use for real funds.
 * Generated from algosdk.generateAccount() offline.
 */
export const TEST_ACCOUNT = {
  MNEMONIC: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon invest',
};
