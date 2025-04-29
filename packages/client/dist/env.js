import * as dotenv from 'dotenv';
import { resolve } from 'path';
// Try to load .env file from client package root
dotenv.config({ path: resolve(__dirname, '../.env') });
// Default values if .env is not present
const defaultConfig = {
    algorand_network: 'testnet',
    algorand_algod_api: 'https://testnet-api.algonode.cloud/v2',
    algorand_algod: 'https://testnet-api.algonode.cloud',
    algorand_indexer_api: 'https://testnet-idx.algonode.cloud/v2',
    algorand_indexer: 'https://testnet-idx.algonode.cloud',
    algorand_algod_port: null,
    algorand_indexer_port: null,
    algorand_token: null,
    goplausible_account: '',
    algorand_agent_wallet_active: '',
};
// Get environment variable with fallback to default
const getEnvVar = (key) => {
    const envKey = `ALGORAND_${key.toUpperCase()}`;
    if (key === 'goplausible_account') {
        return process.env.GOPLAUSIBLE_ACCOUNT || defaultConfig[key];
    }
    return process.env[envKey] || defaultConfig[key];
};
// Build config object using environment variables or defaults
export const env = {
    algorand_network: getEnvVar('algorand_network'),
    algorand_algod: getEnvVar('algorand_algod'),
    algorand_algod_api: getEnvVar('algorand_algod_api'),
    algorand_indexer: getEnvVar('algorand_indexer'),
    algorand_indexer_api: getEnvVar('algorand_indexer_api'),
    algorand_algod_port: getEnvVar('algorand_algod_port'),
    algorand_indexer_port: getEnvVar('algorand_indexer_port'),
    algorand_token: getEnvVar('algorand_token'),
    goplausible_account: getEnvVar('goplausible_account'),
    algorand_agent_wallet_active: getEnvVar('algorand_agent_wallet_active'),
};
