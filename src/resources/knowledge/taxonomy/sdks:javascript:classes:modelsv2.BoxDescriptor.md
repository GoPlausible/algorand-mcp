[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / BoxDescriptor

# Class: BoxDescriptor

[modelsv2](../modules/modelsv2.md).BoxDescriptor

Box descriptor describes a Box.

## Hierarchy

- `default`

  ↳ **`BoxDescriptor`**

## Table of contents

### Constructors

- [constructor](modelsv2.BoxDescriptor.md#constructor)

### Properties

- [attribute\_map](modelsv2.BoxDescriptor.md#attribute_map)
- [name](modelsv2.BoxDescriptor.md#name)

### Methods

- [get\_obj\_for\_encoding](modelsv2.BoxDescriptor.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.BoxDescriptor.md#from_obj_for_encoding)

## Constructors

### constructor

• **new BoxDescriptor**(`name`)

Creates a new `BoxDescriptor` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `Object` | Base64 encoded box name |
| `name.name` | `string` \| `Uint8Array` | - |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2310

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

Base64 encoded box name

#### Defined in

client/v2/algod/models/types.ts:2304

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

▸ `Static` **from_obj_for_encoding**(`data`): [`BoxDescriptor`](modelsv2.BoxDescriptor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`BoxDescriptor`](modelsv2.BoxDescriptor.md)

#### Defined in

client/v2/algod/models/types.ts:2323
