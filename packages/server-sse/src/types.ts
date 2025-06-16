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
   * Optional R2 bucket binding for knowledge resources (for future use)
   */
  KNOWLEDGE_BUCKET?: R2Bucket;
  
  /**
   * Algorand network to use (mainnet, testnet, etc.)
   */
  ALGORAND_NETWORK?: string;
  
  /**
   * Algorand node URL for API access
   */
  ALGORAND_ALGOD?: string;
  
  /**
   * Algorand Indexer URL for querying historical data
   */
  ALGORAND_INDEXER?: string;
  
  /**
   * API key for Algorand node access if required
   */
  ALGORAND_TOKEN?: string;
  
  /**
   * Items per page for pagination (default in state)
   */
  ITEMS_PER_PAGE?: string;
  
  /**
   * Mnemonic for the agent wallet
   */
  ALGORAND_AGENT_WALLET?: string;
}
