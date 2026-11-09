[@algorandfoundation/algokit-utils](../README.md) / [types/logic-error](../modules/types_logic_error.md) / LogicError

# Class: LogicError

[types/logic-error](../modules/types_logic_error.md).LogicError

Wraps key functionality around processing logic errors

## Hierarchy

- `Error`

  ↳ **`LogicError`**

## Table of contents

### Constructors

- [constructor](types_logic_error.LogicError.md#constructor)

### Properties

- [cause](types_logic_error.LogicError.md#cause)
- [led](types_logic_error.LogicError.md#led)
- [lines](types_logic_error.LogicError.md#lines)
- [message](types_logic_error.LogicError.md#message)
- [name](types_logic_error.LogicError.md#name)
- [program](types_logic_error.LogicError.md#program)
- [stack](types_logic_error.LogicError.md#stack)
- [teal\_line](types_logic_error.LogicError.md#teal_line)
- [prepareStackTrace](types_logic_error.LogicError.md#preparestacktrace)
- [stackTraceLimit](types_logic_error.LogicError.md#stacktracelimit)

### Methods

- [captureStackTrace](types_logic_error.LogicError.md#capturestacktrace)
- [parseLogicError](types_logic_error.LogicError.md#parselogicerror)

## Constructors

### constructor

• **new LogicError**(`errorDetails`, `program`, `getLineForPc`): [`LogicError`](types_logic_error.LogicError.md)

Create a new logic error object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorDetails` | [`LogicErrorDetails`](../interfaces/types_logic_error.LogicErrorDetails.md) | The details of the logic error |
| `program` | `string`[] | The TEAL source code, split by line |
| `getLineForPc` | (`pc`: `number`) => `undefined` \| `number` | The source map of the TEAL source code |

#### Returns

[`LogicError`](types_logic_error.LogicError.md)

#### Overrides

Error.constructor

#### Defined in

[src/types/logic-error.ts:52](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logic-error.ts#L52)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

___

### led

• **led**: [`LogicErrorDetails`](../interfaces/types_logic_error.LogicErrorDetails.md)

#### Defined in

[src/types/logic-error.ts:40](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logic-error.ts#L40)

___

### lines

• **lines**: `number` = `5`

#### Defined in

[src/types/logic-error.ts:42](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logic-error.ts#L42)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

___

### program

• **program**: `string`[]

#### Defined in

[src/types/logic-error.ts:41](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logic-error.ts#L41)

___

### stack

• `Optional` **stack**: `string`

#### Overrides

Error.stack

#### Defined in

[src/types/logic-error.ts:44](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logic-error.ts#L44)

___

### teal\_line

• **teal\_line**: `number` = `0`

#### Defined in

[src/types/logic-error.ts:43](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logic-error.ts#L43)

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:28

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:30

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:21

___

### parseLogicError

▸ **parseLogicError**(`error`): `undefined` \| [`LogicErrorDetails`](../interfaces/types_logic_error.LogicErrorDetails.md)

Takes an error message and parses out the details of any logic errors in there.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `any` | The error message to parse |

#### Returns

`undefined` \| [`LogicErrorDetails`](../interfaces/types_logic_error.LogicErrorDetails.md)

The logic error details if any, or undefined

#### Defined in

[src/types/logic-error.ts:26](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logic-error.ts#L26)
