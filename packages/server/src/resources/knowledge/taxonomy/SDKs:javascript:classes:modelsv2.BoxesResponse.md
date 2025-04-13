[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / BoxesResponse

# Class: BoxesResponse

[modelsv2](../modules/modelsv2.md).BoxesResponse

Box names of an application

## Hierarchy

- `default`

  ↳ **`BoxesResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.BoxesResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.BoxesResponse.md#attribute_map)
- [boxes](modelsv2.BoxesResponse.md#boxes)

### Methods

- [get\_obj\_for\_encoding](modelsv2.BoxesResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.BoxesResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new BoxesResponse**(`boxes`)

Creates a new `BoxesResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `boxes` | `Object` |
| `boxes.boxes` | [`BoxDescriptor`](modelsv2.BoxDescriptor.md)[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2398

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### boxes

• **boxes**: [`BoxDescriptor`](modelsv2.BoxDescriptor.md)[]

#### Defined in

client/v2/algod/models/types.ts:2392

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

▸ `Static` **from_obj_for_encoding**(`data`): [`BoxesResponse`](modelsv2.BoxesResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`BoxesResponse`](modelsv2.BoxesResponse.md)

#### Defined in

client/v2/algod/models/types.ts:2408
