import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { TransactionManager, transactionTools } from '../../../src/tools/transactionManager/index.js';
import { AccountTransactionManager } from '../../../src/tools/transactionManager/accountTransactions.js';
import { AssetTransactionManager } from '../../../src/tools/transactionManager/assetTransactions.js';
import { AppTransactionManager } from '../../../src/tools/transactionManager/appTransactions.js';
import { GeneralTransactionManager } from '../../../src/tools/transactionManager/generalTransaction.js';

// Mock all transaction managers
jest.mock('../../../src/tools/transactionManager/accountTransactions.js', () => ({
  AccountTransactionManager: {
    handleTool: jest.fn(),
  },
  accountTransactionTools: [
    { name: 'make_payment_txn' },
    { name: 'make_keyreg_txn' }
  ]
}));

jest.mock('../../../src/tools/transactionManager/assetTransactions.js', () => ({
  AssetTransactionManager: {
    handleTool: jest.fn(),
  },
  assetTransactionTools: [
    { name: 'make_asset_create_txn' },
    { name: 'make_asset_config_txn' },
    { name: 'make_asset_destroy_txn' },
    { name: 'make_asset_freeze_txn' },
    { name: 'make_asset_transfer_txn' }
  ]
}));

jest.mock('../../../src/tools/transactionManager/appTransactions.js', () => ({
  AppTransactionManager: {
    handleTool: jest.fn(),
  },
  appTransactionTools: [
    { name: 'make_app_create_txn' },
    { name: 'make_app_update_txn' },
    { name: 'make_app_delete_txn' },
    { name: 'make_app_optin_txn' },
    { name: 'make_app_closeout_txn' },
    { name: 'make_app_clear_txn' },
    { name: 'make_app_call_txn' }
  ]
}));

jest.mock('../../../src/tools/transactionManager/generalTransaction.js', () => ({
  GeneralTransactionManager: {
    handleTool: jest.fn(),
  },
  generalTransactionTools: [
    { name: 'assign_group_id' }
  ]
}));

describe('TransactionManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Tool Routing', () => {
    const mockArgs = { test: 'args' };
    const mockResponse = { content: [{ type: 'text', text: 'test' }] };

    beforeEach(() => {
      (AccountTransactionManager.handleTool as jest.Mock).mockResolvedValue(mockResponse);
      (AssetTransactionManager.handleTool as jest.Mock).mockResolvedValue(mockResponse);
      (AppTransactionManager.handleTool as jest.Mock).mockResolvedValue(mockResponse);
      (GeneralTransactionManager.handleTool as jest.Mock).mockResolvedValue(mockResponse);
    });

    it('should route payment transaction tools to AccountTransactionManager', async () => {
      const result = await TransactionManager.handleTool('make_payment_txn', mockArgs);
      
      expect(result).toBe(mockResponse);
      expect(AccountTransactionManager.handleTool).toHaveBeenCalledWith('make_payment_txn', mockArgs);
    });

    it('should route keyreg transaction tools to AccountTransactionManager', async () => {
      const result = await TransactionManager.handleTool('make_keyreg_txn', mockArgs);
      
      expect(result).toBe(mockResponse);
      expect(AccountTransactionManager.handleTool).toHaveBeenCalledWith('make_keyreg_txn', mockArgs);
    });

    it('should route asset transaction tools to AssetTransactionManager', async () => {
      const result = await TransactionManager.handleTool('make_asset_create_txn', mockArgs);
      
      expect(result).toBe(mockResponse);
      expect(AssetTransactionManager.handleTool).toHaveBeenCalledWith('make_asset_create_txn', mockArgs);
    });

    it('should route application transaction tools to AppTransactionManager', async () => {
      const result = await TransactionManager.handleTool('make_app_create_txn', mockArgs);
      
      expect(result).toBe(mockResponse);
      expect(AppTransactionManager.handleTool).toHaveBeenCalledWith('make_app_create_txn', mockArgs);
    });

    it('should route general transaction tools to GeneralTransactionManager', async () => {
      const result = await TransactionManager.handleTool('assign_group_id', mockArgs);
      
      expect(result).toBe(mockResponse);
      expect(GeneralTransactionManager.handleTool).toHaveBeenCalledWith('assign_group_id', mockArgs);
    });

    it('should throw error for unknown tool', async () => {
      await expect(TransactionManager.handleTool('unknown_tool', mockArgs))
        .rejects
        .toThrow(new McpError(ErrorCode.MethodNotFound, 'Unknown transaction tool: unknown_tool'));
    });
  });

  describe('Tool Registration', () => {
    it('should combine all transaction tools', () => {
      const allTools = [
        'make_payment_txn',
        'make_keyreg_txn',
        'make_asset_create_txn',
        'make_asset_config_txn',
        'make_asset_destroy_txn',
        'make_asset_freeze_txn',
        'make_asset_transfer_txn',
        'make_app_create_txn',
        'make_app_update_txn',
        'make_app_delete_txn',
        'make_app_optin_txn',
        'make_app_closeout_txn',
        'make_app_clear_txn',
        'make_app_call_txn',
        'assign_group_id'
      ];

      expect(transactionTools.map((t: { name: string }) => t.name)).toEqual(allTools);
    });
  });

  describe('Error Handling', () => {
    it('should propagate errors from AccountTransactionManager', async () => {
      const error = new McpError(ErrorCode.InvalidParams, 'Test error');
      (AccountTransactionManager.handleTool as jest.Mock).mockRejectedValue(error);

      await expect(TransactionManager.handleTool('make_payment_txn', {}))
        .rejects
        .toThrow(error);
    });

    it('should propagate errors from AssetTransactionManager', async () => {
      const error = new McpError(ErrorCode.InvalidParams, 'Test error');
      (AssetTransactionManager.handleTool as jest.Mock).mockRejectedValue(error);

      await expect(TransactionManager.handleTool('make_asset_create_txn', {}))
        .rejects
        .toThrow(error);
    });

    it('should propagate errors from AppTransactionManager', async () => {
      const error = new McpError(ErrorCode.InvalidParams, 'Test error');
      (AppTransactionManager.handleTool as jest.Mock).mockRejectedValue(error);

      await expect(TransactionManager.handleTool('make_app_create_txn', {}))
        .rejects
        .toThrow(error);
    });

    it('should propagate errors from GeneralTransactionManager', async () => {
      const error = new McpError(ErrorCode.InvalidParams, 'Test error');
      (GeneralTransactionManager.handleTool as jest.Mock).mockRejectedValue(error);

      await expect(TransactionManager.handleTool('assign_group_id', {}))
        .rejects
        .toThrow(error);
    });
  });
});
