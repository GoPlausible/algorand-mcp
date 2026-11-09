[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / BoxReference

# Class: BoxReference

[modelsv2](../modules/modelsv2.md).BoxReference

References a box of an application.

## Hierarchy

- `default`

  ↳ **`BoxReference`**

## Table of contents

### Constructors

- [constructor](modelsv2.BoxReference.md#constructor)

### Properties

- [app](modelsv2.BoxReference.md#app)
- [attribute\_map](modelsv2.BoxReference.md#attribute_map)
- [name](modelsv2.BoxReference.md#name)

### Methods

- [get\_obj\_for\_encoding](modelsv2.BoxReference.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.BoxReference.md#from_obj_for_encoding)

## Constructors

### constructor

• **new BoxReference**(`«destructured»`)

Creates a new `BoxReference` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `app` | `number` \| `bigint` |
| › `name` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2353

## Properties

### app

• **app**: `number` \| `bigint`

Application ID which this box belongs to

#### Defined in

client/v2/algod/models/types.ts:2341

___

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

client/v2/algod/models/types.ts:2346

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

▸ `Static` **from_obj_for_encoding**(`data`): [`BoxReference`](modelsv2.BoxReference.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`BoxReference`](modelsv2.BoxReference.md)

#### Defined in

client/v2/algod/models/types.ts:2374
