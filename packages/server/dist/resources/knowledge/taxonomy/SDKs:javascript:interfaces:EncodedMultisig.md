[algosdk](../README.md) / [Exports](../modules.md) / EncodedMultisig

# Interface: EncodedMultisig

A rough structure for the encoded multi signature transaction object.
Every property is labelled with its associated `MultisigMetadata` type property

## Table of contents

### Properties

- [subsig](EncodedMultisig.md#subsig)
- [thr](EncodedMultisig.md#thr)
- [v](EncodedMultisig.md#v)

## Properties

### subsig

• **subsig**: [`EncodedSubsig`](EncodedSubsig.md)[]

Subset of signatures. A threshold of `thr` signors is required.

#### Defined in

types/transactions/encoded.ts:365

___

### thr

• **thr**: `number`

threshold

#### Defined in

types/transactions/encoded.ts:360

___

### v

• **v**: `number`

version

#### Defined in

types/transactions/encoded.ts:355
