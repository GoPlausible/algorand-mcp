import { describeIf, testConfig } from '../helpers/testConfig.js';
import { invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';
import { TESTNET } from '../helpers/testConstants.js';

describeIf(testConfig.isCategoryEnabled('indexer-api'))('Indexer API Tools (E2E)', () => {
  describe('api_indexer_lookup_account_by_id', () => {
    it('looks up a known testnet account', async () => {
      const result = await invokeTool('api_indexer_lookup_account_by_id', {
        address: TESTNET.KNOWN_ADDRESS,
        network: 'testnet',
      });
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
    });
  });

  describe('api_indexer_search_for_assets', () => {
    it('searches for assets with a limit', async () => {
      const result = await invokeTool('api_indexer_search_for_assets', {
        limit: 3,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_indexer_search_for_transactions', () => {
    it('searches for recent transactions', async () => {
      const result = await invokeTool('api_indexer_search_for_transactions', {
        limit: 3,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_indexer_search_for_accounts', () => {
    it('searches for accounts with a limit', async () => {
      const result = await invokeTool('api_indexer_search_for_accounts', {
        limit: 3,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });
});
