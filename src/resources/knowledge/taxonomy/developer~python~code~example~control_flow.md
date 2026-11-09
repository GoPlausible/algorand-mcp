# Control Flow in Algorand Smart Contracts

This guide demonstrates the various control flow structures available in Algorand Python smart contracts, including conditional statements, loops, and pattern matching.

## Conditional Statements (If-Else)

```python
from algopy import ARC4Contract, String, UInt64, arc4

class IfElseExample(ARC4Contract):
    @arc4.abimethod
    def is_rich(self, account_balance: UInt64) -> String:
        if account_balance > 1000:
            return String("This account is rich!")
        elif account_balance > 100:
            return String("This account is doing well.")
        else:
            return String("This account is poor :(")

    @arc4.abimethod
    def is_even(self, number: UInt64) -> String:
        # Ternary operator example
        return String("Even") if number % 2 == 0 else String("Odd")
```

### Key Points about Conditionals
- Standard if-elif-else structure is supported
- Conditions must evaluate to boolean values
- Ternary operator (`value_if_true if condition else value_if_false`) is supported
- Type safety is enforced for return values

## For Loops

```python
import typing as t
from algopy import ARC4Contract, UInt64, arc4, uenumerate, urange

# Define a static array type
FourArray: t.TypeAlias = arc4.StaticArray[arc4.UInt8, t.Literal[4]]

class ForLoopsExample(ARC4Contract):
    @arc4.abimethod
    def for_loop(self) -> FourArray:
        array = FourArray(arc4.UInt8(0), arc4.UInt8(0), arc4.UInt8(0), arc4.UInt8(0))

        # Enumerate with reversed range
        for index, item in uenumerate(reversed(urange(4))):  # [3, 2, 1, 0]
            array[index] = arc4.UInt8(item)

        # Simple range iteration
        x = UInt64(0)
        for item in urange(1, 5):  # [1, 2, 3, 4]
            x += item

        assert x == 10
        return array
```

### Key Points about For Loops
- Uses `urange` for unsigned integer ranges
- `uenumerate` provides index and value pairs
- Supports iteration over static arrays
- Can use `reversed` with `urange`
- Loop variables must be properly typed

## Match Statements (Pattern Matching)

```python
class MatchStatements(ARC4Contract):
    @arc4.abimethod
    def get_day(self, date: UInt64) -> String:
        match date:
            case UInt64(0):
                return String("Monday")
            case UInt64(1):
                return String("Tuesday")
            case UInt64(2):
                return String("Wednesday")
            case UInt64(3):
                return String("Thursday")
            case UInt64(4):
                return String("Friday")
            case UInt64(5):
                return String("Saturday")
            case UInt64(6):
                return String("Sunday")
            case _:
                return String("Invalid day")
```

### Key Points about Match Statements
- Similar to switch statements in other languages
- Cases must be exhaustive
- Wildcard pattern (`_`) catches all unmatched cases
- Values in cases must match the type being matched
- Each case must return consistent types

## While Loops

```python
class WhileLoopExample(ARC4Contract):
    @arc4.abimethod
    def loop(self) -> UInt64:
        num = UInt64(10)
        loop_count = UInt64(0)

        while num > 0:
            if num > 5:
                num -= 1
                loop_count += 1
                continue

            num -= 2
            loop_count += 1

            if num == 1:
                break

        return loop_count
```

### Key Points about While Loops
- Condition must evaluate to a boolean
- Supports `break` to exit the loop
- Supports `continue` to skip to next iteration
- Variables modified in loop must be properly typed
- Be careful with infinite loops (they will fail)

## Best Practices

1. **Type Safety**:
   - Always use proper types for variables and return values
   - Be explicit with type conversions
   - Use type aliases for complex types

2. **Loop Control**:
   - Use appropriate loop structure for the task
   - Avoid infinite loops
   - Consider using `break` and `continue` for control flow
   - Initialize counters and accumulators properly

3. **Pattern Matching**:
   - Make match statements exhaustive
   - Use wildcard pattern (`_`) as last case
   - Keep cases simple and readable

4. **Conditionals**:
   - Use clear, simple conditions
   - Consider using ternary operator for simple if-else
   - Ensure all branches return consistent types

5. **Performance**:
   - Keep loops efficient
   - Avoid unnecessary iterations
   - Use appropriate data structures

6. **Code Organization**:
   - Group related control structures
   - Use meaningful variable names
   - Add comments for complex logic

This guide demonstrates the various control flow structures available in Algorand Python smart contracts. Understanding and properly using these structures is essential for writing efficient and maintainable smart contracts.
