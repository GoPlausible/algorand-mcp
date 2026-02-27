# Algorand client

`AlgorandClient` is a client class that brokers easy access to Algorand functionality. It's the [default entrypoint](../README.md#usage) into AlgoKit Utils functionality.

The main entrypoint to the bulk of the functionality in AlgoKit Utils is the `AlgorandClient` class, most of the time you can get started by typing `AlgorandClient.` and choosing one of the static initialisation methods to create an [Algorand client](./capabilities/algorand-client.md), e.g.:

```typescript
// Point to the network configured through environment variables or
//  if no environment variables it will point to the default LocalNet
//  configuration
const algorand = AlgorandClient.fromEnvironment()
// Point to default LocalNet configuration
const algorand = AlgorandClient.defaultLocalNet()
// Point to TestNet using AlgoNode free tier
const algorand = AlgorandClient.testNet()
// Point to MainNet using AlgoNode free tier
const algorand = AlgorandClient.mainNet()
// Point to a pre-created algod client
const algorand = AlgorandClient.fromClients({ algod })
// Point to pre-created algod, indexer and kmd clients
const algorand = AlgorandClient.fromClients({ algod, indexer, kmd })
// Point to custom configuration for algod
const algorand = AlgorandClient.fromConfig({ algodConfig })
// Point to custom configuration for algod, indexer and kmd
const algorand = AlgorandClient.fromConfig({ algodConfig, indexerConfig, kmdConfig })
```

## Accessing SDK clients

Once you have an `AlgorandClient` instance, you can access the SDK clients for the various Algorand APIs via the `algorand.client` property.

```ts
const algorand = AlgorandClient.defaultLocalNet()

const algodClient = algorand.client.algod
const indexerClient = algorand.client.indexer
const kmdClient = algorand.client.kmd
```

## Accessing manager class instances

The `AlgorandClient` has a number of manager class instances that help you quickly use intellisense to get access to advanced functionality.

- [`AccountManager`](./account.md) via `algorand.account`, there are also some chainable convenience methods which wrap specific methods in `AccountManager`:
  - `algorand.setDefaultSigner(signer)` -
  - `algorand.setSignerFromAccount(account)` -
  - `algorand.setSigner(sender, signer)`
- [`AssetManager`](./asset.md) via `algorand.asset`
- [`ClientManager`](./client.md) via `algorand.client`

## Creating and issuing transactions

`AlgorandClient` exposes a series of methods that allow you to create, execute, and compose groups of transactions (all via the [`TransactionComposer`](./transaction-composer.md)).

### Creating transactions

You can compose a transaction via `algorand.createTransaction...`, which gives you an instance of the [`AlgorandClientTransactionCreator`](../code/classes/types_algorand_client_transaction_creator.AlgorandClientTransactionCreator.md) class. Intellisense will guide you on the different options.

The signature for the calls to send a single transaction usually look like:

```
algorand.createTransaction.{method}(params: {ComposerTransactionTypeParams} & CommonTransactionParams): Promise<Transaction>
```

