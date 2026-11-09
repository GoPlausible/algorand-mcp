[@algorandfoundation/algokit-utils](../README.md) / [types/app-deployer](../modules/types_app_deployer.md) / AppDeployer

# Class: AppDeployer

[types/app-deployer](../modules/types_app_deployer.md).AppDeployer

Allows management of deployment and deployment metadata of applications.

## Table of contents

### Constructors

- [constructor](types_app_deployer.AppDeployer.md#constructor)

### Properties

- [\_appLookups](types_app_deployer.AppDeployer.md#_applookups)
- [\_appManager](types_app_deployer.AppDeployer.md#_appmanager)
- [\_indexer](types_app_deployer.AppDeployer.md#_indexer)
- [\_transactionSender](types_app_deployer.AppDeployer.md#_transactionsender)

### Methods

- [deploy](types_app_deployer.AppDeployer.md#deploy)
- [getCreatorAppsByName](types_app_deployer.AppDeployer.md#getcreatorappsbyname)
- [updateAppLookup](types_app_deployer.AppDeployer.md#updateapplookup)

## Constructors

### constructor

• **new AppDeployer**(`appManager`, `transactionSender`, `indexer?`): [`AppDeployer`](types_app_deployer.AppDeployer.md)

Creates an `AppManager`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appManager` | [`AppManager`](types_app_manager.AppManager.md) | An `AppManager` instance |
| `transactionSender` | [`AlgorandClientTransactionSender`](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md) | An `AlgorandClientTransactionSender` instance |
| `indexer?` | `IndexerClient` | An optional indexer instance; supply if you want to indexer to look up app metadata |

#### Returns

[`AppDeployer`](types_app_deployer.AppDeployer.md)

#### Defined in

[src/types/app-deployer.ts:123](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L123)

## Properties

### \_appLookups

• `Private` **\_appLookups**: `Map`\<`string`, [`AppLookup`](../interfaces/types_app_deployer.AppLookup.md)\>

#### Defined in

[src/types/app-deployer.ts:115](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L115)

___

### \_appManager

• `Private` **\_appManager**: [`AppManager`](types_app_manager.AppManager.md)

#### Defined in

[src/types/app-deployer.ts:112](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L112)

___

### \_indexer

• `Private` `Optional` **\_indexer**: `IndexerClient`

#### Defined in

[src/types/app-deployer.ts:114](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L114)

___

### \_transactionSender

• `Private` **\_transactionSender**: [`AlgorandClientTransactionSender`](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md)

#### Defined in

[src/types/app-deployer.ts:113](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L113)

## Methods

### deploy

▸ **deploy**(`deployment`): `Promise`\<[`AppDeployResult`](../modules/types_app_deployer.md#appdeployresult)\>

Idempotently deploy (create if not exists, update if changed) an app against the given name for the given creator account, including deploy-time TEAL template placeholder substitutions (if specified).

To understand the architecture decisions behind this functionality please see https://github.com/algorandfoundation/algokit-cli/blob/main/docs/architecture-decisions/2023-01-12_smart-contract-deployment.md

**Note:** When using the return from this function be sure to check `operationPerformed` to get access to various return properties like `transaction`, `confirmation` and `deleteResult`.

**Note:** if there is a breaking state schema change to an existing app (and `onSchemaBreak` is set to `'replace'`) the existing app will be deleted and re-created.

**Note:** if there is an update (different TEAL code) to an existing app (and `onUpdate` is set to `'replace'`) the existing app will be deleted and re-created.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deployment` | `Object` | The arguments to control the app deployment |
| `deployment.createParams` | \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } \| [`AppCreateMethodCall`](../modules/types_composer.md#appcreatemethodcall) | Create transaction parameters to use if a create needs to be issued as part of deployment |
| `deployment.deleteParams` | \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } \| \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `args?`: (`undefined` \| `Transaction` \| `ABIValue` \| `TransactionWithSigner` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<[`AppMethodCallParams`](../modules/types_composer.md#appmethodcallparams)\>)[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `method`: `ABIMethod` ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } | Delete transaction parameters to use if a delete needs to be issued as part of deployment |
| `deployment.deployTimeParams?` | [`TealTemplateParams`](../interfaces/types_app.TealTemplateParams.md) | Any deploy-time parameters to replace in the TEAL code before compiling it (used if teal code is passed in as a string) |
| `deployment.existingDeployments?` | [`AppLookup`](../interfaces/types_app_deployer.AppLookup.md) | Optional cached value of the existing apps for the given creator; use this to avoid an indexer lookup |
| `deployment.ignoreCache?` | `boolean` | Whether or not to ignore the app metadata cache and force a lookup, default: use the cache * |
| `deployment.maxRoundsToWaitForConfirmation?` | `number` | The number of rounds to wait for confirmation. By default until the latest lastValid has past. |
| `deployment.metadata` | [`AppDeployMetadata`](../interfaces/types_app.AppDeployMetadata.md) | The deployment metadata |
| `deployment.onSchemaBreak?` | [`OnSchemaBreak`](../enums/types_app.OnSchemaBreak.md) \| ``"replace"`` \| ``"fail"`` \| ``"append"`` | What action to perform if a schema break (storage schema or extra pages change) is detected: * `fail` - Fail the deployment (throw an error, **default**) * `replace` - Delete the old app and create a new one * `append` - Deploy a new app and leave the old one as is |
| `deployment.onUpdate?` | ``"replace"`` \| ``"fail"`` \| ``"append"`` \| [`OnUpdate`](../enums/types_app.OnUpdate.md) \| ``"update"`` | What action to perform if a TEAL code update is detected: * `fail` - Fail the deployment (throw an error, **default**) * `update` - Update the app with the new TEAL code * `replace` - Delete the old app and create a new one * `append` - Deploy a new app and leave the old one as is |
| `deployment.populateAppCallResources?` | `boolean` | Whether to use simulate to automatically populate app call resources in the txn objects. Defaults to `Config.populateAppCallResources`. |
| `deployment.suppressLog?` | `boolean` | Whether to suppress log messages from transaction send, default: do not suppress. |
| `deployment.updateParams` | \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } \| \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `args?`: (`undefined` \| `Transaction` \| `ABIValue` \| `TransactionWithSigner` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<[`AppMethodCallParams`](../modules/types_composer.md#appmethodcallparams)\>)[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `method`: `ABIMethod` ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } | Update transaction parameters to use if an update needs to be issued as part of deployment |

#### Returns

`Promise`\<[`AppDeployResult`](../modules/types_app_deployer.md#appdeployresult)\>

The app reference of the new/existing app

#### Defined in

[src/types/app-deployer.ts:142](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L142)

___

### getCreatorAppsByName

▸ **getCreatorAppsByName**(`creatorAddress`, `ignoreCache?`): `Promise`\<[`AppLookup`](../interfaces/types_app_deployer.AppLookup.md)\>

Returns a lookup of name => app metadata (id, address, ...metadata) for all apps created by the given account that have
an [ARC-2](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0002.md) `AppDeployNote` as the transaction
note of the app creation transaction.

This function caches the result for the given creator account so that subsequent calls will not require an indexer lookup.

If the `AppManager` instance wasn't created with an indexer client, this function will throw an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `creatorAddress` | `string` \| `Address` | The address of the account that is the creator of the apps you want to search for |
| `ignoreCache?` | `boolean` | Whether or not to ignore the cache and force a lookup, default: use the cache |

#### Returns

`Promise`\<[`AppLookup`](../interfaces/types_app_deployer.AppLookup.md)\>

A name-based lookup of the app metadata

#### Defined in

[src/types/app-deployer.ts:456](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L456)

___

### updateAppLookup

▸ **updateAppLookup**(`sender`, `appMetadata`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sender` | `string` \| `Address` |
| `appMetadata` | [`AppMetadata`](../interfaces/types_app_deployer.AppMetadata.md) |

#### Returns

`void`

#### Defined in

[src/types/app-deployer.ts:433](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L433)
