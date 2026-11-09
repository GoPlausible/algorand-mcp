[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / NodeStatusResponse

# Class: NodeStatusResponse

[modelsv2](../modules/modelsv2.md).NodeStatusResponse

## Hierarchy

- `default`

  ↳ **`NodeStatusResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.NodeStatusResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.NodeStatusResponse.md#attribute_map)
- [catchpoint](modelsv2.NodeStatusResponse.md#catchpoint)
- [catchpointAcquiredBlocks](modelsv2.NodeStatusResponse.md#catchpointacquiredblocks)
- [catchpointProcessedAccounts](modelsv2.NodeStatusResponse.md#catchpointprocessedaccounts)
- [catchpointProcessedKvs](modelsv2.NodeStatusResponse.md#catchpointprocessedkvs)
- [catchpointTotalAccounts](modelsv2.NodeStatusResponse.md#catchpointtotalaccounts)
- [catchpointTotalBlocks](modelsv2.NodeStatusResponse.md#catchpointtotalblocks)
- [catchpointTotalKvs](modelsv2.NodeStatusResponse.md#catchpointtotalkvs)
- [catchpointVerifiedAccounts](modelsv2.NodeStatusResponse.md#catchpointverifiedaccounts)
- [catchpointVerifiedKvs](modelsv2.NodeStatusResponse.md#catchpointverifiedkvs)
- [catchupTime](modelsv2.NodeStatusResponse.md#catchuptime)
- [lastCatchpoint](modelsv2.NodeStatusResponse.md#lastcatchpoint)
- [lastRound](modelsv2.NodeStatusResponse.md#lastround)
- [lastVersion](modelsv2.NodeStatusResponse.md#lastversion)
- [nextVersion](modelsv2.NodeStatusResponse.md#nextversion)
- [nextVersionRound](modelsv2.NodeStatusResponse.md#nextversionround)
- [nextVersionSupported](modelsv2.NodeStatusResponse.md#nextversionsupported)
- [stoppedAtUnsupportedRound](modelsv2.NodeStatusResponse.md#stoppedatunsupportedround)
- [timeSinceLastRound](modelsv2.NodeStatusResponse.md#timesincelastround)
- [upgradeDelay](modelsv2.NodeStatusResponse.md#upgradedelay)
- [upgradeNextProtocolVoteBefore](modelsv2.NodeStatusResponse.md#upgradenextprotocolvotebefore)
- [upgradeNoVotes](modelsv2.NodeStatusResponse.md#upgradenovotes)
- [upgradeNodeVote](modelsv2.NodeStatusResponse.md#upgradenodevote)
- [upgradeVoteRounds](modelsv2.NodeStatusResponse.md#upgradevoterounds)
- [upgradeVotes](modelsv2.NodeStatusResponse.md#upgradevotes)
- [upgradeVotesRequired](modelsv2.NodeStatusResponse.md#upgradevotesrequired)
- [upgradeYesVotes](modelsv2.NodeStatusResponse.md#upgradeyesvotes)

### Methods

- [get\_obj\_for\_encoding](modelsv2.NodeStatusResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.NodeStatusResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new NodeStatusResponse**(`«destructured»`)

Creates a new `NodeStatusResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `catchpoint?` | `string` |
| › `catchpointAcquiredBlocks?` | `number` \| `bigint` |
| › `catchpointProcessedAccounts?` | `number` \| `bigint` |
| › `catchpointProcessedKvs?` | `number` \| `bigint` |
| › `catchpointTotalAccounts?` | `number` \| `bigint` |
| › `catchpointTotalBlocks?` | `number` \| `bigint` |
| › `catchpointTotalKvs?` | `number` \| `bigint` |
| › `catchpointVerifiedAccounts?` | `number` \| `bigint` |
| › `catchpointVerifiedKvs?` | `number` \| `bigint` |
| › `catchupTime` | `number` \| `bigint` |
| › `lastCatchpoint?` | `string` |
| › `lastRound` | `number` \| `bigint` |
| › `lastVersion` | `string` |
| › `nextVersion` | `string` |
| › `nextVersionRound` | `number` \| `bigint` |
| › `nextVersionSupported` | `boolean` |
| › `stoppedAtUnsupportedRound` | `boolean` |
| › `timeSinceLastRound` | `number` \| `bigint` |
| › `upgradeDelay?` | `number` \| `bigint` |
| › `upgradeNextProtocolVoteBefore?` | `number` \| `bigint` |
| › `upgradeNoVotes?` | `number` \| `bigint` |
| › `upgradeNodeVote?` | `boolean` |
| › `upgradeVoteRounds?` | `number` \| `bigint` |
| › `upgradeVotes?` | `number` \| `bigint` |
| › `upgradeVotesRequired?` | `number` \| `bigint` |
| › `upgradeYesVotes?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:3666

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### catchpoint

• `Optional` **catchpoint**: `string`

The current catchpoint that is being caught up to

#### Defined in

client/v2/algod/models/types.ts:3536

___

### catchpointAcquiredBlocks

• `Optional` **catchpointAcquiredBlocks**: `number` \| `bigint`

The number of blocks that have already been obtained by the node as part of the
catchup

#### Defined in

client/v2/algod/models/types.ts:3542

___

### catchpointProcessedAccounts

• `Optional` **catchpointProcessedAccounts**: `number` \| `bigint`

The number of accounts from the current catchpoint that have been processed so
far as part of the catchup

#### Defined in

client/v2/algod/models/types.ts:3548

___

### catchpointProcessedKvs

• `Optional` **catchpointProcessedKvs**: `number` \| `bigint`

The number of key-values (KVs) from the current catchpoint that have been
processed so far as part of the catchup

#### Defined in

client/v2/algod/models/types.ts:3554

___

### catchpointTotalAccounts

• `Optional` **catchpointTotalAccounts**: `number` \| `bigint`

The total number of accounts included in the current catchpoint

#### Defined in

client/v2/algod/models/types.ts:3559

___

### catchpointTotalBlocks

• `Optional` **catchpointTotalBlocks**: `number` \| `bigint`

The total number of blocks that are required to complete the current catchpoint
catchup

#### Defined in

client/v2/algod/models/types.ts:3565

___

### catchpointTotalKvs

• `Optional` **catchpointTotalKvs**: `number` \| `bigint`

The total number of key-values (KVs) included in the current catchpoint

#### Defined in

client/v2/algod/models/types.ts:3570

___

### catchpointVerifiedAccounts

• `Optional` **catchpointVerifiedAccounts**: `number` \| `bigint`

The number of accounts from the current catchpoint that have been verified so
far as part of the catchup

#### Defined in

client/v2/algod/models/types.ts:3576

___

### catchpointVerifiedKvs

• `Optional` **catchpointVerifiedKvs**: `number` \| `bigint`

The number of key-values (KVs) from the current catchpoint that have been
verified so far as part of the catchup

#### Defined in

client/v2/algod/models/types.ts:3582

___

### catchupTime

• **catchupTime**: `number` \| `bigint`

CatchupTime in nanoseconds

#### Defined in

client/v2/algod/models/types.ts:3494

___

### lastCatchpoint

• `Optional` **lastCatchpoint**: `string`

The last catchpoint seen by the node

#### Defined in

client/v2/algod/models/types.ts:3587

___

### lastRound

• **lastRound**: `number` \| `bigint`

LastRound indicates the last round seen

#### Defined in

client/v2/algod/models/types.ts:3499

___

### lastVersion

• **lastVersion**: `string`

LastVersion indicates the last consensus version supported

#### Defined in

client/v2/algod/models/types.ts:3504

___

### nextVersion

• **nextVersion**: `string`

NextVersion of consensus protocol to use

#### Defined in

client/v2/algod/models/types.ts:3509

___

### nextVersionRound

• **nextVersionRound**: `number` \| `bigint`

NextVersionRound is the round at which the next consensus version will apply

#### Defined in

client/v2/algod/models/types.ts:3514

___

### nextVersionSupported

• **nextVersionSupported**: `boolean`

NextVersionSupported indicates whether the next consensus version is supported
by this node

#### Defined in

client/v2/algod/models/types.ts:3520

___

### stoppedAtUnsupportedRound

• **stoppedAtUnsupportedRound**: `boolean`

StoppedAtUnsupportedRound indicates that the node does not support the new
rounds and has stopped making progress

#### Defined in

client/v2/algod/models/types.ts:3526

___

### timeSinceLastRound

• **timeSinceLastRound**: `number` \| `bigint`

TimeSinceLastRound in nanoseconds

#### Defined in

client/v2/algod/models/types.ts:3531

___

### upgradeDelay

• `Optional` **upgradeDelay**: `number` \| `bigint`

Upgrade delay

#### Defined in

client/v2/algod/models/types.ts:3592

___

### upgradeNextProtocolVoteBefore

• `Optional` **upgradeNextProtocolVoteBefore**: `number` \| `bigint`

Next protocol round

#### Defined in

client/v2/algod/models/types.ts:3597

___

### upgradeNoVotes

• `Optional` **upgradeNoVotes**: `number` \| `bigint`

No votes cast for consensus upgrade

#### Defined in

client/v2/algod/models/types.ts:3602

___

### upgradeNodeVote

• `Optional` **upgradeNodeVote**: `boolean`

This node's upgrade vote

#### Defined in

client/v2/algod/models/types.ts:3607

___

### upgradeVoteRounds

• `Optional` **upgradeVoteRounds**: `number` \| `bigint`

Total voting rounds for current upgrade

#### Defined in

client/v2/algod/models/types.ts:3612

___

### upgradeVotes

• `Optional` **upgradeVotes**: `number` \| `bigint`

Total votes cast for consensus upgrade

#### Defined in

client/v2/algod/models/types.ts:3617

___

### upgradeVotesRequired

• `Optional` **upgradeVotesRequired**: `number` \| `bigint`

Yes votes required for consensus upgrade

#### Defined in

client/v2/algod/models/types.ts:3622

___

### upgradeYesVotes

• `Optional` **upgradeYesVotes**: `number` \| `bigint`

Yes votes cast for consensus upgrade

#### Defined in

client/v2/algod/models/types.ts:3627

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

▸ `Static` **from_obj_for_encoding**(`data`): [`NodeStatusResponse`](modelsv2.NodeStatusResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`NodeStatusResponse`](modelsv2.NodeStatusResponse.md)

#### Defined in

client/v2/algod/models/types.ts:3780
