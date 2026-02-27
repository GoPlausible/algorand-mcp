[@algorandfoundation/algokit-utils](../README.md) / [types/app](../modules/types_app.md) / AppStorageSchema

# Interface: AppStorageSchema

[types/app](../modules/types_app.md).AppStorageSchema

Parameters representing the storage schema of an app.

## Table of contents

### Properties

- [extraPages](types_app.AppStorageSchema.md#extrapages)
- [globalByteSlices](types_app.AppStorageSchema.md#globalbyteslices)
- [globalInts](types_app.AppStorageSchema.md#globalints)
- [localByteSlices](types_app.AppStorageSchema.md#localbyteslices)
- [localInts](types_app.AppStorageSchema.md#localints)

## Properties

### extraPages

• `Optional` **extraPages**: `number`

Any extra pages that are needed for the smart contract; if left blank then the right number of pages will be calculated based on the teal code size

#### Defined in

[src/types/app.ts:209](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L209)

___

### globalByteSlices

• **globalByteSlices**: `number`

Restricts number of byte slices in global state

#### Defined in

[src/types/app.ts:207](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L207)

___

### globalInts

• **globalInts**: `number`

Restricts number of ints in global state

#### Defined in

[src/types/app.ts:205](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L205)

___

### localByteSlices

• **localByteSlices**: `number`

Restricts number of byte slices in per-user local state

#### Defined in

[src/types/app.ts:203](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L203)

___

### localInts

• **localInts**: `number`

Restricts number of ints in per-user local state

#### Defined in

[src/types/app.ts:201](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L201)
