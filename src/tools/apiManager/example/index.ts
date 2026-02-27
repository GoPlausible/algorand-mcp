import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { getBalanceTool, getBalanceToolSchema } from './get-balance.js';
import { withCommonParams } from '../../commonParams.js';

export const exampleTools = [
  {
    name: 'api_example_get_balance',
    description: 'Get account balance and assets',
    inputSchema: withCommonParams(getBalanceToolSchema),
  },
];

export async function handleExampleTools(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'api_example_get_balance':
      return getBalanceTool(args);
    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown example tool: ${name}`);
  }
}
