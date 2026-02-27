import { jest } from '@jest/globals';
import { createKeychainMock, clearKeychainStore, setupNetworkMocks } from '../helpers/mockFactories.js';

// Mock dependencies before importing WalletManager
jest.unstable_mockModule('@napi-rs/keyring', () => createKeychainMock());
jest.unstable_mockModule('../../src/algorand-client.js', () => setupNetworkMocks());

// Mock fs to prevent real file I/O (wallet.db)
jest.unstable_mockModule('fs', () => ({
  existsSync: jest.fn().mockReturnValue(false),
  mkdirSync: jest.fn(),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

const { WalletManager } = await import('../../src/tools/walletManager.js');

function parseResult(result: any) {
  return JSON.parse(result.content[0].text);
}

// Use unique nicknames with a counter to avoid collisions across tests
let counter = 0;
function uniqueNick(prefix: string) {
  return `${prefix}-${++counter}-${Date.now()}`;
}

describe('WalletManager', () => {
  describe('wallet_add_account', () => {
    it('creates a new account and returns address + publicKey (no mnemonic)', async () => {
      const nick = uniqueNick('add');
      const result = await WalletManager.handleTool('wallet_add_account', {
        nickname: nick,
      });
      const data = parseResult(result);
      expect(data.address).toHaveLength(58);
      expect(data.publicKey).toBeDefined();
      expect(data.nickname).toBe(nick);
      expect(data.mnemonic).toBeUndefined();
    });

    it('rejects duplicate nicknames', async () => {
      const nick = uniqueNick('dupe');
      await WalletManager.handleTool('wallet_add_account', { nickname: nick });
      await expect(
        WalletManager.handleTool('wallet_add_account', { nickname: nick }),
      ).rejects.toThrow(/already exists/);
    });

    it('throws when nickname is missing', async () => {
      await expect(
        WalletManager.handleTool('wallet_add_account', {}),
      ).rejects.toThrow();
    });
  });

  describe('wallet_list_accounts', () => {
    it('lists accounts including recently added ones', async () => {
      const nick = uniqueNick('list');
      await WalletManager.handleTool('wallet_add_account', { nickname: nick });
      const result = await WalletManager.handleTool('wallet_list_accounts', {});
      const data = parseResult(result);
      expect(data.count).toBeGreaterThanOrEqual(1);
      const found = data.accounts.find((a: any) => a.nickname === nick);
      expect(found).toBeDefined();
    });
  });

  describe('wallet_switch_account', () => {
    it('switches by nickname', async () => {
      const nickA = uniqueNick('switch-a');
      const nickB = uniqueNick('switch-b');
      await WalletManager.handleTool('wallet_add_account', { nickname: nickA });
      await WalletManager.handleTool('wallet_add_account', { nickname: nickB });

      const result = await WalletManager.handleTool('wallet_switch_account', {
        nickname: nickB,
      });
      const data = parseResult(result);
      expect(data.switched).toBe(true);
      expect(data.nickname).toBe(nickB);
    });

    it('throws for out-of-range index', async () => {
      await expect(
        WalletManager.handleTool('wallet_switch_account', { index: 9999 }),
      ).rejects.toThrow(/out of range/);
    });
  });

  describe('wallet_get_info', () => {
    it('returns active account info', async () => {
      const nick = uniqueNick('info');
      await WalletManager.handleTool('wallet_add_account', { nickname: nick });
      await WalletManager.handleTool('wallet_switch_account', { nickname: nick });

      const result = await WalletManager.handleTool('wallet_get_info', {});
      const data = parseResult(result);
      expect(data.nickname).toBe(nick);
      expect(data.address).toHaveLength(58);
      expect(data.publicKey).toBeDefined();
    });
  });

  describe('wallet_sign_data', () => {
    it('signs hex data and returns signature', async () => {
      const nick = uniqueNick('signdata');
      await WalletManager.handleTool('wallet_add_account', { nickname: nick });
      await WalletManager.handleTool('wallet_switch_account', { nickname: nick });

      const hexData = '48656c6c6f'; // "Hello"
      const result = await WalletManager.handleTool('wallet_sign_data', { data: hexData });
      const data = parseResult(result);
      expect(data.signature).toBeDefined();
      expect(data.publicKey).toBeDefined();
      expect(data.dataLength).toBe(5);
    });
  });

  describe('wallet_remove_account', () => {
    it('removes account by nickname', async () => {
      const nick = uniqueNick('remove');
      await WalletManager.handleTool('wallet_add_account', { nickname: nick });
      const result = await WalletManager.handleTool('wallet_remove_account', {
        nickname: nick,
      });
      const data = parseResult(result);
      expect(data.removed).toBe(true);
      expect(data.nickname).toBe(nick);
    });
  });

  describe('error handling', () => {
    it('throws for unknown wallet tool', async () => {
      await expect(
        WalletManager.handleTool('wallet_unknown', {}),
      ).rejects.toThrow();
    });
  });
});
