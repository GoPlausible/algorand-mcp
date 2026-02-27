[@algorandfoundation/algokit-utils](../README.md) / types/app-deployer

# Module: types/app-deployer

## Table of contents

### Classes

- [AppDeployer](../classes/types_app_deployer.AppDeployer.md)

### Interfaces

- [AppLookup](../interfaces/types_app_deployer.AppLookup.md)
- [AppMetadata](../interfaces/types_app_deployer.AppMetadata.md)

### Type Aliases

- [AppDeployParams](types_app_deployer.md#appdeployparams)
- [AppDeployResult](types_app_deployer.md#appdeployresult)
- [DeployAppDeleteMethodCall](types_app_deployer.md#deployappdeletemethodcall)
- [DeployAppDeleteParams](types_app_deployer.md#deployappdeleteparams)
- [DeployAppUpdateMethodCall](types_app_deployer.md#deployappupdatemethodcall)
- [DeployAppUpdateParams](types_app_deployer.md#deployappupdateparams)

## Type Aliases

### AppDeployParams

Ƭ **AppDeployParams**: [`Expand`](types_expand.md#expand)\<[`SendParams`](../interfaces/types_transaction.SendParams.md) & \{ `createParams`: [`AppCreateParams`](types_composer.md#appcreateparams) \| [`AppCreateMethodCall`](types_composer.md#appcreatemethodcall) ; `deleteParams`: [`DeployAppDeleteParams`](types_app_deployer.md#deployappdeleteparams) \| [`DeployAppDeleteMethodCall`](types_app_deployer.md#deployappdeletemethodcall) ; `deployTimeParams?`: [`TealTemplateParams`](../interfaces/types_app.TealTemplateParams.md) ; `existingDeployments?`: [`AppLookup`](../interfaces/types_app_deployer.AppLookup.md) ; `ignoreCache?`: `boolean` ; `metadata`: [`AppDeployMetadata`](../interfaces/types_app.AppDeployMetadata.md) ; `onSchemaBreak?`: ``"replace"`` \| ``"fail"`` \| ``"append"`` \| [`OnSchemaBreak`](../enums/types_app.OnSchemaBreak.md) ; `onUpdate?`: ``"update"`` \| ``"replace"`` \| ``"fail"`` \| ``"append"`` \| [`OnUpdate`](../enums/types_app.OnUpdate.md) ; `updateParams`: [`DeployAppUpdateParams`](types_app_deployer.md#deployappupdateparams) \| [`DeployAppUpdateMethodCall`](types_app_deployer.md#deployappupdatemethodcall)  }\>

The parameters to idempotently deploy an app

#### Defined in

[src/types/app-deployer.ts:38](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L38)

___

### AppDeployResult

Ƭ **AppDeployResult**: [`Expand`](types_expand.md#expand)\<\{ `operationPerformed`: ``"create"``  } & `Omit`\<[`AppMetadata`](../interfaces/types_app_deployer.AppMetadata.md), ``"appId"`` \| ``"appAddress"``\> & [`SendAppCreateTransactionResult`](types_app.md#sendappcreatetransactionresult)\> \| [`Expand`](types_expand.md#expand)\<\{ `operationPerformed`: ``"update"``  } & [`AppMetadata`](../interfaces/types_app_deployer.AppMetadata.md) & [`SendAppUpdateTransactionResult`](types_app.md#sendappupdatetransactionresult)\> \| [`Expand`](types_expand.md#expand)\<\{ `operationPerformed`: ``"replace"``  } & `Omit`\<[`AppMetadata`](../interfaces/types_app_deployer.AppMetadata.md), ``"appId"`` \| ``"appAddress"``\> & [`SendAppCreateTransactionResult`](types_app.md#sendappcreatetransactionresult) & \{ `deleteResult`: [`ConfirmedTransactionResult`](../interfaces/types_transaction.ConfirmedTransactionResult.md) ; `deleteReturn?`: [`ABIReturn`](types_app.md#abireturn)  }\> \| [`Expand`](types_expand.md#expand)\<\{ `operationPerformed`: ``"nothing"``  } & [`AppMetadata`](../interfaces/types_app_deployer.AppMetadata.md)\>

#### Defined in

[src/types/app-deployer.ts:98](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L98)

___

### DeployAppDeleteMethodCall

Ƭ **DeployAppDeleteMethodCall**: [`Expand`](types_expand.md#expand)\<`Omit`\<[`AppDeleteMethodCall`](types_composer.md#appdeletemethodcall), ``"appId"``\>\>

Params to specify a delete method call for an app deployment

#### Defined in

[src/types/app-deployer.ts:35](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L35)

___

### DeployAppDeleteParams

Ƭ **DeployAppDeleteParams**: [`Expand`](types_expand.md#expand)\<`Omit`\<[`AppDeleteParams`](types_composer.md#appdeleteparams), ``"appId"``\>\>

Params to specify a transaction for an app deployment

#### Defined in

[src/types/app-deployer.ts:33](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L33)

___

### DeployAppUpdateMethodCall

Ƭ **DeployAppUpdateMethodCall**: [`Expand`](types_expand.md#expand)\<`Omit`\<[`AppUpdateMethodCall`](types_composer.md#appupdatemethodcall), ``"appId"`` \| ``"approvalProgram"`` \| ``"clearStateProgram"``\>\>

Params to specify an update method call for an app deployment

#### Defined in

[src/types/app-deployer.ts:31](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L31)

___

### DeployAppUpdateParams

Ƭ **DeployAppUpdateParams**: [`Expand`](types_expand.md#expand)\<`Omit`\<[`AppUpdateParams`](types_composer.md#appupdateparams), ``"appId"`` \| ``"approvalProgram"`` \| ``"clearStateProgram"``\>\>

Params to specify an update transaction for an app deployment

#### Defined in

[src/types/app-deployer.ts:29](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L29)
