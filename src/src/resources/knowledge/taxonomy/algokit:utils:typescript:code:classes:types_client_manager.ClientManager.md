[@algorandfoundation/algokit-utils](../README.md) / [types/client-manager](../modules/types_client_manager.md) / ClientManager

# Class: ClientManager

[types/client-manager](../modules/types_client_manager.md).ClientManager

Exposes access to various API clients.

## Table of contents

### Constructors

- [constructor](types_client_manager.ClientManager.md#constructor)

### Properties

- [\_algod](types_client_manager.ClientManager.md#_algod)
- [\_algorand](types_client_manager.ClientManager.md#_algorand)
- [\_getNetworkPromise](types_client_manager.ClientManager.md#_getnetworkpromise)
- [\_indexer](types_client_manager.ClientManager.md#_indexer)
- [\_kmd](types_client_manager.ClientManager.md#_kmd)

### Accessors

- [algod](types_client_manager.ClientManager.md#algod)
- [indexer](types_client_manager.ClientManager.md#indexer)
- [indexerIfPresent](types_client_manager.ClientManager.md#indexerifpresent)
- [kmd](types_client_manager.ClientManager.md#kmd)

### Methods

- [getAppClientByCreatorAndName](types_client_manager.ClientManager.md#getappclientbycreatorandname)
- [getAppClientById](types_client_manager.ClientManager.md#getappclientbyid)
- [getAppClientByNetwork](types_client_manager.ClientManager.md#getappclientbynetwork)
- [getAppFactory](types_client_manager.ClientManager.md#getappfactory)
- [getTestNetDispenser](types_client_manager.ClientManager.md#gettestnetdispenser)
- [getTestNetDispenserFromEnvironment](types_client_manager.ClientManager.md#gettestnetdispenserfromenvironment)
- [getTypedAppClientByCreatorAndName](types_client_manager.ClientManager.md#gettypedappclientbycreatorandname)
- [getTypedAppClientById](types_client_manager.ClientManager.md#gettypedappclientbyid)
- [getTypedAppClientByNetwork](types_client_manager.ClientManager.md#gettypedappclientbynetwork)
- [getTypedAppFactory](types_client_manager.ClientManager.md#gettypedappfactory)
- [isLocalNet](types_client_manager.ClientManager.md#islocalnet)
- [isMainNet](types_client_manager.ClientManager.md#ismainnet)
- [isTestNet](types_client_manager.ClientManager.md#istestnet)
- [network](types_client_manager.ClientManager.md#network)
- [genesisIdIsLocalNet](types_client_manager.ClientManager.md#genesisidislocalnet)
- [getAlgoNodeConfig](types_client_manager.ClientManager.md#getalgonodeconfig)
- [getAlgodClient](types_client_manager.ClientManager.md#getalgodclient)
- [getAlgodClientFromEnvironment](types_client_manager.ClientManager.md#getalgodclientfromenvironment)
- [getAlgodConfigFromEnvironment](types_client_manager.ClientManager.md#getalgodconfigfromenvironment)
- [getConfigFromEnvironmentOrLocalNet](types_client_manager.ClientManager.md#getconfigfromenvironmentorlocalnet)
- [getDefaultLocalNetConfig](types_client_manager.ClientManager.md#getdefaultlocalnetconfig)
- [getIndexerClient](types_client_manager.ClientManager.md#getindexerclient)
- [getIndexerClientFromEnvironment](types_client_manager.ClientManager.md#getindexerclientfromenvironment)
- [getIndexerConfigFromEnvironment](types_client_manager.ClientManager.md#getindexerconfigfromenvironment)
- [getKmdClient](types_client_manager.ClientManager.md#getkmdclient)
- [getKmdClientFromEnvironment](types_client_manager.ClientManager.md#getkmdclientfromenvironment)

## Constructors

### constructor

• **new ClientManager**(`clientsOrConfig`, `algorandClient?`): [`ClientManager`](types_client_manager.ClientManager.md)

algosdk clients or config for interacting with the official Algorand APIs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientsOrConfig` | [`AlgoConfig`](../interfaces/types_network_client.AlgoConfig.md) \| [`AlgoSdkClients`](../interfaces/types_client_manager.AlgoSdkClients.md) | The clients or config to use |
| `algorandClient?` | [`AlgorandClientInterface`](../interfaces/types_algorand_client_interface.AlgorandClientInterface.md) | - |

#### Returns

[`ClientManager`](types_client_manager.ClientManager.md)

**`Example`**

```typescript
const clientManager = new ClientManager({ algod: algodClient })
```

**`Example`**

```typescript
const clientManager = new ClientManager({ algod: algodClient, indexer: indexerClient, kmd: kmdClient })
```

**`Example`**

```typescript
const clientManager = new ClientManager({ algodConfig })
```

**`Example`**

```typescript
const clientManager = new ClientManager({ algodConfig, indexerConfig, kmdConfig })
```

#### Defined in

[src/types/client-manager.ts:74](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L74)

## Properties

### \_algod

• `Private` **\_algod**: `AlgodClient`

#### Defined in

[src/types/client-manager.ts:49](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L49)

___

### \_algorand

• `Private` `Optional` **\_algorand**: [`AlgorandClientInterface`](../interfaces/types_algorand_client_interface.AlgorandClientInterface.md)

#### Defined in

[src/types/client-manager.ts:52](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L52)

___

### \_getNetworkPromise

• `Private` **\_getNetworkPromise**: `undefined` \| `Promise`\<`SuggestedParams`\>

#### Defined in

[src/types/client-manager.ts:111](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L111)

___

### \_indexer

• `Private` `Optional` **\_indexer**: `IndexerClient`

#### Defined in

[src/types/client-manager.ts:50](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L50)

___

### \_kmd

• `Private` `Optional` **\_kmd**: `KmdClient`

#### Defined in

[src/types/client-manager.ts:51](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L51)

## Accessors

### algod

• `get` **algod**(): `AlgodClient`

Returns an algosdk Algod API client.

#### Returns

`AlgodClient`

#### Defined in

[src/types/client-manager.ts:90](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L90)

___

### indexer

• `get` **indexer**(): `IndexerClient`

Returns an algosdk Indexer API client or throws an error if it's not been provided.

#### Returns

`IndexerClient`

#### Defined in

[src/types/client-manager.ts:95](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L95)

___

### indexerIfPresent

• `get` **indexerIfPresent**(): `undefined` \| `IndexerClient`

Returns an algosdk Indexer API client or `undefined` if it's not been provided.

#### Returns

`undefined` \| `IndexerClient`

#### Defined in

[src/types/client-manager.ts:101](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L101)

___

### kmd

• `get` **kmd**(): `KmdClient`

Returns an algosdk KMD API client or throws an error if it's not been provided.

#### Returns

`KmdClient`

#### Defined in

[src/types/client-manager.ts:106](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L106)

## Methods

### getAppClientByCreatorAndName

▸ **getAppClientByCreatorAndName**(`params`): `Promise`\<[`AppClient`](types_app_client.AppClient.md)\>

Returns a new `AppClient` client for managing calls and state for an ARC-32/ARC-56 app.
This method resolves the app ID by looking up the creator address and name
using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The parameters to create the app client |
| `params.appLookupCache?` | [`AppLookup`](../interfaces/types_app_deployer.AppLookup.md) | An optional cached app lookup that matches a name to on-chain details; either this is needed or indexer is required to be passed in to this `ClientManager` on construction. |
| `params.appName?` | `string` | Optional override for the app name; used for on-chain metadata and lookups. Defaults to the ARC-32/ARC-56 app spec name |
| `params.appSpec` | `string` \| [`Arc56Contract`](../interfaces/types_app_arc56.Arc56Contract.md) \| [`AppSpec`](../interfaces/types_app_spec.AppSpec.md) | The ARC-56 or ARC-32 application spec as either: * Parsed JSON ARC-56 `Contract` * Parsed JSON ARC-32 `AppSpec` * Raw JSON string (in either ARC-56 or ARC-32 format) |
| `params.approvalSourceMap?` | `ProgramSourceMap` | Optional source map for the approval program |
| `params.clearSourceMap?` | `ProgramSourceMap` | Optional source map for the clear state program |
| `params.creatorAddress` | `string` \| `Address` | The address of the creator account for the app |
| `params.defaultSender?` | `string` \| `Address` | Optional address to use for the account to use as the default sender for calls. |
| `params.defaultSigner?` | `TransactionSigner` | Optional signer to use as the default signer for default sender calls (if not specified then the signer will be resolved from `AlgorandClient`). |
| `params.ignoreCache?` | `boolean` | Whether or not to ignore the `AppDeployer` lookup cache and force an on-chain lookup, default: use any cached value |

#### Returns

`Promise`\<[`AppClient`](types_app_client.AppClient.md)\>

The `AppClient`

**`Example`**

```typescript
const appClient = algorand.client.getAppClientByCreatorAndName({
  appSpec: '{/* ARC-56 or ARC-32 compatible JSON *\}',
  // appId resolved by looking for app ID of named app by this creator
  creatorAddress: 'CREATORADDRESS',
})
```

#### Defined in

[src/types/client-manager.ts:252](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L252)

___

### getAppClientById

▸ **getAppClientById**(`params`): [`AppClient`](types_app_client.AppClient.md)

Returns a new `AppClient` client for managing calls and state for an ARC-32/ARC-56 app.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The parameters to create the app client |
| `params.appId` | `bigint` | The ID of the app instance this client should make calls against. |
| `params.appName?` | `string` | Optional override for the app name; used for on-chain metadata and lookups. Defaults to the ARC-32/ARC-56 app spec name |
| `params.appSpec` | `string` \| [`Arc56Contract`](../interfaces/types_app_arc56.Arc56Contract.md) \| [`AppSpec`](../interfaces/types_app_spec.AppSpec.md) | The ARC-56 or ARC-32 application spec as either: * Parsed JSON ARC-56 `Contract` * Parsed JSON ARC-32 `AppSpec` * Raw JSON string (in either ARC-56 or ARC-32 format) |
| `params.approvalSourceMap?` | `ProgramSourceMap` | Optional source map for the approval program |
| `params.clearSourceMap?` | `ProgramSourceMap` | Optional source map for the clear state program |
| `params.defaultSender?` | `string` \| `Address` | Optional address to use for the account to use as the default sender for calls. |
| `params.defaultSigner?` | `TransactionSigner` | Optional signer to use as the default signer for default sender calls (if not specified then the signer will be resolved from `AlgorandClient`). |

#### Returns

[`AppClient`](types_app_client.AppClient.md)

The `AppClient`

**`Example`**

```typescript
const appClient = algorand.client.getAppClientById({
  appSpec: '{/* ARC-56 or ARC-32 compatible JSON *\}',
  appId: 12345n,
})
```

#### Defined in

[src/types/client-manager.ts:275](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L275)

___

### getAppClientByNetwork

▸ **getAppClientByNetwork**(`params`): `Promise`\<[`AppClient`](types_app_client.AppClient.md)\>

Returns a new `AppClient` client for managing calls and state for an ARC-56 app.
This method resolves the app ID for the current network based on
pre-determined network-specific app IDs specified in the ARC-56 app spec.

If no IDs are in the app spec or the network isn't recognised, an error is thrown.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The parameters to create the app client |
| `params.appName?` | `string` | Optional override for the app name; used for on-chain metadata and lookups. Defaults to the ARC-32/ARC-56 app spec name |
| `params.appSpec` | `string` \| [`Arc56Contract`](../interfaces/types_app_arc56.Arc56Contract.md) \| [`AppSpec`](../interfaces/types_app_spec.AppSpec.md) | The ARC-56 or ARC-32 application spec as either: * Parsed JSON ARC-56 `Contract` * Parsed JSON ARC-32 `AppSpec` * Raw JSON string (in either ARC-56 or ARC-32 format) |
| `params.approvalSourceMap?` | `ProgramSourceMap` | Optional source map for the approval program |
| `params.clearSourceMap?` | `ProgramSourceMap` | Optional source map for the clear state program |
| `params.defaultSender?` | `string` \| `Address` | Optional address to use for the account to use as the default sender for calls. |
| `params.defaultSigner?` | `TransactionSigner` | Optional signer to use as the default signer for default sender calls (if not specified then the signer will be resolved from `AlgorandClient`). |

#### Returns

`Promise`\<[`AppClient`](types_app_client.AppClient.md)\>

The `AppClient`

**`Example`**

```typescript
const appClient = algorand.client.getAppClientByNetwork({
  appSpec: '{/* ARC-56 or ARC-32 compatible JSON *\}',
  // appId resolved by using ARC-56 spec to find app ID for current network
})
```

#### Defined in

[src/types/client-manager.ts:298](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L298)

___

### getAppFactory

▸ **getAppFactory**(`params`): [`AppFactory`](types_app_factory.AppFactory.md)

Returns a new `AppFactory` client

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | - |
| `params.appName?` | `string` | Optional override for the app name; used for on-chain metadata and lookups. Defaults to the ARC-32/ARC-56 app spec name. |
| `params.appSpec` | `string` \| [`Arc56Contract`](../interfaces/types_app_arc56.Arc56Contract.md) \| [`AppSpec`](../interfaces/types_app_spec.AppSpec.md) | The ARC-56 or ARC-32 application spec as either: * Parsed JSON ARC-56 `Contract` * Parsed JSON ARC-32 `AppSpec` * Raw JSON string (in either ARC-56 or ARC-32 format) |
| `params.defaultSender?` | `string` \| `Address` | Optional address to use for the account to use as the default sender for calls. |
| `params.defaultSigner?` | `TransactionSigner` | Optional signer to use as the default signer for default sender calls (if not specified then the signer will be resolved from `AlgorandClient`). |
| `params.deletable?` | `boolean` | Whether or not the contract should have deploy-time permanence control set, undefined = ignore. If specified here will get used in calls to `deploy` and `create` calls unless overridden in those calls. Useful if you want to vend multiple contracts from the same factory without specifying this value for each call. |
| `params.deployTimeParams?` | [`TealTemplateParams`](../interfaces/types_app.TealTemplateParams.md) | Optional deploy-time TEAL template replacement parameters. If specified here will get used in calls to `deploy` and `create` calls unless overridden in those calls. Useful if you want to vend multiple contracts from the same factory without specifying this value for each call. |
| `params.updatable?` | `boolean` | Whether or not the contract should have deploy-time immutability control set, undefined = ignore. If specified here will get used in calls to `deploy` and `create` calls unless overridden in those calls. Useful if you want to vend multiple contracts from the same factory without specifying this value for each call. |
| `params.version?` | `string` | The version of app that is / will be deployed; defaults to 1.0 |

#### Returns

[`AppFactory`](types_app_factory.AppFactory.md)

**`Example`**

```typescript
const factory = algorand.client.getAppFactory({
  appSpec: '{/* ARC-56 or ARC-32 compatible JSON */}',
})
```

**`Example`**

```typescript
const factory = algorand.client.getAppFactory({
  appSpec: parsedAppSpec_AppSpec_or_Arc56Contract,
  defaultSender: "SENDERADDRESS",
  appName: "OverriddenAppName",
  version: "2.0.0",
  updatable: true,
  deletable: false,
  deployTimeParams: { ONE: 1, TWO: 'value' }
})
```

#### Defined in

[src/types/client-manager.ts:229](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L229)

___

### getTestNetDispenser

▸ **getTestNetDispenser**(`params`): [`TestNetDispenserApiClient`](types_dispenser_client.TestNetDispenserApiClient.md)

Returns a TestNet Dispenser API client.

Refer to [docs](https://github.com/algorandfoundation/algokit/blob/main/docs/testnet_api.md) on guidance to obtain an access token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`TestNetDispenserApiClientParams`](../interfaces/types_dispenser_client.TestNetDispenserApiClientParams.md) | An object containing parameters for the TestNetDispenserApiClient class. |

#### Returns

[`TestNetDispenserApiClient`](types_dispenser_client.TestNetDispenserApiClient.md)

An instance of the TestNetDispenserApiClient class.

**`Example`**

```ts
const client = clientManager.getTestNetDispenser(
    {
      authToken: 'your_auth_token',
      requestTimeout: 15,
    }
)
```

#### Defined in

[src/types/client-manager.ts:185](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L185)

___

### getTestNetDispenserFromEnvironment

▸ **getTestNetDispenserFromEnvironment**(`params?`): [`TestNetDispenserApiClient`](types_dispenser_client.TestNetDispenserApiClient.md)

Returns a TestNet Dispenser API client, loading the auth token from `process.env.ALGOKIT_DISPENSER_ACCESS_TOKEN`.

Refer to [docs](https://github.com/algorandfoundation/algokit/blob/main/docs/testnet_api.md) on guidance to obtain an access token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params?` | `Omit`\<[`TestNetDispenserApiClientParams`](../interfaces/types_dispenser_client.TestNetDispenserApiClientParams.md), ``"authToken"``\> | An object containing parameters for the TestNetDispenserApiClient class. |

#### Returns

[`TestNetDispenserApiClient`](types_dispenser_client.TestNetDispenserApiClient.md)

An instance of the TestNetDispenserApiClient class.

**`Example`**

```ts
const client = clientManager.getTestNetDispenserFromEnvironment(
    {
      requestTimeout: 15,
    }
)
```

#### Defined in

[src/types/client-manager.ts:204](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L204)

___

### getTypedAppClientByCreatorAndName

▸ **getTypedAppClientByCreatorAndName**\<`TClient`\>(`typedClient`, `params`): `Promise`\<`InstanceType`\<`TClient`\>\>

Returns a new typed client, resolving the app by creator address and name.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TClient` | extends [`TypedAppClient`](../interfaces/types_client_manager.TypedAppClient.md)\<`InstanceType`\<`TClient`\>\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typedClient` | `TClient` | The typed client type to use |
| `params` | `Object` | The params to resolve the app by creator address and name |
| `params.appLookupCache?` | [`AppLookup`](../interfaces/types_app_deployer.AppLookup.md) | An optional cached app lookup that matches a name to on-chain details; either this is needed or indexer is required to be passed in to this `ClientManager` on construction. |
| `params.appName?` | `string` | Optional override for the app name; used for on-chain metadata and lookups. Defaults to the ARC-32/ARC-56 app spec name |
| `params.approvalSourceMap?` | `ProgramSourceMap` | Optional source map for the approval program |
| `params.clearSourceMap?` | `ProgramSourceMap` | Optional source map for the clear state program |
| `params.creatorAddress` | `string` \| `Address` | The address of the creator account for the app |
| `params.defaultSender?` | `string` \| `Address` | Optional address to use for the account to use as the default sender for calls. |
| `params.defaultSigner?` | `TransactionSigner` | Optional signer to use as the default signer for default sender calls (if not specified then the signer will be resolved from `AlgorandClient`). |
| `params.ignoreCache?` | `boolean` | Whether or not to ignore the `AppDeployer` lookup cache and force an on-chain lookup, default: use any cached value |

#### Returns

`Promise`\<`InstanceType`\<`TClient`\>\>

The typed client instance

**`Example`**

```typescript
const appClient = algorand.client.getTypedAppClientByCreatorAndName(MyContractClient, {
  creatorAddress: "CREATORADDRESS",
  defaultSender: alice,
})
```

**`Example`**

```typescript
const appClient = algorand.client.getTypedAppClientByCreatorAndName(MyContractClient, {
  creatorAddress: "CREATORADDRESS",
  name: "contract-name",
  defaultSender: alice,
})
```

#### Defined in

[src/types/client-manager.ts:326](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L326)

___

### getTypedAppClientById

▸ **getTypedAppClientById**\<`TClient`\>(`typedClient`, `params`): `InstanceType`\<`TClient`\>

Returns a new typed client, resolving the app by app ID.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TClient` | extends [`TypedAppClient`](../interfaces/types_client_manager.TypedAppClient.md)\<`InstanceType`\<`TClient`\>\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typedClient` | `TClient` | The typed client type to use |
| `params` | `Object` | The params to resolve the app by ID |
| `params.appId` | `bigint` | The ID of the app instance this client should make calls against. |
| `params.appName?` | `string` | Optional override for the app name; used for on-chain metadata and lookups. Defaults to the ARC-32/ARC-56 app spec name |
| `params.approvalSourceMap?` | `ProgramSourceMap` | Optional source map for the approval program |
| `params.clearSourceMap?` | `ProgramSourceMap` | Optional source map for the clear state program |
| `params.defaultSender?` | `string` \| `Address` | Optional address to use for the account to use as the default sender for calls. |
| `params.defaultSigner?` | `TransactionSigner` | Optional signer to use as the default signer for default sender calls (if not specified then the signer will be resolved from `AlgorandClient`). |

#### Returns

`InstanceType`\<`TClient`\>

The typed client instance

**`Example`**

```typescript
const appClient = algorand.client.getTypedAppClientById(MyContractClient, {
  appId: 12345n,
  defaultSender: alice,
})
```

#### Defined in

[src/types/client-manager.ts:350](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L350)

___

### getTypedAppClientByNetwork

▸ **getTypedAppClientByNetwork**\<`TClient`\>(`typedClient`, `params?`): `Promise`\<`InstanceType`\<`TClient`\>\>

Returns a new typed client, resolves the app ID for the current network based on
pre-determined network-specific app IDs specified in the ARC-56 app spec.

If no IDs are in the app spec or the network isn't recognised, an error is thrown.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TClient` | extends [`TypedAppClient`](../interfaces/types_client_manager.TypedAppClient.md)\<`InstanceType`\<`TClient`\>\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typedClient` | `TClient` | The typed client type to use |
| `params?` | `Object` | The params to resolve the app by network |
| `params.appName?` | `string` | Optional override for the app name; used for on-chain metadata and lookups. Defaults to the ARC-32/ARC-56 app spec name |
| `params.approvalSourceMap?` | `ProgramSourceMap` | Optional source map for the approval program |
| `params.clearSourceMap?` | `ProgramSourceMap` | Optional source map for the clear state program |
| `params.defaultSender?` | `string` \| `Address` | Optional address to use for the account to use as the default sender for calls. |
| `params.defaultSigner?` | `TransactionSigner` | Optional signer to use as the default signer for default sender calls (if not specified then the signer will be resolved from `AlgorandClient`). |

#### Returns

`Promise`\<`InstanceType`\<`TClient`\>\>

The typed client instance

**`Example`**

```typescript
const appClient = algorand.client.getTypedAppClientByNetwork(MyContractClient, {
  defaultSender: alice,
})
```

#### Defined in

[src/types/client-manager.ts:376](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L376)

___

### getTypedAppFactory

▸ **getTypedAppFactory**\<`TClient`\>(`typedFactory`, `params?`): `TClient`

Returns a new typed app factory.

#### Type parameters

| Name |
| :------ |
| `TClient` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `typedFactory` | [`TypedAppFactory`](../interfaces/types_client_manager.TypedAppFactory.md)\<`TClient`\> | The typed factory type to use |
| `params?` | `Object` | The params to resolve the factory by |
| `params.appName?` | `string` | Optional override for the app name; used for on-chain metadata and lookups. Defaults to the ARC-32/ARC-56 app spec name. |
| `params.defaultSender?` | `string` \| `Address` | Optional address to use for the account to use as the default sender for calls. |
| `params.defaultSigner?` | `TransactionSigner` | Optional signer to use as the default signer for default sender calls (if not specified then the signer will be resolved from `AlgorandClient`). |
| `params.deletable?` | `boolean` | Whether or not the contract should have deploy-time permanence control set, undefined = ignore. If specified here will get used in calls to `deploy` and `create` calls unless overridden in those calls. Useful if you want to vend multiple contracts from the same factory without specifying this value for each call. |
| `params.deployTimeParams?` | [`TealTemplateParams`](../interfaces/types_app.TealTemplateParams.md) | Optional deploy-time TEAL template replacement parameters. If specified here will get used in calls to `deploy` and `create` calls unless overridden in those calls. Useful if you want to vend multiple contracts from the same factory without specifying this value for each call. |
| `params.updatable?` | `boolean` | Whether or not the contract should have deploy-time immutability control set, undefined = ignore. If specified here will get used in calls to `deploy` and `create` calls unless overridden in those calls. Useful if you want to vend multiple contracts from the same factory without specifying this value for each call. |
| `params.version?` | `string` | The version of app that is / will be deployed; defaults to 1.0 |

#### Returns

`TClient`

The typed client instance

**`Example`**

```typescript
const appFactory = algorand.client.getTypedAppFactory(MyContractClient, {
  sender: alice,
})
```

#### Defined in

[src/types/client-manager.ts:399](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L399)

___

### isLocalNet

▸ **isLocalNet**(): `Promise`\<`boolean`\>

Returns true if the current network is LocalNet.

#### Returns

`Promise`\<`boolean`\>

True if the current network is LocalNet.

#### Defined in

[src/types/client-manager.ts:149](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L149)

___

### isMainNet

▸ **isMainNet**(): `Promise`\<`boolean`\>

Returns true if the current network is MainNet.

#### Returns

`Promise`\<`boolean`\>

True if the current network is MainNet.

#### Defined in

[src/types/client-manager.ts:165](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L165)

___

### isTestNet

▸ **isTestNet**(): `Promise`\<`boolean`\>

Returns true if the current network is TestNet.

#### Returns

`Promise`\<`boolean`\>

True if the current network is TestNet.

#### Defined in

[src/types/client-manager.ts:157](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L157)

___

### network

▸ **network**(): `Promise`\<[`NetworkDetails`](../interfaces/types_network_client.NetworkDetails.md)\>

Get details about the current network.

#### Returns

`Promise`\<[`NetworkDetails`](../interfaces/types_network_client.NetworkDetails.md)\>

The current network details

**`Example`**

```typescript
const network = await networkClient.network()
const genesisId = network.genesisId
```

#### Defined in

[src/types/client-manager.ts:121](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L121)

___

### genesisIdIsLocalNet

▸ **genesisIdIsLocalNet**(`genesisId`): `boolean`

Returns true if the given network genesisId is associated with a LocalNet network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `genesisId` | `string` | The network genesis ID |

#### Returns

`boolean`

Whether the given genesis ID is associated with a LocalNet network

#### Defined in

[src/types/client-manager.ts:141](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L141)

___

### getAlgoNodeConfig

▸ **getAlgoNodeConfig**(`network`, `config`): [`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md)

Returns the Algorand configuration to point to the free tier of the AlgoNode service.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `network` | ``"testnet"`` \| ``"mainnet"`` | Which network to connect to - TestNet or MainNet |
| `config` | ``"algod"`` \| ``"indexer"`` | Which algod config to return - Algod or Indexer |

#### Returns

[`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md)

#### Defined in

[src/types/client-manager.ts:495](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L495)

___

### getAlgodClient

▸ **getAlgodClient**(`config`): `AlgodClient`

Returns an algod SDK client that automatically retries on idempotent calls.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md) | The config of the client |

#### Returns

`AlgodClient`

**`Example`**

```typescript
 const algod = ClientManager.getAlgodClient(ClientManager.getAlgoNodeConfig('testnet', 'algod'))
 await algod.healthCheck().do()
```

**`Example`**

```typescript
 const algod = ClientManager.getAlgodClient(ClientManager.getAlgoNodeConfig('mainnet', 'algod'))
 await algod.healthCheck().do()
```

**`Example`**

```typescript
 const algod = ClientManager.getAlgodClient({server: 'http://localhost', port: '4001', token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'})
 await algod.healthCheck().do()
```

#### Defined in

[src/types/client-manager.ts:534](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L534)

___

### getAlgodClientFromEnvironment

▸ **getAlgodClientFromEnvironment**(): `AlgodClient`

Returns an algod SDK client that automatically retries on idempotent calls loaded from environment variables (expects to be called from a Node.js environment).

#### Returns

`AlgodClient`

**`Example`**

```typescript
 // Uses process.env.ALGOD_SERVER, process.env.ALGOD_PORT and process.env.ALGOD_TOKEN
 const algod = ClientManager.getAlgodClientFromEnvironment()
 await algod.healthCheck().do()
 ```

#### Defined in

[src/types/client-manager.ts:551](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L551)

___

### getAlgodConfigFromEnvironment

▸ **getAlgodConfigFromEnvironment**(): [`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md)

Retrieve the algod configuration from environment variables (expects to be called from a Node.js environment)

Expects `process.env.ALGOD_SERVER` to be defined, and you can also specify `process.env.ALGOD_PORT` and `process.env.ALGOD_TOKEN`.

#### Returns

[`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md)

#### Defined in

[src/types/client-manager.ts:453](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L453)

___

### getConfigFromEnvironmentOrLocalNet

▸ **getConfigFromEnvironmentOrLocalNet**(): [`AlgoConfig`](../interfaces/types_network_client.AlgoConfig.md)

Retrieve client configurations from environment variables when defined or get defaults (expects to be called from a Node.js environment)

If both `process.env.INDEXER_SERVER` and `process.env.ALGOD_SERVER` is defined it will use both along with optional `process.env.ALGOD_PORT`, `process.env.ALGOD_TOKEN`, `process.env.INDEXER_PORT` and `process.env.INDEXER_TOKEN`.

If only `process.env.ALGOD_SERVER` is defined it will use this along with optional `process.env.ALGOD_PORT` and `process.env.ALGOD_TOKEN` and leave indexer as `undefined`.

If only `process.env.INDEXER_SERVER` is defined it will use the default (LocalNet) configuration for both algod and indexer.

It will return a KMD configuration that uses `process.env.KMD_PORT` (or port 4002) if `process.env.ALGOD_SERVER` is defined,
otherwise it will use the default LocalNet config unless it detects testnet or mainnet.

#### Returns

[`AlgoConfig`](../interfaces/types_network_client.AlgoConfig.md)

The config for algod, indexer and kmd

**`Example`**

```typescript
const config = ClientManager.getConfigFromEnvironmentOrLocalNet()
```

#### Defined in

[src/types/client-manager.ts:424](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L424)

___

### getDefaultLocalNetConfig

▸ **getDefaultLocalNetConfig**(`configOrPort`): [`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md)

Returns the Algorand configuration to point to the default LocalNet.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configOrPort` | `number` \| ``"algod"`` \| ``"indexer"`` \| ``"kmd"`` | Which algod config to return - algod, kmd, or indexer OR a port number |

#### Returns

[`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md)

#### Defined in

[src/types/client-manager.ts:506](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L506)

___

### getIndexerClient

▸ **getIndexerClient**(`config`): `IndexerClient`

Returns an indexer SDK client that automatically retries on idempotent calls

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md) | The config of the client |

#### Returns

`IndexerClient`

**`Example`**

```typescript
 const indexer = ClientManager.getIndexerClient(ClientManager.getAlgoNodeConfig('testnet', 'indexer'))
 await indexer.makeHealthCheck().do()
```

**`Example`**

```typescript
 const indexer = ClientManager.getIndexerClient(ClientManager.getAlgoNodeConfig('mainnet', 'indexer'))
 await indexer.makeHealthCheck().do()
```

**`Example`**

```typescript
 const indexer = ClientManager.getIndexerClient({server: 'http://localhost', port: '8980', token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'})
 await indexer.makeHealthCheck().do()
```

#### Defined in

[src/types/client-manager.ts:575](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L575)

___

### getIndexerClientFromEnvironment

▸ **getIndexerClientFromEnvironment**(): `IndexerClient`

Returns an indexer SDK client that automatically retries on idempotent calls loaded from environment variables (expects to be called from a Node.js environment).

#### Returns

`IndexerClient`

**`Example`**

```typescript
 // Uses process.env.INDEXER_SERVER, process.env.INDEXER_PORT and process.env.INDEXER_TOKEN
 const indexer = ClientManager.getIndexerClientFromEnvironment()
 await indexer.makeHealthCheck().do()
 ```

#### Defined in

[src/types/client-manager.ts:593](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L593)

___

### getIndexerConfigFromEnvironment

▸ **getIndexerConfigFromEnvironment**(): [`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md)

Retrieve the indexer configuration from environment variables (expects to be called from a Node.js environment).

Expects `process.env.INDEXER_SERVER` to be defined, and you can also specify `process.env.INDEXER_PORT` and `process.env.INDEXER_TOKEN`.

#### Returns

[`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md)

#### Defined in

[src/types/client-manager.ts:474](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L474)

___

### getKmdClient

▸ **getKmdClient**(`config`): `KmdClient`

Returns a KMD SDK client.

KMD client allows you to export private keys, which is useful to (for instance) get the default account in a LocalNet network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`AlgoClientConfig`](../interfaces/types_network_client.AlgoClientConfig.md) | The config for the client |

#### Returns

`KmdClient`

**`Example`**

```typescript
 const kmd = ClientManager.getKmdClient({server: 'http://localhost', port: '4002', token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'})
```

#### Defined in

[src/types/client-manager.ts:608](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L608)

___

### getKmdClientFromEnvironment

▸ **getKmdClientFromEnvironment**(): `KmdClient`

Returns a KMD SDK client that automatically retries on idempotent calls loaded from environment variables (expects to be called from a Node.js environment).

#### Returns

`KmdClient`

**`Example`**

```typescript
 // Uses process.env.ALGOD_SERVER, process.env.KMD_PORT (or if not specified: port 4002) and process.env.ALGOD_TOKEN
 const kmd = ClientManager.getKmdClientFromEnvironment()
 ```

#### Defined in

[src/types/client-manager.ts:622](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L622)
