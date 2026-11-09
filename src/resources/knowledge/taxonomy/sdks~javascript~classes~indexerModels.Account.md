[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / Account

# Class: Account

[indexerModels](../modules/indexerModels.md).Account

Account information at a given round.
Definition:
data/basics/userBalance.go : AccountData

## Hierarchy

- `default`

  ↳ **`Account`**

## Table of contents

### Constructors

- [constructor](indexerModels.Account.md#constructor)

### Properties

- [address](indexerModels.Account.md#address)
- [amount](indexerModels.Account.md#amount)
- [amountWithoutPendingRewards](indexerModels.Account.md#amountwithoutpendingrewards)
- [appsLocalState](indexerModels.Account.md#appslocalstate)
- [appsTotalExtraPages](indexerModels.Account.md#appstotalextrapages)
- [appsTotalSchema](indexerModels.Account.md#appstotalschema)
- [assets](indexerModels.Account.md#assets)
- [attribute\_map](indexerModels.Account.md#attribute_map)
- [authAddr](indexerModels.Account.md#authaddr)
- [closedAtRound](indexerModels.Account.md#closedatround)
- [createdApps](indexerModels.Account.md#createdapps)
- [createdAssets](indexerModels.Account.md#createdassets)
- [createdAtRound](indexerModels.Account.md#createdatround)
- [deleted](indexerModels.Account.md#deleted)
- [incentiveEligible](indexerModels.Account.md#incentiveeligible)
- [lastHeartbeat](indexerModels.Account.md#lastheartbeat)
- [lastProposed](indexerModels.Account.md#lastproposed)
- [minBalance](indexerModels.Account.md#minbalance)
- [participation](indexerModels.Account.md#participation)
- [pendingRewards](indexerModels.Account.md#pendingrewards)
- [rewardBase](indexerModels.Account.md#rewardbase)
- [rewards](indexerModels.Account.md#rewards)
- [round](indexerModels.Account.md#round)
- [sigType](indexerModels.Account.md#sigtype)
- [status](indexerModels.Account.md#status)
- [totalAppsOptedIn](indexerModels.Account.md#totalappsoptedin)
- [totalAssetsOptedIn](indexerModels.Account.md#totalassetsoptedin)
- [totalBoxBytes](indexerModels.Account.md#totalboxbytes)
- [totalBoxes](indexerModels.Account.md#totalboxes)
- [totalCreatedApps](indexerModels.Account.md#totalcreatedapps)
- [totalCreatedAssets](indexerModels.Account.md#totalcreatedassets)

### Methods

- [get\_obj\_for\_encoding](indexerModels.Account.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.Account.md#from_obj_for_encoding)

## Constructors

### constructor

• **new Account**(`«destructured»`)

Creates a new `Account` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `address` | `string` |
| › `amount` | `number` \| `bigint` |
| › `amountWithoutPendingRewards` | `number` \| `bigint` |
| › `appsLocalState?` | [`ApplicationLocalState`](indexerModels.ApplicationLocalState.md)[] |
| › `appsTotalExtraPages?` | `number` \| `bigint` |
| › `appsTotalSchema?` | [`ApplicationStateSchema`](indexerModels.ApplicationStateSchema.md) |
| › `assets?` | [`AssetHolding`](indexerModels.AssetHolding.md)[] |
| › `authAddr?` | `string` |
| › `closedAtRound?` | `number` \| `bigint` |
| › `createdApps?` | [`Application`](indexerModels.Application.md)[] |
| › `createdAssets?` | [`Asset`](indexerModels.Asset.md)[] |
| › `createdAtRound?` | `number` \| `bigint` |
| › `deleted?` | `boolean` |
| › `incentiveEligible?` | `boolean` |
| › `lastHeartbeat?` | `number` \| `bigint` |
| › `lastProposed?` | `number` \| `bigint` |
| › `minBalance` | `number` \| `bigint` |
| › `participation?` | [`AccountParticipation`](indexerModels.AccountParticipation.md) |
| › `pendingRewards` | `number` \| `bigint` |
| › `rewardBase?` | `number` \| `bigint` |
| › `rewards` | `number` \| `bigint` |
| › `round` | `number` \| `bigint` |
| › `sigType?` | `string` |
| › `status` | `string` |
| › `totalAppsOptedIn` | `number` \| `bigint` |
| › `totalAssetsOptedIn` | `number` \| `bigint` |
| › `totalBoxBytes` | `number` \| `bigint` |
| › `totalBoxes` | `number` \| `bigint` |
| › `totalCreatedApps` | `number` \| `bigint` |
| › `totalCreatedAssets` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:248

## Properties

### address

• **address**: `string`

the account public key

#### Defined in

client/v2/indexer/models/types.ts:18

___

### amount

• **amount**: `number` \| `bigint`

total number of MicroAlgos in the account

#### Defined in

client/v2/indexer/models/types.ts:23

___

### amountWithoutPendingRewards

• **amountWithoutPendingRewards**: `number` \| `bigint`

specifies the amount of MicroAlgos in the account, without the pending rewards.

#### Defined in

client/v2/indexer/models/types.ts:28

___

### appsLocalState

• `Optional` **appsLocalState**: [`ApplicationLocalState`](indexerModels.ApplicationLocalState.md)[]

application local data stored in this account.
Note the raw object uses `map[int] -> AppLocalState` for this type.

#### Defined in

client/v2/indexer/models/types.ts:99

___

### appsTotalExtraPages

• `Optional` **appsTotalExtraPages**: `number` \| `bigint`

the sum of all extra application program pages for this account.

#### Defined in

client/v2/indexer/models/types.ts:104

___

### appsTotalSchema

• `Optional` **appsTotalSchema**: [`ApplicationStateSchema`](indexerModels.ApplicationStateSchema.md)

the sum of all of the local schemas and global schemas in this account.
Note: the raw account uses `StateSchema` for this type.

#### Defined in

client/v2/indexer/models/types.ts:110

___

### assets

• `Optional` **assets**: [`AssetHolding`](indexerModels.AssetHolding.md)[]

assets held by this account.
Note the raw object uses `map[int] -> AssetHolding` for this type.

#### Defined in

client/v2/indexer/models/types.ts:116

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### authAddr

• `Optional` **authAddr**: `string`

The address against which signing should be checked. If empty, the address of
the current account is used. This field can be updated in any transaction by
setting the RekeyTo field.

#### Defined in

client/v2/indexer/models/types.ts:123

___

### closedAtRound

• `Optional` **closedAtRound**: `number` \| `bigint`

Round during which this account was most recently closed.

#### Defined in

client/v2/indexer/models/types.ts:128

___

### createdApps

• `Optional` **createdApps**: [`Application`](indexerModels.Application.md)[]

parameters of applications created by this account including app global data.
Note: the raw account uses `map[int] -> AppParams` for this type.

#### Defined in

client/v2/indexer/models/types.ts:134

___

### createdAssets

• `Optional` **createdAssets**: [`Asset`](indexerModels.Asset.md)[]

parameters of assets created by this account.
Note: the raw account uses `map[int] -> Asset` for this type.

#### Defined in

client/v2/indexer/models/types.ts:140

___

### createdAtRound

• `Optional` **createdAtRound**: `number` \| `bigint`

Round during which this account first appeared in a transaction.

#### Defined in

client/v2/indexer/models/types.ts:145

___

### deleted

• `Optional` **deleted**: `boolean`

Whether or not this account is currently closed.

#### Defined in

client/v2/indexer/models/types.ts:150

___

### incentiveEligible

• `Optional` **incentiveEligible**: `boolean`

can the account receive block incentives if its balance is in range at proposal
time.

#### Defined in

client/v2/indexer/models/types.ts:156

___

### lastHeartbeat

• `Optional` **lastHeartbeat**: `number` \| `bigint`

The round in which this account last went online, or explicitly renewed their
online status.

#### Defined in

client/v2/indexer/models/types.ts:162

___

### lastProposed

• `Optional` **lastProposed**: `number` \| `bigint`

The round in which this account last proposed the block.

#### Defined in

client/v2/indexer/models/types.ts:167

___

### minBalance

• **minBalance**: `number` \| `bigint`

MicroAlgo balance required by the account.
The requirement grows based on asset and application usage.

#### Defined in

client/v2/indexer/models/types.ts:34

___

### participation

• `Optional` **participation**: [`AccountParticipation`](indexerModels.AccountParticipation.md)

AccountParticipation describes the parameters used by this account in consensus
protocol.

#### Defined in

client/v2/indexer/models/types.ts:173

___

### pendingRewards

• **pendingRewards**: `number` \| `bigint`

amount of MicroAlgos of pending rewards in this account.

#### Defined in

client/v2/indexer/models/types.ts:39

___

### rewardBase

• `Optional` **rewardBase**: `number` \| `bigint`

used as part of the rewards computation. Only applicable to accounts which are
participating.

#### Defined in

client/v2/indexer/models/types.ts:179

___

### rewards

• **rewards**: `number` \| `bigint`

total rewards of MicroAlgos the account has received, including pending rewards.

#### Defined in

client/v2/indexer/models/types.ts:44

___

### round

• **round**: `number` \| `bigint`

The round for which this information is relevant.

#### Defined in

client/v2/indexer/models/types.ts:49

___

### sigType

• `Optional` **sigType**: `string`

the type of signature used by this account, must be one of:
* sig
* msig
* lsig
* or null if unknown

#### Defined in

client/v2/indexer/models/types.ts:188

___

### status

• **status**: `string`

voting status of the account's MicroAlgos
* Offline - indicates that the associated account is delegated.
* Online - indicates that the associated account used as part of the delegation
pool.
* NotParticipating - indicates that the associated account is neither a
delegator nor a delegate.

#### Defined in

client/v2/indexer/models/types.ts:59

___

### totalAppsOptedIn

• **totalAppsOptedIn**: `number` \| `bigint`

The count of all applications that have been opted in, equivalent to the count
of application local data (AppLocalState objects) stored in this account.

#### Defined in

client/v2/indexer/models/types.ts:65

___

### totalAssetsOptedIn

• **totalAssetsOptedIn**: `number` \| `bigint`

The count of all assets that have been opted in, equivalent to the count of
AssetHolding objects held by this account.

#### Defined in

client/v2/indexer/models/types.ts:71

___

### totalBoxBytes

• **totalBoxBytes**: `number` \| `bigint`

For app-accounts only. The total number of bytes allocated for the keys and
values of boxes which belong to the associated application.

#### Defined in

client/v2/indexer/models/types.ts:77

___

### totalBoxes

• **totalBoxes**: `number` \| `bigint`

For app-accounts only. The total number of boxes which belong to the associated
application.

#### Defined in

client/v2/indexer/models/types.ts:83

___

### totalCreatedApps

• **totalCreatedApps**: `number` \| `bigint`

The count of all apps (AppParams objects) created by this account.

#### Defined in

client/v2/indexer/models/types.ts:88

___

### totalCreatedAssets

• **totalCreatedAssets**: `number` \| `bigint`

The count of all assets (AssetParams objects) created by this account.

#### Defined in

client/v2/indexer/models/types.ts:93

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

▸ `Static` **from_obj_for_encoding**(`data`): [`Account`](indexerModels.Account.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`Account`](indexerModels.Account.md)

#### Defined in

client/v2/indexer/models/types.ts:378
