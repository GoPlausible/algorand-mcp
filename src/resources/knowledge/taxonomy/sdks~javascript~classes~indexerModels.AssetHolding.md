[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / AssetHolding

# Class: AssetHolding

[indexerModels](../modules/indexerModels.md).AssetHolding

Describes an asset held by an account.
Definition:
data/basics/userBalance.go : AssetHolding

## Hierarchy

- `default`

  ↳ **`AssetHolding`**

## Table of contents

### Constructors

- [constructor](indexerModels.AssetHolding.md#constructor)

### Properties

- [amount](indexerModels.AssetHolding.md#amount)
- [assetId](indexerModels.AssetHolding.md#assetid)
- [attribute\_map](indexerModels.AssetHolding.md#attribute_map)
- [deleted](indexerModels.AssetHolding.md#deleted)
- [isFrozen](indexerModels.AssetHolding.md#isfrozen)
- [optedInAtRound](indexerModels.AssetHolding.md#optedinatround)
- [optedOutAtRound](indexerModels.AssetHolding.md#optedoutatround)

### Methods

- [get\_obj\_for\_encoding](indexerModels.AssetHolding.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.AssetHolding.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AssetHolding**(`«destructured»`)

Creates a new `AssetHolding` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `amount` | `number` \| `bigint` |
| › `assetId` | `number` \| `bigint` |
| › `deleted?` | `boolean` |
| › `isFrozen` | `boolean` |
| › `optedInAtRound?` | `number` \| `bigint` |
| › `optedOutAtRound?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:1671

## Properties

### amount

• **amount**: `number` \| `bigint`

number of units held.

#### Defined in

client/v2/indexer/models/types.ts:1635

___

### assetId

• **assetId**: `number` \| `bigint`

Asset ID of the holding.

#### Defined in

client/v2/indexer/models/types.ts:1640

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### deleted

• `Optional` **deleted**: `boolean`

Whether or not the asset holding is currently deleted from its account.

#### Defined in

client/v2/indexer/models/types.ts:1650

___

### isFrozen

• **isFrozen**: `boolean`

whether or not the holding is frozen.

#### Defined in

client/v2/indexer/models/types.ts:1645

___

### optedInAtRound

• `Optional` **optedInAtRound**: `number` \| `bigint`

Round during which the account opted into this asset holding.

#### Defined in

client/v2/indexer/models/types.ts:1655

___

### optedOutAtRound

• `Optional` **optedOutAtRound**: `number` \| `bigint`

Round during which the account opted out of this asset holding.

#### Defined in

client/v2/indexer/models/types.ts:1660

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AssetHolding`](indexerModels.AssetHolding.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AssetHolding`](indexerModels.AssetHolding.md)

#### Defined in

client/v2/indexer/models/types.ts:1705
