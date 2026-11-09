[algosdk](../README.md) / [Exports](../modules.md) / AtomicTransactionComposer

# Class: AtomicTransactionComposer

A class used to construct and execute atomic transaction groups

## Table of contents

### Constructors

- [constructor](AtomicTransactionComposer.md#constructor)

### Properties

- [methodCalls](AtomicTransactionComposer.md#methodcalls)
- [signedTxns](AtomicTransactionComposer.md#signedtxns)
- [status](AtomicTransactionComposer.md#status)
- [transactions](AtomicTransactionComposer.md#transactions)
- [txIDs](AtomicTransactionComposer.md#txids)
- [MAX\_GROUP\_SIZE](AtomicTransactionComposer.md#max_group_size)

### Methods

- [addMethodCall](AtomicTransactionComposer.md#addmethodcall)
- [addTransaction](AtomicTransactionComposer.md#addtransaction)
- [buildGroup](AtomicTransactionComposer.md#buildgroup)
- [clone](AtomicTransactionComposer.md#clone)
- [count](AtomicTransactionComposer.md#count)
- [execute](AtomicTransactionComposer.md#execute)
- [gatherSignatures](AtomicTransactionComposer.md#gathersignatures)
- [getStatus](AtomicTransactionComposer.md#getstatus)
- [simulate](AtomicTransactionComposer.md#simulate)
- [submit](AtomicTransactionComposer.md#submit)
- [parseMethodResponse](AtomicTransactionComposer.md#parsemethodresponse)

## Constructors

### constructor

• **new AtomicTransactionComposer**()

## Properties

### methodCalls

• `Private` **methodCalls**: `Map`\<`number`, [`ABIMethod`](ABIMethod.md)\>

#### Defined in

composer.ts:127

___

### signedTxns

• `Private` **signedTxns**: `Uint8Array`[] = `[]`

#### Defined in

composer.ts:128

___

### status

• `Private` **status**: [`AtomicTransactionComposerStatus`](../enums/AtomicTransactionComposerStatus.md) = `AtomicTransactionComposerStatus.BUILDING`

#### Defined in

composer.ts:125

___

### transactions

• `Private` **transactions**: [`TransactionWithSigner`](../interfaces/TransactionWithSigner.md)[] = `[]`

#### Defined in

composer.ts:126

___

### txIDs

• `Private` **txIDs**: `string`[] = `[]`

#### Defined in

composer.ts:129

___

### MAX\_GROUP\_SIZE

▪ `Static` **MAX\_GROUP\_SIZE**: `number` = `16`

The maximum size of an atomic transaction group.

#### Defined in

composer.ts:123

## Methods

### addMethodCall

▸ **addMethodCall**(`«destructured»`): `void`

Add a smart contract method call to this atomic group.

An error will be thrown if the composer's status is not BUILDING, if adding this transaction
causes the current group to exceed MAX_GROUP_SIZE, or if the provided arguments are invalid
for the given method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `«destructured»` | `Object` | - |
| › `appAccounts?` | `string`[] | Array of Address strings that represent external accounts supplied to this application. If accounts are provided here, the accounts specified in the method args will appear after these. |
| › `appForeignApps?` | `number`[] | Array of App ID numbers that represent external apps supplied to this application. If apps are provided here, the apps specified in the method args will appear after these. |
| › `appForeignAssets?` | `number`[] | Array of Asset ID numbers that represent external assets supplied to this application. If assets are provided here, the assets specified in the method args will appear after these. |
| › `appID` | `number` | The ID of the smart contract to call. Set this to 0 to indicate an application creation call. |
| › `approvalProgram?` | `Uint8Array` | The approval program for this application call. Only set this if this is an application creation call, or if onComplete is OnApplicationComplete.UpdateApplicationOC |
| › `boxes?` | [`BoxReference`](../interfaces/BoxReference.md)[] | The box references for this application call |
| › `clearProgram?` | `Uint8Array` | The clear program for this application call. Only set this if this is an application creation call, or if onComplete is OnApplicationComplete.UpdateApplicationOC |
| › `extraPages?` | `number` | The number of extra pages to allocate for the application's programs. Only set this if this is an application creation call. If omitted, defaults to 0. |
| › `lease?` | `Uint8Array` | The lease value for this application call |
| › `method` | [`ABIMethod`](ABIMethod.md) | The method to call on the smart contract |
| › `methodArgs?` | [`ABIArgument`](../modules.md#abiargument)[] | The arguments to include in the method call. If omitted, no arguments will be passed to the method. |
| › `note?` | `Uint8Array` | The note value for this application call |
| › `numGlobalByteSlices?` | `number` | The global byte slice schema size. Only set this if this is an application creation call. |
| › `numGlobalInts?` | `number` | The global integer schema size. Only set this if this is an application creation call. |
| › `numLocalByteSlices?` | `number` | The local byte slice schema size. Only set this if this is an application creation call. |
| › `numLocalInts?` | `number` | The local integer schema size. Only set this if this is an application creation call. |
| › `onComplete?` | [`OnApplicationComplete`](../enums/OnApplicationComplete.md) | The OnComplete action to take for this application call. If omitted, OnApplicationComplete.NoOpOC will be used. |
| › `rekeyTo?` | `string` | If provided, the address that the sender will be rekeyed to at the conclusion of this application call |
| › `sender` | `string` | The address of the sender of this application call |
| › `signer` | [`TransactionSigner`](../modules.md#transactionsigner) | A transaction signer that can authorize this application call from sender |
| › `suggestedParams` | [`SuggestedParams`](../interfaces/SuggestedParams.md) | Transactions params to use for this application call |

#### Returns

`void`

#### Defined in

composer.ts:199

___

### addTransaction

▸ **addTransaction**(`txnAndSigner`): `void`

Add a transaction to this atomic group.

An error will be thrown if the transaction has a nonzero group ID, the composer's status is
not BUILDING, or if adding this transaction causes the current group to exceed MAX_GROUP_SIZE.

#### Parameters

| Name | Type |
| :------ | :------ |
| `txnAndSigner` | [`TransactionWithSigner`](../interfaces/TransactionWithSigner.md) |

#### Returns

`void`

#### Defined in

composer.ts:172

___

### buildGroup

▸ **buildGroup**(): [`TransactionWithSigner`](../interfaces/TransactionWithSigner.md)[]

Finalize the transaction group and returned the finalized transactions.

The composer's status will be at least BUILT after executing this method.

#### Returns

[`TransactionWithSigner`](../interfaces/TransactionWithSigner.md)[]

#### Defined in

composer.ts:493

___

### clone

▸ **clone**(): [`AtomicTransactionComposer`](AtomicTransactionComposer.md)

Create a new composer with the same underlying transactions. The new composer's status will be
BUILDING, so additional transactions may be added to it.

#### Returns

[`AtomicTransactionComposer`](AtomicTransactionComposer.md)

#### Defined in

composer.ts:149

___

### count

▸ **count**(): `number`

Get the number of transactions currently in this atomic group.

#### Returns

`number`

#### Defined in

composer.ts:141

___

### execute

▸ **execute**(`client`, `waitRounds`): `Promise`\<\{ `confirmedRound`: `number` ; `methodResults`: [`ABIResult`](../interfaces/ABIResult.md)[] ; `txIDs`: `string`[]  }\>

Send the transaction group to the network and wait until it's committed to a block. An error
will be thrown if submission or execution fails.

The composer's status must be SUBMITTED or lower before calling this method, since execution is
only allowed once. If submission is successful, this composer's status will update to SUBMITTED.
If the execution is also successful, this composer's status will update to COMMITTED.

Note: a group can only be submitted again if it fails.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Algodv2`](Algodv2.md) | An Algodv2 client |
| `waitRounds` | `number` | The maximum number of rounds to wait for transaction confirmation |

#### Returns

`Promise`\<\{ `confirmedRound`: `number` ; `methodResults`: [`ABIResult`](../interfaces/ABIResult.md)[] ; `txIDs`: `string`[]  }\>

A promise that, upon success, resolves to an object containing the confirmed round for
  this transaction, the txIDs of the submitted transactions, and an array of results containing
  one element for each method call transaction in this group.

#### Defined in

composer.ts:699

___

### gatherSignatures

▸ **gatherSignatures**(): `Promise`\<`Uint8Array`[]\>

Obtain signatures for each transaction in this group. If signatures have already been obtained,
this method will return cached versions of the signatures.

The composer's status will be at least SIGNED after executing this method.

An error will be thrown if signing any of the transactions fails.

#### Returns

`Promise`\<`Uint8Array`[]\>

A promise that resolves to an array of signed transactions.

#### Defined in

composer.ts:518

___

### getStatus

▸ **getStatus**(): [`AtomicTransactionComposerStatus`](../enums/AtomicTransactionComposerStatus.md)

Get the status of this composer's transaction group.

#### Returns

[`AtomicTransactionComposerStatus`](../enums/AtomicTransactionComposerStatus.md)

#### Defined in

composer.ts:134

___

### simulate

▸ **simulate**(`client`, `request?`): `Promise`\<\{ `methodResults`: [`ABIResult`](../interfaces/ABIResult.md)[] ; `simulateResponse`: [`SimulateResponse`](modelsv2.SimulateResponse.md)  }\>

Simulates the transaction group in the network.

The composer will try to sign any transactions in the group, then simulate
the results.
Simulating the group will not change the composer's status.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Algodv2`](Algodv2.md) | An Algodv2 client |
| `request?` | [`SimulateRequest`](modelsv2.SimulateRequest.md) | SimulateRequest with options in simulation. If provided, the request's transaction group will be overrwritten by the composer's group, only simulation related options will be used. |

#### Returns

`Promise`\<\{ `methodResults`: [`ABIResult`](../interfaces/ABIResult.md)[] ; `simulateResponse`: [`SimulateResponse`](modelsv2.SimulateResponse.md)  }\>

A promise that, upon success, resolves to an object containing an
  array of results containing one element for each method call transaction
  in this group (ABIResult[]) and the SimulateResponse object.

#### Defined in

composer.ts:626

___

### submit

▸ **submit**(`client`): `Promise`\<`string`[]\>

Send the transaction group to the network, but don't wait for it to be committed to a block. An
error will be thrown if submission fails.

The composer's status must be SUBMITTED or lower before calling this method. If submission is
successful, this composer's status will update to SUBMITTED.

Note: a group can only be submitted again if it fails.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Algodv2`](Algodv2.md) | An Algodv2 client |

#### Returns

`Promise`\<`string`[]\>

A promise that, upon success, resolves to a list of TxIDs of the submitted transactions.

#### Defined in

composer.ts:596

___

### parseMethodResponse

▸ `Static` **parseMethodResponse**(`method`, `methodResult`, `pendingInfo`): [`ABIResult`](../interfaces/ABIResult.md)

Parses a single ABI Method transaction log into a ABI result object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `method` | [`ABIMethod`](ABIMethod.md) |
| `methodResult` | [`ABIResult`](../interfaces/ABIResult.md) |
| `pendingInfo` | `Record`\<`string`, `any`\> |

#### Returns

[`ABIResult`](../interfaces/ABIResult.md)

An ABIResult object

#### Defined in

composer.ts:775
