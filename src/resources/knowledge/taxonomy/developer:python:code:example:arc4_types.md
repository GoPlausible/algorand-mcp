# ARC4 Types in Algorand Smart Contracts

This guide covers the various ARC4 data types available in Algorand smart contracts using Python, including integers, arrays, bytes, addresses, structs, and tuples.

## Integer Types

### Basic Integer Types

```python
from algopy import ARC4Contract, UInt64, arc4

class Arc4Types(ARC4Contract):
    @abimethod()
    def add_arc4_uint64(self, a: arc4.UInt64, b: arc4.UInt64) -> arc4.UInt64:
        # Use .native for arithmetic operations
        c = a.native + b.native
        return arc4.UInt64(c)
```

### Different Integer Sizes

```python
@abimethod()
def add_arc4_uint_n(
    self, a: arc4.UInt8, b: arc4.UInt16, c: arc4.UInt32, d: arc4.UInt64
) -> arc4.UInt64:
    # Different integer sizes have different byte lengths
    assert a.bytes.length == 1  # UInt8 = 1 byte
    assert b.bytes.length == 2  # UInt16 = 2 bytes
    assert c.bytes.length == 4  # UInt32 = 4 bytes
    assert d.bytes.length == 8  # UInt64 = 8 bytes

    total = a.native + b.native + c.native + d.native
    return arc4.UInt64(total)
```

### Big Integers

```python
@abimethod()
def add_arc4_biguint_n(
    self, a: arc4.UInt128, b: arc4.UInt256, c: arc4.UInt512
) -> arc4.UInt512:
    # Support for larger integers up to 512 bits
    assert a.bytes.length == 16  # 128 bits
    assert b.bytes.length == 32  # 256 bits
    assert c.bytes.length == 64  # 512 bits

    total = a.native + b.native + c.native
    return arc4.UInt512(total)
```

## Bytes and Address Types

### Bytes

```python
@abimethod()
def arc4_byte(self, a: arc4.Byte) -> arc4.Byte:
    # arc4.Byte is an 8-bit integer
    return arc4.Byte(a.native + 1)
```

### Addresses

```python
@abimethod()
def arc4_address_properties(self, address: arc4.Address) -> UInt64:
    # Access address properties
    underlying_bytes = address.bytes
    account = address.native  # Get account type

    bal = account.balance
    total_asset = account.total_assets

    return bal

@abimethod()
def arc4_address_return(self, address: arc4.Address) -> arc4.Address:
    # Convert Account type to Address
    account = address.native
    converted_address = arc4.Address(account)
    return converted_address
```

## Arrays

### Static Arrays

```python
import typing as t

# Define a static array type alias
AliasedStaticArray: t.TypeAlias = arc4.StaticArray[arc4.UInt8, t.Literal[1]]

class Arc4StaticArray(ARC4Contract):
    @abimethod()
    def arc4_static_array(self) -> None:
        # Create static array directly
        static_uint32_array = arc4.StaticArray(
            arc4.UInt32(1), arc4.UInt32(10), 
            arc4.UInt32(255), arc4.UInt32(128)
        )

        # Iterate over array
        total = UInt64(0)
        for uint32_item in static_uint32_array:
            total += uint32_item.native

        # Use type alias
        aliased_static = AliasedStaticArray(arc4.UInt8(101))
        aliased_static[0] = arc4.UInt8(202)
```

### Dynamic Arrays

```python
# Define dynamic array type alias
goodbye: t.TypeAlias = arc4.DynamicArray[arc4.String]

class Arc4DynamicArray(ARC4Contract):
    @abimethod()
    def hello(self, name: arc4.String) -> String:
        # Create dynamic array
        dynamic_string_array = arc4.DynamicArray[arc4.String](arc4.String("Hello "))

        # Extend array
        extension = arc4.DynamicArray[arc4.String](name, arc4.String("!"))
        dynamic_string_array.extend(extension)

        # Copy and modify
        copied_array = dynamic_string_array.copy()
        copied_array.pop()
        copied_array.append(arc4.String("world!"))

        # Iterate over array
        greeting = String()
        for x in dynamic_string_array:
            greeting += x.native

        return greeting
```

### Dynamic Bytes

```python
@abimethod()
def arc4_dynamic_bytes(self) -> arc4.DynamicBytes:
    # Create dynamic bytes
    dynamic_bytes = arc4.DynamicBytes(b"\xff\xff\xff")

    # Access native bytes
    native_dynamic_bytes = dynamic_bytes.native

    # Modify bytes
    dynamic_bytes[0] = arc4.Byte(0)
    dynamic_bytes.extend(arc4.DynamicBytes(b"\xaa\xbb\xcc"))
    dynamic_bytes.pop()
    dynamic_bytes.append(arc4.Byte(255))

    return dynamic_bytes
```

## Structs and Tuples

### Structs

```python
class Todo(arc4.Struct):
    task: arc4.String
    completed: arc4.Bool

Todos: t.TypeAlias = arc4.DynamicArray[Todo]

class Arc4Struct(ARC4Contract):
    def __init__(self) -> None:
        self.todos = Todos()

    @abimethod()
    def add_todo(self, task: arc4.String) -> Todos:
        # Create and add struct instance
        todo = Todo(task=task, completed=arc4.Bool(False))
        
        if not self.todos:
            self.todos = Todos(todo.copy())
        else:
            self.todos.append(todo.copy())

        return self.todos

    @abimethod()
    def complete_todo(self, task: arc4.String) -> None:
        # Modify struct field
        for index in urange(self.todos.length):
            if self.todos[index].task == task:
                self.todos[index].completed = arc4.Bool(True)
                break
```

### Tuples

```python
# Define tuple type
contact_info_tuple = arc4.Tuple[arc4.String, arc4.String, arc4.UInt64]

class Arc4Tuple(ARC4Contract):
    def __init__(self) -> None:
        self.contact_info = GlobalState(
            contact_info_tuple((
                arc4.String(""), 
                arc4.String(""), 
                arc4.UInt64(0)
            ))
        )

    @abimethod()
    def add_contact_info(self, contact: contact_info_tuple) -> UInt64:
        # Unpack tuple values
        name, email, phone = contact.native
        self.contact_info.value = contact
        return phone.native

    @abimethod()
    def return_contact(self) -> arc4.Tuple[arc4.String, arc4.String, arc4.UInt64]:
        # Return tuple
        return self.contact_info.value
```

## Best Practices

1. **Integer Operations**:
   - Use `.native` for arithmetic operations
   - Choose appropriate integer size
   - Handle overflow conditions
   - Convert back to ARC4 types for returns

2. **Array Management**:
   - Use static arrays for fixed-size collections
   - Use dynamic arrays for variable-size collections
   - Make copies when needed
   - Handle array bounds properly

3. **Struct Usage**:
   - Define clear struct layouts
   - Use appropriate field types
   - Copy structs when storing
   - Validate struct data

4. **Type Safety**:
   - Use type aliases for clarity
   - Verify type conversions
   - Handle type constraints
   - Document type requirements

5. **Memory Management**:
   - Consider size limitations
   - Use appropriate data structures
   - Clean up unused data
   - Optimize storage usage

6. **Performance**:
   - Choose efficient types
   - Minimize type conversions
   - Use appropriate data structures
   - Consider operation costs

This guide demonstrates the various ARC4 data types available in Algorand smart contracts using Python. Understanding these types is crucial for developing efficient and type-safe smart contracts.
