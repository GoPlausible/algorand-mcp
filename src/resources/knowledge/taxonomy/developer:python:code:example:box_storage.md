# Box Storage in Algorand Smart Contracts

Box storage is a feature in Algorand that allows smart contracts to store and manage data in separate "boxes" outside of the application's global and local state. This guide demonstrates how to use box storage in Algorand Python smart contracts.

## Box Storage Types

```python
from algopy import (
    ARC4Contract,
    Box,
    BoxMap,
    BoxRef,
    Bytes,
    String,
    UInt64,
    arc4,
)

# Example of a struct that can be stored in a box
class UserStruct(arc4.Struct):
    name: arc4.String
    id: arc4.UInt64
    asset: arc4.UInt64
```

### Initializing Box Storage

```python
class BoxStorage(ARC4Contract):
    def __init__(self) -> None:
        # Basic box types
        self.box_int = Box(UInt64)
        self.box_dynamic_bytes = Box[arc4.DynamicBytes](arc4.DynamicBytes, key="b")
        self.box_string = Box(arc4.String, key=b"BOX_C")
        self.box_bytes = Box(Bytes)
        
        # Box map with uint as key and string as value
        self.box_map = BoxMap(UInt64, String, key_prefix="")
        
        # Box reference for direct manipulation
        self.box_ref = BoxRef()
        
        # Box map for storing structs
        self.box_map_struct = BoxMap(arc4.UInt64, UserStruct, key_prefix="users")
```

## Basic Box Operations

### Getting Values

```python
@arc4.abimethod
def get_box_example(self) -> tuple[UInt64, Bytes, arc4.String]:
    return (
        self.box_int.value,                      # Get integer value
        self.box_dynamic_bytes.value.native,     # Get bytes value
        self.box_string.value,                   # Get string value
    )

@arc4.abimethod
def get_box_map_example(self) -> bool:
    key_1 = UInt64(1)
    # Get value with default if not found
    value = self.box_map.get(key_1, default=String("default"))
    return True
```

### Setting Values

```python
@arc4.abimethod
def set_box_example(
    self,
    value_int: UInt64,
    value_dbytes: arc4.DynamicBytes,
    value_string: arc4.String,
) -> None:
    # Set values in different box types
    self.box_int.value = value_int
    self.box_dynamic_bytes.value = value_dbytes.copy()
    self.box_string.value = value_string
    self.box_bytes.value = value_dbytes.native

    # Increment value
    self.box_int.value += 3

@arc4.abimethod
def set_box_map_struct(self, key: arc4.UInt64, value: UserStruct) -> bool:
    # Store struct in box map
    self.box_map_struct[key] = value.copy()
    return True
```

### Deleting Values

```python
@arc4.abimethod
def delete_box(self) -> None:
    # Delete values from boxes
    del self.box_int.value
    del self.box_dynamic_bytes.value
    del self.box_string.value

    # Verify deletion by checking default values
    assert self.box_int.get(default=UInt64(42)) == 42
    assert self.box_dynamic_bytes.get(default=arc4.DynamicBytes(b"42")).native == b"42"
    assert self.box_string.get(default=arc4.String("42")) == "42"

@arc4.abimethod
def delete_box_map(self, key: UInt64) -> None:
    # Delete value from box map
    del self.box_map[key]
```

## Advanced Box Operations

### Maybe Operations (Safe Access)

```python
@arc4.abimethod
def maybe_box(self) -> tuple[UInt64, bool]:
    # Get value and existence flag
    box_int_value, box_int_exists = self.box_int.maybe()
    return box_int_value, box_int_exists

@arc4.abimethod
def maybe_box_map(self) -> tuple[String, bool]:
    key_1 = UInt64(1)
    # Get value and existence flag from map
    value, exists = self.box_map.maybe(key_1)
    if not exists:
        value = String("")
    return value, exists
```

### Box References

```python
@arc4.abimethod
def manipulate_box_ref(self) -> None:
    box_ref = BoxRef(key=String("blob"))
    assert box_ref.create(size=32)

    # Manipulate data
    sender_bytes = Txn.sender.bytes
    app_address = Global.current_application_address.bytes
    value_3 = Bytes(b"hello")
    
    # Replace and splice operations
    box_ref.replace(0, sender_bytes)
    box_ref.splice(0, 0, app_address)
    box_ref.replace(64, value_3)
    
    # Extract data
    prefix = box_ref.extract(0, 32 * 2 + value_3.length)
    
    # Delete and recreate
    box_ref.delete()
    box_ref.put(sender_bytes + app_address)
```

### Length Operations

```python
@arc4.abimethod
def box_map_length(self) -> UInt64:
    key_0 = UInt64(0)
    if key_0 not in self.box_map:
        return UInt64(0)
    return self.box_map.length(key_0)

@arc4.abimethod
def length_box_ref(self) -> UInt64:
    box_ref = BoxRef(key=String("blob"))
    assert box_ref.create(size=32)
    return box_ref.length
```

## Best Practices

1. **Memory Management**:
   - Use appropriate box sizes to minimize storage costs
   - Delete unused boxes to free up space
   - Consider using box references for large data manipulations

2. **Data Safety**:
   - Use `maybe()` operations when accessing potentially non-existent values
   - Provide default values when getting box contents
   - Verify box existence before operations

3. **Struct Storage**:
   - Use `copy()` when storing struct values to ensure data integrity
   - Verify struct storage with assertions
   - Use appropriate key prefixes for organization

4. **Box References**:
   - Create boxes with appropriate sizes
   - Use extract and splice operations carefully
   - Clean up unused box references

5. **Performance**:
   - Minimize box operations to reduce costs
   - Use appropriate data types for storage
   - Consider using box maps for related data

6. **Error Handling**:
   - Include assertions for critical operations
   - Handle non-existent boxes gracefully
   - Verify operation success

This guide demonstrates the various capabilities of box storage in Algorand smart contracts using Python. Box storage provides a flexible way to manage contract data while maintaining efficiency and organization.
