[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / Version

# Class: Version

[modelsv2](../modules/modelsv2.md).Version

algod version information.

## Hierarchy

- `default`

  ↳ **`Version`**

## Table of contents

### Constructors

- [constructor](modelsv2.Version.md#constructor)

### Properties

- [attribute\_map](modelsv2.Version.md#attribute_map)
- [build](modelsv2.Version.md#build)
- [genesisHashB64](modelsv2.Version.md#genesishashb64)
- [genesisId](modelsv2.Version.md#genesisid)
- [versions](modelsv2.Version.md#versions)

### Methods

- [get\_obj\_for\_encoding](modelsv2.Version.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.Version.md#from_obj_for_encoding)

## Constructors

### constructor

• **new Version**(`«destructured»`)

Creates a new `Version` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `build` | [`BuildVersion`](modelsv2.BuildVersion.md) |
| › `genesisHashB64` | `string` \| `Uint8Array` |
| › `genesisId` | `string` |
| › `versions` | `string`[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:6012

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### build

• **build**: [`BuildVersion`](modelsv2.BuildVersion.md)

#### Defined in

client/v2/algod/models/types.ts:5997

___

### genesisHashB64

• **genesisHashB64**: `Uint8Array`

#### Defined in

client/v2/algod/models/types.ts:5999

___

### genesisId

• **genesisId**: `string`

#### Defined in

client/v2/algod/models/types.ts:6001

___

### versions

• **versions**: `string`[]

#### Defined in

client/v2/algod/models/types.ts:6003

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

▸ `Static` **from_obj_for_encoding**(`data`): [`Version`](modelsv2.Version.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`Version`](modelsv2.Version.md)

#### Defined in

client/v2/algod/models/types.ts:6041
