[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionStateProof

# Class: TransactionStateProof

[indexerModels](../modules/indexerModels.md).TransactionStateProof

Fields for a state proof transaction.
Definition:
data/transactions/stateproof.go : StateProofTxnFields

## Hierarchy

- `default`

  ↳ **`TransactionStateProof`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionStateProof.md#constructor)

### Properties

- [attribute\_map](indexerModels.TransactionStateProof.md#attribute_map)
- [message](indexerModels.TransactionStateProof.md#message)
- [stateProof](indexerModels.TransactionStateProof.md#stateproof)
- [stateProofType](indexerModels.TransactionStateProof.md#stateprooftype)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionStateProof.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionStateProof.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionStateProof**(`«destructured»`)

Creates a new `TransactionStateProof` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `message?` | [`IndexerStateProofMessage`](indexerModels.IndexerStateProofMessage.md) |
| › `stateProof?` | [`StateProofFields`](indexerModels.StateProofFields.md) |
| › `stateProofType?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:5676

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### message

• `Optional` **message**: [`IndexerStateProofMessage`](indexerModels.IndexerStateProofMessage.md)

(spmsg)

#### Defined in

client/v2/indexer/models/types.ts:5652

___

### stateProof

• `Optional` **stateProof**: [`StateProofFields`](indexerModels.StateProofFields.md)

(sp) represents a state proof.
Definition:
crypto/stateproof/structs.go : StateProof

#### Defined in

client/v2/indexer/models/types.ts:5659

___

### stateProofType

• `Optional` **stateProofType**: `number` \| `bigint`

(sptype) Type of the state proof. Integer representing an entry defined in
protocol/stateproof.go

#### Defined in

client/v2/indexer/models/types.ts:5665

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionStateProof`](indexerModels.TransactionStateProof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionStateProof`](indexerModels.TransactionStateProof.md)

#### Defined in

client/v2/indexer/models/types.ts:5698
