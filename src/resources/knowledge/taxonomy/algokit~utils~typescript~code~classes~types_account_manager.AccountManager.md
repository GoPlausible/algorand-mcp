[@algorandfoundation/algokit-utils](../README.md) / [types/account-manager](../modules/types_account_manager.md) / AccountManager

# Class: AccountManager

[types/account-manager](../modules/types_account_manager.md).AccountManager

Creates and keeps track of signing accounts that can sign transactions for a sending address.

## Table of contents

### Constructors

- [constructor](types_account_manager.AccountManager.md#constructor)

### Properties

- [\_accounts](types_account_manager.AccountManager.md#_accounts)
- [\_clientManager](types_account_manager.AccountManager.md#_clientmanager)
- [\_defaultSigner](types_account_manager.AccountManager.md#_defaultsigner)
- [\_kmdAccountManager](types_account_manager.AccountManager.md#_kmdaccountmanager)

### Accessors

- [kmd](types_account_manager.AccountManager.md#kmd)

### Methods

- [\_getComposer](types_account_manager.AccountManager.md#_getcomposer)
- [\_getEnsureFundedAmount](types_account_manager.AccountManager.md#_getensurefundedamount)
- [dispenserFromEnvironment](types_account_manager.AccountManager.md#dispenserfromenvironment)
- [ensureFunded](types_account_manager.AccountManager.md#ensurefunded)
- [ensureFundedFromEnvironment](types_account_manager.AccountManager.md#ensurefundedfromenvironment)
- [ensureFundedFromTestNetDispenserApi](types_account_manager.AccountManager.md#ensurefundedfromtestnetdispenserapi)
- [fromEnvironment](types_account_manager.AccountManager.md#fromenvironment)
- [fromKmd](types_account_manager.AccountManager.md#fromkmd)
- [fromMnemonic](types_account_manager.AccountManager.md#frommnemonic)
- [getAccount](types_account_manager.AccountManager.md#getaccount)
- [getInformation](types_account_manager.AccountManager.md#getinformation)
- [getSigner](types_account_manager.AccountManager.md#getsigner)
- [localNetDispenser](types_account_manager.AccountManager.md#localnetdispenser)
- [logicsig](types_account_manager.AccountManager.md#logicsig)
- [multisig](types_account_manager.AccountManager.md#multisig)
- [random](types_account_manager.AccountManager.md#random)
- [rekeyAccount](types_account_manager.AccountManager.md#rekeyaccount)
- [rekeyed](types_account_manager.AccountManager.md#rekeyed)
- [setDefaultSigner](types_account_manager.AccountManager.md#setdefaultsigner)
- [setSigner](types_account_manager.AccountManager.md#setsigner)
- [setSignerFromAccount](types_account_manager.AccountManager.md#setsignerfromaccount)
- [setSigners](types_account_manager.AccountManager.md#setsigners)
- [signerAccount](types_account_manager.AccountManager.md#signeraccount)

## Constructors

### constructor

• **new AccountManager**(`clientManager`): [`AccountManager`](types_account_manager.AccountManager.md)

Create a new account manager.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientManager` | [`ClientManager`](types_client_manager.ClientManager.md) | The ClientManager client to use for algod and kmd clients |

#### Returns

[`AccountManager`](types_account_manager.AccountManager.md)

**`Example`**

```typescript
const accountManager = new AccountManager(clientManager)
```

#### Defined in

[src/types/account-manager.ts:56](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L56)

## Properties

### \_accounts

• `Private` **\_accounts**: `Object` = `{}`

#### Index signature

▪ [address: `string`]: [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md)

#### Defined in

[src/types/account-manager.ts:45](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L45)

___

### \_clientManager

• `Private` **\_clientManager**: [`ClientManager`](types_client_manager.ClientManager.md)

#### Defined in

[src/types/account-manager.ts:43](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L43)

___

### \_defaultSigner

• `Private` `Optional` **\_defaultSigner**: `TransactionSigner`

#### Defined in

[src/types/account-manager.ts:46](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L46)

___

### \_kmdAccountManager

• `Private` **\_kmdAccountManager**: [`KmdAccountManager`](types_kmd_account_manager.KmdAccountManager.md)

#### Defined in

[src/types/account-manager.ts:44](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L44)

## Accessors

### kmd

• `get` **kmd**(): [`KmdAccountManager`](types_kmd_account_manager.KmdAccountManager.md)

KMD account manager that allows you to easily get and create accounts using KMD.

#### Returns

[`KmdAccountManager`](types_kmd_account_manager.KmdAccountManager.md)

#### Defined in

[src/types/account-manager.ts:70](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L70)

## Methods

### \_getComposer

▸ **_getComposer**(`getSuggestedParams?`): [`TransactionComposer`](types_composer.TransactionComposer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `getSuggestedParams?` | () => `Promise`\<`SuggestedParams`\> |

#### Returns

[`TransactionComposer`](types_composer.TransactionComposer.md)

#### Defined in

[src/types/account-manager.ts:61](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L61)

___

### \_getEnsureFundedAmount

▸ **_getEnsureFundedAmount**(`sender`, `minSpendingBalance`, `minFundingIncrement?`): `Promise`\<`undefined` \| [`AlgoAmount`](types_amount.AlgoAmount.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sender` | `Address` |
| `minSpendingBalance` | [`AlgoAmount`](types_amount.AlgoAmount.md) |
| `minFundingIncrement?` | [`AlgoAmount`](types_amount.AlgoAmount.md) |

#### Returns

`Promise`\<`undefined` \| [`AlgoAmount`](types_amount.AlgoAmount.md)\>

#### Defined in

[src/types/account-manager.ts:513](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L513)

___

### dispenserFromEnvironment

▸ **dispenserFromEnvironment**(): `Promise`\<`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

Returns an account (with private key loaded) that can act as a dispenser from
environment variables, or against default LocalNet if no environment variables present.

Note: requires a Node.js environment to execute.

If present, it will load the account mnemonic stored in process.env.DISPENSER_MNEMONIC and optionally
process.env.DISPENSER_SENDER if it's a rekeyed account.

#### Returns

`Promise`\<`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

The account

**`Example`**

```typescript
const account = await account.dispenserFromEnvironment()
```

#### Defined in

[src/types/account-manager.ts:426](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L426)

___

### ensureFunded

▸ **ensureFunded**(`accountToFund`, `dispenserAccount`, `minSpendingBalance`, `options?`): `Promise`\<`undefined` \| \{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  } & [`EnsureFundedResult`](../interfaces/types_account_manager.EnsureFundedResult.md)\>

Funds a given account using a dispenser account as a funding source such that
the given account has a certain amount of Algo free to spend (accounting for
Algo locked in minimum balance requirement).

https://developer.algorand.org/docs/get-details/accounts/#minimum-balance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountToFund` | `string` \| `Address` | The account to fund |
| `dispenserAccount` | `string` \| `Address` | The account to use as a dispenser funding source |
| `minSpendingBalance` | [`AlgoAmount`](types_amount.AlgoAmount.md) | The minimum balance of Algo that the account should have available to spend (i.e. on top of minimum balance requirement) |
| `options?` | \{ `minFundingIncrement?`: [`AlgoAmount`](types_amount.AlgoAmount.md)  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) & `Omit`\<[`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams), ``"sender"``\> | Optional parameters to control the funding increment, transaction or execution of the transaction |

#### Returns

`Promise`\<`undefined` \| \{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  } & [`EnsureFundedResult`](../interfaces/types_account_manager.EnsureFundedResult.md)\>

- The result of executing the dispensing transaction and the `amountFunded` if funds were needed.
- `undefined` if no funds were needed.

**`Example`**

```typescript
// Basic example
await algorand.account.ensureFunded("ACCOUNTADDRESS", "DISPENSERADDRESS", algokit.algo(1))
// With configuration
await algorand.account.ensureFunded("ACCOUNTADDRESS", "DISPENSERADDRESS", algokit.algo(1),
 { minFundingIncrement: algokit.algo(2), fee: (1000).microAlgo(), suppressLog: true }
)
```

#### Defined in

[src/types/account-manager.ts:546](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L546)

___

### ensureFundedFromEnvironment

▸ **ensureFundedFromEnvironment**(`accountToFund`, `minSpendingBalance`, `options?`): `Promise`\<`undefined` \| \{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  } & [`EnsureFundedResult`](../interfaces/types_account_manager.EnsureFundedResult.md)\>

Funds a given account using a dispenser account retrieved from the environment,
per the `dispenserFromEnvironment` method, as a funding source such that
the given account has a certain amount of Algo free to spend (accounting for
Algo locked in minimum balance requirement).

**Note:** requires a Node.js environment to execute.

The dispenser account is retrieved from the account mnemonic stored in
process.env.DISPENSER_MNEMONIC and optionally process.env.DISPENSER_SENDER
if it's a rekeyed account, or against default LocalNet if no environment variables present.

https://developer.algorand.org/docs/get-details/accounts/#minimum-balance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountToFund` | `string` \| `Address` | The account to fund |
| `minSpendingBalance` | [`AlgoAmount`](types_amount.AlgoAmount.md) | The minimum balance of Algo that the account should have available to spend (i.e. on top of minimum balance requirement) |
| `options?` | \{ `minFundingIncrement?`: [`AlgoAmount`](types_amount.AlgoAmount.md)  } & [`SendParams`](../interfaces/types_transaction.SendParams.md) & `Omit`\<[`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams), ``"sender"``\> | Optional parameters to control the funding increment, transaction or execution of the transaction |

#### Returns

`Promise`\<`undefined` \| \{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  } & [`EnsureFundedResult`](../interfaces/types_account_manager.EnsureFundedResult.md)\>

- The result of executing the dispensing transaction and the `amountFunded` if funds were needed.
- `undefined` if no funds were needed.

**`Example`**

```typescript
// Basic example
await algorand.account.ensureFundedFromEnvironment("ACCOUNTADDRESS", algokit.algo(1))
// With configuration
await algorand.account.ensureFundedFromEnvironment("ACCOUNTADDRESS", algokit.algo(1),
 { minFundingIncrement: algokit.algo(2), fee: (1000).microAlgo(), suppressLog: true }
)
```

#### Defined in

[src/types/account-manager.ts:608](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L608)

___

### ensureFundedFromTestNetDispenserApi

▸ **ensureFundedFromTestNetDispenserApi**(`accountToFund`, `dispenserClient`, `minSpendingBalance`, `options?`): `Promise`\<`undefined` \| [`EnsureFundedResult`](../interfaces/types_account_manager.EnsureFundedResult.md)\>

Funds a given account using the TestNet Dispenser API as a funding source such that
the account has a certain amount of Algo free to spend (accounting for Algo locked
in minimum balance requirement).

https://developer.algorand.org/docs/get-details/accounts/#minimum-balance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `accountToFund` | `string` \| `Address` | The account to fund |
| `dispenserClient` | [`TestNetDispenserApiClient`](types_dispenser_client.TestNetDispenserApiClient.md) | The TestNet dispenser funding client |
| `minSpendingBalance` | [`AlgoAmount`](types_amount.AlgoAmount.md) | The minimum balance of Algo that the account should have available to spend (i.e. on top of minimum balance requirement) |
| `options?` | `Object` | Optional parameters to control the funding increment, transaction or execution of the transaction |
| `options.minFundingIncrement?` | [`AlgoAmount`](types_amount.AlgoAmount.md) | - |

#### Returns

`Promise`\<`undefined` \| [`EnsureFundedResult`](../interfaces/types_account_manager.EnsureFundedResult.md)\>

- The result of executing the dispensing transaction and the `amountFunded` if funds were needed.
- `undefined` if no funds were needed.

**`Example`**

```typescript
// Basic example
await algorand.account.ensureFundedUsingDispenserAPI("ACCOUNTADDRESS", algorand.client.getTestNetDispenserFromEnvironment(), algokit.algo(1))
// With configuration
await algorand.account.ensureFundedUsingDispenserAPI("ACCOUNTADDRESS", algorand.client.getTestNetDispenserFromEnvironment(), algokit.algo(1),
 { minFundingIncrement: algokit.algo(2) }
)
```

#### Defined in

[src/types/account-manager.ts:664](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L664)

___

### fromEnvironment

▸ **fromEnvironment**(`name`, `fundWith?`): `Promise`\<`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

Tracks and returns an Algorand account with private key loaded by convention from environment variables based on the given name identifier.

Note: This function expects to run in a Node.js environment.

## Convention:
* **Non-LocalNet:** will load process.env['{NAME}_MNEMONIC'] as a mnemonic secret; **Note: Be careful how the mnemonic is handled**,
 never commit it into source control and ideally load it via a secret storage service rather than the file system.
  If process.env['{NAME}_SENDER'] is defined then it will use that for the sender address (i.e. to support rekeyed accounts)
* **LocalNet:** will load the account from a KMD wallet called {NAME} and if that wallet doesn't exist it will create it and fund the account for you

This allows you to write code that will work seamlessly in production and local development (LocalNet) without manual config locally (including when you reset the LocalNet).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name identifier of the account |
| `fundWith?` | [`AlgoAmount`](types_amount.AlgoAmount.md) | The optional amount to fund the account with when it gets created (when targeting LocalNet), if not specified then 1000 ALGO will be funded from the dispenser account |

#### Returns

`Promise`\<`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

The account

**`Example`**

If you have a mnemonic secret loaded into `process.env.MY_ACCOUNT_MNEMONIC` then you can call the following to get that private key loaded into an account object:
```typescript
const account = await accountManager.fromEnvironment('MY_ACCOUNT')
```

If that code runs against LocalNet then a wallet called `MY_ACCOUNT` will automatically be created with an account that is automatically funded with 1000 (default) ALGO from the default LocalNet dispenser.
If not running against LocalNet then it will use proces.env.MY_ACCOUNT_MNEMONIC as the private key and (if present) process.env.MY_ACCOUNT_SENDER as the sender address.

#### Defined in

[src/types/account-manager.ts:319](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L319)

___

### fromKmd

▸ **fromKmd**(`name`, `predicate?`, `sender?`): `Promise`\<`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

Tracks and returns an Algorand account with private key loaded from the given KMD wallet (identified by name).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the wallet to retrieve an account from |
| `predicate?` | (`account`: `Record`\<`string`, `any`\>) => `boolean` | An optional filter to use to find the account (otherwise it will return a random account from the wallet) |
| `sender?` | `string` \| `Address` | The optional sender address to use this signer for (aka a rekeyed account) |

#### Returns

`Promise`\<`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

The account

**`Example`**

```typescript
const defaultDispenserAccount = await account.fromKmd('unencrypted-default-wallet',
  a => a.status !== 'Offline' && a.amount > 1_000_000_000
)
```

#### Defined in

[src/types/account-manager.ts:355](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L355)

___

### fromMnemonic

▸ **fromMnemonic**(`mnemonicSecret`, `sender?`): `Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }

Tracks and returns an Algorand account with secret key loaded (i.e. that can sign transactions) by taking the mnemonic secret.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonicSecret` | `string` | The mnemonic secret representing the private key of an account; **Note: Be careful how the mnemonic is handled**, never commit it into source control and ideally load it from the environment (ideally via a secret storage service) rather than the file system. |
| `sender?` | `string` \| `Address` | The optional sender address to use this signer for (aka a rekeyed account) |

#### Returns

`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }

The account

**`Example`**

```typescript
const account = accountManager.fromMnemonic("mnemonic secret ...")
const rekeyedAccount = accountManager.fromMnemonic("mnemonic secret ...", "SENDERADDRESS...")
```

#### Defined in

[src/types/account-manager.ts:271](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L271)

___

### getAccount

▸ **getAccount**(`sender`): [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md)

Returns the `TransactionSignerAccount` for the given sender address.

If no signer has been registered for that address then an error is thrown.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sender` | `string` \| `Address` | The sender address |

#### Returns

[`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md)

The `TransactionSignerAccount` or throws an error if not found

**`Example`**

```typescript
const sender = accountManager.random()
// ...
// Returns the `TransactionSignerAccount` for `sender` that has previously been registered
const account = accountManager.getAccount(sender)
```

#### Defined in

[src/types/account-manager.ts:207](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L207)

___

### getInformation

▸ **getInformation**(`sender`): `Promise`\<[`AccountInformation`](../modules/types_account.md#accountinformation)\>

Returns the given sender account's current status, balance and spendable amounts.

[Response data schema details](https://developer.algorand.org/docs/rest-apis/algod/#get-v2accountsaddress)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sender` | `string` \| `Address` | The account / address to look up |

#### Returns

`Promise`\<[`AccountInformation`](../modules/types_account.md#accountinformation)\>

The account information

**`Example`**

```typescript
const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
const accountInfo = await accountManager.getInformation(address);
```

#### Defined in

[src/types/account-manager.ts:226](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L226)

___

### getSigner

▸ **getSigner**(`sender`): `TransactionSigner`

Returns the `TransactionSigner` for the given sender address, ready to sign a transaction for that sender.

If no signer has been registered for that address then the default signer is used if registered and
if not then an error is thrown.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sender` | `string` \| `Address` | The sender address |

#### Returns

`TransactionSigner`

The `TransactionSigner` or throws an error if not found and no default signer is set

**`Example`**

```typescript
const signer = accountManager.getSigner("SENDERADDRESS")
```

#### Defined in

[src/types/account-manager.ts:187](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L187)

___

### localNetDispenser

▸ **localNetDispenser**(): `Promise`\<`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

Returns an Algorand account with private key loaded for the default LocalNet dispenser account (that can be used to fund other accounts).

#### Returns

`Promise`\<`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

The account

**`Example`**

```typescript
const account = await account.localNetDispenser()
```

#### Defined in

[src/types/account-manager.ts:445](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L445)

___

### logicsig

▸ **logicsig**(`program`, `args?`): `Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: `LogicSigAccount`  }

Tracks and returns an account that represents a logic signature.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `program` | `Uint8Array` | The bytes that make up the compiled logic signature |
| `args?` | `Uint8Array`[] | The (binary) arguments to pass into the logic signature |

#### Returns

`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: `LogicSigAccount`  }

A logic signature account wrapper

**`Example`**

```typescript
const account = account.logicsig(program, [new Uint8Array(3, ...)])
```

#### Defined in

[src/types/account-manager.ts:393](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L393)

___

### multisig

▸ **multisig**(`multisigParams`, `signingAccounts`): `Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`MultisigAccount`](types_account.MultisigAccount.md)  }

Tracks and returns an account that supports partial or full multisig signing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multisigParams` | `MultisigMetadata` | The parameters that define the multisig account |
| `signingAccounts` | (`default` \| [`SigningAccount`](types_account.SigningAccount.md))[] | The signers that are currently present |

#### Returns

`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`MultisigAccount`](types_account.MultisigAccount.md)  }

A multisig account wrapper

**`Example`**

```typescript
const account = accountManager.multisig({version: 1, threshold: 1, addrs: ["ADDRESS1...", "ADDRESS2..."]},
 [(await accountManager.fromEnvironment('ACCOUNT1')).account])
```

#### Defined in

[src/types/account-manager.ts:378](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L378)

___

### random

▸ **random**(): `Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: `default`  }

Tracks and returns a new, random Algorand account with secret key loaded.

#### Returns

`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: `default`  }

The account

**`Example`**

```typescript
const account = account.random()
```

#### Defined in

[src/types/account-manager.ts:406](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L406)

___

### rekeyAccount

▸ **rekeyAccount**(`account`, `rekeyTo`, `options?`): `Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

Rekey an account to a new address.

**Note:** Please be careful with this function and be sure to read the [official rekey guidance](https://developer.algorand.org/docs/get-details/accounts/rekey/).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` \| `Address` | The account to rekey |
| `rekeyTo` | `string` \| `Address` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) | The account address or signing account of the account that will be used to authorise transactions for the rekeyed account going forward. If a signing account is provided that will now be tracked as the signer for `account` in this `AccountManager` |
| `options?` | `Omit`\<[`CommonTransactionParams`](../modules/types_composer.md#commontransactionparams), ``"sender"``\> & [`SendParams`](../interfaces/types_transaction.SendParams.md) | Any parameters to control the transaction or execution of the transaction |

#### Returns

`Promise`\<\{ `confirmation`: `PendingTransactionResponse` ; `confirmations`: `PendingTransactionResponse`[] ; `groupId`: `string` ; `returns?`: [`ABIReturn`](../modules/types_app.md#abireturn)[] ; `transaction`: `Transaction` ; `transactions`: `Transaction`[] ; `txIds`: `string`[]  }\>

The result of the transaction and the transaction that was sent

**`Example`**

```typescript
await algorand.account.rekeyAccount({account: "ACCOUNTADDRESS", rekeyTo: "NEWADDRESS"})
```

**`Example`**

```typescript
await algorand.account.rekeyAccount({account: account1, rekeyTo: newSignerAccount})
```

**`Example`**

```typescript
await algorand.account.rekeyAccount({
  account: "ACCOUNTADDRESS",
  rekeyTo: "NEWADDRESS",
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
```

#### Defined in

[src/types/account-manager.ts:488](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L488)

___

### rekeyed

▸ **rekeyed**(`sender`, `account`): `Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: \{ `addr`: `Address` ; `signer`: `TransactionSigner` = account.signer }  }

Tracks and returns an Algorand account that is a rekeyed version of the given account to a new sender.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sender` | `string` \| `Address` | The sender address to use as the new sender |
| `account` | [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) | The account to use as the signer for this new rekeyed account |

#### Returns

`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: \{ `addr`: `Address` ; `signer`: `TransactionSigner` = account.signer }  }

The account

**`Example`**

```typescript
const account = account.fromMnemonic("mnemonic secret ...")
const rekeyedAccount = accountManager.rekeyed(account, "SENDERADDRESS...")
```

#### Defined in

[src/types/account-manager.ts:288](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L288)

___

### setDefaultSigner

▸ **setDefaultSigner**(`signer`): [`AccountManager`](types_account_manager.AccountManager.md)

Sets the default signer to use if no other signer is specified.

If this isn't set an a transaction needs signing for a given sender
then an error will be thrown from `getSigner` / `getAccount`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signer` | `TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) | The signer to use, either a `TransactionSigner` or a `TransactionSignerAccount` |

#### Returns

[`AccountManager`](types_account_manager.AccountManager.md)

The `AccountManager` so method calls can be chained

**`Example`**

```typescript
const signer = accountManager.random() // Can be anything that returns a `algosdk.TransactionSigner` or `TransactionSignerAccount`
accountManager.setDefaultSigner(signer)

// When signing a transaction, if there is no signer registered for the sender then the default signer will be used
const signer = accountManager.getSigner("{SENDERADDRESS}")
```

#### Defined in

[src/types/account-manager.ts:90](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L90)

___

### setSigner

▸ **setSigner**(`sender`, `signer`): [`AccountManager`](types_account_manager.AccountManager.md)

Tracks the given `algosdk.TransactionSigner` against the given sender address for later signing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sender` | `string` \| `Address` | The sender address to use this signer for |
| `signer` | `TransactionSigner` | The `algosdk.TransactionSigner` to sign transactions with for the given sender |

#### Returns

[`AccountManager`](types_account_manager.AccountManager.md)

The `AccountManager` instance for method chaining

**`Example`**

```typescript
const accountManager = new AccountManager(clientManager)
 .setSigner("SENDERADDRESS", transactionSigner)
```

#### Defined in

[src/types/account-manager.ts:154](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L154)

___

### setSignerFromAccount

▸ **setSignerFromAccount**(`account`): [`AccountManager`](types_account_manager.AccountManager.md)

Tracks the given account for later signing.

Note: If you are generating accounts via the various methods on `AccountManager`
(like `random`, `fromMnemonic`, `logicsig`, etc.) then they automatically get tracked.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | [`MultisigAccount`](types_account.MultisigAccount.md) \| `default` \| [`SigningAccount`](types_account.SigningAccount.md) \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) \| `LogicSigAccount` | The account to register, which can be a `TransactionSignerAccount` or a `algosdk.Account`, `algosdk.LogicSigAccount`, `SigningAccount` or `MultisigAccount` |

#### Returns

[`AccountManager`](types_account_manager.AccountManager.md)

The `AccountManager` instance for method chaining

**`Example`**

```typescript
const accountManager = new AccountManager(clientManager)
 .setSignerFromAccount(algosdk.generateAccount())
 .setSignerFromAccount(new algosdk.LogicSigAccount(program, args))
 .setSignerFromAccount(new SigningAccount(mnemonic, sender))
 .setSignerFromAccount(new MultisigAccount({version: 1, threshold: 1, addrs: ["ADDRESS1...", "ADDRESS2..."]}, [account1, account2]))
 .setSignerFromAccount({addr: "SENDERADDRESS", signer: transactionSigner})
```

#### Defined in

[src/types/account-manager.ts:138](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L138)

___

### setSigners

▸ **setSigners**(`anotherAccountManager`, `overwriteExisting?`): `void`

Takes all registered signers from the given `AccountManager` and adds them to this `AccountManager`.

This is useful for situations where you have multiple contexts you are building accounts in such as unit tests.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `anotherAccountManager` | [`AccountManager`](types_account_manager.AccountManager.md) | `undefined` | Another account manager with signers registered |
| `overwriteExisting` | `boolean` | `true` | Whether or not to overwrite any signers that have the same sender address with the ones in the other account manager or not (default: true) |

#### Returns

`void`

The `AccountManager` instance for method chaining

#### Defined in

[src/types/account-manager.ts:167](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L167)

___

### signerAccount

▸ **signerAccount**\<`T`\>(`account`): `Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: `T`  }

Records the given account (that can sign) against the address of the provided account for later
retrieval and returns a `TransactionSignerAccount` along with the original account in an `account` property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`MultisigAccount`](types_account.MultisigAccount.md) \| `default` \| [`SigningAccount`](types_account.SigningAccount.md) \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) \| `LogicSigAccount` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `T` |

#### Returns

`Address` & [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: `T`  }

#### Defined in

[src/types/account-manager.ts:100](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L100)
