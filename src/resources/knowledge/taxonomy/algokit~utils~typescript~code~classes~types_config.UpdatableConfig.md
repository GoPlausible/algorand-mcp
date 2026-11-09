[@algorandfoundation/algokit-utils](../README.md) / [types/config](../modules/types_config.md) / UpdatableConfig

# Class: UpdatableConfig

[types/config](../modules/types_config.md).UpdatableConfig

Updatable AlgoKit config

## Implements

- `Readonly`\<[`Config`](../interfaces/types_config.Config.md)\>

## Table of contents

### Constructors

- [constructor](types_config.UpdatableConfig.md#constructor)

### Properties

- [config](types_config.UpdatableConfig.md#config)

### Accessors

- [debug](types_config.UpdatableConfig.md#debug)
- [events](types_config.UpdatableConfig.md#events)
- [logger](types_config.UpdatableConfig.md#logger)
- [maxSearchDepth](types_config.UpdatableConfig.md#maxsearchdepth)
- [populateAppCallResources](types_config.UpdatableConfig.md#populateappcallresources)
- [projectRoot](types_config.UpdatableConfig.md#projectroot)
- [traceAll](types_config.UpdatableConfig.md#traceall)
- [traceBufferSizeMb](types_config.UpdatableConfig.md#tracebuffersizemb)

### Methods

- [configure](types_config.UpdatableConfig.md#configure)
- [getLogger](types_config.UpdatableConfig.md#getlogger)
- [withDebug](types_config.UpdatableConfig.md#withdebug)

## Constructors

### constructor

• **new UpdatableConfig**(): [`UpdatableConfig`](types_config.UpdatableConfig.md)

#### Returns

[`UpdatableConfig`](types_config.UpdatableConfig.md)

#### Defined in

[src/types/config.ts:90](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L90)

## Properties

### config

• `Private` **config**: [`Config`](../interfaces/types_config.Config.md)

#### Defined in

[src/types/config.ts:29](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L29)

## Accessors

### debug

• `get` **debug**(): `boolean`

#### Returns

`boolean`

#### Implementation of

Readonly.debug

#### Defined in

[src/types/config.ts:39](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L39)

___

### events

• `get` **events**(): [`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Returns

[`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Implementation of

Readonly.events

#### Defined in

[src/types/config.ts:59](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L59)

___

### logger

• `get` **logger**(): [`Logger`](../modules/types_logging.md#logger)

#### Returns

[`Logger`](../modules/types_logging.md#logger)

#### Implementation of

Readonly.logger

#### Defined in

[src/types/config.ts:35](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L35)

___

### maxSearchDepth

• `get` **maxSearchDepth**(): `number`

#### Returns

`number`

#### Implementation of

Readonly.maxSearchDepth

#### Defined in

[src/types/config.ts:55](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L55)

___

### populateAppCallResources

• `get` **populateAppCallResources**(): `boolean`

#### Returns

`boolean`

#### Implementation of

Readonly.populateAppCallResources

#### Defined in

[src/types/config.ts:31](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L31)

___

### projectRoot

• `get` **projectRoot**(): ``null`` \| `string`

#### Returns

``null`` \| `string`

#### Implementation of

Readonly.projectRoot

#### Defined in

[src/types/config.ts:43](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L43)

___

### traceAll

• `get` **traceAll**(): `boolean`

#### Returns

`boolean`

#### Implementation of

Readonly.traceAll

#### Defined in

[src/types/config.ts:47](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L47)

___

### traceBufferSizeMb

• `get` **traceBufferSizeMb**(): `number`

#### Returns

`number`

#### Implementation of

Readonly.traceBufferSizeMb

#### Defined in

[src/types/config.ts:51](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L51)

## Methods

### configure

▸ **configure**(`newConfig`): `void`

Update the AlgoKit configuration with your own configuration settings

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newConfig` | `Partial`\<[`Config`](../interfaces/types_config.Config.md)\> | Partial or complete config to replace |

#### Returns

`void`

#### Defined in

[src/types/config.ts:107](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L107)

___

### getLogger

▸ **getLogger**(`returnNullLogger?`): [`Logger`](../modules/types_logging.md#logger)

Returns the current logger, or the null logger if true is passed in to `returnNullLogger`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `returnNullLogger?` | `boolean` | Whether or not to return the null logger |

#### Returns

[`Logger`](../modules/types_logging.md#logger)

The requested logger

#### Defined in

[src/types/config.ts:68](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L68)

___

### withDebug

▸ **withDebug**(`lambda`): `void`

Temporarily run with debug set to true.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `lambda` | () => `unknown` | A lambda expression with code to run with debug config set to true |

#### Returns

`void`

#### Defined in

[src/types/config.ts:80](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/config.ts#L80)
