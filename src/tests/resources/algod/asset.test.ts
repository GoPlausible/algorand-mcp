import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { 
  assetResources,
  assetResourceSchemas,
  getAssetByID,
  handleAssetResources
} from '../../../src/resources/algod/asset.js';
import { algodClient } from '../../../src/algorand-client.js';

// Mock algosdk client
jest.mock('../../../src/algorand-client.js', () => ({
  algodClient: {
    getAssetByID: jest.fn()
  },
  API_URIS: {
    ASSET_INFO: 'algorand://asset/{asset-id}/info'
  }
}));

describe('Algod Asset Resources', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Resource Definitions', () => {
    it('should define asset resources', () => {
      expect(assetResources).toHaveLength(1);
      expect(assetResources[0].name).toBe('Asset Info');
    });

    it('should define resource schemas', () => {
      expect(Object.keys(assetResourceSchemas)).toHaveLength(1);
      expect(assetResourceSchemas).toHaveProperty('algorand://asset/{asset-id}/info');
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
      (algodClient.getAssetByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch asset information', async () => {
      const result = await getAssetByID(mockAssetId);
      expect(result).toEqual(mockResponse);
      expect(algodClient.getAssetByID).toHaveBeenCalledWith(mockAssetId);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.getAssetByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(getAssetByID(mockAssetId))
        .rejects
        .toThrow('Failed to get asset info: Network error');
    });
  });

  describe('Resource Handler', () => {
    const mockAssetId = 123;
    const mockResponse = {
      asset: {
        index: mockAssetId,
        params: {
          creator: 'MOCK_ADDRESS',
          name: 'Test Asset'
        }
      },
      currentRound: 1234
    };

    beforeEach(() => {
      (algodClient.getAssetByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should handle asset info URI', async () => {
      const uri = `algorand://asset/${mockAssetId}/info`;
      const result = await handleAssetResources(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toEqual({
        asset: mockResponse.asset,
        currentRound: mockResponse.currentRound
      });
    });

    it('should return empty array for unknown URI', async () => {
      const uri = 'algorand://unknown';
      const result = await handleAssetResources(uri);
      expect(result).toHaveLength(0);
    });

    it('should handle errors with McpError', async () => {
      const error = new Error('Network error');
      (algodClient.getAssetByID as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      const uri = `algorand://asset/${mockAssetId}/info`;
      await expect(handleAssetResources(uri))
        .rejects
        .toThrow(new McpError(ErrorCode.InternalError, 'Network error'));
    });
  });
});
