[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / ErrorResponse

# Class: ErrorResponse

[modelsv2](../modules/modelsv2.md).ErrorResponse

An error response with optional data field.

## Hierarchy

- `default`

  ↳ **`ErrorResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.ErrorResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.ErrorResponse.md#attribute_map)
- [data](modelsv2.ErrorResponse.md#data)
- [message](modelsv2.ErrorResponse.md#message)

### Methods

- [get\_obj\_for\_encoding](modelsv2.ErrorResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.ErrorResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ErrorResponse**(`«destructured»`)

Creates a new `ErrorResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `data?` | `Record`\<`string`, `any`\> |
| › `message` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:3110

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### data

• `Optional` **data**: `Record`\<`string`, `any`\>

#### Defined in

client/v2/algod/models/types.ts:3103

___

### message

• **message**: `string`

#### Defined in

client/v2/algod/models/types.ts:3101

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ErrorResponse`](modelsv2.ErrorResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ErrorResponse`](modelsv2.ErrorResponse.md)

#### Defined in

client/v2/algod/models/types.ts:3128
