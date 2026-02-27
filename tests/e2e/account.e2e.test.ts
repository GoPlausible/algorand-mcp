import { describeIf, testConfig } from '../helpers/testConfig.js';
import { invokeTool, parseToolResponse } from '../helpers/e2eSetup.js';

describeIf(testConfig.isCategoryEnabled('account'))('Account Tools (E2E)', () => {
  describe('create_account', () => {
    it('generates a new valid account', async () => {
      const result = await invokeTool('create_account', {});
      const data = parseToolResponse(result);
      expect(data.address).toHaveLength(58);
      expect(data.mnemonic.split(' ')).toHaveLength(25);
    });
  });

  describe('mnemonic round-trip chain', () => {
    it('mnemonic → sk → mnemonic → seed → mnemonic → mdk → mnemonic', async () => {
      const { mnemonic } = parseToolResponse(await invokeTool('create_account', {}));

      // mnemonic → secret key
      const sk = parseToolResponse(
        await invokeTool('mnemonic_to_secret_key', { mnemonic }),
      );
      expect(sk.secretKey).toBeDefined();
      expect(sk.address).toHaveLength(58);

      // secret key → mnemonic
      const mn1 = parseToolResponse(
        await invokeTool('secret_key_to_mnemonic', { secretKey: sk.secretKey }),
      );
      expect(mn1.mnemonic).toBe(mnemonic);

      // mnemonic → seed
      const seed = parseToolResponse(
        await invokeTool('seed_from_mnemonic', { mnemonic }),
      );
      expect(seed.seed).toBeDefined();

      // seed → mnemonic
      const mn2 = parseToolResponse(
        await invokeTool('mnemonic_from_seed', { seed: seed.seed }),
      );
      expect(mn2.mnemonic).toBe(mnemonic);

      // mnemonic → mdk
      const mdk = parseToolResponse(
        await invokeTool('mnemonic_to_mdk', { mnemonic }),
      );
      expect(mdk.mdk).toBeDefined();

      // mdk → mnemonic
      const mn3 = parseToolResponse(
        await invokeTool('mdk_to_mnemonic', { mdk: mdk.mdk }),
      );
      expect(mn3.mnemonic).toBe(mnemonic);
    });
  });
});
