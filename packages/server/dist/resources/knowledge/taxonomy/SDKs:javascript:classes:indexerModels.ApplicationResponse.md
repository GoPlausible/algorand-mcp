[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / ApplicationResponse

# Class: ApplicationResponse

[indexerModels](../modules/indexerModels.md).ApplicationResponse

## Hierarchy

- `default`

  ↳ **`ApplicationResponse`**

## Table of contents

### Constructors

- [constructor](indexerModels.ApplicationResponse.md#constructor)

### Properties

- [application](indexerModels.ApplicationResponse.md#application)
- [attribute\_map](indexerModels.ApplicationResponse.md#attribute_map)
- [currentRound](indexerModels.ApplicationResponse.md#currentround)

### Methods

- [get\_obj\_for\_encoding](indexerModels.ApplicationResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.ApplicationResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ApplicationResponse**(`«destructured»`)

Creates a new `ApplicationResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `application?` | [`Application`](indexerModels.Application.md) |
| › `currentRound` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:1312

## Properties

### application

• `Optional` **application**: [`Application`](indexerModels.Application.md)

Application index and its parameters

#### Defined in

client/v2/indexer/models/types.ts:1305

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### currentRound

• **currentRound**: `number` \| `bigint`

Round at which the results were computed.

#### Defined in

client/v2/indexer/models/types.ts:1300

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ApplicationResponse`](indexerModels.ApplicationResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ApplicationResponse`](indexerModels.ApplicationResponse.md)

#### Defined in

client/v2/indexer/models/types.ts:1330
