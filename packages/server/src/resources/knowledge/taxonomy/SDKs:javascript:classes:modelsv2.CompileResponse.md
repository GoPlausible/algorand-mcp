[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / CompileResponse

# Class: CompileResponse

[modelsv2](../modules/modelsv2.md).CompileResponse

Teal compile Result

## Hierarchy

- `default`

  ↳ **`CompileResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.CompileResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.CompileResponse.md#attribute_map)
- [hash](modelsv2.CompileResponse.md#hash)
- [result](modelsv2.CompileResponse.md#result)
- [sourcemap](modelsv2.CompileResponse.md#sourcemap)

### Methods

- [get\_obj\_for\_encoding](modelsv2.CompileResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.CompileResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new CompileResponse**(`«destructured»`)

Creates a new `CompileResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `hash` | `string` |
| › `result` | `string` |
| › `sourcemap?` | `Record`\<`string`, `any`\> |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2532

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### hash

• **hash**: `string`

base32 SHA512_256 of program bytes (Address style)

#### Defined in

client/v2/algod/models/types.ts:2514

___

### result

• **result**: `string`

base64 encoded program bytes

#### Defined in

client/v2/algod/models/types.ts:2519

___

### sourcemap

• `Optional` **sourcemap**: `Record`\<`string`, `any`\>

JSON of the source map

#### Defined in

client/v2/algod/models/types.ts:2524

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

▸ `Static` **from_obj_for_encoding**(`data`): [`CompileResponse`](modelsv2.CompileResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`CompileResponse`](modelsv2.CompileResponse.md)

#### Defined in

client/v2/algod/models/types.ts:2554
