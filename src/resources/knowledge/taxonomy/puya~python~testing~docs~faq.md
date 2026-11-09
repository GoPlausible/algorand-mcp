# FAQ

## What is a Test Context?

A Test Context is a context manager that provides a simulated Algorand environment for testing Python smart contracts. It allows developers to create and manipulate a virtual Algorand ecosystem for testing purposes. For more details, see the [Test Context section](testing-guide/concepts.md#test-context) in our documentation.

## What is the Algorand Virtual Machine (AVM)?

The Algorand Virtual Machine (AVM) is the runtime environment for Algorand smart contracts. It executes the compiled code of smart contracts on the Algorand blockchain. To learn more about the AVM, visit the [official Algorand documentation](https://developer.algorand.org/docs/get-details/dapps/avm/).

## What are Operational Codes in Algorand?

Operational Codes, or opcodes, are AVM instructions that are executed directly by the AVM. In the context of Algorand Python testing, these opcodes are provided by `algopy` stubs and are either emulated, implemented, or mocked by `algorand-python-testing`. For a comprehensive list of opcodes, refer to the [Algorand Developer Documentation](https://developer.algorand.org/docs/get-details/dapps/avm/teal/opcodes/?from_query=OPcodes#template-modal-overlay).

## What are Value Generators?

Value Generators are helper methods that generate randomized values for testing when the specific value of the tested type is not important. In the context of Algorand Python testing, these are represented by property on the context manager, accessed via `any.*` (or `any.arc4.*`, `any.txn.*`. in the case of ARC 4 types). To understand how to use Value Generators effectively, check out our [Value Generators section](testing-guide/concepts.md#value-generators) in the documentation.

## What are the limitations of the Algorand Python Testing framework?

The Algorand Python Testing framework emulates the Algorand Virtual Machine (AVM) for unit testing Algorand Python smart contracts without interacting with the real Algorand Network. However, it has some limitations due to its scope and purpose:

1. Simplified balance tracking and transaction validation
2. No consensus mechanism or AVM network operations simulation
3. Absence of a strict opcode budget system
4. Certain cryptographic operations are mocked or simplified
5. No state proof generation or verification

For scenarios where these limitations are crucial, it's recommended to pair this framework with integration testing. If you have a solid reason to justify introducing new emulated behaviour, please open an issue or contribute to the project on [Github](https://github.com/algorandfoundation/algorand-python-testing).

## How does balance tracking work in the testing framework?

The framework uses simplified balance tracking and transaction validation. For scenarios where precise balance or fee verification is important, it's recommended to complement unit tests with integration testing.

## Does the framework simulate the entire AVM network?

No, the framework does not simulate the entire AVM network or consensus mechanism. It focuses on emulating the parts of the AVM relevant to unit testing smart contracts.

## How does the framework handle opcode budgets?

The framework does not implement a strict opcode budget system. For scenarios where validating opcode budget is crucial, it's recommended to use integration testing alongside this framework.

## Are all cryptographic operations fully implemented?

Some cryptographic operations are mocked or simplified in the framework. For a detailed list of which operations are mocked, refer to the _mockable_ types under the [coverage](./coverage.md) section.

## Can I use this framework for security-critical validations?

While this framework is useful for unit testing and local development, it should not be the only tool used for security-critical validations or performance benchmarking. It's designed to approximate AVM behavior for common scenarios. Always complement your testing with additional integration testing options available in `algokit`, where you can test against real localnet or testnet environments.

## Is there an example of how to use this framework alongside integration tests?

Yes, the `algokit-python-template`, accessible via `algokit init`, provides a working example of how to structure `algorand-python-testing` along with regular integration tests against localnet.

```{hint}
An `algokit-python-template` accessible via `algokit init -t python`, provides a comprehensive and customizable working example of how to structure `algorand-python-testing` along with regular integration tests against localnet.
```

## Is it compatible with `pytest`?

Yes, it is compatible with `pytest` and _any_ other python testing framework as its agnostic of the testing framework as long as its python. If you spot incompatibility with a certain tool, please open an issue or contribute to the project on [Github](https://github.com/algorandfoundation/algorand-python-testing).
