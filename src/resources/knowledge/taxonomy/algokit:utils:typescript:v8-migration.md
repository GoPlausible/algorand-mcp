# v8 migration

Version 8 of AlgoKit Utils adds support for algosdk@3. This algosdk version has a number of major breaking changes and as a result we have also needed to make some breaking changes to support it. All changes between version 7 and 8 have been made to support algosdk@3.

Depending on the complexity of your project, you may find that first migrating to version 7, then migrating to version 8 is easier and offers a more gradual experience. Either way this migration will heavily reference the [v7 migration guide](./v7-migration.md) as it documents the majority of changes you will likely need to make.

## <6.1.0 Migration Guide

### Migrating

#### Step 1 - Learn about the changes between version 7 and 8

First read the [>=7.0.0 migration guide](#700-migration-guide) below to familiarise yourself with the version 7 to 8 changes. This will give you the context needed to successfully execute the next step.

#### Step 2 - Migrate using the version 7 migration guide

Using the context gathered from Step 1, you should have all the information you need to migrate using the [version 7 migration guide](./v7-migration.md#610-migration-guide).

A simple example of the before and after follows:

```typescript
/**** Before ****/
import * as algokit from '@algorandfoundation/algokit-utils'
const algod = algokit.getAlgoClient()
const account = await algokit.mnemonicAccountFromEnvironment(
  {
    name: 'MY_ACCOUNT',
    fundWith: algokit.algos(2),
  },
  algod,
)
const payment = await algokit.transferAlgos({
  from: account.addr,
  to: 'RECEIVER',
  amount: algokit.algos(1),
})

/**** After ****/
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
const algorand = await AlgorandClient.fromEnvironment()
const account = await algorand.account.fromEnvironment('MY_ACCOUNT', (2).algo())
const payment = await algorand.send.payment({
  sender: account, // NOTE: .addr has been removed from the v7 version of this same code
  receiver: 'RECEIVER',
  amount: (1).algo(),
})
```

## >=6.1.0<7.0.0 Migration Guide

### Migrating

#### Step 1 - Learn about the changes between version 7 and 8

First read the [>=7.0.0 migration guide](#700-migration-guide) below to familiarise yourself with the version 7 to 8 changes. This will give you the context needed to successfully execute the next step.

#### Step 2 - Migrate using the version 7 migration guide

Using the context gathered from Step 1, you should have all the information you need to migrate using the [version 7 migration guide](./v7-migration.md#610-migration-guide-1).

## >=7.0.0 Migration Guide

This migration path assumes you have actioned all the deprecation notices as part of moving to the `>=7.0.0` version and you are using the `AlgorandClient` and it's related abstractions. Given this, all changes you'll need to make are directly related to upgrading from algosdk@2 to algosdk@3.

While AlgoKit utils now wraps most of the algosdk functionality, it's likely you may have functionality that uses algosdk directly. As as result you may need to refer to the [algosdk v3 migration guide](https://github.com/algorand/js-algorand-sdk/blob/develop/v2_TO_v3_MIGRATION_GUIDE.md.

### Migrating

#### Step 1 - Accommodate usages of addresses

The biggest change in this release is that addresses are consistently typed using `Address` from algosdk@3. The vast majority of AlgoKit Utils methods that previously took a `string` for an account address now take `string | Address`. The impact of this change should be minimal, as `string` is still accepted.

Any changes needed here should be related to converting an algosdk `Account` or `Address` type into the type the function expects.

One scenario that requires a `string` rather than `string | Address` is passing an address as an ABI method arg. This is due to algosdk not supporting this type as an `ABIValue`. When passing an `Address` as an ABI method arg, you'll need to convert to the encoded address representation using `toString()`, like below:

```typescript
const alice = algorand.account.random()
const bob = algorand.account.random()

const result = await appClient.send.call({
  sender: alice,
  method: 'hello',
  args: [bob.addr.toString()], // NOTE: the conversion to the encoded string representation
})
```

It's also worth noting that the account utils (`algorand.account.random()` in this scenario) returns a type which combines `Address`, `Account` and `TransactionSignerAccount`, so that you can simply pass the object (`alice` in this case) returned into a function that accepts an `Address` or `Account`, which allows you to remove `.addr` in a lot of cases.

#### Step 2 - Remove usages of performAtomicTransactionComposerDryrun

The dryrun feature has long been deprecated and it isn't compatible with algosdk@3, as a result we had to remove support for it. It's likely you can instead use the simulate feature like below:

```typescript
const payment = await algorand.createTransaction.payment({
  sender: 'SENDER',
  receiver: 'RECEIVER',
  amount: (1).algo(),
})

const result = await algorand.newGroup().addTransaction(payment).simulate()
```
