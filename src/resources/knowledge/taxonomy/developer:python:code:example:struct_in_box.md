# Structs in Box Storage for Algorand Smart Contracts

This guide demonstrates how to use structs with box storage in Algorand smart contracts using Python. Box storage with structs provides a way to store complex data structures efficiently.

## Defining a Struct

```python
from algopy import BoxMap, arc4

class UserStruct(arc4.Struct):
    name: arc4.String
    id: arc4.UInt64
    asset: arc4.UInt64
```

The struct definition includes:
- Type annotations for each field
- ARC4-compatible data types
- Clear field naming

## Implementing Box Storage with Structs

```python
class StructInBoxMap(arc4.ARC4Contract):
    def __init__(self) -> None:
        # Initialize box map with UInt64 keys and UserStruct values
        self.user_map = BoxMap(
            arc4.UInt64,        # Key type
            UserStruct,         # Value type
            key_prefix="users"  # Optional prefix for organization
        )
```

## Basic Operations

### Setting Values

```python
@arc4.abimethod
def box_map_set(self, key: arc4.UInt64, value: UserStruct) -> bool:
    # Always use copy() when storing structs
    self.user_map[key] = value.copy()
    
    # Verify storage
    assert self.user_map[key] == value
    return True

@arc4.abimethod
def box_map_test(self) -> bool:
    key_0 = arc4.UInt64(0)
    
    # Create struct instance
    value = UserStruct(
        arc4.String("testName"),
        arc4.UInt64(70),
        arc4.UInt64(2)
    )

    # Store and verify
    self.user_map[key_0] = value.copy()
    
    # Verify byte length
    assert self.user_map[key_0].bytes.length == value.bytes.length
    assert self.user_map.length(key_0) == value.bytes.length
    return True
```

### Getting Values

```python
@arc4.abimethod
def box_map_get(self, key: arc4.UInt64) -> UserStruct:
    # Retrieve struct from box storage
    return self.user_map[key]
```

### Checking Existence

```python
@arc4.abimethod
def box_map_exists(self, key: arc4.UInt64) -> bool:
    # Check if key exists in box map
    return key in self.user_map
```

## Usage Examples

### Creating and Storing a User

```python
# Create user struct
user = UserStruct(
    name=arc4.String("Alice"),
    id=arc4.UInt64(1),
    asset=arc4.UInt64(100)
)

# Store in box map
key = arc4.UInt64(1)
box_map_set(key, user)
```

### Retrieving User Data

```python
# Get user by key
key = arc4.UInt64(1)
user = box_map_get(key)

# Access struct fields
name = user.name      # arc4.String
user_id = user.id     # arc4.UInt64
asset = user.asset    # arc4.UInt64
```

## Best Practices

1. **Struct Design**:
   - Use appropriate field types
   - Keep structs focused and organized
   - Consider field order for efficiency
   - Document struct purpose and usage

2. **Data Management**:
   - Always use copy() when storing structs
   - Verify stored data after writing
   - Check existence before reading
   - Handle missing data gracefully

3. **Storage Efficiency**:
   - Consider struct size limitations
   - Use appropriate key prefixes
   - Clean up unused storage
   - Monitor storage usage

4. **Type Safety**:
   - Use proper type annotations
   - Verify field types
   - Handle type conversions carefully
   - Test with various data types

5. **Error Handling**:
   - Check for missing keys
   - Validate struct data
   - Handle storage errors
   - Provide clear error messages

6. **Performance**:
   - Minimize storage operations
   - Use efficient data structures
   - Consider storage costs
   - Optimize access patterns

## Common Patterns

1. **User Data Storage**:
```python
user = UserStruct(
    arc4.String("username"),
    arc4.UInt64(user_id),
    arc4.UInt64(balance)
)
```

2. **Batch Operations**:
```python
def update_multiple_users(self, users: list[UserStruct]) -> None:
    for i, user in enumerate(users):
        self.user_map[arc4.UInt64(i)] = user.copy()
```

3. **Data Validation**:
```python
def validate_user(self, user: UserStruct) -> bool:
    return (
        user.name.native != ""
        and user.id.native > 0
        and user.asset.native >= 0
    )
```

This guide demonstrates how to effectively use structs with box storage in Algorand smart contracts. Understanding these concepts is crucial for developing applications that need to store and manage complex data structures efficiently.
