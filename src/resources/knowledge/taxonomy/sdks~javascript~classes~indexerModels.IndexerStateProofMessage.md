[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / IndexerStateProofMessage

# Class: IndexerStateProofMessage

[indexerModels](../modules/indexerModels.md).IndexerStateProofMessage

## Hierarchy

- `default`

  ↳ **`IndexerStateProofMessage`**

## Table of contents

### Constructors

- [constructor](indexerModels.IndexerStateProofMessage.md#constructor)

### Properties

- [attribute\_map](indexerModels.IndexerStateProofMessage.md#attribute_map)
- [blockHeadersCommitment](indexerModels.IndexerStateProofMessage.md#blockheaderscommitment)
- [firstAttestedRound](indexerModels.IndexerStateProofMessage.md#firstattestedround)
- [latestAttestedRound](indexerModels.IndexerStateProofMessage.md#latestattestedround)
- [lnProvenWeight](indexerModels.IndexerStateProofMessage.md#lnprovenweight)
- [votersCommitment](indexerModels.IndexerStateProofMessage.md#voterscommitment)

### Methods

- [get\_obj\_for\_encoding](indexerModels.IndexerStateProofMessage.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.IndexerStateProofMessage.md#from_obj_for_encoding)

## Constructors

### constructor

• **new IndexerStateProofMessage**(`«destructured»`)

Creates a new `IndexerStateProofMessage` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `blockHeadersCommitment?` | `string` \| `Uint8Array` |
| › `firstAttestedRound?` | `number` \| `bigint` |
| › `latestAttestedRound?` | `number` \| `bigint` |
| › `lnProvenWeight?` | `number` \| `bigint` |
| › `votersCommitment?` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3215

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### blockHeadersCommitment

• `Optional` **blockHeadersCommitment**: `Uint8Array`

(b)

#### Defined in

client/v2/indexer/models/types.ts:3185

___

### firstAttestedRound

• `Optional` **firstAttestedRound**: `number` \| `bigint`

(f)

#### Defined in

client/v2/indexer/models/types.ts:3190

___

### latestAttestedRound

• `Optional` **latestAttestedRound**: `number` \| `bigint`

(l)

#### Defined in

client/v2/indexer/models/types.ts:3195

___

### lnProvenWeight

• `Optional` **lnProvenWeight**: `number` \| `bigint`

(P)

#### Defined in

client/v2/indexer/models/types.ts:3200

___

### votersCommitment

• `Optional` **votersCommitment**: `Uint8Array`

(v)

#### Defined in

client/v2/indexer/models/types.ts:3205

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

▸ `Static` **from_obj_for_encoding**(`data`): [`IndexerStateProofMessage`](indexerModels.IndexerStateProofMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`IndexerStateProofMessage`](indexerModels.IndexerStateProofMessage.md)

#### Defined in

client/v2/indexer/models/types.ts:3251
