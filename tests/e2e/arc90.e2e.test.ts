import { describeIf, testConfig } from '../helpers/testConfig.js';
import { getE2EAccount, invokeTool } from '../helpers/e2eSetup.js';

const TESTNET_GH = 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9_cOUJOiI';

describeIf(testConfig.isCategoryEnabled('arc90'))('ARC-90 Tools (E2E)', () => {
  describe('generate_algorand_qrcode', () => {
    it('generates a testnet ARC-90 payment URI and a QRClaw QR code', async () => {
      const account = getE2EAccount();
      const result = await invokeTool('generate_algorand_qrcode', {
        address: account.address,
        amount: 1000000,
        label: 'E2E Test',
        network: 'testnet',
      });

      expect(result.content).toHaveLength(1);
      const text: string = result.content[0].text;
      expect(text).toContain(`\n\nURI: algorand://gh:${TESTNET_GH}/${account.address}?label=E2E%20Test&amount=1000000\n`);
      expect(text).toMatch(/\nLink: https:\/\/qrclaw\.goplausible\.xyz\/\S+\n/);
      expect(text).toMatch(/\nExpires in: \S+$/);
      // The QR code block comes before the URI line.
      expect(text.indexOf('\n\nURI: ')).toBeGreaterThan(0);
    });

    it('generates a mainnet ARC-90 payment URI without an authority', async () => {
      const account = getE2EAccount();
      const result = await invokeTool('generate_algorand_qrcode', { address: account.address, network: 'mainnet' });
      expect(result.content[0].text).toContain(`\n\nURI: algorand://${account.address}\n`);
    });
  });
});
