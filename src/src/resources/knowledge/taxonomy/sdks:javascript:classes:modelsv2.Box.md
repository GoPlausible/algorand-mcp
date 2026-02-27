[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / Box

# Class: Box

[modelsv2](../modules/modelsv2.md).Box

Box name and its content.

## Hierarchy

- `default`

  ↳ **`Box`**

## Table of contents

### Constructors

- [constructor](modelsv2.Box.md#constructor)

### Properties

- [attribute\_map](modelsv2.Box.md#attribute_map)
- [name](modelsv2.Box.md#name)
- [round](modelsv2.Box.md#round)
- [value](modelsv2.Box.md#value)

### Methods

- [get\_obj\_for\_encoding](modelsv2.Box.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.Box.md#from_obj_for_encoding)

## Constructors

### constructor

• **new Box**(`«destructured»`)

Creates a new `Box` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `name` | `string` \| `Uint8Array` |
| › `round` | `number` \| `bigint` |
| › `value` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2252

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### name

• **name**: `Uint8Array`

(name) box name, base64 encoded

#### Defined in

client/v2/algod/models/types.ts:2234

___

### round

• **round**: `number` \| `bigint`

The round for which this information is relevant

#### Defined in

client/v2/algod/models/types.ts:2239

___

### value

• **value**: `Uint8Array`

(value) box value, base64 encoded.

#### Defined in

client/v2/algod/models/types.ts:2244

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

▸ `Static` **from_obj_for_encoding**(`data`): [`Box`](modelsv2.Box.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`Box`](modelsv2.Box.md)

#### Defined in

client/v2/algod/models/types.ts:2280
