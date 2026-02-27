import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { AppTransactionManager, appTransactionTools } from '../../../src/tools/transactionManager/appTransactions.js';
import { algodClient } from '../../../src/algorand-client.js';
import algosdk, { OnApplicationComplete } from 'algosdk';

// Mock algosdk
jest.mock('algosdk', () => ({
  makeApplicationCreateTxnFromObject: jest.fn(),
  makeApplicationUpdateTxnFromObject: jest.fn(),
  makeApplicationDeleteTxnFromObject: jest.fn(),
  makeApplicationOptInTxnFromObject: jest.fn(),
  makeApplicationCloseOutTxnFromObject: jest.fn(),
  makeApplicationClearStateTxnFromObject: jest.fn(),
  makeApplicationNoOpTxnFromObject: jest.fn(),
  OnApplicationComplete: {
    NoOpOC: 0,
    OptInOC: 1,
    CloseOutOC: 2,
    ClearStateOC: 3,
    UpdateApplicationOC: 4,
    DeleteApplicationOC: 5,
  },
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

describe('AppTransactionManager', () => {
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
      expect(appTransactionTools).toHaveLength(7);
      expect(appTransactionTools.map((t: { name: string }) => t.name)).toEqual([
        'make_app_create_txn',
        'make_app_update_txn',
        'make_app_delete_txn',
        'make_app_optin_txn',
        'make_app_closeout_txn',
        'make_app_clear_txn',
        'make_app_call_txn',
      ]);
    });
  });

  describe('Application Creation', () => {
    const mockAppCreateTxn = { type: 'appl', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeApplicationCreateTxnFromObject as jest.Mock).mockReturnValue(mockAppCreateTxn);
    });

    it('should create a basic application creation transaction', async () => {
      const args = {
        from: 'sender',
        approvalProgram: '#pragma version 6\nint 1',
        clearProgram: '#pragma version 6\nint 1',
        globalByteSlices: 1,
        globalInts: 1,
        localByteSlices: 1,
        localInts: 1,
      };

      const result = await AppTransactionManager.handleTool('make_app_create_txn', args);

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockAppCreateTxn, null, 2),
        }],
      });

      expect(algosdk.makeApplicationCreateTxnFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          approvalProgram: new TextEncoder().encode(args.approvalProgram),
          clearProgram: new TextEncoder().encode(args.clearProgram),
          globalByteSlices: 1,
          globalInts: 1,
          localByteSlices: 1,
          localInts: 1,
          onComplete: 0,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });

    it('should create an application with optional parameters', async () => {
      const args = {
        from: 'sender',
        approvalProgram: '#pragma version 6\nint 1',
        clearProgram: '#pragma version 6\nint 1',
        globalByteSlices: 1,
        globalInts: 1,
        localByteSlices: 1,
        localInts: 1,
        extraPages: 1,
        note: 'test note',
        lease: 'test lease',
        rekeyTo: 'rekey-addr',
        appArgs: ['arg1', 'arg2'],
        accounts: ['acc1', 'acc2'],
        foreignApps: [1, 2],
        foreignAssets: [3, 4],
      };

      const result = await AppTransactionManager.handleTool('make_app_create_txn', args);

      expect(algosdk.makeApplicationCreateTxnFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          approvalProgram: new TextEncoder().encode(args.approvalProgram),
          clearProgram: new TextEncoder().encode(args.clearProgram),
          globalByteSlices: 1,
          globalInts: 1,
          localByteSlices: 1,
          localInts: 1,
          extraPages: 1,
          note: new TextEncoder().encode('test note'),
          lease: new TextEncoder().encode('test lease'),
          rekeyTo: 'rekey-addr',
          appArgs: args.appArgs.map(arg => new TextEncoder().encode(arg)),
          accounts: ['acc1', 'acc2'],
          foreignApps: [1, 2],
          foreignAssets: [3, 4],
          onComplete: 0,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });
  });

  describe('Application Update', () => {
    const mockAppUpdateTxn = { type: 'appl', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeApplicationUpdateTxnFromObject as jest.Mock).mockReturnValue(mockAppUpdateTxn);
    });

    it('should create an application update transaction', async () => {
      const args = {
        from: 'sender',
        appID: 123,
        approvalProgram: '#pragma version 6\nint 1',
        clearProgram: '#pragma version 6\nint 1',
      };

      const result = await AppTransactionManager.handleTool('make_app_update_txn', args);

      expect(algosdk.makeApplicationUpdateTxnFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          appID: 123,
          approvalProgram: new TextEncoder().encode(args.approvalProgram),
          clearProgram: new TextEncoder().encode(args.clearProgram),
          onComplete: 4,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });
  });

  describe('Application Delete', () => {
    const mockAppDeleteTxn = { type: 'appl', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeApplicationDeleteTxnFromObject as jest.Mock).mockReturnValue(mockAppDeleteTxn);
    });

    it('should create an application delete transaction', async () => {
      const args = {
        from: 'sender',
        appID: 123,
      };

      const result = await AppTransactionManager.handleTool('make_app_delete_txn', args);

      expect(algosdk.makeApplicationDeleteTxnFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          appID: 123,
          onComplete: 5,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });
  });

  describe('Application Opt-In', () => {
    const mockAppOptInTxn = { type: 'appl', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeApplicationOptInTxnFromObject as jest.Mock).mockReturnValue(mockAppOptInTxn);
    });

    it('should create an application opt-in transaction', async () => {
      const args = {
        from: 'sender',
        appID: 123,
      };

      const result = await AppTransactionManager.handleTool('make_app_optin_txn', args);

      expect(algosdk.makeApplicationOptInTxnFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          appID: 123,
          onComplete: 1,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });
  });

  describe('Application Close-Out', () => {
    const mockAppCloseOutTxn = { type: 'appl', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeApplicationCloseOutTxnFromObject as jest.Mock).mockReturnValue(mockAppCloseOutTxn);
    });

    it('should create an application close-out transaction', async () => {
      const args = {
        from: 'sender',
        appID: 123,
      };

      const result = await AppTransactionManager.handleTool('make_app_closeout_txn', args);

      expect(algosdk.makeApplicationCloseOutTxnFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          appID: 123,
          onComplete: 2,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });
  });

  describe('Application Clear State', () => {
    const mockAppClearTxn = { type: 'appl', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeApplicationClearStateTxnFromObject as jest.Mock).mockReturnValue(mockAppClearTxn);
    });

    it('should create an application clear state transaction', async () => {
      const args = {
        from: 'sender',
        appID: 123,
      };

      const result = await AppTransactionManager.handleTool('make_app_clear_txn', args);

      expect(algosdk.makeApplicationClearStateTxnFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          appID: 123,
          onComplete: 3,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });
  });

  describe('Application Call', () => {
    const mockAppCallTxn = { type: 'appl', from: 'sender' };

    beforeEach(() => {
      (algosdk.makeApplicationNoOpTxnFromObject as jest.Mock).mockReturnValue(mockAppCallTxn);
    });

    it('should create an application call transaction', async () => {
      const args = {
        from: 'sender',
        appID: 123,
        appArgs: ['method', 'arg1'],
        accounts: ['acc1'],
        foreignApps: [1],
        foreignAssets: [2],
      };

      const result = await AppTransactionManager.handleTool('make_app_call_txn', args);

      expect(algosdk.makeApplicationNoOpTxnFromObject).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'sender',
          appID: 123,
          appArgs: args.appArgs.map(arg => new TextEncoder().encode(arg)),
          accounts: ['acc1'],
          foreignApps: [1],
          foreignAssets: [2],
          onComplete: 0,
          suggestedParams: expect.objectContaining(mockSuggestedParams),
        })
      );
    });
  });

  describe('Error Handling', () => {
    it('should throw error for unknown tool', async () => {
      await expect(AppTransactionManager.handleTool('unknown_tool', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.MethodNotFound, 'Unknown application transaction tool: unknown_tool'));
    });

    it('should throw error for missing application creation parameters', async () => {
      await expect(AppTransactionManager.handleTool('make_app_create_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid application creation parameters'));
    });

    it('should throw error for missing application update parameters', async () => {
      await expect(AppTransactionManager.handleTool('make_app_update_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid application update parameters'));
    });

    it('should throw error for missing application delete parameters', async () => {
      await expect(AppTransactionManager.handleTool('make_app_delete_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid application delete parameters'));
    });

    it('should throw error for missing application opt-in parameters', async () => {
      await expect(AppTransactionManager.handleTool('make_app_optin_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid application opt-in parameters'));
    });

    it('should throw error for missing application close-out parameters', async () => {
      await expect(AppTransactionManager.handleTool('make_app_closeout_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid application close out parameters'));
    });

    it('should throw error for missing application clear state parameters', async () => {
      await expect(AppTransactionManager.handleTool('make_app_clear_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid application clear state parameters'));
    });

    it('should throw error for missing application call parameters', async () => {
      await expect(AppTransactionManager.handleTool('make_app_call_txn', {}))
        .rejects
        .toThrow(new McpError(ErrorCode.InvalidParams, 'Invalid application call parameters'));
    });

    it('should handle algod client errors', async () => {
      const error = new Error('Network error');
      (algodClient.getTransactionParams as jest.Mock)().do.mockRejectedValue(error);

      await expect(AppTransactionManager.handleTool('make_app_create_txn', {
        from: 'sender',
        approvalProgram: '#pragma version 6\nint 1',
        clearProgram: '#pragma version 6\nint 1',
        globalByteSlices: 1,
        globalInts: 1,
        localByteSlices: 1,
        localInts: 1,
      }))
        .rejects
        .toThrow(error);
    });
  });
});
