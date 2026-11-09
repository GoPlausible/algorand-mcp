# AlgoKit Python Utilities

A set of core Algorand utilities written in Python and released via PyPi that make it easier to build solutions on Algorand.
This project is part of [AlgoKit](https://github.com/algorandfoundation/algokit-cli).

The goal of this library is to provide intuitive, productive utility functions that make it easier, quicker and safer to build applications on Algorand.
Largely these functions wrap the underlying Algorand SDK, but provide a higher level interface with sensible defaults and capabilities for common tasks.

#### NOTE
If you prefer TypeScript there’s an equivalent [TypeScript utility library](https://github.com/algorandfoundation/algokit-utils-ts).

[Core principles]() | [Installation]() | [Usage]() | [Capabilities]() | [Reference docs]()

# Contents

* [Account management](capabilities/account.md)
  * [`Account`](capabilities/account.md#account)
* [Client management](capabilities/client.md)
  * [Network configuration](capabilities/client.md#network-configuration)
  * [Clients](capabilities/client.md#clients)
* [App client](capabilities/app-client.md)
  * [Design](capabilities/app-client.md#design)
  * [Creating an application client](capabilities/app-client.md#creating-an-application-client)
  * [Calling methods on the app](capabilities/app-client.md#calling-methods-on-the-app)
  * [Composing calls](capabilities/app-client.md#composing-calls)
  * [Reading state](capabilities/app-client.md#reading-state)
  * [Handling logic errors and diagnosing errors](capabilities/app-client.md#handling-logic-errors-and-diagnosing-errors)
* [App deployment](capabilities/app-deploy.md)
  * [Design](capabilities/app-deploy.md#design)
  * [Finding apps by creator](capabilities/app-deploy.md#finding-apps-by-creator)
  * [Deploying an application](capabilities/app-deploy.md#deploying-an-application)
* [Algo transfers](capabilities/transfer.md)
  * [Transferring Algos](capabilities/transfer.md#transferring-algos)
  * [Ensuring minimum Algos](capabilities/transfer.md#ensuring-minimum-algos)
  * [Transfering Assets](capabilities/transfer.md#transfering-assets)
  * [Dispenser](capabilities/transfer.md#dispenser)
* [TestNet Dispenser Client](capabilities/dispenser-client.md)
  * [Creating a Dispenser Client](capabilities/dispenser-client.md#creating-a-dispenser-client)
  * [Funding an Account](capabilities/dispenser-client.md#funding-an-account)
  * [Registering a Refund](capabilities/dispenser-client.md#registering-a-refund)
  * [Getting Current Limit](capabilities/dispenser-client.md#getting-current-limit)
  * [Error Handling](capabilities/dispenser-client.md#error-handling)
* [Debugger](capabilities/debugger.md)
  * [Configuration](capabilities/debugger.md#configuration)
  * [Debugging Utilities](capabilities/debugger.md#debugging-utilities)
* [`algokit_utils`](apidocs/algokit_utils/algokit_utils.md)
  * [Data](apidocs/algokit_utils/algokit_utils.md#data)
  * [Classes](apidocs/algokit_utils/algokit_utils.md#classes)
  * [Functions](apidocs/algokit_utils/algokit_utils.md#functions)

<a id="core-principles"></a>

# Core principles

This library is designed with the following principles:

- **Modularity** - This library is a thin wrapper of modular building blocks over the Algorand SDK; the primitives from the underlying Algorand SDK are
  exposed and used wherever possible so you can opt-in to which parts of this library you want to use without having to use an all or nothing approach.
- **Type-safety** - This library provides strong TypeScript support with effort put into creating types that provide good type safety and intellisense.
- **Productivity** - This library is built to make solution developers highly productive; it has a number of mechanisms to make common code easier and terser to write

<a id="installation"></a>

# Installation

This library can be installed from PyPi using pip or poetry, e.g.:

```default
pip install algokit-utils
poetry add algokit-utils
```

<a id="usage"></a>

# Usage

To use this library simply include the following at the top of your file:

```python
import algokit_utils
```

Then you can use intellisense to auto-complete the various functions and types that are available by typing `algokit_utils.` in your favourite Integrated Development Environment (IDE),
or you can refer to the [reference documentation](apidocs/algokit_utils/algokit_utils.md).

## Types

The library contains extensive type hinting combined with a tool like MyPy this can help identify issues where incorrect types have been used, or used incorrectly.

<a id="capabilities"></a>

# Capabilities

The library helps you with the following capabilities:

- Core capabilities
  - [**Client management**](capabilities/client.md) - Creation of algod, indexer and kmd clients against various networks resolved from environment or specified configuration
  - [**Account management**](capabilities/account.md) - Creation and use of accounts including mnemonic, multisig, transaction signer, idempotent KMD accounts and environment variable injected
- Higher-order use cases
  - [**ARC-0032 Application Spec client**](capabilities/app-client.md) - Builds on top of the App management and App deployment capabilities to provide a high productivity application client that works with ARC-0032 application spec defined smart contracts (e.g. via Beaker)
  - [**App deployment**](capabilities/app-deploy.md) - Idempotent (safely retryable) deployment of an app, including deploy-time immutability and permanence control and TEAL template substitution
  - [**Algo transfers**](capabilities/transfer.md) - Ability to easily initiate algo transfers between accounts, including dispenser management and idempotent account funding
  - [**Debugger**](capabilities/debugger.md) - Provides a set of debugging tools that can be used to simulate and trace transactions on the Algorand blockchain. These tools and methods are optimized for developers who are building applications on Algorand and need to test and debug their smart contracts via [AVM Debugger extension](https://github.com/algorandfoundation/algokit-avm-vscode-debugger).

<a id="reference-documentation"></a>

# Reference documentation

We have [auto-generated reference documentation for the code](apidocs/algokit_utils/algokit_utils.md).

# Roadmap

This library will naturally evolve with any logical developer experience improvements needed to facilitate the [AlgoKit](https://github.com/algorandfoundation/algokit-cli) roadmap as it evolves.

Likely future capability additions include:

- Typed application client
- Asset management
- Expanded indexer API wrapper support

# Indices and tables

- [Index](genindex.md)
