[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / ApplicationLocalState

# Class: ApplicationLocalState

[indexerModels](../modules/indexerModels.md).ApplicationLocalState

Stores local state associated with an application.

## Hierarchy

- `default`

  ↳ **`ApplicationLocalState`**

## Table of contents

### Constructors

- [constructor](indexerModels.ApplicationLocalState.md#constructor)

### Properties

- [attribute\_map](indexerModels.ApplicationLocalState.md#attribute_map)
- [closedOutAtRound](indexerModels.ApplicationLocalState.md#closedoutatround)
- [deleted](indexerModels.ApplicationLocalState.md#deleted)
- [id](indexerModels.ApplicationLocalState.md#id)
- [keyValue](indexerModels.ApplicationLocalState.md#keyvalue)
- [optedInAtRound](indexerModels.ApplicationLocalState.md#optedinatround)
- [schema](indexerModels.ApplicationLocalState.md#schema)

### Methods

- [get\_obj\_for\_encoding](indexerModels.ApplicationLocalState.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.ApplicationLocalState.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ApplicationLocalState**(`«destructured»`)

Creates a new `ApplicationLocalState` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `closedOutAtRound?` | `number` \| `bigint` |
| › `deleted?` | `boolean` |
| › `id` | `number` \| `bigint` |
| › `keyValue?` | [`TealKeyValue`](indexerModels.TealKeyValue.md)[] |
| › `optedInAtRound?` | `number` \| `bigint` |
| › `schema` | [`ApplicationStateSchema`](indexerModels.ApplicationStateSchema.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:908

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### closedOutAtRound

• `Optional` **closedOutAtRound**: `number` \| `bigint`

Round when account closed out of the application.

#### Defined in

client/v2/indexer/models/types.ts:880

___

### deleted

• `Optional` **deleted**: `boolean`

Whether or not the application local state is currently deleted from its
account.

#### Defined in

client/v2/indexer/models/types.ts:886

___

### id

• **id**: `number` \| `bigint`

The application which this local state is for.

#### Defined in

client/v2/indexer/models/types.ts:870

___

### keyValue

• `Optional` **keyValue**: [`TealKeyValue`](indexerModels.TealKeyValue.md)[]

storage.

#### Defined in

client/v2/indexer/models/types.ts:891

___

### optedInAtRound

• `Optional` **optedInAtRound**: `number` \| `bigint`

Round when the account opted into the application.

#### Defined in

client/v2/indexer/models/types.ts:896

___

### schema

• **schema**: [`ApplicationStateSchema`](indexerModels.ApplicationStateSchema.md)

schema.

#### Defined in

client/v2/indexer/models/types.ts:875

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ApplicationLocalState`](indexerModels.ApplicationLocalState.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ApplicationLocalState`](indexerModels.ApplicationLocalState.md)

#### Defined in

client/v2/indexer/models/types.ts:942
