import { jest } from '@jest/globals';
import algosdk from 'algosdk';

import { setupNetworkMocks } from '../helpers/mockFactories.js';

const mocks = setupNetworkMocks();
jest.unstable_mockModule('../../src/algorand-client.js', () => mocks);

const { handleApiManager } = await import('../../src/tools/apiManager/index.js');

const testAccount = algosdk.generateAccount();
const VALID_ADDRESS = testAccount.addr.toString();

describe('Indexer API Tools', () => {
  describe('api_indexer_lookup_account_by_id', () => {
    it('returns account information', async () => {
      const result = await handleApiManager('api_indexer_lookup_account_by_id', {
        address: VALID_ADDRESS,
        network: 'testnet',
      });
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
    });
  });

  describe('api_indexer_search_for_accounts', () => {
    it('searches accounts with limit', async () => {
      const result = await handleApiManager('api_indexer_search_for_accounts', {
        limit: 5,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_indexer_search_for_assets', () => {
    it('searches assets', async () => {
      const result = await handleApiManager('api_indexer_search_for_assets', {
        limit: 5,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_indexer_search_for_transactions', () => {
    it('searches transactions', async () => {
      const result = await handleApiManager('api_indexer_search_for_transactions', {
        limit: 5,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_indexer_search_for_applications', () => {
    it('searches applications', async () => {
      const result = await handleApiManager('api_indexer_search_for_applications', {
        limit: 5,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_indexer_lookup_asset_by_id', () => {
    it('returns asset info', async () => {
      const result = await handleApiManager('api_indexer_lookup_asset_by_id', {
        assetId: 456,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('throws for unknown indexer tool', async () => {
      await expect(
        handleApiManager('api_indexer_unknown', {}),
      ).rejects.toThrow();
    });
  });
});
