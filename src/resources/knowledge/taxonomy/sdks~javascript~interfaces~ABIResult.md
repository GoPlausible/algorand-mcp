[algosdk](../README.md) / [Exports](../modules.md) / ABIResult

# Interface: ABIResult

Represents the output from a successful ABI method call.

## Table of contents

### Properties

- [decodeError](ABIResult.md#decodeerror)
- [method](ABIResult.md#method)
- [rawReturnValue](ABIResult.md#rawreturnvalue)
- [returnValue](ABIResult.md#returnvalue)
- [txID](ABIResult.md#txid)
- [txInfo](ABIResult.md#txinfo)

## Properties

### decodeError

• `Optional` **decodeError**: `Error`

If the SDK was unable to decode a return value, the error will be here.

#### Defined in

composer.ts:64

___

### method

• **method**: [`ABIMethod`](../classes/ABIMethod.md)

The method that was called for this result

#### Defined in

composer.ts:57

___

### rawReturnValue

• **rawReturnValue**: `Uint8Array`

The raw bytes of the return value from the ABI method call. This will be empty if the method
does not return a value (return type "void").

#### Defined in

composer.ts:53

___

### returnValue

• `Optional` **returnValue**: [`ABIValue`](../modules.md#abivalue)

The return value from the ABI method call. This will be undefined if the method does not return
a value (return type "void"), or if the SDK was unable to decode the returned value.

#### Defined in

composer.ts:62

___

### txID

• **txID**: `string`

The TxID of the transaction that invoked the ABI method call.

#### Defined in

composer.ts:48

___

### txInfo

• `Optional` **txInfo**: `Record`\<`string`, `any`\>

The pending transaction information from the method transaction

#### Defined in

composer.ts:66
