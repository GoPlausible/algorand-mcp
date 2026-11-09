[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / AssetHoldingsResponse

# Class: AssetHoldingsResponse

[indexerModels](../modules/indexerModels.md).AssetHoldingsResponse

## Hierarchy

- `default`

  ↳ **`AssetHoldingsResponse`**

## Table of contents

### Constructors

- [constructor](indexerModels.AssetHoldingsResponse.md#constructor)

### Properties

- [assets](indexerModels.AssetHoldingsResponse.md#assets)
- [attribute\_map](indexerModels.AssetHoldingsResponse.md#attribute_map)
- [currentRound](indexerModels.AssetHoldingsResponse.md#currentround)
- [nextToken](indexerModels.AssetHoldingsResponse.md#nexttoken)

### Methods

- [get\_obj\_for\_encoding](indexerModels.AssetHoldingsResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.AssetHoldingsResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AssetHoldingsResponse**(`«destructured»`)

Creates a new `AssetHoldingsResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `assets` | [`AssetHolding`](indexerModels.AssetHolding.md)[] |
| › `currentRound` | `number` \| `bigint` |
| › `nextToken?` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:1751

## Properties

### assets

• **assets**: [`AssetHolding`](indexerModels.AssetHolding.md)[]

#### Defined in

client/v2/indexer/models/types.ts:1731

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

client/v2/indexer/models/types.ts:1736

___

### nextToken

• `Optional` **nextToken**: `string`

Used for pagination, when making another request provide this token with the
next parameter.

#### Defined in

client/v2/indexer/models/types.ts:1742

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AssetHoldingsResponse`](indexerModels.AssetHoldingsResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AssetHoldingsResponse`](indexerModels.AssetHoldingsResponse.md)

#### Defined in

client/v2/indexer/models/types.ts:1773
