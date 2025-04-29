[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / AccountAssetsInformationResponse

# Class: AccountAssetsInformationResponse

[modelsv2](../modules/modelsv2.md).AccountAssetsInformationResponse

AccountAssetsInformationResponse contains a list of assets held by an account.

## Hierarchy

- `default`

  ↳ **`AccountAssetsInformationResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.AccountAssetsInformationResponse.md#constructor)

### Properties

- [assetHoldings](modelsv2.AccountAssetsInformationResponse.md#assetholdings)
- [attribute\_map](modelsv2.AccountAssetsInformationResponse.md#attribute_map)
- [nextToken](modelsv2.AccountAssetsInformationResponse.md#nexttoken)
- [round](modelsv2.AccountAssetsInformationResponse.md#round)

### Methods

- [get\_obj\_for\_encoding](modelsv2.AccountAssetsInformationResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.AccountAssetsInformationResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AccountAssetsInformationResponse**(`«destructured»`)

Creates a new `AccountAssetsInformationResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `assetHoldings?` | [`AccountAssetHolding`](modelsv2.AccountAssetHolding.md)[] |
| › `nextToken?` | `string` |
| › `round` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:681

## Properties

### assetHoldings

• `Optional` **assetHoldings**: [`AccountAssetHolding`](modelsv2.AccountAssetHolding.md)[]

#### Defined in

client/v2/algod/models/types.ts:666

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### nextToken

• `Optional` **nextToken**: `string`

Used for pagination, when making another request provide this token with the
next parameter.

#### Defined in

client/v2/algod/models/types.ts:672

___

### round

• **round**: `number` \| `bigint`

The round for which this information is relevant.

#### Defined in

client/v2/algod/models/types.ts:664

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AccountAssetsInformationResponse`](modelsv2.AccountAssetsInformationResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AccountAssetsInformationResponse`](modelsv2.AccountAssetsInformationResponse.md)

#### Defined in

client/v2/algod/models/types.ts:703
