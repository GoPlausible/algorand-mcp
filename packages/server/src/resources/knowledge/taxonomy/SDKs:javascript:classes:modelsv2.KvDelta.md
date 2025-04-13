[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / KvDelta

# Class: KvDelta

[modelsv2](../modules/modelsv2.md).KvDelta

A single Delta containing the key, the previous value and the current value for
a single round.

## Hierarchy

- `default`

  ↳ **`KvDelta`**

## Table of contents

### Constructors

- [constructor](modelsv2.KvDelta.md#constructor)

### Properties

- [attribute\_map](modelsv2.KvDelta.md#attribute_map)
- [key](modelsv2.KvDelta.md#key)
- [value](modelsv2.KvDelta.md#value)

### Methods

- [get\_obj\_for\_encoding](modelsv2.KvDelta.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.KvDelta.md#from_obj_for_encoding)

## Constructors

### constructor

• **new KvDelta**(`«destructured»`)

Creates a new `KvDelta` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `key?` | `string` \| `Uint8Array` |
| › `value?` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:3334

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### key

• `Optional` **key**: `Uint8Array`

The key, base64 encoded.

#### Defined in

client/v2/algod/models/types.ts:3322

___

### value

• `Optional` **value**: `Uint8Array`

The new value of the KV store entry, base64 encoded.

#### Defined in

client/v2/algod/models/types.ts:3327

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

▸ `Static` **from_obj_for_encoding**(`data`): [`KvDelta`](modelsv2.KvDelta.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`KvDelta`](modelsv2.KvDelta.md)

#### Defined in

client/v2/algod/models/types.ts:3358
