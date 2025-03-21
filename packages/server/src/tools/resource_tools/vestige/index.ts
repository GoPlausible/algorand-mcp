import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { providerTools, handleProviderTools } from './providers.js';
import { assetTools, handleAssetTools } from './assets.js';
import { poolTools, handlePoolTools } from './pools.js';
import { currencyTools, handleCurrencyTools } from './currency.js';
import { vaultTools, handleVaultTools } from './vaults.js';

// Export all Vestige tools
export const vestigeTools: Tool[] = [
  ...providerTools,
  ...assetTools,
  ...poolTools,
  ...currencyTools,
  ...vaultTools
];

// Handle all Vestige tools
export async function handleVestigeTools(name: string, args: any): Promise<any> {
  try {
    const combinedArgs = { name, ...args };

    // Provider tools
    if (name.startsWith('resource_vestige_view_providers')) {
      return handleProviderTools(combinedArgs);
    }

    // Asset tools
    if (name.startsWith('resource_vestige_view_asset')) {
      return handleAssetTools(combinedArgs);
    }

    // Pool tools
    if (name.startsWith('resource_vestige_view_pool')) {
      return handlePoolTools(combinedArgs);
    }

    // Currency tools
    if (name.startsWith('resource_vestige_view_currency')) {
      return handleCurrencyTools(combinedArgs);
    }

    // Vault tools
    if (name.startsWith('resource_vestige_view_vault') || 
        name.startsWith('resource_vestige_view_recent_vaults')) {
      return handleVaultTools(combinedArgs);
    }

    throw new McpError(
      ErrorCode.MethodNotFound,
      `Unknown tool: ${name}`
    );
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle Vestige tool: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
