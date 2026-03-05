import { RouterClient } from '@txnlab/haystack-router';

// Free tier API key (60 requests/min)
const HAYSTACK_API_KEY = process.env.HAYSTACK_API_KEY || '1b72df7e-1131-4449-8ce1-29b79dd3f51e';

// Algod URIs per network for RouterClient configuration
const ALGOD_URIS: Record<string, string> = {
  mainnet: 'https://mainnet-api.algonode.cloud',
  testnet: 'https://testnet-api.algonode.cloud',
};

// Memoized RouterClient instances per network
const routerClients = new Map<string, RouterClient>();

export function getRouterClient(network: string): RouterClient {
  let client = routerClients.get(network);
  if (!client) {
    const config: any = {
      apiKey: HAYSTACK_API_KEY,
      autoOptIn: true,
    };
    if (network === 'testnet') {
      config.algodUri = ALGOD_URIS.testnet;
    } else if (network === 'mainnet') {
      config.algodUri = ALGOD_URIS.mainnet;
    }
    client = new RouterClient(config);
    routerClients.set(network, client);
  }
  return client;
}
