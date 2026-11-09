# Global Storage in Algorand Smart Contracts

This guide demonstrates how to work with global state in Algorand smart contracts using Python. Global state allows contracts to store and manage data that is accessible across all interactions with the contract.

## Initializing Global State

```python
from algopy import (
    Account,
    Application,
    ARC4Contract,
    Asset,
    Bytes,
    GlobalState,
    UInt64,
    arc4,
)

class GlobalStorage(ARC4Contract):
    def __init__(self) -> None:
        # Integer storage
        self.global_int_full = GlobalState(UInt64(50))        # With default value
        self.global_int_simplified = UInt64(10)               # Simplified syntax
        self.global_int_no_default = GlobalState(UInt64)      # No default value

        # Bytes storage
        self.global_bytes_full = GlobalState(Bytes(b"Hello")) # With default value
        self.global_bytes_simplified = Bytes(b"Hello")        # Simplified syntax
        self.global_bytes_no_default = GlobalState(Bytes)     # No default value

        # Boolean storage
        self.global_bool_simplified = True                    # Simplified boolean
        self.global_bool_no_default = GlobalState(bool)       # No default value

        # Special types
        self.global_asset = GlobalState(Asset)               # Asset reference
        self.global_application = GlobalState(Application)    # Application reference
        self.global_account = GlobalState(Account)           # Account reference
```

### Key Points about Initialization
- Can use `GlobalState` with or without default values
- Simplified syntax available for basic types
- Supports various data types including integers, bytes, booleans
- Special types for assets, applications, and accounts

## Reading Global State

### Basic Reading

```python
@arc4.abimethod
def get_global_state(self) -> UInt64:
    # Get value with default if not set
    return self.global_int_full.get(default=UInt64(0))

@arc4.abimethod
def maybe_global_state(self) -> tuple[UInt64, bool]:
    # Get value and existence flag
    int_value, int_exists = self.global_int_full.maybe()
    if not int_exists:
        int_value = UInt64(0)
    return int_value, int_exists
```

### Reading Different Types

```python
@arc4.abimethod
def get_global_state_example(self) -> bool:
    # Reading integers
    assert self.global_int_full.get(default=UInt64(0)) == 50
    assert self.global_int_simplified == UInt64(10)
    
    # Reading bytes
    assert self.global_bytes_full.get(Bytes(b"default")) == b"Hello"
    
    # Reading special types
    asset_value, exists = self.global_asset.maybe()
    assert asset_value == Asset(UInt64(10))
    
    app_value, exists = self.global_application.maybe()
    assert app_value == Application(UInt64(10))
    
    return True
```

## Writing Global State

### Basic Writing

```python
@arc4.abimethod
def set_global_state(self, value: Bytes) -> None:
    self.global_bytes_full.value = value

@arc4.abimethod
def set_global_state_example(
    self,
    value_bytes: Bytes,
    value_asset: Asset,
    *,
    value_bool: bool,
) -> None:
    # Setting different types
    self.global_bytes_no_default.value = value_bytes
    self.global_bool_no_default.value = value_bool
    self.global_asset.value = value_asset
```

## Deleting Global State

```python
@arc4.abimethod
def del_global_state(self) -> bool:
    # Delete a single value
    del self.global_int_full.value
    return True

@arc4.abimethod
def del_global_state_example(self) -> bool:
    # Delete multiple values
    del self.global_bytes_no_default.value
    del self.global_bool_no_default.value
    del self.global_asset.value
    return True
```

## Value Property Access

```python
@arc4.abimethod
def check_global_state_example(self) -> bool:
    # Direct value access
    assert self.global_int_full.value == 50
    assert self.global_bytes_full.value == Bytes(b"Hello")
    
    # Simplified syntax access
    assert self.global_int_simplified == 10
    assert self.global_bytes_simplified == b"Hello"
    assert bool(self.global_bool_simplified)
    
    # Check existence
    assert not self.global_int_no_default
    assert not self.global_bytes_no_default
    
    # Special types access
    assert self.global_asset.value == Asset(UInt64(10))
    assert self.global_application.value == Application(UInt64(10))
    assert self.global_account.value == Account(Bytes(b"Hello"))
    return True
```

## Best Practices

1. **Initialization**:
   - Use appropriate types for your data
   - Consider whether default values are needed
   - Use simplified syntax when appropriate
   - Document the purpose of each state variable

2. **Reading State**:
   - Use `get()` with default values for safe access
   - Use `maybe()` when you need to check existence
   - Handle non-existent values gracefully
   - Verify type consistency

3. **Writing State**:
   - Validate data before writing
   - Use appropriate type conversions
   - Consider storage costs
   - Update related state consistently

4. **Deleting State**:
   - Clean up unused state to save storage
   - Verify deletion success
   - Handle deletion errors gracefully
   - Consider impact on related state

5. **Type Safety**:
   - Use proper type annotations
   - Verify type compatibility
   - Handle type conversions explicitly
   - Test with various data types

6. **Performance**:
   - Minimize state operations
   - Use appropriate data structures
   - Consider storage costs
   - Optimize state access patterns

This guide demonstrates the various aspects of working with global state in Algorand smart contracts using Python. Understanding these concepts is crucial for developing efficient and reliable smart contracts.
