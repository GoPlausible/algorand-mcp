[@algorandfoundation/algokit-utils](../README.md) / [types/indexer](../modules/types_indexer.md) / LookupAssetHoldingsOptions

# Interface: LookupAssetHoldingsOptions

[types/indexer](../modules/types_indexer.md).LookupAssetHoldingsOptions

Options when looking up an asset's account holdings, https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assetsasset-idbalances

## Table of contents

### Properties

- [currencyGreaterThan](types_indexer.LookupAssetHoldingsOptions.md#currencygreaterthan)
- [currencyLessThan](types_indexer.LookupAssetHoldingsOptions.md#currencylessthan)
- [includeAll](types_indexer.LookupAssetHoldingsOptions.md#includeall)

## Properties

### currencyGreaterThan

• `Optional` **currencyGreaterThan**: `number` \| `bigint`

Results should have a decimal units amount greater than this value.

#### Defined in

[src/types/indexer.ts:27](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/indexer.ts#L27)

___

### currencyLessThan

• `Optional` **currencyLessThan**: `number` \| `bigint`

Results should have a decimal units amount less than this value.

#### Defined in

[src/types/indexer.ts:25](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/indexer.ts#L25)

___

### includeAll

• `Optional` **includeAll**: `boolean`

Include all items including closed accounts and opted-out asset holdings.

#### Defined in

[src/types/indexer.ts:29](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/indexer.ts#L29)
