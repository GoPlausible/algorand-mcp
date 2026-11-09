[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / EvalDelta

# Class: EvalDelta

[modelsv2](../modules/modelsv2.md).EvalDelta

Represents a TEAL value delta.

## Hierarchy

- `default`

  ↳ **`EvalDelta`**

## Table of contents

### Constructors

- [constructor](modelsv2.EvalDelta.md#constructor)

### Properties

- [action](modelsv2.EvalDelta.md#action)
- [attribute\_map](modelsv2.EvalDelta.md#attribute_map)
- [bytes](modelsv2.EvalDelta.md#bytes)
- [uint](modelsv2.EvalDelta.md#uint)

### Methods

- [get\_obj\_for\_encoding](modelsv2.EvalDelta.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.EvalDelta.md#from_obj_for_encoding)

## Constructors

### constructor

• **new EvalDelta**(`«destructured»`)

Creates a new `EvalDelta` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `action` | `number` \| `bigint` |
| › `bytes?` | `string` |
| › `uint?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:3165

## Properties

### action

• **action**: `number` \| `bigint`

(at) delta action.

#### Defined in

client/v2/algod/models/types.ts:3147

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### bytes

• `Optional` **bytes**: `string`

(bs) bytes value.

#### Defined in

client/v2/algod/models/types.ts:3152

___

### uint

• `Optional` **uint**: `number` \| `bigint`

(ui) uint value.

#### Defined in

client/v2/algod/models/types.ts:3157

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

▸ `Static` **from_obj_for_encoding**(`data`): [`EvalDelta`](modelsv2.EvalDelta.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`EvalDelta`](modelsv2.EvalDelta.md)

#### Defined in

client/v2/algod/models/types.ts:3187
