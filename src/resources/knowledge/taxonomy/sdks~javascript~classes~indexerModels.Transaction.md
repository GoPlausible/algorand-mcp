[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / Transaction

# Class: Transaction

[indexerModels](../modules/indexerModels.md).Transaction

Contains all fields common to all transactions and serves as an envelope to all
transactions type. Represents both regular and inner transactions.
Definition:
data/transactions/signedtxn.go : SignedTxn
data/transactions/transaction.go : Transaction

## Hierarchy

- `default`

  ↳ **`Transaction`**

## Table of contents

### Constructors

- [constructor](indexerModels.Transaction.md#constructor)

### Properties

- [applicationTransaction](indexerModels.Transaction.md#applicationtransaction)
- [assetConfigTransaction](indexerModels.Transaction.md#assetconfigtransaction)
- [assetFreezeTransaction](indexerModels.Transaction.md#assetfreezetransaction)
- [assetTransferTransaction](indexerModels.Transaction.md#assettransfertransaction)
- [attribute\_map](indexerModels.Transaction.md#attribute_map)
- [authAddr](indexerModels.Transaction.md#authaddr)
- [closeRewards](indexerModels.Transaction.md#closerewards)
- [closingAmount](indexerModels.Transaction.md#closingamount)
- [confirmedRound](indexerModels.Transaction.md#confirmedround)
- [createdApplicationIndex](indexerModels.Transaction.md#createdapplicationindex)
- [createdAssetIndex](indexerModels.Transaction.md#createdassetindex)
- [fee](indexerModels.Transaction.md#fee)
- [firstValid](indexerModels.Transaction.md#firstvalid)
- [genesisHash](indexerModels.Transaction.md#genesishash)
- [genesisId](indexerModels.Transaction.md#genesisid)
- [globalStateDelta](indexerModels.Transaction.md#globalstatedelta)
- [group](indexerModels.Transaction.md#group)
- [id](indexerModels.Transaction.md#id)
- [innerTxns](indexerModels.Transaction.md#innertxns)
- [intraRoundOffset](indexerModels.Transaction.md#intraroundoffset)
- [keyregTransaction](indexerModels.Transaction.md#keyregtransaction)
- [lastValid](indexerModels.Transaction.md#lastvalid)
- [lease](indexerModels.Transaction.md#lease)
- [localStateDelta](indexerModels.Transaction.md#localstatedelta)
- [logs](indexerModels.Transaction.md#logs)
- [note](indexerModels.Transaction.md#note)
- [paymentTransaction](indexerModels.Transaction.md#paymenttransaction)
- [receiverRewards](indexerModels.Transaction.md#receiverrewards)
- [rekeyTo](indexerModels.Transaction.md#rekeyto)
- [roundTime](indexerModels.Transaction.md#roundtime)
- [sender](indexerModels.Transaction.md#sender)
- [senderRewards](indexerModels.Transaction.md#senderrewards)
- [signature](indexerModels.Transaction.md#signature)
- [stateProofTransaction](indexerModels.Transaction.md#stateprooftransaction)
- [txType](indexerModels.Transaction.md#txtype)

### Methods

- [get\_obj\_for\_encoding](indexerModels.Transaction.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.Transaction.md#from_obj_for_encoding)

## Constructors

### constructor

• **new Transaction**(`«destructured»`)

Creates a new `Transaction` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `applicationTransaction?` | [`TransactionApplication`](indexerModels.TransactionApplication.md) |
| › `assetConfigTransaction?` | [`TransactionAssetConfig`](indexerModels.TransactionAssetConfig.md) |
| › `assetFreezeTransaction?` | [`TransactionAssetFreeze`](indexerModels.TransactionAssetFreeze.md) |
| › `assetTransferTransaction?` | [`TransactionAssetTransfer`](indexerModels.TransactionAssetTransfer.md) |
| › `authAddr?` | `string` |
| › `closeRewards?` | `number` \| `bigint` |
| › `closingAmount?` | `number` \| `bigint` |
| › `confirmedRound?` | `number` \| `bigint` |
| › `createdApplicationIndex?` | `number` \| `bigint` |
| › `createdAssetIndex?` | `number` \| `bigint` |
| › `fee` | `number` \| `bigint` |
| › `firstValid` | `number` \| `bigint` |
| › `genesisHash?` | `string` \| `Uint8Array` |
| › `genesisId?` | `string` |
| › `globalStateDelta?` | [`EvalDeltaKeyValue`](indexerModels.EvalDeltaKeyValue.md)[] |
| › `group?` | `string` \| `Uint8Array` |
| › `id?` | `string` |
| › `innerTxns?` | [`Transaction`](indexerModels.Transaction.md)[] |
| › `intraRoundOffset?` | `number` \| `bigint` |
| › `keyregTransaction?` | [`TransactionKeyreg`](indexerModels.TransactionKeyreg.md) |
| › `lastValid` | `number` \| `bigint` |
| › `lease?` | `string` \| `Uint8Array` |
| › `localStateDelta?` | [`AccountStateDelta`](indexerModels.AccountStateDelta.md)[] |
| › `logs?` | `Uint8Array`[] |
| › `note?` | `string` \| `Uint8Array` |
| › `paymentTransaction?` | [`TransactionPayment`](indexerModels.TransactionPayment.md) |
| › `receiverRewards?` | `number` \| `bigint` |
| › `rekeyTo?` | `string` |
| › `roundTime?` | `number` \| `bigint` |
| › `sender` | `string` |
| › `senderRewards?` | `number` \| `bigint` |
| › `signature?` | [`TransactionSignature`](indexerModels.TransactionSignature.md) |
| › `stateProofTransaction?` | [`TransactionStateProof`](indexerModels.TransactionStateProof.md) |
| › `txType?` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:4377

## Properties

### applicationTransaction

• `Optional` **applicationTransaction**: [`TransactionApplication`](indexerModels.TransactionApplication.md)

Fields for application transactions.
Definition:
data/transactions/application.go : ApplicationCallTxnFields

#### Defined in

client/v2/indexer/models/types.ts:4117

___

### assetConfigTransaction

• `Optional` **assetConfigTransaction**: [`TransactionAssetConfig`](indexerModels.TransactionAssetConfig.md)

Fields for asset allocation, re-configuration, and destruction.
A zero value for asset-id indicates asset creation.
A zero value for the params indicates asset destruction.
Definition:
data/transactions/asset.go : AssetConfigTxnFields

#### Defined in

client/v2/indexer/models/types.ts:4126

___

### assetFreezeTransaction

• `Optional` **assetFreezeTransaction**: [`TransactionAssetFreeze`](indexerModels.TransactionAssetFreeze.md)

Fields for an asset freeze transaction.
Definition:
data/transactions/asset.go : AssetFreezeTxnFields

#### Defined in

client/v2/indexer/models/types.ts:4133

___

### assetTransferTransaction

• `Optional` **assetTransferTransaction**: [`TransactionAssetTransfer`](indexerModels.TransactionAssetTransfer.md)

Fields for an asset transfer transaction.
Definition:
data/transactions/asset.go : AssetTransferTxnFields

#### Defined in

client/v2/indexer/models/types.ts:4140

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

(sgnr) this is included with signed transactions when the signing address does
not equal the sender. The backend can use this to ensure that auth addr is equal
to the accounts auth addr.

#### Defined in

client/v2/indexer/models/types.ts:4147

___

### closeRewards

• `Optional` **closeRewards**: `number` \| `bigint`

(rc) rewards applied to close-remainder-to account.

#### Defined in

client/v2/indexer/models/types.ts:4152

___

### closingAmount

• `Optional` **closingAmount**: `number` \| `bigint`

(ca) closing amount for transaction.

#### Defined in

client/v2/indexer/models/types.ts:4157

___

### confirmedRound

• `Optional` **confirmedRound**: `number` \| `bigint`

Round when the transaction was confirmed.

#### Defined in

client/v2/indexer/models/types.ts:4162

___

### createdApplicationIndex

• `Optional` **createdApplicationIndex**: `number` \| `bigint`

Specifies an application index (ID) if an application was created with this
transaction.

#### Defined in

client/v2/indexer/models/types.ts:4168

___

### createdAssetIndex

• `Optional` **createdAssetIndex**: `number` \| `bigint`

Specifies an asset index (ID) if an asset was created with this transaction.

#### Defined in

client/v2/indexer/models/types.ts:4173

___

### fee

• **fee**: `number` \| `bigint`

(fee) Transaction fee.

#### Defined in

client/v2/indexer/models/types.ts:4095

___

### firstValid

• **firstValid**: `number` \| `bigint`

(fv) First valid round for this transaction.

#### Defined in

client/v2/indexer/models/types.ts:4100

___

### genesisHash

• `Optional` **genesisHash**: `Uint8Array`

(gh) Hash of genesis block.

#### Defined in

client/v2/indexer/models/types.ts:4178

___

### genesisId

• `Optional` **genesisId**: `string`

(gen) genesis block ID.

#### Defined in

client/v2/indexer/models/types.ts:4183

___

### globalStateDelta

• `Optional` **globalStateDelta**: [`EvalDeltaKeyValue`](indexerModels.EvalDeltaKeyValue.md)[]

(gd) Global state key/value changes for the application being executed by this
transaction.

#### Defined in

client/v2/indexer/models/types.ts:4189

___

### group

• `Optional` **group**: `Uint8Array`

(grp) Base64 encoded byte array of a sha512/256 digest. When present indicates
that this transaction is part of a transaction group and the value is the
sha512/256 hash of the transactions in that group.

#### Defined in

client/v2/indexer/models/types.ts:4196

___

### id

• `Optional` **id**: `string`

Transaction ID

#### Defined in

client/v2/indexer/models/types.ts:4201

___

### innerTxns

• `Optional` **innerTxns**: [`Transaction`](indexerModels.Transaction.md)[]

Inner transactions produced by application execution.

#### Defined in

client/v2/indexer/models/types.ts:4206

___

### intraRoundOffset

• `Optional` **intraRoundOffset**: `number` \| `bigint`

Offset into the round where this transaction was confirmed.

#### Defined in

client/v2/indexer/models/types.ts:4211

___

### keyregTransaction

• `Optional` **keyregTransaction**: [`TransactionKeyreg`](indexerModels.TransactionKeyreg.md)

Fields for a keyreg transaction.
Definition:
data/transactions/keyreg.go : KeyregTxnFields

#### Defined in

client/v2/indexer/models/types.ts:4218

___

### lastValid

• **lastValid**: `number` \| `bigint`

(lv) Last valid round for this transaction.

#### Defined in

client/v2/indexer/models/types.ts:4105

___

### lease

• `Optional` **lease**: `Uint8Array`

(lx) Base64 encoded 32-byte array. Lease enforces mutual exclusion of
transactions. If this field is nonzero, then once the transaction is confirmed,
it acquires the lease identified by the (Sender, Lease) pair of the transaction
until the LastValid round passes. While this transaction possesses the lease, no
other transaction specifying this lease can be confirmed.

#### Defined in

client/v2/indexer/models/types.ts:4227

___

### localStateDelta

• `Optional` **localStateDelta**: [`AccountStateDelta`](indexerModels.AccountStateDelta.md)[]

(ld) Local state key/value changes for the application being executed by this
transaction.

#### Defined in

client/v2/indexer/models/types.ts:4233

___

### logs

• `Optional` **logs**: `Uint8Array`[]

(lg) Logs for the application being executed by this transaction.

#### Defined in

client/v2/indexer/models/types.ts:4238

___

### note

• `Optional` **note**: `Uint8Array`

(note) Free form data.

#### Defined in

client/v2/indexer/models/types.ts:4243

___

### paymentTransaction

• `Optional` **paymentTransaction**: [`TransactionPayment`](indexerModels.TransactionPayment.md)

Fields for a payment transaction.
Definition:
data/transactions/payment.go : PaymentTxnFields

#### Defined in

client/v2/indexer/models/types.ts:4250

___

### receiverRewards

• `Optional` **receiverRewards**: `number` \| `bigint`

(rr) rewards applied to receiver account.

#### Defined in

client/v2/indexer/models/types.ts:4255

___

### rekeyTo

• `Optional` **rekeyTo**: `string`

(rekey) when included in a valid transaction, the accounts auth addr will be
updated with this value and future signatures must be signed with the key
represented by this address.

#### Defined in

client/v2/indexer/models/types.ts:4262

___

### roundTime

• `Optional` **roundTime**: `number` \| `bigint`

Time when the block this transaction is in was confirmed.

#### Defined in

client/v2/indexer/models/types.ts:4267

___

### sender

• **sender**: `string`

(snd) Sender's address.

#### Defined in

client/v2/indexer/models/types.ts:4110

___

### senderRewards

• `Optional` **senderRewards**: `number` \| `bigint`

(rs) rewards applied to sender account.

#### Defined in

client/v2/indexer/models/types.ts:4272

___

### signature

• `Optional` **signature**: [`TransactionSignature`](indexerModels.TransactionSignature.md)

Validation signature associated with some data. Only one of the signatures
should be provided.

#### Defined in

client/v2/indexer/models/types.ts:4278

___

### stateProofTransaction

• `Optional` **stateProofTransaction**: [`TransactionStateProof`](indexerModels.TransactionStateProof.md)

Fields for a state proof transaction.
Definition:
data/transactions/stateproof.go : StateProofTxnFields

#### Defined in

client/v2/indexer/models/types.ts:4285

___

### txType

• `Optional` **txType**: `string`

(type) Indicates what type of transaction this is. Different types have
different fields.
Valid types, and where their fields are stored:
* (pay) payment-transaction
* (keyreg) keyreg-transaction
* (acfg) asset-config-transaction
* (axfer) asset-transfer-transaction
* (afrz) asset-freeze-transaction
* (appl) application-transaction
* (stpf) state-proof-transaction

#### Defined in

client/v2/indexer/models/types.ts:4299

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

▸ `Static` **from_obj_for_encoding**(`data`): [`Transaction`](indexerModels.Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`Transaction`](indexerModels.Transaction.md)

#### Defined in

client/v2/indexer/models/types.ts:4535
