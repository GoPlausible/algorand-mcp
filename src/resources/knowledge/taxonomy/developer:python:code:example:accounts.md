# Algorand Account Management with Python

This guide covers various aspects of account management in Algorand using Python, including creating accounts, funding them, managing keys and signatures, working with multisignature accounts, and account rekeying.

## Creating Accounts

There are several ways to create or access Algorand accounts:

```python
from algokit_utils import AlgorandClient

# Initialize client for LocalNet
algorand_client = AlgorandClient.default_localnet()

# Create a random account
random_account = algorand_client.account.random()

# Get or create an account from KMD
kmd_account = algorand_client.account.from_kmd(name="ACCOUNT_NAME")

# Get or create an account from environment variables
env_account = algorand_client.account.from_environment(
    name="MY_ACCOUNT",
    fund_with=AlgoAmount(algo=10)
)

# Create an account from mnemonic
mnemonic_account = algorand_client.account.from_mnemonic(mnemonic="MNEMONIC_PHRASE")
```

### KMD Wallet Operations

```python
# Create a new wallet
algorand_client.client.kmd.create_wallet(name="ACCOUNT_NAME", pswd="password")

# Rename a wallet
algorand_client.client.kmd.rename_wallet(
    id="WALLET_ID",
    password="new_password",
    new_name="NEW_ACCOUNT_NAME"
)
```

## Funding Accounts

### LocalNet Funding

```python
# Get LocalNet dispenser account
localnet_dispenser = algorand_client.account.localnet_dispenser()

# Get dispenser account from environment
dispenser = algorand_client.account.dispenser_from_environment()

# Send payment from dispenser
algorand_client.send.payment(
    PaymentParams(
        sender=localnet_dispenser.address,
        receiver=random_account.address,
        amount=AlgoAmount(algo=10)
    )
)

# Ensure account has minimum balance
algorand_client.account.ensure_funded(
    account_to_fund=random_account.address,
    dispenser_account=localnet_dispenser.address,
    min_spending_balance=AlgoAmount(algo=10)
)
```

### TestNet Funding

```python
# Get TestNet dispenser
testnet_dispenser = algorand_client.client.get_testnet_dispenser()

# Fund using TestNet dispenser API
algorand_client.account.ensure_funded_from_testnet_dispenser_api(
    account_to_fund=random_account.address,
    dispenser_client=testnet_dispenser,
    min_spending_balance=AlgoAmount(algo=10)
)

# Direct funding using TestNet dispenser
testnet_dispenser.fund(address=random_account.address, amount=10, asset_id=0)
```

## Keys and Signing

### Managing Transaction Signers

```python
# Set default signer
algorand_client.account.set_default_signer(account_a.signer)

# Register multiple signers
algorand_client.account.set_signer_from_account(account_a)
algorand_client.account.set_signer_from_account(account_b)
algorand_client.account.set_signer_from_account(account_c)

# Get signer for an address
signer = algorand_client.account.get_signer(account_a.address)
```

### Manual Transaction Signing

```python
# Create unsigned transaction
payment_txn = algorand_client.create_transaction.payment(
    PaymentParams(
        sender=account_a.address,
        receiver=account_b.address,
        amount=AlgoAmount(algo=1),
        note=b"Payment from A to B"
    )
)

# Send with custom signer
algorand_client.new_group().add_transaction(
    transaction=payment_txn,
    signer=account_a_signer
).send()
```

## Multisignature Accounts

Create and use multisig accounts that require multiple signatures:

```python
# Create 2-of-3 multisig account
multisig_account = algorand_client.account.multisig(
    metadata=MultisigMetadata(
        version=1,
        threshold=2,
        addresses=[
            account_a.address,
            account_b.address,
            account_c.address
        ]
    ),
    signing_accounts=[account_a, account_b, account_c]
)

# Send from multisig account
algorand_client.send.payment(
    PaymentParams(
        sender=multisig_account.address,
        receiver=account_a.address,
        amount=AlgoAmount(algo=1)
    )
)
```

## Account Rekeying

Rekey an account to use a different address for signing:

```python
# Rekey account_a to be controlled by account_b's private key
algorand_client.account.rekey_account(
    account=account_a.address,
    rekey_to=account_b
)

# Send transaction using new signing key
payment_txn = algorand_client.create_transaction.payment(
    PaymentParams(
        sender=account_a.address,
        receiver=account_b.address,
        amount=AlgoAmount(algo=1),
        signer=account_b.signer
    )
)

algorand_client.new_group().add_transaction(
    transaction=payment_txn,
    signer=account_b.signer
).send()
```

## Best Practices

1. **Account Creation**:
   - Use environment variables for sensitive information
   - Store mnemonics securely
   - Use KMD for development and testing

2. **Account Funding**:
   - Always ensure accounts have sufficient minimum balance
   - Use appropriate funding methods for different networks (LocalNet, TestNet)
   - Handle funding errors gracefully

3. **Transaction Signing**:
   - Set up default signers for convenience
   - Use explicit signers for critical operations
   - Verify transaction parameters before signing

4. **Multisig Accounts**:
   - Choose appropriate threshold values
   - Keep track of all signing accounts
   - Test multisig operations thoroughly

5. **Account Rekeying**:
   - Document rekeying operations
   - Maintain secure backup of original keys
   - Verify rekeying success before proceeding

6. **Security**:
   - Never expose private keys or mnemonics
   - Use secure methods for key storage
   - Implement proper access controls

This guide provides a comprehensive overview of account management in Algorand using Python. The examples demonstrate the flexibility and security features available through the Algorand Python SDK and AlgoKit utilities.
