# Algorand Python Testing

[![docs-repository](https://img.shields.io/badge/url-repository-74dfdc?logo=github&style=flat.svg)](https://github.com/algorandfoundation/algorand-python-testing/)
[![learn-AlgoKit](https://img.shields.io/badge/learn-AlgoKit-74dfdc?logo=algorand&mac=flat.svg)](https://developer.algorand.org/algokit/)
[![github-stars](https://img.shields.io/github/stars/algorandfoundation/algorand-python-testing?color=74dfdc&logo=star&style=flat)](https://github.com/algorandfoundation/algorand-python-testing)
[![visitor-badge](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2Falgorandfoundation%2Falgorand-python-testing&countColor=%2374dfdc&style=flat)](https://developer.algorand.org/algokit/)

`algorand-python-testing` is a companion package to [Algorand Python](https://github.com/algorandfoundation/puya) that enables efficient unit testing of Algorand Python smart contracts in an offline environment. This package emulates key AVM behaviors without requiring a network connection, offering fast and reliable testing capabilities with a familiar Pythonic interface.

The `algorand-python-testing` package provides:

-   A simple interface for fast and reliable unit testing
-   An offline testing environment that simulates core AVM functionality
-   A familiar Pythonic experience, compatible with testing frameworks like [pytest](https://docs.pytest.org/en/latest/), [unittest](https://docs.python.org/3/library/unittest.html), and [hypothesis](https://hypothesis.readthedocs.io/en/latest/)

## Quick Start

`algopy` is a prerequisite for `algorand-python-testing`, providing stubs and type annotations for Algorand Python syntax. It enhances code completion and type checking when writing smart contracts. Note that this code isn't directly executable in standard Python interpreters; it's compiled by `puya` into TEAL for Algorand Network deployment.

Traditionally, testing Algorand smart contracts involved deployment on sandboxed networks and interacting with live instances. While robust, this approach can be inefficient and lacks versatility for testing Algorand Python code.

Enter `algorand-python-testing`: it leverages Python's rich testing ecosystem for unit testing without network deployment. This enables rapid iteration and granular logic testing.

> **NOTE**: While `algorand-python-testing` offers valuable unit testing capabilities, it's not a replacement for comprehensive testing. Use it alongside other test types, particularly those running against the actual Algorand Network, for thorough contract validation.

### Prerequisites

-   Python 3.12 or later
-   [Algorand Python](https://github.com/algorandfoundation/puya)

### Installation

`algorand-python-testing` is distributed via [PyPI](https://pypi.org/project/algorand-python-testing/). Install the package using `pip`:

```bash
pip install algorand-python-testing
```

or using `poetry`:

```bash
poetry add algorand-python-testing
```

### Testing your first contract

Let's write a simple contract and test it using the `algorand-python-testing` framework.

#### Contract Definition

```{testcode}
import algopy
from algopy import arc4

class VotingContract(algopy.ARC4Contract):
    def __init__(self) -> None:
        self.topic = algopy.GlobalState(algopy.Bytes(b"default_topic"), key="topic", description="Voting topic")
        self.votes = algopy.GlobalState(
            algopy.UInt64(0),
            key="votes",
            description="Votes for the option",
        )
        self.voted = algopy.LocalState(algopy.UInt64, key="voted", description="Tracks if an account has voted")

    @arc4.abimethod
    def set_topic(self, topic: arc4.String) -> None:
        self.topic.value = topic.bytes

    @arc4.abimethod
    def vote(self, pay: algopy.gtxn.PaymentTransaction) -> arc4.Bool:
        assert algopy.op.Global.group_size == algopy.UInt64(2), "Expected 2 transactions"
        assert pay.amount == algopy.UInt64(10_000), "Incorrect payment amount"
        assert pay.sender == algopy.Txn.sender, "Payment sender must match transaction sender"

        _value, exists = self.voted.maybe(algopy.Txn.sender)
        if exists:
            return arc4.Bool(False)  # Already voted
        self.votes.value += algopy.UInt64(1)
        self.voted[algopy.Txn.sender] = algopy.UInt64(1)
        return arc4.Bool(True)

    @arc4.abimethod(readonly=True)
    def get_votes(self) -> arc4.UInt64:
        return arc4.UInt64(self.votes.value)

    def clear_state_program(self) -> bool:
        return True
```

#### Test Definition

```{testcode}
from collections.abc import Generator
import pytest
from algopy_testing import AlgopyTestContext, algopy_testing_context
from algopy import arc4

# Create a test context
with algopy_testing_context() as context:

    # Initialize the contract
    contract = VotingContract()

    # Test vote function
    voter = context.default_sender
    payment = context.any.txn.payment(
        sender=voter,
        amount=algopy.UInt64(10_000),
    )

    result = contract.vote(payment)
    print(f"Vote result: {result.native}")
    print(f"Total votes: {contract.votes.value}")
    print(f"Voter {voter} voted: {contract.voted[voter]}")

    # Test set_topic function
    new_topic = context.any.arc4.string(10)
    contract.set_topic(new_topic)
    print(f"New topic: {new_topic.native}")
    print(f"Contract topic: {contract.topic.value}")

    # Test get_votes function
    contract.votes.value = algopy.UInt64(5)
    votes = contract.get_votes()
    print(f"Current votes: {votes.native}")
```

```{testoutput}
:hide:

Vote result: True
Total votes: 1
Voter ... voted: 1
New topic: ...
Contract topic: ...
Current votes: 5
```

This example demonstrates key aspects of testing with `algorand-python-testing` for ARC4-based contracts:

1. ARC4 Contract Features:

    - Use of `algopy.ARC4Contract` as the base class for the contract.
    - ABI methods defined using the `@arc4.abimethod` decorator.
    - Use of ARC4-specific types like `arc4.String`, `arc4.Bool`, and `arc4.UInt64`.
    - Readonly method annotation with `@arc4.abimethod(readonly=True)`.

2. Testing ARC4 Contracts:

    - Creation of an `ARC4Contract` instance within the test context.
    - Use of `context.any.arc4` for generating ARC4-specific random test data.
    - Direct invocation of ABI methods on the contract instance.

3. Transaction Handling:

    - Use of `context.any.txn` to create test transactions.
    - Passing transaction objects as parameters to contract methods.

4. State Verification:
    - Checking global and local state changes after method execution.
    - Verifying return values from ABI methods using ARC4-specific types.

> **NOTE**: Thorough testing is crucial in smart contract development due to their immutable nature post-deployment. Comprehensive unit and integration tests ensure contract validity and reliability. Optimizing for efficiency can significantly improve user experience by reducing transaction fees and simplifying interactions. Investing in robust testing and optimization practices is crucial and offers many benefits in the long run.

### Next steps

To dig deeper into the capabilities of `algorand-python-testing`, continue with the following sections.

```{toctree}
---
maxdepth: 2
caption: Contents
hidden: true
---

testing-guide/index
examples
coverage
faq
api
algopy
```
