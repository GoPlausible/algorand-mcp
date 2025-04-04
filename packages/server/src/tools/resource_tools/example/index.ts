import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types';
import { getBalanceTool, getBalanceToolSchema } from './get-balance';

// Define tool configurations
export const exampleTools = [
  {
    name: 'resource_example_get_balance',
    description: 'Get account balance and assets',
    handler: getBalanceTool,
    inputSchema: getBalanceToolSchema
  }
];

// Handle example tools
export async function handleExampleTools(name: string, args: any): Promise<any> {
  switch (name) {
    case 'resource_example_get_balance':
      return getBalanceTool(args);
    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown example tool: ${name}`
      );
  }
}
