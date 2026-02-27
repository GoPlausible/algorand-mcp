[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / ApplicationsResponse

# Class: ApplicationsResponse

[indexerModels](../modules/indexerModels.md).ApplicationsResponse

## Hierarchy

- `default`

  ↳ **`ApplicationsResponse`**

## Table of contents

### Constructors

- [constructor](indexerModels.ApplicationsResponse.md#constructor)

### Properties

- [applications](indexerModels.ApplicationsResponse.md#applications)
- [attribute\_map](indexerModels.ApplicationsResponse.md#attribute_map)
- [currentRound](indexerModels.ApplicationsResponse.md#currentround)
- [nextToken](indexerModels.ApplicationsResponse.md#nexttoken)

### Methods

- [get\_obj\_for\_encoding](indexerModels.ApplicationsResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.ApplicationsResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ApplicationsResponse**(`«destructured»`)

Creates a new `ApplicationsResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `applications` | [`Application`](indexerModels.Application.md)[] |
| › `currentRound` | `number` \| `bigint` |
| › `nextToken?` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:1426

## Properties

### applications

• **applications**: [`Application`](indexerModels.Application.md)[]

#### Defined in

client/v2/indexer/models/types.ts:1406

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

client/v2/indexer/models/types.ts:1411

___

### nextToken

• `Optional` **nextToken**: `string`

Used for pagination, when making another request provide this token with the
next parameter.

#### Defined in

client/v2/indexer/models/types.ts:1417

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ApplicationsResponse`](indexerModels.ApplicationsResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ApplicationsResponse`](indexerModels.ApplicationsResponse.md)

#### Defined in

client/v2/indexer/models/types.ts:1448
