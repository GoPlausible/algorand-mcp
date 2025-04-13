# Concepts

The following sections provide an overview of key concepts and features in the Algorand Python Testing framework.

## Test Context

The main abstraction for interacting with the testing framework is the [`AlgopyTestContext`](../api-context.md#algopy_testing.AlgopyTestContext). It creates an emulated Algorand environment that closely mimics AVM behavior relevant to unit testing the contracts and provides a Pythonic interface for interacting with the emulated environment.

```python
from algopy_testing import algopy_testing_context

def test_my_contract():
    # Recommended way to instantiate the test context
    with algopy_testing_context() as ctx:
        # Your test code here
        pass
    # ctx is automatically reset after the test code is executed
```

The context manager interface exposes three main properties:

1. `ledger`: An instance of `LedgerContext` for interacting with and querying the emulated Algorand ledger state.
2. `txn`: An instance of `TransactionContext` for creating and managing transaction groups, submitting transactions, and accessing transaction results.
3. `any`: An instance of `AlgopyValueGenerator` for generating randomized test data.

For detailed method signatures, parameters, and return types, refer to the following API sections:
- [`algopy_testing.LedgerContext`](../api.md)
- [`algopy_testing.TransactionContext`](../api.md)
- [`algopy_testing.AVMValueGenerator`, `algopy_testing.TxnValueGenerator`, `algopy_testing.ARC4ValueGenerator`](../api.md)

The `any` property provides access to different value generators:

- `AVMValueGenerator`: Base abstractions for AVM types. All methods are available directly on the instance returned from `any`.
- `TxnValueGenerator`: Accessible via `any.txn`, for transaction-related data.
- `ARC4ValueGenerator`: Accessible via `any.arc4`, for ARC4 type data.

These generators allow creation of constrained random values for various AVM entities (accounts, assets, applications, etc.) when specific values are not required.

```{hint}
Value generators are powerful tools for generating test data for specified AVM types. They allow further constraints on random value generation via arguments, making it easier to generate test data when exact values are not necessary.

When used with the 'Arrange, Act, Assert' pattern, value generators can be especially useful in setting up clear and concise test data in arrange steps.

They can also serve as a base building block that can be integrated/reused with popular Python property-based testing frameworks like [`hypothesis`](https://hypothesis.readthedocs.io/en/latest/).
```

## Types of `algopy` stub implementations

As explained in the [introduction](index.md), `algorand-python-testing` _injects_ test implementations for stubs available in the `algorand-python` package. However, not all of the stubs are implemented in the same manner:

1. **Native**: Fully matches AVM computation in Python. For example, `algopy.op.sha256` and other cryptographic operations behave identically in AVM and unit tests. This implies that the majority of opcodes that are 'pure' functions in AVM also have a native Python implementation provided by this package. These abstractions and opcodes can be used within and outside of the testing context.

2. **Emulated**: Uses `AlgopyTestContext` to mimic AVM behavior. For example, `Box.put` on an `algopy.Box` within a test context stores data in the test manager, not the real Algorand network, but provides the same interface.

3. **Mockable**: Not implemented, but can be mocked or patched. For example, `algopy.abi_call` can be mocked to return specific values or behaviors; otherwise, it raises a `NotImplementedError`. This category covers cases where native or emulated implementation in a unit test context is impractical or overly complex.

For a full list of all public `algopy` types and their corresponding implementation category, refer to the [Coverage](coverage.md) section.
```
