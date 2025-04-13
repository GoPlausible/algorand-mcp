import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types';
import { getBalanceTool } from '../../../../src/tools/apiManager/example/get-balance';
import { algodClient } from '../../../../src/algorand-client';

jest.mock('../../../../src/algorand-client', () => ({
  algodClient: {
    accountInformation: jest.fn()
  }
}));

describe('Example Get Balance Tool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle valid address', async () => {
    const validAddress = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    const mockAccountInfo = {
      amount: 1000000,
      assets: []
    };

    // Mock the Algorand client response
    (algodClient.accountInformation as jest.Mock).mockReturnValue({
      do: jest.fn().mockResolvedValue(mockAccountInfo)
    });

    const result = await getBalanceTool({ address: validAddress });
    
    expect(result).toBeDefined();
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('text');
    
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed.data).toBeDefined();
    expect(parsed.data.address).toBe(validAddress);
    expect(parsed.data.amount).toBe(mockAccountInfo.amount);
    expect(Array.isArray(parsed.data.assets)).toBe(true);
    expect(parsed.data.status).toBe('success');
  });

  it('should reject invalid address format', async () => {
    await expect(getBalanceTool({ 
      address: 'invalid-address'
    })).rejects.toThrow(new McpError(
      ErrorCode.InvalidParams,
      'Invalid Algorand address format'
    ));
  });

  it('should reject missing address', async () => {
    await expect(getBalanceTool({
      address: ''
    })).rejects.toThrow(new McpError(
      ErrorCode.InvalidParams,
      'Missing required parameter: address'
    ));
  });

  it('should handle Algorand API errors', async () => {
    const validAddress = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    const mockError = new Error('API Error');

    // Mock the Algorand client to throw an error
    (algodClient.accountInformation as jest.Mock).mockReturnValue({
      do: jest.fn().mockRejectedValue(mockError)
    });

    await expect(getBalanceTool({
      address: validAddress
    })).rejects.toThrow(new McpError(
      ErrorCode.InternalError,
      `Failed to get account balance: ${mockError.message}`
    ));
  });
});
