# Client management

Client management is one of the core capabilities provided by AlgoKit Utils. It allows you to create (auto-retry) [algod](https://developer.algorand.org/docs/rest-apis/algod), [indexer](https://developer.algorand.org/docs/rest-apis/indexer) and [kmd](https://developer.algorand.org/docs/rest-apis/kmd) clients against various networks resolved from environment or specified configuration.

Any AlgoKit Utils function that needs one of these clients will take the underlying algosdk classes (`algosdk.Algodv2`, `algosdk.Indexer`, `algosdk.Kmd`) so inline with the [Modularity](../README.md#core-principles) principle you can use existing logic to get instances of these clients without needing to use the Client management capability if you prefer, including use of libraries like [useWallet](https://github.com/TxnLab/use-wallet) that have their own configuration mechanism.

To see some usage examples check out the [automated tests](../../src/types/client-manager.spec.ts).

## `ClientManager`

The [`ClientManager`](../code/classes/types_client_manager.ClientManager.md) is a class that is used to manage client instances.

To get an instance of `ClientManager` you can get it from either [`AlgorandClient`](./algorand-client.md) via `algorand.client` or instantiate it directly:

```typescript
import { ClientManager } from '@algorandfoundation/algokit-utils/types/client-manager'

// Algod client only
const clientManager = new ClientManager({ algod: algodClient })
// All clients
const clientManager = new ClientManager({ algod: algodClient, indexer: indexerClient, kmd: kmdClient })
// Algod config only
const clientManager = new ClientManager({ algodConfig })
// All client configs
const clientManager = new ClientManager({ algodConfig, indexerConfig, kmdConfig })
```

## Network configuration

The network configuration is specified using the [`AlgoClientConfig`](../code/interfaces/types_network_client.AlgoClientConfig.md) interface. This same interface is used to specify the config for [algod](https://algorand.github.io/js-algorand-sdk/classes/Algodv2.html), [indexer](https://algorand.github.io/js-algorand-sdk/classes/Indexer.html) and [kmd](https://algorand.github.io/js-algorand-sdk/classes/Kmd.html) SDK clients.

There are a number of ways to produce one of these configuration objects:

- Manually specifying an object that conforms with the interface, e.g.
  ```typescript
  {
    server: 'https://myalgodnode.com'
  }
  // Or with the optional values:
  {
    server: 'https://myalgodnode.com',
    port: 443,
    token: 'SECRET_TOKEN'
  }
  ```
- [`ClientManager.getConfigFromEnvironmentOrLocalNet()`](../code/classes/types_client_manager.ClientManager.md#getconfigfromenvironmentorlocalnet) - Loads the Algod client config, the Indexer client config and the Kmd config from well-known environment variables or if not found then default LocalNet; this is useful to have code that can work across multiple blockchain environments (including LocalNet), without having to change
- [`ClientManager.getAlgodConfigFromEnvironment()`](../code/classes/types_client_manager.ClientManager.md#getalgodconfigfromenvironment) - Loads an Algod client config from well-known environment variables
- [`ClientManager.getIndexerConfigFromEnvironment()`](../code/classes/types_client_manager.ClientManager.md#getindexerconfigfromenvironment) - Loads an Indexer client config from well-known environment variables; useful to have code that can work across multiple blockchain environments (including LocalNet), without having to change
- [`ClientManager.getAlgoNodeConfig(network, config)`](../code/classes/types_client_manager.ClientManager.md#getalgonodeconfig) - Loads an Algod or indexer config against [AlgoNode free tier](https://nodely.io/docs/free/start) to either MainNet or TestNet
- [`ClientManager.getDefaultLocalNetConfig(configOrPort)`](../code/classes/types_client_manager.ClientManager.md#getdefaultlocalnetconfig) - Loads an Algod, Indexer or Kmd config against [LocalNet](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/localnet.md) using the default configuration

## Clients

### Creating an SDK client instance

Once you have the configuration for a client, to get a new client you can use the following functions:

- [`ClientManager.getAlgoClient(config)`](../code/classes/types_client_manager.ClientManager.md#getalgoclient) - Returns an Algod client for the given configuration; the client automatically retries on transient HTTP errors
- [`ClientManager.getIndexerClient(config, overrideIntDecoding)`](../code/classes/types_client_manager.ClientManager.md#getindexerclient) - Returns an Indexer client for given configuration
- [`ClientManager.getKmdClient(config)`](../code/classes/types_client_manager.ClientManager.md#getkmdclient) - Returns a Kmd client for the given configuration

You can also shortcut needing to write the likes of `ClientManager.getAlgoClient(ClientManager.getAlgodConfigFromEnvironment())` with environment shortcut methods:

- [`ClientManager.getAlgodClientFromEnvironment(config)`](../code/classes/types_client_manager.ClientManager.md#getalgodclientfromenvironment) - Returns an Algod client by loading the config from environment variables
- [`ClientManager.getIndexerClientFromEnvironment(config)`](../code/classes/types_client_manager.ClientManager.md#getindexerclientfromenvironment) - Returns an indexer client by loading the config from environment variables
- [`ClientManager.getKmdClientFromEnvironment(config)`](../code/classes/types_client_manager.ClientManager.md#getkmdclientfromenvironment) - Returns a kmd client by loading the config from environment variables

### Accessing SDK clients via ClientManager instance

Once you have a `ClientManager` instance, you can access the SDK clients for the various Algorand APIs from it (expressed here as `algorand.client` to denote the syntax via an [`AlgorandClient`](./algorand-client.md)):

```typescript
const algorand = AlgorandClient.defaultLocalNet()

const algodClient = algorand.client.algod
const indexerClient = algorand.client.indexer
const kmdClient = algorand.client.kmd
```

If the method to create the `ClientManager` doesn't configure indexer or kmd ([both of which are optional](#client-management)), then accessing those clients will trigger an error to be thrown:

```typescript
const algorand = AlgorandClient.fromClients({ algod })

const algodClient = algorand.client.algod // OK
algorand.client.indexer // Throws error
algorand.client.kmd // Throws error
```

### Creating an app client instance

See [how to create app clients via ClientManager via AlgorandClient](./app-client.md#via-algorandclient).

### Creating a TestNet dispenser API client instance

You can also create a [TestNet dispenser API client instance](./dispenser-client.md#creating-a-dispenser-client) from `ClientManager` too.

## Automatic retry

When receiving an Algod or Indexer client from AlgoKit Utils, it will be a special wrapper client that handles retrying transient failures. This is done via the [`AlgoHttpClientWithRetry`](../code/classes/types_algo_http_client_with_retry.AlgoHttpClientWithRetry.md) class.

## Network information

To get information about the current network you are connected to, you can use the [`network()`](../code/classes/types_client_manager.ClientManager.md#network) method on `ClientManager` or the `is{Network}()` methods (which in turn call `network()`) as shown below (expressed here as `algorand.client` to denote the syntax via an [`AlgorandClient`](./algorand-client.md)):

```typescript
const algorand = AlgorandClient.defaultLocalNet()

const { isTestNet, isMainNet, isLocalNet, genesisId, genesisHash } = await algorand.client.network()
const testNet = await algorand.client.isTestNet()
const mainNet = await algorand.client.isMainNet()
const localNet = await algorand.client.isLocalNet()
```

The first time `network()` is called it will make a HTTP call to algod to get the network parameters, but from then on it will be cached within that `ClientManager` instance for subsequent calls.
