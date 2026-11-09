# Algorand Python Testing examples

This directory contains examples demonstrating how to use algorand-python-testing to test smart contracts written in Algorand Python.

## Overview

`algorand-python-testing` provides a powerful framework for unit testing Algorand smart contracts written in Algorand Python. It allows developers to emulate AVM behavior in a Python interpreter, making it easier to write and run tests for your Algorand applications.

## Key Features

1. **Test Environment Setup**: Use the `context` fixture to set up a test environment that emulates AVM behavior.
2. **Arrange, Act, Assert Pattern**: Examples follow the 'arrange, act, assert' pattern for clear and structured tests.
3. **Asset and Account Creation**: Easily create test assets and accounts using `context.any.asset` and `context.any.account`.
4. **State Manipulation**: Test global and local state changes in your smart contracts.
5. **ABI Method Testing**: Examples of how to test ABI methods in your smart contracts.

## Quickstart

To run the examples in a self-contained manner:

1. Install [hatch](https://hatch.pypa.io/latest/)
2. From the root of the repo, run:

```bash
hatch run examples:test examples/<example_directory>
```

Replace `<example_directory>` with the specific example you want to run (e.g., `auction`, `abi`, etc.).

## Writing Tests

When writing tests for your Algorand smart contracts:

1. Use the `context` fixture to set up your test environment.
2. Create test assets and accounts as needed using `context.any.asset` and `context.any.account`.
3. Interact with your smart contract methods.
4. Assert the expected outcomes, including state changes and transaction results.

For detailed examples, refer to the individual test files in each example directory.

## Contributing

If you have additional examples or improvements, feel free to contribute by submitting a pull request.

1. Follow the [contribution guidelines](https://github.com/algorandfoundation/algorand-python-testing/blob/main/CONTRIBUTING.md).
2. Create a new folder under `examples/` with your contract/signature and test files.
3. If you are contributing a smart contract example make sure to name the file `contract.py`. For logic signatures, name it `signature.py`.
4. For test files use `test_contract.py` or `test_signature.py` respectively.
5. Use the default PR template when opening a PR, and describe what sort of example are you adding as well as which feature of `algorand-python-testing` it demonstrates.

## Resources

-   [Algorand Developer Documentation](https://developer.algorand.org/)
-   [algorand-python](https://algorandfoundation.github.io/puya/)
-   [algorand-python-testing](https://algorandfoundation.github.io/algorand-python-testing/)
-   ['arrange, act, assert' patern](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/)
