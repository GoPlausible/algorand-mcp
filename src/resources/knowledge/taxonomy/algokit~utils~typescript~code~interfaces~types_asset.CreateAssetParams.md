[@algorandfoundation/algokit-utils](../README.md) / [types/asset](../modules/types_asset.md) / CreateAssetParams

# Interface: CreateAssetParams

[types/asset](../modules/types_asset.md).CreateAssetParams

**`Deprecated`**

Parameters for `createAsset` call.

## Hierarchy

- [`SendTransactionParams`](types_transaction.SendTransactionParams.md)

  ↳ **`CreateAssetParams`**

## Table of contents

### Properties

- [atc](types_asset.CreateAssetParams.md#atc)
- [clawbackAccount](types_asset.CreateAssetParams.md#clawbackaccount)
- [creator](types_asset.CreateAssetParams.md#creator)
- [decimals](types_asset.CreateAssetParams.md#decimals)
- [fee](types_asset.CreateAssetParams.md#fee)
- [freezeAccount](types_asset.CreateAssetParams.md#freezeaccount)
- [frozenByDefault](types_asset.CreateAssetParams.md#frozenbydefault)
- [lease](types_asset.CreateAssetParams.md#lease)
- [manager](types_asset.CreateAssetParams.md#manager)
- [maxFee](types_asset.CreateAssetParams.md#maxfee)
- [maxRoundsToWaitForConfirmation](types_asset.CreateAssetParams.md#maxroundstowaitforconfirmation)
- [metadataHash](types_asset.CreateAssetParams.md#metadatahash)
- [name](types_asset.CreateAssetParams.md#name)
- [note](types_asset.CreateAssetParams.md#note)
- [populateAppCallResources](types_asset.CreateAssetParams.md#populateappcallresources)
- [reserveAccount](types_asset.CreateAssetParams.md#reserveaccount)
- [skipSending](types_asset.CreateAssetParams.md#skipsending)
- [skipWaiting](types_asset.CreateAssetParams.md#skipwaiting)
- [suppressLog](types_asset.CreateAssetParams.md#suppresslog)
- [total](types_asset.CreateAssetParams.md#total)
- [transactionParams](types_asset.CreateAssetParams.md#transactionparams)
- [unit](types_asset.CreateAssetParams.md#unit)
- [url](types_asset.CreateAssetParams.md#url)

## Properties

### atc

• `Optional` **atc**: `AtomicTransactionComposer`

An optional `AtomicTransactionComposer` to add the transaction to, if specified then `skipSending: undefined` has the same effect as `skipSending: true`

#### Inherited from

[SendTransactionParams](types_transaction.SendTransactionParams.md).[atc](types_transaction.SendTransactionParams.md#atc)

#### Defined in

[src/types/transaction.ts:36](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L36)

___

### clawbackAccount

• `Optional` **clawbackAccount**: `string` \| [`SendTransactionFrom`](../modules/types_transaction.md#sendtransactionfrom)

The optional account that can clawback holdings of this asset. If empty, clawback is not permitted.
If not set at asset creation or subsequently set to empty by the manager the field is permanently empty.

#### Defined in

[src/types/asset.ts:57](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L57)

___

### creator

• **creator**: [`SendTransactionFrom`](../modules/types_transaction.md#sendtransactionfrom)

The account to create the asset.

This account automatically is opted in to the asset and holds all units after creation.

#### Defined in

[src/types/asset.ts:11](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L11)

___

### decimals

• **decimals**: `number`

The number of digits to use after the decimal point when displaying the asset.
If 0, the asset is not divisible.
If 1, the base unit of the asset is in tenths.
If 2, the base unit of the asset is in hundredths.
If 3, the base unit of the asset is in thousandths, and so on up to 19 decimal places.
This field can only be specified upon asset creation.

#### Defined in

[src/types/asset.ts:26](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L26)

___

### fee

• `Optional` **fee**: [`AlgoAmount`](../classes/types_amount.AlgoAmount.md)

The flat fee you want to pay, useful for covering extra fees in a transaction group or app call

#### Inherited from

[SendTransactionParams](types_transaction.SendTransactionParams.md).[fee](types_transaction.SendTransactionParams.md#fee)

#### Defined in

[src/types/transaction.ts:40](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L40)

___

### freezeAccount

• `Optional` **freezeAccount**: `string` \| [`SendTransactionFrom`](../modules/types_transaction.md#sendtransactionfrom)

The optional account that can be used to freeze holdings of this asset. If empty, freezing is not permitted.
If not set at asset creation or subsequently set to empty by the manager the field is permanently empty.

#### Defined in

[src/types/asset.ts:53](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L53)

___

### frozenByDefault

• `Optional` **frozenByDefault**: `boolean`

Whether to freeze holdings for this asset by default. If `true` then for anyone apart from the creator to hold the asset it needs to be unfrozen per account using `freeze`. Defaults to `false`.

#### Defined in

[src/types/asset.ts:59](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L59)

___

### lease

• `Optional` **lease**: `string` \| `Uint8Array`

An (optional) [transaction lease](https://developer.algorand.org/articles/leased-transactions-securing-advanced-smart-contract-design/) to apply

#### Defined in

[src/types/asset.ts:66](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L66)

___

### manager

• `Optional` **manager**: `string` \| [`SendTransactionFrom`](../modules/types_transaction.md#sendtransactionfrom)

The optional account that can manage the configuration of the asset and destroy it.
If not set at asset creation or subsequently set to empty by the manager the asset becomes immutable.

#### Defined in

[src/types/asset.ts:43](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L43)

___

### maxFee

• `Optional` **maxFee**: [`AlgoAmount`](../classes/types_amount.AlgoAmount.md)

The maximum fee that you are happy to pay (default: unbounded) - if this is set it's possible the transaction could get rejected during network congestion

#### Inherited from

[SendTransactionParams](types_transaction.SendTransactionParams.md).[maxFee](types_transaction.SendTransactionParams.md#maxfee)

#### Defined in

[src/types/transaction.ts:42](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L42)

___

### maxRoundsToWaitForConfirmation

• `Optional` **maxRoundsToWaitForConfirmation**: `number`

The maximum number of rounds to wait for confirmation, only applies if `skipWaiting` is `undefined` or `false`, default: wait up to 5 rounds

#### Inherited from

[SendTransactionParams](types_transaction.SendTransactionParams.md).[maxRoundsToWaitForConfirmation](types_transaction.SendTransactionParams.md#maxroundstowaitforconfirmation)

#### Defined in

[src/types/transaction.ts:44](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L44)

___

### metadataHash

• `Optional` **metadataHash**: `string` \| `Uint8Array`

This field is intended to be a 32-byte hash of some metadata that is relevant to your asset and/or asset holders.
The format of this metadata is up to the application. This field can only be specified upon asset creation.

#### Defined in

[src/types/asset.ts:39](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L39)

___

### name

• `Optional` **name**: `string`

The optional name of the asset. Max size if 32 bytes. This field can only be specified upon asset creation.

#### Defined in

[src/types/asset.ts:29](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L29)

___

### note

• `Optional` **note**: [`TransactionNote`](../modules/types_transaction.md#transactionnote)

The (optional) transaction note

#### Defined in

[src/types/asset.ts:64](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L64)

___

### populateAppCallResources

• `Optional` **populateAppCallResources**: `boolean`

Whether to use simulate to automatically populate app call resources in the txn objects. Defaults to true when there are app calls in the group.

#### Inherited from

[SendTransactionParams](types_transaction.SendTransactionParams.md).[populateAppCallResources](types_transaction.SendTransactionParams.md#populateappcallresources)

#### Defined in

[src/types/transaction.ts:46](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L46)

___

### reserveAccount

• `Optional` **reserveAccount**: `string` \| [`SendTransactionFrom`](../modules/types_transaction.md#sendtransactionfrom)

The optional account that holds the reserve (non-minted) units of the asset. This address has no specific authority in the protocol itself and is informational.
Some standards like [ARC-19](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0019.md) rely on this field to hold meaningful data.
It is used in the case where you want to signal to holders of your asset that the non-minted units of the asset reside in an account that is different from the default creator account.
If not set at asset creation or subsequently set to empty by the manager the field is permanently empty.

#### Defined in

[src/types/asset.ts:49](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L49)

___

### skipSending

• `Optional` **skipSending**: `boolean`

Whether to skip signing and sending the transaction to the chain (default: transaction signed and sent to chain, unless `atc` specified)
and instead just return the raw transaction, e.g. so you can add it to a group of transactions

#### Inherited from

[SendTransactionParams](types_transaction.SendTransactionParams.md).[skipSending](types_transaction.SendTransactionParams.md#skipsending)

#### Defined in

[src/types/transaction.ts:32](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L32)

___

### skipWaiting

• `Optional` **skipWaiting**: `boolean`

Whether to skip waiting for the submitted transaction (only relevant if `skipSending` is `false` or unset)

#### Inherited from

[SendTransactionParams](types_transaction.SendTransactionParams.md).[skipWaiting](types_transaction.SendTransactionParams.md#skipwaiting)

#### Defined in

[src/types/transaction.ts:34](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L34)

___

### suppressLog

• `Optional` **suppressLog**: `boolean`

Whether to suppress log messages from transaction send, default: do not suppress

#### Inherited from

[SendTransactionParams](types_transaction.SendTransactionParams.md).[suppressLog](types_transaction.SendTransactionParams.md#suppresslog)

#### Defined in

[src/types/transaction.ts:38](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L38)

___

### total

• **total**: `number` \| `bigint`

The total number of base (decimal) units of the asset to create.
If decimal is, say, 2, then for every 100 `total` there would be 1 whole unit.
This field can only be specified upon asset creation.

#### Defined in

[src/types/asset.ts:17](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L17)

___

### transactionParams

• `Optional` **transactionParams**: `SuggestedParams`

Optional transaction parameters

#### Defined in

[src/types/asset.ts:62](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L62)

___

### unit

• `Optional` **unit**: `string`

The optional name of the unit of this asset. Max size is 8 bytes. This field can only be specified upon asset creation.

#### Defined in

[src/types/asset.ts:31](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L31)

___

### url

• `Optional` **url**: `string`

Specifies an optional URL where more information about the asset can be retrieved. Max size is 96 bytes.
This field can only be specified upon asset creation.

#### Defined in

[src/types/asset.ts:35](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L35)
