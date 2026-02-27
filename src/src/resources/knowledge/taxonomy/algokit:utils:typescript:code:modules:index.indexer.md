[@algorandfoundation/algokit-utils](../README.md) / [index](index.md) / indexer

# Namespace: indexer

[index](index.md).indexer

## Table of contents

### Type Aliases

- [SearchForTransactions](index.indexer.md#searchfortransactions)

### Functions

- [executePaginatedRequest](index.indexer.md#executepaginatedrequest)
- [lookupAccountByAddress](index.indexer.md#lookupaccountbyaddress)
- [lookupAccountCreatedApplicationByAddress](index.indexer.md#lookupaccountcreatedapplicationbyaddress)
- [lookupAssetHoldings](index.indexer.md#lookupassetholdings)
- [lookupTransactionById](index.indexer.md#lookuptransactionbyid)
- [searchTransactions](index.indexer.md#searchtransactions)

## Type Aliases

### SearchForTransactions

Ƭ **SearchForTransactions**: `ReturnType`\<`Indexer`[``"searchForTransactions"``]\>

#### Defined in

[src/indexer-lookup.ts:4](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/indexer-lookup.ts#L4)

## Functions

### executePaginatedRequest

▸ **executePaginatedRequest**\<`TResult`, `TRequest`\>(`extractItems`, `buildRequest`): `Promise`\<`TResult`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TResult` | `TResult` |
| `TRequest` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `extractItems` | (`response`: `any`) => `TResult`[] |
| `buildRequest` | (`nextToken?`: `string`) => `TRequest` |

#### Returns

`Promise`\<`TResult`[]\>

#### Defined in

[src/indexer-lookup.ts:145](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/indexer-lookup.ts#L145)

___

### lookupAccountByAddress

▸ **lookupAccountByAddress**(`accountAddress`, `indexer`): `Promise`\<`AccountResponse`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountAddress` | `string` \| `Address` | The address of the account to look up |
| `indexer` | `IndexerClient` | An indexer client |

#### Returns

`Promise`\<`AccountResponse`\>

The result of the look-up

**`Deprecated`**

Use `indexer.lookupAccountByID(accountAddress).do()`.
Looks up an account by address using Indexer.

#### Defined in

[src/indexer-lookup.ts:26](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/indexer-lookup.ts#L26)

___

### lookupAccountCreatedApplicationByAddress

▸ **lookupAccountCreatedApplicationByAddress**(`indexer`, `address`, `getAll?`, `paginationLimit?`): `Promise`\<`algosdk.indexerModels.Application`[]\>

Looks up applications that were created by the given address; will automatically paginate through all data.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `indexer` | `IndexerClient` | `undefined` | An indexer instance |
| `address` | `string` \| `Address` | `undefined` | The address of the creator to look up |
| `getAll` | `undefined` \| `boolean` | `undefined` | Whether or not to include deleted applications |
| `paginationLimit?` | `number` | `undefined` | The number of records to return per paginated request, default 1000 |

#### Returns

`Promise`\<`algosdk.indexerModels.Application`[]\>

The list of application results

#### Defined in

[src/indexer-lookup.ts:38](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/indexer-lookup.ts#L38)

___

### lookupAssetHoldings

▸ **lookupAssetHoldings**(`indexer`, `assetId`, `options?`, `paginationLimit?`): `Promise`\<`algosdk.indexerModels.MiniAssetHolding`[]\>

Looks up asset holdings for the given asset; will automatically paginate through all data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `indexer` | `IndexerClient` | An indexer instance |
| `assetId` | `number` \| `bigint` | The ID of the asset to look up holdings for |
| `options?` | [`LookupAssetHoldingsOptions`](../interfaces/types_indexer.LookupAssetHoldingsOptions.md) | Optional options to control the lookup |
| `paginationLimit?` | `number` | The number of records to return per paginated request, default 1000 |

#### Returns

`Promise`\<`algosdk.indexerModels.MiniAssetHolding`[]\>

The list of application results

#### Defined in

[src/indexer-lookup.ts:72](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/indexer-lookup.ts#L72)

___

### lookupTransactionById

▸ **lookupTransactionById**(`transactionId`, `indexer`): `Promise`\<`TransactionResponse`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The ID of the transaction to look up |
| `indexer` | `IndexerClient` | An indexer client |

#### Returns

`Promise`\<`TransactionResponse`\>

The result of the look-up

**`Deprecated`**

Use `indexer.lookupTransactionByID(transactionId).do()`.
Looks up a transaction by ID using Indexer.

#### Defined in

[src/indexer-lookup.ts:15](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/indexer-lookup.ts#L15)

___

### searchTransactions

▸ **searchTransactions**(`indexer`, `searchCriteria`, `paginationLimit?`): `Promise`\<`algosdk.indexerModels.TransactionsResponse`\>

Allows transactions to be searched for the given criteria.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `indexer` | `IndexerClient` | An indexer client |
| `searchCriteria` | (`s`: `default`) => `default` | The criteria to search for |
| `paginationLimit?` | `number` | The number of records to return per paginated request, default 1000 |

#### Returns

`Promise`\<`algosdk.indexerModels.TransactionsResponse`\>

The search results

#### Defined in

[src/indexer-lookup.ts:111](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/indexer-lookup.ts#L111)
