import { describeIf, testConfig } from '../helpers/testConfig.js';
import { invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';
import { MAINNET } from '../helpers/testConstants.js';

describeIf(testConfig.isCategoryEnabled('nfd'))('NFD Tools (E2E)', () => {
  describe('api_nfd_get_nfd', () => {
    it('looks up a well-known NFD', async () => {
      const result = await invokeTool('api_nfd_get_nfd', {
        nameOrID: MAINNET.NFD_NAME,
      });
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
    });
  });

  describe('api_nfd_search_nfds', () => {
    it('searches NFDs by name', async () => {
      const result = await invokeTool('api_nfd_search_nfds', {
        name: 'algo',
        limit: 3,
      });
      expect(result).toBeDefined();
    });
  });

  describe('api_nfd_browse_nfds', () => {
    it('browses NFDs with a limit', async () => {
      const result = await invokeTool('api_nfd_browse_nfds', {
        limit: 3,
      });
      expect(result).toBeDefined();
    });
  });
});
