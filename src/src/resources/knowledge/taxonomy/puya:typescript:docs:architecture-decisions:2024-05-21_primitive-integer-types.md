# Architecture Decision Record - Primitive integer types

- **Status**: Draft
- **Owner:** Tristan Menzel
- **Deciders**: Alessandro Cappellato (Algorand Foundation), Joe Polny (Algorand Foundation), Rob Moore (MakerX)
- **Date created**: 2024-05-21
- **Date decided**: N/A
- **Date updated**: 2024-05-31

## Context

The AVM supports two integer types in its standard set of ops.

* **uint64**: An unsigned 64-bit integer where the AVM will error on over or under flows
* **biguint**: An unsigned variable bit, big-endian integer represented as an array of bytes with an indeterminate number of leading zeros which are truncated by several math ops. The max size of a biguint is 512-bits. Over and under flows will cause errors.

EcmaScript supports two numeric types.

* **number**: A floating point signed value with 64 bits of precision capable of a max safe integer value of 2^53 - 1. A number can be declared with a numeric literal, or with the `Number(...)` factory method.
* **bigint**: A signed arbitrary-precision integer with an implementation defined limit based on the platform. In practice this is greater than 512-bit. A bigint can be declared with a numeric literal and `n` suffix, or with the `BigInt(...)` factory method.

