[@algorandfoundation/algokit-utils](../README.md) / [types/app](../modules/types_app.md) / CompiledTeal

# Interface: CompiledTeal

[types/app](../modules/types_app.md).CompiledTeal

Information about a compiled teal program

## Table of contents

### Properties

- [compiled](types_app.CompiledTeal.md#compiled)
- [compiledBase64ToBytes](types_app.CompiledTeal.md#compiledbase64tobytes)
- [compiledHash](types_app.CompiledTeal.md#compiledhash)
- [sourceMap](types_app.CompiledTeal.md#sourcemap)
- [teal](types_app.CompiledTeal.md#teal)

## Properties

### compiled

• **compiled**: `string`

The compiled code

#### Defined in

[src/types/app.ts:217](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L217)

___

### compiledBase64ToBytes

• **compiledBase64ToBytes**: `Uint8Array`

The base64 encoded code as a byte array

#### Defined in

[src/types/app.ts:221](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L221)

___

### compiledHash

• **compiledHash**: `string`

The hash returned by the compiler

#### Defined in

[src/types/app.ts:219](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L219)

___

### sourceMap

• **sourceMap**: `ProgramSourceMap`

Source map from the compilation

#### Defined in

[src/types/app.ts:223](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L223)

___

### teal

• **teal**: `string`

Original TEAL code

#### Defined in

[src/types/app.ts:215](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L215)
