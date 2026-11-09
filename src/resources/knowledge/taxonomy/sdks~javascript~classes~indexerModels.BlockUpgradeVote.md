[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / BlockUpgradeVote

# Class: BlockUpgradeVote

[indexerModels](../modules/indexerModels.md).BlockUpgradeVote

Fields relating to voting for a protocol upgrade.

## Hierarchy

- `default`

  ↳ **`BlockUpgradeVote`**

## Table of contents

### Constructors

- [constructor](indexerModels.BlockUpgradeVote.md#constructor)

### Properties

- [attribute\_map](indexerModels.BlockUpgradeVote.md#attribute_map)
- [upgradeApprove](indexerModels.BlockUpgradeVote.md#upgradeapprove)
- [upgradeDelay](indexerModels.BlockUpgradeVote.md#upgradedelay)
- [upgradePropose](indexerModels.BlockUpgradeVote.md#upgradepropose)

### Methods

- [get\_obj\_for\_encoding](indexerModels.BlockUpgradeVote.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.BlockUpgradeVote.md#from_obj_for_encoding)

## Constructors

### constructor

• **new BlockUpgradeVote**(`«destructured»`)

Creates a new `BlockUpgradeVote` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `upgradeApprove?` | `boolean` |
| › `upgradeDelay?` | `number` \| `bigint` |
| › `upgradePropose?` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:2704

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### upgradeApprove

• `Optional` **upgradeApprove**: `boolean`

(upgradeyes) Indicates a yes vote for the current proposal.

#### Defined in

client/v2/indexer/models/types.ts:2686

___

### upgradeDelay

• `Optional` **upgradeDelay**: `number` \| `bigint`

(upgradedelay) Indicates the time between acceptance and execution.

#### Defined in

client/v2/indexer/models/types.ts:2691

___

### upgradePropose

• `Optional` **upgradePropose**: `string`

(upgradeprop) Indicates a proposed upgrade.

#### Defined in

client/v2/indexer/models/types.ts:2696

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

▸ `Static` **from_obj_for_encoding**(`data`): [`BlockUpgradeVote`](indexerModels.BlockUpgradeVote.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`BlockUpgradeVote`](indexerModels.BlockUpgradeVote.md)

#### Defined in

client/v2/indexer/models/types.ts:2726
