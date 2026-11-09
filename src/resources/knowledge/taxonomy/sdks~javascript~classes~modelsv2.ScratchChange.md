[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / ScratchChange

# Class: ScratchChange

[modelsv2](../modules/modelsv2.md).ScratchChange

A write operation into a scratch slot.

## Hierarchy

- `default`

  ↳ **`ScratchChange`**

## Table of contents

### Constructors

- [constructor](modelsv2.ScratchChange.md#constructor)

### Properties

- [attribute\_map](modelsv2.ScratchChange.md#attribute_map)
- [newValue](modelsv2.ScratchChange.md#newvalue)
- [slot](modelsv2.ScratchChange.md#slot)

### Methods

- [get\_obj\_for\_encoding](modelsv2.ScratchChange.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.ScratchChange.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ScratchChange**(`«destructured»`)

Creates a new `ScratchChange` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `newValue` | [`AvmValue`](modelsv2.AvmValue.md) |
| › `slot` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4173

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### newValue

• **newValue**: [`AvmValue`](modelsv2.AvmValue.md)

Represents an AVM value.

#### Defined in

client/v2/algod/models/types.ts:4161

___

### slot

• **slot**: `number` \| `bigint`

The scratch slot written.

#### Defined in

client/v2/algod/models/types.ts:4166

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ScratchChange`](modelsv2.ScratchChange.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ScratchChange`](modelsv2.ScratchChange.md)

#### Defined in

client/v2/algod/models/types.ts:4191
