import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { algodClient, indexerClient } from '../../algorand-client.js';
import algosdk from 'algosdk';
import { env } from '../../env.js';

/**
 * Handle wallet-related resource requests
 * @param uri Resource URI
 * @returns Resource content
 */
export async function walletResources(uri: string) {
  try {
    // Since this handler is only called when wallet is configured,
    // we can safely convert the mnemonic
    const activeAccount = algosdk.mnemonicToSecretKey(env.algorand_agent_wallet_active);

    switch (uri) {
      case 'algorand://wallet/accounts': {
        const accountInfo = await algodClient.accountInformation(activeAccount.addr).do();
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify({
              accounts: [{
                address: activeAccount.addr,
                amount: accountInfo.amount,
                assets: accountInfo.assets || []
              }]
            })
          }]
        };
      }

      case 'algorand://wallet/assets': {
        const response = await indexerClient
          .lookupAccountAssets(activeAccount.addr)
          .do();
        
        return {
          contents: [{
            uri,
            mimeType: 'application/json',
            text: JSON.stringify({
              assets: (response.assets || []).map((asset: {
                'asset-id': number;
                amount: number;
                'is-frozen': boolean;
              }) => ({
                id: asset['asset-id'],
                amount: asset.amount,
                frozen: asset['is-frozen']
              }))
            })
          }]
        };
      }

      default:
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Invalid wallet resource URI: ${uri}`
        );
    }
  } catch (error: unknown) {
    if (error instanceof McpError) {
      throw error;
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle wallet resource: ${message}`
    );
  }
}
