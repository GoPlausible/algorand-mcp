[@algorandfoundation/algokit-utils](../README.md) / types/app

# Module: types/app

## Table of contents

### Enumerations

- [OnSchemaBreak](../enums/types_app.OnSchemaBreak.md)
- [OnUpdate](../enums/types_app.OnUpdate.md)

### Interfaces

- [AppCallParams](../interfaces/types_app.AppCallParams.md)
- [AppCallTransactionResultOfType](../interfaces/types_app.AppCallTransactionResultOfType.md)
- [AppCompilationResult](../interfaces/types_app.AppCompilationResult.md)
- [AppDeployMetadata](../interfaces/types_app.AppDeployMetadata.md)
- [AppDeploymentParams](../interfaces/types_app.AppDeploymentParams.md)
- [AppLookup](../interfaces/types_app.AppLookup.md)
- [AppMetadata](../interfaces/types_app.AppMetadata.md)
- [AppReference](../interfaces/types_app.AppReference.md)
- [AppState](../interfaces/types_app.AppState.md)
- [AppStorageSchema](../interfaces/types_app.AppStorageSchema.md)
- [BoxName](../interfaces/types_app.BoxName.md)
- [BoxReference](../interfaces/types_app.BoxReference.md)
- [BoxValueRequestParams](../interfaces/types_app.BoxValueRequestParams.md)
- [BoxValuesRequestParams](../interfaces/types_app.BoxValuesRequestParams.md)
- [CompiledTeal](../interfaces/types_app.CompiledTeal.md)
- [CoreAppCallArgs](../interfaces/types_app.CoreAppCallArgs.md)
- [CreateAppParams](../interfaces/types_app.CreateAppParams.md)
- [RawAppCallArgs](../interfaces/types_app.RawAppCallArgs.md)
- [TealTemplateParams](../interfaces/types_app.TealTemplateParams.md)
- [UpdateAppParams](../interfaces/types_app.UpdateAppParams.md)

### Type Aliases

