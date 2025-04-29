# Testing Guide

The Algorand Python Testing framework provides powerful tools for testing Algorand Python smart contracts within a Python interpreter. This guide covers the main features and concepts of the framework, helping you write effective tests for your Algorand applications.

```{note}
For all code examples in the _Testing Guide_ section, assume `context` is an instance of `AlgopyTestContext` obtained using the `algopy_testing_context()` context manager. All subsequent code is executed within this context.
```

```{mermaid}
graph TD
    subgraph GA["Your Development Environment"]
        A["algopy (type stubs)"]
        B["algopy_testing (testing framework)<br>(You are here 📍)"]
        C["puya (compiler)"]
    end

    subgraph GB["Your Algorand Project"]
        D[Your Algorand Python contract]
    end

    D -->|type hints inferred from| A
    D -->|compiled using| C
    D -->|tested via| B
```

> _High-level overview of the relationship between your smart contracts project, Algorand Python Testing framework, Algorand Python type stubs, and the compiler_

The Algorand Python Testing framework streamlines unit testing of your Algorand Python smart contracts by offering functionality to:

1. Simulate the Algorand Virtual Machine (AVM) environment
2. Create and manipulate test accounts, assets, applications, transactions, and ARC4 types
3. Test smart contract classes, including their states, variables, and methods
4. Verify logic signatures and subroutines
5. Manage global state, local state, scratch slots, and boxes in test contexts
6. Simulate transactions and transaction groups, including inner transactions
7. Verify opcode behavior

By using this framework, you can ensure your Algorand Python smart contracts function correctly before deploying them to a live network.

Key features of the framework include:

-   `AlgopyTestContext`: The main entry point for testing, providing access to various testing utilities and simulated blockchain state
-   AVM Type Simulation: Accurate representations of AVM types like `UInt64` and `Bytes`
-   ARC4 Support: Tools for testing ARC4 contracts and methods, including struct definitions and ABI encoding/decoding
-   Transaction Simulation: Ability to create and execute various transaction types
-   State Management: Tools for managing and verifying global and local state changes
-   Opcode Simulation: Implementations of AVM opcodes for accurate smart contract behavior testing

The framework is designed to work seamlessly with Algorand Python smart contracts, allowing developers to write comprehensive unit tests that closely mimic the behavior of contracts on the Algorand blockchain.

## Table of Contents

```{toctree}
---
maxdepth: 3
---

concepts
avm-types
arc4-types
transactions
contract-testing
signature-testing
state-management
subroutines
opcodes
```
