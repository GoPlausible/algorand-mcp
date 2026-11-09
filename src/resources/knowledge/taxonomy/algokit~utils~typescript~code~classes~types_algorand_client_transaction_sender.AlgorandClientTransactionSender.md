[@algorandfoundation/algokit-utils](../README.md) / [types/algorand-client-transaction-sender](../modules/types_algorand_client_transaction_sender.md) / AlgorandClientTransactionSender

# Class: AlgorandClientTransactionSender

[types/algorand-client-transaction-sender](../modules/types_algorand_client_transaction_sender.md).AlgorandClientTransactionSender

Orchestrates sending transactions for `AlgorandClient`.

## Table of contents

### Constructors

- [constructor](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#constructor)

### Properties

- [\_appManager](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#_appmanager)
- [\_assetManager](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#_assetmanager)
- [\_newGroup](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#_newgroup)
- [appCall](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#appcall)
- [appCallMethodCall](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#appcallmethodcall)
- [appCreate](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#appcreate)
- [appCreateMethodCall](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#appcreatemethodcall)
- [appDelete](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#appdelete)
- [appDeleteMethodCall](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#appdeletemethodcall)
- [appUpdate](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#appupdate)
- [appUpdateMethodCall](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#appupdatemethodcall)
- [assetConfig](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#assetconfig)
- [assetDestroy](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#assetdestroy)
- [assetFreeze](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#assetfreeze)
- [assetOptIn](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#assetoptin)
- [assetTransfer](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#assettransfer)
- [offlineKeyRegistration](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#offlinekeyregistration)
- [onlineKeyRegistration](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#onlinekeyregistration)
- [payment](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#payment)

### Methods

- [\_send](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#_send)
- [\_sendAppCall](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#_sendappcall)
- [\_sendAppCreateCall](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#_sendappcreatecall)
- [\_sendAppUpdateCall](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#_sendappupdatecall)
- [assetCreate](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#assetcreate)
- [assetOptOut](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#assetoptout)
- [newGroup](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md#newgroup)

## Constructors

### constructor

• **new AlgorandClientTransactionSender**(`newGroup`, `assetManager`, `appManager`): [`AlgorandClientTransactionSender`](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md)

Creates a new `AlgorandClientSender`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newGroup` | () => [`TransactionComposer`](types_composer.TransactionComposer.md) | A lambda that starts a new `TransactionComposer` transaction group |
| `assetManager` | [`AssetManager`](types_asset_manager.AssetManager.md) | An `AssetManager` instance |
| `appManager` | [`AppManager`](types_app_manager.AppManager.md) | - |

#### Returns

[`AlgorandClientTransactionSender`](types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md)

#### Defined in

[src/types/algorand-client-transaction-sender.ts:48](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L48)

## Properties

### \_appManager

• `Private` **\_appManager**: [`AppManager`](types_app_manager.AppManager.md)

#### Defined in

[src/types/algorand-client-transaction-sender.ts:41](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L41)

___

### \_assetManager

• `Private` **\_assetManager**: [`AssetManager`](types_asset_manager.AssetManager.md)

#### Defined in

[src/types/algorand-client-transaction-sender.ts:40](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L40)

___

### \_newGroup

• `Private` **\_newGroup**: () => [`TransactionComposer`](types_composer.TransactionComposer.md)

#### Type declaration

▸ (): [`TransactionComposer`](types_composer.TransactionComposer.md)

##### Returns

[`TransactionComposer`](types_composer.TransactionComposer.md)

#### Defined in

[src/types/algorand-client-transaction-sender.ts:39](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L39)

___

### appCall

• **appCall**: (`params`: [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `onComplete?`: `OnApplicationComplete`  } & \{ `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `ClearStateOC` \| `DeleteApplicationOC`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Call a smart contract.

Note: you may prefer to use `algorand.client` to get an app client for more advanced functionality.

**`Example`**

```typescript
await algorand.send.appCall({ sender: 'CREATORADDRESS' })
```

**`Example`**

```typescript
await algorand.send.appCall({
 sender: 'CREATORADDRESS',
 onComplete: algosdk.OnApplicationComplete.OptInOC,
 args: [new Uint8Array(1, 2, 3, 4)]
 accountReferences: ["ACCOUNT_1"]
 appReferences: [123n, 1234n]
 assetReferences: [12345n]
 boxReferences: ["box1", {appId: 1234n, name: "box2"}]
 lease: 'lease',
 note: 'note',
 // You wouldn't normally set this field
 firstValidRound: 1000n,
 validityWindow: 10,
 extraFee: (1000).microAlgo(),
 staticFee: (1000).microAlgo(),
 // Max fee doesn't make sense with extraFee AND staticFee
 //  already specified, but here for completeness
 maxFee: (3000).microAlgo(),
 // Signer only needed if you want to provide one,
 //  generally you'd register it with AlgorandClient
 //  against the sender and not need to pass it in
 signer: transactionSigner,
 maxRoundsToWaitForConfirmation: 5,
 suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `onComplete?`: `OnApplicationComplete`  } & \{ `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `ClearStateOC` \| `DeleteApplicationOC`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the app call transaction |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:718](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L718)

___

### appCallMethodCall

• **appCallMethodCall**: (`params`: \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & \{ `args?`: (`undefined` \| `Transaction` \| `ABIValue` \| `TransactionWithSigner` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<[`AppMethodCallParams`](../modules/types_composer.md#appmethodcallparams)\>)[] ; `method`: `ABIMethod`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Call a smart contract via an ABI method.

Note: you may prefer to use `algorand.client` to get an app client for more advanced functionality.

**`Example`**

```typescript
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
await algorand.send.appCallMethodCall({ sender: 'CREATORADDRESS', method: method, args: ["arg1_value"] })
```

**`Example`**

```typescript
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
await algorand.send.appCallMethodCall({
 sender: 'CREATORADDRESS',
 method: method,
 args: ["arg1_value"],
 onComplete: algosdk.OnApplicationComplete.OptInOC,
 args: [new Uint8Array(1, 2, 3, 4)]
 accountReferences: ["ACCOUNT_1"]
 appReferences: [123n, 1234n]
 assetReferences: [12345n]
 boxReferences: ["box1", {appId: 1234n, name: "box2"}]
 lease: 'lease',
 note: 'note',
 // You wouldn't normally set this field
 firstValidRound: 1000n,
 validityWindow: 10,
 extraFee: (1000).microAlgo(),
 staticFee: (1000).microAlgo(),
 // Max fee doesn't make sense with extraFee AND staticFee
 //  already specified, but here for completeness
 maxFee: (3000).microAlgo(),
 // Signer only needed if you want to provide one,
 //  generally you'd register it with AlgorandClient
 //  against the sender and not need to pass it in
 signer: transactionSigner,
 maxRoundsToWaitForConfirmation: 5,
 suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & \{ `args?`: (`undefined` \| `Transaction` \| `ABIValue` \| `TransactionWithSigner` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<[`AppMethodCallParams`](../modules/types_composer.md#appmethodcallparams)\>)[] ; `method`: `ABIMethod`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the app call transaction |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:954](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L954)

___

### appCreate

• **appCreate**: (`params`: \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `appAddress`: `Address` ; `appId`: `bigint` ; `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Create a smart contract.

Note: you may prefer to use `algorand.client` to get an app client for more advanced functionality.

**`Example`**

```typescript
const result = await algorand.send.appCreate({ sender: 'CREATORADDRESS', approvalProgram: 'TEALCODE', clearStateProgram: 'TEALCODE' })
const createdAppId = result.appId
```

**`Example`**

```typescript
await algorand.send.appCreate({
 sender: 'CREATORADDRESS',
 approvalProgram: "TEALCODE",
 clearStateProgram: "TEALCODE",
 schema: {
   globalInts: 1,
   globalByteSlices: 2,
   localInts: 3,
   localByteSlices: 4
 },
 extraProgramPages: 1,
 onComplete: algosdk.OnApplicationComplete.OptInOC,
 args: [new Uint8Array(1, 2, 3, 4)]
 accountReferences: ["ACCOUNT_1"]
 appReferences: [123n, 1234n]
 assetReferences: [12345n]
 boxReferences: ["box1", {appId: 1234n, name: "box2"}]
 lease: 'lease',
 note: 'note',
 // You wouldn't normally set this field
 firstValidRound: 1000n,
 validityWindow: 10,
 extraFee: (1000).microAlgo(),
 staticFee: (1000).microAlgo(),
 // Max fee doesn't make sense with extraFee AND staticFee
 //  already specified, but here for completeness
 maxFee: (3000).microAlgo(),
 // Signer only needed if you want to provide one,
 //  generally you'd register it with AlgorandClient
 //  against the sender and not need to pass it in
 signer: transactionSigner,
 maxRoundsToWaitForConfirmation: 5,
 suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `appAddress`: `Address` ; `appId`: `bigint` ; `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the app creation transaction |

##### Returns

`Promise`\<\{ `appAddress`: `Address` ; `appId`: `bigint` ; `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:584](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L584)

___

### appCreateMethodCall

• **appCreateMethodCall**: (`params`: \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & \{ `args?`: (`undefined` \| `Transaction` \| `ABIValue` \| `TransactionWithSigner` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<[`AppMethodCallParams`](../modules/types_composer.md#appmethodcallparams)\>)[] ; `method`: `ABIMethod`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `appAddress`: `Address` ; `appId`: `bigint` ; `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Create a smart contract via an ABI method.

Note: you may prefer to use `algorand.client` to get an app client for more advanced functionality.

**`Example`**

```typescript
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
const result = await algorand.send.appCreateMethodCall({ sender: 'CREATORADDRESS', approvalProgram: 'TEALCODE', clearStateProgram: 'TEALCODE', method: method, args: ["arg1_value"] })
const createdAppId = result.appId
```

**`Example`**

```typescript
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
await algorand.send.appCreate({
 sender: 'CREATORADDRESS',
 method: method,
 args: ["arg1_value"],
 approvalProgram: "TEALCODE",
 clearStateProgram: "TEALCODE",
 schema: {
   globalInts: 1,
   globalByteSlices: 2,
   localInts: 3,
   localByteSlices: 4
 },
 extraProgramPages: 1,
 onComplete: algosdk.OnApplicationComplete.OptInOC,
 args: [new Uint8Array(1, 2, 3, 4)]
 accountReferences: ["ACCOUNT_1"]
 appReferences: [123n, 1234n]
 assetReferences: [12345n]
 boxReferences: ["box1", {appId: 1234n, name: "box2"}]
 lease: 'lease',
 note: 'note',
 // You wouldn't normally set this field
 firstValidRound: 1000n,
 validityWindow: 10,
 extraFee: (1000).microAlgo(),
 staticFee: (1000).microAlgo(),
 // Max fee doesn't make sense with extraFee AND staticFee
 //  already specified, but here for completeness
 maxFee: (3000).microAlgo(),
 // Signer only needed if you want to provide one,
 //  generally you'd register it with AlgorandClient
 //  against the sender and not need to pass it in
 signer: transactionSigner,
 maxRoundsToWaitForConfirmation: 5,
 suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `appAddress`: `Address` ; `appId`: `bigint` ; `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & \{ `args?`: (`undefined` \| `Transaction` \| `ABIValue` \| `TransactionWithSigner` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<[`AppMethodCallParams`](../modules/types_composer.md#appmethodcallparams)\>)[] ; `method`: `ABIMethod`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the app creation transaction |

##### Returns

`Promise`\<\{ `appAddress`: `Address` ; `appId`: `bigint` ; `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:784](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L784)

___

### appDelete

• **appDelete**: (`params`: [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `onComplete?`: `OnApplicationComplete`  } & \{ `onComplete?`: `DeleteApplicationOC`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Delete a smart contract.

Note: you may prefer to use `algorand.client` to get an app client for more advanced functionality.

**`Example`**

```typescript
await algorand.send.appDelete({ sender: 'CREATORADDRESS' })
```

**`Example`**

```typescript
await algorand.send.appDelete({
 sender: 'CREATORADDRESS',
 onComplete: algosdk.OnApplicationComplete.DeleteApplicationOC,
 args: [new Uint8Array(1, 2, 3, 4)]
 accountReferences: ["ACCOUNT_1"]
 appReferences: [123n, 1234n]
 assetReferences: [12345n]
 boxReferences: ["box1", {appId: 1234n, name: "box2"}]
 lease: 'lease',
 note: 'note',
 // You wouldn't normally set this field
 firstValidRound: 1000n,
 validityWindow: 10,
 extraFee: (1000).microAlgo(),
 staticFee: (1000).microAlgo(),
 // Max fee doesn't make sense with extraFee AND staticFee
 //  already specified, but here for completeness
 maxFee: (3000).microAlgo(),
 // Signer only needed if you want to provide one,
 //  generally you'd register it with AlgorandClient
 //  against the sender and not need to pass it in
 signer: transactionSigner,
 maxRoundsToWaitForConfirmation: 5,
 suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `onComplete?`: `OnApplicationComplete`  } & \{ `onComplete?`: `DeleteApplicationOC`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the app deletion transaction |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:674](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L674)

___

### appDeleteMethodCall

• **appDeleteMethodCall**: (`params`: \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & \{ `args?`: (`undefined` \| `Transaction` \| `ABIValue` \| `TransactionWithSigner` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<[`AppMethodCallParams`](../modules/types_composer.md#appmethodcallparams)\>)[] ; `method`: `ABIMethod`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Delete a smart contract via an ABI method.

Note: you may prefer to use `algorand.client` to get an app client for more advanced functionality.

**`Example`**

```typescript
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
await algorand.send.appDeleteMethodCall({ sender: 'CREATORADDRESS', method: method, args: ["arg1_value"] })
```

**`Example`**

```typescript
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
await algorand.send.appDeleteMethodCall({
 sender: 'CREATORADDRESS',
 method: method,
 args: ["arg1_value"],
 onComplete: algosdk.OnApplicationComplete.DeleteApplicationOC,
 args: [new Uint8Array(1, 2, 3, 4)]
 accountReferences: ["ACCOUNT_1"]
 appReferences: [123n, 1234n]
 assetReferences: [12345n]
 boxReferences: ["box1", {appId: 1234n, name: "box2"}]
 lease: 'lease',
 note: 'note',
 // You wouldn't normally set this field
 firstValidRound: 1000n,
 validityWindow: 10,
 extraFee: (1000).microAlgo(),
 staticFee: (1000).microAlgo(),
 // Max fee doesn't make sense with extraFee AND staticFee
 //  already specified, but here for completeness
 maxFee: (3000).microAlgo(),
 // Signer only needed if you want to provide one,
 //  generally you'd register it with AlgorandClient
 //  against the sender and not need to pass it in
 signer: transactionSigner,
 maxRoundsToWaitForConfirmation: 5,
 suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & \{ `args?`: (`undefined` \| `Transaction` \| `ABIValue` \| `TransactionWithSigner` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<[`AppMethodCallParams`](../modules/types_composer.md#appmethodcallparams)\>)[] ; `method`: `ABIMethod`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the app deletion transaction |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:898](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L898)

___

### appUpdate

• **appUpdate**: (`params`: \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Update a smart contract.

Note: you may prefer to use `algorand.client` to get an app client for more advanced functionality.

**`Example`**

```typescript
await algorand.send.appUpdate({ sender: 'CREATORADDRESS', approvalProgram: 'TEALCODE', clearStateProgram: 'TEALCODE' })
```

**`Example`**

```typescript
await algorand.send.appUpdate({
 sender: 'CREATORADDRESS',
 approvalProgram: "TEALCODE",
 clearStateProgram: "TEALCODE",
 onComplete: algosdk.OnApplicationComplete.UpdateApplicationOC,
 args: [new Uint8Array(1, 2, 3, 4)]
 accountReferences: ["ACCOUNT_1"]
 appReferences: [123n, 1234n]
 assetReferences: [12345n]
 boxReferences: ["box1", {appId: 1234n, name: "box2"}]
 lease: 'lease',
 note: 'note',
 // You wouldn't normally set this field
 firstValidRound: 1000n,
 validityWindow: 10,
 extraFee: (1000).microAlgo(),
 staticFee: (1000).microAlgo(),
 // Max fee doesn't make sense with extraFee AND staticFee
 //  already specified, but here for completeness
 maxFee: (3000).microAlgo(),
 // Signer only needed if you want to provide one,
 //  generally you'd register it with AlgorandClient
 //  against the sender and not need to pass it in
 signer: transactionSigner,
 maxRoundsToWaitForConfirmation: 5,
 suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the app update transaction |

##### Returns

`Promise`\<\{ `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:630](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L630)

___

### appUpdateMethodCall

• **appUpdateMethodCall**: (`params`: \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & \{ `args?`: (`undefined` \| `Transaction` \| `ABIValue` \| `TransactionWithSigner` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<[`AppMethodCallParams`](../modules/types_composer.md#appmethodcallparams)\>)[] ; `method`: `ABIMethod`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Update a smart contract via an ABI method.

Note: you may prefer to use `algorand.client` to get an app client for more advanced functionality.

**`Example`**

```typescript
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
await algorand.send.appUpdateMethodCall({ sender: 'CREATORADDRESS', approvalProgram: 'TEALCODE', clearStateProgram: 'TEALCODE', method: method, args: ["arg1_value"] })
```

**`Example`**

```typescript
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
await algorand.send.appUpdateMethodCall({
 sender: 'CREATORADDRESS',
 method: method,
 args: ["arg1_value"],
 approvalProgram: "TEALCODE",
 clearStateProgram: "TEALCODE",
 onComplete: algosdk.OnApplicationComplete.UpdateApplicationOC,
 args: [new Uint8Array(1, 2, 3, 4)]
 accountReferences: ["ACCOUNT_1"]
 appReferences: [123n, 1234n]
 assetReferences: [12345n]
 boxReferences: ["box1", {appId: 1234n, name: "box2"}]
 lease: 'lease',
 note: 'note',
 // You wouldn't normally set this field
 firstValidRound: 1000n,
 validityWindow: 10,
 extraFee: (1000).microAlgo(),
 staticFee: (1000).microAlgo(),
 // Max fee doesn't make sense with extraFee AND staticFee
 //  already specified, but here for completeness
 maxFee: (3000).microAlgo(),
 // Signer only needed if you want to provide one,
 //  generally you'd register it with AlgorandClient
 //  against the sender and not need to pass it in
 signer: transactionSigner,
 maxRoundsToWaitForConfirmation: 5,
 suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } & \{ `args?`: (`undefined` \| `Transaction` \| `ABIValue` \| `TransactionWithSigner` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<\{ `accountReferences?`: (... \| ...)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: BoxIdentifier \| BoxReference[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  }\> \| [`AppMethodCall`](../modules/types_composer.md#appmethodcall)\<[`AppMethodCallParams`](../modules/types_composer.md#appmethodcallparams)\>)[] ; `method`: `ABIMethod`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the app update transaction |

##### Returns

`Promise`\<\{ `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:842](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L842)

___

### assetConfig

• **assetConfig**: (`params`: [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `assetId`: `bigint` ; `clawback?`: `string` \| `Address` ; `freeze?`: `string` \| `Address` ; `manager`: `undefined` \| `string` \| `Address` ; `reserve?`: `string` \| `Address`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Configure an existing Algorand Standard Asset.

**Note:** The manager, reserve, freeze, and clawback addresses
are immutably empty if they are not set. If manager is not set then
all fields are immutable from that point forward.

**`Example`**

```typescript
await algorand.send.assetConfig({sender: "MANAGERADDRESS", assetId: 123456n, manager: "MANAGERADDRESS" })
```

**`Example`**

```typescript
await algorand.send.assetConfig({
  sender: 'MANAGERADDRESS',
  assetId: 123456n,
  manager: 'MANAGERADDRESS',
  reserve: 'RESERVEADDRESS',
  freeze: 'FREEZEADDRESS',
  clawback: 'CLAWBACKADDRESS',
  lease: 'lease',
  note: 'note',
  // You wouldn't normally set this field
  firstValidRound: 1000n,
  validityWindow: 10,
  extraFee: (1000).microAlgo(),
  staticFee: (1000).microAlgo(),
  // Max fee doesn't make sense with extraFee AND staticFee
  //  already specified, but here for completeness
  maxFee: (3000).microAlgo(),
  // Signer only needed if you want to provide one,
  //  generally you'd register it with AlgorandClient
  //  against the sender and not need to pass it in
  signer: transactionSigner,
  maxRoundsToWaitForConfirmation: 5,
  suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `assetId`: `bigint` ; `clawback?`: `string` \| `Address` ; `freeze?`: `string` \| `Address` ; `manager`: `undefined` \| `string` \| `Address` ; `reserve?`: `string` \| `Address`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the asset config transaction |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:295](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L295)

___

### assetDestroy

• **assetDestroy**: (`params`: [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `assetId`: `bigint`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Destroys an Algorand Standard Asset.

Created assets can be destroyed only by the asset manager account.
All of the assets must be owned by the creator of the asset before
the asset can be deleted.

**`Example`**

```typescript
await algorand.send.assetDestroy({sender: "MANAGERADDRESS", assetId: 123456n })
```

**`Example`**

```typescript
await algorand.send.assetDestroy({
  sender: 'MANAGERADDRESS',
  assetId: 123456n,
  lease: 'lease',
  note: 'note',
  // You wouldn't normally set this field
  firstValidRound: 1000n,
  validityWindow: 10,
  extraFee: (1000).microAlgo(),
  staticFee: (1000).microAlgo(),
  // Max fee doesn't make sense with extraFee AND staticFee
  //  already specified, but here for completeness
  maxFee: (3000).microAlgo(),
  // Signer only needed if you want to provide one,
  //  generally you'd register it with AlgorandClient
  //  against the sender and not need to pass it in
  signer: transactionSigner,
  maxRoundsToWaitForConfirmation: 5,
  suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `assetId`: `bigint`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the asset destroy transaction |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:375](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L375)

___

### assetFreeze

• **assetFreeze**: (`params`: [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `account`: `string` \| `Address` ; `assetId`: `bigint` ; `frozen`: `boolean`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Freeze or unfreeze an Algorand Standard Asset for an account.

**`Example`**

```typescript
await algorand.send.assetFreeze({sender: "MANAGERADDRESS", assetId: 123456n, account: "ACCOUNTADDRESS", frozen: true })
```

**`Example`**

```typescript
await algorand.send.assetFreeze({
  sender: 'MANAGERADDRESS',
  assetId: 123456n,
  account: 'ACCOUNTADDRESS',
  frozen: true,
  lease: 'lease',
  note: 'note',
  // You wouldn't normally set this field
  firstValidRound: 1000n,
  validityWindow: 10,
  extraFee: (1000).microAlgo(),
  staticFee: (1000).microAlgo(),
  // Max fee doesn't make sense with extraFee AND staticFee
  //  already specified, but here for completeness
  maxFee: (3000).microAlgo(),
  // Signer only needed if you want to provide one,
  //  generally you'd register it with AlgorandClient
  //  against the sender and not need to pass it in
  signer: transactionSigner,
  maxRoundsToWaitForConfirmation: 5,
  suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `account`: `string` \| `Address` ; `assetId`: `bigint` ; `frozen`: `boolean`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the asset freeze transaction |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:334](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L334)

___

### assetOptIn

• **assetOptIn**: (`params`: [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `assetId`: `bigint`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Opt an account into an Algorand Standard Asset.

**`Example`**

```typescript
await algorand.send.assetOptIn({sender: "SENDERADDRESS", assetId: 123456n })
```

**`Example`**

```typescript
await algorand.send.assetOptIn({
  sender: 'SENDERADDRESS',
  assetId: 123456n,
  lease: 'lease',
  note: 'note',
  // You wouldn't normally set this field
  firstValidRound: 1000n,
  validityWindow: 10,
  extraFee: (1000).microAlgo(),
  staticFee: (1000).microAlgo(),
  // Max fee doesn't make sense with extraFee AND staticFee
  //  already specified, but here for completeness
  maxFee: (3000).microAlgo(),
  // Signer only needed if you want to provide one,
  //  generally you'd register it with AlgorandClient
  //  against the sender and not need to pass it in
  signer: transactionSigner,
  maxRoundsToWaitForConfirmation: 5,
  suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `assetId`: `bigint`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the asset opt-in transaction |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:455](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L455)

___

### assetTransfer

• **assetTransfer**: (`params`: [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `amount`: `bigint` ; `assetId`: `bigint` ; `clawbackTarget?`: `string` \| `Address` ; `closeAssetTo?`: `string` \| `Address` ; `receiver`: `string` \| `Address`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Transfer an Algorand Standard Asset.

**`Example`**

```typescript
await algorand.send.assetTransfer({sender: "HOLDERADDRESS", assetId: 123456n, amount: 1n, receiver: "RECEIVERADDRESS" })
```

**`Example`**

```typescript
await algorand.send.assetTransfer({
  sender: 'CLAWBACKADDRESS',
  assetId: 123456n,
  amount: 1n,
  receiver: 'RECEIVERADDRESS',
  clawbackTarget: 'HOLDERADDRESS',
  // This field needs to be used with caution
  closeAssetTo: 'ADDRESSTOCLOSETO'
  lease: 'lease',
  note: 'note',
  // You wouldn't normally set this field
  firstValidRound: 1000n,
  validityWindow: 10,
  extraFee: (1000).microAlgo(),
  staticFee: (1000).microAlgo(),
  // Max fee doesn't make sense with extraFee AND staticFee
  //  already specified, but here for completeness
  maxFee: (3000).microAlgo(),
  // Signer only needed if you want to provide one,
  //  generally you'd register it with AlgorandClient
  //  against the sender and not need to pass it in
  signer: transactionSigner,
  maxRoundsToWaitForConfirmation: 5,
  suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `amount`: `bigint` ; `assetId`: `bigint` ; `clawbackTarget?`: `string` \| `Address` ; `closeAssetTo?`: `string` \| `Address` ; `receiver`: `string` \| `Address`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the asset transfer transaction |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:417](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L417)

___

### offlineKeyRegistration

• **offlineKeyRegistration**: (`params`: [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `preventAccountFromEverParticipatingAgain?`: `boolean`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Register an offline key.

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `preventAccountFromEverParticipatingAgain?`: `boolean`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:965](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L965)

___

### onlineKeyRegistration

• **onlineKeyRegistration**: (`params`: [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `selectionKey`: `Uint8Array` ; `stateProofKey?`: `Uint8Array` ; `voteFirst`: `bigint` ; `voteKey`: `Uint8Array` ; `voteKeyDilution`: `bigint` ; `voteLast`: `bigint`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Register an online key.

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `selectionKey`: `Uint8Array` ; `stateProofKey?`: `Uint8Array` ; `voteFirst`: `bigint` ; `voteKey`: `Uint8Array` ; `voteKeyDilution`: `bigint` ; `voteLast`: `bigint`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:960](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L960)

___

### payment

• **payment**: (`params`: [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `amount`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `closeRemainderTo?`: `string` \| `Address` ; `receiver`: `string` \| `Address`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Send a payment transaction to transfer Algo between accounts.

**`Example`**

```typescript
const result = await algorand.send.payment({
 sender: 'SENDERADDRESS',
 receiver: 'RECEIVERADDRESS',
 amount: (4).algo(),
})
```

**`Example`**

```typescript
const result = await algorand.send.payment({
  amount: (4).algo(),
  receiver: 'RECEIVERADDRESS',
  sender: 'SENDERADDRESS',
  closeRemainderTo: 'CLOSEREMAINDERTOADDRESS',
  lease: 'lease',
  note: 'note',
  // Use this with caution, it's generally better to use algorand.account.rekeyAccount
  rekeyTo: 'REKEYTOADDRESS',
  // You wouldn't normally set this field
  firstValidRound: 1000n,
  validityWindow: 10,
  extraFee: (1000).microAlgo(),
  staticFee: (1000).microAlgo(),
  // Max fee doesn't make sense with extraFee AND staticFee
  //  already specified, but here for completeness
  maxFee: (3000).microAlgo(),
  // Signer only needed if you want to provide one,
  //  generally you'd register it with AlgorandClient
  //  against the sender and not need to pass it in
  signer: transactionSigner,
  maxRoundsToWaitForConfirmation: 5,
  suppressLog: true,
})
```

#### Type declaration

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `amount`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `closeRemainderTo?`: `string` \| `Address` ; `receiver`: `string` \| `Address`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the payment transaction |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:195](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L195)

## Methods

### \_send

▸ **_send**\<`T`\>(`c`, `log?`): (`params`: `T` & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | (`c`: [`TransactionComposer`](types_composer.TransactionComposer.md)) => (`params`: `T`) => [`TransactionComposer`](types_composer.TransactionComposer.md) |
| `log?` | `Object` |
| `log.postLog?` | (`params`: `T`, `result`: \{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }) => `string` |
| `log.preLog?` | (`params`: `T`, `transaction`: `Transaction`) => `string` |

#### Returns

`fn`

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` & [`SendParams`](../interfaces/types_transaction.SendParams.md) |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:58](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L58)

___

### \_sendAppCall

▸ **_sendAppCall**\<`T`\>(`c`, `log?`): (`params`: `T` & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } \| \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } \| [`AppCallParams`](../modules/types_composer.md#appcallparams) \| [`AppDeleteParams`](../modules/types_composer.md#appdeleteparams) \| [`AppCreateMethodCall`](../modules/types_composer.md#appcreatemethodcall) \| [`AppUpdateMethodCall`](../modules/types_composer.md#appupdatemethodcall) \| [`AppDeleteMethodCall`](../modules/types_composer.md#appdeletemethodcall) \| [`AppCallMethodCall`](../modules/types_composer.md#appcallmethodcall) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | (`c`: [`TransactionComposer`](types_composer.TransactionComposer.md)) => (`params`: `T`) => [`TransactionComposer`](types_composer.TransactionComposer.md) |
| `log?` | `Object` |
| `log.postLog?` | (`params`: `T`, `result`: \{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }) => `string` |
| `log.preLog?` | (`params`: `T`, `transaction`: `Transaction`) => `string` |

#### Returns

`fn`

▸ (`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` & [`SendParams`](../interfaces/types_transaction.SendParams.md) |

##### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:93](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L93)

___

### \_sendAppCreateCall

▸ **_sendAppCreateCall**\<`T`\>(`c`, `log?`): (`params`: `T` & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `appAddress`: `Address` ; `appId`: `bigint` ; `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } \| [`AppCreateMethodCall`](../modules/types_composer.md#appcreatemethodcall) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | (`c`: [`TransactionComposer`](types_composer.TransactionComposer.md)) => (`params`: `T`) => [`TransactionComposer`](types_composer.TransactionComposer.md) |
| `log?` | `Object` |
| `log.postLog?` | (`params`: `T`, `result`: \{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }) => `string` |
| `log.preLog?` | (`params`: `T`, `transaction`: `Transaction`) => `string` |

#### Returns

`fn`

▸ (`params`): `Promise`\<\{ `appAddress`: `Address` ; `appId`: `bigint` ; `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` & [`SendParams`](../interfaces/types_transaction.SendParams.md) |

##### Returns

`Promise`\<\{ `appAddress`: `Address` ; `appId`: `bigint` ; `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:136](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L136)

___

### \_sendAppUpdateCall

▸ **_sendAppUpdateCall**\<`T`\>(`c`, `log?`): (`params`: `T` & [`SendParams`](../interfaces/types_transaction.SendParams.md)) => `Promise`\<\{ `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends \{ `accountReferences?`: (`string` \| `Address`)[] ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `extraProgramPages?`: `number` ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `NoOpOC` \| `OptInOC` \| `CloseOutOC` \| `UpdateApplicationOC` \| `DeleteApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  } ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } \| \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `approvalProgram`: `string` \| `Uint8Array` ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier) \| [`BoxReference`](../interfaces/types_app_manager.BoxReference.md))[] ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `firstValidRound?`: `bigint` ; `lastValidRound?`: `bigint` ; `lease?`: `string` \| `Uint8Array` ; `maxFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `note?`: `string` \| `Uint8Array` ; `onComplete?`: `UpdateApplicationOC` ; `rekeyTo?`: `string` \| `Address` ; `sender`: `string` \| `Address` ; `signer?`: `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) ; `staticFee?`: [`AlgoAmount`](types_amount.AlgoAmount.md) ; `validityWindow?`: `number` \| `bigint`  } \| [`AppCreateMethodCall`](../modules/types_composer.md#appcreatemethodcall) \| [`AppUpdateMethodCall`](../modules/types_composer.md#appupdatemethodcall) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | (`c`: [`TransactionComposer`](types_composer.TransactionComposer.md)) => (`params`: `T`) => [`TransactionComposer`](types_composer.TransactionComposer.md) |
| `log?` | `Object` |
| `log.postLog?` | (`params`: `T`, `result`: \{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }) => `string` |
| `log.preLog?` | (`params`: `T`, `transaction`: `Transaction`) => `string` |

#### Returns

`fn`

▸ (`params`): `Promise`\<\{ `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `T` & [`SendParams`](../interfaces/types_transaction.SendParams.md) |

##### Returns

`Promise`\<\{ `compiledApproval?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `compiledClear?`: [`CompiledTeal`](../interfaces/types_app.CompiledTeal.md) ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `return?`: [`ABIReturn`](../modules/types_app.md#abireturn) ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

#### Defined in

[src/types/algorand-client-transaction-sender.ts:117](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L117)

___

### assetCreate

▸ **assetCreate**(`params`): `Promise`\<\{ `assetId`: `bigint` ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Create a new Algorand Standard Asset.

The account that sends this transaction will automatically be
opted in to the asset and will hold all units after creation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | [`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams) & \{ `assetName?`: `string` ; `clawback?`: `string` \| `Address` ; `decimals?`: `number` ; `defaultFrozen?`: `boolean` ; `freeze?`: `string` \| `Address` ; `manager?`: `string` \| `Address` ; `metadataHash?`: `string` \| `Uint8Array` ; `reserve?`: `string` \| `Address` ; `total`: `bigint` ; `unitName?`: `string` ; `url?`: `string`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the asset creation transaction |

#### Returns

`Promise`\<\{ `assetId`: `bigint` ; `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

The result of the transaction and the transaction that was sent

**`Example`**

```typescript
await algorand.send.assetCreate({sender: "CREATORADDRESS", total: 100n})
```

**`Example`**

```typescript
await algorand.send.assetCreate({
  sender: 'CREATORADDRESS',
  total: 100n,
  decimals: 2,
  assetName: 'asset',
  unitName: 'unit',
  url: 'url',
  metadataHash: 'metadataHash',
  defaultFrozen: false,
  manager: 'MANAGERADDRESS',
  reserve: 'RESERVEADDRESS',
  freeze: 'FREEZEADDRESS',
  clawback: 'CLAWBACKADDRESS',
  lease: 'lease',
  note: 'note',
  // You wouldn't normally set this field
  firstValidRound: 1000n,
  validityWindow: 10,
  extraFee: (1000).microAlgo(),
  staticFee: (1000).microAlgo(),
  // Max fee doesn't make sense with extraFee AND staticFee
  //  already specified, but here for completeness
  maxFee: (3000).microAlgo(),
  // Signer only needed if you want to provide one,
  //  generally you'd register it with AlgorandClient
  //  against the sender and not need to pass it in
  signer: transactionSigner,
  maxRoundsToWaitForConfirmation: 5,
  suppressLog: true,
})
```

#### Defined in

[src/types/algorand-client-transaction-sender.ts:246](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L246)

___

### assetOptOut

▸ **assetOptOut**(`params`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Opt an account out of an Algorand Standard Asset.

*Note:* If the account has a balance of the asset,
it will not be able to opt-out unless `ensureZeroBalance`
is set to `false` (but then the account will lose the assets).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Omit`\<[`AssetOptOutParams`](../modules/types_composer.md#assetoptoutparams), ``"creator"``\> & \{ `creator?`: `string` \| `Address` ; `ensureZeroBalance`: `boolean`  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) | The parameters for the asset opt-out transaction |

#### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

The result of the transaction and the transaction that was sent

**`Example`**

```typescript
await algorand.send.assetOptOut({sender: "SENDERADDRESS", assetId: 123456n, ensureZeroBalance: true })
```

**`Example`**

```typescript
await algorand.send.assetOptOut({sender: "SENDERADDRESS", creator: "CREATORADDRESS", assetId: 123456n, ensureZeroBalance: true })
```

**`Example`**

```typescript
await algorand.send.assetOptOut({
  sender: 'SENDERADDRESS',
  assetId: 123456n,
  creator: 'CREATORADDRESS',
  ensureZeroBalance: true,
  lease: 'lease',
  note: 'note',
  // You wouldn't normally set this field
  firstValidRound: 1000n,
  validityWindow: 10,
  extraFee: (1000).microAlgo(),
  staticFee: (1000).microAlgo(),
  // Max fee doesn't make sense with extraFee AND staticFee
  //  already specified, but here for completeness
  maxFee: (3000).microAlgo(),
  // Signer only needed if you want to provide one,
  //  generally you'd register it with AlgorandClient
  //  against the sender and not need to pass it in
  signer: transactionSigner,
  maxRoundsToWaitForConfirmation: 5,
  suppressLog: true,
})
```

#### Defined in

[src/types/algorand-client-transaction-sender.ts:502](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L502)

___

### newGroup

▸ **newGroup**(): [`TransactionComposer`](types_composer.TransactionComposer.md)

#### Returns

[`TransactionComposer`](types_composer.TransactionComposer.md)

#### Defined in

[src/types/algorand-client-transaction-sender.ts:54](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/algorand-client-transaction-sender.ts#L54)
