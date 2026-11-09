[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / BlockResponse

# Class: BlockResponse

[modelsv2](../modules/modelsv2.md).BlockResponse

Encoded block object.

## Hierarchy

- `default`

  ↳ **`BlockResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.BlockResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.BlockResponse.md#attribute_map)
- [block](modelsv2.BlockResponse.md#block)
- [cert](modelsv2.BlockResponse.md#cert)

### Methods

- [get\_obj\_for\_encoding](modelsv2.BlockResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.BlockResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new BlockResponse**(`«destructured»`)

Creates a new `BlockResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `block` | `default` |
| › `cert?` | `Record`\<`string`, `any`\> |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2161

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### block

• **block**: `default`

Block header data.

#### Defined in

client/v2/algod/models/types.ts:2147

___

### cert

• `Optional` **cert**: `Record`\<`string`, `any`\>

Optional certificate object. This is only included when the format is set to
message pack.

#### Defined in

client/v2/algod/models/types.ts:2153

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

▸ `Static` **from_obj_for_encoding**(`data`): [`BlockResponse`](modelsv2.BlockResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`BlockResponse`](modelsv2.BlockResponse.md)

#### Defined in

client/v2/algod/models/types.ts:2179
