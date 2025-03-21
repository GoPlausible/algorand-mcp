// Direct URI templates for resources
export const URI_TEMPLATES = {
  // NFD resources
  NFD_GET: 'algorand://nfd/nfd/{nameOrID}',
  NFD_ADDRESS: 'algorand://nfd/address/{address}/nfds',
  NFD_ACTIVITY: 'algorand://nfd/activity/{name}',
  NFD_ANALYTICS: 'algorand://nfd/analytics',
  NFD_BROWSE: 'algorand://nfd/browse',
  NFD_SEARCH: 'algorand://nfd/search',

  // Vestige resources
  VESTIGE_PROVIDERS: 'algorand://vestige/providers',
  VESTIGE_PROVIDERS_TVL_90D: 'algorand://vestige/providers/tvl/90d',
  VESTIGE_PROVIDERS_TVL_30D: 'algorand://vestige/providers/tvl/30d',
  VESTIGE_PROVIDERS_TVL_7D: 'algorand://vestige/providers/tvl/7d',
  VESTIGE_PROVIDERS_TVL_1D: 'algorand://vestige/providers/tvl/1d',
  VESTIGE_ASSETS: 'algorand://vestige/assets',
  VESTIGE_ASSETS_LIST: 'algorand://vestige/assets/list',
  VESTIGE_ASSETS_SEARCH: 'algorand://vestige/assets/search/{query}',
  VESTIGE_ASSET: 'algorand://vestige/assets/{asset_id}',
  VESTIGE_POOLS_VOLUMES: 'algorand://vestige/pools/volumes',
  VESTIGE_POOLS_PROVIDER: 'algorand://vestige/pools/{provider}',
  VESTIGE_POOL_INFO: 'algorand://vestige/pools/{pool_id}/info',
  VESTIGE_CURRENCY_PRICES: 'algorand://vestige/currency/prices',
  VESTIGE_CURRENCY_PRICE: 'algorand://vestige/currency/{currency}/price',
  VESTIGE_CURRENCY_HISTORY: 'algorand://vestige/currency/{currency}/history',
  VESTIGE_VAULT: 'algorand://vestige/vaults/{vault_id}',
  VESTIGE_VAULTS_RECENT: 'algorand://vestige/vaults/recent',

  // Algod resources
  ALGOD_ACCOUNT: 'algorand://algod/accounts/{address}',
  ALGOD_ACCOUNT_APPLICATION: 'algorand://algod/accounts/{address}/application/{app-id}',
  ALGOD_ACCOUNT_ASSET: 'algorand://algod/accounts/{address}/asset/{asset-id}',
  ALGOD_APPLICATION: 'algorand://algod/applications/{app-id}',
  ALGOD_APPLICATION_BOX: 'algorand://algod/applications/{app-id}/box/{name}',
  ALGOD_APPLICATION_BOXES: 'algorand://algod/applications/{app-id}/boxes',
  ALGOD_ASSET: 'algorand://algod/assets/{asset-id}',
  ALGOD_PENDING_TXN: 'algorand://algod/transactions/pending/{txid}',
  ALGOD_PENDING_TXNS_BY_ADDRESS: 'algorand://algod/accounts/{address}/transactions/pending',
  ALGOD_PENDING_TXNS: 'algorand://algod/transactions/pending',
  ALGOD_TXN_PARAMS: 'algorand://algod/transactions/params',
  ALGOD_STATUS: 'algorand://algod/status',
  ALGOD_STATUS_AFTER_BLOCK: 'algorand://algod/status/wait-for-block-after/{round}',

  // Indexer resources
  INDEXER_ACCOUNT: 'algorand://indexer/accounts/{address}',
  INDEXER_ACCOUNT_TRANSACTIONS: 'algorand://indexer/accounts/{address}/transactions',
  INDEXER_ACCOUNT_APPS_LOCAL_STATE: 'algorand://indexer/accounts/{address}/apps-local-state',
  INDEXER_ACCOUNT_CREATED_APPS: 'algorand://indexer/accounts/{address}/created-applications',
  INDEXER_ASSETS: 'algorand://indexer/assets',
  INDEXER_ASSET: 'algorand://indexer/assets/{asset-id}',
  INDEXER_ASSET_BALANCES: 'algorand://indexer/assets/{asset-id}/balances',
  INDEXER_ASSET_TRANSACTIONS: 'algorand://indexer/assets/{asset-id}/transactions',
  INDEXER_ASSET_BALANCE_BY_ADDRESS: 'algorand://indexer/assets/{asset-id}/balances/{address}',
  INDEXER_ASSET_TRANSACTION_BY_ID: 'algorand://indexer/assets/{asset-id}/transactions/{txid}',
  INDEXER_TRANSACTION: 'algorand://indexer/transactions/{txid}',
  INDEXER_TRANSACTIONS: 'algorand://indexer/transactions',
  INDEXER_APPLICATION: 'algorand://indexer/applications/{app-id}',
  INDEXER_APPLICATION_BOX: 'algorand://indexer/applications/{app-id}/box/{name}',
  INDEXER_APPLICATION_BOXES: 'algorand://indexer/applications/{app-id}/boxes',
  INDEXER_APPLICATION_LOGS: 'algorand://indexer/applications/{app-id}/logs',
  INDEXER_APPLICATIONS: 'algorand://indexer/applications'
};

