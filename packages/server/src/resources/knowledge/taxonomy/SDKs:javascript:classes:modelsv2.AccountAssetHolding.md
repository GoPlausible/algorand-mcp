[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / AccountAssetHolding

# Class: AccountAssetHolding

[modelsv2](../modules/modelsv2.md).AccountAssetHolding

AccountAssetHolding describes the account's asset holding and asset parameters
(if either exist) for a specific asset ID.

## Hierarchy

- `default`

  ↳ **`AccountAssetHolding`**

## Table of contents

### Constructors

- [constructor](modelsv2.AccountAssetHolding.md#constructor)

### Properties

- [assetHolding](modelsv2.AccountAssetHolding.md#assetholding)
- [assetParams](modelsv2.AccountAssetHolding.md#assetparams)
- [attribute\_map](modelsv2.AccountAssetHolding.md#attribute_map)

### Methods

- [get\_obj\_for\_encoding](modelsv2.AccountAssetHolding.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.AccountAssetHolding.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AccountAssetHolding**(`«destructured»`)

Creates a new `AccountAssetHolding` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `assetHolding` | [`AssetHolding`](modelsv2.AssetHolding.md) |
| › `assetParams?` | [`AssetParams`](modelsv2.AssetParams.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:548

## Properties

### assetHolding

• **assetHolding**: [`AssetHolding`](modelsv2.AssetHolding.md)

(asset) Details about the asset held by this account.
The raw account uses `AssetHolding` for this type.

#### Defined in

client/v2/algod/models/types.ts:533

___

### assetParams

• `Optional` **assetParams**: [`AssetParams`](modelsv2.AssetParams.md)

(apar) parameters of the asset held by this account.
The raw account uses `AssetParams` for this type.

#### Defined in

client/v2/algod/models/types.ts:539

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AccountAssetHolding`](modelsv2.AccountAssetHolding.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AccountAssetHolding`](modelsv2.AccountAssetHolding.md)

#### Defined in

client/v2/algod/models/types.ts:566
