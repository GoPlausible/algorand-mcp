import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { 
  assetResources,
  assetResourceSchemas,
  lookupAssetByID,
  lookupAssetBalances,
  lookupAssetTransactions,
  searchForAssets,
  handleAssetResources
} from '../../../src/resources/indexer/asset.js';
import { indexerClient } from '../../../src/algorand-client.js';

// Mock algosdk client
jest.mock('../../../src/algorand-client.js', () => ({
  indexerClient: {
    lookupAssetByID: jest.fn(),
    lookupAssetBalances: jest.fn(),
    lookupAssetTransactions: jest.fn(),
    searchForAssets: jest.fn()
  },
  API_URIS: {
    ASSET_DETAILS: 'algorand://asset/{asset-id}',
    ASSET_BALANCES: 'algorand://asset/{asset-id}/balances',
    ASSET_TRANSACTIONS: 'algorand://asset/{asset-id}/transactions',
    ASSET_BALANCES_BY_ID: 'algorand://asset/{asset-id}/balances/{address}',
    ASSET_TRANSACTIONS_BY_ID: 'algorand://asset/{asset-id}/transactions/{txid}'
  }
}));

describe('Indexer Asset Resources', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Resource Definitions', () => {
    it('should define asset resources', () => {
      expect(assetResources).toHaveLength(5);
      expect(assetResources.map(r => r.name)).toEqual([
        'Asset Details',
        'Asset Balances',
        'Asset Transactions',
        'Asset Balance By Address',
        'Asset Transaction By ID'
      ]);
    });

    it('should define resource schemas', () => {
      expect(Object.keys(assetResourceSchemas)).toHaveLength(5);
      expect(assetResourceSchemas).toHaveProperty('algorand://asset/{asset-id}');
      expect(assetResourceSchemas).toHaveProperty('algorand://asset/{asset-id}/balances');
      expect(assetResourceSchemas).toHaveProperty('algorand://asset/{asset-id}/transactions');
      expect(assetResourceSchemas).toHaveProperty('algorand://asset/{asset-id}/balances/{address}');
      expect(assetResourceSchemas).toHaveProperty('algorand://asset/{asset-id}/transactions/{txid}');
    });
  });

  describe('Asset Information', () => {
    const mockAssetId = 123;
    const mockResponse = {
      asset: {
        index: mockAssetId,
        params: {
          creator: 'MOCK_ADDRESS',
          name: 'Test Asset',
          unitName: 'TEST',
          total: 1000000,
          decimals: 6
        }
      },
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupAssetByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch asset information', async () => {
      const result = await lookupAssetByID(mockAssetId);
      expect(result).toEqual(mockResponse);
      expect(indexerClient.lookupAssetByID).toHaveBeenCalledWith(mockAssetId);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupAssetByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(lookupAssetByID(mockAssetId))
        .rejects
        .toThrow('Failed to get asset info: Network error');
    });
  });

  describe('Asset Balances', () => {
    const mockAssetId = 123;
    const mockResponse = {
      balances: [{ address: 'addr1', amount: 100 }],
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupAssetBalances as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        currencyGreaterThan: jest.fn().mockReturnThis(),
        currencyLessThan: jest.fn().mockReturnThis(),
        nextToken: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch asset balances', async () => {
      const result = await lookupAssetBalances(mockAssetId);
      expect(result).toEqual(mockResponse);
      expect(indexerClient.lookupAssetBalances).toHaveBeenCalledWith(mockAssetId);
    });

    it('should handle search parameters', async () => {
      const params = {
        limit: 10,
        currencyGreaterThan: 1000,
        currencyLessThan: 2000,
        nextToken: 'token123'
      };

      await lookupAssetBalances(mockAssetId, params);
      const mock = indexerClient.lookupAssetBalances as jest.Mock;
      const chain = mock.mock.results[0].value;

      expect(chain.limit).toHaveBeenCalledWith(params.limit);
      expect(chain.currencyGreaterThan).toHaveBeenCalledWith(params.currencyGreaterThan);
      expect(chain.currencyLessThan).toHaveBeenCalledWith(params.currencyLessThan);
      expect(chain.nextToken).toHaveBeenCalledWith(params.nextToken);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupAssetBalances as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(lookupAssetBalances(mockAssetId))
        .rejects
        .toThrow('Failed to get asset balances: Network error');
    });
  });

  describe('Asset Transactions', () => {
    const mockAssetId = 123;
    const mockResponse = {
      transactions: [{ id: 'txn1' }],
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.lookupAssetTransactions as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        beforeTime: jest.fn().mockReturnThis(),
        afterTime: jest.fn().mockReturnThis(),
        minRound: jest.fn().mockReturnThis(),
        maxRound: jest.fn().mockReturnThis(),
        address: jest.fn().mockReturnThis(),
        addressRole: jest.fn().mockReturnThis(),
        excludeCloseTo: jest.fn().mockReturnThis(),
        nextToken: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch asset transactions', async () => {
      const result = await lookupAssetTransactions(mockAssetId);
      expect(result).toEqual(mockResponse);
      expect(indexerClient.lookupAssetTransactions).toHaveBeenCalledWith(mockAssetId);
    });

    it('should handle search parameters', async () => {
      const params = {
        limit: 10,
        beforeTime: '2023-01-01',
        afterTime: '2022-01-01',
        minRound: 1000,
        maxRound: 2000,
        address: 'addr1',
        addressRole: 'sender',
        excludeCloseTo: true,
        nextToken: 'token123'
      };

      await lookupAssetTransactions(mockAssetId, params);
      const mock = indexerClient.lookupAssetTransactions as jest.Mock;
      const chain = mock.mock.results[0].value;

      expect(chain.limit).toHaveBeenCalledWith(params.limit);
      expect(chain.beforeTime).toHaveBeenCalledWith(params.beforeTime);
      expect(chain.afterTime).toHaveBeenCalledWith(params.afterTime);
      expect(chain.minRound).toHaveBeenCalledWith(params.minRound);
      expect(chain.maxRound).toHaveBeenCalledWith(params.maxRound);
      expect(chain.address).toHaveBeenCalledWith(params.address);
      expect(chain.addressRole).toHaveBeenCalledWith(params.addressRole);
      expect(chain.excludeCloseTo).toHaveBeenCalledWith(params.excludeCloseTo);
      expect(chain.nextToken).toHaveBeenCalledWith(params.nextToken);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupAssetTransactions as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(lookupAssetTransactions(mockAssetId))
        .rejects
        .toThrow('Failed to get asset transactions: Network error');
    });
  });

  describe('Search Assets', () => {
    const mockResponse = {
      assets: [{ index: 1, params: { name: 'Test' } }],
      currentRound: 1234
    };

    beforeEach(() => {
      (indexerClient.searchForAssets as jest.Mock).mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        creator: jest.fn().mockReturnThis(),
        name: jest.fn().mockReturnThis(),
        unit: jest.fn().mockReturnThis(),
        index: jest.fn().mockReturnThis(),
        nextToken: jest.fn().mockReturnThis(),
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should search assets', async () => {
      const result = await searchForAssets();
      expect(result).toEqual(mockResponse);
      expect(indexerClient.searchForAssets).toHaveBeenCalled();
    });

    it('should handle search parameters', async () => {
      const params = {
        limit: 10,
        creator: 'addr1',
        name: 'Test',
        unit: 'TEST',
        assetId: 123,
        nextToken: 'token123'
      };

      await searchForAssets(params);
      const mock = indexerClient.searchForAssets as jest.Mock;
      const chain = mock.mock.results[0].value;

      expect(chain.limit).toHaveBeenCalledWith(params.limit);
      expect(chain.creator).toHaveBeenCalledWith(params.creator);
      expect(chain.name).toHaveBeenCalledWith(params.name);
      expect(chain.unit).toHaveBeenCalledWith(params.unit);
      expect(chain.index).toHaveBeenCalledWith(params.assetId);
      expect(chain.nextToken).toHaveBeenCalledWith(params.nextToken);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (indexerClient.searchForAssets as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(searchForAssets())
        .rejects
        .toThrow('Failed to search assets: Network error');
    });
  });

  describe('Resource Handler', () => {
    const mockAssetId = 123;
    const mockAddress = 'MOCK_ADDRESS';
    const mockTxId = 'MOCK_TX_ID';

    beforeEach(() => {
      // Reset all mocks with success responses
      (indexerClient.lookupAssetByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({
          asset: { index: mockAssetId },
          currentRound: 1234
        })
      });
      (indexerClient.lookupAssetBalances as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({
          balances: [{ address: mockAddress }],
          currentRound: 1234
        })
      });
      (indexerClient.lookupAssetTransactions as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue({
          transactions: [{ id: mockTxId }],
          currentRound: 1234
        })
      });
    });

    it('should handle asset details URI', async () => {
      const uri = `algorand://asset/${mockAssetId}`;
      const result = await handleAssetResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('asset');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should handle asset balances URI', async () => {
      const uri = `algorand://asset/${mockAssetId}/balances`;
      const result = await handleAssetResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('balances');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should handle asset transactions URI', async () => {
      const uri = `algorand://asset/${mockAssetId}/transactions`;
      const result = await handleAssetResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('transactions');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should handle asset balance by address URI', async () => {
      const uri = `algorand://asset/${mockAssetId}/balances/${mockAddress}`;
      const result = await handleAssetResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('balance');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should handle asset transaction by ID URI', async () => {
      const uri = `algorand://asset/${mockAssetId}/transactions/${mockTxId}`;
      const result = await handleAssetResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toHaveProperty('transaction');
      expect(JSON.parse(result[0].text)).toHaveProperty('currentRound');
    });

    it('should return empty array for unknown URI', async () => {
      const uri = 'algorand://unknown';
      const result = await handleAssetResources(uri);
      expect(result).toHaveLength(0);
    });

    it('should handle errors with McpError', async () => {
      const error = new Error('Network error');
      (indexerClient.lookupAssetByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      const uri = `algorand://asset/${mockAssetId}`;
      await expect(handleAssetResources(uri))
        .rejects
        .toThrow(new McpError(ErrorCode.InternalError, 'Failed to get asset details: Network error'));
    });
  });
});
