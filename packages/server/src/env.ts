interface EnvConfig {
  algorand_network: string;
  algorand_algod_api: string;
  algorand_algod: string;
  algorand_indexer_api: string;
  algorand_indexer: string;
  algorand_algod_port: string;
  algorand_indexer_port: string;
  algorand_token: string;
}

export const env: EnvConfig = {
  algorand_network: process.env.ALGORAND_NETWORK || '',
  algorand_algod_api: process.env.ALGORAND_ALGOD_API || '',
  algorand_algod: process.env.ALGORAND_ALGOD || '',
  algorand_indexer_api: process.env.ALGORAND_INDEXER_API || '',
  algorand_indexer: process.env.ALGORAND_INDEXER || '',
  algorand_algod_port: process.env.ALGORAND_ALGOD_PORT || '',
  algorand_indexer_port: process.env.ALGORAND_INDEXER_PORT || '',
  algorand_token: process.env.ALGORAND_TOKEN || ''
};
