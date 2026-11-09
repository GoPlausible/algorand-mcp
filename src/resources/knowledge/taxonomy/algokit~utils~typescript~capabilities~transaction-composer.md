# Transaction composer

The `TransactionComposer` class allows you to easily compose one or more compliant Algorand transactions and execute and/or simulate them.

It's the core of how the [`AlgorandClient`](./algorand-client.md) class composes and sends transactions.

To get an instance of `TransactionComposer` you can either get it from an [app client](./app-client.md), from an [`AlgorandClient`](./algorand-client.md), or by new-ing up via the constructor.

```typescript
const composerFromAlgorand = algorand.newGroup()
const composerFromAppClient = appClient.algorand.newGroup()
const composerFromConstructor = new TransactionComposer({
  algod,
  /* Return the algosdk.TransactionSigner for this address*/
  getSigner: (address: string) => signer,
})
const composerFromConstructorWithOptionalParams = new TransactionComposer({
  algod,
  /* Return the algosdk.TransactionSigner for this address*/
  getSigner: (address: string) => signer,
  getSuggestedParams: () => algod.getTransactionParams().do(),
  defaultValidityWindow: 1000,
  appManager: new AppManager(algod),
})
```

## Constructing a transaction

To construct a transaction you need to add it to the composer, passing in the relevant [params object](../code/modules/types_composer.md#type-aliases) for that transaction. Params are normal JavaScript objects and all of them extend the [common call parameters](./algorand-client.md#transaction-parameters).

The [methods to construct a transaction](../code/classes/types_composer.default.md#methods) are all named `add{TransactionType}` and return an instance of the composer so they can be chained together fluently to construct a transaction group.

For example:

```typescript
const result = algorand
  .newGroup()
  .addPayment({ sender: 'SENDER', receiver: 'RECEIVER', amount: (100).microAlgo() })
  .addAppCallMethodCall({
    sender: 'SENDER',
    appId: 123n,
    method: abiMethod,
    args: [1, 2, 3],
  })
```

## Simulating a transaction

Transactions can be simulated using the simulate endpoint in algod, which enables evaluating the transaction on the network without it actually being commited to a block.
This is a powerful feature, which has a number of options which are detailed in the [simulate API docs](https://developer.algorand.org/docs/rest-apis/algod/#post-v2transactionssimulate).

For example you can simulate a transaction group like below:

```typescript
const result = await algorand
  .newGroup()
  .addPayment({ sender: 'SENDER', receiver: 'RECEIVER', amount: (100).microAlgo() })
  .addAppCallMethodCall({
    sender: 'SENDER',
    appId: 123n,
    method: abiMethod,
    args: [1, 2, 3],
  })
  .simulate()
```

The above will execute a simulate request asserting that all transactions in the group are correctly signed.

### Simulate without signing

There are situations where you may not be able to (or want to) sign the transactions when executing simulate.
In these instances you should set `skipSignatures: true` which automatically builds empty transaction signers and sets both `fix-signers` and `allow-empty-signatures` to `true` when sending the algod API call.

For example:

```typescript
const result = await algorand
  .newGroup()
  .addPayment({ sender: 'SENDER', receiver: 'RECEIVER', amount: (100).microAlgo() })
  .addAppCallMethodCall({
    sender: 'SENDER',
    appId: 123n,
    method: abiMethod,
    args: [1, 2, 3],
  })
  .simulate({
    skipSignatures: true,
  })
```
