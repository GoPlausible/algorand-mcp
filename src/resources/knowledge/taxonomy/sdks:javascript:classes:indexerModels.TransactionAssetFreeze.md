[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionAssetFreeze

# Class: TransactionAssetFreeze

[indexerModels](../modules/indexerModels.md).TransactionAssetFreeze

Fields for an asset freeze transaction.
Definition:
data/transactions/asset.go : AssetFreezeTxnFields

## Hierarchy

- `default`

  ↳ **`TransactionAssetFreeze`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionAssetFreeze.md#constructor)

### Properties

- [address](indexerModels.TransactionAssetFreeze.md#address)
- [assetId](indexerModels.TransactionAssetFreeze.md#assetid)
- [attribute\_map](indexerModels.TransactionAssetFreeze.md#attribute_map)
- [newFreezeStatus](indexerModels.TransactionAssetFreeze.md#newfreezestatus)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionAssetFreeze.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionAssetFreeze.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionAssetFreeze**(`«destructured»`)

Creates a new `TransactionAssetFreeze` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `address` | `string` |
| › `assetId` | `number` \| `bigint` |
| › `newFreezeStatus` | `boolean` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:4943

## Properties

### address

• **address**: `string`

(fadd) Address of the account whose asset is being frozen or thawed.

#### Defined in

client/v2/indexer/models/types.ts:4925

___

### assetId

• **assetId**: `number` \| `bigint`

(faid) ID of the asset being frozen or thawed.

#### Defined in

client/v2/indexer/models/types.ts:4930

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### newFreezeStatus

• **newFreezeStatus**: `boolean`

(afrz) The new freeze status.

#### Defined in

client/v2/indexer/models/types.ts:4935

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionAssetFreeze`](indexerModels.TransactionAssetFreeze.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionAssetFreeze`](indexerModels.TransactionAssetFreeze.md)

#### Defined in

client/v2/indexer/models/types.ts:4965
