[@algorandfoundation/algokit-utils](../README.md) / types/async-event-emitter

# Module: types/async-event-emitter

## Table of contents

### Classes

- [AsyncEventEmitter](../classes/types_async_event_emitter.AsyncEventEmitter.md)

### Type Aliases

- [AsyncEventListener](types_async_event_emitter.md#asynceventlistener)

## Type Aliases

### AsyncEventListener

Ƭ **AsyncEventListener**\<`T`\>: (`event`: `T`, `eventName`: `string` \| `symbol`) => `Promise`\<`void`\> \| `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Type declaration

▸ (`event`, `eventName`): `Promise`\<`void`\> \| `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `eventName` | `string` \| `symbol` |

##### Returns

`Promise`\<`void`\> \| `void`

#### Defined in

[src/types/async-event-emitter.ts:3](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/async-event-emitter.ts#L3)
