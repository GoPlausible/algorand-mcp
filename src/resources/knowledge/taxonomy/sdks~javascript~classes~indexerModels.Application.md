[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / Application

# Class: Application

[indexerModels](../modules/indexerModels.md).Application

Application index and its parameters

## Hierarchy

- `default`

  ↳ **`Application`**

## Table of contents

### Constructors

- [constructor](indexerModels.Application.md#constructor)

### Properties

- [attribute\_map](indexerModels.Application.md#attribute_map)
- [createdAtRound](indexerModels.Application.md#createdatround)
- [deleted](indexerModels.Application.md#deleted)
- [deletedAtRound](indexerModels.Application.md#deletedatround)
- [id](indexerModels.Application.md#id)
- [params](indexerModels.Application.md#params)

### Methods

- [get\_obj\_for\_encoding](indexerModels.Application.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.Application.md#from_obj_for_encoding)

## Constructors

### constructor

• **new Application**(`«destructured»`)

Creates a new `Application` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `createdAtRound?` | `number` \| `bigint` |
| › `deleted?` | `boolean` |
| › `deletedAtRound?` | `number` \| `bigint` |
| › `id` | `number` \| `bigint` |
| › `params` | [`ApplicationParams`](indexerModels.ApplicationParams.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:816

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### createdAtRound

• `Optional` **createdAtRound**: `number` \| `bigint`

Round when this application was created.

#### Defined in

client/v2/indexer/models/types.ts:796

___

### deleted

• `Optional` **deleted**: `boolean`

Whether or not this application is currently deleted.

#### Defined in

client/v2/indexer/models/types.ts:801

___

### deletedAtRound

• `Optional` **deletedAtRound**: `number` \| `bigint`

Round when this application was deleted.

#### Defined in

client/v2/indexer/models/types.ts:806

___

### id

• **id**: `number` \| `bigint`

application index.

#### Defined in

client/v2/indexer/models/types.ts:786

___

### params

• **params**: [`ApplicationParams`](indexerModels.ApplicationParams.md)

application parameters.

#### Defined in

client/v2/indexer/models/types.ts:791

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

▸ `Static` **from_obj_for_encoding**(`data`): [`Application`](indexerModels.Application.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`Application`](indexerModels.Application.md)

#### Defined in

client/v2/indexer/models/types.ts:846
