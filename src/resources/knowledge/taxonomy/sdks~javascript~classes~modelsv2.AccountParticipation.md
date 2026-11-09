[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / AccountParticipation

# Class: AccountParticipation

[modelsv2](../modules/modelsv2.md).AccountParticipation

AccountParticipation describes the parameters used by this account in consensus
protocol.

## Hierarchy

- `default`

  ↳ **`AccountParticipation`**

## Table of contents

### Constructors

- [constructor](modelsv2.AccountParticipation.md#constructor)

### Properties

- [attribute\_map](modelsv2.AccountParticipation.md#attribute_map)
- [selectionParticipationKey](modelsv2.AccountParticipation.md#selectionparticipationkey)
- [stateProofKey](modelsv2.AccountParticipation.md#stateproofkey)
- [voteFirstValid](modelsv2.AccountParticipation.md#votefirstvalid)
- [voteKeyDilution](modelsv2.AccountParticipation.md#votekeydilution)
- [voteLastValid](modelsv2.AccountParticipation.md#votelastvalid)
- [voteParticipationKey](modelsv2.AccountParticipation.md#voteparticipationkey)

### Methods

- [get\_obj\_for\_encoding](modelsv2.AccountParticipation.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.AccountParticipation.md#from_obj_for_encoding)

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

client/v2/algod/models/types.ts:769

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

(sel) Selection public key (if any) currently registered for this round.

#### Defined in

client/v2/algod/models/types.ts:731

___

### stateProofKey

• `Optional` **stateProofKey**: `Uint8Array`

(stprf) Root of the state proof key (if any)

#### Defined in

client/v2/algod/models/types.ts:757

___

### voteFirstValid

• **voteFirstValid**: `number` \| `bigint`

(voteFst) First round for which this participation is valid.

#### Defined in

client/v2/algod/models/types.ts:736

___

### voteKeyDilution

• **voteKeyDilution**: `number` \| `bigint`

(voteKD) Number of subkeys in each batch of participation keys.

#### Defined in

client/v2/algod/models/types.ts:741

___

### voteLastValid

• **voteLastValid**: `number` \| `bigint`

(voteLst) Last round for which this participation is valid.

#### Defined in

client/v2/algod/models/types.ts:746

___

### voteParticipationKey

• **voteParticipationKey**: `Uint8Array`

(vote) root participation public key (if any) currently registered for this
round.

#### Defined in

client/v2/algod/models/types.ts:752

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AccountParticipation`](modelsv2.AccountParticipation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AccountParticipation`](modelsv2.AccountParticipation.md)

#### Defined in

client/v2/algod/models/types.ts:812
