[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / ApplicationLocalState

# Class: ApplicationLocalState

[modelsv2](../modules/modelsv2.md).ApplicationLocalState

Stores local state associated with an application.

## Hierarchy

- `default`

  ↳ **`ApplicationLocalState`**

## Table of contents

### Constructors

- [constructor](modelsv2.ApplicationLocalState.md#constructor)

### Properties

- [attribute\_map](modelsv2.ApplicationLocalState.md#attribute_map)
- [id](modelsv2.ApplicationLocalState.md#id)
- [keyValue](modelsv2.ApplicationLocalState.md#keyvalue)
- [schema](modelsv2.ApplicationLocalState.md#schema)

### Methods

- [get\_obj\_for\_encoding](modelsv2.ApplicationLocalState.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.ApplicationLocalState.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ApplicationLocalState**(`«destructured»`)

Creates a new `ApplicationLocalState` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `id` | `number` \| `bigint` |
| › `keyValue?` | [`TealKeyValue`](modelsv2.TealKeyValue.md)[] |
| › `schema` | [`ApplicationStateSchema`](modelsv2.ApplicationStateSchema.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:1220

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### id

• **id**: `number` \| `bigint`

The application which this local state is for.

#### Defined in

client/v2/algod/models/types.ts:1202

___

### keyValue

• `Optional` **keyValue**: [`TealKeyValue`](modelsv2.TealKeyValue.md)[]

(tkv) storage.

#### Defined in

client/v2/algod/models/types.ts:1212

___

### schema

• **schema**: [`ApplicationStateSchema`](modelsv2.ApplicationStateSchema.md)

(hsch) schema.

#### Defined in

client/v2/algod/models/types.ts:1207

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ApplicationLocalState`](modelsv2.ApplicationLocalState.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ApplicationLocalState`](modelsv2.ApplicationLocalState.md)

#### Defined in

client/v2/algod/models/types.ts:1242
