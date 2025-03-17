import * as dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to .env file
const envPath = resolve(__dirname, '../.env');

// First try to load from .env file if it exists
if (existsSync(envPath)) {
  console.log('Loading environment from .env file:', envPath);
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    console.error('Error loading .env file:', result.error);
  }
} else {
  console.log('No .env file found, will use command line arguments or defaults');
}

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
}

// Default values if .env is not present
const defaultConfig: EnvConfig = {
  algorand_network: 'testnet',
  algorand_algod_api: 'https://testnet-api.algonode.cloud/v2',
  algorand_algod: 'https://testnet-api.algonode.cloud',
  algorand_indexer_api: 'https://testnet-idx.algonode.cloud/v2',
  algorand_indexer: 'https://testnet-idx.algonode.cloud',
  algorand_algod_port: null,
  algorand_indexer_port: null,
  algorand_token: null,
  goplausible_account: '23QHOYLQJUYXXWKHBZJRQGL45BS6HZNXZ4XBLFYFJDC5B45Z642UL5E2GY',
};

// Get environment variable with priority:
// 1. .env file (loaded into process.env by dotenv)
// 2. Command line arguments (also in process.env)
// 3. Default values
const getEnvVar = (key: keyof EnvConfig): string | null => {
  const envKey = `ALGORAND_${key.toUpperCase()}`;
  
  // Special case for goplausible_account
  if (key === 'goplausible_account') {
    const envValue = process.env.GOPLAUSIBLE_ACCOUNT;
    if (envValue) {
      console.log(`Using GOPLAUSIBLE_ACCOUNT from environment: ${envValue}`);
      return envValue;
    }
    return defaultConfig[key];
  }

  // For all other keys
  const envValue = process.env[envKey];
  if (envValue) {
    console.log(`Using ${envKey} from environment: ${envValue}`);
    return envValue;
  }
  
  console.log(`Using default value for ${envKey}: ${defaultConfig[key]}`);
  return defaultConfig[key];
};

// Build config object using environment variables or defaults
export const env: EnvConfig = {
  algorand_network: getEnvVar('algorand_network') as string,
  algorand_algod: getEnvVar('algorand_algod') as string,
  algorand_algod_api: getEnvVar('algorand_algod_api') as string,
  algorand_indexer: getEnvVar('algorand_indexer') as string,
  algorand_indexer_api: getEnvVar('algorand_indexer_api') as string,
  algorand_algod_port: getEnvVar('algorand_algod_port'),
  algorand_indexer_port: getEnvVar('algorand_indexer_port'),
  algorand_token: getEnvVar('algorand_token'),
  goplausible_account: getEnvVar('goplausible_account') as string,
};
