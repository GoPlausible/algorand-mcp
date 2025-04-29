# Hello World Smart Contract

This example demonstrates how to create a basic smart contract using Algorand Python. The contract implements a simple "hello" function that takes a name parameter and returns a greeting.

## Contract Implementation

```python
from algopy import ARC4Contract, String
from algopy.arc4 import abimethod

class HelloWorld(ARC4Contract):
    @abimethod()
    def hello(self, name: String) -> String:
        return "Hello, " + name
```

### Key Components

1. **Imports**:
   - `ARC4Contract`: Base class for ARC4-compliant smart contracts
   - `String`: Type for string values in the contract
   - `abimethod`: Decorator to define ABI-compliant methods

2. **Contract Class**:
   - Inherits from `ARC4Contract`
   - Implements a single method `hello`
   - Uses type hints for parameters and return values

3. **Hello Method**:
   - Takes a `name` parameter of type `String`
   - Returns a greeting string concatenating "Hello, " with the provided name
   - Decorated with `@abimethod()` to make it callable from outside the contract

## Testing the Contract

Here's how to interact with the contract using the AlgoKit Utils Python SDK:

```python
from algokit_utils import (
    AlgoAmount,
    AlgorandClient,
    OnSchemaBreak,
    OnUpdate,
    PaymentParams,
    SigningAccount,
)
from smart_contracts.artifacts.hello_world.hello_world_client import (
    HelloArgs,
    HelloWorldClient,
    HelloWorldFactory,
)

# Deploy the contract
factory = algorand.client.get_typed_app_factory(
    HelloWorldFactory,
    default_sender=creator.address,
    default_signer=creator.signer,
)

client, deploy_result = factory.deploy(
    on_update=OnUpdate.ReplaceApp,
    on_schema_break=OnSchemaBreak.Fail,
)

# Fund the contract with 1 Algo
algorand.send.payment(
    PaymentParams(
        sender=dispenser.address,
        receiver=client.app_address,
        amount=AlgoAmount(algo=1),
    )
)

# Call the hello method
result = client.send.hello(HelloArgs(name="World"))
assert result.abi_return == "Hello, World"

# Simulate multiple calls
result = (
    client.new_group()
    .hello(HelloArgs(name="World"))
    .hello(HelloArgs(name="Jane"))
    .simulate()
)
```

### Testing Features

1. **Basic Call**:
   - Create an instance of the contract client
   - Call the `hello` method with a name argument
   - Verify the returned greeting

2. **Transaction Group Simulation**:
   - Create a group of transactions
   - Call the `hello` method multiple times
   - Simulate the execution
   - Verify the results and check the app budget consumption

## Key Concepts

1. **ARC4 Compliance**:
   - The contract follows the ARC4 standard for method calls
   - Uses typed parameters and return values
   - Provides ABI-compatible methods

2. **Contract Deployment**:
   - Uses `AlgoKit` for deployment
   - Configures update behavior and schema break handling
   - Funds the contract with initial Algos

3. **Contract Interaction**:
   - Uses generated client code for type-safe interactions
   - Supports both direct calls and transaction group simulations
   - Provides budget consumption insights

## Best Practices

1. **Type Safety**:
   - Use proper type hints for parameters and return values
   - Leverage the generated client code for type-safe interactions

2. **Testing**:
   - Write comprehensive tests for contract methods
   - Use simulation to verify behavior before deployment
   - Check resource consumption through budget metrics

3. **Deployment**:
   - Configure appropriate update and schema break behaviors
   - Ensure proper funding for contract operations
   - Use AlgoKit's deployment utilities for consistency

This Hello World example serves as a foundation for understanding basic smart contract development with Algorand Python. It demonstrates the essential components of contract creation, deployment, and interaction while following best practices for development and testing.
