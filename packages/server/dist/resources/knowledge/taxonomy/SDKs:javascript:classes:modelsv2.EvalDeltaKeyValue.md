[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / EvalDeltaKeyValue

# Class: EvalDeltaKeyValue

[modelsv2](../modules/modelsv2.md).EvalDeltaKeyValue

Key-value pairs for StateDelta.

## Hierarchy

- `default`

  ↳ **`EvalDeltaKeyValue`**

## Table of contents

### Constructors

- [constructor](modelsv2.EvalDeltaKeyValue.md#constructor)

### Properties

- [attribute\_map](modelsv2.EvalDeltaKeyValue.md#attribute_map)
- [key](modelsv2.EvalDeltaKeyValue.md#key)
- [value](modelsv2.EvalDeltaKeyValue.md#value)

### Methods

- [get\_obj\_for\_encoding](modelsv2.EvalDeltaKeyValue.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.EvalDeltaKeyValue.md#from_obj_for_encoding)

## Constructors

### constructor

• **new EvalDeltaKeyValue**(`«destructured»`)

Creates a new `EvalDeltaKeyValue` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `key` | `string` |
| › `value` | [`EvalDelta`](modelsv2.EvalDelta.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:3216

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

client/v2/algod/models/types.ts:3204

___

### value

• **value**: [`EvalDelta`](modelsv2.EvalDelta.md)

Represents a TEAL value delta.

#### Defined in

client/v2/algod/models/types.ts:3209

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

▸ `Static` **from_obj_for_encoding**(`data`): [`EvalDeltaKeyValue`](modelsv2.EvalDeltaKeyValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`EvalDeltaKeyValue`](modelsv2.EvalDeltaKeyValue.md)

#### Defined in

client/v2/algod/models/types.ts:3228
