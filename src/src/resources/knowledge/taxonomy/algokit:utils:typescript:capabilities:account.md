# Account management

Account management is one of the core capabilities provided by AlgoKit Utils. It allows you to create mnemonic, rekeyed, multisig, transaction signer, idempotent KMD and environment variable injected accounts that can be used to sign transactions as well as representing a sender address at the same time. This significantly simplifies management of transaction signing.

## `AccountManager`

The [`AccountManager`](../code/classes/types_account_manager.AccountManager.md) is a class that is used to get, create, and fund accounts and perform account-related actions such as funding. The `AccountManager` also keeps track of signers for each address so when using the [`TransactionComposer`](./transaction-composer.md) to send transactions, a signer function does not need to manually be specified for each transaction - instead it can be inferred from the sender address automatically!

To get an instance of `AccountManager`, you can use either [`AlgorandClient`](./algorand-client.md) via `algorand.account` or instantiate it directly:

```typescript
import { AccountManager } from '@algorandfoundation/algokit-utils/types/account-manager'

const accountManager = new AccountManager(clientManager)
```

## `TransactionSignerAccount`

The core internal type that holds information about a signer/sender pair for a transaction is [`TransactionSignerAccount`](../code/interfaces/types_account.TransactionSignerAccount.md), which represents an `algosdk.TransactionSigner` (`signer`) along with a sender address (`addr`) as the encoded string address.

