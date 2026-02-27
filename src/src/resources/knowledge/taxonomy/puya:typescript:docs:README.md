# Algorand TypeScript

Algorand TypeScript is a partial implementation of the TypeScript programming language that runs on the Algorand Virtual Machine (AVM). It includes a statically typed framework for development of Algorand smart contracts and logic signatures, with TypeScript interfaces to underlying AVM functionality that works with standard TypeScript tooling.

It maintains the syntax and semantics of TypeScript such that a developer who knows TypeScript can make safe assumptions
about the behaviour of the compiled code when running on the AVM. Algorand TypeScript is also executable TypeScript that can be run
and debugged on a Node.js virtual machine with transpilation to EcmaScript and run from automated tests.

# Guiding Principals

## Familiarity

Where the base language (TypeScript/EcmaScript) doesn't support a given feature natively (eg. unsigned fixed size integers),
prior art should be used to inspire an API that is familiar to a user of the base language and transpilation can be used to
ensure this code executes correctly.

## Leveraging TypeScript type system

TypeScript's type system should be used where ever possible to ensure code is type safe before compilation to create a fast
feedback loop and nudge users into the [pit of success](https://blog.codinghorror.com/falling-into-the-pit-of-success/).

## TEALScript compatibility

[TEALScript](https://github.com/algorandfoundation/tealscript/) is an existing TypeScript-like language to TEAL compiler however the source code is not executable TypeScript, and it does not prioritise semantic compatibility. Wherever possible, Algorand TypeScript should endeavour to be compatible with existing TEALScript contracts and where not possible migratable with minimal changes.

## Algorand Python

[Algorand Python](https://algorandfoundation.github.io/puya/) is the Python equivalent of Algorand TypeScript. Whilst there is a primary goal to produce an API which makes sense in the TypeScript ecosystem, a secondary goal is to minimise the disparity between the two APIs such that users who choose to, or are required to develop on both platforms are not facing a completely unfamiliar API.

# Architecture decisions

As part of developing Algorand TypeScript we are documenting key architecture decisions using [Architecture Decision Records (ADRs)](https://adr.github.io/). The following are the key decisions that have been made thus far:

- [2024-05-21: Primitive integer types](./architecture-decisions/2024-05-21_primitive-integer-types.md)
- [2024-05-21: Primitive byte and string types](./architecture-decisions/2024-05-21_primitive-bytes-and-strings.md)
