import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { quoteTools, handleQuoteTools } from './quote.js';
import { swapTools, handleSwapTools } from './swap.js';
import { optinTools, handleOptinTools } from './optin.js';

// Combine all Haystack Router tools
export const haystackTools: Tool[] = [
  ...quoteTools,
  ...swapTools,
  ...optinTools,
];

// Handle all Haystack Router tools
export async function handleHaystackTools(name: string, args: any): Promise<any> {
  try {
    const combinedArgs = { name, ...args };

    // Swap execution (must come before quote due to prefix matching)
    if (name === 'api_haystack_execute_swap') {
      return handleSwapTools(combinedArgs);
    }

    // Quote tools
    if (name === 'api_haystack_get_swap_quote') {
      return handleQuoteTools(combinedArgs);
    }

    // Opt-in check
    if (name === 'api_haystack_needs_optin') {
      return handleOptinTools(combinedArgs);
    }

    throw new McpError(
      ErrorCode.MethodNotFound,
      `Unknown Haystack Router tool: ${name}`
    );
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle Haystack Router tool: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
