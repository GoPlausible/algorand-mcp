import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { AssetTransactionManager, assetTransactionTools } from '../../../src/tools/transactionManager/assetTransactions.js';
import { algodClient } from '../../../src/algorand-client.js';
import algosdk from 'algosdk';

// Mock algosdk
jest.mock('algosdk', () => ({
  makeAssetCreateTxnWithSuggestedParamsFromObject: jest.fn(),
  makeAssetConfigTxnWithSuggestedParamsFromObject: jest.fn(),
  makeAssetDestroyTxnWithSuggestedParamsFromObject: jest.fn(),
  makeAssetFreezeTxnWithSuggestedParamsFromObject: jest.fn(),
  makeAssetTransferTxnWithSuggestedParamsFromObject: jest.fn(),
}));

// Mock algodClient
jest.mock('../../../src/algorand-client.js', () => ({
  algodClient: {
    getTransactionParams: jest.fn().mockReturnValue({
      do: jest.fn().mockResolvedValue({
        firstRound: 1000,
        lastRound: 2000,
        genesisHash: 'hash',
        genesisID: 'testnet-v1.0',
        fee: 1000,
        flatFee: true,
      }),
    }),
  },
}));

describe('AssetTransactionManager', () => {
  const mockSuggestedParams = {
    firstRound: 1000,
    lastRound: 2000,
    genesisHash: 'hash',
    genesisID: 'testnet-v1.0',
    fee: 1000,
    flatFee: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (algodClient.getTransactionParams as jest.Mock)().do.mockResolvedValue(mockSuggestedParams);
  });

  describe('Tool Schemas', () => {
    it('should have valid tool schemas', () => {
      expect(assetTransactionTools).toHaveLength(5);
      expect(assetTransactionTools.map((t: { name: string }) => t.name)).toEqual([
        'make_asset_create_txn',
        'make_asset_config_txn',
        'make_asset_destroy_txn',
        'make_asset_freeze_txn',
        'make_asset_transfer_txn',
      ]);
    });
  });

  describe('Asset Creation', () => {
    const mockAssetCreateTxn = { type: 'acfg', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject as jest.Mock).mockReturnValue(mockAssetCreateTxn);
    });

    it('should create a basic asset creation transaction', async () => {
      const args = {
        from: 'sender',
        total: 1000000,
        decimals: 6,
        defaultFrozen: false,
      };

      const result = await AssetTransactionManager.handleTool('make_asset_create_txn', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockAssetCreateTxn, null, 2),
        }],
      });

      expect(algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          total: 1000000,
          decimals: 6,
          defaultFrozen: false,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });

    it('should create an asset with optional parameters', async () => {
      const args = {
        from: 'sender',
        total: 1000000,
        decimals: 6,
        defaultFrozen: false,
        unitName: 'TEST',
        assetName: 'Test Asset',
        assetURL: 'https://test.com',
        assetMetadataHash: 'hash',
        manager: 'manager-addr',
        reserve: 'reserve-addr',
        freeze: 'freeze-addr',
        clawback: 'clawback-addr',
        note: 'test note',
        rekeyTo: 'rekey-addr',
      };

      const result = await AssetTransactionManager.handleTool('make_asset_create_txn', args);

      expect(algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          ...args,
          note: new TextEncoder().encode(args.note),
          suggestedParams: expect.any(Object)
        })
      );
    });
  });

  describe('Asset Configuration', () => {
    const mockAssetConfigTxn = { type: 'acfg', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject as jest.Mock).mockReturnValue(mockAssetConfigTxn);
    });

    it('should create an asset configuration transaction', async () => {
      const args = {
        from: 'sender',
        assetIndex: 123,
        strictEmptyAddressChecking: true,
        manager: 'new-manager',
      };

      const result = await AssetTransactionManager.handleTool('make_asset_config_txn', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockAssetConfigTxn, null, 2),
        }],
      });

      expect(algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining(args)
      );
    });
  });

  describe('Asset Destruction', () => {
    const mockAssetDestroyTxn = { type: 'acfg', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject as jest.Mock).mockReturnValue(mockAssetDestroyTxn);
    });

    it('should create an asset destroy transaction', async () => {
      const args = {
        from: 'sender',
        assetIndex: 123,
      };

      const result = await AssetTransactionManager.handleTool('make_asset_destroy_txn', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockAssetDestroyTxn, null, 2),
        }],
      });

      expect(algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining(args)
      );
    });
  });

  describe('Asset Freeze', () => {
    const mockAssetFreezeTxn = { type: 'afrz', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject as jest.Mock).mockReturnValue(mockAssetFreezeTxn);
    });

    it('should create an asset freeze transaction', async () => {
      const args = {
        from: 'sender',
        assetIndex: 123,
        freezeTarget: 'target-addr',
        freezeState: true,
      };

      const result = await AssetTransactionManager.handleTool('make_asset_freeze_txn', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockAssetFreezeTxn, null, 2),
        }],
      });

      expect(algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining(args)
      );
    });
  });

  describe('Asset Transfer', () => {
    const mockAssetTransferTxn = { type: 'axfer', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject as jest.Mock).mockReturnValue(mockAssetTransferTxn);
    });

    it('should create an asset transfer transaction', async () => {
      const args = {
        from: 'sender',
        to: 'receiver',
        assetIndex: 123,
        amount: 1000,
      };

      const result = await AssetTransactionManager.handleTool('make_asset_transfer_txn', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockAssetTransferTxn, null, 2),
        }],
      });

      expect(algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining(args)
      );
    });

    it('should create an asset transfer with optional parameters', async () => {
      const args = {
        from: 'sender',
        to: 'receiver',
        assetIndex: 123,
        amount: 1000,
        closeRemainderTo: 'close-to',
        note: 'test note',
        rekeyTo: 'rekey-to',
      };

      const result = await AssetTransactionManager.handleTool('make_asset_transfer_txn', args);

      expect(algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          ...args,
          note: new TextEncoder().encode('test note'),
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('should throw error for unknown tool', async () => {
      await expect(AssetTransactionManager.handleTool('unknown_tool', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.MethodNotFound, 'Unknown asset transaction tool: unknown_tool'));
    });

    it('should throw error for missing asset creation parameters', async () => {
      await expect(AssetTransactionManager.handleTool('make_asset_create_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid asset creation parameters'));
    });

    it('should throw error for missing asset config parameters', async () => {
      await expect(AssetTransactionManager.handleTool('make_asset_config_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid asset configuration parameters'));
    });

    it('should throw error for missing asset destroy parameters', async () => {
      await expect(AssetTransactionManager.handleTool('make_asset_destroy_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid asset destroy parameters'));
    });

    it('should throw error for missing asset freeze parameters', async () => {
      await expect(AssetTransactionManager.handleTool('make_asset_freeze_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid asset freeze parameters'));
    });

    it('should throw error for missing asset transfer parameters', async () => {
      await expect(AssetTransactionManager.handleTool('make_asset_transfer_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid asset transfer parameters'));
    });

    it('should handle algod client errors', async () => {
      const error = new Error('Network error');
      (algodClient.getTransactionParams as jest.Mock)().do.mockRejectedValue(error);

      await expect(AssetTransactionManager.handleTool('make_asset_create_txn', {
        from: 'sender',
        total: 1000000,
        decimals: 6,
        defaultFrozen: false,
      }))
        .rejects
        .toThrow(error);
    });
  });
});
