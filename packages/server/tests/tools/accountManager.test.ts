import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { AccountManager } from '../../src/tools/accountManager.js';
import algosdk from 'algosdk';
import { algodClient } from '../../src/algorand-client.js';

// Mock algosdk
jest.mock('algosdk', () => ({
  generateAccount: jest.fn(),
  secretKeyToMnemonic: jest.fn(),
  mnemonicToMasterDerivationKey: jest.fn(),
  masterDerivationKeyToMnemonic: jest.fn(),
  mnemonicToSecretKey: jest.fn(),
  seedFromMnemonic: jest.fn(),
  mnemonicFromSeed: jest.fn(),
  makePaymentTxnWithSuggestedParamsFromObject: jest.fn(),
}));

// Mock algodClient
jest.mock('../../src/algorand-client.js', () => ({
  algodClient: {
    getTransactionParams: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({
        firstRound: 1000,
        lastRound: 2000,
        genesisHash: 'hash',
        genesisID: 'testnet-v1.0',
      }),
    }),
  },
}));

describe('AccountManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Tool Schemas', () => {
    it('should have valid tool schemas', () => {
      expect(AccountManager.accountTools).toHaveLength(8);
      expect(AccountManager.accountTools.map((t: { name: string }) => t.name)).toEqual([
        'create_account',
        'rekey_account',
        'mnemonic_to_mdk',
        'mdk_to_mnemonic',
        'secret_key_to_mnemonic',
        'mnemonic_to_secret_key',
        'seed_from_mnemonic',
        'mnemonic_from_seed',
      ]);
    });
  });

  describe('createAccount', () => {
    it('should create a new account', () => {
      const mockAccount = {
        addr: 'test-address',
        sk: new Uint8Array([1, 2, 3]),
      };
      const mockMnemonic = 'test mnemonic';

      (algosdk.generateAccount as jest.Mock).mockReturnValue(mockAccount);
      (algosdk.secretKeyToMnemonic as jest.Mock).mockReturnValue(mockMnemonic);

      const result = AccountManager.createAccount();

      expect(result).toEqual({
        address: mockAccount.addr,
        mnemonic: mockMnemonic,
      });
      expect(algosdk.generateAccount).toHaveBeenCalled();
      expect(algosdk.secretKeyToMnemonic).toHaveBeenCalledWith(mockAccount.sk);
    });
  });

  describe('createRekeyTransaction', () => {
    it('should create a rekey transaction', async () => {
      const fromAddress = 'from-address';
      const toAddress = 'to-address';
      const mockTxn = { type: 'pay' };

      (algosdk.makePaymentTxnWithSuggestedParamsFromObject as jest.Mock).mockReturnValue(mockTxn);

      const result = await AccountManager.createRekeyTransaction(fromAddress, toAddress);

      expect(result).toBe(mockTxn);
      expect(algosdk.makePaymentTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: fromAddress,
          to: fromAddress,
          amount: 0,
          rekeyTo: toAddress,
        })
      );
    });
  });

  describe('handleTool', () => {
    it('should handle create_account', async () => {
      const mockAccount = {
        address: 'test-address',
        mnemonic: 'test mnemonic',
      };
      jest.spyOn(AccountManager, 'createAccount').mockReturnValue(mockAccount);

      const result = await AccountManager.handleTool('create_account', {});

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockAccount, null, 2),
        }],
      });
    });

    it('should handle rekey_account', async () => {
      const mockTxn = { type: 'pay' };
      jest.spyOn(AccountManager, 'createRekeyTransaction').mockResolvedValue(mockTxn as any);

      const result = await AccountManager.handleTool('rekey_account', {
        sourceAddress: 'from-address',
        targetAddress: 'to-address',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockTxn, null, 2),
        }],
      });
    });

    it('should handle mnemonic_to_mdk', async () => {
      const mockMdk = new Uint8Array([1, 2, 3]);
      (algosdk.mnemonicToMasterDerivationKey as jest.Mock).mockReturnValue(mockMdk);

      const result = await AccountManager.handleTool('mnemonic_to_mdk', {
        mnemonic: 'test mnemonic',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({ mdk: Buffer.from(mockMdk).toString('hex') }, null, 2),
        }],
      });
    });

    it('should handle mdk_to_mnemonic', async () => {
      const mockMnemonic = 'test mnemonic';
      (algosdk.masterDerivationKeyToMnemonic as jest.Mock).mockReturnValue(mockMnemonic);

      const result = await AccountManager.handleTool('mdk_to_mnemonic', {
        mdk: '010203',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify({ mnemonic: mockMnemonic }, null, 2),
        }],
      });
    });

    it('should throw error for unknown tool', async () => {
      await expect(AccountManager.handleTool('unknown_tool', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.MethodNotFound, 'Unknown tool: unknown_tool'));
    });

    it('should throw error for invalid parameters', async () => {
      await expect(AccountManager.handleTool('rekey_account', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid rekey account parameters'));
    });
  });

  describe('Mnemonic Conversions', () => {
    it('should convert mnemonic to secret key', () => {
      const mockResult = {
        sk: new Uint8Array([1, 2, 3]),
        addr: 'test-address',
      };
      (algosdk.mnemonicToSecretKey as jest.Mock).mockReturnValue(mockResult);

      const result = AccountManager.mnemonicToSecretKey('test mnemonic');

      expect(result).toBe(mockResult);
      expect(algosdk.mnemonicToSecretKey).toHaveBeenCalledWith('test mnemonic');
    });

    it('should convert secret key to mnemonic', () => {
      const mockMnemonic = 'test mnemonic';
      (algosdk.secretKeyToMnemonic as jest.Mock).mockReturnValue(mockMnemonic);

      const secretKey = new Uint8Array([1, 2, 3]);
      const result = AccountManager.secretKeyToMnemonic(secretKey);

      expect(result).toBe(mockMnemonic);
      expect(algosdk.secretKeyToMnemonic).toHaveBeenCalledWith(secretKey);
    });

    it('should generate seed from mnemonic', () => {
      const mockSeed = new Uint8Array([1, 2, 3]);
      (algosdk.seedFromMnemonic as jest.Mock).mockReturnValue(mockSeed);

      const result = AccountManager.seedFromMnemonic('test mnemonic');

      expect(result).toBe(mockSeed);
      expect(algosdk.seedFromMnemonic).toHaveBeenCalledWith('test mnemonic');
    });

    it('should generate mnemonic from seed', () => {
      const mockMnemonic = 'test mnemonic';
      (algosdk.mnemonicFromSeed as jest.Mock).mockReturnValue(mockMnemonic);

      const seed = new Uint8Array([1, 2, 3]);
      const result = AccountManager.mnemonicFromSeed(seed);

      expect(result).toBe(mockMnemonic);
      expect(algosdk.mnemonicFromSeed).toHaveBeenCalledWith(seed);
    });
  });
});
