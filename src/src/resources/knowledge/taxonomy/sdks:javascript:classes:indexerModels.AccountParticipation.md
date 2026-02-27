[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / AccountParticipation

# Class: AccountParticipation

[indexerModels](../modules/indexerModels.md).AccountParticipation

AccountParticipation describes the parameters used by this account in consensus
protocol.

## Hierarchy

- `default`

  ↳ **`AccountParticipation`**

## Table of contents

### Constructors

- [constructor](indexerModels.AccountParticipation.md#constructor)

### Properties

- [attribute\_map](indexerModels.AccountParticipation.md#attribute_map)
- [selectionParticipationKey](indexerModels.AccountParticipation.md#selectionparticipationkey)
- [stateProofKey](indexerModels.AccountParticipation.md#stateproofkey)
- [voteFirstValid](indexerModels.AccountParticipation.md#votefirstvalid)
- [voteKeyDilution](indexerModels.AccountParticipation.md#votekeydilution)
- [voteLastValid](indexerModels.AccountParticipation.md#votelastvalid)
- [voteParticipationKey](indexerModels.AccountParticipation.md#voteparticipationkey)

### Methods

- [get\_obj\_for\_encoding](indexerModels.AccountParticipation.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.AccountParticipation.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AccountParticipation**(`«destructured»`)

Creates a new `AccountParticipation` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `selectionParticipationKey` | `string` \| `Uint8Array` |
| › `stateProofKey?` | `string` \| `Uint8Array` |
| › `voteFirstValid` | `number` \| `bigint` |
| › `voteKeyDilution` | `number` \| `bigint` |
| › `voteLastValid` | `number` \| `bigint` |
| › `voteParticipationKey` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:528

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### selectionParticipationKey

• **selectionParticipationKey**: `Uint8Array`

Selection public key (if any) currently registered for this round.

#### Defined in

client/v2/indexer/models/types.ts:492

___

### stateProofKey

• `Optional` **stateProofKey**: `Uint8Array`

Root of the state proof key (if any)

#### Defined in

client/v2/indexer/models/types.ts:517

___

### voteFirstValid

• **voteFirstValid**: `number` \| `bigint`

First round for which this participation is valid.

#### Defined in

client/v2/indexer/models/types.ts:497

___

### voteKeyDilution

• **voteKeyDilution**: `number` \| `bigint`

Number of subkeys in each batch of participation keys.

#### Defined in

client/v2/indexer/models/types.ts:502

___

### voteLastValid

• **voteLastValid**: `number` \| `bigint`

Last round for which this participation is valid.

#### Defined in

client/v2/indexer/models/types.ts:507

___

### voteParticipationKey

• **voteParticipationKey**: `Uint8Array`

root participation public key (if any) currently registered for this round.

#### Defined in

client/v2/indexer/models/types.ts:512

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AccountParticipation`](indexerModels.AccountParticipation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AccountParticipation`](indexerModels.AccountParticipation.md)

#### Defined in

client/v2/indexer/models/types.ts:571
