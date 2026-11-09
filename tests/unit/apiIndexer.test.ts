import { jest } from '@jest/globals';
import algosdk from 'algosdk';

import { setupNetworkMocks } from '../helpers/mockFactories.js';

const mocks = setupNetworkMocks();
jest.unstable_mockModule('../../src/algorand-client.js', () => mocks);

const { handleApiManager } = await import('../../src/tools/apiManager/index.js');

const testAccount = algosdk.generateAccount();
const VALID_ADDRESS = testAccount.addr.toString();

describe('Indexer API Tools', () => {
  // Disabled: api_indexer_lookup_account_by_id was removed as redundant with
  // api_algod_get_account_info (live algod variant covers the same query).
  // See .notes/redundant-tools-report.md §1 and apiAlgod.test.ts for coverage.
  // describe('api_indexer_lookup_account_by_id', () => {
  //   it('returns account information', async () => {
  //     const result = await handleApiManager('api_indexer_lookup_account_by_id', {
  //       address: VALID_ADDRESS,
  //       network: 'testnet',
  //     });
  //     expect(result).toBeDefined();
  //     expect(result.content).toBeDefined();
  //   });
  // });

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

    it("sends the caller's name filter to the indexer, never the tool name", async () => {
      // Records every builder call: searchForAssets().name(x).unit(y)...do()
      let calls: Record<string, unknown[]> = {};
      const builder: any = new Proxy({}, {
        get(_target, prop: string) {
          if (prop === 'do') return async () => ({ assets: [] });
          return (...callArgs: unknown[]) => { (calls[prop] ||= []).push(...callArgs); return builder; };
        },
      });
      const original = mocks.__mockIndexer.searchForAssets;
      mocks.__mockIndexer.searchForAssets = jest.fn(() => builder) as any;
      try {
        await handleApiManager('api_indexer_search_for_assets', { name: 'USDC', unit: 'USDC', network: 'testnet' });
        expect(calls.name).toEqual(['USDC']);
        expect(calls.unit).toEqual(['USDC']);

        calls = {};
        await handleApiManager('api_indexer_search_for_assets', { creator: VALID_ADDRESS, network: 'testnet' });
        expect(calls.creator).toEqual([VALID_ADDRESS]);
        expect(calls.name).toBeUndefined();
      } finally {
        mocks.__mockIndexer.searchForAssets = original;
      }
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

  // Disabled: api_indexer_lookup_asset_by_id was removed as redundant with
  // api_algod_get_asset_by_id. See apiAlgod.test.ts for coverage.
  // describe('api_indexer_lookup_asset_by_id', () => {
  //   it('returns asset info', async () => {
  //     const result = await handleApiManager('api_indexer_lookup_asset_by_id', {
  //       assetId: 456,
  //       network: 'testnet',
  //     });
  //     expect(result).toBeDefined();
  //   });
  // });

  describe('error handling', () => {
    it('throws for unknown indexer tool', async () => {
      await expect(
        handleApiManager('api_indexer_unknown', {}),
      ).rejects.toThrow();
    });
  });
});
