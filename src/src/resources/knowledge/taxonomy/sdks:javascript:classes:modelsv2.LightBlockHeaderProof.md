[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / LightBlockHeaderProof

# Class: LightBlockHeaderProof

[modelsv2](../modules/modelsv2.md).LightBlockHeaderProof

Proof of membership and position of a light block header.

## Hierarchy

- `default`

  ↳ **`LightBlockHeaderProof`**

## Table of contents

### Constructors

- [constructor](modelsv2.LightBlockHeaderProof.md#constructor)

### Properties

- [attribute\_map](modelsv2.LightBlockHeaderProof.md#attribute_map)
- [index](modelsv2.LightBlockHeaderProof.md#index)
- [proof](modelsv2.LightBlockHeaderProof.md#proof)
- [treedepth](modelsv2.LightBlockHeaderProof.md#treedepth)

### Methods

- [get\_obj\_for\_encoding](modelsv2.LightBlockHeaderProof.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.LightBlockHeaderProof.md#from_obj_for_encoding)

## Constructors

### constructor

• **new LightBlockHeaderProof**(`«destructured»`)

Creates a new `LightBlockHeaderProof` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `index` | `number` \| `bigint` |
| › `proof` | `string` \| `Uint8Array` |
| › `treedepth` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:3441

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### index

• **index**: `number` \| `bigint`

The index of the light block header in the vector commitment tree

#### Defined in

client/v2/algod/models/types.ts:3421

___

### proof

• **proof**: `Uint8Array`

The encoded proof.

#### Defined in

client/v2/algod/models/types.ts:3426

___

### treedepth

• **treedepth**: `number` \| `bigint`

Represents the depth of the tree that is being proven, i.e. the number of edges
from a leaf to the root.

#### Defined in

client/v2/algod/models/types.ts:3432

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

▸ `Static` **from_obj_for_encoding**(`data`): [`LightBlockHeaderProof`](modelsv2.LightBlockHeaderProof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`LightBlockHeaderProof`](modelsv2.LightBlockHeaderProof.md)

#### Defined in

client/v2/algod/models/types.ts:3466
