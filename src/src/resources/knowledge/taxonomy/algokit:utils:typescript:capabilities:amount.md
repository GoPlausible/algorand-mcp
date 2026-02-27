# Algo amount handling

Algo amount handling is one of the core capabilities provided by AlgoKit Utils. It allows you to reliably and tersely specify amounts of microAlgo and Algo and safely convert between them.

Any AlgoKit Utils function that needs an Algo amount will take an `AlgoAmount` object, which ensures that there is never any confusion about what value is being passed around. Whenever an AlgoKit Utils function calls into an underlying algosdk function, or if you need to take an `AlgoAmount` and pass it into an underlying algosdk function (per the [modularity principle](../README.md#core-principles)) you can safely and explicitly convert to microAlgo or Algo.

To see some usage examples check out the [automated tests](../../src/types/amount.spec.ts). Alternatively, you see the [reference documentation](../code/classes/types_amount.AlgoAmount.md) for `AlgoAmount`.

## `AlgoAmount`

The `AlgoAmount` class provides a safe wrapper around an underlying `number` amount of microAlgo where any value entering or existing the `AlgoAmount` class must be explicitly stated to be in microAlgo or Algo. This makes it much safer to handle Algo amounts rather than passing them around as raw `number`'s where it's easy to make a (potentially costly!) mistake and not perform a conversion when one is needed (or perform one when it shouldn't be!).

To import the AlgoAmount class you can access it via:

```typescript
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'
```

You may not need to import this type to use it though since there are also special methods that are exposed from the root AlgoKit Utils export and also others that extend the `number` protoype per below.

### Creating an `AlgoAmount`

There are a few ways to create an `AlgoAmount`:

- Algo
  - Constructor: `new AlgoAmount({algo: 10})`
  - Static helper: `AlgoAmount.algo(10)`
  - AlgoKit Helper: `algo(10)`
  - Number coersion: `(10).algo()` (note: you have to wrap the number in brackets or have it in a variable or function return, a raw number value can't have a method called on it)
- microAlgo
  - Constructor: `new AlgoAmount({microAlgos: 10_000})`
  - Static helper: `AlgoAmount.algo(10)`
  - AlgoKit Helper: `microAlgo(10_000)`
  - Number coersion: `(10_000).microAlgo()` (note: you have to wrap the number in brackets or have it in a variable or function return, a raw number value can't have a method called on it)

Note: per above, to use any of the versions that reference `AlgoAmount` type itself you need to import it:

```typescript
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount'
```

### Extracting a value from `AlgoAmount`

The `AlgoAmount` class has properties to return Algo and microAlgo:

- `amount.algo` - Returns the value in Algo
- `amount.microAlgo` - Returns the value in microAlgo

`AlgoAmount` will coerce to a `number` automatically (in microAlgo), which is not recommended to be used outside of allowing you to use `AlgoAmount` objects in comparison operations such as `<` and `>=` etc.

You can also call `.toString()` or use an `AlgoAmount` directly in string interpolation to convert it to a nice user-facing formatted amount expressed in microAlgo.
