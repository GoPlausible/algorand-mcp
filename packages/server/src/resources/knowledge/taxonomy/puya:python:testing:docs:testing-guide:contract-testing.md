# Smart Contract Testing

This guide provides an overview of how to test smart contracts using the Algorand Python SDK (`algopy`). We will cover the basics of testing `ARC4Contract` and `Contract` classes, focusing on `abimethod` and `baremethod` decorators.

![](https://mermaid.ink/img/pako:eNqVkrFugzAQhl_Fujnp1ImhEiJrJNREWeoOV9sNVsFG9iEVBd69R5w0JE2llsk2n7-7_-AAymsDGewDtpXYrqQT_GyKFwl5vfcBnRZlT5V3IjYYSCjvKKAiCa-JzXfrObyzgTqsxRpVZZ25YOX2nnRrIomCneZzpszLkllktu0f8ratrUKyjFsXCZ1K2gTH7i01_8dGUjOT_55YeLdUFVr3zRunf5b6R5hZoFnBq9cX72_Br_Cj8bl4vJCHaVucvowYxHk5Xg_sfPkY6SbbphDL5dMgQZu29n0U5DMJwzTVGyApySKZKFSNMXKVxPJYYAGNCQ1azX_VYboqgSrTcAcZLzWGDwnSjcxhR37TOwUZhc4sIPhuX0H2jnXkXddqrrCyyKNpTqfjF5m74B8?type=png)

```{note}
The code snippets showcasing the contract testing capabilities are using [pytest](https://docs.pytest.org/en/latest/) as the test framework. However, note that the `algorand-python-testing` package can be used with any other test framework that supports Python. `pytest` is used for demonstration purposes in this documentation.
```

```{testsetup}
import algopy
import algopy_testing
from algopy_testing import algopy_testing_context

# Create the context manager for snippets below
ctx_manager = algopy_testing_context()

# Enter the context
context = ctx_manager.__enter__()
```

## `algopy.ARC4Contract`

Subclasses of `algopy.ARC4Contract` are **required** to be instantiated with an active test context. As part of instantiation, the test context will automatically create a matching `algopy.Application` object instance.

Within the class implementation, methods decorated with `algopy.arc4.abimethod` and `algopy.arc4.baremethod` will automatically assemble an `algopy.gtxn.ApplicationCallTransaction` transaction to emulate the AVM application call. This behavior can be overriden by setting the transaction group manually as part of test setup, this is done via implicit invocation of `algopy_testing.context.any_application()` _value generator_ (refer to [APIs](../apis.md) for more details).

```{testcode}
class SimpleVotingContract(algopy.ARC4Contract):
    def __init__(self) -> None:
        self.topic = algopy.GlobalState(algopy.Bytes(b"default_topic"), key="topic", description="Voting topic")
        self.votes = algopy.GlobalState(
            algopy.UInt64(0),
            key="votes",
            description="Votes for the option",
        )
        self.voted = algopy.LocalState(algopy.UInt64, key="voted", description="Tracks if an account has voted")

    @algopy.arc4.abimethod(create="require")
    def create(self, initial_topic: algopy.Bytes) -> None:
        self.topic.value = initial_topic
        self.votes.value = algopy.UInt64(0)

    @algopy.arc4.abimethod
    def vote(self) -> algopy.UInt64:
        assert self.voted[algopy.Txn.sender] == algopy.UInt64(0), "Account has already voted"
        self.votes.value += algopy.UInt64(1)
        self.voted[algopy.Txn.sender] = algopy.UInt64(1)
        return self.votes.value

    @algopy.arc4.abimethod(readonly=True)
    def get_votes(self) -> algopy.UInt64:
        return self.votes.value

    @algopy.arc4.abimethod
    def change_topic(self, new_topic: algopy.Bytes) -> None:
        assert algopy.Txn.sender == algopy.Txn.application_id.creator, "Only creator can change topic"
        self.topic.value = new_topic
        self.votes.value = algopy.UInt64(0)
        # Reset user's vote (this is simplified per single user for the sake of example)
        self.voted[algopy.Txn.sender] = algopy.UInt64(0)

# Arrange
initial_topic = algopy.Bytes(b"initial_topic")
contract = SimpleVotingContract()
contract.voted[context.default_sender] = algopy.UInt64(0)

# Act - Create the contract
contract.create(initial_topic)

# Assert - Check initial state
assert contract.topic.value == initial_topic
assert contract.votes.value == algopy.UInt64(0)

# Act - Vote
# The method `.vote()` is decorated with `algopy.arc4.abimethod`, which means it will assemble a transaction to emulate the AVM application call
result = contract.vote()

# Assert - you can access the corresponding auto generated application call transaction via test context
assert len(context.txn.last_group.txns) == 1

# Assert - Note how local and global state are accessed via regular python instance attributes
assert result == algopy.UInt64(1)
assert contract.votes.value == algopy.UInt64(1)
assert contract.voted[context.default_sender] == algopy.UInt64(1)

# Act - Change topic
new_topic = algopy.Bytes(b"new_topic")
contract.change_topic(new_topic)

# Assert - Check topic changed and votes reset
assert contract.topic.value == new_topic
assert contract.votes.value == algopy.UInt64(0)
assert contract.voted[context.default_sender] == algopy.UInt64(0)

# Act - Get votes (should be 0 after reset)
votes = contract.get_votes()

# Assert - Check votes
assert votes == algopy.UInt64(0)

```

For more examples of tests using `algopy.ARC4Contract`, see the [examples](../examples.md) section.

## `algopy.Contract``

Subclasses of `algopy.Contract` are **required** to be instantiated with an active test context. As part of instantiation, the test context will automatically create a matching `algopy.Application` object instance. This behavior is identical to `algopy.ARC4Contract` class instances.

Unlike `algopy.ARC4Contract`, `algopy.Contract` requires manual setup of the transaction context and explicit method calls. Alternatively, you can use `active_txn_overrides` to specify application arguments and foreign arrays without needing to create a full transaction group if your aim is to patch a specific active transaction related metadata.

Here's an updated example demonstrating how to test a `Contract` class:

```{testcode}
import algopy
import pytest
from algopy_testing import AlgopyTestContext, algopy_testing_context

class CounterContract(algopy.Contract):
    def __init__(self):
        self.counter = algopy.UInt64(0)

    @algopy.subroutine
    def increment(self):
        self.counter += algopy.UInt64(1)
        return algopy.UInt64(1)

    @algopy.arc4.baremethod
    def approval_program(self):
        return self.increment()

    @algopy.arc4.baremethod
    def clear_state_program(self):
        return algopy.UInt64(1)

@pytest.fixture()
def context():
    with algopy_testing_context() as ctx:
        yield ctx

def test_counter_contract(context: AlgopyTestContext):
    # Instantiate contract
    contract = CounterContract()

    # Set up the transaction context using active_txn_overrides
    with context.txn.create_group(
        active_txn_overrides={
            "sender": context.default_sender,
            "app_args": [algopy.Bytes(b"increment")],
        }
    ):
        # Invoke approval program
        result = contract.approval_program()

        # Assert approval program result
        assert result == algopy.UInt64(1)

        # Assert counter value
        assert contract.counter == algopy.UInt64(1)

    # Test clear state program
    assert contract.clear_state_program() == algopy.UInt64(1)

def test_counter_contract_multiple_txns(context: AlgopyTestContext):
    contract = CounterContract()

    # For scenarios with multiple transactions, you can still use gtxns
    extra_payment = context.any.txn.payment()

    with context.txn.create_group(
        gtxns=[
            extra_payment,
            context.any.txn.application_call(
                sender=context.default_sender,
                app_id=contract.app_id,
                app_args=[algopy.Bytes(b"increment")],
            ),
        ],
        active_txn_index=1  # Set the application call as the active transaction
    ):
        result = contract.approval_program()

        assert result == algopy.UInt64(1)
        assert contract.counter == algopy.UInt64(1)

    assert len(context.txn.last_group.txns) == 2
```

In this updated example:

1. We use `context.txn.create_group()` with `active_txn_overrides` to set up the transaction context for a single application call. This simplifies the process when you don't need to specify a full transaction group.

2. The `active_txn_overrides` parameter allows you to specify `app_args` and other transaction fields directly, without creating a full `ApplicationCallTransaction` object.

3. For scenarios involving multiple transactions, you can still use the `gtxns` parameter to create a transaction group, as shown in the `test_counter_contract_multiple_txns` function.

4. The `app_id` is automatically set to the contract's application ID, so you don't need to specify it explicitly when using `active_txn_overrides`.

This approach provides more flexibility in setting up the transaction context for testing `Contract` classes, allowing for both simple single-transaction scenarios and more complex multi-transaction tests.

## Defer contract method invocation

You can create deferred application calls for more complex testing scenarios where order of transactions needs to be controlled:

```python
def test_deferred_call(context):
    contract = MyARC4Contract()

    extra_payment = context.any.txn.payment()
    extra_asset_transfer = context.any.txn.asset_transfer()
    implicit_payment = context.any.txn.payment()
    deferred_call = context.txn.defer_app_call(contract.some_method, implicit_payment)

    with context.txn.create_group([extra_payment, deferred_call, extra_asset_transfer]):
        result = deferred_call.submit()

    print(context.txn.last_group) # [extra_payment, implicit_payment, app call, extra_asset_transfer]
```

A deferred application call prepares the application call transaction without immediately executing it. The call can be executed later by invoking the `.submit()` method on the deferred application call instance. As demonstrated in the example, you can also include the deferred call in a transaction group creation context manager to execute it as part of a larger transaction group. When `.submit()` is called, only the specific method passed to `defer_app_call()` will be executed.

```{testcleanup}
ctx_manager.__exit__(None, None, None)
```
