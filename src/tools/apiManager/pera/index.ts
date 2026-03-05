import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { peraAssetTools, handlePeraAssetTools } from './asset.js';

export const peraTools: Tool[] = [
  ...peraAssetTools,
];

export async function handlePeraTools(name: string, args: any): Promise<any> {
  try {
    const combinedArgs = { name, ...args };
    return handlePeraAssetTools(combinedArgs);
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle Pera tool: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
