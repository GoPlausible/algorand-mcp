import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { AlgodManager } from '../../src/tools/algodManager.js';
import { algodClient } from '../../src/algorand-client.js';
import algosdk, { modelsv2 } from 'algosdk';

// Rest of the file remains the same...
// Mock algosdk
jest.mock('algosdk', () => ({
  modelsv2: {
    SimulateRequest: jest.fn(),
    SimulateRequestTransactionGroup: jest.fn()
  }
}));

// Mock algodClient
jest.mock('../../src/algorand-client.js', () => ({
  algodClient: {
    compile: jest.fn(),
    disassemble: jest.fn(),
    sendRawTransaction: jest.fn(),
    simulateRawTransactions: jest.fn(),
    simulateTransactions: jest.fn(),
  }
}));

describe('AlgodManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup default mock implementations
    (algodClient.compile as jest.Mock).mockReturnValue({ do: jest.fn() });
    (algodClient.disassemble as jest.Mock).mockReturnValue({ do: jest.fn() });
    (algodClient.sendRawTransaction as jest.Mock).mockReturnValue({ do: jest.fn() });
    (algodClient.simulateRawTransactions as jest.Mock).mockReturnValue({ do: jest.fn() });
    (algodClient.simulateTransactions as jest.Mock).mockReturnValue({ do: jest.fn() });
  });

  describe('Tool Schemas', () => {
    it('should have valid tool schemas', () => {
      expect(AlgodManager.algodTools).toHaveLength(5);
      expect(AlgodManager.algodTools.map((t: { name: string }) => t.name)).toEqual([
        'compile_teal',
        'disassemble_teal',
        'send_raw_transaction',
        'simulate_raw_transactions',
        'simulate_transactions',
      ]);
    });
  });

  describe('TEAL Operations', () => {
    const mockCompileResponse = {
      hash: 'HASH',
      result: 'BASE64_BYTECODE'
    };

    const mockDisassembleResponse = {
      result: 'TEAL_SOURCE'
    };

    it('should compile TEAL source code', async () => {
      (algodClient.compile as jest.Mock)().do.mockResolvedValue(mockCompileResponse);
      
      const result = await AlgodManager.compile('int 1');
      
      expect(result).toEqual(mockCompileResponse);
      expect(algodClient.compile).toHaveBeenCalledWith('int 1');
    });

    it('should disassemble TEAL bytecode', async () => {
      (algodClient.disassemble as jest.Mock)().do.mockResolvedValue(mockDisassembleResponse);
      
      const result = await AlgodManager.disassemble('bytecode');
      
      expect(result).toEqual(mockDisassembleResponse);
      expect(algodClient.disassemble).toHaveBeenCalledWith('bytecode');
    });

    it('should handle compilation errors', async () => {
      const error = new Error('Compilation failed');
      (algodClient.compile as jest.Mock)().do.mockRejectedValue(error);
      
      await expect(AlgodManager.compile('invalid code'))
        .rejects
        .toThrow('Failed to compile TEAL: Compilation failed');
    });

    it('should handle disassembly errors', async () => {
      const error = new Error('Disassembly failed');
      (algodClient.disassemble as jest.Mock)().do.mockRejectedValue(error);
      
      await expect(AlgodManager.disassemble('invalid bytecode'))
        .rejects
        .toThrow('Failed to disassemble TEAL: Disassembly failed');
    });
  });

  describe('Transaction Operations', () => {
    const mockTxnResponse = {
      txId: 'TRANSACTION_ID'
    };

    const mockSimulateResponse = {
      lastRound: 1000,
      txnGroups: []
    };

    it('should send raw transactions', async () => {
      (algodClient.sendRawTransaction as jest.Mock)().do.mockResolvedValue(mockTxnResponse);
      
      const txn = Buffer.from('transaction');
      const result = await AlgodManager.sendRawTransaction(txn);
      
      expect(result).toEqual(mockTxnResponse);
      expect(algodClient.sendRawTransaction).toHaveBeenCalledWith(txn);
    });

    it('should simulate raw transactions', async () => {
      (algodClient.simulateRawTransactions as jest.Mock)().do.mockResolvedValue(mockSimulateResponse);
      
      const txn = Buffer.from('transaction');
      const result = await AlgodManager.simulateRawTransactions(txn);
      
      expect(result).toEqual(mockSimulateResponse);
      expect(algodClient.simulateRawTransactions).toHaveBeenCalledWith(txn);
    });

    it('should simulate transactions with configuration', async () => {
      (algodClient.simulateTransactions as jest.Mock)().do.mockResolvedValue(mockSimulateResponse);
      
      const request = {
        txnGroups: [{ txns: [] }],
        allowEmptySignatures: true,
        allowMoreLogging: true
      };

      const result = await AlgodManager.simulateTransactions(request);
      
      expect(result).toEqual(mockSimulateResponse);
      expect(modelsv2.SimulateRequest).toHaveBeenCalledWith(expect.objectContaining({
        allowEmptySignatures: true,
        allowMoreLogging: true
      }));
    });
  });

  describe('handleTool', () => {
    it('should handle compile_teal', async () => {
      const mockResponse = { hash: 'HASH', result: 'BYTECODE' };
      (algodClient.compile as jest.Mock)().do.mockResolvedValue(mockResponse);
      
      const result = await AlgodManager.handleTool('compile_teal', {
        source: 'int 1',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockResponse, null, 2),
        }],
      });
    });

    it('should handle disassemble_teal', async () => {
      const mockResponse = { result: 'int 1' };
      (algodClient.disassemble as jest.Mock)().do.mockResolvedValue(mockResponse);
      
      const result = await AlgodManager.handleTool('disassemble_teal', {
        bytecode: 'BASE64_BYTECODE',
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockResponse, null, 2),
        }],
      });
    });

    it('should handle send_raw_transaction', async () => {
      const mockResponse = { txId: 'TX_ID' };
      (algodClient.sendRawTransaction as jest.Mock)().do.mockResolvedValue(mockResponse);
      
      const result = await AlgodManager.handleTool('send_raw_transaction', {
        signedTxns: ['BASE64_TXN'],
      });

      expect(result).toEqual({
        content: [{
          type: 'text',
          text: JSON.stringify(mockResponse, null, 2),
        }],
      });
    });

    describe('Error Handling', () => {
      it('should throw error for unknown tool', async () => {
        await expect(AlgodManager.handleTool('unknown_tool', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.MethodNotFound, 'Unknown tool: unknown_tool'));
      });

      it('should throw error for missing TEAL source', async () => {
        await expect(AlgodManager.handleTool('compile_teal', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'TEAL source code is required'));
      });

      it('should throw error for missing bytecode', async () => {
        await expect(AlgodManager.handleTool('disassemble_teal', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'TEAL bytecode is required'));
      });

      it('should throw error for missing signed transactions', async () => {
        await expect(AlgodManager.handleTool('send_raw_transaction', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Signed transactions array is required'));
      });

      it('should throw error for missing transactions in simulate_raw_transactions', async () => {
        await expect(AlgodManager.handleTool('simulate_raw_transactions', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Transactions array is required'));
      });

      it('should throw error for missing transaction groups in simulate_transactions', async () => {
        await expect(AlgodManager.handleTool('simulate_transactions', {}))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Transaction groups array is required'));
      });

      it('should throw error for invalid transaction format', async () => {
        await expect(AlgodManager.handleTool('send_raw_transaction', {
          signedTxns: [123] // Not a string
        }))
          .rejects
          .toThrow(new McpError(ErrorCode.InvalidParams, 'Each transaction must be a base64 string'));
      });
    });
  });
});
