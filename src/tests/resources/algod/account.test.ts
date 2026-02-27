import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { 
  accountResources, 
  accountResourceSchemas,
  accountInformation,
  accountApplicationInformation,
  accountAssetInformation,
  handleAccountResource
} from '../../../src/resources/algod/account.js';
import { algodClient } from '../../../src/algorand-client.js';

// Mock algosdk client
jest.mock('../../../src/algorand-client.js', () => ({
  algodClient: {
    accountInformation: jest.fn(),
    accountApplicationInformation: jest.fn(),
    accountAssetInformation: jest.fn()
  },
  API_URIS: {
    ACCOUNT_DETAILS: 'algorand://account/{address}',
    APPLICATION_STATE: 'algorand://account/{address}/application/{app-id}',
    ASSET_HOLDINGS: 'algorand://account/{address}/asset/{asset-id}'
  }
}));

describe('Algod Account Resources', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Resource Definitions', () => {
    it('should define account resources', () => {
      expect(accountResources).toHaveLength(3);
      expect(accountResources.map(r => r.name)).toEqual([
        'Account Details',
        'Account Application Info',
        'Account Asset Info'
      ]);
    });

    it('should define resource schemas', () => {
      expect(Object.keys(accountResourceSchemas)).toHaveLength(3);
      expect(accountResourceSchemas).toHaveProperty('algorand://account/{address}');
      expect(accountResourceSchemas).toHaveProperty('algorand://account/{address}/application/{app-id}');
      expect(accountResourceSchemas).toHaveProperty('algorand://account/{address}/asset/{asset-id}');
    });
  });

  describe('Account Information', () => {
    const mockAddress = 'MOCK_ADDRESS';
    const mockResponse = {
      account: { address: mockAddress, amount: 1000 },
      currentRound: 1234
    };

    beforeEach(() => {
      (algodClient.accountInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch account information', async () => {
      const result = await accountInformation(mockAddress);
      expect(result).toEqual(mockResponse);
      expect(algodClient.accountInformation).toHaveBeenCalledWith(mockAddress);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.accountInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(accountInformation(mockAddress))
        .rejects
        .toThrow('Failed to get account info: Network error');
    });
  });

  describe('Account Application Information', () => {
    const mockAddress = 'MOCK_ADDRESS';
    const mockAppId = 123;
    const mockResponse = {
      account: { address: mockAddress, appLocalState: {} },
      currentRound: 1234
    };

    beforeEach(() => {
      (algodClient.accountApplicationInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch application information', async () => {
      const result = await accountApplicationInformation(mockAddress, mockAppId);
      expect(result).toEqual(mockResponse);
      expect(algodClient.accountApplicationInformation).toHaveBeenCalledWith(mockAddress, mockAppId);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.accountApplicationInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(accountApplicationInformation(mockAddress, mockAppId))
        .rejects
        .toThrow('Failed to get account application info: Network error');
    });
  });

  describe('Account Asset Information', () => {
    const mockAddress = 'MOCK_ADDRESS';
    const mockAssetId = 456;
    const mockResponse = {
      account: { address: mockAddress, assets: [] },
      currentRound: 1234
    };

    beforeEach(() => {
      (algodClient.accountAssetInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should fetch asset information', async () => {
      const result = await accountAssetInformation(mockAddress, mockAssetId);
      expect(result).toEqual(mockResponse);
      expect(algodClient.accountAssetInformation).toHaveBeenCalledWith(mockAddress, mockAssetId);
    });

    it('should handle errors', async () => {
      const error = new Error('Network error');
      (algodClient.accountAssetInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      await expect(accountAssetInformation(mockAddress, mockAssetId))
        .rejects
        .toThrow('Failed to get account asset info: Network error');
    });
  });

  describe('Resource Handler', () => {
    const mockAddress = 'MOCK_ADDRESS';
    const mockResponse = {
      account: { address: mockAddress },
      currentRound: 1234
    };

    beforeEach(() => {
      (algodClient.accountInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
      (algodClient.accountApplicationInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
      (algodClient.accountAssetInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockResolvedValue(mockResponse)
      });
    });

    it('should handle account details URI', async () => {
      const uri = `algorand://account/${mockAddress}`;
      const result = await handleAccountResource(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toEqual(mockResponse);
    });

    it('should handle application info URI', async () => {
      const uri = `algorand://account/${mockAddress}/application/123`;
      const result = await handleAccountResource(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toEqual(mockResponse);
    });

    it('should handle asset info URI', async () => {
      const uri = `algorand://account/${mockAddress}/asset/456`;
      const result = await handleAccountResource(uri);
      expect(result).toHaveLength(1);
      expect(JSON.parse(result[0].text)).toEqual(mockResponse);
    });

    it('should return empty array for unknown URI', async () => {
      const uri = 'algorand://unknown';
      const result = await handleAccountResource(uri);
      expect(result).toHaveLength(0);
    });

    it('should handle errors with McpError', async () => {
      const error = new Error('Network error');
      (algodClient.accountInformation as jest.Mock).mockReturnValue({
        do: jest.fn().mockRejectedValue(error)
      });

      const uri = `algorand://account/${mockAddress}`;
      await expect(handleAccountResource(uri))
        .rejects
        .toThrow(new McpError(ErrorCode.InternalError, 'Network error'));
    });
  });
});
