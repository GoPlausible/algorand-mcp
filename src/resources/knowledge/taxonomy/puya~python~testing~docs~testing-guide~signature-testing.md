# Smart Signature Testing

Test Algorand smart signatures (LogicSigs) with ease using the Algorand Python Testing framework.

```{testsetup}
import algopy
from algopy_testing import algopy_testing_context

# Create the context manager for snippets below
ctx_manager = algopy_testing_context()

# Enter the context
context = ctx_manager.__enter__()
```

## Define a LogicSig

Use the `@logicsig` decorator to create a LogicSig:

```{testcode}
from algopy import logicsig, Account, Txn, Global, UInt64, Bytes

@logicsig
def hashed_time_locked_lsig() -> bool:
    # LogicSig code here
    return True  # Approve transaction
```

## Execute and Test

Use `AlgopyTestContext.execute_logicsig()` to run and verify LogicSigs:

```{testcode}
with context.txn.create_group([
    context.any.txn.payment(),
]):
    result = context.execute_logicsig(hashed_time_locked_lsig, algopy.Bytes(b"secret"))

assert result is True
```

`execute_logicsig()` returns a boolean:

-   `True`: Transaction approved
-   `False`: Transaction rejected

## Pass Arguments

Provide arguments to LogicSigs using `execute_logicsig()`:

```{testcode}
result = context.execute_logicsig(hashed_time_locked_lsig, algopy.Bytes(b"secret"))
```

Access arguments in the LogicSig with `algopy.op.arg()` opcode:

```{testcode}
@logicsig
def hashed_time_locked_lsig() -> bool:
    secret = algopy.op.arg(0)
    expected_hash = algopy.op.sha256(algopy.Bytes(b"secret"))
    return algopy.op.sha256(secret) == expected_hash

# Example usage
secret = algopy.Bytes(b"secret")
assert context.execute_logicsig(hashed_time_locked_lsig, secret)
```

For more details on available operations, see the [coverage](../coverage.md).

```{testcleanup}
ctx_manager.__exit__(None, None, None)
```
