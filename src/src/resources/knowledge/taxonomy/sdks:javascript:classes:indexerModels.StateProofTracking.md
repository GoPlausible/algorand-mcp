[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / StateProofTracking

# Class: StateProofTracking

[indexerModels](../modules/indexerModels.md).StateProofTracking

## Hierarchy

- `default`

  ↳ **`StateProofTracking`**

## Table of contents

### Constructors

- [constructor](indexerModels.StateProofTracking.md#constructor)

### Properties

- [attribute\_map](indexerModels.StateProofTracking.md#attribute_map)
- [nextRound](indexerModels.StateProofTracking.md#nextround)
- [onlineTotalWeight](indexerModels.StateProofTracking.md#onlinetotalweight)
- [type](indexerModels.StateProofTracking.md#type)
- [votersCommitment](indexerModels.StateProofTracking.md#voterscommitment)

### Methods

- [get\_obj\_for\_encoding](indexerModels.StateProofTracking.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.StateProofTracking.md#from_obj_for_encoding)

## Constructors

### constructor

• **new StateProofTracking**(`«destructured»`)

Creates a new `StateProofTracking` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `nextRound?` | `number` \| `bigint` |
| › `onlineTotalWeight?` | `number` \| `bigint` |
| › `type?` | `number` \| `bigint` |
| › `votersCommitment?` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3834

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### nextRound

• `Optional` **nextRound**: `number` \| `bigint`

(n) Next round for which we will accept a state proof transaction.

#### Defined in

client/v2/indexer/models/types.ts:3806

___

### onlineTotalWeight

• `Optional` **onlineTotalWeight**: `number` \| `bigint`

(t) The total number of microalgos held by the online accounts during the
StateProof round.

#### Defined in

client/v2/indexer/models/types.ts:3812

___

### type

• `Optional` **type**: `number` \| `bigint`

State Proof Type. Note the raw object uses map with this as key.

#### Defined in

client/v2/indexer/models/types.ts:3817

___

### votersCommitment

• `Optional` **votersCommitment**: `Uint8Array`

(v) Root of a vector commitment containing online accounts that will help sign
the proof.

#### Defined in

client/v2/indexer/models/types.ts:3823

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

▸ `Static` **from_obj_for_encoding**(`data`): [`StateProofTracking`](indexerModels.StateProofTracking.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`StateProofTracking`](indexerModels.StateProofTracking.md)

#### Defined in

client/v2/indexer/models/types.ts:3863
