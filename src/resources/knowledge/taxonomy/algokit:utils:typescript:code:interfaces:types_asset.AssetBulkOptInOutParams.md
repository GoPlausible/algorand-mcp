[@algorandfoundation/algokit-utils](../README.md) / [types/asset](../modules/types_asset.md) / AssetBulkOptInOutParams

# Interface: AssetBulkOptInOutParams

[types/asset](../modules/types_asset.md).AssetBulkOptInOutParams

**`Deprecated`**

Parameters for `assetBulkOptIn` / `assetBulkOptOut` call.

## Table of contents

### Properties

- [account](types_asset.AssetBulkOptInOutParams.md#account)
- [assetIds](types_asset.AssetBulkOptInOutParams.md#assetids)
- [maxFee](types_asset.AssetBulkOptInOutParams.md#maxfee)
- [note](types_asset.AssetBulkOptInOutParams.md#note)
- [suppressLog](types_asset.AssetBulkOptInOutParams.md#suppresslog)
- [transactionParams](types_asset.AssetBulkOptInOutParams.md#transactionparams)
- [validateBalances](types_asset.AssetBulkOptInOutParams.md#validatebalances)

## Properties

### account

• **account**: [`SendTransactionFrom`](../modules/types_transaction.md#sendtransactionfrom)

The account to opt in/out for

#### Defined in

[src/types/asset.ts:94](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L94)

___

### assetIds

• **assetIds**: `number`[]

The IDs of the assets to opt in for / out of

#### Defined in

[src/types/asset.ts:96](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L96)

___

### maxFee

• `Optional` **maxFee**: [`AlgoAmount`](../classes/types_amount.AlgoAmount.md)

The maximum fee that you are happy to pay per transaction (default: unbounded) - if this is set it's possible the transaction could get rejected during network congestion

#### Defined in

[src/types/asset.ts:104](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L104)

___

### note

• `Optional` **note**: [`TransactionNote`](../modules/types_transaction.md#transactionnote)

The (optional) transaction note

#### Defined in

[src/types/asset.ts:102](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L102)

___

### suppressLog

• `Optional` **suppressLog**: `boolean`

Whether to suppress log messages from transaction send, default: do not suppress

#### Defined in

[src/types/asset.ts:106](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L106)

___

### transactionParams

• `Optional` **transactionParams**: `SuggestedParams`

Optional transaction parameters

#### Defined in

[src/types/asset.ts:100](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L100)

___

### validateBalances

• `Optional` **validateBalances**: `boolean`

Whether or not to validate the opt-in/out is valid before issuing transactions; default = true

#### Defined in

[src/types/asset.ts:98](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/asset.ts#L98)
