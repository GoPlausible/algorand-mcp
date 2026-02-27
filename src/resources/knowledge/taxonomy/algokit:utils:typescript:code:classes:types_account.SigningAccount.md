[@algorandfoundation/algokit-utils](../README.md) / [types/account](../modules/types_account.md) / SigningAccount

# Class: SigningAccount

[types/account](../modules/types_account.md).SigningAccount

Account wrapper that supports a rekeyed account

## Implements

- `default`

## Table of contents

### Constructors

- [constructor](types_account.SigningAccount.md#constructor)

### Properties

- [\_account](types_account.SigningAccount.md#_account)
- [\_sender](types_account.SigningAccount.md#_sender)
- [\_signer](types_account.SigningAccount.md#_signer)

### Accessors

- [addr](types_account.SigningAccount.md#addr)
- [sender](types_account.SigningAccount.md#sender)
- [signer](types_account.SigningAccount.md#signer)
- [sk](types_account.SigningAccount.md#sk)

## Constructors

### constructor

• **new SigningAccount**(`account`, `sender`): [`SigningAccount`](types_account.SigningAccount.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `default` |
| `sender` | `undefined` \| `string` \| `Address` |

#### Returns

[`SigningAccount`](types_account.SigningAccount.md)

#### Defined in

[src/types/account.ts:110](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account.ts#L110)

## Properties

### \_account

• `Private` **\_account**: `default`

#### Defined in

[src/types/account.ts:75](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account.ts#L75)

___

### \_sender

• `Private` **\_sender**: `Address`

#### Defined in

[src/types/account.ts:77](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account.ts#L77)

___

### \_signer

• `Private` **\_signer**: `TransactionSigner`

#### Defined in

[src/types/account.ts:76](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account.ts#L76)

## Accessors

### addr

• `get` **addr**(): `Readonly`\<`Address`\>

Algorand address of the sender

#### Returns

`Readonly`\<`Address`\>

#### Implementation of

Account.addr

#### Defined in

[src/types/account.ts:82](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account.ts#L82)

___

### sender

• `get` **sender**(): `default`

Algorand account of the sender address and signer private key

#### Returns

`default`

#### Defined in

[src/types/account.ts:103](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account.ts#L103)

___

### signer

• `get` **signer**(): `TransactionSigner`

Transaction signer for the underlying signing account

#### Returns

`TransactionSigner`

#### Defined in

[src/types/account.ts:96](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account.ts#L96)

___

### sk

• `get` **sk**(): `Readonly`\<`Uint8Array`\>

Secret key belonging to the signer

#### Returns

`Readonly`\<`Uint8Array`\>

#### Implementation of

Account.sk

#### Defined in

[src/types/account.ts:89](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account.ts#L89)
