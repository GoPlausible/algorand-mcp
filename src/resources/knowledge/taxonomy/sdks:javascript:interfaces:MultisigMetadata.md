[algosdk](../README.md) / [Exports](../modules.md) / MultisigMetadata

# Interface: MultisigMetadata

Required options for creating a multisignature

Documentation available at: https://developer.algorand.org/docs/features/transactions/signatures/#multisignatures

## Table of contents

### Properties

- [addrs](MultisigMetadata.md#addrs)
- [threshold](MultisigMetadata.md#threshold)
- [version](MultisigMetadata.md#version)

## Properties

### addrs

• **addrs**: `string`[]

A list of Algorand addresses representing possible signers for this multisig. Order is important.

#### Defined in

types/multisig.ts:21

___

### threshold

• **threshold**: `number`

Multisig threshold value. Authorization requires a subset of signatures,
equal to or greater than the threshold value.

#### Defined in

types/multisig.ts:16

___

### version

• **version**: `number`

Multisig version

#### Defined in

types/multisig.ts:10
