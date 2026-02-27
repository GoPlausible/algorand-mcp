import { describeIf, testConfig } from '../helpers/testConfig.js';
import { getE2EAccount, invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';
import { TESTNET } from '../helpers/testConstants.js';

describeIf(testConfig.isCategoryEnabled('algod-api'))('Algod API Tools (E2E)', () => {
  describe('api_algod_get_account_info', () => {
    it('returns account info for a known address', async () => {
      const result = await invokeTool('api_algod_get_account_info', {
        address: TESTNET.KNOWN_ADDRESS,
        network: 'testnet',
      });
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
    });
  });

  describe('api_algod_get_transaction_params', () => {
    it('returns suggested params with lastRound', async () => {
      const data = parseToolResponse(
        await invokeTool('api_algod_get_transaction_params', { network: 'testnet' }),
      );
      expect(data).toBeDefined();
    });
  });

  describe('api_algod_get_node_status', () => {
    it('returns node status', async () => {
      const data = parseToolResponse(
        await invokeTool('api_algod_get_node_status', { network: 'testnet' }),
      );
      expect(data).toBeDefined();
    });
  });

  describe('api_algod_get_asset_by_id', () => {
    it('returns USDC testnet asset info', async () => {
      const result = await invokeTool('api_algod_get_asset_by_id', {
        assetId: TESTNET.USDC_ASSET_ID,
        network: 'testnet',
      });
      expect(result).toBeDefined();
    });
  });
});
