[@algorandfoundation/algokit-utils](../README.md) / types/logging

# Module: types/logging

## Table of contents

### Type Aliases

- [Logger](types_logging.md#logger)

### Variables

- [consoleLogger](types_logging.md#consolelogger)
- [infoConsoleLogger](types_logging.md#infoconsolelogger)
- [nullLogger](types_logging.md#nulllogger)
- [verboseConsoleLogger](types_logging.md#verboseconsolelogger)
- [warningConsoleLogger](types_logging.md#warningconsolelogger)

## Type Aliases

### Logger

Ƭ **Logger**: `Object`

General purpose logger type, compatible with Winston and others.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `debug` | (`message`: `string`, ...`optionalParams`: `unknown`[]) => `void` |
| `error` | (`message`: `string`, ...`optionalParams`: `unknown`[]) => `void` |
| `info` | (`message`: `string`, ...`optionalParams`: `unknown`[]) => `void` |
| `verbose` | (`message`: `string`, ...`optionalParams`: `unknown`[]) => `void` |
| `warn` | (`message`: `string`, ...`optionalParams`: `unknown`[]) => `void` |

#### Defined in

[src/types/logging.ts:5](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logging.ts#L5)

## Variables

### consoleLogger

• `Const` **consoleLogger**: [`Logger`](types_logging.md#logger)

A logger implementation that writes to console

#### Defined in

[src/types/logging.ts:14](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logging.ts#L14)

___

### infoConsoleLogger

• `Const` **infoConsoleLogger**: [`Logger`](types_logging.md#logger)

#### Defined in

[src/types/logging.ts:22](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logging.ts#L22)

___

### nullLogger

• `Const` **nullLogger**: [`Logger`](types_logging.md#logger)

A logger implementation that does nothing

#### Defined in

[src/types/logging.ts:47](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logging.ts#L47)

___

### verboseConsoleLogger

• `Const` **verboseConsoleLogger**: [`Logger`](types_logging.md#logger)

#### Defined in

[src/types/logging.ts:30](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logging.ts#L30)

___

### warningConsoleLogger

• `Const` **warningConsoleLogger**: [`Logger`](types_logging.md#logger)

#### Defined in

[src/types/logging.ts:38](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/logging.ts#L38)
