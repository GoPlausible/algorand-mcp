# Algorand Standard Assets (ASA) in Python

This guide demonstrates how to work with Algorand Standard Assets (ASAs) using Python, including creation, management, transfer, and deletion operations.

## Creating Assets

### Creating a Fungible Token

```python
from algokit_utils import AssetCreateParams

# Create fungible token with 10 million units
txn_result = algorand_client.send.asset_create(
    AssetCreateParams(
        sender=account_a.address,
        total=10_000_000,
        decimals=6,
        default_frozen=False,  # optional
        manager=account_a.address,  # optional
        reserve=account_a.address,  # optional
        freeze=account_a.address,  # optional
        clawback=account_a.address,  # optional
        unit_name="MYA",
        asset_name="My Asset",
    )
)
```

### Creating an NFT

```python
# Create a 1/1 NFT
txn_result = algorand_client.send.asset_create(
    AssetCreateParams(
        sender=account_a.address,
        total=1,
        asset_name="My NFT",
        unit_name="MNFT",
        decimals=0,
        url="metadata URL",
        metadata_hash=b"Hash of the metadata URL",
    )
)
```

## Asset Transfers

### Basic Transfer

```python
from algokit_utils import AssetTransferParams

# Transfer 1 unit of asset
txn_result = algorand_client.send.asset_transfer(
    AssetTransferParams(
        sender=account_a.address,
        asset_id=1234,
        receiver=account_b.address,
        amount=1,
    )
)
```

## Asset Participation

### Opt-In

```python
from algokit_utils import AssetOptInParams

# Opt-in to an asset
txn_result = algorand_client.send.asset_opt_in(
    AssetOptInParams(
        sender=account_a.address,
        asset_id=1234,
    )
)
```

### Opt-Out

```python
from algokit_utils import AssetOptOutParams

# Opt-out of an asset
txn_result = algorand_client.send.asset_opt_out(
    params=AssetOptOutParams(
        sender=account_a.address,
        asset_id=1234,
        creator=account_b.address,
    ),
    ensure_zero_balance=True,  # Verify zero balance before opt-out
)
```

## Asset Management

### Freezing Assets

```python
from algokit_utils import AssetFreezeParams

# Freeze assets
txn_result = algorand_client.send.asset_freeze(
    AssetFreezeParams(
        sender=account_a.address,
        asset_id=1234,
        account=account_b.address,  # Account to freeze
        frozen=True,
    )
)

# Unfreeze assets
txn_result = algorand_client.send.asset_freeze(
    AssetFreezeParams(
        sender=account_a.address,
        asset_id=1234,
        account=account_b.address,
        frozen=False,
    )
)
```

### Clawback

```python
# Clawback assets from an account
txn_result = algorand_client.send.asset_transfer(
    AssetTransferParams(
        sender=manager.address,
        asset_id=1234,
        amount=1,
        receiver=manager.address,
        clawback_target=account_to_be_clawbacked.address,
    )
)
```

### Updating Asset Configuration

```python
from algokit_utils import AssetConfigParams

# Update asset configuration
txn_result = algorand_client.send.asset_config(
    AssetConfigParams(
        sender=account_a.address,
        asset_id=1234,
        manager=account_b.address,
        reserve=account_b.address,
        freeze=account_b.address,
        clawback=account_b.address,
    )
)
```

### Destroying Assets

```python
from algokit_utils import AssetDestroyParams

# Destroy an asset
txn_result = algorand_client.send.asset_destroy(
    AssetDestroyParams(
        sender=account_a.address,
        asset_id=1234,
    )
)
```

## Best Practices

1. **Asset Creation**:
   - Choose appropriate decimals for fungible tokens
   - Set meaningful unit names and asset names
   - Consider immutability requirements
   - Document metadata URLs and hashes

2. **Asset Transfer**:
   - Verify opt-in status before transfers
   - Handle transfer failures gracefully
   - Consider minimum balance requirements
   - Track transfer status

3. **Asset Management**:
   - Carefully assign management roles
   - Document role assignments
   - Implement proper access controls
   - Monitor asset operations

4. **Freezing and Clawback**:
   - Use freeze capability judiciously
   - Document freeze/clawback policies
   - Implement proper authorization
   - Monitor frozen accounts

5. **Configuration Updates**:
   - Plan configuration changes carefully
   - Document configuration history
   - Verify manager authorization
   - Test configuration changes

6. **Asset Deletion**:
   - Verify creator ownership
   - Ensure zero circulation
   - Document deletion reasons
   - Handle deletion failures

## Security Considerations

1. **Access Control**:
   - Verify transaction sender authorization
   - Implement role-based controls
   - Protect management keys
   - Monitor suspicious activity

2. **Asset Parameters**:
   - Choose parameters carefully
   - Consider immutability implications
   - Document parameter decisions
   - Test parameter effects

3. **Operational Security**:
   - Implement proper error handling
   - Log important operations
   - Monitor asset activities
   - Regular security audits

4. **User Protection**:
   - Clear documentation
   - Proper error messages
   - User notifications
   - Recovery procedures

This guide demonstrates the various operations available for Algorand Standard Assets using Python. Understanding these operations is crucial for developing applications that work with ASAs effectively and securely.
