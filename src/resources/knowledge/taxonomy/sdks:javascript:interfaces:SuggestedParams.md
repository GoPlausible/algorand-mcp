[algosdk](../README.md) / [Exports](../modules.md) / SuggestedParams

# Interface: SuggestedParams

A dict holding common-to-all-txns arguments

## Table of contents

### Properties

- [fee](SuggestedParams.md#fee)
- [firstRound](SuggestedParams.md#firstround)
- [flatFee](SuggestedParams.md#flatfee)
- [genesisHash](SuggestedParams.md#genesishash)
- [genesisID](SuggestedParams.md#genesisid)
- [lastRound](SuggestedParams.md#lastround)

## Properties

### fee

• **fee**: `number`

Integer fee per byte, in microAlgos. For a flat fee, set flatFee to true

#### Defined in

types/transactions/base.ts:110

___

### firstRound

• **firstRound**: `number`

First protocol round on which this txn is valid

#### Defined in

types/transactions/base.ts:115

___

### flatFee

• `Optional` **flatFee**: `boolean`

Set this to true to specify fee as microalgos-per-txn
  If the final calculated fee is lower than the protocol minimum fee, the fee will be increased to match the minimum

#### Defined in

types/transactions/base.ts:105

___

### genesisHash

• **genesisHash**: `string`

Specifies hash genesis block of network in use

#### Defined in

types/transactions/base.ts:130

___

### genesisID

• **genesisID**: `string`

Specifies genesis ID of network in use

#### Defined in

types/transactions/base.ts:125

___

### lastRound

• **lastRound**: `number`

Last protocol round on which this txn is valid

#### Defined in

types/transactions/base.ts:120
