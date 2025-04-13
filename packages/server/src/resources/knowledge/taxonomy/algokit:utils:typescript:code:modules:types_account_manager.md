[@algorandfoundation/algokit-utils](../README.md) / types/account-manager

# Module: types/account-manager

## Table of contents

### Classes

- [AccountManager](../classes/types_account_manager.AccountManager.md)

### Interfaces

- [EnsureFundedResult](../interfaces/types_account_manager.EnsureFundedResult.md)

### Functions

- [getAccountTransactionSigner](types_account_manager.md#getaccounttransactionsigner)

## Functions

### getAccountTransactionSigner

▸ **getAccountTransactionSigner**(`val`): `TransactionSigner`

Returns a `TransactionSigner` for the given account that can sign a transaction.
This function has memoization, so will return the same transaction signer for a given account.

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | [`MultisigAccount`](../classes/types_account.MultisigAccount.md) \| `default` \| [`SigningAccount`](../classes/types_account.SigningAccount.md) \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) \| `LogicSigAccount` |

#### Returns

`TransactionSigner`

A transaction signer

#### Defined in

[src/types/account-manager.ts:31](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L31)
