[@algorandfoundation/algokit-utils](../README.md) / types/composer

# Module: types/composer

## Table of contents

### Classes

- [TransactionComposer](../classes/types_composer.TransactionComposer.md)

### Interfaces

- [BuiltTransactions](../interfaces/types_composer.BuiltTransactions.md)

### Type Aliases

- [AppCallMethodCall](types_composer.md#appcallmethodcall)
- [AppCallParams](types_composer.md#appcallparams)
- [AppCreateMethodCall](types_composer.md#appcreatemethodcall)
- [AppCreateParams](types_composer.md#appcreateparams)
- [AppDeleteMethodCall](types_composer.md#appdeletemethodcall)
- [AppDeleteParams](types_composer.md#appdeleteparams)
- [AppMethodCall](types_composer.md#appmethodcall)
- [AppMethodCallParams](types_composer.md#appmethodcallparams)
- [AppMethodCallTransactionArgument](types_composer.md#appmethodcalltransactionargument)
- [AppUpdateMethodCall](types_composer.md#appupdatemethodcall)
- [AppUpdateParams](types_composer.md#appupdateparams)
- [AssetConfigParams](types_composer.md#assetconfigparams)
- [AssetCreateParams](types_composer.md#assetcreateparams)
- [AssetDestroyParams](types_composer.md#assetdestroyparams)
- [AssetFreezeParams](types_composer.md#assetfreezeparams)
- [AssetOptInParams](types_composer.md#assetoptinparams)
- [AssetOptOutParams](types_composer.md#assetoptoutparams)
- [AssetTransferParams](types_composer.md#assettransferparams)
- [CommonAppCallParams](types_composer.md#commonappcallparams)
- [CommonTransactionParams](types_composer.md#commontransactionparams)
- [OfflineKeyRegistrationParams](types_composer.md#offlinekeyregistrationparams)
- [OnlineKeyRegistrationParams](types_composer.md#onlinekeyregistrationparams)
- [PaymentParams](types_composer.md#paymentparams)
- [RawSimulateOptions](types_composer.md#rawsimulateoptions)
- [SimulateOptions](types_composer.md#simulateoptions)
- [SkipSignaturesSimulateOptions](types_composer.md#skipsignaturessimulateoptions)
- [TransactionComposerParams](types_composer.md#transactioncomposerparams)
- [Txn](types_composer.md#txn)

### Variables

- [MAX\_TRANSACTION\_GROUP\_SIZE](types_composer.md#max_transaction_group_size)

## Type Aliases

### AppCallMethodCall

Ƭ **AppCallMethodCall**: [`AppMethodCall`](types_composer.md#appmethodcall)\<[`AppMethodCallParams`](types_composer.md#appmethodcallparams)\>

Parameters to define an ABI method call transaction.

#### Defined in

[src/types/composer.ts:427](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L427)

___

### AppCallParams

Ƭ **AppCallParams**: [`CommonAppCallParams`](types_composer.md#commonappcallparams) & \{ `onComplete?`: `Exclude`\<`algosdk.OnApplicationComplete`, `algosdk.OnApplicationComplete.UpdateApplicationOC`\>  }

Parameters to define an application call transaction.

#### Defined in

[src/types/composer.ts:403](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L403)

___

### AppCreateMethodCall

Ƭ **AppCreateMethodCall**: [`AppMethodCall`](types_composer.md#appmethodcall)\<[`AppCreateParams`](types_composer.md#appcreateparams)\>

Parameters to define an ABI method call create transaction.

#### Defined in

[src/types/composer.ts:421](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L421)

___

### AppCreateParams

Ƭ **AppCreateParams**: [`Expand`](types_expand.md#expand)\<`Omit`\<[`CommonAppCallParams`](types_composer.md#commonappcallparams), ``"appId"``\> & \{ `approvalProgram`: `string` \| `Uint8Array` ; `clearStateProgram`: `string` \| `Uint8Array` ; `extraProgramPages?`: `number` ; `onComplete?`: `Exclude`\<`algosdk.OnApplicationComplete`, `algosdk.OnApplicationComplete.ClearStateOC`\> ; `schema?`: \{ `globalByteSlices`: `number` ; `globalInts`: `number` ; `localByteSlices`: `number` ; `localInts`: `number`  }  }\>

Parameters to define an app create transaction

#### Defined in

[src/types/composer.ts:366](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L366)

___

### AppDeleteMethodCall

Ƭ **AppDeleteMethodCall**: [`AppMethodCall`](types_composer.md#appmethodcall)\<[`AppDeleteParams`](types_composer.md#appdeleteparams)\>

Parameters to define an ABI method call delete transaction.

#### Defined in

[src/types/composer.ts:425](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L425)

___

### AppDeleteParams

Ƭ **AppDeleteParams**: [`CommonAppCallParams`](types_composer.md#commonappcallparams) & \{ `onComplete?`: `algosdk.OnApplicationComplete.DeleteApplicationOC`  }

Parameters to define an application delete call transaction.

#### Defined in

[src/types/composer.ts:416](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L416)

___

### AppMethodCall

Ƭ **AppMethodCall**\<`T`\>: [`Expand`](types_expand.md#expand)\<`Omit`\<`T`, ``"args"``\>\> & \{ `args?`: (`algosdk.ABIValue` \| `TransactionWithSigner` \| `Transaction` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](types_composer.md#appmethodcall)\<[`AppCreateParams`](types_composer.md#appcreateparams)\> \| [`AppMethodCall`](types_composer.md#appmethodcall)\<[`AppUpdateParams`](types_composer.md#appupdateparams)\> \| [`AppMethodCall`](types_composer.md#appmethodcall)\<[`AppMethodCallParams`](types_composer.md#appmethodcallparams)\> \| `undefined`)[] ; `method`: `algosdk.ABIMethod`  }

Parameters to define an ABI method call.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/types/composer.ts:440](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L440)

___

### AppMethodCallParams

Ƭ **AppMethodCallParams**: [`CommonAppCallParams`](types_composer.md#commonappcallparams) & \{ `onComplete?`: `Exclude`\<`algosdk.OnApplicationComplete`, `algosdk.OnApplicationComplete.UpdateApplicationOC` \| `algosdk.OnApplicationComplete.ClearStateOC`\>  }

Common parameters to define an ABI method call transaction.

#### Defined in

[src/types/composer.ts:408](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L408)

___

### AppMethodCallTransactionArgument

Ƭ **AppMethodCallTransactionArgument**: `TransactionWithSigner` \| `Transaction` \| `Promise`\<`Transaction`\> \| [`AppMethodCall`](types_composer.md#appmethodcall)\<[`AppCreateParams`](types_composer.md#appcreateparams)\> \| [`AppMethodCall`](types_composer.md#appmethodcall)\<[`AppUpdateParams`](types_composer.md#appupdateparams)\> \| [`AppMethodCall`](types_composer.md#appmethodcall)\<[`AppMethodCallParams`](types_composer.md#appmethodcallparams)\>

Types that can be used to define a transaction argument for an ABI call transaction.

#### Defined in

[src/types/composer.ts:430](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L430)

___

### AppUpdateMethodCall

Ƭ **AppUpdateMethodCall**: [`AppMethodCall`](types_composer.md#appmethodcall)\<[`AppUpdateParams`](types_composer.md#appupdateparams)\>

Parameters to define an ABI method call update transaction.

#### Defined in

[src/types/composer.ts:423](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L423)

___

### AppUpdateParams

Ƭ **AppUpdateParams**: [`Expand`](types_expand.md#expand)\<[`CommonAppCallParams`](types_composer.md#commonappcallparams) & \{ `approvalProgram`: `string` \| `Uint8Array` ; `clearStateProgram`: `string` \| `Uint8Array` ; `onComplete?`: `algosdk.OnApplicationComplete.UpdateApplicationOC`  }\>

Parameters to define an app update transaction

#### Defined in

[src/types/composer.ts:392](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L392)

___

### AssetConfigParams

Ƭ **AssetConfigParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `assetId`: `bigint` ; `clawback?`: `string` \| `Address` ; `freeze?`: `string` \| `Address` ; `manager`: `string` \| `Address` \| `undefined` ; `reserve?`: `string` \| `Address`  }

Parameters to define an asset reconfiguration transaction.

**Note:** The manager, reserve, freeze, and clawback addresses
are immutably empty if they are not set. If manager is not set then
all fields are immutable from that point forward.

#### Defined in

[src/types/composer.ts:219](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L219)

___

### AssetCreateParams

Ƭ **AssetCreateParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `assetName?`: `string` ; `clawback?`: `string` \| `Address` ; `decimals?`: `number` ; `defaultFrozen?`: `boolean` ; `freeze?`: `string` \| `Address` ; `manager?`: `string` \| `Address` ; `metadataHash?`: `string` \| `Uint8Array` ; `reserve?`: `string` \| `Address` ; `total`: `bigint` ; `unitName?`: `string` ; `url?`: `string`  }

Parameters to define an asset create transaction.

The account that sends this transaction will automatically be opted in to the asset and will hold all units after creation.

#### Defined in

[src/types/composer.ts:103](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L103)

___

### AssetDestroyParams

Ƭ **AssetDestroyParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `assetId`: `bigint`  }

Parameters to define an asset destroy transaction.

Created assets can be destroyed only by the asset manager account. All of the assets must be owned by the creator of the asset before the asset can be deleted.

#### Defined in

[src/types/composer.ts:277](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L277)

___

### AssetFreezeParams

Ƭ **AssetFreezeParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `account`: `string` \| `Address` ; `assetId`: `bigint` ; `frozen`: `boolean`  }

Parameters to define an asset freeze transaction.

#### Defined in

[src/types/composer.ts:264](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L264)

___

### AssetOptInParams

Ƭ **AssetOptInParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `assetId`: `bigint`  }

Parameters to define an asset opt-in transaction.

#### Defined in

[src/types/composer.ts:305](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L305)

___

### AssetOptOutParams

Ƭ **AssetOptOutParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `assetId`: `bigint` ; `creator`: `string` \| `Address`  }

Parameters to define an asset opt-out transaction.

#### Defined in

[src/types/composer.ts:311](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L311)

___

### AssetTransferParams

Ƭ **AssetTransferParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `amount`: `bigint` ; `assetId`: `bigint` ; `clawbackTarget?`: `string` \| `Address` ; `closeAssetTo?`: `string` \| `Address` ; `receiver`: `string` \| `Address`  }

Parameters to define an asset transfer transaction.

#### Defined in

[src/types/composer.ts:283](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L283)

___

### CommonAppCallParams

Ƭ **CommonAppCallParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `accountReferences?`: (`string` \| `Address`)[] ; `appId`: `bigint` ; `appReferences?`: `bigint`[] ; `args?`: `Uint8Array`[] ; `assetReferences?`: `bigint`[] ; `boxReferences?`: ([`BoxReference`](../interfaces/types_app_manager.BoxReference.md) \| [`BoxIdentifier`](types_app_manager.md#boxidentifier))[] ; `onComplete?`: `algosdk.OnApplicationComplete`  }

Common parameters for defining an application call transaction.

#### Defined in

[src/types/composer.ts:344](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L344)

___

### CommonTransactionParams

Ƭ **CommonTransactionParams**: `Object`

Common parameters for defining a transaction.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `extraFee?` | [`AlgoAmount`](../classes/types_amount.AlgoAmount.md) | The fee to pay IN ADDITION to the suggested fee. Useful for covering inner transaction fees. |
| `firstValidRound?` | `bigint` | Set the first round this transaction is valid. If left undefined, the value from algod will be used. We recommend you only set this when you intentionally want this to be some time in the future. |
| `lastValidRound?` | `bigint` | The last round this transaction is valid. It is recommended to use `validityWindow` instead. |
| `lease?` | `Uint8Array` \| `string` | Prevent multiple transactions with the same lease being included within the validity window. A [lease](https://developer.algorand.org/articles/leased-transactions-securing-advanced-smart-contract-design/) enforces a mutually exclusive transaction (useful to prevent double-posting and other scenarios). |
| `maxFee?` | [`AlgoAmount`](../classes/types_amount.AlgoAmount.md) | Throw an error if the fee for the transaction is more than this amount; prevents overspending on fees during high congestion periods. |
| `note?` | `Uint8Array` \| `string` | Note to attach to the transaction. Max of 1000 bytes. |
| `rekeyTo?` | `string` \| `Address` | Change the signing key of the sender to the given address. **Warning:** Please be careful with this parameter and be sure to read the [official rekey guidance](https://developer.algorand.org/docs/get-details/accounts/rekey/). |
| `sender` | `string` \| `Address` | The address of the account sending the transaction. |
| `signer?` | `algosdk.TransactionSigner` \| [`TransactionSignerAccount`](../interfaces/types_account.TransactionSignerAccount.md) | The function used to sign transaction(s); if not specified then an attempt will be made to find a registered signer for the given `sender` or use a default signer (if configured). |
| `staticFee?` | [`AlgoAmount`](../classes/types_amount.AlgoAmount.md) | The static transaction fee. In most cases you want to use `extraFee` unless setting the fee to 0 to be covered by another transaction. |
| `validityWindow?` | `number` \| `bigint` | How many rounds the transaction should be valid for, if not specified then the registered default validity window will be used. |

#### Defined in

[src/types/composer.ts:46](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L46)

___

### OfflineKeyRegistrationParams

Ƭ **OfflineKeyRegistrationParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `preventAccountFromEverParticipatingAgain?`: `boolean`  }

Parameters to define an offline key registration transaction.

#### Defined in

[src/types/composer.ts:338](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L338)

___

### OnlineKeyRegistrationParams

Ƭ **OnlineKeyRegistrationParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `selectionKey`: `Uint8Array` ; `stateProofKey?`: `Uint8Array` ; `voteFirst`: `bigint` ; `voteKey`: `Uint8Array` ; `voteKeyDilution`: `bigint` ; `voteLast`: `bigint`  }

Parameters to define an online key registration transaction.

#### Defined in

[src/types/composer.ts:322](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L322)

___

### PaymentParams

Ƭ **PaymentParams**: [`CommonTransactionParams`](types_composer.md#commontransactionparams) & \{ `amount`: [`AlgoAmount`](../classes/types_amount.AlgoAmount.md) ; `closeRemainderTo?`: `string` \| `Address` ; `receiver`: `string` \| `Address`  }

Parameters to define a payment transaction.

#### Defined in

[src/types/composer.ts:87](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L87)

___

### RawSimulateOptions

Ƭ **RawSimulateOptions**: [`Expand`](types_expand.md#expand)\<`Omit`\<`ConstructorParameters`\<typeof `modelsv2.SimulateRequest`\>[``0``], ``"txnGroups"``\>\>

The raw API options to control a simulate request.
See algod API docs for more information: https://developer.algorand.org/docs/rest-apis/algod/#simulaterequest

#### Defined in

[src/types/composer.ts:40](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L40)

___

### SimulateOptions

Ƭ **SimulateOptions**: [`Expand`](types_expand.md#expand)\<`Partial`\<[`SkipSignaturesSimulateOptions`](types_composer.md#skipsignaturessimulateoptions)\> & [`RawSimulateOptions`](types_composer.md#rawsimulateoptions)\>

All options to control a simulate request

#### Defined in

[src/types/composer.ts:43](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L43)

___

### SkipSignaturesSimulateOptions

Ƭ **SkipSignaturesSimulateOptions**: [`Expand`](types_expand.md#expand)\<`Omit`\<[`RawSimulateOptions`](types_composer.md#rawsimulateoptions), ``"fixSigners"`` \| ``"allowEmptySignatures"``\> & \{ `skipSignatures`: `boolean`  }\>

Options to control a simulate request, that does not require transaction signing

#### Defined in

[src/types/composer.ts:28](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L28)

___

### TransactionComposerParams

Ƭ **TransactionComposerParams**: `Object`

Parameters to create an `TransactionComposer`.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `algod` | `algosdk.Algodv2` | The algod client to use to get suggestedParams and send the transaction group |
| `appManager?` | [`AppManager`](../classes/types_app_manager.AppManager.md) | An existing `AppManager` to use to manage app compilation and cache compilation results. If not specified than an ephemeral one will be created. |
| `defaultValidityWindow?` | `bigint` | How many rounds a transaction should be valid for by default; if not specified then will be 10 rounds (or 1000 rounds if issuing transactions to LocalNet). |
| `getSigner` | (`address`: `string` \| `Address`) => `algosdk.TransactionSigner` | - |
| `getSuggestedParams?` | () => `Promise`\<`algosdk.SuggestedParams`\> | - |

#### Defined in

[src/types/composer.ts:480](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L480)

___

### Txn

Ƭ **Txn**: [`PaymentParams`](types_composer.md#paymentparams) & \{ `type`: ``"pay"``  } \| [`AssetCreateParams`](types_composer.md#assetcreateparams) & \{ `type`: ``"assetCreate"``  } \| [`AssetConfigParams`](types_composer.md#assetconfigparams) & \{ `type`: ``"assetConfig"``  } \| [`AssetFreezeParams`](types_composer.md#assetfreezeparams) & \{ `type`: ``"assetFreeze"``  } \| [`AssetDestroyParams`](types_composer.md#assetdestroyparams) & \{ `type`: ``"assetDestroy"``  } \| [`AssetTransferParams`](types_composer.md#assettransferparams) & \{ `type`: ``"assetTransfer"``  } \| [`AssetOptInParams`](types_composer.md#assetoptinparams) & \{ `type`: ``"assetOptIn"``  } \| [`AssetOptOutParams`](types_composer.md#assetoptoutparams) & \{ `type`: ``"assetOptOut"``  } \| [`AppCallParams`](types_composer.md#appcallparams) \| [`AppCreateParams`](types_composer.md#appcreateparams) \| [`AppUpdateParams`](types_composer.md#appupdateparams) & \{ `type`: ``"appCall"``  } \| [`OnlineKeyRegistrationParams`](types_composer.md#onlinekeyregistrationparams) \| [`OfflineKeyRegistrationParams`](types_composer.md#offlinekeyregistrationparams) & \{ `type`: ``"keyReg"``  } \| `algosdk.TransactionWithSigner` & \{ `type`: ``"txnWithSigner"``  } \| \{ `atc`: `algosdk.AtomicTransactionComposer` ; `type`: ``"atc"``  } \| [`AppCallMethodCall`](types_composer.md#appcallmethodcall) \| [`AppCreateMethodCall`](types_composer.md#appcreatemethodcall) \| [`AppUpdateMethodCall`](types_composer.md#appupdatemethodcall) & \{ `type`: ``"methodCall"``  }

#### Defined in

[src/types/composer.ts:464](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L464)

## Variables

### MAX\_TRANSACTION\_GROUP\_SIZE

• `Const` **MAX\_TRANSACTION\_GROUP\_SIZE**: ``16``

#### Defined in

[src/types/composer.ts:25](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/composer.ts#L25)