EcmaScript and TypeScript both do not support operator overloading, despite some [previous](https://github.com/tc39/notes/blob/main/meetings/2023-11/november-28.md#withdrawing-operator-overloading) [attempts](https://github.com/microsoft/TypeScript/issues/2319) to do so.

TealScript [makes use of branded `number` types](https://tealscript.netlify.app/guides/supported-types/numbers/) for all bit sizes from 8 => 512, although it doesn't allow `number` variables, you must specify the actual type you want (e.g. `uint64`). Since the source code is never executed, the safe limits of the `number` type are not a concern. Compiled code does not perform overflow checks on calculations until a return value is being encoded meaning a uint<8> is effectively a uint<64> until it's returned.

Algorand Python has specific [UInt64 and BigUint types](https://algorandfoundation.github.io/puya/lg-types.html#avm-types) that have semantics that exactly match the AVM semantics. Python allows for operator overloading so these types also use native operators (where they align to functionality in the underlying AVM).


## Requirements

- Support uint64 and biguint AVM types
- Use idiomatic TypeScript expressions for numeric expressions, including mathematical operators (`+`, `-`, `*`, `/`, etc.)
- Semantic compatibility between AVM execution and TypeScript execution (e.g. in unit tests)

## Principles

- **[AlgoKit Guiding Principles](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/algokit.md#guiding-principles)** - specifically Seamless onramp, Leverage existing ecosystem, Meet devs where they are
- **[Algorand Python Principles](https://algorandfoundation.github.io/puya/principles.html#principles)**
- **[Algorand TypeScript Guiding Principles](../README.md#guiding-principals)**

## Options

### Option 1 - Native types

EcmaScript's `number` type is ill-suited to representing either AVM type reliably as it does not have the safe range to cover the full range of a uint64. Being a floating point number, it would also require truncating after division.

EcmaScript's `bigint` is a better fit for both types but does not underflow when presented with a negative number, nor does it overflow at any meaningful limit for the AVM types.

If we solved the over/under flow checking with a custom TypeScript transformer we still face an issue that `uint64` and `biguint` would not have discrete types for the compiler to know the difference between them and also we would have no type safety against accidentally passing a `biguint` to a method that expects a `uint64` and vice versa.

### Option 2 - Wrapper classes

A `UInt64` and `BigUint` class could be defined which make use of `bigint` internally to perform maths operations and check for over or under flows after each op.

```ts
class UInt64 {

  private value: bigint

  constructor(value: bigint | number) {
    this.value = this.checkBounds(value)
  }

  add(other: UInt64): UInt64 {
    return new UInt64(this.value + other.value)
  }

  /* etc */
}

```

This solution provides the ultimate in type safety and semantic/syntactic compatibility, and requires no custom TypeScript transformer to run _correctly_ on Node.js. The semantics should be obvious to anyone familiar with Object Oriented Programming. The downside is that neither EcmaScript nor TypeScript support operator overloading which results in more verbose and unwieldy math expressions. The lack of idiomatic TypeScript mathematical operators is a deal breaker that rules this option out.

```ts
const a = UInt64(500n)
const b = Uint64(256)

// Not supported (a compile error in TS)
const c1 = a + b
// Works, but is verbose and unwieldy for more complicated expressions and isn't idiomatic TypeScript
const c2 = a.add(b)

```

### Option 3 - Branded `bigint`

TypeScript allows you to intersect primitive types with a simple interface to brand a value in a way which is incompatible with another primitive branded with a different value within the type system. In this option the base type that is branded is `bigint`, which aligns to th discussion in Option 1 about the logical type to represent `uint64` and `biguint`.

```ts
// Constructors
declare function UInt64(v): uint64
declare function BigUint(v): uint64

// Branded types
type uint64 = bigint & { __type?: 'uint64' }
type biguint = bigint & { __type?: 'biguint' }


const a: uint64 = 323n // Declare with type annotation and raw `bigint` literal
const b = UInt64(12n) // Declare with factory
const b2 = UInt64(12) // Factory could also take `number` literals (compiler could check they aren't negative and are integers)

// c1 type is `bigint`, but we can mandate a type hint with the compiler (c2)
const c1 = a + b
const c2: uint64 = a + b

// No TypeScript type error, but semantically ambiguous - is a+b performed as a biguint op or a uint64 one and then converted?
// (We could detect this as a compiler error though)
const c3: biguint = a + b

// Type error on b: Argument of type 'uint64' is not assignable to parameter of type 'biguint'. Nice!
test(a, b)
function test(x: uint64, y: biguint) {
  // ...
}

```

This solution looks like normal TypeScript and results in math expressions that are much easier to read. The factory methods (e.g. `UInt64(4n)`) mimics native equivalents and should be familiar to existing developers.

The drawbacks of this solution are:
 - Less implicit type safety for branded types as TypeScript will infer the type of any binary math expression to be the base numeric type (a type annotation will be required where ever an identifier is declared, and the compiler will need to enforce this)
 - In order to have TypeScript execution semantics of a `uint64` or `biguint` match the AVM, a custom TypeScript transformer will be required to wrap numeric operations in logic that checks for over and under flows line-by-line; this is straightforward to write though and has been successfully spiked out
 - Additional type checking will be required by the compiler to catch instances of assigning one numeric type to the other (accidental implicit assignment) e.g. assigning a `uint64` value to `biguint`.
 - Literals will require an `n` suffix
 - `bigint` cannot be used to index an object/array (only `number | string | symbol`)


### Option 4 Explicitly tagged brand types

A variation of option 3 with non-optional `__type` tags would prevent accidental implicit assignment errors when assigning between (say) `uint64` and `biguint`, but require explicit casting on all ops and any methods that return the base type.

```ts
declare function Uint64(v): uint64
declare function BigUint(v): uint64

type uint64 = bigint & { __type: 'uint64' }
type biguint = bigint & { __type: 'biguint' }

// Require factory or cast on declaration
const a: uint64 = 323n as uint64
const b = Uint64(12n)

// Also require factory or cast on math
let c2: uint64

c2 = a + b // error
c2 = Uint64(a + b) // ok
c2 = (a + b) as uint64 // ok
```

This introduces a degree of type safety with the in-built TypeScript type system at the significant expense of legibility and writability.


### Option 5 Branded `number` (TEALScript approach)

TEALScript uses a similar approach to option 3, but uses `number` as the underlying type rather than `bigint`. This has the advantage of being directly compatible with casting raw numbers (e.g. `const x: uint64 = 3` rather than `const x: uint64 = 3n`).

Furthermore, any JavaScript prototype methods that return `number` like `array.length` will be similarly able to be directly used and casted to `uint64` rather than wrapping in a factory method (e.g. `const x: uint64 = [1, 2, 3].length` rather than `const x = UInt64([1, 2, 3].length)`). It's not currently clear if any such methods will be exposed within the stub types that emerge in Algorand TypeScript though; if option 1 isn't chosen then ideally we would want to avoid exposing `number` within Algorand TypeScript altogether. Key prototypes that have `number` include `string` (see [Primitive bytes and strings](./2024-05-21_primitive-bytes-and-strings.md)) and array (but TypeScript allows you to define wrapper classes that support [iteration](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html) [and](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) [spreading](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable) so we can likely avoid `Array<T>` prototype).

If `number` is used as the base brand type for `uint64` and `bigint` is used as the base brand type for `biguint` (a type that TEALScript doesn't implement, so not a breaking change) then accidental implicit assignment errors are prevented by the TypeScript type system.

A key issue with using `number` as the base type is that per option 1, it's semantically a floating point number, not an integer. It is possible for the compiler to check for and disallow non-integer constant literals though, which would prevent a non-integer value appearing outside of division. A custom TypeScript transformer will need to wrap division operations to allow the result to be truncated as an integer; this is a violation of the semantic compatibility principle, but given a branded type would be used rather than `number` (the fact the base type is `number` is largely hidden from the developer) it probably doesn't violate the principle of least surprise and may be considered an acceptable compromise.

The other problem with use of `number` as the base brand type is that you will lose precision and get linting errors when representing a number greater than 53-bits as a constant literal e.g. `const x: uint64 = 9007199254740992`. It *may* be possible for a custom TypeScript transformer to get the value before precision is lost (needs investigation) and then disable that particular linting tool, but that is a fairly clear violation of semantic compatibility. The workaround would have to be that the compiler detects numbers > `Number.MAX_SAFE_INTEGER` and complains and instead you would have to use the factory syntax with a `bigint` constant literal e.g. `const x = UInt64(9007199254740992n)`.


## Preferred option

Either option 3 or option 5 depending on comfort level in using a floating point number type as the base type for `uint64`, requiring extra compiler checks & more complex custom transformers to overcome this, and not being able to cleanly represent very large integers as a constant literal vs lack of TypeScript protection against accidental implicit assignment of `uint64` and `biguint` (but can be checked by the compiler), and needing to avoid prototype methods that return `number` (although this matches semantic compatibility so may be a good idea anyway).

Option 3 is also a breaking change for TEALScript, which would require `number` literals to either be suffixed with the `bigint` suffix (`n`) or be wrapped in a `UInt64()` factory call.

Option 1 and 2 are excluded because they don't meet the requirements of semantic compatibility and least surprise. Option 4 is excluded, because the resulting syntax is unpractical.

## Selected option

Option 5 has been selected as the best option