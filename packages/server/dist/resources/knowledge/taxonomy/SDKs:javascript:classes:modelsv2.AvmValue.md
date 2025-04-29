[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / AvmValue

# Class: AvmValue

[modelsv2](../modules/modelsv2.md).AvmValue

Represents an AVM value.

## Hierarchy

- `default`

  ↳ **`AvmValue`**

## Table of contents

### Constructors

- [constructor](modelsv2.AvmValue.md#constructor)

### Properties

- [attribute\_map](modelsv2.AvmValue.md#attribute_map)
- [bytes](modelsv2.AvmValue.md#bytes)
- [type](modelsv2.AvmValue.md#type)
- [uint](modelsv2.AvmValue.md#uint)

### Methods

- [get\_obj\_for\_encoding](modelsv2.AvmValue.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.AvmValue.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AvmValue**(`«destructured»`)

Creates a new `AvmValue` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `bytes?` | `string` \| `Uint8Array` |
| › `type` | `number` \| `bigint` |
| › `uint?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2027

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### bytes

• `Optional` **bytes**: `Uint8Array`

bytes value.

#### Defined in

client/v2/algod/models/types.ts:2014

___

### type

• **type**: `number` \| `bigint`

value type. Value `1` refers to **bytes**, value `2` refers to **uint64**

#### Defined in

client/v2/algod/models/types.ts:2009

___

### uint

• `Optional` **uint**: `number` \| `bigint`

uint value.

#### Defined in

client/v2/algod/models/types.ts:2019

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AvmValue`](modelsv2.AvmValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AvmValue`](modelsv2.AvmValue.md)

#### Defined in

client/v2/algod/models/types.ts:2052
