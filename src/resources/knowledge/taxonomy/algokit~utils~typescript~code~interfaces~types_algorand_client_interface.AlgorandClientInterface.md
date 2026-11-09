[@algorandfoundation/algokit-utils](../README.md) / [types/algorand-client-interface](../modules/types_algorand_client_interface.md) / AlgorandClientInterface

# Interface: AlgorandClientInterface

[types/algorand-client-interface](../modules/types_algorand_client_interface.md).AlgorandClientInterface

Interface for the bulk of the `AlgorandClient` functionality.

Used to take a dependency on AlgorandClient without generating a circular dependency.

## Implemented by

- [`AlgorandClient`](../classes/types_algorand_client.AlgorandClient.md)

## Table of contents

### Properties

- [app](types_algorand_client_interface.AlgorandClientInterface.md#app)
- [appDeployer](types_algorand_client_interface.AlgorandClientInterface.md#appdeployer)
- [client](types_algorand_client_interface.AlgorandClientInterface.md#client)
- [createTransaction](types_algorand_client_interface.AlgorandClientInterface.md#createtransaction)
- [send](types_algorand_client_interface.AlgorandClientInterface.md#send)

### Methods

- [newGroup](types_algorand_client_interface.AlgorandClientInterface.md#newgroup)

## Properties

### app

• **app**: [`AppManager`](../classes/types_app_manager.AppManager.md)

#### Defined in

[src/types/algorand-client-interface.ts:16](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-interface.ts#L16)

___

### appDeployer

• **appDeployer**: [`AppDeployer`](../classes/types_app_deployer.AppDeployer.md)

#### Defined in

[src/types/algorand-client-interface.ts:17](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-interface.ts#L17)

___

### client

• **client**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `algod` | `AlgodClient` |
| `indexer?` | `IndexerClient` |
| `isLocalNet` | () => `Promise`\<`boolean`\> |
| `isMainNet` | () => `Promise`\<`boolean`\> |
| `isTestNet` | () => `Promise`\<`boolean`\> |
| `network` | () => `Promise`\<[`NetworkDetails`](types_network_client.NetworkDetails.md)\> |

#### Defined in

[src/types/algorand-client-interface.ts:21](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-interface.ts#L21)

___

### createTransaction

• **createTransaction**: [`AlgorandClientTransactionCreator`](../classes/types_algorand_client_transaction_creator.AlgorandClientTransactionCreator.md)

#### Defined in

[src/types/algorand-client-interface.ts:19](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-interface.ts#L19)

___

### send

• **send**: [`AlgorandClientTransactionSender`](../classes/types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md)

#### Defined in

[src/types/algorand-client-interface.ts:18](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-interface.ts#L18)

## Methods

### newGroup

▸ **newGroup**(): [`TransactionComposer`](../classes/types_composer.TransactionComposer.md)

#### Returns

[`TransactionComposer`](../classes/types_composer.TransactionComposer.md)

#### Defined in

[src/types/algorand-client-interface.ts:20](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-interface.ts#L20)
