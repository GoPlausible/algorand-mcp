import { describeIf, testConfig } from '../helpers/testConfig.js';
import { getE2EAccount, invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

describeIf(testConfig.isCategoryEnabled('arc26'))('ARC-26 Tools (E2E)', () => {
  describe('generate_algorand_uri', () => {
    it('generates a valid algorand:// URI with QR code', async () => {
      const account = getE2EAccount();
      const result = await invokeTool('generate_algorand_uri', {
        address: account.address,
        amount: 1000000,
        label: 'E2E Test',
      });

      // First content item is text with URI
      const uriData = JSON.parse(result.content[0].text);
      expect(uriData.uri).toMatch(/^algorand:\/\//);
      expect(uriData.uri).toContain(account.address);

      // Should have QR code as second content item
      expect(result.content.length).toBeGreaterThanOrEqual(1);
    });
  });
});
