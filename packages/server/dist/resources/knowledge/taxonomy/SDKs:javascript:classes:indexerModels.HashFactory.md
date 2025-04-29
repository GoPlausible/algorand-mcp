[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / HashFactory

# Class: HashFactory

[indexerModels](../modules/indexerModels.md).HashFactory

## Hierarchy

- `default`

  ↳ **`HashFactory`**

## Table of contents

### Constructors

- [constructor](indexerModels.HashFactory.md#constructor)

### Properties

- [attribute\_map](indexerModels.HashFactory.md#attribute_map)
- [hashType](indexerModels.HashFactory.md#hashtype)

### Methods

- [get\_obj\_for\_encoding](indexerModels.HashFactory.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.HashFactory.md#from_obj_for_encoding)

## Constructors

### constructor

• **new HashFactory**(`hashType`)

Creates a new `HashFactory` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hashType` | `Object` | (t) |
| `hashType.hashType?` | `number` \| `bigint` | - |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3064

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### hashType

• `Optional` **hashType**: `number` \| `bigint`

(t)

#### Defined in

client/v2/indexer/models/types.ts:3058

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

▸ `Static` **from_obj_for_encoding**(`data`): [`HashFactory`](indexerModels.HashFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`HashFactory`](indexerModels.HashFactory.md)

#### Defined in

client/v2/indexer/models/types.ts:3074
