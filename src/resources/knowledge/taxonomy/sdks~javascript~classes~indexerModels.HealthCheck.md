[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / HealthCheck

# Class: HealthCheck

[indexerModels](../modules/indexerModels.md).HealthCheck

A health check response.

## Hierarchy

- `default`

  ↳ **`HealthCheck`**

## Table of contents

### Constructors

- [constructor](indexerModels.HealthCheck.md#constructor)

### Properties

- [attribute\_map](indexerModels.HealthCheck.md#attribute_map)
- [data](indexerModels.HealthCheck.md#data)
- [dbAvailable](indexerModels.HealthCheck.md#dbavailable)
- [errors](indexerModels.HealthCheck.md#errors)
- [isMigrating](indexerModels.HealthCheck.md#ismigrating)
- [message](indexerModels.HealthCheck.md#message)
- [round](indexerModels.HealthCheck.md#round)
- [version](indexerModels.HealthCheck.md#version)

### Methods

- [get\_obj\_for\_encoding](indexerModels.HealthCheck.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.HealthCheck.md#from_obj_for_encoding)

## Constructors

### constructor

• **new HealthCheck**(`«destructured»`)

Creates a new `HealthCheck` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `data?` | `Record`\<`string`, `any`\> |
| › `dbAvailable` | `boolean` |
| › `errors?` | `string`[] |
| › `isMigrating` | `boolean` |
| › `message` | `string` |
| › `round` | `number` \| `bigint` |
| › `version` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3114

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

client/v2/indexer/models/types.ts:3100

___

### dbAvailable

• **dbAvailable**: `boolean`

#### Defined in

client/v2/indexer/models/types.ts:3087

___

### errors

• `Optional` **errors**: `string`[]

#### Defined in

client/v2/indexer/models/types.ts:3102

___

### isMigrating

• **isMigrating**: `boolean`

#### Defined in

client/v2/indexer/models/types.ts:3089

___

### message

• **message**: `string`

#### Defined in

client/v2/indexer/models/types.ts:3091

___

### round

• **round**: `number` \| `bigint`

#### Defined in

client/v2/indexer/models/types.ts:3093

___

### version

• **version**: `string`

Current version.

#### Defined in

client/v2/indexer/models/types.ts:3098

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

▸ `Static` **from_obj_for_encoding**(`data`): [`HealthCheck`](indexerModels.HealthCheck.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`HealthCheck`](indexerModels.HealthCheck.md)

#### Defined in

client/v2/indexer/models/types.ts:3152