- To get intellisense on the params, open an object parenthesis (`{`) and use your IDE's intellisense keyboard shortcut (e.g. ctrl+space).
- `{ComposerTransactionTypeParams}` will be the parameters that are specific to that transaction type e.g. `PaymentParams`, [see the full list](../code/modules/types_composer.md#type-aliases)
- [`CommonTransactionParams`](../code/modules/types_composer.md#commontransactionparams) are the [common transaction parameters](#transaction-parameters) that can be specified for every single transaction
- `Transaction` is an unsigned `algosdk.Transaction` object, ready to be signed and sent

The return type for the ABI method call methods are slightly different:

```
algorand.createTransaction.app{callType}MethodCall(params: {ComposerTransactionTypeParams} & CommonTransactionParams): Promise<BuiltTransactions>
```

Where `BuiltTransactions` looks like this:

```typescript
export interface BuiltTransactions {
  /** The built transactions */
  transactions: algosdk.Transaction[]
  /** Any `ABIMethod` objects associated with any of the transactions in a map keyed by transaction index. */
  methodCalls: Map<number, algosdk.ABIMethod>
  /** Any `TransactionSigner` objects associated with any of the transactions in a map keyed by transaction index. */
  signers: Map<number, algosdk.TransactionSigner>
}
```

This signifies the fact that an ABI method call can actually result in multiple transactions (which in turn may have different signers), that you need ABI metadata to be able to extract the return value from the transaction result.

### Sending a single transaction

You can compose a single transaction via `algorand.send...`, which gives you an instance of the [`AlgorandClientTransactionSender`](../code/classes/types_algorand_client_transaction_sender.AlgorandClientTransactionSender.md) class. Intellisense will guide you on the different options.

Further documentation is present in the related capabilities:

- [App management](./app.md)
- [Asset management](./asset.md)
- [Algo transfers](./transfer.md)

The signature for the calls to send a single transaction usually look like:

`algorand.send.{method}(params: {ComposerTransactionTypeParams} & CommonAppCallParams & SendParams): SingleSendTransactionResult`

- To get intellisense on the params, open an object parenthesis (`{`) and use your IDE's intellisense keyboard shortcut (e.g. ctrl+space).
- `{ComposerTransactionTypeParams}` will be the parameters that are specific to that transaction type e.g. `PaymentParams`, [see the full list](../code/modules/types_composer.md#type-aliases)
- [`CommonAppCallParams`](../code/modules/types_composer.md#commonappcallparams) are the [common app call transaction parameters](./app.md#common-app-parameters) that can be specified for every single app transaction
- [`SendParams`](../code/interfaces/types_transaction.SendParams.md) are the [parameters](#transaction-parameters) that control execution semantics when sending transactions to the network
- [`SendSingleTransactionResult`](../code/modules/types_algorand_client.md#sendsingletransactionresult) is all of the information that is relevant when [sending a single transaction to the network](./transaction.md#sending-a-transaction)

Generally, the functions to immediately send a single transaction will emit log messages before and/or after sending the transaction. You can opt-out of this by sending `suppressLog: true`.

### Composing a group of transactions

You can compose a group of transactions for execution by using the `newGroup()` method on `AlgorandClient` and then use the various `.add{Type}()` methods on [`TransactionComposer`](./transaction-composer.md) to add a series of transactions.

```typescript
const result = algorand
  .newGroup()
  .addPayment({ sender: 'SENDERADDRESS', receiver: 'RECEIVERADDRESS', amount: (1).microAlgo() })
  .addAssetOptIn({ sender: 'SENDERADDRESS', assetId: 12345n })
  .send()
```

`newGroup()` returns a new [`TransactionComposer`](./transaction-composer.md) instance, which can also return the group of transactions, simulate them and other things.

### Transaction parameters

To create a transaction you define a set of parameters as a plain TypeScript object.

There are two common base interfaces that get reused:

- [`CommonTransactionParams`](../code/modules/types_composer.md#commontransactionparams)
  - `sender: string` - The address of the account sending the transaction.
  - `signer?: algosdk.TransactionSigner | TransactionSignerAccount` - The function used to sign transaction(s); if not specified then an attempt will be made to find a registered signer for the given `sender` or use a default signer (if configured).
  - `rekeyTo?: string` - Change the signing key of the sender to the given address. **Warning:** Please be careful with this parameter and be sure to read the [official rekey guidance](https://developer.algorand.org/docs/get-details/accounts/rekey/).
  - `note?: Uint8Array | string` - Note to attach to the transaction. Max of 1000 bytes.
  - `lease?: Uint8Array | string` - Prevent multiple transactions with the same lease being included within the validity window. A [lease](https://developer.algorand.org/articles/leased-transactions-securing-advanced-smart-contract-design/) enforces a mutually exclusive transaction (useful to prevent double-posting and other scenarios).
  - Fee management
    - `staticFee?: AlgoAmount` - The static transaction fee. In most cases you want to use `extraFee` unless setting the fee to 0 to be covered by another transaction.
    - `extraFee?: AlgoAmount` - The fee to pay IN ADDITION to the suggested fee. Useful for covering inner transaction fees.
    - `maxFee?: AlgoAmount` - Throw an error if the fee for the transaction is more than this amount; prevents overspending on fees during high congestion periods.
  - Round validity management
    - `validityWindow?: number` - How many rounds the transaction should be valid for, if not specified then the registered default validity window will be used.
    - `firstValidRound?: bigint` - Set the first round this transaction is valid. If left undefined, the value from algod will be used. We recommend you only set this when you intentionally want this to be some time in the future.
    - `lastValidRound?: bigint` - The last round this transaction is valid. It is recommended to use `validityWindow` instead.
- [`SendParams`](../code/interfaces/types_transaction.SendParams.md)
  - `maxRoundsToWaitForConfirmation?: number` - The number of rounds to wait for confirmation. By default until the latest lastValid has past.
  - `suppressLog?: boolean` - Whether to suppress log messages from transaction send, default: do not suppress.

Then on top of that the base type gets extended for the specific type of transaction you are issuing. These are all defined as part of [`TransactionComposer`](./transaction-composer.md).

### Transaction configuration

AlgorandClient caches network provided transaction values for you automatically to reduce network traffic. It has a set of default configurations that control this behaviour, but you have the ability to override and change the configuration of this behaviour:

- `algorand.setDefaultValidityWindow(validityWindow)` - Set the default validity window (number of rounds from the current known round that the transaction will be valid to be accepted for), having a smallish value for this is usually ideal to avoid transactions that are valid for a long future period and may be submitted even after you think it failed to submit if waiting for a particular number of rounds for the transaction to be successfully submitted. The validity window defaults to 10, except in [automated testing](./testing.md) where it's set to 1000 when targeting LocalNet.
- `algorand.setSuggestedParams(suggestedParams, until?)` - Set the suggested network parameters to use (optionally until the given time)
- `algorand.setSuggestedParamsTimeout(timeout)` - Set the timeout that is used to cache the suggested network parameters (by default 3 seconds)
- `algorand.getSuggestedParams()` - Get the current suggested network parameters object, either the cached value, or if the cache has expired a fresh value
