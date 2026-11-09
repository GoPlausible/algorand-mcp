# API Reference

An overview of the `algorand-python-testing`'s `algopy_testing` module - covering the main classes and functions.

```{hint}
Spotted a typo in documentation? This project is open source, please submit an issue or a PR on [GitHub](https://github.com/algorand/algorand-python-testing).
```

```{warning}
Note, assume `_algopy_testing` to refer to `algopy_testing` namespace in the auto-generated class documentation above. To be patched in near future.
```

## Contexts

```{autodoc2-summary}
algopy_testing.AlgopyTestContext
algopy_testing.LedgerContext
algopy_testing.TransactionContext
```

## Value Generators

```{autodoc2-summary}
algopy_testing.AVMValueGenerator
algopy_testing.ARC4ValueGenerator
algopy_testing.TxnValueGenerator
```

## Inner transaction loaders

```{autodoc2-summary}
algopy_testing.ITxnGroupLoader
algopy_testing.ITxnLoader
```

## Utils

```{autodoc2-summary}
algopy_testing.algopy_testing_context
algopy_testing.arc4_prefix
```
