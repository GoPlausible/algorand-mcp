[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / ParticipationUpdates

# Class: ParticipationUpdates

[indexerModels](../modules/indexerModels.md).ParticipationUpdates

Participation account data that needs to be checked/acted on by the network.

## Hierarchy

- `default`

  ↳ **`ParticipationUpdates`**

## Table of contents

### Constructors

- [constructor](indexerModels.ParticipationUpdates.md#constructor)

### Properties

- [absentParticipationAccounts](indexerModels.ParticipationUpdates.md#absentparticipationaccounts)
- [attribute\_map](indexerModels.ParticipationUpdates.md#attribute_map)
- [expiredParticipationAccounts](indexerModels.ParticipationUpdates.md#expiredparticipationaccounts)

### Methods

- [get\_obj\_for\_encoding](indexerModels.ParticipationUpdates.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.ParticipationUpdates.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ParticipationUpdates**(`«destructured»`)

Creates a new `ParticipationUpdates` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `absentParticipationAccounts?` | `string`[] |
| › `expiredParticipationAccounts?` | `string`[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3432

## Properties

### absentParticipationAccounts

• `Optional` **absentParticipationAccounts**: `string`[]

(partupabs) a list of online accounts that need to be suspended.

#### Defined in

client/v2/indexer/models/types.ts:3418

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### expiredParticipationAccounts

• `Optional` **expiredParticipationAccounts**: `string`[]

(partupdrmv) a list of online accounts that needs to be converted to offline
since their participation key expired.

#### Defined in

client/v2/indexer/models/types.ts:3424

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ParticipationUpdates`](indexerModels.ParticipationUpdates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ParticipationUpdates`](indexerModels.ParticipationUpdates.md)

#### Defined in

client/v2/indexer/models/types.ts:3450
