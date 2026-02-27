[@algorandfoundation/algokit-utils](../README.md) / [types/account-manager](../modules/types_account_manager.md) / EnsureFundedResult

# Interface: EnsureFundedResult

[types/account-manager](../modules/types_account_manager.md).EnsureFundedResult

Result from performing an ensureFunded call.

## Table of contents

### Properties

- [amountFunded](types_account_manager.EnsureFundedResult.md#amountfunded)
- [transactionId](types_account_manager.EnsureFundedResult.md#transactionid)

## Properties

### amountFunded

• **amountFunded**: [`AlgoAmount`](../classes/types_amount.AlgoAmount.md)

The amount that was sent to the account.

#### Defined in

[src/types/account-manager.ts:22](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L22)

___

### transactionId

• **transactionId**: `string`

The transaction ID of the transaction that funded the account.

#### Defined in

[src/types/account-manager.ts:20](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/account-manager.ts#L20)
