# App management

App management is a higher-order use case capability provided by AlgoKit Utils that builds on top of the core capabilities. It allows you to create, update, delete, call (ABI and otherwise) smart contract apps and the metadata associated with them (including state and boxes).

## `AppManager`

The [`AppManager`](../code/classes/types_app_manager.AppManager.md) is a class that is used to manage app information.

To get an instance of `AppManager` you can use either [`AlgorandClient`](./algorand-client.md) via `algorand.app` or instantiate it directly (passing in an algod client instance):

```typescript
import { AppManager } from '@algorandfoundation/algokit-utils/types/app-manager'

const appManager = new AppManager(algod)
```

## Calling apps

### App Clients

The recommended way of interacting with apps is via [Typed app clients](./typed-app-clients.md) or if you can't use a typed app client then an [untyped app client](./app-client.md). The methods shown on this page are the underlying mechanisms that app clients use and are for advanced use cases when you want more control.

### Calling an app

When calling an app there are two types of transactions:

- Raw app transactions - Constructing a raw Algorand transaction to call the method; you have full control and are dealing with binary values directly
- ABI method calls - Constructing a call to an [ABI method](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/ABI)

Calling an app involves providing some [common parameters](#common-app-parameters) and some parameters that will depend on the type of app call (create vs update vs other) per below sections.

When [sending transactions directly via AlgorandClient](./algorand-client.md#sending-a-single-transaction) the `SingleSendTransactionResult` return value is expanded with extra fields depending on the type of app call:

- All app calls extend [`SendAppTransactionResult`](../code/modules/types_transaction.md#sendapptransactionresult), which has:
  - `return?: ABIReturn` - Which will contain an ABI return value if a non-void ABI method was called:
    - `rawReturnValue: Uint8Array` - The raw binary of the return value
    - `returnValue: ABIValue` - The decoded value in the appropriate JavaScript object
    - `decodeError: Error` - If there was a decoding error the above 2 values will be `undefined` and this will have the error
- Update and create calls extend [`SendAppUpdateTransactionResult`](../code/modules/types_transaction.md#sendappupdatetransactionresult), which has:
  - `compiledApproval: CompiledTeal | undefined` - The compilation result of approval, if approval program was supplied as a string and thus compiled by algod
  - `compiledClear: CompiledTeal | undefined` - The compilation result of clear state, if clear state program was supplied as a string and thus compiled by algod
- Create calls extend [`SendAppCreateTransactionResult`](../code/modules/types_transaction.md#sendappcreatetransactionresult), which has:
  - `appId: bigint` - The id of the created app
  - `appAddress: string` - The Algorand address of the account associated with the app

There is a static method on [`AppManager`](#appmanager) that allows you to parse an ABI return value from an algod transaction confirmation:

```typescript
const confirmation = modelsv2.PendingTransactionResponse.from_obj_for_encoding(
  await algod.pendingTransactionInformation(transactionId).do(),
)

const abiReturn = AppManager.getABIReturn(confirmation, abiMethod)
```

### Creation

To create an app via a raw app transaction you can use `algorand.send.appCreate(params)` (immediately send a single app creation transaction), `algorand.createTransaction.appCreate(params)` (construct an app creation transaction), or `algorand.newGroup().addAppCreate(params)` (add app creation to a group of transactions) per [`AlgorandClient`](./algorand-client.md) [transaction semantics](./algorand-client.md#creating-and-issuing-transactions).

To create an app via an ABI method call you can use `algorand.send.appCreateMethodCall(params)` (immediately send a single app creation transaction), `algorand.createTransaction.appCreateMethodCall(params)` (construct an app creation transaction), or `algorand.newGroup().addAppCreateMethodCall(params)` (add app creation to a group of transactions).

The base type for specifying an app creation transaction is [`AppCreateParams`](../code/modules/types_composer.md#appcreateparams) (extended as [`AppCreateMethodCall`](../code/modules/types_composer.md#appcreatemethodcall) for ABI method call version), which has the following parameters in addition to the [common parameters](#common-app-parameters):

- `onComplete?: Exclude<algosdk.OnApplicationComplete, algosdk.OnApplicationComplete.ClearStateOC>` - The on-completion action to specify for the call; defaults to NoOp and allows any on-completion apart from clear state.
- `approvalProgram: Uint8Array | string` - The program to execute for all OnCompletes other than ClearState as raw teal that will be compiled (string) or compiled teal (encoded as a byte array (Uint8Array)).
- `clearStateProgram: Uint8Array | string` - The program to execute for ClearState OnComplete as raw teal that will be compiled (string) or compiled teal (encoded as a byte array (Uint8Array)).
- `schema?` - The storage schema to request for the created app. This is immutable once the app is created. It is an object with:
  - `globalInts: number` - The number of integers saved in global state.
  - `globalByteSlices: number` - The number of byte slices saved in global state.
  - `localInts: number` - The number of integers saved in local state.
  - `localByteSlices: number` - The number of byte slices saved in local state.
- `extraProgramPages?: number` - Number of extra pages required for the programs. This is immutable once the app is created.

If you pass in `approvalProgram` or `clearStateProgram` as a string then it will automatically be compiled using Algod and the compilation result will be available via [`algorand.app.getCompilationResult`](../code/classes/types_app_manager.AppManager.md#getcompilationresult) (including the source map). To skip this behaviour you can pass in the compiled TEAL as `Uint8Array`.

```typescript
// Basic raw example
const result = await algorand.send.appCreate({ sender: 'CREATORADDRESS', approvalProgram: 'TEALCODE', clearStateProgram: 'TEALCODE' })
const createdAppId = result.appId

// Advanced raw example
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

// Basic ABI call example
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
const result = await algorand.send.appCreateMethodCall({
  sender: 'CREATORADDRESS',
  approvalProgram: 'TEALCODE',
  clearStateProgram: 'TEALCODE',
  method: method,
  args: ["arg1_value"]
})
const createdAppId = result.appId
```

### Updating

To update an app via a raw app transaction you can use `algorand.send.appUpdate(params)` (immediately send a single app update transaction), `algorand.createTransaction.appUpdate(params)` (construct an app update transaction), or `algorand.newGroup().addAppUpdate(params)` (add app update to a group of transactions) per [`AlgorandClient`](./algorand-client.md) [transaction semantics](./algorand-client.md#creating-and-issuing-transactions).

To create an app via an ABI method call you can use `algorand.send.appUpdateMethodCall(params)` (immediately send a single app update transaction), `algorand.createTransaction.appUpdateMethodCall(params)` (construct an app update transaction), or `algorand.newGroup().addAppUpdateMethodCall(params)` (add app update to a group of transactions).

The base type for specifying an app update transaction is [`AppUpdateParams`](../code/modules/types_composer.md#appupdateparams) (extended as [`AppUpdateMethodCall`](../code/modules/types_composer.md#appupdatemethodcall) for ABI method call version), which has the following parameters in addition to the [common parameters](#common-app-parameters):

- `onComplete?: algosdk.OnApplicationComplete.UpdateApplicationOC` - On Complete can either be omitted or set to update
- `approvalProgram: Uint8Array | string` - The program to execute for all OnCompletes other than ClearState as raw teal that will be compiled (string) or compiled teal (encoded as a byte array (Uint8Array)).
- `clearStateProgram: Uint8Array | string` - The program to execute for ClearState OnComplete as raw teal that will be compiled (string) or compiled teal (encoded as a byte array (Uint8Array)).

If you pass in `approvalProgram` or `clearStateProgram` as a string then it will automatically be compiled using Algod and the compilation result will be available via [`algorand.app.getCompilationResult`](../code/classes/types_app_manager.AppManager.md#getcompilationresult) (including the source map). To skip this behaviour you can pass in the compiled TEAL as `Uint8Array`.

```typescript
// Basic raw example
await algorand.send.appUpdate({ sender: 'SENDERADDRESS', approvalProgram: 'TEALCODE', clearStateProgram: 'TEALCODE' })

// Advanced raw example
await algorand.send.appUpdate({
  sender: 'SENDERADDRESS',
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

// Basic ABI call example
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
await algorand.send.appUpdateMethodCall({
  sender: 'SENDERADDRESS',
  approvalProgram: 'TEALCODE',
  clearStateProgram: 'TEALCODE',
  method: method,
  args: ["arg1_value"]
})
```

### Deleting

To delete an app via a raw app transaction you can use `algorand.send.appDelete(params)` (immediately send a single app deletion transaction), `algorand.createTransaction.appDelete(params)` (construct an app deletion transaction), or `algorand.newGroup().addAppDelete(params)` (add app deletion to a group of transactions) per [`AlgorandClient`](./algorand-client.md) [transaction semantics](./algorand-client.md#creating-and-issuing-transactions).

To delete an app via an ABI method call you can use `algorand.send.appDeleteMethodCall(params)` (immediately send a single app deletion transaction), `algorand.createTransaction.appDeleteMethodCall(params)` (construct an app deletion transaction), or `algorand.newGroup().addAppDeleteMethodCall(params)` (add app deletion to a group of transactions).

The base type for specifying an app deletion transaction is [`AppDeleteParams`](../code/modules/types_composer.md#appdeleteparams) (extended as [`AppDeleteMethodCall`](../code/modules/types_composer.md#appdeletemethodcall) for ABI method call version), which has the following parameters in addition to the [common parameters](#common-app-parameters):

- `onComplete?: algosdk.OnApplicationComplete.DeleteApplicationOC` - On Complete can either be omitted or set to delete

```typescript
// Basic raw example
await algorand.send.appDelete({ sender: 'SENDERADDRESS' })

// Advanced raw example
await algorand.send.appDelete({
  sender: 'SENDERADDRESS',
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

// Basic ABI call example
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
await algorand.send.appDeleteMethodCall({
  sender: 'SENDERADDRESS',
  method: method,
  args: ["arg1_value"]
})
```

## Calling

To call an app via a raw app transaction you can use `algorand.send.appCall(params)` (immediately send a single app call transaction), `algorand.createTransaction.appCall(params)` (construct an app call transaction), or `algorand.newGroup().addAppCall(params)` (add app deletion to a group of transactions) per [`AlgorandClient`](./algorand-client.md) [transaction semantics](./algorand-client.md#creating-and-issuing-transactions).

To call an app via an ABI method call you can use `algorand.send.appCallMethodCall(params)` (immediately send a single app call transaction), `algorand.createTransaction.appCallMethodCall(params)` (construct an app call transaction), or `algorand.newGroup().addAppCallMethodCall(params)` (add app call to a group of transactions).

The base type for specifying an app call transaction is [`AppCallParams`](../code/modules/types_composer.md#appcallparams) (extended as [`AppCallMethodCall`](../code/modules/types_composer.md#appcallmethodcall) for ABI method call version), which has the following parameters in addition to the [common parameters](#common-app-parameters):

- `onComplete?: Exclude<algosdk.OnApplicationComplete, algosdk.OnApplicationComplete.UpdateApplicationOC>` - On Complete can either be omitted (which will result in no-op) or set to any on-complete apart from update

```typescript
// Basic raw example
await algorand.send.appCall({ sender: 'SENDERADDRESS' })

// Advanced raw example
await algorand.send.appCall({
  sender: 'SENDERADDRESS',
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

// Basic ABI call example
const method = new ABIMethod({
  name: 'method',
  args: [{ name: 'arg1', type: 'string' }],
  returns: { type: 'string' },
})
await algorand.send.appCallMethodCall({
  sender: 'SENDERADDRESS',
  method: method,
  args: ["arg1_value"]
})
```

## Accessing state

### Global state

To access local state you can use the following method from an [`AppManager`](#appmanager) instance:

- [`algorand.app.getLocalState(appId, address)`](../code/classes/types_app_manager.AppManager.md#getlocalstate) - Returns the current local state for the given app ID and account address decoded into an object keyed by the UTF-8 representation of the state key with various parsed versions of the value (base64, UTF-8 and raw binary)

```typescript
const globalState = await algorand.app.getGlobalState(12345n)
```

Global state is parsed from the underlying algod response via the following static method from [`AppManager`](#appmanager):

- [`AppManager.decodeAppState(state)`](../code/classes/types_app_manager.AppManager.md#decodeappstate) - Takes the raw response from the algod API for global state and returns a friendly generic object keyed by the UTF-8 value of the key

```typescript
const globalAppState = /* value from algod */
const appState = AppManager.decodeAppState(globalAppState)

const keyAsBinary = appState['value1'].keyRaw
const keyAsBase64 = appState['value1'].keyBase64
if (typeof appState['value1'].value === 'string') {
  const valueAsString = appState['value1'].value
  const valueAsBinary = appState['value1'].valueRaw
  const valueAsBase64 = appState['value1'].valueBase64
} else {
  const valueAsNumberOrBigInt = appState['value1'].value
}
```

### Local state

To access local state you can use the following method from an [`AppManager`](#appmanager) instance:

- [`algorand.app.getLocalState(appId, address)`](../code/classes/types_app_manager.AppManager.md#getlocalstate) - Returns the current local state for the given app ID and account address decoded into an object keyed by the UTF-8 representation of the state key with various parsed versions of the value (base64, UTF-8 and raw binary)

```typescript
const localState = await algorand.app.getLocalState(12345n, 'ACCOUNTADDRESS')
```

### Boxes

To access and parse box values and names for an app you can use the following methods from an [`AppManager`](#appmanager) instance:

- [`algorand.app.getBoxNames(appId: bigint)`](../code/modules/index.md#getboxnames) - Returns the current [box names](#boxname) for the given app ID
- [`algorand.app.getBoxValue(appId: bigint, boxName: BoxIdentifier)`](../code/modules/index.md#getboxvalue) - Returns the binary value of the given box name for the given app ID
- [`algorand.app.getBoxValues(appId: bigint, boxNames: BoxIdentifier[])`](../code/modules/index.md#getboxvalues) - Returns the binary values of the given box names for the given app ID
- [`algorand.app.getBoxValueFromABIType(request: {appId: bigint, boxName: BoxIdentifier, type: algosdk.ABIType}})`](../code/modules/index.md#getboxvaluefromabitype) - Returns the parsed ABI value of the given box name for the given app ID for the provided ABI type
- [`algorand.app.getBoxValuesFromABIType(request: {appId: bigint, boxNames: BoxIdentifier[], type: algosdk.ABIType})`](../code/modules/index.md#getboxvaluesfromabitype) - Returns the parsed ABI values of the given box names for the given app ID for the provided ABI type
- [`AppManager.getBoxReference(boxId)`](../code/modules/index.md#getboxreference) - Returns a `algosdk.BoxReference` representation of the given [box identifier / reference](#box-references), which is useful when constructing a raw `algosdk.Transaction`

```typescript
const appId = 12345n
const boxName: BoxReference = 'my-box'
const boxName2: BoxReference = 'my-box2'

const boxNames = algorand.app.getBoxNames(appId)
const boxValue = algorand.app.getBoxValue(appId, boxName)
const boxValues = algorand.app.getBoxValues(appId, [boxName, boxName2])
const boxABIValue = algorand.app.getBoxValueFromABIType(appId, boxName, algosdk.ABIStringType)
const boxABIValues = algorand.app.getBoxValuesFromABIType(appId, [boxName, boxName2], algosdk.ABIStringType)
```

## Getting app information

To get reference information and metadata about an existing app you can use the following methods:

- [`algorand.app.getById(appId)`](../code/classes/types_app_manager.AppManager.md#getbyid) - Returns current app information by app ID from an [`AppManager`](#appmanager) instance
- [`indexer.lookupAccountCreatedApplicationByAddress(indexer, address, getAll?, paginationLimit?)`](../code/modules/index.indexer.md#lookupaccountcreatedapplicationbyaddress) - Returns all apps created by a given account from [indexer](./indexer.md)

## Common app parameters

When interacting with apps (creating, updating, deleting, calling), there are some [`CommonAppCallParams`](../code/modules/types_composer.md#commonappcallparams) that you will be able to pass in to all calls in addition to the [common transaction parameters](./algorand-client.md#transaction-parameters):

- `appId: bigint` - ID of the application; only specified if the application is not being created.
- `onComplete?: algosdk.OnApplicationComplete` - The [on-complete](https://developer.algorand.org/docs/get-details/dapps/avm/teal/specification/#oncomplete) action of the call (noting each call type will have restrictions that affect this value).
- `args?: Uint8Array[]` - Any [arguments to pass to the smart contract call](https://developer.algorand.org/docs/get-details/dapps/avm/teal/#argument-passing).
- `accountReferences?: string[]` - Any account addresses to add to the [accounts array](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/apps/#reference-arrays).
- `appReferences?: bigint[]` - The ID of any apps to load to the [foreign apps array](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/apps/#reference-arrays).
- `assetReferences?: bigint[]` - The ID of any assets to load to the [foreign assets array](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/apps/#reference-arrays).
- `boxReferences?: (BoxReference | BoxIdentifier)[]` - Any [boxes](#box-references) to load to the [boxes array](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/apps/#reference-arrays)

When making an ABI call, the `args` parameter is replaced with a different type and there is also a `method` parameter per the [`AppMethodCall`](../code/modules/types_composer.md#appmethodcall) type:

- `method: algosdk.ABIMethod`
- `args: ABIArgument[]` The arguments to pass to the ABI call, which can be one of:
  - `algosdk.ABIValue` - Which can be one of:
    - `boolean`
    - `number`
    - `bigint`
    - `string`
    - `Uint8Array`
    - An array of one of the above types
  - `algosdk.TransactionWithSigner`
  - `algosdk.Transaction`
  - `Promise<Transaction>` - which allows you to use an AlgorandClient call that [returns a transaction](./algorand-client.md#creating-single-transactions) without needing to await the call
  - `AppMethodCall` - parameters that define another (nested) ABI method call, which will in turn get resolved to one or more transactions

## Box references

Referencing boxes can by done by either `BoxIdentifier` (which identifies the name of the box and app ID `0` will be used (i.e. the current app)) or `BoxReference`:

```typescript
/**
 * Something that identifies an app box name - either a:
 *  * `Uint8Array` (the actual binary of the box name)
 *  * `string` (that will be encoded to a `Uint8Array`)
 *  * `TransactionSignerAccount` (that will be encoded into the
 *    public key address of the corresponding account)
 */
export type BoxIdentifier = string | Uint8Array | TransactionSignerAccount

/**
 * A grouping of the app ID and name identifier to reference an app box.
 */
export interface BoxReference {
  /**
   * A unique application id
   */
  appId: bigint
  /**
   * Identifier for a box name
   */
  name: BoxIdentifier
}
```

## Compilation

The [`AppManager`](#appmanager) class allows you to compile TEAL code with caching semantics that allows you to avoid duplicate compilation and keep track of source maps from compiled code.

If you call `algorand.app.compileTeal(tealCode)` then the compilation result will be stored and retrievable from `algorand.app.getCompilationResult(tealCode)`.

```typescript
const tealCode = 'return 1'
const compilationResult = await algorand.app.compileTeal(tealCode)
// ...
const previousCompilationResult = algorand.app.getCompilationResult(tealCode)
```
