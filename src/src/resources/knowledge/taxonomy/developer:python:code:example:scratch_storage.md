# Scratch Storage in Algorand Smart Contracts

This guide demonstrates how to use scratch storage in Algorand smart contracts. Scratch storage provides temporary storage slots that can be used during contract execution.

## Basic Implementation

```python
from algopy import ARC4Contract, Bytes, Contract, UInt64, op, urange
from algopy.arc4 import abimethod

TWO = 2
TWENTY = 20

class ScratchSlotsContract(ARC4Contract, scratch_slots=(1, TWO, urange(3, TWENTY))):
    @abimethod
    def store_data(self) -> bool:
        # Store values in scratch slots
        op.Scratch.store(1, UInt64(5))
        op.Scratch.store(2, Bytes(b"Hello World"))
        
        # Load and verify values
        assert op.Scratch.load_uint64(1) == UInt64(5)
        assert op.Scratch.load_bytes(2) == b"Hello World"
        return True
```

## Simplified Contract Example

```python
class SimpleScratchSlotsContract(Contract, scratch_slots=(1, TWO, urange(3, TWENTY))):
    def approval_program(self) -> UInt64:
        # Load and verify values from scratch storage
        assert op.Scratch.load_uint64(1) == UInt64(5)
        assert op.Scratch.load_bytes(2) == b"Hello World"
        return UInt64(1)

    def clear_state_program(self) -> UInt64:
        return UInt64(1)
```

## Key Features

### Scratch Slots Declaration

```python
# Define scratch slots in class definition
scratch_slots=(1, TWO, urange(3, TWENTY))
```
- Specify individual slots (1)
- Use constants (TWO)
- Define ranges (urange(3, TWENTY))

### Storage Operations

```python
# Store values
op.Scratch.store(1, UInt64(5))          # Store integer
op.Scratch.store(2, Bytes(b"Hello"))    # Store bytes

# Load values
value1 = op.Scratch.load_uint64(1)      # Load integer
value2 = op.Scratch.load_bytes(2)       # Load bytes
```

## Best Practices

1. **Slot Management**:
   - Define slots explicitly
   - Use meaningful constants
   - Document slot usage
   - Avoid slot conflicts

2. **Data Types**:
   - Use appropriate load methods
   - Verify data types
   - Handle type conversions
   - Check value ranges

3. **Memory Usage**:
   - Minimize slot usage
   - Clean up after use
   - Monitor memory limits
   - Optimize storage

4. **Error Handling**:
   - Verify loaded values
   - Handle missing data
   - Check slot bounds
   - Validate data types

## Common Patterns

1. **Temporary Calculations**:
```python
def calculate_total(self) -> UInt64:
    # Store intermediate results
    op.Scratch.store(1, UInt64(5))
    op.Scratch.store(2, UInt64(10))
    
    # Load and combine results
    value1 = op.Scratch.load_uint64(1)
    value2 = op.Scratch.load_uint64(2)
    return value1 + value2
```

2. **Data Validation**:
```python
def validate_input(self, input_data: Bytes) -> bool:
    # Store input for validation
    op.Scratch.store(1, input_data)
    
    # Load and validate
    stored_data = op.Scratch.load_bytes(1)
    return stored_data == input_data
```

## Technical Details

1. **Slot Allocation**:
   - Slots are numbered from 0
   - Maximum slot number is 255
   - Each slot can store any type
   - Slots are cleared after execution

2. **Data Types**:
   - UInt64 for integers
   - Bytes for byte strings
   - Type-specific load methods
   - Automatic type checking

3. **Memory Constraints**:
   - Limited number of slots
   - Temporary storage only
   - No persistence between calls
   - Efficient for calculations

4. **Performance**:
   - Fast access times
   - Low overhead
   - Efficient for loops
   - Good for temporary data

## Use Cases

1. **Complex Calculations**:
   - Store intermediate results
   - Break down computations
   - Reuse common values
   - Optimize performance

2. **Data Validation**:
   - Store input data
   - Compare values
   - Check constraints
   - Verify formats

3. **State Transitions**:
   - Store previous state
   - Calculate changes
   - Verify transitions
   - Update final state

4. **Loop Operations**:
   - Store counters
   - Accumulate results
   - Track iterations
   - Handle aggregations

This guide demonstrates how to effectively use scratch storage in Algorand smart contracts. Understanding scratch storage is crucial for optimizing contract performance and managing temporary data during execution.
