[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / PendingTransactionsResponse

# Class: PendingTransactionsResponse

[modelsv2](../modules/modelsv2.md).PendingTransactionsResponse

A potentially truncated list of transactions currently in the node's transaction
pool. You can compute whether or not the list is truncated if the number of
elements in the **top-transactions** array is fewer than **total-transactions**.

## Hierarchy

- `default`

  ↳ **`PendingTransactionsResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.PendingTransactionsResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.PendingTransactionsResponse.md#attribute_map)
- [topTransactions](modelsv2.PendingTransactionsResponse.md#toptransactions)
- [totalTransactions](modelsv2.PendingTransactionsResponse.md#totaltransactions)

### Methods

- [get\_obj\_for\_encoding](modelsv2.PendingTransactionsResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.PendingTransactionsResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new PendingTransactionsResponse**(`«destructured»`)

Creates a new `PendingTransactionsResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `topTransactions` | [`EncodedSignedTransaction`](../interfaces/EncodedSignedTransaction.md)[] |
| › `totalTransactions` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4080

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### topTransactions

• **topTransactions**: [`EncodedSignedTransaction`](../interfaces/EncodedSignedTransaction.md)[]

An array of signed transaction objects.

#### Defined in

client/v2/algod/models/types.ts:4068

___

### totalTransactions

• **totalTransactions**: `number` \| `bigint`

Total number of transactions in the pool.

#### Defined in

client/v2/algod/models/types.ts:4073

## Methods

### get\_obj\_for\_encoding

▸ **get_obj_for_encoding**(`binary?`): `Record`\<`string`, `any`\>

Get an object ready for encoding to either JSON or msgpack.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `binary` | `boolean` | `false` | Use true to indicate that the encoding can handle raw binary objects (Uint8Arrays). Use false to indicate that raw binary objects should be converted to base64 strings. True should be used for objects that will be encoded with msgpack, and false should be used for objects that will be encoded with JSON. |

#### Returns

`Record`\<`string`, `any`\>

#### Inherited from

BaseModel.get\_obj\_for\_encoding

#### Defined in

client/v2/basemodel.ts:65

___

### from\_obj\_for\_encoding

▸ `Static` **from_obj_for_encoding**(`data`): [`PendingTransactionsResponse`](modelsv2.PendingTransactionsResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`PendingTransactionsResponse`](modelsv2.PendingTransactionsResponse.md)

#### Defined in

client/v2/algod/models/types.ts:4098
