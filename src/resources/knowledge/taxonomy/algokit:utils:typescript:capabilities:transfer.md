# Algo transfers (payments)

Algo transfers, or [payments](https://developer.algorand.org/docs/get-details/transactions/#payment-transaction), is a higher-order use case capability provided by AlgoKit Utils that builds on top of the core capabilities, particularly [Algo amount handling](./amount.md) and [Transaction management](./transaction.md). It allows you to easily initiate Algo transfers between accounts, including dispenser management and idempotent account funding.

To see some usage examples check out the [automated tests](../../src/types/algorand-client.transfer.spec.ts).

## `payment`

The key function to facilitate Algo transfers is `algorand.send.payment(params)` (immediately send a single payment transaction), `algorand.createTransaction.payment(params)` (construct a payment transaction), or `algorand.newGroup().addPayment(params)` (add payment to a group of transactions) per [`AlgorandClient`](./algorand-client.md) [transaction semantics](./algorand-client.md#creating-and-issuing-transactions).

The base type for specifying a payment transaction is [`PaymentParams`](../code/modules/types_composer.md#paymentparams), which has the following parameters in addition to the [common transaction parameters](./algorand-client.md#transaction-parameters):

- `receiver: string` - The address of the account that will receive the Algo
- `amount: AlgoAmount` - The amount of Algo to send
- `closeRemainderTo?: string` - If given, close the sender account and send the remaining balance to this address (**warning:** use this carefully as it can result in loss of funds if used incorrectly)

```typescript
// Minimal example
const result = await algorand.send.payment({
  sender: 'SENDERADDRESS',
  receiver: 'RECEIVERADDRESS',
  amount: (4).algo(),
})

// Advanced example
const result2 = await algorand.send.payment({
  sender: 'SENDERADDRESS',
  receiver: 'RECEIVERADDRESS',
  amount: (4).algo(),
  closeRemainderTo: 'CLOSEREMAINDERTOADDRESS',
  lease: 'lease',
  note: 'note',
  // Use this with caution, it's generally better to use algorand.account.rekeyAccount
  rekeyTo: 'REKEYTOADDRESS',
  // You wouldn't normally set this field
  firstValidRound: 1000n,
  validityWindow: 10,
  extraFee: (1000).microAlgo(),
  staticFee: (1000).microAlgo(),
  // Max fee doesn't make sense with extraFee AND staticFee
  //  already specified, but here for completeness
  maxFee: (3000).microAlgo(),
  // Signer only needed if you want to provide one,
  //  generally you'd register it with AlgorandClient
  //  against the sender and not need to pass it in
  signer: transactionSigner,
  maxRoundsToWaitForConfirmation: 5,
  suppressLog: true,
})
```

## `ensureFunded`

The `ensureFunded` function automatically funds an account to maintain a minimum amount of [disposable Algo](https://developer.algorand.org/docs/get-details/accounts/#minimum-balance). This is particularly useful for automation and deployment scripts that get run multiple times and consume Algo when run.

There are 3 variants of this function:

- [`algorand.account.ensureFunded(accountToFund, dispenserAccount, minSpendingBalance, options?)`](../code/classes/types_account_manager.AccountManager.md#ensurefunded) - Funds a given account using a dispenser account as a funding source such that the given account has a certain amount of Algo free to spend (accounting for Algo locked in minimum balance requirement).
- [`algorand.account.ensureFundedFromEnvironment(accountToFund, minSpendingBalance, options?)`](../code/classes/types_account_manager.AccountManager.md#ensurefundedfromenvironment) - Funds a given account using a dispenser account retrieved from the environment, per the [`dispenserFromEnvironment`](#dispenser) method, as a funding source such that the given account has a certain amount of Algo free to spend (accounting for Algo locked in minimum balance requirement).
  - **Note:** requires a Node.js environment to execute.
  - The dispenser account is retrieved from the account mnemonic stored in `process.env.DISPENSER_MNEMONIC` and optionally `process.env.DISPENSER_SENDER`
    if it's a rekeyed account, or against default LocalNet if no environment variables present.
- [`algorand.account.ensureFundedFromTestNetDispenserApi(accountToFund, dispenserClient, minSpendingBalance, options)`](../code/classes/types_account_manager.AccountManager.md#ensurefundedfromtestnetdispenserapi) - Funds a given account using the [TestNet Dispenser API](https://github.com/algorandfoundation/algokit/blob/main/docs/testnet_api.md) as a funding source such that the account has a certain amount of Algo free to spend (accounting for Algo locked in minimum balance requirement).

The general structure of these calls is similar, they all take:

- `accountToFund: string | TransactionSignerAccount` - Address or signing account of the account to fund
- The source (dispenser):
  - In `ensureFunded`: `dispenserAccount: string | TransactionSignerAccount` - the address or signing account of the account to use as a dispenser
  - In `ensureFundedFromEnvironment`: Not specified, loaded automatically from the ephemeral environment
  - In `ensureFundedFromTestNetDispenserApi`: `dispenserClient: TestNetDispenserApiClient` - a client instance of the [TestNet dispenser API](./dispenser-client.md)
- `minSpendingBalance: AlgoAmount` - The minimum balance of Algo that the account should have available to spend (i.e., on top of the minimum balance requirement)
- An `options` object, which has:
  - [Common transaction parameters](./algorand-client.md#transaction-parameters) (not for TestNet Dispenser API)
  - [Execution parameters](./algorand-client.md#sending-a-single-transaction) (not for TestNet Dispenser API)
  - `minFundingIncrement?: AlgoAmount` - When issuing a funding amount, the minimum amount to transfer; this avoids many small transfers if this function gets called often on an active account

### Examples

```typescript
// From account

// Basic example
await algorand.account.ensureFunded('ACCOUNTADDRESS', 'DISPENSERADDRESS', (1).algo())
// With configuration
await algorand.account.ensureFunded('ACCOUNTADDRESS', 'DISPENSERADDRESS', (1).algo(), {
  minFundingIncrement: (2).algo(),
  fee: (1000).microAlgo(),
  suppressLog: true,
})

// From environment

// Basic example
await algorand.account.ensureFundedFromEnvironment('ACCOUNTADDRESS', (1).algo())
// With configuration
await algorand.account.ensureFundedFromEnvironment('ACCOUNTADDRESS', (1).algo(), {
  minFundingIncrement: (2).algo(),
  fee: (1000).microAlgo(),
  suppressLog: true,
})

// TestNet Dispenser API

// Basic example
await algorand.account.ensureFundedUsingDispenserAPI('ACCOUNTADDRESS', algorand.client.getTestNetDispenserFromEnvironment(), (1).algo())
// With configuration
await algorand.account.ensureFundedUsingDispenserAPI('ACCOUNTADDRESS', algorand.client.getTestNetDispenserFromEnvironment(), (1).algo(), {
  minFundingIncrement: (2).algo(),
})
```

All 3 variants return an [`EnsureFundedReturnType`](../code/modules/types_account_manager.md#) (and the first two also return a [single transaction result](./algorand-client.md#sending-a-single-transaction)) if a funding transaction was needed, or `undefined` if no transaction was required:

- `amountFunded: AlgoAmount` - The number of Algo that was paid
- `transactionId: string` - The ID of the transaction that funded the account

If you are using the TestNet Dispenser API then the `transactionId` is useful if you want to use the [refund functionality](./dispenser-client.md#registering-a-refund).

## Dispenser

If you want to programmatically send funds to an account so it can transact then you will often need a "dispenser" account that has a store of Algo that can be sent and a private key available for that dispenser account.

There's a number of ways to get a dispensing account in AlgoKit Utils:

- Get a dispenser via [account manager](./account.md#dispenser) - either automatically from [LocalNet](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/localnet.md) or from the environment
- By programmatically creating one of the many account types via [account manager](./account.md#accounts)
- By programmatically interacting with [KMD](./account.md#kmd-account-management) if running against LocalNet
- By using the [AlgoKit TestNet Dispenser API client](./dispenser-client.md) which can be used to fund accounts on TestNet via a dedicated API service
