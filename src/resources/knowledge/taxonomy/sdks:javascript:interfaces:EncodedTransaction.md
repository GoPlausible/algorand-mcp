[algosdk](../README.md) / [Exports](../modules.md) / EncodedTransaction

# Interface: EncodedTransaction

A rough structure for the encoded transaction object. Every property is labelled with its associated Transaction type property

## Table of contents

### Properties

- [aamt](EncodedTransaction.md#aamt)
- [aclose](EncodedTransaction.md#aclose)
- [afrz](EncodedTransaction.md#afrz)
- [amt](EncodedTransaction.md#amt)
- [apaa](EncodedTransaction.md#apaa)
- [apan](EncodedTransaction.md#apan)
- [apap](EncodedTransaction.md#apap)
- [apar](EncodedTransaction.md#apar)
- [apas](EncodedTransaction.md#apas)
- [apat](EncodedTransaction.md#apat)
- [apbx](EncodedTransaction.md#apbx)
- [apep](EncodedTransaction.md#apep)
- [apfa](EncodedTransaction.md#apfa)
- [apgs](EncodedTransaction.md#apgs)
- [apid](EncodedTransaction.md#apid)
- [apls](EncodedTransaction.md#apls)
- [apsu](EncodedTransaction.md#apsu)
- [arcv](EncodedTransaction.md#arcv)
- [asnd](EncodedTransaction.md#asnd)
- [caid](EncodedTransaction.md#caid)
- [close](EncodedTransaction.md#close)
- [fadd](EncodedTransaction.md#fadd)
- [faid](EncodedTransaction.md#faid)
- [fee](EncodedTransaction.md#fee)
- [fv](EncodedTransaction.md#fv)
- [gen](EncodedTransaction.md#gen)
- [gh](EncodedTransaction.md#gh)
- [grp](EncodedTransaction.md#grp)
- [lv](EncodedTransaction.md#lv)
- [lx](EncodedTransaction.md#lx)
- [nonpart](EncodedTransaction.md#nonpart)
- [note](EncodedTransaction.md#note)
- [rcv](EncodedTransaction.md#rcv)
- [rekey](EncodedTransaction.md#rekey)
- [selkey](EncodedTransaction.md#selkey)
- [snd](EncodedTransaction.md#snd)
- [sp](EncodedTransaction.md#sp)
- [spmsg](EncodedTransaction.md#spmsg)
- [sprfkey](EncodedTransaction.md#sprfkey)
- [sptype](EncodedTransaction.md#sptype)
- [type](EncodedTransaction.md#type)
- [votefst](EncodedTransaction.md#votefst)
- [votekd](EncodedTransaction.md#votekd)
- [votekey](EncodedTransaction.md#votekey)
- [votelst](EncodedTransaction.md#votelst)
- [xaid](EncodedTransaction.md#xaid)

## Properties

### aamt

• `Optional` **aamt**: `number` \| `bigint`

amount (but for asset transfers)

#### Defined in

types/transactions/encoded.ts:162

___

### aclose

• `Optional` **aclose**: `Buffer`

closeRemainderTo (but for asset transfers)

#### Defined in

types/transactions/encoded.ts:172

___

### afrz

• `Optional` **afrz**: `boolean`

freezeState

#### Defined in

types/transactions/encoded.ts:242

___

### amt

• `Optional` **amt**: `number` \| `bigint`

amount

#### Defined in

types/transactions/encoded.ts:157

___

### apaa

• `Optional` **apaa**: `Buffer`[]

appArgs

#### Defined in

types/transactions/encoded.ts:302

___

### apan

• `Optional` **apan**: `number`

appOnComplete

#### Defined in

types/transactions/encoded.ts:267

___

### apap

• `Optional` **apap**: `Buffer`

appApprovalProgram

#### Defined in

types/transactions/encoded.ts:292

___

### apar

• `Optional` **apar**: [`EncodedAssetParams`](EncodedAssetParams.md)

See EncodedAssetParams type

#### Defined in

types/transactions/encoded.ts:257

___

### apas

• `Optional` **apas**: `number`[]

appForeignAssets

#### Defined in

types/transactions/encoded.ts:287

___

### apat

• `Optional` **apat**: `Buffer`[]

appAccounts

#### Defined in

types/transactions/encoded.ts:307

___

### apbx

• `Optional` **apbx**: [`EncodedBoxReference`](EncodedBoxReference.md)[]

boxes

#### Defined in

types/transactions/encoded.ts:317

___

### apep

• `Optional` **apep**: `number`

extraPages

#### Defined in

types/transactions/encoded.ts:312

___

### apfa

• `Optional` **apfa**: `number`[]

appForeignApps

#### Defined in

types/transactions/encoded.ts:282

___

### apgs

• `Optional` **apgs**: [`EncodedGlobalStateSchema`](EncodedGlobalStateSchema.md)

See EncodedGlobalStateSchema type

#### Defined in

types/transactions/encoded.ts:277

___

### apid

• `Optional` **apid**: `number`

appIndex

#### Defined in

types/transactions/encoded.ts:262

___

### apls

• `Optional` **apls**: [`EncodedLocalStateSchema`](EncodedLocalStateSchema.md)

See EncodedLocalStateSchema type

#### Defined in

types/transactions/encoded.ts:272

___

### apsu

• `Optional` **apsu**: `Buffer`

appClearProgram

#### Defined in

types/transactions/encoded.ts:297

___

### arcv

• `Optional` **arcv**: `Buffer`

to (but for asset transfers)

#### Defined in

types/transactions/encoded.ts:187

___

### asnd

• `Optional` **asnd**: `Buffer`

assetRevocationTarget

#### Defined in

types/transactions/encoded.ts:252

___

### caid

• `Optional` **caid**: `number`

assetIndex

#### Defined in

types/transactions/encoded.ts:227

___

### close

• `Optional` **close**: `Buffer`

closeRemainderTo

#### Defined in

types/transactions/encoded.ts:167

___

### fadd

• `Optional` **fadd**: `Buffer`

freezeAccount

#### Defined in

types/transactions/encoded.ts:247

___

### faid

• `Optional` **faid**: `number`

assetIndex (but for asset freezing/unfreezing)

#### Defined in

types/transactions/encoded.ts:237

___

### fee

• `Optional` **fee**: `number`

fee

#### Defined in

types/transactions/encoded.ts:107

___

### fv

• `Optional` **fv**: `number`

firstRound

#### Defined in

types/transactions/encoded.ts:112

___

### gen

• **gen**: `string`

genesisID

#### Defined in

types/transactions/encoded.ts:137

___

### gh

• **gh**: `Buffer`

genesisHash

#### Defined in

types/transactions/encoded.ts:142

___

### grp

• `Optional` **grp**: `Buffer`

group

#### Defined in

types/transactions/encoded.ts:152

___

### lv

• **lv**: `number`

lastRound

#### Defined in

types/transactions/encoded.ts:117

___

### lx

• `Optional` **lx**: `Buffer`

lease

#### Defined in

types/transactions/encoded.ts:147

___

### nonpart

• `Optional` **nonpart**: `boolean`

nonParticipation

#### Defined in

types/transactions/encoded.ts:222

___

### note

• `Optional` **note**: `Buffer`

note

#### Defined in

types/transactions/encoded.ts:122

___

### rcv

• `Optional` **rcv**: `Buffer`

to

#### Defined in

types/transactions/encoded.ts:182

___

### rekey

• `Optional` **rekey**: `Buffer`

reKeyTo

#### Defined in

types/transactions/encoded.ts:177

___

### selkey

• `Optional` **selkey**: `Buffer`

selectionKey

#### Defined in

types/transactions/encoded.ts:197

___

### snd

• **snd**: `Buffer`

from

#### Defined in

types/transactions/encoded.ts:127

___

### sp

• `Optional` **sp**: `Buffer`

stateProof

#### Defined in

types/transactions/encoded.ts:327

___

### spmsg

• `Optional` **spmsg**: `Buffer`

stateProofMessage

#### Defined in

types/transactions/encoded.ts:332

___

### sprfkey

• `Optional` **sprfkey**: `Buffer`

stateProofKey

#### Defined in

types/transactions/encoded.ts:202

___

### sptype

• `Optional` **sptype**: `number` \| `bigint`

#### Defined in

types/transactions/encoded.ts:322

___

### type

• **type**: `string`

type

#### Defined in

types/transactions/encoded.ts:132

___

### votefst

• `Optional` **votefst**: `number`

voteFirst

#### Defined in

types/transactions/encoded.ts:207

___

### votekd

• `Optional` **votekd**: `number`

voteKeyDilution

#### Defined in

types/transactions/encoded.ts:217

___

### votekey

• `Optional` **votekey**: `Buffer`

voteKey

#### Defined in

types/transactions/encoded.ts:192

___

### votelst

• `Optional` **votelst**: `number`

voteLast

#### Defined in

types/transactions/encoded.ts:212

___

### xaid

• `Optional` **xaid**: `number`

assetIndex (but for asset transfers)

#### Defined in

types/transactions/encoded.ts:232
