[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionAssetConfig

# Class: TransactionAssetConfig

[indexerModels](../modules/indexerModels.md).TransactionAssetConfig

Fields for asset allocation, re-configuration, and destruction.
A zero value for asset-id indicates asset creation.
A zero value for the params indicates asset destruction.
Definition:
data/transactions/asset.go : AssetConfigTxnFields

## Hierarchy

- `default`

  ↳ **`TransactionAssetConfig`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionAssetConfig.md#constructor)

### Properties

- [assetId](indexerModels.TransactionAssetConfig.md#assetid)
- [attribute\_map](indexerModels.TransactionAssetConfig.md#attribute_map)
- [params](indexerModels.TransactionAssetConfig.md#params)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionAssetConfig.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionAssetConfig.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionAssetConfig**(`«destructured»`)

Creates a new `TransactionAssetConfig` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `assetId?` | `number` \| `bigint` |
| › `params?` | [`AssetParams`](indexerModels.AssetParams.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:4883

## Properties

### assetId

• `Optional` **assetId**: `number` \| `bigint`

(xaid) ID of the asset being configured or empty if creating.

#### Defined in

client/v2/indexer/models/types.ts:4865

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### params

• `Optional` **params**: [`AssetParams`](indexerModels.AssetParams.md)

AssetParams specifies the parameters for an asset.
(apar) when part of an AssetConfig transaction.
Definition:
data/transactions/asset.go : AssetParams

#### Defined in

client/v2/indexer/models/types.ts:4873

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionAssetConfig`](indexerModels.TransactionAssetConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionAssetConfig`](indexerModels.TransactionAssetConfig.md)

#### Defined in

client/v2/indexer/models/types.ts:4901
