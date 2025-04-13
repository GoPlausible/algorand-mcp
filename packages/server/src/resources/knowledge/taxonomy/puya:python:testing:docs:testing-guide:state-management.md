# State Management

`algorand-python-testing` provides tools to test state-related abstractions in Algorand smart contracts. This guide covers global state, local state, boxes, and scratch space management.

```{testsetup}
import algopy
from algopy_testing import algopy_testing_context

# Create the context manager for snippets below
ctx_manager = algopy_testing_context()

# Enter the context
context = ctx_manager.__enter__()
```

## Global State

Global state is represented as instance attributes on `algopy.Contract` and `algopy.ARC4Contract` classes.

```{testcode}
class MyContract(algopy.ARC4Contract):
    def __init__(self):
        self.state_a = algopy.GlobalState(algopy.UInt64, key="global_uint64")
        self.state_b = algopy.UInt64(1)

# In your test
contract = MyContract()
contract.state_a.value = algopy.UInt64(10)
contract.state_b.value = algopy.UInt64(20)
```

## Local State

Local state is defined similarly to global state, but accessed using account addresses as keys.

```{testcode}
class MyContract(algopy.ARC4Contract):
    def __init__(self):
        self.local_state_a = algopy.LocalState(algopy.UInt64, key="state_a")

# In your test
contract = MyContract()
account = context.any.account()
contract.local_state_a[account] = algopy.UInt64(10)
```

## Boxes

The framework supports various Box abstractions available in `algorand-python`.

```{testcode}
class MyContract(algopy.ARC4Contract):
    def __init__(self):
        self.box_map = algopy.BoxMap(algopy.Bytes, algopy.UInt64)

    @algopy.arc4.abimethod()
    def some_method(self, key_a: algopy.Bytes, key_b: algopy.Bytes, key_c: algopy.Bytes) -> None:
        self.box = algopy.Box(algopy.UInt64, key=key_a)
        self.box.value = algopy.UInt64(1)
        self.box_map[key_b] = algopy.UInt64(1)
        self.box_map[key_c] = algopy.UInt64(2)

# In your test
contract = MyContract()
key_a = b"key_a"
key_b = b"key_b"
key_c = b"key_c"

contract.some_method(algopy.Bytes(key_a), algopy.Bytes(key_b), algopy.Bytes(key_c))

# Access boxes
box_content = context.ledger.get_box(contract, key_a)
assert context.ledger.box_exists(contract, key_a)

# Set box content manually
with context.txn.create_group():
    context.ledger.set_box(contract, key_a, algopy.op.itob(algopy.UInt64(1)))
```

## Scratch Space

Scratch space is represented as a list of 256 slots for each transaction.

```{testcode}
class MyContract(algopy.Contract, scratch_slots=(1, 2, algopy.urange(3, 20))):
    def approval_program(self):
        algopy.op.Scratch.store(1, algopy.UInt64(5))
        assert algopy.op.Scratch.load_uint64(1) == algopy.UInt64(5)
        return True

# In your test
contract = MyContract()
result = contract.approval_program()

assert result
scratch_space = context.txn.last_group.get_scratch_space()
assert scratch_space[1] == algopy.UInt64(5)
```

For more detailed information, explore the example contracts in the `examples/` directory, the [coverage](../coverage.md) page, and the [API documentation](../api.md).

```{testcleanup}
ctx_manager.__exit__(None, None, None)
```
