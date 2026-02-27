[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionsResponse

# Class: TransactionsResponse

[indexerModels](../modules/indexerModels.md).TransactionsResponse

## Hierarchy

- `default`

  ↳ **`TransactionsResponse`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionsResponse.md#constructor)

### Properties

- [attribute\_map](indexerModels.TransactionsResponse.md#attribute_map)
- [currentRound](indexerModels.TransactionsResponse.md#currentround)
- [nextToken](indexerModels.TransactionsResponse.md#nexttoken)
- [transactions](indexerModels.TransactionsResponse.md#transactions)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionsResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionsResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionsResponse**(`«destructured»`)

Creates a new `TransactionsResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `currentRound` | `number` \| `bigint` |
| › `nextToken?` | `string` |
| › `transactions` | [`Transaction`](indexerModels.Transaction.md)[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:5741

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### currentRound

• **currentRound**: `number` \| `bigint`

Round at which the results were computed.

#### Defined in

client/v2/indexer/models/types.ts:5724

___

### nextToken

• `Optional` **nextToken**: `string`

Used for pagination, when making another request provide this token with the
next parameter.

#### Defined in

client/v2/indexer/models/types.ts:5732

___

### transactions

• **transactions**: [`Transaction`](indexerModels.Transaction.md)[]

#### Defined in

client/v2/indexer/models/types.ts:5726

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionsResponse`](indexerModels.TransactionsResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionsResponse`](indexerModels.TransactionsResponse.md)

#### Defined in

client/v2/indexer/models/types.ts:5763
