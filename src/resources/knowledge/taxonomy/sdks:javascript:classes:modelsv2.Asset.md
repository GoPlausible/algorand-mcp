[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / Asset

# Class: Asset

[modelsv2](../modules/modelsv2.md).Asset

Specifies both the unique identifier and the parameters for an asset

## Hierarchy

- `default`

  ↳ **`Asset`**

## Table of contents

### Constructors

- [constructor](modelsv2.Asset.md#constructor)

### Properties

- [attribute\_map](modelsv2.Asset.md#attribute_map)
- [index](modelsv2.Asset.md#index)
- [params](modelsv2.Asset.md#params)

### Methods

- [get\_obj\_for\_encoding](modelsv2.Asset.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.Asset.md#from_obj_for_encoding)

## Constructors

### constructor

• **new Asset**(`«destructured»`)

Creates a new `Asset` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `index` | `number` \| `bigint` |
| › `params` | [`AssetParams`](modelsv2.AssetParams.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:1577

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### index

• **index**: `number` \| `bigint`

unique asset identifier

#### Defined in

client/v2/algod/models/types.ts:1559

___

### params

• **params**: [`AssetParams`](modelsv2.AssetParams.md)

AssetParams specifies the parameters for an asset.
(apar) when part of an AssetConfig transaction.
Definition:
data/transactions/asset.go : AssetParams

#### Defined in

client/v2/algod/models/types.ts:1567

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

▸ `Static` **from_obj_for_encoding**(`data`): [`Asset`](modelsv2.Asset.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`Asset`](modelsv2.Asset.md)

#### Defined in

client/v2/algod/models/types.ts:1595
