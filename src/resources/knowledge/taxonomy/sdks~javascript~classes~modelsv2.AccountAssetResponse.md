[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / AccountAssetResponse

# Class: AccountAssetResponse

[modelsv2](../modules/modelsv2.md).AccountAssetResponse

AccountAssetResponse describes the account's asset holding and asset parameters
(if either exist) for a specific asset ID. Asset parameters will only be
returned if the provided address is the asset's creator.

## Hierarchy

- `default`

  ↳ **`AccountAssetResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.AccountAssetResponse.md#constructor)

### Properties

- [assetHolding](modelsv2.AccountAssetResponse.md#assetholding)
- [attribute\_map](modelsv2.AccountAssetResponse.md#attribute_map)
- [createdAsset](modelsv2.AccountAssetResponse.md#createdasset)
- [round](modelsv2.AccountAssetResponse.md#round)

### Methods

- [get\_obj\_for\_encoding](modelsv2.AccountAssetResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.AccountAssetResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AccountAssetResponse**(`«destructured»`)

Creates a new `AccountAssetResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `assetHolding?` | [`AssetHolding`](modelsv2.AssetHolding.md) |
| › `createdAsset?` | [`AssetParams`](modelsv2.AssetParams.md) |
| › `round` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:614

## Properties

### assetHolding

• `Optional` **assetHolding**: [`AssetHolding`](modelsv2.AssetHolding.md)

(asset) Details about the asset held by this account.
The raw account uses `AssetHolding` for this type.

#### Defined in

client/v2/algod/models/types.ts:598

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### createdAsset

• `Optional` **createdAsset**: [`AssetParams`](modelsv2.AssetParams.md)

(apar) parameters of the asset created by this account.
The raw account uses `AssetParams` for this type.

#### Defined in

client/v2/algod/models/types.ts:604

___

### round

• **round**: `number` \| `bigint`

The round for which this information is relevant.

#### Defined in

client/v2/algod/models/types.ts:592

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AccountAssetResponse`](modelsv2.AccountAssetResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AccountAssetResponse`](modelsv2.AccountAssetResponse.md)

#### Defined in

client/v2/algod/models/types.ts:636
