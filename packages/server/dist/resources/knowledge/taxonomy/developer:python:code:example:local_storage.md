# Local Storage in Algorand Smart Contracts

Local storage in Algorand smart contracts allows you to store per-account state data. This guide demonstrates how to work with local storage using Python.

## Initializing Local Storage

```python
from algopy import (
    Account,
    Application,
    ARC4Contract,
    Asset,
    Bytes,
    LocalState,
    UInt64,
    arc4,
)

class LocalStorage(ARC4Contract):
    def __init__(self) -> None:
        # Initialize different types of local storage
        self.local_int = LocalState(UInt64)           # Integer storage
        self.local_bytes = LocalState(Bytes)          # Bytes storage
        self.local_bool = LocalState(bool)            # Boolean storage
        self.local_asset = LocalState(Asset)          # Asset reference
        self.local_application = LocalState(Application)  # Application reference
        self.local_account = LocalState(Account)      # Account reference
```

## Reading Local State

### Basic Access

```python
@arc4.abimethod
def get_item_local_data(self, for_account: Account) -> UInt64:
    # Direct access using indexing
    return self.local_int[for_account]

@arc4.abimethod
def get_local_data_with_default_int(self, for_account: Account) -> UInt64:
    # Access with default value
    return self.local_int.get(for_account, default=UInt64(0))

@arc4.abimethod
def maybe_local_data(self, for_account: Account) -> tuple[UInt64, bool]:
    # Get value and existence flag
    result, exists = self.local_int.maybe(for_account)
    if not exists:
        result = UInt64(0)
    return result, exists
```

### Reading Different Types

```python
@arc4.abimethod
def get_item_local_data_example(self, for_account: Account) -> bool:
    # Reading integers
    assert self.local_int[for_account] == UInt64(10)
    
    # Reading bytes
    assert self.local_bytes[for_account] == b"Hello"
    
    # Reading booleans
    assert bool(self.local_bool[for_account])
    
    # Reading special types
    assert self.local_asset[for_account] == Asset(UInt64(10))
    assert self.local_application[for_account] == Application(UInt64(10))
    assert self.local_account[for_account] == Account(Bytes(b"Hello"))
    return True
```

### Reading with Default Values

```python
@arc4.abimethod
def get_local_data_with_default(self, for_account: Account) -> bool:
    # Integer with default
    assert self.local_int.get(for_account, default=UInt64(0)) == UInt64(10)
    
    # Bytes with default
    assert self.local_bytes.get(
        for_account, 
        default=Bytes(b"Default Value")
    ) == Bytes(b"Hello")
    
    # Boolean with default
    assert bool(self.local_bool.get(for_account, default=False))
    
    # Asset with default
    assert self.local_asset.get(
        for_account, 
        default=Asset(UInt64(0))
    ) == Asset(UInt64(10))
    
    return True
```

## Writing Local State

### Basic Writing

```python
@arc4.abimethod
def set_local_int(self, for_account: Account, value: UInt64) -> None:
    # Set integer value for account
    self.local_int[for_account] = value
```

### Writing Different Types

```python
@arc4.abimethod
def set_local_data_example(
    self,
    for_account: Account,
    value_asset: Asset,
    value_account: Account,
    value_appln: Application,
    value_byte: Bytes,
    *,
    value_bool: bool,
) -> bool:
    # Set bytes
    self.local_bytes[for_account] = value_byte
    
    # Set boolean
    self.local_bool[for_account] = value_bool
    
    # Set asset reference
    self.local_asset[for_account] = value_asset
    
    # Set application reference
    self.local_application[for_account] = value_appln
    
    # Set account reference
    self.local_account[for_account] = value_account
    
    # Verify values
    assert self.local_bytes[for_account] == value_byte
    assert self.local_bool[for_account] == value_bool
    assert self.local_asset[for_account] == value_asset
    return True
```

## Checking State Existence

```python
@arc4.abimethod
def contains_local_data(self, for_account: Account) -> bool:
    # Check if account has local state
    assert for_account in self.local_int
    return True

@arc4.abimethod
def contains_local_data_example(self, for_account: Account) -> bool:
    # Check existence for all types
    assert for_account in self.local_int
    assert for_account in self.local_bytes
    assert for_account in self.local_bool
    assert for_account in self.local_asset
    assert for_account in self.local_application
    assert for_account in self.local_account
    return True
```

## Deleting Local State

```python
@arc4.abimethod
def delete_local_data(self, for_account: Account) -> None:
    # Delete single value
    del self.local_account[for_account]

@arc4.abimethod
def delete_local_data_example(self, for_account: Account) -> bool:
    # Delete all types of local state
    del self.local_int[for_account]
    del self.local_bytes[for_account]
    del self.local_bool[for_account]
    del self.local_asset[for_account]
    del self.local_application[for_account]
    del self.local_account[for_account]
    return True
```

## Best Practices

1. **Initialization**:
   - Use appropriate types for your data
   - Initialize all required state variables
   - Document state variable purposes
   - Consider storage limits

2. **Reading State**:
   - Use `get()` with default values for safe access
   - Use `maybe()` when existence check is needed
   - Handle non-existent values gracefully
   - Verify type consistency

3. **Writing State**:
   - Validate data before writing
   - Use appropriate type conversions
   - Consider storage costs
   - Update related state consistently

4. **State Existence**:
   - Check state existence before access
   - Handle missing state gracefully
   - Use appropriate default values
   - Consider opt-in requirements

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

This guide demonstrates the various aspects of working with local state in Algorand smart contracts using Python. Understanding these concepts is crucial for developing applications that need to maintain per-account state.
