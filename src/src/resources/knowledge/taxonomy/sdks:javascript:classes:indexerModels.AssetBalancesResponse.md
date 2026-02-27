[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / AssetBalancesResponse

# Class: AssetBalancesResponse

[indexerModels](../modules/indexerModels.md).AssetBalancesResponse

## Hierarchy

- `default`

  ↳ **`AssetBalancesResponse`**

## Table of contents

### Constructors

- [constructor](indexerModels.AssetBalancesResponse.md#constructor)

### Properties

- [attribute\_map](indexerModels.AssetBalancesResponse.md#attribute_map)
- [balances](indexerModels.AssetBalancesResponse.md#balances)
- [currentRound](indexerModels.AssetBalancesResponse.md#currentround)
- [nextToken](indexerModels.AssetBalancesResponse.md#nexttoken)

### Methods

- [get\_obj\_for\_encoding](indexerModels.AssetBalancesResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.AssetBalancesResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AssetBalancesResponse**(`«destructured»`)

Creates a new `AssetBalancesResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `balances` | [`MiniAssetHolding`](indexerModels.MiniAssetHolding.md)[] |
| › `currentRound` | `number` \| `bigint` |
| › `nextToken?` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:1583

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### balances

• **balances**: [`MiniAssetHolding`](indexerModels.MiniAssetHolding.md)[]

#### Defined in

client/v2/indexer/models/types.ts:1563

___

### currentRound

• **currentRound**: `number` \| `bigint`

Round at which the results were computed.

#### Defined in

client/v2/indexer/models/types.ts:1568

___

### nextToken

• `Optional` **nextToken**: `string`

Used for pagination, when making another request provide this token with the
next parameter.

#### Defined in

client/v2/indexer/models/types.ts:1574

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AssetBalancesResponse`](indexerModels.AssetBalancesResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AssetBalancesResponse`](indexerModels.AssetBalancesResponse.md)

#### Defined in

client/v2/indexer/models/types.ts:1605
