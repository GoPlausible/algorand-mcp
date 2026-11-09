# Event Emitter

The Event Emitter is a capability provided by AlgoKit Utils that allows for asynchronous event handling of lifecycle events. It provides a flexible mechanism for emitting and listening to custom events, which can be particularly useful for debugging and extending functionality not available in the `algokit-utils-ts` package.

## `AsyncEventEmitter`

The [`AsyncEventEmitter`](../code/classes/types_async_event_emitter.AsyncEventEmitter.md) is a class that manages asynchronous event emission and subscription.

To use the `AsyncEventEmitter`, you can import it directly:

```typescript
import { AsyncEventEmitter } from '@algorandfoundation/algokit-utils/types/async-event-emitter'

const emitter = new AsyncEventEmitter()
```

## Event Types

The `EventType` enum defines the built-in event types:

```typescript
enum EventType {
  TxnGroupSimulated = 'TxnGroupSimulated',
  AppCompiled = 'AppCompiled',
}
```

## Emitting Events

To emit an event, use the `emitAsync` method:

```typescript
await emitter.emitAsync(EventType.AppCompiled, compilationData)
```

## Listening to Events

There are two ways to listen to events:

### Using `on`

The `on` method adds a listener that will be called every time the specified event is emitted:

```typescript
emitter.on(EventType.AppCompiled, async (data) => {
  console.log('App compiled:', data)
})
```

### Using `once`

The `once` method adds a listener that will be called only once for the specified event:

```typescript
emitter.once(EventType.TxnGroupSimulated, async (data) => {
  console.log('Transaction group simulated:', data)
})
```

## Removing Listeners

To remove a listener, use the `removeListener` or `off` method:

```typescript
const listener = async (data) => {
  console.log('Event received:', data)
}

emitter.on(EventType.AppCompiled, listener)

// Later, when you want to remove the listener:
emitter.removeListener(EventType.AppCompiled, listener)
// or
emitter.off(EventType.AppCompiled, listener)
```

## Custom Events

While the current implementation primarily focuses on debugging events, the `AsyncEventEmitter` is designed to be extensible. You can emit and listen to custom events by using string keys:

```typescript
emitter.on('customEvent', async (data) => {
  console.log('Custom event received:', data)
})

await emitter.emitAsync('customEvent', { foo: 'bar' })
```

## Integration with `algokit-utils-ts-debug`

The events emitted by `AsyncEventEmitter` are particularly useful when used in conjunction with the `algokit-utils-ts-debug` package. This package listens for these events and persists relevant debugging information to the user's AlgoKit project filesystem, facilitating integration with the AVM debugger extension.

## Extending Functionality

The `AsyncEventEmitter` can serve as a foundation for building custom AlgoKit Utils extensions. By listening to the activity events emitted by the utils-ts package, you can create additional functionality tailored to your specific needs.

If you have suggestions for new event types or additional functionality, please open a PR or submit an issue on the AlgoKit Utils GitHub repository.
