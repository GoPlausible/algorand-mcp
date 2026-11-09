[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / ErrorResponse

# Class: ErrorResponse

[indexerModels](../modules/indexerModels.md).ErrorResponse

Response for errors

## Hierarchy

- `default`

  ↳ **`ErrorResponse`**

## Table of contents

### Constructors

- [constructor](indexerModels.ErrorResponse.md#constructor)

### Properties

- [attribute\_map](indexerModels.ErrorResponse.md#attribute_map)
- [data](indexerModels.ErrorResponse.md#data)
- [message](indexerModels.ErrorResponse.md#message)

### Methods

- [get\_obj\_for\_encoding](indexerModels.ErrorResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.ErrorResponse.md#from_obj_for_encoding)

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

client/v2/indexer/models/types.ts:2922

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

client/v2/indexer/models/types.ts:2915

___

### message

• **message**: `string`

#### Defined in

client/v2/indexer/models/types.ts:2913

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ErrorResponse`](indexerModels.ErrorResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ErrorResponse`](indexerModels.ErrorResponse.md)

#### Defined in

client/v2/indexer/models/types.ts:2940
