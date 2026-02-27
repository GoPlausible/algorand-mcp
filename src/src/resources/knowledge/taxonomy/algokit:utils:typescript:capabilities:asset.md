# Assets

The Algorand Standard Asset (asset) management functions include creating, opting in and transferring assets, which are fundamental to asset interaction in a blockchain environment.

To see some usage examples check out the [automated tests](../../src/types/algorand-client.asset.spec.ts).

## `AssetManager`

The [`AssetManager`](../code/classes/types_asset_manager.AssetManager.md) is a class that is used to manage asset information.

To get an instance of `AssetManager`, you can use either [`AlgorandClient`](./algorand-client.md) via `algorand.asset` or instantiate it directly:

```typescript
import { AssetManager } from '@algorandfoundation/algokit-utils/types/asset-manager'
import {TransactionComposer } from '@algorandfoundation/algokit-utils/types/composer'

const assetManager = new AssetManager(algod, () => new TransactionComposer({algod, () => signer, () => suggestedParams}))
```

## Creation

To create an asset you can use `algorand.send.assetCreate(params)` (immediately send a single asset creation transaction), `algorand.createTransaction.assetCreate(params)` (construct an asset creation transaction), or `algorand.newGroup().addAssetCreate(params)` (add asset creation to a group of transactions) per [`AlgorandClient`](./algorand-client.md) [transaction semantics](./algorand-client.md#creating-and-issuing-transactions).

The base type for specifying an asset creation transaction is [`AssetCreateParams`](../code/modules/types_composer.md#assetcreateparams), which has the following parameters in addition to the [common transaction parameters](./algorand-client.md#transaction-parameters):

- `total: bigint` - The total amount of the smallest divisible (decimal) unit to create. For example, if `decimals` is, say, 2, then for every 100 `total` there would be 1 whole unit. This field can only be specified upon asset creation.
- `decimals: number` - The amount of decimal places the asset should have. If unspecified then the asset will be in whole units (i.e. `0`). If 0, the asset is not divisible. If 1, the base unit of the asset is in tenths, and so on up to 19 decimal places. This field can only be specified upon asset creation.
- `assetName?: string` - The optional name of the asset. Max size is 32 bytes. This field can only be specified upon asset creation.
- `unitName?: string` - The optional name of the unit of this asset (e.g. ticker name). Max size is 8 bytes. This field can only be specified upon asset creation.
- `url?: string` - Specifies an optional URL where more information about the asset can be retrieved. Max size is 96 bytes. This field can only be specified upon asset creation.
- `metadataHash?: string | Uint8Array` - 32-byte hash of some metadata that is relevant to your asset and/or asset holders. The format of this metadata is up to the application. This field can only be specified upon asset creation.
- `defaultFrozen?: boolean` - Whether to freeze holdings for this asset by default. Defaults to `false`. If `true` then for anyone apart from the creator to hold the asset it needs to be unfrozen using an asset freeze transaction from the `freeze` account, which must be set on creation. This field can only be specified upon asset creation.
- `manager?: string` - The address of the optional account that can manage the configuration of the asset and destroy it. The configuration fields it can change are `manager`, `reserve`, `clawback`, and `freeze`. If not set (`undefined` or `""`) at asset creation or subsequently set to empty by the `manager` the asset becomes permanently immutable.
- `reserveAccount?: string` - The address of the optional account that holds the reserve (uncirculated supply) units of the asset. This address has no specific authority in the protocol itself and is informational only. Some standards like [ARC-19](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0019.md) rely on this field to hold meaningful data. It can be used in the case where you want to signal to holders of your asset that the uncirculated units of the asset reside in an account that is different from the default creator account. If not set (`undefined` or `""`) at asset creation or subsequently set to empty by the manager the field is permanently empty.
- `freezeAccount?: string` - The address of the optional account that can be used to freeze or unfreeze holdings of this asset for any account. If empty, freezing is not permitted. If not set (`undefined` or `""`) at asset creation or subsequently set to empty by the manager the field is permanently empty.
- `clawbackAccount?: string` - The address of the optional account that can clawback holdings of this asset from any account. **This field should be used with caution** as the clawback account has the ability to **unconditionally take assets from any account**. If empty, clawback is not permitted. If not set (`undefined` or `""`) at asset creation or subsequently set to empty by the manager the field is permanently empty.

### Examples

```typescript
// Basic example
const result = await algorand.send.assetCreate({ sender: 'CREATORADDRESS', total: 100n })
const createdAssetId = result.assetId

// Advanced example
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

## Reconfigure

If you have a `manager` address set on an asset, that address can send a reconfiguration transaction to change the `manager`, `reserve`, `freeze` and `clawback` fields of the asset if they haven't been set to empty.

> [!WARNING]
> If you issue a reconfigure transaction and don't set the _existing_ values for any of the below fields then that field will be permanently set to empty.

To reconfigure an asset you can use `algorand.send.assetConfig(params)` (immediately send a single asset config transaction), `algorand.createTransaction.assetConfig(params)` (construct an asset config transaction), or `algorand.newGroup().addAssetConfig(params)` (add asset config to a group of transactions) per [`AlgorandClient`](./algorand-client.md) [transaction semantics](./algorand-client.md#creating-and-issuing-transactions).

The base type for specifying an asset creation transaction is [`AssetConfigParams`](../code/modules/types_composer.md#assetconfigparams), which has the following parameters in addition to the [common transaction parameters](./algorand-client.md#transaction-parameters):

- `assetId: bigint` - ID of the asset to reconfigure
- `manager: string | undefined` - The address of the optional account that can manage the configuration of the asset and destroy it. The configuration fields it can change are `manager`, `reserve`, `clawback`, and `freeze`. If not set (`undefined` or `""`) the asset will become permanently immutable.
- `reserve?: string` - The address of the optional account that holds the reserve (uncirculated supply) units of the asset. This address has no specific authority in the protocol itself and is informational only. Some standards like [ARC-19](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0019.md) rely on this field to hold meaningful data. It can be used in the case where you want to signal to holders of your asset that the uncirculated units of the asset reside in an account that is different from the default creator account. If not set (`undefined` or `""`) the field will become permanently empty.
- `freeze?: string` - The address of the optional account that can be used to freeze or unfreeze holdings of this asset for any account. If empty, freezing is not permitted. If not set (`undefined` or `""`) the field will become permanently empty.
- `clawback?: string` - The address of the optional account that can clawback holdings of this asset from any account. **This field should be used with caution** as the clawback account has the ability to **unconditionally take assets from any account**. If empty, clawback is not permitted. If not set (`undefined` or `""`) the field will become permanently empty.

### Examples

```typescript
// Basic example

await algorand.send.assetConfig({ sender: 'MANAGERADDRESS', assetId: 123456n, manager: 'MANAGERADDRESS' })

// Advanced example

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

## Transfer

To transfer unit(s) of an asset between accounts you can use `algorand.send.assetTransfer(params)` (immediately send a single asset transfer transaction), `algorand.createTransaction.assetTransfer(params)` (construct an asset transfer transaction), or `algorand.newGroup().addAssetTransfer(params)` (add asset transfer to a group of transactions) per [`AlgorandClient`](./algorand-client.md) [transaction semantics](./algorand-client.md#creating-and-issuing-transactions).

**Note:** For an account to receive an asset it needs to have [opted-in](#opt-inout).

The base type for specifying an asset transfer transaction is [`AssetTransferParams`](../code/modules/types_composer.md#assettransferparams), which has the following parameters in addition to the [common transaction parameters](./algorand-client.md#transaction-parameters):

- `assetId: bigint` - ID of the asset to transfer.
- `amount: bigint` - Amount of the asset to transfer (in smallest divisible (decimal) units).
- `receiver: string` - The address of the account that will receive the asset unit(s).
- `clawbackTarget?: string` - Optional address of an account to clawback the asset from. Requires the sender to be the clawback account. **Warning:** Be careful with this parameter as it can lead to unexpected loss of funds if not used correctly.
- `closeAssetTo?: string` - Optional address of an account to close the asset position to. **Warning:** Be careful with this parameter as it can lead to loss of funds if not used correctly.

### Examples

```typescript
// Basic example

await algorand.send.assetTransfer({sender: 'HOLDERADDRESS', assetId: 123456n, amount: 1n, receiver: 'RECEIVERADDRESS' })

// Advanced example (with clawback and close asset to)

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

## Opt-in/out

Before an account can receive a specific asset, it must [`opt-in`](https://developer.algorand.org/docs/get-details/asa/#receiving-an-asset) to receive it. An opt-in transaction places an asset holding of 0 into the account and increases the [minimum balance](https://developer.algorand.org/docs/get-details/accounts/#minimum-balance) of that account by [100,000 microAlgos](https://developer.algorand.org/docs/get-details/asa/#assets-overview).

An account can opt out of an asset at any time by closing out it's asset position to another account (usually to the asset creator). This means that the account will no longer hold the asset, and the account will no longer be able to receive the asset. The account also recovers the Minimum Balance Requirement for the asset (100,000 microAlgos).

When opting-out you generally want to be careful to ensure you have a zero-balance otherwise you will forfeit the balance you do have. AlgoKit Utils can protect you from making this mistake by checking you have a zero-balance before issuing the opt-out transaction. You can turn this check off if you want to avoid the extra calls to Algorand and are confident in what you are doing.

AlgoKit Utils gives you functions that allow you to do opt-ins and opt-outs in bulk or as a single operation. The bulk operations give you less control over the sending semantics as they automatically send the transactions to Algorand in the most optimal way using transaction groups of 16 at a time.

### `assetOptIn`

To opt-in to an asset you can use `algorand.send.assetOptIn(params)` (immediately send a single asset opt-in transaction), `algorand.createTransaction.assetOptIn(params)` (construct an asset opt-in transaction), or `algorand.newGroup().addAssetOptIn(params)` (add asset opt-in to a group of transactions) per [`AlgorandClient`](./algorand-client.md) [transaction semantics](./algorand-client.md#creating-and-issuing-transactions).

The base type for specifying an asset opt-in transaction is [`AssetOptInParams`](../code/modules/types_composer.md#assetoptinparams), which has the following parameters in addition to the [common transaction parameters](./algorand-client.md#transaction-parameters):

- `assetId: bigint` - The ID of the asset that will be opted-in to

```typescript
// Basic example

await algorand.send.assetOptIn({ sender: 'SENDERADDRESS', assetId: 123456n })

// Advanced example

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

### `assetOptOut`

To opt-out to an asset you can use `algorand.send.assetOptOut(params)` (immediately send a single asset opt-out transaction), `algorand.createTransaction.assetOptOut(params)` (construct an asset opt-out transaction), or `algorand.newGroup().addAssetOptOut(params)` (add asset opt-out to a group of transactions) per [`AlgorandClient`](./algorand-client.md) [transaction semantics](./algorand-client.md#creating-and-issuing-transactions).

The base type for specifying an asset opt-out transaction is [`AssetOptOutParams`](../code/modules/types_composer.md#assetoptoutparams), which has the following parameters in addition to the [common transaction parameters](./algorand-client.md#transaction-parameters):

- `assetId: bigint` - The ID of the asset that will be opted-out of
- `creator: string` - The address of the asset creator account to close the asset position to (any remaining asset units will be sent to this account).

If you are using the `send` variant then there is an additional parameter:

- `ensureZeroBalance: boolean` - Whether or not to check if the account has a zero balance first or not. If this is set to `true` and the account has an asset balance it will throw an error. If this is set to `false` and the account has an asset balance it will lose those assets to the asset creator.

> [!WARNING]
> If you are using the `transaction` or `addAssetOptOut` variants then you need to take responsibility to ensure the asset holding balance is `0` to avoid losing assets.

```typescript
// Basic example (without creator)

await algorand.send.assetOptOut({ sender: 'SENDERADDRESS', assetId: 123456n, ensureZeroBalance: true })

// Basic example (with creator)

await algorand.send.assetOptOut({ sender: 'SENDERADDRESS', creator: 'CREATORADDRESS', assetId: 123456n, ensureZeroBalance: true })

// Advanced example

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

### `asset.bulkOptIn`

The [`asset.bulkOptIn`](../code/classes/types_asset_manager.AssetManager.md#bulkoptin) function facilitates the opt-in process for an account to multiple assets, allowing the account to receive and hold those assets.

```typescript
// Basic example

algorand.asset.bulkOptIn('ACCOUNTADDRESS', [12345n, 67890n])

// Advanced example

algorand.asset.bulkOptIn('ACCOUNTADDRESS', [12345n, 67890n], {
  maxFee: (1000).microAlgo(),
  suppressLog: true,
})
```

### `asset.bulkOptOut`

The [`asset.bulkOptOut`](../code/classes/types_asset_manager.AssetManager.md#bulkoptout) function facilitates the opt-out process for an account from multiple assets, permitting the account to discontinue holding a group of assets.

```typescript
// Basic example

algorand.asset.bulkOptOut('ACCOUNTADDRESS', [12345n, 67890n])

// Advanced example

algorand.asset.bulkOptOut('ACCOUNTADDRESS', [12345n, 67890n], {
  ensureZeroBalance: true,
  maxFee: (1000).microAlgo(),
  suppressLog: true,
})
```

## Get information

### Getting current parameters for an asset

You can get the current parameters of an asset from algod by using `algorand.asset.getById(assetId)`.

```typescript
const assetInfo = await assetManager.getById(12353n)
```

### Getting current holdings of an asset for an account

You can get the current holdings of an asset for a given account from algod by using `algorand.asset.getAccountInformation(accountAddress, assetId)`.

```typescript
const address = 'XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA'
const assetId = 123345n
const accountInfo = await algorand.asset.getAccountInformation(address, assetId)
```
