interface EnvConfig {
    algorand_network: string;
    algorand_algod_api: string;
    algorand_algod: string;
    algorand_indexer_api: string;
    algorand_indexer: string;
    algorand_algod_port: string;
    algorand_indexer_port: string;
    algorand_token: string;
    algorand_agent_wallet_active: string;
    nfd_api_url: string;
    nfd_api_key: string;
    tinyman_active: string;
    vestige_active: string;
    vestige_api_url: string;
    vestige_api_key: string;
    ultrade_active: string;
    ultrade_api_url: string;
    items_per_page: number;
}
export declare const env: EnvConfig;
export {};
