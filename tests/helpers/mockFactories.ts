/**
 * Factory functions for creating mock Algorand SDK clients and other
 * mock dependencies used in unit tests.
 */

// Global BigInt JSON serialization — algosdk v3 returns BigInt for numeric fields
(BigInt.prototype as any).toJSON = function () { return Number(this); };

import { jest } from '@jest/globals';
import algosdk from 'algosdk';

/** genesisHash as Uint8Array (algosdk v3 requires this) */
const genesisHashBytes = algosdk.base64ToBytes('SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=');

/** Standard suggested params returned by mocked algod */
export const MOCK_SUGGESTED_PARAMS = {
  fee: 1000,
  firstValid: 1000,
  lastValid: 2000,
  genesisID: 'testnet-v1.0',
  genesisHash: genesisHashBytes,
  flatFee: true,
  minFee: 1000,
};

/**
 * Creates a fluent mock that supports arbitrary chaining.
 * e.g. client.searchAccounts().limit(5).assetID(10).do()
 */
function fluentMock(resolvedValue: any) {
  const handler: ProxyHandler<any> = {
    get(_target, prop) {
      if (prop === 'do') return jest.fn().mockResolvedValue(resolvedValue);
      // Any other method returns the proxy itself (chaining)
      return jest.fn().mockReturnValue(new Proxy({}, handler));
    },
  };
  return jest.fn().mockReturnValue(new Proxy({}, handler));
}

/** Creates a mock algod client with common methods stubbed */
export function createMockAlgodClient() {
  return {
    getTransactionParams: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue(MOCK_SUGGESTED_PARAMS),
    }),
    accountInformation: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({
        address: 'MOCK_ADDRESS',
        amount: 1_000_000,
        minBalance: 100_000,
        assets: [],
        totalAppsOptedIn: 0,
        totalAssetsOptedIn: 0,
        totalCreatedApps: 0,
        totalCreatedAssets: 0,
      }),
    }),
    accountApplicationInformation: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ appLocalState: {} }),
    }),
    accountAssetInformation: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ assetHolding: { amount: 0 } }),
    }),
    getApplicationByID: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ id: 123, params: {} }),
    }),
    getApplicationBoxByName: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ name: 'test', value: 'dGVzdA==' }),
    }),
    getApplicationBoxes: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ boxes: [] }),
    }),
    getAssetByID: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ index: 456, params: {} }),
    }),
    compile: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ hash: 'abc', result: 'BCAg' }),
    }),
    disassemble: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ result: '#pragma version 2\nint 1' }),
    }),
    sendRawTransaction: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ txId: 'MOCK_TX_ID' }),
    }),
    simulateRawTransactions: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ txnGroups: [] }),
    }),
    simulateTransactions: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ txnGroups: [] }),
    }),
    status: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ lastRound: 1000 }),
    }),
    statusAfterBlock: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ lastRound: 1001 }),
    }),
    pendingTransactionInformation: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ txn: {} }),
    }),
    pendingTransactionByAddress: fluentMock({ topTransactions: [], totalTransactions: 0 }),
    pendingTransactionsInformation: fluentMock({ topTransactions: [], totalTransactions: 0 }),
  };
}

/** Creates a mock indexer client — search methods support fluent chaining */
export function createMockIndexerClient() {
  return {
    lookupAccountByID: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ account: { address: 'MOCK', amount: 0 } }),
    }),
    lookupAccountAssets: fluentMock({ assets: [] }),
    lookupAccountAppLocalStates: fluentMock({ 'apps-local-states': [] }),
    lookupAccountCreatedApplications: fluentMock({ applications: [] }),
    lookupAccountTransactions: fluentMock({ transactions: [] }),
    searchAccounts: fluentMock({ accounts: [] }),
    lookupApplications: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ application: {} }),
    }),
    lookupApplicationLogs: fluentMock({ 'log-data': [] }),
    searchForApplications: fluentMock({ applications: [] }),
    lookupApplicationBoxByIDandName: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ name: 'test', value: 'dGVzdA==' }),
    }),
    searchForApplicationBoxes: fluentMock({ boxes: [] }),
    lookupAssetByID: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ asset: {} }),
    }),
    lookupAssetBalances: fluentMock({ balances: [] }),
    lookupAssetTransactions: fluentMock({ transactions: [] }),
    searchForAssets: fluentMock({ assets: [] }),
    lookupTransactionByID: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({ transaction: {} }),
    }),
    searchForTransactions: fluentMock({ transactions: [] }),
  };
}

/** Creates mocks for algorand-client.ts module */
export function setupNetworkMocks(
  algodOverrides?: Record<string, any>,
  indexerOverrides?: Record<string, any>,
) {
  const algod = { ...createMockAlgodClient(), ...algodOverrides };
  const indexer = { ...createMockIndexerClient(), ...indexerOverrides };
  return {
    getAlgodClient: jest.fn().mockReturnValue(algod),
    getIndexerClient: jest.fn().mockReturnValue(indexer),
    extractNetwork: jest.fn().mockReturnValue('testnet'),
    __mockAlgod: algod,
    __mockIndexer: indexer,
  };
}

// ── Keychain mock ──────────────────────────────────────────────────────

const keychainStore = new Map<string, string>();

export function createKeychainMock() {
  return {
    Entry: jest.fn().mockImplementation((_service: string, account: string) => ({
      setPassword: jest.fn().mockImplementation((pw: string) => {
        keychainStore.set(account, pw);
      }),
      getPassword: jest.fn().mockImplementation(() => {
        return keychainStore.get(account) || null;
      }),
      deleteCredential: jest.fn().mockImplementation(() => {
        return keychainStore.delete(account);
      }),
    })),
    findCredentials: jest.fn().mockReturnValue([]),
  };
}

export function clearKeychainStore() {
  keychainStore.clear();
}
