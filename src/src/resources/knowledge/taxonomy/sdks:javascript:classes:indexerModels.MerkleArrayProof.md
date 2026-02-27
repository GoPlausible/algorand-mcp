[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / MerkleArrayProof

# Class: MerkleArrayProof

[indexerModels](../modules/indexerModels.md).MerkleArrayProof

## Hierarchy

- `default`

  ↳ **`MerkleArrayProof`**

## Table of contents

### Constructors

- [constructor](indexerModels.MerkleArrayProof.md#constructor)

### Properties

- [attribute\_map](indexerModels.MerkleArrayProof.md#attribute_map)
- [hashFactory](indexerModels.MerkleArrayProof.md#hashfactory)
- [path](indexerModels.MerkleArrayProof.md#path)
- [treeDepth](indexerModels.MerkleArrayProof.md#treedepth)

### Methods

- [get\_obj\_for\_encoding](indexerModels.MerkleArrayProof.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.MerkleArrayProof.md#from_obj_for_encoding)

## Constructors

### constructor

• **new MerkleArrayProof**(`«destructured»`)

Creates a new `MerkleArrayProof` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `hashFactory?` | [`HashFactory`](indexerModels.HashFactory.md) |
| › `path?` | `Uint8Array`[] |
| › `treeDepth?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3285

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### hashFactory

• `Optional` **hashFactory**: [`HashFactory`](indexerModels.HashFactory.md)

#### Defined in

client/v2/indexer/models/types.ts:3267

___

### path

• `Optional` **path**: `Uint8Array`[]

(pth)

#### Defined in

client/v2/indexer/models/types.ts:3272

___

### treeDepth

• `Optional` **treeDepth**: `number` \| `bigint`

(td)

#### Defined in

client/v2/indexer/models/types.ts:3277

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

▸ `Static` **from_obj_for_encoding**(`data`): [`MerkleArrayProof`](indexerModels.MerkleArrayProof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`MerkleArrayProof`](indexerModels.MerkleArrayProof.md)

#### Defined in

client/v2/indexer/models/types.ts:3307
