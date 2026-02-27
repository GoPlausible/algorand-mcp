import { jest } from '@jest/globals';

import { setupNetworkMocks } from '../helpers/mockFactories.js';

const mocks = setupNetworkMocks();
jest.unstable_mockModule('../../src/algorand-client.js', () => mocks);

const { handleApiManager } = await import('../../src/tools/apiManager/index.js');

describe('Tinyman API Tools', () => {
  describe('api_tinyman_get_pool', () => {
    it('throws for missing asset IDs', async () => {
      await expect(
        handleApiManager('api_tinyman_get_pool', { network: 'testnet' }),
      ).rejects.toThrow();
    });
  });

  describe('api_tinyman_get_swap_quote', () => {
    it('throws for missing required params', async () => {
      await expect(
        handleApiManager('api_tinyman_get_swap_quote', { network: 'testnet' }),
      ).rejects.toThrow();
    });
  });

  describe('error handling', () => {
    it('throws for unknown tinyman tool', async () => {
      await expect(
        handleApiManager('api_tinyman_unknown', {}),
      ).rejects.toThrow();
    });
  });
});
