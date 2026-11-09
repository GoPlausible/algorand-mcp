[@algorandfoundation/algokit-utils](../README.md) / [types/async-event-emitter](../modules/types_async_event_emitter.md) / AsyncEventEmitter

# Class: AsyncEventEmitter

[types/async-event-emitter](../modules/types_async_event_emitter.md).AsyncEventEmitter

## Table of contents

### Constructors

- [constructor](types_async_event_emitter.AsyncEventEmitter.md#constructor)

### Properties

- [listenerMap](types_async_event_emitter.AsyncEventEmitter.md#listenermap)
- [listenerWrapperMap](types_async_event_emitter.AsyncEventEmitter.md#listenerwrappermap)
- [off](types_async_event_emitter.AsyncEventEmitter.md#off)

### Methods

- [emitAsync](types_async_event_emitter.AsyncEventEmitter.md#emitasync)
- [on](types_async_event_emitter.AsyncEventEmitter.md#on)
- [once](types_async_event_emitter.AsyncEventEmitter.md#once)
- [removeListener](types_async_event_emitter.AsyncEventEmitter.md#removelistener)

## Constructors

### constructor

• **new AsyncEventEmitter**(): [`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Returns

[`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

## Properties

### listenerMap

• `Private` **listenerMap**: `Record`\<`string` \| `symbol`, [`AsyncEventListener`](../modules/types_async_event_emitter.md#asynceventlistener)\<`unknown`\>[]\> = `{}`

#### Defined in

[src/types/async-event-emitter.ts:7](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L7)

___

### listenerWrapperMap

• `Private` **listenerWrapperMap**: `WeakMap`\<[`AsyncEventListener`](../modules/types_async_event_emitter.md#asynceventlistener)\<`unknown`\>, [`AsyncEventListener`](../modules/types_async_event_emitter.md#asynceventlistener)\<`unknown`\>\>

#### Defined in

[src/types/async-event-emitter.ts:6](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L6)

___

### off

• **off**: (`eventName`: `string` \| `symbol`, `listener`: [`AsyncEventListener`](../modules/types_async_event_emitter.md#asynceventlistener)\<`unknown`\>) => [`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Type declaration

▸ (`eventName`, `listener`): [`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | [`AsyncEventListener`](../modules/types_async_event_emitter.md#asynceventlistener)\<`unknown`\> |

##### Returns

[`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Defined in

[src/types/async-event-emitter.ts:55](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L55)

## Methods

### emitAsync

▸ **emitAsync**\<`K`\>(`eventName`, `event`): `Promise`\<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`EventType`](../enums/types_lifecycle_events.EventType.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `K` |
| `event` | [`EventDataMap`](../modules/types_lifecycle_events.md#eventdatamap)[`K`] |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/async-event-emitter.ts:9](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L9)

▸ **emitAsync**(`eventName`, `event`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `event` | `unknown` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/async-event-emitter.ts:10](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L10)

___

### on

▸ **on**\<`K`\>(`eventName`, `listener`): [`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`EventType`](../enums/types_lifecycle_events.EventType.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `K` |
| `listener` | [`AsyncEventListener`](../modules/types_async_event_emitter.md#asynceventlistener)\<[`EventDataMap`](../modules/types_lifecycle_events.md#eventdatamap)[`K`]\> |

#### Returns

[`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Defined in

[src/types/async-event-emitter.ts:17](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L17)

▸ **on**\<`T`\>(`eventName`, `listener`): [`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | [`AsyncEventListener`](../modules/types_async_event_emitter.md#asynceventlistener)\<`T`\> |

#### Returns

[`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Defined in

[src/types/async-event-emitter.ts:18](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L18)

___

### once

▸ **once**\<`K`\>(`eventName`, `listener`): [`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends [`EventType`](../enums/types_lifecycle_events.EventType.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `K` |
| `listener` | [`AsyncEventListener`](../modules/types_async_event_emitter.md#asynceventlistener)\<[`EventDataMap`](../modules/types_lifecycle_events.md#eventdatamap)[`K`]\> |

#### Returns

[`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Defined in

[src/types/async-event-emitter.ts:25](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L25)

▸ **once**\<`T`\>(`eventName`, `listener`): [`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | [`AsyncEventListener`](../modules/types_async_event_emitter.md#asynceventlistener)\<`T`\> |

#### Returns

[`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Defined in

[src/types/async-event-emitter.ts:26](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L26)

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` \| `symbol` |
| `listener` | [`AsyncEventListener`](../modules/types_async_event_emitter.md#asynceventlistener)\<`unknown`\> |

#### Returns

[`AsyncEventEmitter`](types_async_event_emitter.AsyncEventEmitter.md)

#### Defined in

[src/types/async-event-emitter.ts:39](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L39)
