import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { 
  transactionResources,
  transactionResourceSchemas,
  pendingTransactionInformation,
  pendingTransactionsByAddress,
  pendingTransactions,
  getTransactionParams,
  status,
  statusAfterBlock,
  handleTransactionResources
} from '../../../src/resources/algod/transaction.js';
import { algodClient } from '../../../src/algorand-client.js';

// Mock algosdk client
jest.mock('../../../src/algorand-client.js', () => ({
  algodClient: {
    pendingTransactionInformation: jest.fn(),
    pendingTransactionByAddress: jest.fn(),
    pendingTransactionsInformation: jest.fn(),
    getTransactionParams: jest.fn(),
    status: jest.fn(),
    statusAfterBlock: jest.fn()
  },
  API_URIS: {
    PENDING_TRANSACTION: 'algorand://transaction/{txid}/pending',
    PENDING_TRANSACTIONS_BY_ADDRESS: 'algorand://account/{address}/transactions/pending',
    PENDING_TRANSACTIONS: 'algorand://transactions/pending',
    TRANSACTION_PARAMS: 'algorand://transaction/params',
    NODE_STATUS: 'algorand://node/status',
    NODE_STATUS_AFTER_BLOCK: 'algorand://node/status/after/{round}'
  }
}));

describe('Algod Transaction Resources', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Resource Definitions', () => {
    it('should define transaction resources', () => {
      expect(transactionResources).toHaveLength(6);
      expect(transactionResources.map(r => r.name)).toEqual([
        'Pending Transaction',
        'Pending Transactions By Address',
        'All Pending Transactions',
        'Transaction Parameters',
        'Node Status',
        'Node Status After Block'
      ]);
    });

    it('should define resource schemas', () => {
      expect(Object.keys(transactionResourceSchemas)).toHaveLength(6);
      expect(transactionResourceSchemas).toHaveProperty('algorand://transaction/{txid}/pending');
      expect(transactionResourceSchemas).toHaveProperty('algorand://account/{address}/transactions/pending');
      expect(transactionResourceSchemas).toHaveProperty('algorand://transactions/pending');
      expect(transactionResourceSchemas).toHaveProperty('algorand://transaction/params');
      expect(transactionResourceSchemas).toHaveProperty('algorand://node/status');
      expect(transactionResourceSchemas).toHaveProperty('algorand://node/status/after/{round}');
    });
  });

  describe('Pending Transaction Information', () => {
    const mockTxId = 'MOCK_TX_ID';
    const mockResponse = {
      poolError: '',
      txn: { type: 'pay' },
      confirmedRound: 1234
    };

    beforeEach(() => {
      (algodClient.pendingTransactionInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch pending transaction information', async () => {
      const result = await pendingTransactionInformation(mockTxId);
      expect(result).toEqual(mockResponse);
      expect(algodClient.pendingTransactionInformation).toHaveBeenCalledWith(mockTxId);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.pendingTransactionInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(pendingTransactionInformation(mockTxId))
        .rejects
        .toThrow('Failed to get pending transaction: Network error');
    });
  });

  describe('Pending Transactions By Address', () => {
    const mockAddress = 'MOCK_ADDRESS';
    const mockResponse = {
      topTransactions: [{ txn: { type: 'pay' } }],
      totalTransactions: 1
    };

    beforeEach(() => {
      (algodClient.pendingTransactionByAddress as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch pending transactions by address', async () => {
      const result = await pendingTransactionsByAddress(mockAddress);
      expect(result).toEqual(mockResponse);
      expect(algodClient.pendingTransactionByAddress).toHaveBeenCalledWith(mockAddress);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.pendingTransactionByAddress as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(pendingTransactionsByAddress(mockAddress))
        .rejects
        .toThrow('Failed to get pending transactions by address: Network error');
    });
  });

  describe('All Pending Transactions', () => {
    const mockResponse = {
      topTransactions: [{ txn: { type: 'pay' } }],
      totalTransactions: 1
    };

    beforeEach(() => {
      (algodClient.pendingTransactionsInformation as jest.Mock).mockReturnValue({
        max: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch all pending transactions', async () => {
      const result = await pendingTransactions();
      expect(result).toEqual(mockResponse);
      expect(algodClient.pendingTransactionsInformation).toHaveBeenCalled();
    });

    it('should handle max transactions parameter', async () => {
      const maxTxns = 10;
      await pendingTransactions(maxTxns);
      const mockMax = (algodClient.pendingTransactionsInformation as jest.Mock).mock.results[0].value.max;
      expect(mockMax).toHaveBeenCalledWith(maxTxns);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.pendingTransactionsInformation as jest.Mock).mockReturnValue({
        max: jest.fn().mockReturnThis(),
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(pendingTransactions())
        .rejects
        .toThrow('Failed to get pending transactions: Network error');
    });
  });

  describe('Transaction Parameters', () => {
    const mockResponse = {
      fee: 1000,
      firstRound: 1234,
      lastRound: 1235,
      genesisHash: 'hash',
      genesisID: 'testnet-v1.0'
    };

    beforeEach(() => {
      (algodClient.getTransactionParams as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch transaction parameters', async () => {
      const result = await getTransactionParams();
      expect(result).toEqual(mockResponse);
      expect(algodClient.getTransactionParams).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.getTransactionParams as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(getTransactionParams())
        .rejects
        .toThrow('Failed to get transaction params: Network error');
    });
  });

  describe('Node Status', () => {
    const mockResponse = {
      lastRound: 1234,
      catchupTime: 0,
      hasSyncedSinceStartup: true
    };

    beforeEach(() => {
      (algodClient.status as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch node status', async () => {
      const result = await status();
      expect(result).toEqual(mockResponse);
      expect(algodClient.status).toHaveBeenCalled();
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.status as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(status())
        .rejects
        .toThrow('Failed to get status: Network error');
    });
  });

  describe('Status After Block', () => {
    const mockRound = 1234;
    const mockResponse = {
      lastRound: mockRound + 1,
      catchupTime: 0,
      hasSyncedSinceStartup: true
    };

    beforeEach(() => {
      (algodClient.statusAfterBlock as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch status after block', async () => {
      const result = await statusAfterBlock(mockRound);
      expect(result).toEqual(mockResponse);
      expect(algodClient.statusAfterBlock).toHaveBeenCalledWith(mockRound);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.statusAfterBlock as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(statusAfterBlock(mockRound))
        .rejects
        .toThrow('Failed to get status after block: Network error');
    });
  });

  describe('Resource Handler', () => {
    const mockTxId = 'MOCK_TX_ID';
    const mockAddress = 'MOCK_ADDRESS';
    const mockRound = 1234;

    beforeEach(() => {
      // Reset all mocks with success responses
      (algodClient.pendingTransactionInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({ txn: { type: 'pay' }, confirmedRound: mockRound })
      });
      (algodClient.pendingTransactionByAddress as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({ topTransactions: [], totalTransactions: 0 })
      });
      (algodClient.pendingTransactionsInformation as jest.Mock).mockReturnValue({
        max: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue({ topTransactions: [], totalTransactions: 0 })
      });
      (algodClient.getTransactionParams as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({ fee: 1000 })
      });
      (algodClient.status as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({ lastRound: mockRound })
      });
      (algodClient.statusAfterBlock as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({ lastRound: mockRound + 1 })
      });
    });

    it('should handle pending transaction URI', async () => {
      const uri = `algorand://transaction/${mockTxId}/pending`;
      const result = await handleTransactionResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('transaction');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should handle pending transactions by address URI', async () => {
      const uri = `algorand://account/${mockAddress}/transactions/pending`;
      const result = await handleTransactionResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('transactions');
      expect(JSON.parse(result[0].text)).toHaveProperty('totalTransactions');
    });

    it('should handle all pending transactions URI', async () => {
      const uri = 'algorand://transactions/pending';
      const result = await handleTransactionResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('transactions');
      expect(JSON.parse(result[0].text)).toHaveProperty('totalTransactions');
    });

    it('should handle transaction parameters URI', async () => {
      const uri = 'algorand://transaction/params';
      const result = await handleTransactionResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('params');
    });

    it('should handle node status URI', async () => {
      const uri = 'algorand://node/status';
      const result = await handleTransactionResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('status');
    });

    it('should handle status after block URI', async () => {
      const uri = `algorand://node/status/after/${mockRound}`;
      const result = await handleTransactionResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('status');
    });

    it('should return empty array for unknown URI', async () => {
      const uri = 'algorand://unknown';
      const result = await handleTransactionResources(uri);
      expect(result).toHaveLength(0);
    });

    it('should handle errors with McpError', async () => {
      const error = new Error('Network error');
      (algodClient.pendingTransactionInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      const uri = `algorand://transaction/${mockTxId}/pending`;
      await expect(handleTransactionResources(uri))
        .rejects
        .toThrow(new McpError(ErrorCode.InternalError, 'Network error'));
    });
  });
});
