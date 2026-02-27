import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { getAlgodClient, extractNetwork } from '../../../algorand-client.js';

export const getBalanceToolSchema = {
  type: 'object',
  properties: {
    address: {
      type: 'string',
      description: 'Algorand address in standard format (58 characters)',
    },
  },
  required: ['address'],
};

export const getBalanceTool = async (args: Record<string, unknown>) => {
  try {
    if (!args.address) {
      throw new McpError(ErrorCode.InvalidParams, 'Missing required parameter: address');
    }
    if (!/^[A-Z2-7]{58}$/.test(args.address as string)) {
      throw new McpError(ErrorCode.InvalidParams, 'Invalid Algorand address format');
    }
    const network = extractNetwork(args);
    const algodClient = getAlgodClient(network);
    const accountInfo = await algodClient.accountInformation(args.address as string).do();
    return accountInfo;
  } catch (error) {
    if (error instanceof McpError) throw error;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new McpError(ErrorCode.InternalError, `Failed to get account balance: ${errorMessage}`);
  }
};
