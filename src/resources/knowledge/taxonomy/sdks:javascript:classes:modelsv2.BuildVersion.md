[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / BuildVersion

# Class: BuildVersion

[modelsv2](../modules/modelsv2.md).BuildVersion

## Hierarchy

- `default`

  ↳ **`BuildVersion`**

## Table of contents

### Constructors

- [constructor](modelsv2.BuildVersion.md#constructor)

### Properties

- [attribute\_map](modelsv2.BuildVersion.md#attribute_map)
- [branch](modelsv2.BuildVersion.md#branch)
- [buildNumber](modelsv2.BuildVersion.md#buildnumber)
- [channel](modelsv2.BuildVersion.md#channel)
- [commitHash](modelsv2.BuildVersion.md#commithash)
- [major](modelsv2.BuildVersion.md#major)
- [minor](modelsv2.BuildVersion.md#minor)

### Methods

- [get\_obj\_for\_encoding](modelsv2.BuildVersion.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.BuildVersion.md#from_obj_for_encoding)

## Constructors

### constructor

• **new BuildVersion**(`«destructured»`)

Creates a new `BuildVersion` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `branch` | `string` |
| › `buildNumber` | `number` \| `bigint` |
| › `channel` | `string` |
| › `commitHash` | `string` |
| › `major` | `number` \| `bigint` |
| › `minor` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2443

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### branch

• **branch**: `string`

#### Defined in

client/v2/algod/models/types.ts:2422

___

### buildNumber

• **buildNumber**: `number` \| `bigint`

#### Defined in

client/v2/algod/models/types.ts:2424

___

### channel

• **channel**: `string`

#### Defined in

client/v2/algod/models/types.ts:2426

___

### commitHash

• **commitHash**: `string`

#### Defined in

client/v2/algod/models/types.ts:2428

___

### major

• **major**: `number` \| `bigint`

#### Defined in

client/v2/algod/models/types.ts:2430

___

### minor

• **minor**: `number` \| `bigint`

#### Defined in

client/v2/algod/models/types.ts:2432

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

▸ `Static` **from_obj_for_encoding**(`data`): [`BuildVersion`](modelsv2.BuildVersion.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`BuildVersion`](modelsv2.BuildVersion.md)

#### Defined in

client/v2/algod/models/types.ts:2477
