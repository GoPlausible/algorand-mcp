[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / Asset

# Class: Asset

[indexerModels](../modules/indexerModels.md).Asset

Specifies both the unique identifier and the parameters for an asset

## Hierarchy

- `default`

  ↳ **`Asset`**

## Table of contents

### Constructors

- [constructor](indexerModels.Asset.md#constructor)

### Properties

- [attribute\_map](indexerModels.Asset.md#attribute_map)
- [createdAtRound](indexerModels.Asset.md#createdatround)
- [deleted](indexerModels.Asset.md#deleted)
- [destroyedAtRound](indexerModels.Asset.md#destroyedatround)
- [index](indexerModels.Asset.md#index)
- [params](indexerModels.Asset.md#params)

### Methods

- [get\_obj\_for\_encoding](indexerModels.Asset.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.Asset.md#from_obj_for_encoding)

## Constructors

### constructor

• **new Asset**(`«destructured»`)

Creates a new `Asset` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `createdAtRound?` | `number` \| `bigint` |
| › `deleted?` | `boolean` |
| › `destroyedAtRound?` | `number` \| `bigint` |
| › `index` | `number` \| `bigint` |
| › `params` | [`AssetParams`](indexerModels.AssetParams.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:1512

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

Round during which this asset was created.

#### Defined in

client/v2/indexer/models/types.ts:1489

___

### deleted

• `Optional` **deleted**: `boolean`

Whether or not this asset is currently deleted.

#### Defined in

client/v2/indexer/models/types.ts:1494

___

### destroyedAtRound

• `Optional` **destroyedAtRound**: `number` \| `bigint`

Round during which this asset was destroyed.

#### Defined in

client/v2/indexer/models/types.ts:1499

___

### index

• **index**: `number` \| `bigint`

unique asset identifier

#### Defined in

client/v2/indexer/models/types.ts:1476

___

### params

• **params**: [`AssetParams`](indexerModels.AssetParams.md)

AssetParams specifies the parameters for an asset.
(apar) when part of an AssetConfig transaction.
Definition:
data/transactions/asset.go : AssetParams

#### Defined in

client/v2/indexer/models/types.ts:1484

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

▸ `Static` **from_obj_for_encoding**(`data`): [`Asset`](indexerModels.Asset.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`Asset`](indexerModels.Asset.md)

#### Defined in

client/v2/indexer/models/types.ts:1542
