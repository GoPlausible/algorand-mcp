[algosdk](../README.md) / [Exports](../modules.md) / AtomicTransactionComposerStatus

# Enumeration: AtomicTransactionComposerStatus

## Table of contents

### Enumeration Members

- [BUILDING](AtomicTransactionComposerStatus.md#building)
- [BUILT](AtomicTransactionComposerStatus.md#built)
- [COMMITTED](AtomicTransactionComposerStatus.md#committed)
- [SIGNED](AtomicTransactionComposerStatus.md#signed)
- [SUBMITTED](AtomicTransactionComposerStatus.md#submitted)

## Enumeration Members

### BUILDING

• **BUILDING** = ``0``

The atomic group is still under construction.

#### Defined in

composer.ts:71

___

### BUILT

• **BUILT** = ``1``

The atomic group has been finalized, but not yet signed.

#### Defined in

composer.ts:74

___

### COMMITTED

• **COMMITTED** = ``4``

The atomic group has been finalized, signed, submitted, and successfully committed to a block.

#### Defined in

composer.ts:83

___

### SIGNED

• **SIGNED** = ``2``

The atomic group has been finalized and signed, but not yet submitted to the network.

#### Defined in

composer.ts:77

___

### SUBMITTED

• **SUBMITTED** = ``3``

The atomic group has been finalized, signed, and submitted to the network.

#### Defined in

composer.ts:80
