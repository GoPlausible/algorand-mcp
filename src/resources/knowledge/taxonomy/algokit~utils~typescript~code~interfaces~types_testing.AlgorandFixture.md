[@algorandfoundation/algokit-utils](../README.md) / [types/testing](../modules/types_testing.md) / AlgorandFixture

# Interface: AlgorandFixture

[types/testing](../modules/types_testing.md).AlgorandFixture

An Algorand automated testing fixture

## Table of contents

### Properties

- [beforeEach](types_testing.AlgorandFixture.md#beforeeach)

### Accessors

- [algorand](types_testing.AlgorandFixture.md#algorand)
- [context](types_testing.AlgorandFixture.md#context)

## Properties

### beforeEach

• **beforeEach**: () => `Promise`\<`void`\>

Testing framework agnostic handler method to run before each test to prepare the `context` for that test.

#### Type declaration

▸ (): `Promise`\<`void`\>

##### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/testing.ts:87](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/testing.ts#L87)

## Accessors

### algorand

• `get` **algorand**(): [`AlgorandClient`](../classes/types_algorand_client.AlgorandClient.md)

Retrieve an `AlgorandClient` loaded with the current context, including testAccount and any generated accounts loaded as signers.

#### Returns

[`AlgorandClient`](../classes/types_algorand_client.AlgorandClient.md)

#### Defined in

[src/types/testing.ts:82](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/testing.ts#L82)

___

### context

• `get` **context**(): [`AlgorandTestAutomationContext`](types_testing.AlgorandTestAutomationContext.md)

Retrieve the current context.
Useful with destructuring.

#### Returns

[`AlgorandTestAutomationContext`](types_testing.AlgorandTestAutomationContext.md)

**`Example`**

```typescript
test('My test', () => {
    const {algod, indexer, testAccount, ...} = algorand.context
})
```

#### Defined in

[src/types/testing.ts:77](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/testing.ts#L77)
