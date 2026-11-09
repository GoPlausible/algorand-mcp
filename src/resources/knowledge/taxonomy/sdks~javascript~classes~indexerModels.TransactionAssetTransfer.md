[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionAssetTransfer

# Class: TransactionAssetTransfer

[indexerModels](../modules/indexerModels.md).TransactionAssetTransfer

Fields for an asset transfer transaction.
Definition:
data/transactions/asset.go : AssetTransferTxnFields

## Hierarchy

- `default`

  ↳ **`TransactionAssetTransfer`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionAssetTransfer.md#constructor)

### Properties

- [amount](indexerModels.TransactionAssetTransfer.md#amount)
- [assetId](indexerModels.TransactionAssetTransfer.md#assetid)
- [attribute\_map](indexerModels.TransactionAssetTransfer.md#attribute_map)
- [closeAmount](indexerModels.TransactionAssetTransfer.md#closeamount)
- [closeTo](indexerModels.TransactionAssetTransfer.md#closeto)
- [receiver](indexerModels.TransactionAssetTransfer.md#receiver)
- [sender](indexerModels.TransactionAssetTransfer.md#sender)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionAssetTransfer.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionAssetTransfer.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionAssetTransfer**(`«destructured»`)

Creates a new `TransactionAssetTransfer` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `amount` | `number` \| `bigint` |
| › `assetId` | `number` \| `bigint` |
| › `closeAmount?` | `number` \| `bigint` |
| › `closeTo?` | `string` |
| › `receiver` | `string` |
| › `sender?` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:5041

## Properties

### amount

• **amount**: `number` \| `bigint`

(aamt) Amount of asset to transfer. A zero amount transferred to self allocates
that asset in the account's Assets map.

#### Defined in

client/v2/indexer/models/types.ts:4996

___

### assetId

• **assetId**: `number` \| `bigint`

(xaid) ID of the asset being transferred.

#### Defined in

client/v2/indexer/models/types.ts:5001

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### closeAmount

• `Optional` **closeAmount**: `number` \| `bigint`

Number of assets transferred to the close-to account as part of the transaction.

#### Defined in

client/v2/indexer/models/types.ts:5011

___

### closeTo

• `Optional` **closeTo**: `string`

(aclose) Indicates that the asset should be removed from the account's Assets
map, and specifies where the remaining asset holdings should be transferred.
It's always valid to transfer remaining asset holdings to the creator account.

#### Defined in

client/v2/indexer/models/types.ts:5018

___

### receiver

• **receiver**: `string`

(arcv) Recipient address of the transfer.

#### Defined in

client/v2/indexer/models/types.ts:5006

___

### sender

• `Optional` **sender**: `string`

(asnd) The effective sender during a clawback transactions. If this is not a
zero value, the real transaction sender must be the Clawback address from the
AssetParams.

#### Defined in

client/v2/indexer/models/types.ts:5025

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionAssetTransfer`](indexerModels.TransactionAssetTransfer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionAssetTransfer`](indexerModels.TransactionAssetTransfer.md)

#### Defined in

client/v2/indexer/models/types.ts:5075
