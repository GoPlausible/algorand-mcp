[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / TealKeyValue

# Class: TealKeyValue

[modelsv2](../modules/modelsv2.md).TealKeyValue

Represents a key-value pair in an application store.

## Hierarchy

- `default`

  ↳ **`TealKeyValue`**

## Table of contents

### Constructors

- [constructor](modelsv2.TealKeyValue.md#constructor)

### Properties

- [attribute\_map](modelsv2.TealKeyValue.md#attribute_map)
- [key](modelsv2.TealKeyValue.md#key)
- [value](modelsv2.TealKeyValue.md#value)

### Methods

- [get\_obj\_for\_encoding](modelsv2.TealKeyValue.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.TealKeyValue.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TealKeyValue**(`«destructured»`)

Creates a new `TealKeyValue` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `key` | `string` |
| › `value` | [`TealValue`](modelsv2.TealValue.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:5634

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### key

• **key**: `string`

#### Defined in

client/v2/algod/models/types.ts:5622

___

### value

• **value**: [`TealValue`](modelsv2.TealValue.md)

Represents a TEAL value.

#### Defined in

client/v2/algod/models/types.ts:5627

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TealKeyValue`](modelsv2.TealKeyValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TealKeyValue`](modelsv2.TealKeyValue.md)

#### Defined in

client/v2/algod/models/types.ts:5646
