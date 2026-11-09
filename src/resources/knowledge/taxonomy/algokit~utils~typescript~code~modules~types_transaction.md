[@algorandfoundation/algokit-utils](../README.md) / types/transaction

# Module: types/transaction

## Table of contents

### Interfaces

- [AtomicTransactionComposerToSend](../interfaces/types_transaction.AtomicTransactionComposerToSend.md)
- [ConfirmedTransactionResult](../interfaces/types_transaction.ConfirmedTransactionResult.md)
- [ConfirmedTransactionResults](../interfaces/types_transaction.ConfirmedTransactionResults.md)
- [SendAtomicTransactionComposerResults](../interfaces/types_transaction.SendAtomicTransactionComposerResults.md)
- [SendParams](../interfaces/types_transaction.SendParams.md)
- [SendTransactionParams](../interfaces/types_transaction.SendTransactionParams.md)
- [SendTransactionResult](../interfaces/types_transaction.SendTransactionResult.md)
- [SendTransactionResults](../interfaces/types_transaction.SendTransactionResults.md)
- [TransactionGroupToSend](../interfaces/types_transaction.TransactionGroupToSend.md)
- [TransactionToSign](../interfaces/types_transaction.TransactionToSign.md)

### Type Aliases

- [Arc2TransactionNote](types_transaction.md#arc2transactionnote)
- [SendSingleTransactionResult](types_transaction.md#sendsingletransactionresult)
- [SendTransactionFrom](types_transaction.md#sendtransactionfrom)
- [TransactionNote](types_transaction.md#transactionnote)
- [TransactionNoteData](types_transaction.md#transactionnotedata)

## Type Aliases

### Arc2TransactionNote

Ƭ **Arc2TransactionNote**: \{ `dAppName`: `string` ; `data`: `string` ; `format`: ``"m"`` \| ``"b"`` \| ``"u"``  } \| \{ `dAppName`: `string` ; `data`: [`TransactionNoteData`](types_transaction.md#transactionnotedata) ; `format`: ``"j"``  }

ARC-0002 compatible transaction note components https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0002.md

#### Defined in

[src/types/transaction.ts:16](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L16)

___

### SendSingleTransactionResult

Ƭ **SendSingleTransactionResult**: [`Expand`](types_expand.md#expand)\<[`SendAtomicTransactionComposerResults`](../interfaces/types_transaction.SendAtomicTransactionComposerResults.md) & [`ConfirmedTransactionResult`](../interfaces/types_transaction.ConfirmedTransactionResult.md)\>

Result from sending a single transaction.

#### Defined in

[src/types/transaction.ts:50](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L50)

___

### SendTransactionFrom

Ƭ **SendTransactionFrom**: `Account` \| [`SigningAccount`](../classes/types_account.SigningAccount.md) \| `LogicSigAccount` \| [`MultisigAccount`](../classes/types_account.MultisigAccount.md) \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md)

Core account abstraction when signing/sending transactions

This type is used across the entire AlgoKit Utils library and allows you to pass through
many types of accounts, including:
* `Account` - The in-built `algosdk.Account` type for mnemonic accounts
* `SigningAccount` - An AlgoKit Utils class that wraps Account to provide support for rekeyed accounts
* `LogicSigAccount` - The in-built `algosdk.LogicSigAccount` type for logic signatures
* `MultisigAccount` - An AlgoKit Utils class that wraps a multisig account and provides mechanisms to get a multisig account
* `TransactionSignerAccount` - An AlgoKit Utils class that wraps the in-built `algosdk.TransactionSigner` along with the sender address

#### Defined in

[src/types/transaction.ts:108](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L108)

___

### TransactionNote

Ƭ **TransactionNote**: `Uint8Array` \| [`TransactionNoteData`](types_transaction.md#transactionnotedata) \| [`Arc2TransactionNote`](types_transaction.md#arc2transactionnote)

#### Defined in

[src/types/transaction.ts:12](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L12)

___

### TransactionNoteData

Ƭ **TransactionNoteData**: `string` \| ``null`` \| `undefined` \| `number` \| `any`[] \| `Record`\<`string`, `any`\>

#### Defined in

[src/types/transaction.ts:14](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/transaction.ts#L14)