// Mapping from URI templates to API endpoints
export const URI_TO_ENDPOINT = {
  // Algod endpoints
  [URI_TEMPLATES.ALGOD_ACCOUNT]: '/v2/accounts/{address}',
  [URI_TEMPLATES.ALGOD_ACCOUNT_APPLICATION]: '/v2/accounts/{address}/application/{app-id}',
  [URI_TEMPLATES.ALGOD_ACCOUNT_ASSET]: '/v2/accounts/{address}/asset/{asset-id}',
  [URI_TEMPLATES.ALGOD_APPLICATION]: '/v2/applications/{app-id}',
  [URI_TEMPLATES.ALGOD_APPLICATION_BOX]: '/v2/applications/{app-id}/box/{name}',
  [URI_TEMPLATES.ALGOD_APPLICATION_BOXES]: '/v2/applications/{app-id}/boxes',
  [URI_TEMPLATES.ALGOD_ASSET]: '/v2/assets/{asset-id}',
  [URI_TEMPLATES.ALGOD_PENDING_TXN]: '/v2/transactions/pending/{txid}',
  [URI_TEMPLATES.ALGOD_PENDING_TXNS_BY_ADDRESS]: '/v2/accounts/{address}/transactions/pending',
  [URI_TEMPLATES.ALGOD_PENDING_TXNS]: '/v2/transactions/pending',
  [URI_TEMPLATES.ALGOD_TXN_PARAMS]: '/v2/transactions/params',
  [URI_TEMPLATES.ALGOD_STATUS]: '/v2/status',
  [URI_TEMPLATES.ALGOD_STATUS_AFTER_BLOCK]: '/v2/status/wait-for-block-after/{round}',

  // Indexer endpoints
  [URI_TEMPLATES.INDEXER_ACCOUNT]: '/v2/accounts/{address}',
  [URI_TEMPLATES.INDEXER_ACCOUNT_TRANSACTIONS]: '/v2/accounts/{address}/transactions',
  [URI_TEMPLATES.INDEXER_ACCOUNT_APPS_LOCAL_STATE]: '/v2/accounts/{address}/apps-local-state',
  [URI_TEMPLATES.INDEXER_ACCOUNT_CREATED_APPS]: '/v2/accounts/{address}/created-applications',
  [URI_TEMPLATES.INDEXER_ASSETS]: '/v2/assets',
  [URI_TEMPLATES.INDEXER_ASSET]: '/v2/assets/{asset-id}',
  [URI_TEMPLATES.INDEXER_ASSET_BALANCES]: '/v2/assets/{asset-id}/balances',
  [URI_TEMPLATES.INDEXER_ASSET_TRANSACTIONS]: '/v2/assets/{asset-id}/transactions',
  [URI_TEMPLATES.INDEXER_ASSET_BALANCE_BY_ADDRESS]: '/v2/assets/{asset-id}/balances/{address}',
  [URI_TEMPLATES.INDEXER_ASSET_TRANSACTION_BY_ID]: '/v2/assets/{asset-id}/transactions/{txid}',
  [URI_TEMPLATES.INDEXER_TRANSACTION]: '/v2/transactions/{txid}',
  [URI_TEMPLATES.INDEXER_TRANSACTIONS]: '/v2/transactions',
  [URI_TEMPLATES.INDEXER_APPLICATION]: '/v2/applications/{app-id}',
  [URI_TEMPLATES.INDEXER_APPLICATION_BOX]: '/v2/applications/{app-id}/box/{name}',
  [URI_TEMPLATES.INDEXER_APPLICATION_BOXES]: '/v2/applications/{app-id}/boxes',
  [URI_TEMPLATES.INDEXER_APPLICATION_LOGS]: '/v2/applications/{app-id}/logs',
  [URI_TEMPLATES.INDEXER_APPLICATIONS]: '/v2/applications'
};

// Helper function to convert MCP URI to API endpoint
export function mcpUriToEndpoint(uri: string): string {
  // Extract the path part after algorand://
  const path = uri.replace(/^algorand:\/\//, '');
  
  // Find matching template
  for (const [template, endpoint] of Object.entries(URI_TO_ENDPOINT)) {
    const templatePath = template.replace(/^algorand:\/\//, '');
    const pattern = new RegExp('^' + templatePath.replace(/\{[^}]+\}/g, '([^/]+)') + '$');
    const templateMatch = path.match(pattern);
    
    if (templateMatch) {
      // Extract parameter values
      const params = templatePath.match(/\{([^}]+)\}/g) || [];
      let result = endpoint;
      
      // Replace parameters in endpoint
      params.forEach((param, index) => {
        result = result.replace(param, templateMatch[index + 1]);
      });
      
      return result;
    }
  }
  
  throw new Error(`No matching endpoint found for URI: ${uri}`);
}