- [ABIAppCallArg](types_app.md#abiappcallarg)
- [ABIAppCallArgs](types_app.md#abiappcallargs)
- [ABIReturn](types_app.md#abireturn)
- [AppCallArgs](types_app.md#appcallargs)
- [AppCallTransactionResult](types_app.md#appcalltransactionresult)
- [AppCallType](types_app.md#appcalltype)
- [AppReturn](types_app.md#appreturn)
- [BoxIdentifier](types_app.md#boxidentifier)
- [SendAppCreateTransactionResult](types_app.md#sendappcreatetransactionresult)
- [SendAppTransactionResult](types_app.md#sendapptransactionresult)
- [SendAppUpdateTransactionResult](types_app.md#sendappupdatetransactionresult)

### Variables

- [ABI\_RETURN\_PREFIX](types_app.md#abi_return_prefix)
- [APP\_DEPLOY\_NOTE\_DAPP](types_app.md#app_deploy_note_dapp)
- [APP\_PAGE\_MAX\_SIZE](types_app.md#app_page_max_size)
- [DELETABLE\_TEMPLATE\_NAME](types_app.md#deletable_template_name)
- [UPDATABLE\_TEMPLATE\_NAME](types_app.md#updatable_template_name)

## Type Aliases

### ABIAppCallArg

Ƭ **ABIAppCallArg**: `ABIArgument` \| [`TransactionToSign`](../interfaces/types_transaction.TransactionToSign.md) \| `Transaction` \| `Promise`\<[`SendTransactionResult`](../interfaces/types_transaction.SendTransactionResult.md)\> \| [`SendTransactionResult`](../interfaces/types_transaction.SendTransactionResult.md) \| `undefined`

An argument for an ABI method, either a primitive value, or a transaction with or without signer, or the unawaited async return value of an algokit method that returns a `SendTransactionResult`

#### Defined in

[src/types/app.ts:102](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L102)

___

### ABIAppCallArgs

Ƭ **ABIAppCallArgs**: [`CoreAppCallArgs`](../interfaces/types_app.CoreAppCallArgs.md) & \{ `method`: `ABIMethodParams` \| `ABIMethod` ; `methodArgs`: [`ABIAppCallArg`](types_app.md#abiappcallarg)[]  }

App call args for an ABI call

#### Defined in

[src/types/app.ts:113](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L113)

___

### ABIReturn

Ƭ **ABIReturn**: \{ `decodeError`: `undefined` ; `method`: `ABIMethod` ; `rawReturnValue`: `Uint8Array` ; `returnValue`: `ABIValue`  } \| \{ `decodeError`: `Error` ; `method?`: `undefined` ; `rawReturnValue?`: `undefined` ; `returnValue?`: `undefined`  }

The return value of an ABI method call

#### Defined in

[src/types/app.ts:235](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L235)

___

### AppCallArgs

Ƭ **AppCallArgs**: [`RawAppCallArgs`](../interfaces/types_app.RawAppCallArgs.md) \| [`ABIAppCallArgs`](types_app.md#abiappcallargs)

Arguments to pass to an app call either:
  * The raw app call values to pass through into the transaction (after processing); or
  * An ABI method definition (method and args)

#### Defined in

[src/types/app.ts:124](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L124)

___

### AppCallTransactionResult

Ƭ **AppCallTransactionResult**: [`AppCallTransactionResultOfType`](../interfaces/types_app.AppCallTransactionResultOfType.md)\<[`ABIReturn`](types_app.md#abireturn)\>

Result from calling an app

#### Defined in

[src/types/app.ts:232](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L232)

___

### AppCallType

Ƭ **AppCallType**: ``"no_op"`` \| ``"opt_in"`` \| ``"close_out"`` \| ``"clear_state"`` \| ``"update_application"`` \| ``"delete_application"``

**`Deprecated`**

Use `algosdk.OnApplicationComplete` directly instead.

The type of call / [on-completion action](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/apps/#the-lifecycle-of-a-smart-contract) for a smart contract call.

Equivalent of `algosdk.OnApplicationComplete`, but as a more convenient string enum.

* `no_op`: Normal smart contract call, no special on-complete action
* `opt_in`: Opt-in to smart contract local storage
* `close_out`: Close-out local storage storage
* `clear_state`: Clear local storage state
* `update_application`: Update the smart contract
* `delete_application`: Delete the smart contract

#### Defined in

[src/types/app.ts:180](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L180)

___

### AppReturn

Ƭ **AppReturn**\<`TReturn`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `TReturn` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `return?` | `TReturn` | The ABI method call return value |

#### Defined in

[src/types/app.ts:340](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L340)

___

### BoxIdentifier

Ƭ **BoxIdentifier**: `string` \| `Uint8Array` \| [`SendTransactionFrom`](types_transaction.md#sendtransactionfrom)

**`Deprecated`**

Use `types/app-manager/BoxIdentifier` instead.

Something that identifies a box name - either a:
 * `Uint8Array`
 * `string` (that will be encoded to a Uint8Array)
 * `SendTransactionFrom` (encoded into the public key address of the corresponding account)

#### Defined in

[src/types/app.ts:70](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L70)

___

### SendAppCreateTransactionResult

Ƭ **SendAppCreateTransactionResult**: [`Expand`](types_expand.md#expand)\<[`SendAppUpdateTransactionResult`](types_app.md#sendappupdatetransactionresult) & \{ `appAddress`: `Address` ; `appId`: `bigint`  }\>

Result from sending a single app transaction.

#### Defined in

[src/types/app.ts:357](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L357)

___

### SendAppTransactionResult

Ƭ **SendAppTransactionResult**: [`Expand`](types_expand.md#expand)\<[`SendSingleTransactionResult`](types_transaction.md#sendsingletransactionresult) & \{ `return?`: [`ABIReturn`](types_app.md#abireturn)  }\>

Result from sending a single app transaction.

#### Defined in

[src/types/app.ts:346](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L346)

___

### SendAppUpdateTransactionResult

Ƭ **SendAppUpdateTransactionResult**: [`Expand`](types_expand.md#expand)\<[`SendAppTransactionResult`](types_app.md#sendapptransactionresult) & `Partial`\<[`AppCompilationResult`](../interfaces/types_app.AppCompilationResult.md)\>\>

Result from sending a single app transaction.

#### Defined in

[src/types/app.ts:354](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L354)

## Variables

### ABI\_RETURN\_PREFIX

• `Const` **ABI\_RETURN\_PREFIX**: `Uint8Array`

First 4 bytes of SHA-512/256 hash of "return" for retrieving ABI return values

#### Defined in

[src/types/app.ts:36](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L36)

___

### APP\_DEPLOY\_NOTE\_DAPP

• `Const` **APP\_DEPLOY\_NOTE\_DAPP**: ``"ALGOKIT_DEPLOYER"``

The app create/update [ARC-2](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0002.md) transaction note prefix

#### Defined in

[src/types/app.ts:30](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L30)

___

### APP\_PAGE\_MAX\_SIZE

• `Const` **APP\_PAGE\_MAX\_SIZE**: ``2048``

The maximum number of bytes in a single app code page

#### Defined in

[src/types/app.ts:33](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L33)

___

### DELETABLE\_TEMPLATE\_NAME

• `Const` **DELETABLE\_TEMPLATE\_NAME**: ``"TMPL_DELETABLE"``

The name of the TEAL template variable for deploy-time permanence control

#### Defined in

[src/types/app.ts:27](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L27)

___

### UPDATABLE\_TEMPLATE\_NAME

• `Const` **UPDATABLE\_TEMPLATE\_NAME**: ``"TMPL_UPDATABLE"``

The name of the TEAL template variable for deploy-time immutability control

#### Defined in

[src/types/app.ts:24](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L24)
