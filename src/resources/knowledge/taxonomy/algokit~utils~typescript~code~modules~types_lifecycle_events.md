[@algorandfoundation/algokit-utils](../README.md) / types/lifecycle-events

# Module: types/lifecycle-events

## Table of contents

### Enumerations

- [EventType](../enums/types_lifecycle_events.EventType.md)

### Type Aliases

- [EventDataMap](types_lifecycle_events.md#eventdatamap)

## Type Aliases

### EventDataMap

Ƭ **EventDataMap**: `Object`

#### Index signature

▪ [key: `string`]: `unknown`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AppCompiled` | [`TealSourcesDebugEventData`](../interfaces/types_debugging.TealSourcesDebugEventData.md) |
| `TxnGroupSimulated` | [`AVMTracesEventData`](../interfaces/types_debugging.AVMTracesEventData.md) |

#### Defined in

[src/types/lifecycle-events.ts:8](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/lifecycle-events.ts#L8)