Many methods in `AccountManager` expose a `TransactionSignerAccount`. `TransactionSignerAccount` can be used with `AtomicTransactionComposer`, [`TransactionComposer`](./transaction-composer.md) and [useWallet](https://github.com/TxnLab/use-wallet).

## Registering a signer

The `AccountManager` keeps track of which signer is associated with a given sender address. This is used by [`AlgorandClient`](./algorand-client.md) to automatically sign transactions by that sender. Any of the [methods](#accounts) within `AccountManager` that return an account will automatically register the signer with the sender. If however, you are creating a signer external to the `AccountManager`, for instance when using the use-wallet library in a dApp, then you need to register the signer with the `AccountManager` if you want it to be able to automatically sign transactions from that sender.

There are two methods that can be used for this, `setSignerFromAccount`, which takes any number of [account based objects](#underlying-account-classes) that combine signer and sender (`TransactionSignerAccount` | `algosdk.Account` | `algosdk.LogicSigAccount` | `SigningAccount` | `MultisigAccount`), or `setSigner` which takes the sender address and the `TransactionSigner`:

```typescript
algorand.account
  .setSignerFromAccount(algosdk.generateAccount())
  .setSignerFromAccount(new algosdk.LogicSigAccount(program, args))
  .setSignerFromAccount(new SigningAccount(mnemonic, sender))
  .setSignerFromAccount(new MultisigAccount({ version: 1, threshold: 1, addrs: ['ADDRESS1...', 'ADDRESS2...'] }, [account1, account2]))
  .setSignerFromAccount({ addr: 'SENDERADDRESS', signer: transactionSigner })
  .setSigner('SENDERADDRESS', transactionSigner)
```

## Default signer

If you want to have a default signer that is used to sign transactions without a registered signer (rather than throwing an exception) then you can [register a default signer](../code/classes/types_account_manager.AccountManager.md#setdefaultsigner):

```typescript
algorand.account.setDefaultSigner(myDefaultSigner)
```

## Get a signer

[`AlgorandClient`](./algorand-client.md) will automatically retrieve a signer when signing a transaction, but if you need to get a `TransactionSigner` externally to do something more custom then you can [retrieve the signer](../code/classes//types_account_manager.AccountManager.md#getsigner) for a given sender address:

```typescript
const signer = algorand.account.getSigner('SENDER_ADDRESS')
```

If there is no signer registered for that sender address it will either return the default signer ([if registered](#default-signer)) or throw an exception.

## Accounts

In order to get/register accounts for signing operations you can use the following methods on [`AccountManager`](#accountmanager) (expressed here as `algorand.account` to denote the syntax via an [`AlgorandClient`](./algorand-client.md)):

- [`algorand.account.fromEnvironment(name, fundWith)`](../code/classes/types_account_manager.AccountManager.md#fromenvironment) - Registers and returns an account with private key loaded by convention based on the given name identifier - either by idempotently creating the account in KMD or from environment variable via `process.env['{NAME}_MNEMONIC']` and (optionally) `process.env['{NAME}_SENDER']` (if account is rekeyed)
  - This allows you to have powerful code that will automatically create and fund an account by name locally and when deployed against TestNet/MainNet will automatically resolve from environment variables, without having to have different code
  - Note: `fundWith` allows you to control how many Algo are seeded into an account created in KMD
- [`algorand.account.fromMnemonic(mnemonicSecret, sender?)`](../code/classes/types_account_manager.AccountManager.md#frommnemonic) - Registers and returns an account with secret key loaded by taking the mnemonic secret
- [`algorand.account.multisig(multisigParams, signingAccounts)`](../code/classes/types_account_manager.AccountManager.md#multisig) - Registers and returns a multisig account with one or more signing keys loaded
- [`algorand.account.rekeyed(sender, signer)`](../code/classes/types_account_manager.AccountManager.md#rekeyed) - Registers and returns an account representing the given rekeyed sender/signer combination
- [`algorand.account.random()`](../code/classes/types_account_manager.AccountManager.md#random) - Returns a new, cryptographically randomly generated account with private key loaded
- [`algorand.account.fromKmd()`](../code/classes/types_account_manager.AccountManager.md#fromkmd) - Returns an account with private key loaded from the given KMD wallet (identified by name)
- [`algorand.account.logicsig(program, args?)`](../code/classes/types_account_manager.AccountManager.md#logicsig) - Returns an account that represents a logic signature

### Underlying account classes

While `TransactionSignerAccount` is the main class used to represent an account that can sign, there are underlying account classes that can underpin the signer within the transaction signer account.

- `Account` - An in-built `algosdk.Account` object that has an address and private signing key, this can be created
- [`SigningAccount`](../code/classes/types_account.SigningAccount.md) - An abstraction around `algosdk.Account` that supports rekeyed accounts
- `LogicSigAccount` - An in-built algosdk `algosdk.LogicSigAccount` object
- [`MultisigAccount`](../code/classes/types_account.MultisigAccount.md) - An abstraction around `algosdk.MultisigMetadata`, `algosdk.makeMultiSigAccountTransactionSigner`, `algosdk.multisigAddress`, `algosdk.signMultisigTransaction` and `algosdk.appendSignMultisigTransaction` that supports multisig accounts with one or more signers present

### Dispenser

- [`algorand.account.dispenserFromEnvironment()`](../code/classes/types_account_manager.AccountManager.md#dispenserfromenvironment) - Returns an account (with private key loaded) that can act as a dispenser from environment variables, or against default LocalNet if no environment variables present
- [`algorand.account.localNetDispenser()`](../code/classes/types_account_manager.AccountManager.md#localnetdispenser) - Returns an account with private key loaded that can act as a dispenser for the default LocalNet dispenser account

## Rekey account

One of the unique features of Algorand is the ability to change the private key that can authorise transactions for an account. This is called [rekeying](https://developer.algorand.org/docs/get-details/accounts/rekey/).

> [!WARNING]
> Rekeying should be done with caution as a rekey transaction can result in permanent loss of control of an account.

You can issue a transaction to rekey an account by using the [`algorand.account.rekeyAccount(account, rekeyTo, options)`](../code/classes/types_account_manager.AccountManager.md#rekeyaccount) function:

- `account: string | TransactionSignerAccount` - The account address or signing account of the account that will be rekeyed
- `rekeyTo: string | TransactionSignerAccount` - The account address or signing account of the account that will be used to authorise transactions for the rekeyed account going forward. If a signing account is provided that will now be tracked as the signer for `account` in the `AccountManager` instance.
- An `options` object, which has:
  - [Common transaction parameters](./algorand-client.md#transaction-parameters)
  - [Execution parameters](./algorand-client.md#sending-a-single-transaction)

You can also pass in `rekeyTo` as a [common transaction parameter](./algorand-client.md#transaction-parameters) to any transaction.

### Examples

```typescript
// Basic example (with string addresses)

await algorand.account.rekeyAccount({ account: 'ACCOUNTADDRESS', rekeyTo: 'NEWADDRESS' })

// Basic example (with signer accounts)

await algorand.account.rekeyAccount({ account: account1, rekeyTo: newSignerAccount })

// Advanced example

await algorand.account.rekeyAccount({
  account: 'ACCOUNTADDRESS',
  rekeyTo: 'NEWADDRESS',
  lease: 'lease',
  note: 'note',
  firstValidRound: 1000n,
  validityWindow: 10,
  extraFee: (1000).microAlgo(),
  staticFee: (1000).microAlgo(),
  // Max fee doesn't make sense with extraFee AND staticFee
  //  already specified, but here for completeness
  maxFee: (3000).microAlgo(),
  maxRoundsToWaitForConfirmation: 5,
  suppressLog: true,
})

// Using a rekeyed account

// Note: if a signing account is passed into `algorand.account.rekeyAccount` then you don't need to call `rekeyedAccount` to register the new signer
const rekeyedAccount = algorand.account.rekeyed(account, newAccount)
// rekeyedAccount can be used to sign transactions on behalf of account...
```

# KMD account management

When running LocalNet, you have an instance of the [Key Management Daemon](https://github.com/algorand/go-algorand/blob/master/daemon/kmd/README.md), which is useful for:

- Accessing the private key of the default accounts that are pre-seeded with Algo so that other accounts can be funded and it's possible to use LocalNet
- Idempotently creating new accounts against a name that will stay intact while the LocalNet instance is running without you needing to store private keys anywhere (i.e. completely automated)

The KMD SDK is fairly low level so to make use of it there is a fair bit of boilerplate code that's needed. This code has been abstracted away into the `KmdAccountManager` class.

To get an instance of the `KmdAccountManager` class you can access it from [`AlgorandClient`](./algorand-client.md) via `algorand.account.kmd` or instantiate it directly (passing in a [`ClientManager`](./client.md)):

```typescript
import { KmdAccountManager } from '@algorandfoundation/algokit-utils/types/kmd-account-manager'

// Algod client only
const kmdAccountManager = new KmdAccountManager(clientManager)
```

The methods that are available are:

- [`getWalletAccount(walletName, predicate?, sender?)](../code/classes/types_kmd_account_manager.KmdAccountManager.md#getwalletaccount)` - Returns an Algorand signing account with private key loaded from the given KMD wallet (identified by name).
- [`getOrCreateWalletAccount(name, fundWith?)](../code/classes/types_kmd_account_manager.KmdAccountManager.md#getorcreatewalletaccount)` - Gets an account with private key loaded from a KMD wallet of the given name, or alternatively creates one with funds in it via a KMD wallet of the given name.
- [`getLocalNetDispenserAccount()](../code/classes/types_kmd_account_manager.KmdAccountManager.md#getlocalnetdispenseraccount)` - Returns an Algorand account with private key loaded for the default LocalNet dispenser account (that can be used to fund other accounts)

```typescript
// Get a wallet account that seeded the LocalNet network
const defaultDispenserAccount = await kmdAccountManager.getWalletAccount(
  'unencrypted-default-wallet',
  (a) => a.status !== 'Offline' && a.amount > 1_000_000_000,
)
// Same as above, but dedicated method call for convenience
const localNetDispenserAccount = await kmdAccountManager.getLocalNetDispenserAccount()
// Idempotently get (if exists) or create (if it doesn't exist yet) an account by name using KMD
// if creating it then fund it with 2 ALGO from the default dispenser account
const newAccount = await kmdAccountManager.getOrCreateWalletAccount('account1', (2).algo())
// This will return the same account as above since the name matches
const existingAccount = await kmdAccountManager.getOrCreateWalletAccount('account1')
```

Some of this functionality is directly exposed from [`AccountManager`](#accountmanager), which has the added benefit of registering the account as a signer so they can be automatically used to sign transactions when using via [`AlgorandClient`](./algorand-client.md):

```typescript
// Get and register LocalNet dispenser
const localNetDispenser = await algorand.account.localNetDispenser()
// Get and register a dispenser by environment variable, or if not set then LocalNet dispenser via KMD
const dispenser = await algorand.account.dispenserFromEnvironment()
// Get / create and register account from KMD idempotently by name
const account1 = await algorand.account.fromKmd('account1', (2).algo())
```
