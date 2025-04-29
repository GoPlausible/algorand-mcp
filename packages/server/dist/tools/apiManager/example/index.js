import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { getBalanceTool, getBalanceToolSchema } from './get-balance.js';
// Define tool configurations
export const exampleTools = [
    {
        name: 'api_example_get_balance',
        description: 'Get account balance and assets',
        handler: getBalanceTool,
        inputSchema: getBalanceToolSchema
    }
];
// Handle example tools
export async function handleExampleTools(name, args) {
    switch (name) {
        case 'api_example_get_balance':
            return getBalanceTool(args);
        default:
            throw new McpError(ErrorCode.MethodNotFound, `Unknown example tool: ${name}`);
    }
}
