[@algorandfoundation/algokit-utils](../README.md) / [types/kmd-account-manager](../modules/types_kmd_account_manager.md) / KmdAccountManager

# Class: KmdAccountManager

[types/kmd-account-manager](../modules/types_kmd_account_manager.md).KmdAccountManager

Provides abstractions over a [KMD](https://github.com/algorand/go-algorand/blob/master/daemon/kmd/README.md) instance
that makes it easier to get and manage accounts using KMD.

## Table of contents

### Constructors

- [constructor](types_kmd_account_manager.KmdAccountManager.md#constructor)

### Properties

- [\_clientManager](types_kmd_account_manager.KmdAccountManager.md#_clientmanager)
- [\_kmd](types_kmd_account_manager.KmdAccountManager.md#_kmd)

### Methods

- [getLocalNetDispenserAccount](types_kmd_account_manager.KmdAccountManager.md#getlocalnetdispenseraccount)
- [getOrCreateWalletAccount](types_kmd_account_manager.KmdAccountManager.md#getorcreatewalletaccount)
- [getWalletAccount](types_kmd_account_manager.KmdAccountManager.md#getwalletaccount)
- [kmd](types_kmd_account_manager.KmdAccountManager.md#kmd)

## Constructors

### constructor

• **new KmdAccountManager**(`clientManager`): [`KmdAccountManager`](types_kmd_account_manager.KmdAccountManager.md)

Create a new KMD manager.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clientManager` | [`ClientManager`](types_client_manager.ClientManager.md) | A ClientManager client to use for algod and kmd clients |

#### Returns

[`KmdAccountManager`](types_kmd_account_manager.KmdAccountManager.md)

#### Defined in

[src/types/kmd-account-manager.ts:18](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/kmd-account-manager.ts#L18)

## Properties

### \_clientManager

• `Private` **\_clientManager**: `Omit`\<[`ClientManager`](types_client_manager.ClientManager.md), ``"kmd"``\>

#### Defined in

[src/types/kmd-account-manager.ts:11](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/kmd-account-manager.ts#L11)

___

### \_kmd

• `Private` `Optional` **\_kmd**: ``null`` \| `KmdClient`

#### Defined in

[src/types/kmd-account-manager.ts:12](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/kmd-account-manager.ts#L12)

## Methods

### getLocalNetDispenserAccount

▸ **getLocalNetDispenserAccount**(): `Promise`\<[`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

Returns an Algorand account with private key loaded for the default LocalNet dispenser account (that can be used to fund other accounts).

#### Returns

`Promise`\<[`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

The default LocalNet dispenser account

**`Example`**

```typescript
const dispenser = await kmdAccountManager.getLocalNetDispenserAccount()
```

#### Defined in

[src/types/kmd-account-manager.ts:186](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/kmd-account-manager.ts#L186)

___

### getOrCreateWalletAccount

▸ **getOrCreateWalletAccount**(`name`, `fundWith?`): `Promise`\<[`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

Gets an account with private key loaded from a KMD wallet of the given name, or alternatively creates one with funds in it via a KMD wallet of the given name.

This is useful to get idempotent accounts from LocalNet without having to specify the private key (which will change when resetting the LocalNet).

This significantly speeds up local dev time and improves experience since you can write code that *just works* first go without manual config in a fresh LocalNet.

If this is used via `mnemonicAccountFromEnvironment`, then you can even use the same code that runs on production without changes for local development!

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the wallet to retrieve / create |
| `fundWith?` | [`AlgoAmount`](types_amount.AlgoAmount.md) | The number of Algo to fund the account with when it gets created, if not specified then 1000 ALGO will be funded from the dispenser account |

#### Returns

`Promise`\<[`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

An Algorand account with private key loaded - either one that already existed in the given KMD wallet, or a new one that is funded for you

**`Example`**

```typescript
// Idempotently get (if exists) or crate (if it doesn't exist yet) an account by name using KMD
// if creating it then fund it with 2 ALGO from the default dispenser account
const newAccount = await kmdAccountManager.getOrCreateWalletAccount('account1', (2).algo())
// This will return the same account as above since the name matches
const existingAccount = await kmdAccountManager.getOrCreateWalletAccount('account1')
```

#### Defined in

[src/types/kmd-account-manager.ts:135](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/kmd-account-manager.ts#L135)

___

### getWalletAccount

▸ **getWalletAccount**(`walletName`, `predicate?`, `sender?`): `Promise`\<`undefined` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

Returns an Algorand signing account with private key loaded from the given KMD wallet (identified by name).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `walletName` | `string` | The name of the wallet to retrieve an account from |
| `predicate?` | (`account`: `Record`\<`string`, `any`\>) => `boolean` | An optional filter to use to find the account (otherwise it will return a random account from the wallet) |
| `sender?` | `string` \| `Address` | The optional sender address to use this signer for (aka a rekeyed account) |

#### Returns

`Promise`\<`undefined` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) & \{ `account`: [`SigningAccount`](types_account.SigningAccount.md)  }\>

The signing account (with private key loaded) or undefined if no matching wallet or account was found

**`Example`**

```typescript
const defaultDispenserAccount = await kmdAccountManager.getWalletAccount(
  'unencrypted-default-wallet',
  a => a.status !== 'Offline' && a.amount > 1_000_000_000
)
```

#### Defined in

[src/types/kmd-account-manager.ts:62](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/kmd-account-manager.ts#L62)

___

### kmd

▸ **kmd**(): `Promise`\<`KmdClient`\>

#### Returns

`Promise`\<`KmdClient`\>

#### Defined in

[src/types/kmd-account-manager.ts:27](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/kmd-account-manager.ts#L27)
