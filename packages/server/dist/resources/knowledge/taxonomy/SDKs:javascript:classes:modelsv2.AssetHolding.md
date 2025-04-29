[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / AssetHolding

# Class: AssetHolding

[modelsv2](../modules/modelsv2.md).AssetHolding

Describes an asset held by an account.
Definition:
data/basics/userBalance.go : AssetHolding

## Hierarchy

- `default`

  ↳ **`AssetHolding`**

## Table of contents

### Constructors

- [constructor](modelsv2.AssetHolding.md#constructor)

### Properties

- [amount](modelsv2.AssetHolding.md#amount)
- [assetId](modelsv2.AssetHolding.md#assetid)
- [attribute\_map](modelsv2.AssetHolding.md#attribute_map)
- [isFrozen](modelsv2.AssetHolding.md#isfrozen)

### Methods

- [get\_obj\_for\_encoding](modelsv2.AssetHolding.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.AssetHolding.md#from_obj_for_encoding)

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
| › `isFrozen` | `boolean` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:1636

## Properties

### amount

• **amount**: `number` \| `bigint`

(a) number of units held.

#### Defined in

client/v2/algod/models/types.ts:1618

___

### assetId

• **assetId**: `number` \| `bigint`

Asset ID of the holding.

#### Defined in

client/v2/algod/models/types.ts:1623

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### isFrozen

• **isFrozen**: `boolean`

(f) whether or not the holding is frozen.

#### Defined in

client/v2/algod/models/types.ts:1628

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AssetHolding`](modelsv2.AssetHolding.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AssetHolding`](modelsv2.AssetHolding.md)

#### Defined in

client/v2/algod/models/types.ts:1658
