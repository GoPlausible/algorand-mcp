[@algorandfoundation/algokit-utils](../README.md) / [types/transaction](../modules/types_transaction.md) / SendParams

# Interface: SendParams

[types/transaction](../modules/types_transaction.md).SendParams

Parameters to configure transaction sending.

## Hierarchy

- **`SendParams`**

  ↳ [`AtomicTransactionComposerToSend`](types_transaction.AtomicTransactionComposerToSend.md)

## Table of contents

### Properties

- [maxRoundsToWaitForConfirmation](types_transaction.SendParams.md#maxroundstowaitforconfirmation)
- [populateAppCallResources](types_transaction.SendParams.md#populateappcallresources)
- [suppressLog](types_transaction.SendParams.md#suppresslog)

## Properties

### maxRoundsToWaitForConfirmation

• `Optional` **maxRoundsToWaitForConfirmation**: `number`

The number of rounds to wait for confirmation. By default until the latest lastValid has past.

#### Defined in

[src/types/transaction.ts:136](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L136)

___

### populateAppCallResources

• `Optional` **populateAppCallResources**: `boolean`

Whether to use simulate to automatically populate app call resources in the txn objects. Defaults to `Config.populateAppCallResources`.

#### Defined in

[src/types/transaction.ts:140](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L140)

___

### suppressLog

• `Optional` **suppressLog**: `boolean`

Whether to suppress log messages from transaction send, default: do not suppress.

#### Defined in

[src/types/transaction.ts:138](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L138)
