[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionResponse

# Class: TransactionResponse

[indexerModels](../modules/indexerModels.md).TransactionResponse

## Hierarchy

- `default`

  ↳ **`TransactionResponse`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionResponse.md#constructor)

### Properties

- [attribute\_map](indexerModels.TransactionResponse.md#attribute_map)
- [currentRound](indexerModels.TransactionResponse.md#currentround)
- [transaction](indexerModels.TransactionResponse.md#transaction)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionResponse**(`«destructured»`)

Creates a new `TransactionResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `currentRound` | `number` \| `bigint` |
| › `transaction` | [`Transaction`](indexerModels.Transaction.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:5318

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

client/v2/indexer/models/types.ts:5298

___

### transaction

• **transaction**: [`Transaction`](indexerModels.Transaction.md)

Contains all fields common to all transactions and serves as an envelope to all
transactions type. Represents both regular and inner transactions.
Definition:
data/transactions/signedtxn.go : SignedTxn
data/transactions/transaction.go : Transaction

#### Defined in

client/v2/indexer/models/types.ts:5307

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionResponse`](indexerModels.TransactionResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionResponse`](indexerModels.TransactionResponse.md)

#### Defined in

client/v2/indexer/models/types.ts:5336
