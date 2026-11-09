[algosdk](../README.md) / [Exports](../modules.md) / Transaction

# Class: Transaction

Transaction enables construction of Algorand transactions

## Implements

- `TransactionStorageStructure`

## Table of contents

### Constructors

- [constructor](Transaction.md#constructor)

### Properties

- [amount](Transaction.md#amount)
- [appAccounts](Transaction.md#appaccounts)
- [appApprovalProgram](Transaction.md#appapprovalprogram)
- [appArgs](Transaction.md#appargs)
- [appClearProgram](Transaction.md#appclearprogram)
- [appForeignApps](Transaction.md#appforeignapps)
- [appForeignAssets](Transaction.md#appforeignassets)
- [appGlobalByteSlices](Transaction.md#appglobalbyteslices)
- [appGlobalInts](Transaction.md#appglobalints)
- [appIndex](Transaction.md#appindex)
- [appLocalByteSlices](Transaction.md#applocalbyteslices)
- [appLocalInts](Transaction.md#applocalints)
- [appOnComplete](Transaction.md#apponcomplete)
- [assetClawback](Transaction.md#assetclawback)
- [assetDecimals](Transaction.md#assetdecimals)
- [assetDefaultFrozen](Transaction.md#assetdefaultfrozen)
- [assetFreeze](Transaction.md#assetfreeze)
- [assetIndex](Transaction.md#assetindex)
- [assetManager](Transaction.md#assetmanager)
- [assetMetadataHash](Transaction.md#assetmetadatahash)
- [assetName](Transaction.md#assetname)
- [assetReserve](Transaction.md#assetreserve)
- [assetRevocationTarget](Transaction.md#assetrevocationtarget)
- [assetTotal](Transaction.md#assettotal)
- [assetURL](Transaction.md#asseturl)
- [assetUnitName](Transaction.md#assetunitname)
- [boxes](Transaction.md#boxes)
- [closeRemainderTo](Transaction.md#closeremainderto)
- [extraPages](Transaction.md#extrapages)
- [fee](Transaction.md#fee)
- [firstRound](Transaction.md#firstround)
- [flatFee](Transaction.md#flatfee)
- [freezeAccount](Transaction.md#freezeaccount)
- [freezeState](Transaction.md#freezestate)
- [from](Transaction.md#from)
- [genesisHash](Transaction.md#genesishash)
- [genesisID](Transaction.md#genesisid)
- [group](Transaction.md#group)
- [lastRound](Transaction.md#lastround)
- [lease](Transaction.md#lease)
- [name](Transaction.md#name)
- [nonParticipation](Transaction.md#nonparticipation)
- [note](Transaction.md#note)
- [reKeyTo](Transaction.md#rekeyto)
- [selectionKey](Transaction.md#selectionkey)
- [stateProof](Transaction.md#stateproof)
- [stateProofKey](Transaction.md#stateproofkey)
- [stateProofMessage](Transaction.md#stateproofmessage)
- [stateProofType](Transaction.md#stateprooftype)
- [tag](Transaction.md#tag)
- [to](Transaction.md#to)
- [type](Transaction.md#type)
- [voteFirst](Transaction.md#votefirst)
- [voteKey](Transaction.md#votekey)
- [voteKeyDilution](Transaction.md#votekeydilution)
- [voteLast](Transaction.md#votelast)

### Methods

- [\_getDictForDisplay](Transaction.md#_getdictfordisplay)
- [addLease](Transaction.md#addlease)
- [addRekey](Transaction.md#addrekey)
- [attachSignature](Transaction.md#attachsignature)
- [bytesToSign](Transaction.md#bytestosign)
- [estimateSize](Transaction.md#estimatesize)
- [get\_obj\_for\_encoding](Transaction.md#get_obj_for_encoding)
- [prettyPrint](Transaction.md#prettyprint)
- [rawSignTxn](Transaction.md#rawsigntxn)
- [rawTxID](Transaction.md#rawtxid)
- [signTxn](Transaction.md#signtxn)
- [toByte](Transaction.md#tobyte)
- [toString](Transaction.md#tostring)
- [txID](Transaction.md#txid)
- [from\_obj\_for\_encoding](Transaction.md#from_obj_for_encoding)

## Constructors

### constructor

• **new Transaction**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `AnyTransaction` |

#### Defined in

transaction.ts:213

## Properties

### amount

• **amount**: `number` \| `bigint`

#### Implementation of

TransactionStorageStructure.amount

#### Defined in

transaction.ts:161

___

### appAccounts

• `Optional` **appAccounts**: [`Address`](../interfaces/Address.md)[]

#### Implementation of

TransactionStorageStructure.appAccounts

#### Defined in

transaction.ts:199

___

### appApprovalProgram

• **appApprovalProgram**: `Uint8Array`

#### Implementation of

TransactionStorageStructure.appApprovalProgram

#### Defined in

transaction.ts:196

___

### appArgs

• `Optional` **appArgs**: `Uint8Array`[]

#### Implementation of

TransactionStorageStructure.appArgs

#### Defined in

transaction.ts:198

___

### appClearProgram

• **appClearProgram**: `Uint8Array`

#### Implementation of

TransactionStorageStructure.appClearProgram

#### Defined in

transaction.ts:197

___

### appForeignApps

• `Optional` **appForeignApps**: `number`[]

#### Implementation of

TransactionStorageStructure.appForeignApps

#### Defined in

transaction.ts:200

___

### appForeignAssets

• `Optional` **appForeignAssets**: `number`[]

#### Implementation of

TransactionStorageStructure.appForeignAssets

#### Defined in

transaction.ts:201

___

### appGlobalByteSlices

• **appGlobalByteSlices**: `number`

#### Implementation of

TransactionStorageStructure.appGlobalByteSlices

#### Defined in

transaction.ts:195

___

### appGlobalInts

• **appGlobalInts**: `number`

#### Implementation of

TransactionStorageStructure.appGlobalInts

#### Defined in

transaction.ts:194

___

### appIndex

• **appIndex**: `number`

#### Implementation of

TransactionStorageStructure.appIndex

#### Defined in

transaction.ts:190

___

### appLocalByteSlices

• **appLocalByteSlices**: `number`

#### Implementation of

TransactionStorageStructure.appLocalByteSlices

#### Defined in

transaction.ts:193

___

### appLocalInts

• **appLocalInts**: `number`

#### Implementation of

TransactionStorageStructure.appLocalInts

#### Defined in

transaction.ts:192

___

### appOnComplete

• **appOnComplete**: [`OnApplicationComplete`](../enums/OnApplicationComplete.md)

#### Implementation of

TransactionStorageStructure.appOnComplete

#### Defined in

transaction.ts:191

___

### assetClawback

• **assetClawback**: [`Address`](../interfaces/Address.md)

#### Implementation of

TransactionStorageStructure.assetClawback

#### Defined in

transaction.ts:182

___

### assetDecimals

• **assetDecimals**: `number`

#### Implementation of

TransactionStorageStructure.assetDecimals

#### Defined in

transaction.ts:177

___

### assetDefaultFrozen

• **assetDefaultFrozen**: `boolean`

#### Implementation of

TransactionStorageStructure.assetDefaultFrozen

#### Defined in

transaction.ts:178

___

### assetFreeze

• **assetFreeze**: [`Address`](../interfaces/Address.md)

#### Implementation of

TransactionStorageStructure.assetFreeze

#### Defined in

transaction.ts:181

___

### assetIndex

• **assetIndex**: `number`

#### Implementation of

TransactionStorageStructure.assetIndex

#### Defined in

transaction.ts:175

___

### assetManager

• **assetManager**: [`Address`](../interfaces/Address.md)

#### Implementation of

TransactionStorageStructure.assetManager

#### Defined in

transaction.ts:179

___

### assetMetadataHash

• `Optional` **assetMetadataHash**: `Uint8Array`

#### Implementation of

TransactionStorageStructure.assetMetadataHash

#### Defined in

transaction.ts:186

___

### assetName

• **assetName**: `string`

#### Implementation of

TransactionStorageStructure.assetName

#### Defined in

transaction.ts:184

___

### assetReserve

• **assetReserve**: [`Address`](../interfaces/Address.md)

#### Implementation of

TransactionStorageStructure.assetReserve

#### Defined in

transaction.ts:180

___

### assetRevocationTarget

• `Optional` **assetRevocationTarget**: [`Address`](../interfaces/Address.md)

#### Implementation of

TransactionStorageStructure.assetRevocationTarget

#### Defined in

transaction.ts:189

___

### assetTotal

• **assetTotal**: `number` \| `bigint`

#### Implementation of

TransactionStorageStructure.assetTotal

#### Defined in

transaction.ts:176

___

### assetURL

• **assetURL**: `string`

#### Implementation of

TransactionStorageStructure.assetURL

#### Defined in

transaction.ts:185

___

### assetUnitName

• **assetUnitName**: `string`

#### Implementation of

TransactionStorageStructure.assetUnitName

#### Defined in

transaction.ts:183

___

### boxes

• `Optional` **boxes**: [`BoxReference`](../interfaces/BoxReference.md)[]

#### Implementation of

TransactionStorageStructure.boxes

#### Defined in

transaction.ts:202

___

### closeRemainderTo

• `Optional` **closeRemainderTo**: [`Address`](../interfaces/Address.md)

#### Implementation of

TransactionStorageStructure.closeRemainderTo

#### Defined in

transaction.ts:168

___

### extraPages

• `Optional` **extraPages**: `number`

#### Implementation of

TransactionStorageStructure.extraPages

#### Defined in

transaction.ts:208

___

### fee

• **fee**: `number`

#### Implementation of

TransactionStorageStructure.fee

#### Defined in

transaction.ts:160

___

### firstRound

• **firstRound**: `number`

#### Implementation of

TransactionStorageStructure.firstRound

#### Defined in

transaction.ts:162

___

### flatFee

• **flatFee**: `boolean`

#### Implementation of

TransactionStorageStructure.flatFee

#### Defined in

transaction.ts:204

___

### freezeAccount

• **freezeAccount**: [`Address`](../interfaces/Address.md)

#### Implementation of

TransactionStorageStructure.freezeAccount

#### Defined in

transaction.ts:187

___

### freezeState

• **freezeState**: `boolean`

#### Implementation of

TransactionStorageStructure.freezeState

#### Defined in

transaction.ts:188

___

### from

• **from**: [`Address`](../interfaces/Address.md)

#### Implementation of

TransactionStorageStructure.from

#### Defined in

transaction.ts:158

___

### genesisHash

• **genesisHash**: `Buffer`

#### Implementation of

TransactionStorageStructure.genesisHash

#### Defined in

transaction.ts:166

___

### genesisID

• **genesisID**: `string`

#### Implementation of

TransactionStorageStructure.genesisID

#### Defined in

transaction.ts:165

___

### group

• `Optional` **group**: `Buffer`

#### Implementation of

TransactionStorageStructure.group

#### Defined in

transaction.ts:207

___

### lastRound

• **lastRound**: `number`

#### Implementation of

TransactionStorageStructure.lastRound

#### Defined in

transaction.ts:163

___

### lease

• `Optional` **lease**: `Uint8Array`

#### Implementation of

TransactionStorageStructure.lease

#### Defined in

transaction.ts:167

___

### name

• **name**: `string` = `'Transaction'`

#### Defined in

transaction.ts:154

___

### nonParticipation

• `Optional` **nonParticipation**: `boolean`

#### Implementation of

TransactionStorageStructure.nonParticipation

#### Defined in

transaction.ts:206

___

### note

• `Optional` **note**: `Uint8Array`

#### Implementation of

TransactionStorageStructure.note

#### Defined in

transaction.ts:164

___

### reKeyTo

• `Optional` **reKeyTo**: [`Address`](../interfaces/Address.md)

#### Implementation of

TransactionStorageStructure.reKeyTo

#### Defined in

transaction.ts:205

___

### selectionKey

• **selectionKey**: `Buffer`

#### Implementation of

TransactionStorageStructure.selectionKey

#### Defined in

transaction.ts:170

___

### stateProof

• `Optional` **stateProof**: `Uint8Array`

#### Implementation of

TransactionStorageStructure.stateProof

#### Defined in

transaction.ts:210

___

### stateProofKey

• **stateProofKey**: `Buffer`

#### Implementation of

TransactionStorageStructure.stateProofKey

#### Defined in

transaction.ts:171

___

### stateProofMessage

• `Optional` **stateProofMessage**: `Uint8Array`

#### Implementation of

TransactionStorageStructure.stateProofMessage

#### Defined in

transaction.ts:211

___

### stateProofType

• `Optional` **stateProofType**: `number` \| `bigint`

#### Implementation of

TransactionStorageStructure.stateProofType

#### Defined in

transaction.ts:209

___

### tag

• **tag**: `Buffer`

#### Defined in

transaction.ts:155

___

### to

• **to**: [`Address`](../interfaces/Address.md)

#### Implementation of

TransactionStorageStructure.to

#### Defined in

transaction.ts:159

___

### type

• `Optional` **type**: [`TransactionType`](../enums/TransactionType.md)

#### Implementation of

TransactionStorageStructure.type

#### Defined in

transaction.ts:203

___

### voteFirst

• **voteFirst**: `number`

#### Implementation of

TransactionStorageStructure.voteFirst

#### Defined in

transaction.ts:172

___

### voteKey

• **voteKey**: `Buffer`

#### Implementation of

TransactionStorageStructure.voteKey

#### Defined in

transaction.ts:169

___

### voteKeyDilution

• **voteKeyDilution**: `number`

#### Implementation of

TransactionStorageStructure.voteKeyDilution

#### Defined in

transaction.ts:174

___

### voteLast

• **voteLast**: `number`

#### Implementation of

TransactionStorageStructure.voteLast

#### Defined in

transaction.ts:173

## Methods

### \_getDictForDisplay

▸ **_getDictForDisplay**(): `TransactionStorageStructure` & `Record`\<`string`, `any`\>

#### Returns

`TransactionStorageStructure` & `Record`\<`string`, `any`\>

#### Defined in

transaction.ts:1219

___

### addLease

▸ **addLease**(`lease`, `feePerByte?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `lease` | `Uint8Array` | `undefined` |
| `feePerByte` | `number` | `0` |

#### Returns

`void`

#### Defined in

transaction.ts:1179

___

### addRekey

▸ **addRekey**(`reKeyTo`, `feePerByte?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `reKeyTo` | `string` | `undefined` |
| `feePerByte` | `number` | `0` |

#### Returns

`void`

#### Defined in

transaction.ts:1205

___

### attachSignature

▸ **attachSignature**(`signerAddr`, `signature`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerAddr` | `string` |
| `signature` | `Uint8Array` |

#### Returns

`Uint8Array`

#### Defined in

transaction.ts:1150

___

### bytesToSign

▸ **bytesToSign**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

transaction.ts:1116

___

### estimateSize

▸ **estimateSize**(): `number`

#### Returns

`number`

#### Defined in

transaction.ts:1112

___

### get\_obj\_for\_encoding

▸ **get_obj_for_encoding**(): [`EncodedTransaction`](../interfaces/EncodedTransaction.md)

#### Returns

[`EncodedTransaction`](../interfaces/EncodedTransaction.md)

#### Defined in

transaction.ts:580

___

### prettyPrint

▸ **prettyPrint**(): `void`

#### Returns

`void`

#### Defined in

transaction.ts:1269

___

### rawSignTxn

▸ **rawSignTxn**(`sk`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sk` | `Uint8Array` |

#### Returns

`Buffer`

#### Defined in

transaction.ts:1126

___

### rawTxID

▸ **rawTxID**(): `Buffer`

#### Returns

`Buffer`

#### Defined in

transaction.ts:1166

___

### signTxn

▸ **signTxn**(`sk`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sk` | `Uint8Array` |

#### Returns

`Uint8Array`

#### Defined in

transaction.ts:1132

___

### toByte

▸ **toByte**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

transaction.ts:1121

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

transaction.ts:1275

___

### txID

▸ **txID**(): `string`

#### Returns

`string`

#### Defined in

transaction.ts:1172

___

### from\_obj\_for\_encoding

▸ `Static` **from_obj_for_encoding**(`txnForEnc`): [`Transaction`](Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `txnForEnc` | [`EncodedTransaction`](../interfaces/EncodedTransaction.md) |

#### Returns

[`Transaction`](Transaction.md)

#### Defined in

transaction.ts:926
