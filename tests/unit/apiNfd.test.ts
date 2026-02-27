import { jest } from '@jest/globals';

import { setupNetworkMocks } from '../helpers/mockFactories.js';

const mocks = setupNetworkMocks();
jest.unstable_mockModule('../../src/algorand-client.js', () => mocks);

// Mock global fetch for NFD API calls
const mockFetchResponse = {
  ok: true,
  json: jest.fn().mockResolvedValue({ name: 'test.algo', owner: 'MOCK_ADDRESS' }),
  text: jest.fn().mockResolvedValue('{}'),
};
global.fetch = jest.fn().mockResolvedValue(mockFetchResponse) as any;

const { handleApiManager } = await import('../../src/tools/apiManager/index.js');

describe('NFD API Tools', () => {
  describe('api_nfd_get_nfd', () => {
    it('looks up an NFD by name', async () => {
      const result = await handleApiManager('api_nfd_get_nfd', {
        nameOrID: 'test.algo',
      });
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
    });

    it('makes API call even with missing nameOrID (no client-side validation)', async () => {
      // NFD tools don't validate nameOrID client-side — they rely on API response
      const result = await handleApiManager('api_nfd_get_nfd', {});
      expect(result).toBeDefined();
    });
  });

  describe('api_nfd_search_nfds', () => {
    it('searches NFDs', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue([]),
        text: jest.fn().mockResolvedValue('[]'),
      });
      const result = await handleApiManager('api_nfd_search_nfds', {
        name: 'test',
        limit: 5,
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_nfd_browse_nfds', () => {
    it('browses NFDs with filters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue([]),
        text: jest.fn().mockResolvedValue('[]'),
      });
      const result = await handleApiManager('api_nfd_browse_nfds', {
        limit: 5,
      });
      expect(result).toBeDefined();
    });
  });
});
