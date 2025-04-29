# ARC4 Types

These types are available under the `algopy.arc4` namespace. Refer to the [ARC4 specification](https://arc.algorand.foundation/ARCs/arc-0004) for more details on the spec.

```{hint}
Test context manager provides _value generators_ for ARC4 types. To access their _value generators_, use `{context_instance}.any.arc4` property. See more examples below.
```

```{note}
For all `algopy.arc4` types with and without respective _value generator_, instantiation can be performed directly. If you have a suggestion for a new _value generator_ implementation, please open an issue in the [`algorand-python-testing`](https://github.com/algorandfoundation/algorand-python-testing) repository or contribute by following the [contribution guide](https://github.com/algorandfoundation/algorand-python-testing/blob/main/CONTRIBUTING.md).
```

```{testsetup}
import algopy
from algopy_testing import algopy_testing_context

# Create the context manager for snippets below
ctx_manager = algopy_testing_context()

# Enter the context
context = ctx_manager.__enter__()
```

## Unsigned Integers

```{testcode}
from algopy import arc4

# Integer types
uint8_value = arc4.UInt8(255)
uint16_value = arc4.UInt16(65535)
uint32_value = arc4.UInt32(4294967295)
uint64_value = arc4.UInt64(18446744073709551615)

... # instantiate test context
# Generate a random unsigned arc4 integer with default range
uint8 = context.any.arc4.uint8()
uint16 = context.any.arc4.uint16()
uint32 = context.any.arc4.uint32()
uint64 = context.any.arc4.uint64()
biguint128 = context.any.arc4.biguint128()
biguint256 = context.any.arc4.biguint256()
biguint512 = context.any.arc4.biguint512()

# Generate a random unsigned arc4 integer with specified range
uint8_custom = context.any.arc4.uint8(min_value=10, max_value=100)
uint16_custom = context.any.arc4.uint16(min_value=1000, max_value=5000)
uint32_custom = context.any.arc4.uint32(min_value=100000, max_value=1000000)
uint64_custom = context.any.arc4.uint64(min_value=1000000000, max_value=10000000000)
biguint128_custom = context.any.arc4.biguint128(min_value=1000000000000000, max_value=10000000000000000)
biguint256_custom = context.any.arc4.biguint256(min_value=1000000000000000000000000, max_value=10000000000000000000000000)
biguint512_custom = context.any.arc4.biguint512(min_value=10000000000000000000000000000000000, max_value=10000000000000000000000000000000000)
```

## Address

```{testcode}
from algopy import arc4

# Address type
address_value = arc4.Address("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ")

# Generate a random address
random_address = context.any.arc4.address()

# Access native underlaying type
native = random_address.native
```

## Dynamic Bytes

```{testcode}
from algopy import arc4

# Dynamic byte string
bytes_value = arc4.DynamicBytes(b"Hello, Algorand!")

# Generate random dynamic bytes
random_dynamic_bytes = context.any.arc4.dynamic_bytes(n=123) # n is the number of bits in the arc4 dynamic bytes
```

## String

```{testcode}
from algopy import arc4

# UTF-8 encoded string
string_value = arc4.String("Hello, Algorand!")

# Generate random string
random_string = context.any.arc4.string(n=12) # n is the number of bits in the arc4 string
```

```{testcleanup}
ctx_manager.__exit__(None, None, None)
```
