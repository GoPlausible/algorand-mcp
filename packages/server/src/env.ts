interface EnvConfig {
  // Algorand Configuration
  algorand_network: string;
  algorand_algod_api: string;
  algorand_algod: string;
  algorand_indexer_api: string;
  algorand_indexer: string;
  algorand_algod_port: string;
  algorand_indexer_port: string;
  algorand_token: string;

  // NFDomains Configuration
  nfd_api_url: string;
  nfd_api_key: string;

  // Vestige Configuration
  vestige_api_url: string;
  vestige_api_key: string;

  // Pagination Configuration
  items_per_page: number;
}

export const env: EnvConfig = {
  // Algorand Configuration
  algorand_network: process.env.ALGORAND_NETWORK || '',
  algorand_algod_api: process.env.ALGORAND_ALGOD_API || '',
  algorand_algod: process.env.ALGORAND_ALGOD || '',
  algorand_indexer_api: process.env.ALGORAND_INDEXER_API || '',
  algorand_indexer: process.env.ALGORAND_INDEXER || '',
  algorand_algod_port: process.env.ALGORAND_ALGOD_PORT || '',
  algorand_indexer_port: process.env.ALGORAND_INDEXER_PORT || '',
  algorand_token: process.env.ALGORAND_TOKEN || '',

  // NFDomains Configuration
  nfd_api_url: process.env.NFD_API_URL || 'https://api.nf.domains',
  nfd_api_key: process.env.NFD_API_KEY || '',

  // Vestige Configuration
  vestige_api_url: process.env.VESTIGE_API_URL || 'https://free-api.vestige.fi',
  vestige_api_key: process.env.VESTIGE_API_KEY || '',

  // Pagination Configuration
  items_per_page: parseInt(process.env.ITEMS_PER_PAGE || '5', 10)
};
