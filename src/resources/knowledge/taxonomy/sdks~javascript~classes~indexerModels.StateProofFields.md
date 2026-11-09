[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / StateProofFields

# Class: StateProofFields

[indexerModels](../modules/indexerModels.md).StateProofFields

(sp) represents a state proof.
Definition:
crypto/stateproof/structs.go : StateProof

## Hierarchy

- `default`

  ↳ **`StateProofFields`**

## Table of contents

### Constructors

- [constructor](indexerModels.StateProofFields.md#constructor)

### Properties

- [attribute\_map](indexerModels.StateProofFields.md#attribute_map)
- [partProofs](indexerModels.StateProofFields.md#partproofs)
- [positionsToReveal](indexerModels.StateProofFields.md#positionstoreveal)
- [reveals](indexerModels.StateProofFields.md#reveals)
- [saltVersion](indexerModels.StateProofFields.md#saltversion)
- [sigCommit](indexerModels.StateProofFields.md#sigcommit)
- [sigProofs](indexerModels.StateProofFields.md#sigproofs)
- [signedWeight](indexerModels.StateProofFields.md#signedweight)

### Methods

- [get\_obj\_for\_encoding](indexerModels.StateProofFields.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.StateProofFields.md#from_obj_for_encoding)

## Constructors

### constructor

• **new StateProofFields**(`«destructured»`)

Creates a new `StateProofFields` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `partProofs?` | [`MerkleArrayProof`](indexerModels.MerkleArrayProof.md) |
| › `positionsToReveal?` | (`number` \| `bigint`)[] |
| › `reveals?` | [`StateProofReveal`](indexerModels.StateProofReveal.md)[] |
| › `saltVersion?` | `number` \| `bigint` |
| › `sigCommit?` | `string` \| `Uint8Array` |
| › `sigProofs?` | [`MerkleArrayProof`](indexerModels.MerkleArrayProof.md) |
| › `signedWeight?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3515

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### partProofs

• `Optional` **partProofs**: [`MerkleArrayProof`](indexerModels.MerkleArrayProof.md)

(P)

#### Defined in

client/v2/indexer/models/types.ts:3471

___

### positionsToReveal

• `Optional` **positionsToReveal**: (`number` \| `bigint`)[]

(pr) Sequence of reveal positions.

#### Defined in

client/v2/indexer/models/types.ts:3476

___

### reveals

• `Optional` **reveals**: [`StateProofReveal`](indexerModels.StateProofReveal.md)[]

(r) Note that this is actually stored as a map[uint64] - Reveal in the actual
msgp

#### Defined in

client/v2/indexer/models/types.ts:3482

___

### saltVersion

• `Optional` **saltVersion**: `number` \| `bigint`

(v) Salt version of the merkle signature.

#### Defined in

client/v2/indexer/models/types.ts:3487

___

### sigCommit

• `Optional` **sigCommit**: `Uint8Array`

(c)

#### Defined in

client/v2/indexer/models/types.ts:3492

___

### sigProofs

• `Optional` **sigProofs**: [`MerkleArrayProof`](indexerModels.MerkleArrayProof.md)

(S)

#### Defined in

client/v2/indexer/models/types.ts:3497

___

### signedWeight

• `Optional` **signedWeight**: `number` \| `bigint`

(w)

#### Defined in

client/v2/indexer/models/types.ts:3502

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

▸ `Static` **from_obj_for_encoding**(`data`): [`StateProofFields`](indexerModels.StateProofFields.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`StateProofFields`](indexerModels.StateProofFields.md)

#### Defined in

client/v2/indexer/models/types.ts:3556
