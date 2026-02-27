[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / Account

# Class: Account

[modelsv2](../modules/modelsv2.md).Account

Account information at a given round.
Definition:
data/basics/userBalance.go : AccountData

## Hierarchy

- `default`

  ↳ **`Account`**

## Table of contents

### Constructors

- [constructor](modelsv2.Account.md#constructor)

### Properties

- [address](modelsv2.Account.md#address)
- [amount](modelsv2.Account.md#amount)
- [amountWithoutPendingRewards](modelsv2.Account.md#amountwithoutpendingrewards)
- [appsLocalState](modelsv2.Account.md#appslocalstate)
- [appsTotalExtraPages](modelsv2.Account.md#appstotalextrapages)
- [appsTotalSchema](modelsv2.Account.md#appstotalschema)
- [assets](modelsv2.Account.md#assets)
- [attribute\_map](modelsv2.Account.md#attribute_map)
- [authAddr](modelsv2.Account.md#authaddr)
- [createdApps](modelsv2.Account.md#createdapps)
- [createdAssets](modelsv2.Account.md#createdassets)
- [incentiveEligible](modelsv2.Account.md#incentiveeligible)
- [lastHeartbeat](modelsv2.Account.md#lastheartbeat)
- [lastProposed](modelsv2.Account.md#lastproposed)
- [minBalance](modelsv2.Account.md#minbalance)
- [participation](modelsv2.Account.md#participation)
- [pendingRewards](modelsv2.Account.md#pendingrewards)
- [rewardBase](modelsv2.Account.md#rewardbase)
- [rewards](modelsv2.Account.md#rewards)
- [round](modelsv2.Account.md#round)
- [sigType](modelsv2.Account.md#sigtype)
- [status](modelsv2.Account.md#status)
- [totalAppsOptedIn](modelsv2.Account.md#totalappsoptedin)
- [totalAssetsOptedIn](modelsv2.Account.md#totalassetsoptedin)
- [totalBoxBytes](modelsv2.Account.md#totalboxbytes)
- [totalBoxes](modelsv2.Account.md#totalboxes)
- [totalCreatedApps](modelsv2.Account.md#totalcreatedapps)
- [totalCreatedAssets](modelsv2.Account.md#totalcreatedassets)

### Methods

- [get\_obj\_for\_encoding](modelsv2.Account.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.Account.md#from_obj_for_encoding)

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
| › `appsLocalState?` | [`ApplicationLocalState`](modelsv2.ApplicationLocalState.md)[] |
| › `appsTotalExtraPages?` | `number` \| `bigint` |
| › `appsTotalSchema?` | [`ApplicationStateSchema`](modelsv2.ApplicationStateSchema.md) |
| › `assets?` | [`AssetHolding`](modelsv2.AssetHolding.md)[] |
| › `authAddr?` | `string` |
| › `createdApps?` | [`Application`](modelsv2.Application.md)[] |
| › `createdAssets?` | [`Asset`](modelsv2.Asset.md)[] |
| › `incentiveEligible?` | `boolean` |
| › `lastHeartbeat?` | `number` \| `bigint` |
| › `lastProposed?` | `number` \| `bigint` |
| › `minBalance` | `number` \| `bigint` |
| › `participation?` | [`AccountParticipation`](modelsv2.AccountParticipation.md) |
| › `pendingRewards` | `number` \| `bigint` |
| › `rewardBase?` | `number` \| `bigint` |
| › `rewards` | `number` \| `bigint` |
| › `round` | `number` \| `bigint` |
| › `sigType?` | `string` |
| › `status` | `string` |
| › `totalAppsOptedIn` | `number` \| `bigint` |
| › `totalAssetsOptedIn` | `number` \| `bigint` |
| › `totalBoxBytes?` | `number` \| `bigint` |
| › `totalBoxes?` | `number` \| `bigint` |
| › `totalCreatedApps` | `number` \| `bigint` |
| › `totalCreatedAssets` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:234

## Properties

### address

• **address**: `string`

the account public key

#### Defined in

client/v2/algod/models/types.ts:20

___

### amount

• **amount**: `number` \| `bigint`

(algo) total number of MicroAlgos in the account

#### Defined in

client/v2/algod/models/types.ts:25

___

### amountWithoutPendingRewards

• **amountWithoutPendingRewards**: `number` \| `bigint`

specifies the amount of MicroAlgos in the account, without the pending rewards.

#### Defined in

client/v2/algod/models/types.ts:30

___

### appsLocalState

• `Optional` **appsLocalState**: [`ApplicationLocalState`](modelsv2.ApplicationLocalState.md)[]

(appl) applications local data stored in this account.
Note the raw object uses `map[int] -> AppLocalState` for this type.

#### Defined in

client/v2/algod/models/types.ts:90

___

### appsTotalExtraPages

• `Optional` **appsTotalExtraPages**: `number` \| `bigint`

(teap) the sum of all extra application program pages for this account.

#### Defined in

client/v2/algod/models/types.ts:95

___

### appsTotalSchema

• `Optional` **appsTotalSchema**: [`ApplicationStateSchema`](modelsv2.ApplicationStateSchema.md)

(tsch) stores the sum of all of the local schemas and global schemas in this
account.
Note: the raw account uses `StateSchema` for this type.

#### Defined in

client/v2/algod/models/types.ts:102

___

### assets

• `Optional` **assets**: [`AssetHolding`](modelsv2.AssetHolding.md)[]

(asset) assets held by this account.
Note the raw object uses `map[int] -> AssetHolding` for this type.

#### Defined in

client/v2/algod/models/types.ts:108

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

(spend) the address against which signing should be checked. If empty, the
address of the current account is used. This field can be updated in any
transaction by setting the RekeyTo field.

#### Defined in

client/v2/algod/models/types.ts:115

___

### createdApps

• `Optional` **createdApps**: [`Application`](modelsv2.Application.md)[]

(appp) parameters of applications created by this account including app global
data.
Note: the raw account uses `map[int] -> AppParams` for this type.

#### Defined in

client/v2/algod/models/types.ts:122

___

### createdAssets

• `Optional` **createdAssets**: [`Asset`](modelsv2.Asset.md)[]

(apar) parameters of assets created by this account.
Note: the raw account uses `map[int] -> Asset` for this type.

#### Defined in

client/v2/algod/models/types.ts:128

___

### incentiveEligible

• `Optional` **incentiveEligible**: `boolean`

Whether or not the account can receive block incentives if its balance is in
range at proposal time.

#### Defined in

client/v2/algod/models/types.ts:134

___

### lastHeartbeat

• `Optional` **lastHeartbeat**: `number` \| `bigint`

The round in which this account last went online, or explicitly renewed their
online status.

#### Defined in

client/v2/algod/models/types.ts:140

___

### lastProposed

• `Optional` **lastProposed**: `number` \| `bigint`

The round in which this account last proposed the block.

#### Defined in

client/v2/algod/models/types.ts:145

___

### minBalance

• **minBalance**: `number` \| `bigint`

MicroAlgo balance required by the account.
The requirement grows based on asset and application usage.

#### Defined in

client/v2/algod/models/types.ts:36

___

### participation

• `Optional` **participation**: [`AccountParticipation`](modelsv2.AccountParticipation.md)

AccountParticipation describes the parameters used by this account in consensus
protocol.

#### Defined in

client/v2/algod/models/types.ts:151

___

### pendingRewards

• **pendingRewards**: `number` \| `bigint`

amount of MicroAlgos of pending rewards in this account.

#### Defined in

client/v2/algod/models/types.ts:41

___

### rewardBase

• `Optional` **rewardBase**: `number` \| `bigint`

(ebase) used as part of the rewards computation. Only applicable to accounts
which are participating.

#### Defined in

client/v2/algod/models/types.ts:157

___

### rewards

• **rewards**: `number` \| `bigint`

(ern) total rewards of MicroAlgos the account has received, including pending
rewards.

#### Defined in

client/v2/algod/models/types.ts:47

___

### round

• **round**: `number` \| `bigint`

The round for which this information is relevant.

#### Defined in

client/v2/algod/models/types.ts:52

___

### sigType

• `Optional` **sigType**: `string`

Indicates what type of signature is used by this account, must be one of:
* sig
* msig
* lsig

#### Defined in

client/v2/algod/models/types.ts:165

___

### status

• **status**: `string`

(onl) delegation status of the account's MicroAlgos
* Offline - indicates that the associated account is delegated.
* Online - indicates that the associated account used as part of the delegation
pool.
* NotParticipating - indicates that the associated account is neither a
delegator nor a delegate.

#### Defined in

client/v2/algod/models/types.ts:62

___

### totalAppsOptedIn

• **totalAppsOptedIn**: `number` \| `bigint`

The count of all applications that have been opted in, equivalent to the count
of application local data (AppLocalState objects) stored in this account.

#### Defined in

client/v2/algod/models/types.ts:68

___

### totalAssetsOptedIn

• **totalAssetsOptedIn**: `number` \| `bigint`

The count of all assets that have been opted in, equivalent to the count of
AssetHolding objects held by this account.

#### Defined in

client/v2/algod/models/types.ts:74

___

### totalBoxBytes

• `Optional` **totalBoxBytes**: `number` \| `bigint`

(tbxb) The total number of bytes used by this account's app's box keys and
values.

#### Defined in

client/v2/algod/models/types.ts:171

___

### totalBoxes

• `Optional` **totalBoxes**: `number` \| `bigint`

(tbx) The number of existing boxes created by this account's app.

#### Defined in

client/v2/algod/models/types.ts:176

___

### totalCreatedApps

• **totalCreatedApps**: `number` \| `bigint`

The count of all apps (AppParams objects) created by this account.

#### Defined in

client/v2/algod/models/types.ts:79

___

### totalCreatedAssets

• **totalCreatedAssets**: `number` \| `bigint`

The count of all assets (AssetParams objects) created by this account.

#### Defined in

client/v2/algod/models/types.ts:84

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

▸ `Static` **from_obj_for_encoding**(`data`): [`Account`](modelsv2.Account.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`Account`](modelsv2.Account.md)

#### Defined in

client/v2/algod/models/types.ts:352
