# Inner Transactions in Algorand Smart Contracts

Inner transactions allow smart contracts to create and submit transactions from within the contract. This guide demonstrates various types of inner transactions in Algorand Python smart contracts.

## Payment Transactions

```python
from algopy import (
    Account,
    Application,
    ARC4Contract,
    Asset,
    Global,
    String,
    Txn,
    UInt64,
    arc4,
    itxn,
)

class InnerTransactions(ARC4Contract):
    @abimethod()
    def payment(self) -> UInt64:
        # Send payment from contract to transaction sender
        result = itxn.Payment(
            amount=5000,
            receiver=Txn.sender,
            fee=0  # fee is 0 by default, shown here for demonstration
        ).submit()
        return result.amount
```

Note: The sender for inner transactions is implicitly `Global.current_application_address()`.

## Asset Operations

### Creating Assets

```python
@abimethod
def fungible_asset_create(self) -> UInt64:
    # Create a fungible token
    itxn_result = itxn.AssetConfig(
        total=100_000_000_000,
        decimals=2,
        unit_name="RP",
        asset_name="Royalty Points",
    ).submit()
    return itxn_result.created_asset.id

@abimethod
def non_fungible_asset_create(self) -> UInt64:
    # Create an NFT following ARC3 standard
    itxn_result = itxn.AssetConfig(
        total=100,
        decimals=2,
        unit_name="ML",
        asset_name="Mona Lisa",
        url="https://link_to_ipfs/Mona_Lisa",
        manager=Global.current_application_address,
        reserve=Global.current_application_address,
        freeze=Global.current_application_address,
        clawback=Global.current_application_address,
    ).submit()
    return itxn_result.created_asset.id
```

### Asset Opt-In and Transfer

```python
@abimethod
def asset_opt_in(self, asset: Asset) -> None:
    # Opt-in to an asset
    itxn.AssetTransfer(
        asset_receiver=Global.current_application_address,
        xfer_asset=asset,
        asset_amount=0,
        fee=0,
    ).submit()

@abimethod
def asset_transfer(self, asset: Asset, receiver: Account, amount: UInt64) -> None:
    # Transfer assets
    itxn.AssetTransfer(
        asset_receiver=receiver,
        xfer_asset=asset,
        asset_amount=amount,
        fee=0,
    ).submit()
```

### Asset Management

```python
@abimethod
def asset_freeze(self, acct_to_be_frozen: Account, asset: Asset) -> None:
    # Freeze an account's asset holdings
    itxn.AssetFreeze(
        freeze_account=acct_to_be_frozen,
        freeze_asset=asset,
        frozen=True,
        fee=0,
    ).submit()

@abimethod
def asset_revoke(
    self, asset: Asset, account_to_be_revoked: Account, amount: UInt64
) -> None:
    # Revoke (clawback) assets from an account
    itxn.AssetTransfer(
        asset_receiver=Global.current_application_address,
        xfer_asset=asset,
        asset_sender=account_to_be_revoked,
        asset_amount=amount,
        fee=0,
    ).submit()

@abimethod
def asset_config(self, asset: Asset) -> None:
    # Reconfigure asset parameters
    itxn.AssetConfig(
        config_asset=asset,
        manager=Global.current_application_address,
        reserve=Global.current_application_address,
        freeze=Txn.sender,
        clawback=Txn.sender,
        fee=0,
    ).submit()

@abimethod
def asset_delete(self, asset: Asset) -> None:
    # Delete an asset
    itxn.AssetConfig(
        config_asset=asset,
        fee=0,
    ).submit()
```

## Application Operations

### Grouped Inner Transactions

```python
@abimethod
def multi_inner_txns(self, app_id: Application) -> tuple[UInt64, arc4.String]:
    # Create payment transaction
    payment_params = itxn.Payment(amount=5000, receiver=Txn.sender, fee=0)

    # Create application call transaction
    app_call_params = itxn.ApplicationCall(
        app_id=app_id,
        app_args=(arc4.arc4_signature("hello(string)string"), arc4.String("World")),
        fee=0,
    )

    # Submit both transactions atomically
    pay_txn, app_call_txn = itxn.submit_txns(payment_params, app_call_params)

    # Process results
    hello_world_result = arc4.String.from_log(app_call_txn.last_log)
    return pay_txn.amount, hello_world_result
```

### Deploying Applications

```python
@abimethod
def deploy_app(self) -> UInt64:
    # Compile and deploy a contract
    compiled_contract = compile_contract(HelloWorld)

    app_txn = itxn.ApplicationCall(
        approval_program=compiled_contract.approval_program,
        clear_state_program=compiled_contract.clear_state_program,
        fee=0,
    ).submit()
    
    return app_txn.created_app.id

@abimethod
def arc4_deploy_app(self) -> UInt64:
    # Deploy using ARC4
    app_txn = arc4.arc4_create(HelloWorld)
    return app_txn.created_app.id
```

### Application Calls

```python
@abimethod
def noop_app_call(self, app_id: Application) -> tuple[arc4.String, String]:
    # Method 1: Manual ABI encoding
    call_txn = itxn.ApplicationCall(
        app_id=app_id,
        app_args=(arc4.arc4_signature("hello(string)string"), arc4.String("World")),
    ).submit()
    first_result = arc4.String.from_log(call_txn.last_log)

    # Method 2: Automatic ARC4 encoding
    second_result, call_txn = arc4.abi_call(
        HelloWorld.hello,  # method signature
        "again",          # arguments
        app_id=app_id,
    )

    return first_result, second_result
```

## Best Practices

1. **Transaction Management**:
   - Use appropriate fee settings
   - Handle transaction failures gracefully
   - Group related transactions when needed
   - Verify transaction results

2. **Asset Operations**:
   - Verify asset configuration before operations
   - Handle opt-in requirements
   - Manage asset permissions carefully
   - Validate asset amounts and balances

3. **Application Deployment**:
   - Use appropriate deployment method
   - Verify contract compilation
   - Handle deployment failures
   - Test deployed applications

4. **Security**:
   - Validate transaction parameters
   - Check permissions and authorizations
   - Handle edge cases and errors
   - Implement proper access controls

5. **Performance**:
   - Minimize number of inner transactions
   - Group transactions when possible
   - Consider fee implications
   - Optimize transaction parameters

6. **Error Handling**:
   - Check transaction success
   - Handle failed transactions
   - Provide meaningful error messages
   - Implement proper rollback mechanisms

This guide demonstrates the various capabilities of inner transactions in Algorand smart contracts using Python. Understanding these concepts is crucial for developing complex smart contract interactions.
