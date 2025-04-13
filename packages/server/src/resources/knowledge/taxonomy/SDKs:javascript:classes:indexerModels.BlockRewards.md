[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / BlockRewards

# Class: BlockRewards

[indexerModels](../modules/indexerModels.md).BlockRewards

Fields relating to rewards,

## Hierarchy

- `default`

  ↳ **`BlockRewards`**

## Table of contents

### Constructors

- [constructor](indexerModels.BlockRewards.md#constructor)

### Properties

- [attribute\_map](indexerModels.BlockRewards.md#attribute_map)
- [feeSink](indexerModels.BlockRewards.md#feesink)
- [rewardsCalculationRound](indexerModels.BlockRewards.md#rewardscalculationround)
- [rewardsLevel](indexerModels.BlockRewards.md#rewardslevel)
- [rewardsPool](indexerModels.BlockRewards.md#rewardspool)
- [rewardsRate](indexerModels.BlockRewards.md#rewardsrate)
- [rewardsResidue](indexerModels.BlockRewards.md#rewardsresidue)

### Methods

- [get\_obj\_for\_encoding](indexerModels.BlockRewards.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.BlockRewards.md#from_obj_for_encoding)

## Constructors

### constructor

• **new BlockRewards**(`«destructured»`)

Creates a new `BlockRewards` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `feeSink` | `string` |
| › `rewardsCalculationRound` | `number` \| `bigint` |
| › `rewardsLevel` | `number` \| `bigint` |
| › `rewardsPool` | `string` |
| › `rewardsRate` | `number` \| `bigint` |
| › `rewardsResidue` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:2523

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### feeSink

• **feeSink**: `string`

(fees) accepts transaction fees, it can only spend to the incentive pool.

#### Defined in

client/v2/indexer/models/types.ts:2477

___

### rewardsCalculationRound

• **rewardsCalculationRound**: `number` \| `bigint`

(rwcalr) number of leftover MicroAlgos after the distribution of rewards-rate
MicroAlgos for every reward unit in the next round.

#### Defined in

client/v2/indexer/models/types.ts:2483

___

### rewardsLevel

• **rewardsLevel**: `number` \| `bigint`

(earn) How many rewards, in MicroAlgos, have been distributed to each RewardUnit
of MicroAlgos since genesis.

#### Defined in

client/v2/indexer/models/types.ts:2489

___

### rewardsPool

• **rewardsPool**: `string`

(rwd) accepts periodic injections from the fee-sink and continually
redistributes them as rewards.

#### Defined in

client/v2/indexer/models/types.ts:2495

___

### rewardsRate

• **rewardsRate**: `number` \| `bigint`

(rate) Number of new MicroAlgos added to the participation stake from rewards at
the next round.

#### Defined in

client/v2/indexer/models/types.ts:2501

___

### rewardsResidue

• **rewardsResidue**: `number` \| `bigint`

(frac) Number of leftover MicroAlgos after the distribution of
RewardsRate/rewardUnits MicroAlgos for every reward unit in the next round.

#### Defined in

client/v2/indexer/models/types.ts:2507

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

▸ `Static` **from_obj_for_encoding**(`data`): [`BlockRewards`](indexerModels.BlockRewards.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`BlockRewards`](indexerModels.BlockRewards.md)

#### Defined in

client/v2/indexer/models/types.ts:2557
