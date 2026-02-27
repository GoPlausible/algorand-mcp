<div align="center">
<a href="https://github.com/algorandfoundation/algorand-python-testing"><img src="https://bafybeiaibjaf6zy6hvef2rrysaacsfsyb3hw4qqtgn657gw7k5tdzqdxzi.ipfs.nftstorage.link/" width=60%></a>
</div>

<p align="center">
    <a target="_blank" href="https://algorandfoundation.github.io/algorand-python-testing/"><img src="https://img.shields.io/badge/docs-repository-74dfdc?logo=github&style=flat.svg" /></a>
    <a target="_blank" href="https://developer.algorand.org/algokit/"><img src="https://img.shields.io/badge/learn-AlgoKit-74dfdc?logo=algorand&mac=flat.svg" /></a>
    <a target="_blank" href="https://github.com/algorandfoundation/algorand-python-testing"><img src="https://img.shields.io/github/stars/algorandfoundation/algorand-python-testing?color=74dfdc&logo=star&style=flat" /></a>
    <a target="_blank" href="https://developer.algorand.org/algokit/"><img  src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Falgorandfoundation%2Falgorand-python-testing&countColor=%2374dfdc&style=flat" /></a>
</p>

---

Algorand Python Testing is a companion package to [Algorand Python](https://github.com/algorandfoundation/puya) that enables efficient unit testing of Algorand Python smart contracts in an offline environment. It emulates key AVM behaviors without requiring a network connection, offering fast and reliable testing capabilities with a familiar Pythonic interface.

[Documentation](https://algorandfoundation.github.io/algorand-python-testing/) | [Algorand Python Documentation](https://algorandfoundation.github.io/puya/)

## Quick start

The easiest way to use Algorand Python Testing is to instantiate a template with AlgoKit via `algokit init -t python`. This will give you a full development environment with testing capabilities built-in.

Alternatively, if you want to start from scratch:

1. Ensure you have Python 3.12+
2. Install [AlgoKit CLI](https://github.com/algorandfoundation/algokit-cli?tab=readme-ov-file#install)
3. Install Algorand Python Testing into your project:
    ```bash
    pip install algorand-python-testing
    ```
4. Create a test file (e.g., `test_contract.py`):

    ```python
    from algopy_testing import algopy_testing_context
    from your_contract import YourContract
    
    def test_your_contract():
        with algopy_testing_context() as context:
            # Arrange
            contract = YourContract()
            expected_result = ... # Your expected result here
    
            # Act
            result = contract.your_method(context.any.uint64())  # Your test code here
    
            # Assert
            assert result == expected_result
    ```

5. Run your tests using your preferred Python testing framework (e.g., pytest, unittest)

For more detailed information, check out the [full documentation](https://algorandfoundation.github.io/algorand-python-testing/).

## Features

-   Offline testing environment simulating core AVM functionality
-   Compatible with popular Python testing frameworks
-   Supports testing of ARC4 contracts, smart signatures, and more
-   Provides tools for mocking blockchain state and transactions

## Examples

For detailed examples showcasing various testing scenarios, refer to the [examples section](https://algorandfoundation.github.io/algorand-python-testing/examples.html) in the documentation.

## Contributing

We welcome contributions to this project! Please read our [contributing guide](CONTRIBUTING.md) to get started.
