[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / AssetParams

# Class: AssetParams

[modelsv2](../modules/modelsv2.md).AssetParams

AssetParams specifies the parameters for an asset.
(apar) when part of an AssetConfig transaction.
Definition:
data/transactions/asset.go : AssetParams

## Hierarchy

- `default`

  ↳ **`AssetParams`**

## Table of contents

### Constructors

- [constructor](modelsv2.AssetParams.md#constructor)

### Properties

- [attribute\_map](modelsv2.AssetParams.md#attribute_map)
- [clawback](modelsv2.AssetParams.md#clawback)
- [creator](modelsv2.AssetParams.md#creator)
- [decimals](modelsv2.AssetParams.md#decimals)
- [defaultFrozen](modelsv2.AssetParams.md#defaultfrozen)
- [freeze](modelsv2.AssetParams.md#freeze)
- [manager](modelsv2.AssetParams.md#manager)
- [metadataHash](modelsv2.AssetParams.md#metadatahash)
- [name](modelsv2.AssetParams.md#name)
- [nameB64](modelsv2.AssetParams.md#nameb64)
- [reserve](modelsv2.AssetParams.md#reserve)
- [total](modelsv2.AssetParams.md#total)
- [unitName](modelsv2.AssetParams.md#unitname)
- [unitNameB64](modelsv2.AssetParams.md#unitnameb64)
- [url](modelsv2.AssetParams.md#url)
- [urlB64](modelsv2.AssetParams.md#urlb64)

### Methods

- [get\_obj\_for\_encoding](modelsv2.AssetParams.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.AssetParams.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AssetParams**(`«destructured»`)

Creates a new `AssetParams` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `clawback?` | `string` |
| › `creator` | `string` |
| › `decimals` | `number` \| `bigint` |
| › `defaultFrozen?` | `boolean` |
| › `freeze?` | `string` |
| › `manager?` | `string` |
| › `metadataHash?` | `string` \| `Uint8Array` |
| › `name?` | `string` |
| › `nameB64?` | `string` \| `Uint8Array` |
| › `reserve?` | `string` |
| › `total` | `number` \| `bigint` |
| › `unitName?` | `string` |
| › `unitNameB64?` | `string` \| `Uint8Array` |
| › `url?` | `string` |
| › `urlB64?` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:1846

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### clawback

• `Optional` **clawback**: `string`

(c) Address of account used to clawback holdings of this asset. If empty,
clawback is not permitted.

#### Defined in

client/v2/algod/models/types.ts:1755

___

### creator

• **creator**: `string`

The address that created this asset. This is the address where the parameters
for this asset can be found, and also the address where unwanted asset units can
be sent in the worst case.

#### Defined in

client/v2/algod/models/types.ts:1736

___

### decimals

• **decimals**: `number` \| `bigint`

(dc) The number of digits to use after the decimal point when displaying this
asset. If 0, the asset is not divisible. If 1, the base unit of the asset is in
tenths. If 2, the base unit of the asset is in hundredths, and so on. This value
must be between 0 and 19 (inclusive).

#### Defined in

client/v2/algod/models/types.ts:1744

___

### defaultFrozen

• `Optional` **defaultFrozen**: `boolean`

(df) Whether holdings of this asset are frozen by default.

#### Defined in

client/v2/algod/models/types.ts:1760

___

### freeze

• `Optional` **freeze**: `string`

(f) Address of account used to freeze holdings of this asset. If empty, freezing
is not permitted.

#### Defined in

client/v2/algod/models/types.ts:1766

___

### manager

• `Optional` **manager**: `string`

(m) Address of account used to manage the keys of this asset and to destroy it.

#### Defined in

client/v2/algod/models/types.ts:1771

___

### metadataHash

• `Optional` **metadataHash**: `Uint8Array`

(am) A commitment to some unspecified asset metadata. The format of this
metadata is up to the application.

#### Defined in

client/v2/algod/models/types.ts:1777

___

### name

• `Optional` **name**: `string`

(an) Name of this asset, as supplied by the creator. Included only when the
asset name is composed of printable utf-8 characters.

#### Defined in

client/v2/algod/models/types.ts:1783

___

### nameB64

• `Optional` **nameB64**: `Uint8Array`

Base64 encoded name of this asset, as supplied by the creator.

#### Defined in

client/v2/algod/models/types.ts:1788

___

### reserve

• `Optional` **reserve**: `string`

(r) Address of account holding reserve (non-minted) units of this asset.

#### Defined in

client/v2/algod/models/types.ts:1793

___

### total

• **total**: `number` \| `bigint`

(t) The total number of units of this asset.

#### Defined in

client/v2/algod/models/types.ts:1749

___

### unitName

• `Optional` **unitName**: `string`

(un) Name of a unit of this asset, as supplied by the creator. Included only
when the name of a unit of this asset is composed of printable utf-8 characters.

#### Defined in

client/v2/algod/models/types.ts:1799

___

### unitNameB64

• `Optional` **unitNameB64**: `Uint8Array`

Base64 encoded name of a unit of this asset, as supplied by the creator.

#### Defined in

client/v2/algod/models/types.ts:1804

___

### url

• `Optional` **url**: `string`

(au) URL where more information about the asset can be retrieved. Included only
when the URL is composed of printable utf-8 characters.

#### Defined in

client/v2/algod/models/types.ts:1810

___

### urlB64

• `Optional` **urlB64**: `Uint8Array`

Base64 encoded URL where more information about the asset can be retrieved.

#### Defined in

client/v2/algod/models/types.ts:1815

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AssetParams`](modelsv2.AssetParams.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AssetParams`](modelsv2.AssetParams.md)

#### Defined in

client/v2/algod/models/types.ts:1928
