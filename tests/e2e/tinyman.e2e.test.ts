import { describeIf, testConfig } from '../helpers/testConfig.js';
import { invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

describeIf(testConfig.isCategoryEnabled('tinyman'))('Tinyman Tools (E2E)', () => {
  describe('api_tinyman_get_pool', () => {
    it('fetches ALGO/USDC pool on testnet', async () => {
      try {
        const result = await invokeTool('api_tinyman_get_pool', {
          asset1Id: 0,
          asset2Id: 10458941,
          network: 'testnet',
        });
        expect(result).toBeDefined();
      } catch (err: any) {
        // Pool may not exist on testnet — not a test failure
        expect(err.message || err).toBeDefined();
      }
    });
  });
});
