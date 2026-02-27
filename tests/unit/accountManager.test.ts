import { jest } from '@jest/globals';

import { setupNetworkMocks } from '../helpers/mockFactories.js';

jest.unstable_mockModule('../../src/algorand-client.js', () => setupNetworkMocks());

const { AccountManager } = await import('../../src/tools/accountManager.js');

function parseResult(result: any) {
  return JSON.parse(result.content[0].text);
}

describe('AccountManager', () => {
  describe('create_account', () => {
    it('returns a valid address and 25-word mnemonic', async () => {
      const result = await AccountManager.handleTool('create_account', {});
      const data = parseResult(result);
      expect(data.address).toBeDefined();
      expect(data.address).toHaveLength(58);
      expect(data.mnemonic).toBeDefined();
      expect(data.mnemonic.split(' ')).toHaveLength(25);
    });

    it('generates different accounts on each call', async () => {
      const r1 = parseResult(await AccountManager.handleTool('create_account', {}));
      const r2 = parseResult(await AccountManager.handleTool('create_account', {}));
      expect(r1.address).not.toBe(r2.address);
    });
  });

  describe('mnemonic round-trips', () => {
    let mnemonic: string;

    beforeAll(async () => {
      const result = parseResult(await AccountManager.handleTool('create_account', {}));
      mnemonic = result.mnemonic;
    });

    it('mnemonic_to_secret_key and secret_key_to_mnemonic round-trip', async () => {
      const skResult = parseResult(
        await AccountManager.handleTool('mnemonic_to_secret_key', { mnemonic }),
      );
      expect(skResult.secretKey).toBeDefined();
      expect(skResult.address).toHaveLength(58);

      const mnResult = parseResult(
        await AccountManager.handleTool('secret_key_to_mnemonic', { secretKey: skResult.secretKey }),
      );
      expect(mnResult.mnemonic).toBe(mnemonic);
    });

    it('mnemonic_to_mdk and mdk_to_mnemonic round-trip', async () => {
      const mdkResult = parseResult(
        await AccountManager.handleTool('mnemonic_to_mdk', { mnemonic }),
      );
      expect(mdkResult.mdk).toBeDefined();

      const mnResult = parseResult(
        await AccountManager.handleTool('mdk_to_mnemonic', { mdk: mdkResult.mdk }),
      );
      expect(mnResult.mnemonic).toBe(mnemonic);
    });

    it('seed_from_mnemonic and mnemonic_from_seed round-trip', async () => {
      const seedResult = parseResult(
        await AccountManager.handleTool('seed_from_mnemonic', { mnemonic }),
      );
      expect(seedResult.seed).toBeDefined();

      const mnResult = parseResult(
        await AccountManager.handleTool('mnemonic_from_seed', { seed: seedResult.seed }),
      );
      expect(mnResult.mnemonic).toBe(mnemonic);
    });
  });

  describe('error handling', () => {
    it('throws for invalid mnemonic', async () => {
      await expect(
        AccountManager.handleTool('mnemonic_to_secret_key', { mnemonic: 'invalid words here' }),
      ).rejects.toThrow();
    });

    it('throws for missing mnemonic', async () => {
      await expect(
        AccountManager.handleTool('mnemonic_to_secret_key', {}),
      ).rejects.toThrow();
    });

    it('throws for unknown tool name', async () => {
      await expect(
        AccountManager.handleTool('unknown_tool', {}),
      ).rejects.toThrow();
    });
  });
});
