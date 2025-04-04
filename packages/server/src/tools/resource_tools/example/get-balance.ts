import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types';
import { ResponseProcessor } from '../../utils/responseProcessor';
import { algodClient } from '../../../algorand-client';

/**
 * Example tool to demonstrate implementation patterns
 * Gets account balance and assets for a given address
 * 
 * @param {Object} args - Tool arguments
 * @param {string} args.address - Algorand address to check
 * @returns {Promise<Object>} Account balance information including assets
 * @throws {McpError} If address is invalid or operation fails
 */
export const getBalanceToolSchema = {
  type: 'object',
  properties: {
    address: {
      type: 'string',
      description: 'Algorand address in standard format (58 characters)'
    }
  },
  required: ['address']
};

export const getBalanceTool = async (args: { address: string }) => {
  try {
    // Input validation
    if (!args.address) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Missing required parameter: address'
      );
    }

    if (!/^[A-Z2-7]{58}$/.test(args.address)) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Invalid Algorand address format'
      );
    }

    // Get account information using Algorand client
    const accountInfo = await algodClient.accountInformation(args.address).do();

    // Format response data
    const response = {
      address: args.address,
      amount: accountInfo.amount,
      assets: accountInfo.assets || [],
      status: 'success'
    };

    // Use ResponseProcessor to format the output
    return ResponseProcessor.processResponse(response);
  } catch (error: unknown) {
    // Handle specific Algorand API errors
    if (error instanceof McpError) {
      throw error;
    }

    // Format error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get account balance: ${errorMessage}`
    );
  }
};
