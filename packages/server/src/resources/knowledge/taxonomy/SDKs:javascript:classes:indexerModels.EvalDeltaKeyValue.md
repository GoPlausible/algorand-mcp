[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / EvalDeltaKeyValue

# Class: EvalDeltaKeyValue

[indexerModels](../modules/indexerModels.md).EvalDeltaKeyValue

Key-value pairs for StateDelta.

## Hierarchy

- `default`

  ↳ **`EvalDeltaKeyValue`**

## Table of contents

### Constructors

- [constructor](indexerModels.EvalDeltaKeyValue.md#constructor)

### Properties

- [attribute\_map](indexerModels.EvalDeltaKeyValue.md#attribute_map)
- [key](indexerModels.EvalDeltaKeyValue.md#key)
- [value](indexerModels.EvalDeltaKeyValue.md#value)

### Methods

- [get\_obj\_for\_encoding](indexerModels.EvalDeltaKeyValue.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.EvalDeltaKeyValue.md#from_obj_for_encoding)

## Constructors

### constructor

• **new EvalDeltaKeyValue**(`«destructured»`)

Creates a new `EvalDeltaKeyValue` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `key` | `string` |
| › `value` | [`EvalDelta`](indexerModels.EvalDelta.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3028

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

client/v2/indexer/models/types.ts:3016

___

### value

• **value**: [`EvalDelta`](indexerModels.EvalDelta.md)

Represents a TEAL value delta.

#### Defined in

client/v2/indexer/models/types.ts:3021

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

▸ `Static` **from_obj_for_encoding**(`data`): [`EvalDeltaKeyValue`](indexerModels.EvalDeltaKeyValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`EvalDeltaKeyValue`](indexerModels.EvalDeltaKeyValue.md)

#### Defined in

client/v2/indexer/models/types.ts:3040
