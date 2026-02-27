[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / TealValue

# Class: TealValue

[modelsv2](../modules/modelsv2.md).TealValue

Represents a TEAL value.

## Hierarchy

- `default`

  ↳ **`TealValue`**

## Table of contents

### Constructors

- [constructor](modelsv2.TealValue.md#constructor)

### Properties

- [attribute\_map](modelsv2.TealValue.md#attribute_map)
- [bytes](modelsv2.TealValue.md#bytes)
- [type](modelsv2.TealValue.md#type)
- [uint](modelsv2.TealValue.md#uint)

### Methods

- [get\_obj\_for\_encoding](modelsv2.TealValue.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.TealValue.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TealValue**(`«destructured»`)

Creates a new `TealValue` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `bytes` | `string` |
| › `type` | `number` \| `bigint` |
| › `uint` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:5685

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### bytes

• **bytes**: `string`

(tb) bytes value.

#### Defined in

client/v2/algod/models/types.ts:5672

___

### type

• **type**: `number` \| `bigint`

(tt) value type. Value `1` refers to **bytes**, value `2` refers to **uint**

#### Defined in

client/v2/algod/models/types.ts:5667

___

### uint

• **uint**: `number` \| `bigint`

(ui) uint value.

#### Defined in

client/v2/algod/models/types.ts:5677

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TealValue`](modelsv2.TealValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TealValue`](modelsv2.TealValue.md)

#### Defined in

client/v2/algod/models/types.ts:5707
