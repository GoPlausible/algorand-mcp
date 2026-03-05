import algosdk from 'algosdk';

export type NetworkId = 'mainnet' | 'testnet' | 'localnet' | 'voi-mainnet';

interface NetworkEndpoints {
  algodUrl: string;
  indexerUrl: string;
}

const NETWORK_URLS: Record<'mainnet' | 'testnet' | 'voi-mainnet', NetworkEndpoints> = {
  mainnet: {
    algodUrl: 'https://mainnet-api.algonode.cloud',
    indexerUrl: 'https://mainnet-idx.algonode.cloud',
  },
  testnet: {
    algodUrl: 'https://testnet-api.algonode.cloud',
    indexerUrl: 'https://testnet-idx.algonode.cloud',
  },
  'voi-mainnet': {
    algodUrl: 'https://mainnet-api.voi.nodely.dev',
    indexerUrl: 'https://mainnet-idx.voi.nodely.dev',
  },
};

// Read once at module load
const ALGORAND_TOKEN = process.env.ALGORAND_TOKEN || '';
const ALGORAND_LOCALNET_URL = process.env.ALGORAND_LOCALNET_URL || '';

// Per-network env var keys: ALGORAND_{NETWORK}_ALGOD_URL / ALGORAND_{NETWORK}_INDEXER_URL
// e.g. ALGORAND_MAINNET_ALGOD_URL, ALGORAND_VOI_MAINNET_ALGOD_URL
const ENV_KEY_MAP: Record<Exclude<NetworkId, 'localnet'>, string> = {
  mainnet: 'MAINNET',
  testnet: 'TESTNET',
  'voi-mainnet': 'VOI_MAINNET',
};

function getToken(network: NetworkId): string {
  if (network === 'localnet') return ALGORAND_TOKEN;
  return process.env[`ALGORAND_${ENV_KEY_MAP[network]}_TOKEN`] || ALGORAND_TOKEN;
}

function getEndpoints(network: NetworkId): NetworkEndpoints {
  if (network === 'localnet') {
    if (!ALGORAND_LOCALNET_URL) {
      throw new Error(
        'Localnet requires ALGORAND_LOCALNET_URL environment variable (e.g. http://localhost:4001). ' +
        'Set it as a CLI env variable: ALGORAND_LOCALNET_URL=http://localhost:4001 node dist/index.js'
      );
    }
    return {
      algodUrl: ALGORAND_LOCALNET_URL,
      indexerUrl: process.env.ALGORAND_LOCALNET_INDEXER_URL || ALGORAND_LOCALNET_URL.replace(':4001', ':8980'),
    };
  }
  const defaults = NETWORK_URLS[network];
  const envPrefix = `ALGORAND_${ENV_KEY_MAP[network]}`;
  return {
    algodUrl: process.env[`${envPrefix}_ALGOD_URL`] || defaults.algodUrl,
    indexerUrl: process.env[`${envPrefix}_INDEXER_URL`] || defaults.indexerUrl,
  };
}

// Memoization caches
const algodClients = new Map<string, algosdk.Algodv2>();
const indexerClients = new Map<string, algosdk.Indexer>();

export function getAlgodClient(network: NetworkId = 'mainnet'): algosdk.Algodv2 {
  const token = getToken(network);
  const key = `${network}:${token}`;
  let client = algodClients.get(key);
  if (!client) {
    const endpoints = getEndpoints(network);
    client = new algosdk.Algodv2(token, endpoints.algodUrl, '');
    algodClients.set(key, client);
  }
  return client;
}

export function getIndexerClient(network: NetworkId = 'mainnet'): algosdk.Indexer {
  const token = getToken(network);
  const key = `${network}:${token}`;
  let client = indexerClients.get(key);
  if (!client) {
    const endpoints = getEndpoints(network);
    client = new algosdk.Indexer(token, endpoints.indexerUrl, '');
    indexerClients.set(key, client);
  }
  return client;
}

export function extractNetwork(args: any): NetworkId {
  const network = args?.network;
  if (network && !['mainnet', 'testnet', 'localnet', 'voi-mainnet'].includes(network)) {
    throw new Error(`Invalid network: ${network}. Must be mainnet, testnet, localnet, or voi-mainnet.`);
  }
  return (network || 'mainnet') as NetworkId;
}
