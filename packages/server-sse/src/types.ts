/**
 * Core type definitions for Algorand Remote MCP on Cloudflare Workers
 */

/**
 * State interface for the Durable Object
 * This defines all the persistent state that will be stored
 */
export interface State {
  
  /**
   * Number of items to show per page
   */
  items_per_page: number;
}

/**
 * Environment interface for Cloudflare bindings and variables
 */
export interface Env {
  /**
   * Durable Object namespace for the AlgorandRemoteMCP class
   */
  AlgorandRemoteMCP: DurableObjectNamespace;
  
/**
 * R2 bucket binding for knowledge resources
 */
KNOWLEDGE_BUCKET?: R2Bucket;

/**
 * R2 bucket binding for PlausibleAI documentation
 */
PLAUSIBLEAI?: R2Bucket;
  
  /**
   * Algorand network to use (mainnet, testnet, etc.)
   */
  ALGORAND_NETWORK?: string;
  
  /**
   * Algorand node URL for API access (base URL)
   */
  ALGORAND_ALGOD?: string;
  
  /**
   * Algorand node API URL with version (e.g., with /v2)
   */
  ALGORAND_ALGOD_API?: string;
  
  /**
   * Algorand node port if different from the default
   */
  ALGORAND_ALGOD_PORT?: string;
  
  /**
   * Algorand Indexer URL for querying historical data (base URL)
   */
  ALGORAND_INDEXER?: string;
  
  /**
   * Algorand Indexer API URL with version (e.g., with /v2)
   */
  ALGORAND_INDEXER_API?: string;
  
  /**
   * Algorand Indexer port if different from the default
   */
  ALGORAND_INDEXER_PORT?: string;
  
  /**
   * NFD API URL for name resolution
   */
  NFD_API_URL?: string;
  
  /**
   * API key for Algorand node access if required
   */
  ALGORAND_TOKEN?: string;
  
  /**
   * Items per page for pagination (default in state)
   */
  ITEMS_PER_PAGE?: string;
  

  OAUTH_KV?: KVNamespace;
  OAUTH_KV_ACCOUNTS?: KVNamespace;
}
export interface Props {
  
	name: string;
	email: string;
	accessToken: string;
};
