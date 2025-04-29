interface EnvConfig {
    algorand_network: string;
    algorand_algod: string;
    algorand_algod_api: string;
    algorand_indexer: string;
    algorand_indexer_api: string;
    algorand_algod_port: string | null;
    algorand_indexer_port: string | null;
    algorand_token: string | null;
    goplausible_account: string;
    algorand_agent_wallet_active: string;
}
export declare const env: EnvConfig;
export {};
