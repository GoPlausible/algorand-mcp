import algosdk from 'algosdk';

export type NetworkId = 'mainnet' | 'testnet' | 'localnet';

interface NetworkEndpoints {
  algodUrl: string;
  indexerUrl: string;
}

const NETWORK_URLS: Record<'mainnet' | 'testnet', NetworkEndpoints> = {
  mainnet: {
    algodUrl: 'https://mainnet-api.algonode.cloud',
    indexerUrl: 'https://mainnet-idx.algonode.cloud',
  },
  testnet: {
    algodUrl: 'https://testnet-api.algonode.cloud',
    indexerUrl: 'https://testnet-idx.algonode.cloud',
  },
};

// Read once at module load
const ALGORAND_TOKEN = process.env.ALGORAND_TOKEN || '';
const ALGORAND_LOCALNET_URL = process.env.ALGORAND_LOCALNET_URL || '';

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
  return NETWORK_URLS[network];
}

// Memoization caches
const algodClients = new Map<string, algosdk.Algodv2>();
const indexerClients = new Map<string, algosdk.Indexer>();

export function getAlgodClient(network: NetworkId = 'mainnet'): algosdk.Algodv2 {
  const key = `${network}:${ALGORAND_TOKEN}`;
  let client = algodClients.get(key);
  if (!client) {
    const endpoints = getEndpoints(network);
    client = new algosdk.Algodv2(ALGORAND_TOKEN, endpoints.algodUrl, '');
    algodClients.set(key, client);
  }
  return client;
}

export function getIndexerClient(network: NetworkId = 'mainnet'): algosdk.Indexer {
  const key = `${network}:${ALGORAND_TOKEN}`;
  let client = indexerClients.get(key);
  if (!client) {
    const endpoints = getEndpoints(network);
    client = new algosdk.Indexer(ALGORAND_TOKEN, endpoints.indexerUrl, '');
    indexerClients.set(key, client);
  }
  return client;
}

export function extractNetwork(args: any): NetworkId {
  const network = args?.network;
  if (network && !['mainnet', 'testnet', 'localnet'].includes(network)) {
    throw new Error(`Invalid network: ${network}. Must be mainnet, testnet, or localnet.`);
  }
  return (network || 'mainnet') as NetworkId;
}
