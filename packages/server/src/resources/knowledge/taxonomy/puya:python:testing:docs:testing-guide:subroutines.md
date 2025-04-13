# Subroutines

Subroutines allow direct testing of internal contract logic without full application calls.

```{testsetup}
import algopy
import algopy_testing
from algopy_testing import algopy_testing_context

# Create the context manager for snippets below
ctx_manager = algopy_testing_context()

# Enter the context
context = ctx_manager.__enter__()
```

## Overview

The `@algopy.subroutine` decorator exposes contract methods for isolated testing within the Algorand Python Testing framework. This enables focused validation of core business logic without the overhead of full application deployment and execution.

## Usage

1. Decorate internal methods with `@algopy.subroutine`:

```{testcode}
from algopy import subroutine, UInt64

class MyContract:
    @subroutine
    def calculate_value(self, input: UInt64) -> UInt64:
        return input * UInt64(2)
```

2. Test the subroutine directly:

```{testcode}
def test_calculate_value(context: algopy_testing.AlgopyTestContext):
    contract = MyContract()
    result = contract.calculate_value(UInt64(5))
    assert result == UInt64(10)
```

## Benefits

-   Faster test execution
-   Simplified debugging
-   Focused unit testing of core logic

## Best Practices

-   Use subroutines for complex internal calculations
-   Prefer writing `pure` subroutines in ARC4Contract classes
-   Combine with full application tests for comprehensive coverage
-   Maintain realistic input and output types (e.g., `UInt64`, `Bytes`)

## Example

For a complete example, see the `simple_voting` contract in the [examples](../examples.md) section.

```{testcleanup}
ctx_manager.__exit__(None, None, None)
```
