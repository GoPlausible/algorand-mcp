[algosdk](README.md) / Exports

# algosdk

## Table of contents

### Namespaces

- [indexerModels](modules/indexerModels.md)
- [modelsv2](modules/modelsv2.md)

### Enumerations

- [ABIReferenceType](enums/ABIReferenceType.md)
- [ABITransactionType](enums/ABITransactionType.md)
- [AtomicTransactionComposerStatus](enums/AtomicTransactionComposerStatus.md)
- [IntDecoding](enums/IntDecoding.md)
- [OnApplicationComplete](enums/OnApplicationComplete.md)
- [TransactionType](enums/TransactionType.md)

### Classes

- [ABIAddressType](classes/ABIAddressType.md)
- [ABIArrayDynamicType](classes/ABIArrayDynamicType.md)
- [ABIArrayStaticType](classes/ABIArrayStaticType.md)
- [ABIBoolType](classes/ABIBoolType.md)
- [ABIByteType](classes/ABIByteType.md)
- [ABIContract](classes/ABIContract.md)
- [ABIInterface](classes/ABIInterface.md)
- [ABIMethod](classes/ABIMethod.md)
- [ABIStringType](classes/ABIStringType.md)
- [ABITupleType](classes/ABITupleType.md)
- [ABIType](classes/ABIType.md)
- [ABIUfixedType](classes/ABIUfixedType.md)
- [ABIUintType](classes/ABIUintType.md)
- [Algodv2](classes/Algodv2.md)
- [AtomicTransactionComposer](classes/AtomicTransactionComposer.md)
- [DryrunResult](classes/DryrunResult.md)
- [Indexer](classes/Indexer.md)
- [Kmd](classes/Kmd.md)
- [LogicSig](classes/LogicSig.md)
- [LogicSigAccount](classes/LogicSigAccount.md)
- [SourceMap](classes/SourceMap.md)
- [Transaction](classes/Transaction.md)

### Interfaces

- [ABIContractNetworkInfo](interfaces/ABIContractNetworkInfo.md)
- [ABIContractNetworks](interfaces/ABIContractNetworks.md)
- [ABIContractParams](interfaces/ABIContractParams.md)
- [ABIInterfaceParams](interfaces/ABIInterfaceParams.md)
- [ABIMethodArgParams](interfaces/ABIMethodArgParams.md)
- [ABIMethodParams](interfaces/ABIMethodParams.md)
- [ABIMethodReturnParams](interfaces/ABIMethodReturnParams.md)
- [ABIResult](interfaces/ABIResult.md)
- [Account](interfaces/Account.md)
- [Address](interfaces/Address.md)
- [AlgodTokenHeader](interfaces/AlgodTokenHeader.md)
- [BaseHTTPClient](interfaces/BaseHTTPClient.md)
- [BaseHTTPClientError](interfaces/BaseHTTPClientError.md)
- [BaseHTTPClientResponse](interfaces/BaseHTTPClientResponse.md)
- [BoxReference](interfaces/BoxReference.md)
- [CustomTokenHeader](interfaces/CustomTokenHeader.md)
- [EncodedAssetParams](interfaces/EncodedAssetParams.md)
- [EncodedBoxReference](interfaces/EncodedBoxReference.md)
- [EncodedGlobalStateSchema](interfaces/EncodedGlobalStateSchema.md)
- [EncodedLocalStateSchema](interfaces/EncodedLocalStateSchema.md)
- [EncodedLogicSig](interfaces/EncodedLogicSig.md)
- [EncodedLogicSigAccount](interfaces/EncodedLogicSigAccount.md)
- [EncodedMultisig](interfaces/EncodedMultisig.md)
- [EncodedSignedTransaction](interfaces/EncodedSignedTransaction.md)
- [EncodedSubsig](interfaces/EncodedSubsig.md)
- [EncodedTransaction](interfaces/EncodedTransaction.md)
- [IndexerTokenHeader](interfaces/IndexerTokenHeader.md)
- [KMDTokenHeader](interfaces/KMDTokenHeader.md)
- [MultisigMetadata](interfaces/MultisigMetadata.md)
- [SignedTransaction](interfaces/SignedTransaction.md)
- [SuggestedParams](interfaces/SuggestedParams.md)
- [TransactionParams](interfaces/TransactionParams.md)
- [TransactionWithSigner](interfaces/TransactionWithSigner.md)

### Type Aliases

- [ABIArgument](modules.md#abiargument)
- [ABIArgumentType](modules.md#abiargumenttype)
- [ABIReturnType](modules.md#abireturntype)
- [ABIValue](modules.md#abivalue)
- [AppClearStateTxn](modules.md#appclearstatetxn)
- [AppCloseOutTxn](modules.md#appcloseouttxn)
- [AppCreateTxn](modules.md#appcreatetxn)
- [AppDeleteTxn](modules.md#appdeletetxn)
- [AppNoOpTxn](modules.md#appnooptxn)
- [AppOptInTxn](modules.md#appoptintxn)
- [AppUpdateTxn](modules.md#appupdatetxn)
- [AssetConfigTxn](modules.md#assetconfigtxn)
- [AssetCreateTxn](modules.md#assetcreatetxn)
- [AssetDestroyTxn](modules.md#assetdestroytxn)
- [AssetFreezeTxn](modules.md#assetfreezetxn)
- [AssetTransferTxn](modules.md#assettransfertxn)
- [KeyRegistrationTxn](modules.md#keyregistrationtxn)
- [MustHaveSuggestedParams](modules.md#musthavesuggestedparams)
- [MustHaveSuggestedParamsInline](modules.md#musthavesuggestedparamsinline)
- [PaymentTxn](modules.md#paymenttxn)
- [StateProofTxn](modules.md#stateprooftxn)
- [TokenHeader](modules.md#tokenheader)
- [TransactionLike](modules.md#transactionlike)
- [TransactionSigner](modules.md#transactionsigner)

### Variables

- [ADDR\_BYTE\_SIZE](modules.md#addr_byte_size)
- [ALGORAND\_MIN\_TX\_FEE](modules.md#algorand_min_tx_fee)
- [ERROR\_INVALID\_MICROALGOS](modules.md#error_invalid_microalgos)
- [ERROR\_MULTISIG\_BAD\_SENDER](modules.md#error_multisig_bad_sender)
- [INVALID\_MICROALGOS\_ERROR\_MSG](modules.md#invalid_microalgos_error_msg)
- [LENGTH\_ENCODE\_BYTE\_SIZE](modules.md#length_encode_byte_size)
- [MAX\_LEN](modules.md#max_len)
- [MULTISIG\_BAD\_SENDER\_ERROR\_MSG](modules.md#multisig_bad_sender_error_msg)
- [SINGLE\_BOOL\_SIZE](modules.md#single_bool_size)
- [SINGLE\_BYTE\_SIZE](modules.md#single_byte_size)

### Functions

- [abiCheckTransactionType](modules.md#abichecktransactiontype)
- [abiTypeIsReference](modules.md#abitypeisreference)
- [abiTypeIsTransaction](modules.md#abitypeistransaction)
- [algosToMicroalgos](modules.md#algostomicroalgos)
- [appendSignMultisigTransaction](modules.md#appendsignmultisigtransaction)
- [appendSignRawMultisigSignature](modules.md#appendsignrawmultisigsignature)
- [assignGroupID](modules.md#assigngroupid)
- [bigIntToBytes](modules.md#biginttobytes)
- [bytesToBigInt](modules.md#bytestobigint)
- [computeGroupID](modules.md#computegroupid)
- [createDryrun](modules.md#createdryrun)
- [createMultisigTransaction](modules.md#createmultisigtransaction)
- [decodeAddress](modules.md#decodeaddress)
- [decodeObj](modules.md#decodeobj)
- [decodeSignedTransaction](modules.md#decodesignedtransaction)
- [decodeUint64](modules.md#decodeuint64)
- [decodeUnsignedTransaction](modules.md#decodeunsignedtransaction)
- [encodeAddress](modules.md#encodeaddress)
- [encodeObj](modules.md#encodeobj)
- [encodeUint64](modules.md#encodeuint64)
- [encodeUnsignedSimulateTransaction](modules.md#encodeunsignedsimulatetransaction)
- [encodeUnsignedTransaction](modules.md#encodeunsignedtransaction)
- [generateAccount](modules.md#generateaccount)
- [getApplicationAddress](modules.md#getapplicationaddress)
- [getMethodByName](modules.md#getmethodbyname)
- [instantiateTxnIfNeeded](modules.md#instantiatetxnifneeded)
- [isTransactionWithSigner](modules.md#istransactionwithsigner)
- [isValidAddress](modules.md#isvalidaddress)
- [logicSigFromByte](modules.md#logicsigfrombyte)
- [makeApplicationCallTxnFromObject](modules.md#makeapplicationcalltxnfromobject)
- [makeApplicationClearStateTxn](modules.md#makeapplicationclearstatetxn)
- [makeApplicationClearStateTxnFromObject](modules.md#makeapplicationclearstatetxnfromobject)
- [makeApplicationCloseOutTxn](modules.md#makeapplicationcloseouttxn)
- [makeApplicationCloseOutTxnFromObject](modules.md#makeapplicationcloseouttxnfromobject)
- [makeApplicationCreateTxn](modules.md#makeapplicationcreatetxn)
- [makeApplicationCreateTxnFromObject](modules.md#makeapplicationcreatetxnfromobject)
- [makeApplicationDeleteTxn](modules.md#makeapplicationdeletetxn)
- [makeApplicationDeleteTxnFromObject](modules.md#makeapplicationdeletetxnfromobject)
- [makeApplicationNoOpTxn](modules.md#makeapplicationnooptxn)
- [makeApplicationNoOpTxnFromObject](modules.md#makeapplicationnooptxnfromobject)
- [makeApplicationOptInTxn](modules.md#makeapplicationoptintxn)
- [makeApplicationOptInTxnFromObject](modules.md#makeapplicationoptintxnfromobject)
- [makeApplicationUpdateTxn](modules.md#makeapplicationupdatetxn)
- [makeApplicationUpdateTxnFromObject](modules.md#makeapplicationupdatetxnfromobject)
- [makeAssetConfigTxnWithSuggestedParams](modules.md#makeassetconfigtxnwithsuggestedparams)
- [makeAssetConfigTxnWithSuggestedParamsFromObject](modules.md#makeassetconfigtxnwithsuggestedparamsfromobject)
- [makeAssetCreateTxnWithSuggestedParams](modules.md#makeassetcreatetxnwithsuggestedparams)
- [makeAssetCreateTxnWithSuggestedParamsFromObject](modules.md#makeassetcreatetxnwithsuggestedparamsfromobject)
- [makeAssetDestroyTxnWithSuggestedParams](modules.md#makeassetdestroytxnwithsuggestedparams)
- [makeAssetDestroyTxnWithSuggestedParamsFromObject](modules.md#makeassetdestroytxnwithsuggestedparamsfromobject)
- [makeAssetFreezeTxnWithSuggestedParams](modules.md#makeassetfreezetxnwithsuggestedparams)
- [makeAssetFreezeTxnWithSuggestedParamsFromObject](modules.md#makeassetfreezetxnwithsuggestedparamsfromobject)
- [makeAssetTransferTxnWithSuggestedParams](modules.md#makeassettransfertxnwithsuggestedparams)
- [makeAssetTransferTxnWithSuggestedParamsFromObject](modules.md#makeassettransfertxnwithsuggestedparamsfromobject)
- [makeBasicAccountTransactionSigner](modules.md#makebasicaccounttransactionsigner)
- [makeEmptyTransactionSigner](modules.md#makeemptytransactionsigner)
- [makeKeyRegistrationTxnWithSuggestedParams](modules.md#makekeyregistrationtxnwithsuggestedparams)
- [makeKeyRegistrationTxnWithSuggestedParamsFromObject](modules.md#makekeyregistrationtxnwithsuggestedparamsfromobject)
- [makeLogicSigAccountTransactionSigner](modules.md#makelogicsigaccounttransactionsigner)
- [makeMultiSigAccountTransactionSigner](modules.md#makemultisigaccounttransactionsigner)
- [makePaymentTxnWithSuggestedParams](modules.md#makepaymenttxnwithsuggestedparams)
- [makePaymentTxnWithSuggestedParamsFromObject](modules.md#makepaymenttxnwithsuggestedparamsfromobject)
- [masterDerivationKeyToMnemonic](modules.md#masterderivationkeytomnemonic)
- [mergeMultisigTransactions](modules.md#mergemultisigtransactions)
- [microalgosToAlgos](modules.md#microalgostoalgos)
- [mnemonicFromSeed](modules.md#mnemonicfromseed)
- [mnemonicToMasterDerivationKey](modules.md#mnemonictomasterderivationkey)
- [mnemonicToSecretKey](modules.md#mnemonictosecretkey)
- [multisigAddress](modules.md#multisigaddress)
- [secretKeyToMnemonic](modules.md#secretkeytomnemonic)
- [seedFromMnemonic](modules.md#seedfrommnemonic)
- [signBid](modules.md#signbid)
- [signBytes](modules.md#signbytes)
- [signLogicSigTransaction](modules.md#signlogicsigtransaction)
- [signLogicSigTransactionObject](modules.md#signlogicsigtransactionobject)
- [signMultisigTransaction](modules.md#signmultisigtransaction)
- [signTransaction](modules.md#signtransaction)
- [tealSign](modules.md#tealsign)
- [tealSignFromProgram](modules.md#tealsignfromprogram)
- [verifyBytes](modules.md#verifybytes)
- [verifyMultisig](modules.md#verifymultisig)
- [verifyTealSign](modules.md#verifytealsign)
- [waitForConfirmation](modules.md#waitforconfirmation)

## Type Aliases

### ABIArgument

Ƭ **ABIArgument**: [`ABIValue`](modules.md#abivalue) \| [`TransactionWithSigner`](interfaces/TransactionWithSigner.md)

#### Defined in

composer.ts:43

___

### ABIArgumentType

Ƭ **ABIArgumentType**: [`ABIType`](classes/ABIType.md) \| [`ABITransactionType`](enums/ABITransactionType.md) \| [`ABIReferenceType`](enums/ABIReferenceType.md)

#### Defined in

abi/method.ts:71

___

### ABIReturnType

Ƭ **ABIReturnType**: [`ABIType`](classes/ABIType.md) \| ``"void"``

#### Defined in

abi/method.ts:73

___

### ABIValue

Ƭ **ABIValue**: `boolean` \| `number` \| `bigint` \| `string` \| `Uint8Array` \| [`ABIValue`](modules.md#abivalue)[]

#### Defined in

abi/abi_type.ts:35

___

### AppClearStateTxn

Ƭ **AppClearStateTxn**: [`AppDeleteTxn`](modules.md#appdeletetxn)

#### Defined in

types/transactions/application.ts:104

___

### AppCloseOutTxn

Ƭ **AppCloseOutTxn**: [`AppDeleteTxn`](modules.md#appdeletetxn)

#### Defined in

types/transactions/application.ts:97

___

### AppCreateTxn

Ƭ **AppCreateTxn**: `ConstructTransaction`\<`SpecificParametersForCreate`, `OverwritesForCreate`\>

#### Defined in

types/transactions/application.ts:30

___

### AppDeleteTxn

Ƭ **AppDeleteTxn**: `ConstructTransaction`\<`SpecificParametersForDelete`, `OverwritesForDelete`\>

#### Defined in

types/transactions/application.ts:80

___

### AppNoOpTxn

Ƭ **AppNoOpTxn**: [`AppDeleteTxn`](modules.md#appdeletetxn)

#### Defined in

types/transactions/application.ts:111

___

### AppOptInTxn

Ƭ **AppOptInTxn**: [`AppDeleteTxn`](modules.md#appdeletetxn)

#### Defined in

types/transactions/application.ts:90

___

### AppUpdateTxn

Ƭ **AppUpdateTxn**: `ConstructTransaction`\<`SpecificParametersForUpdate`, `OverwritesForUpdate`\>

#### Defined in

types/transactions/application.ts:56

___

### AssetConfigTxn

Ƭ **AssetConfigTxn**: `ConstructTransaction`\<`SpecificParametersForConfig`, `OverwritesForConfig`\>

#### Defined in

types/transactions/asset.ts:49

___

### AssetCreateTxn

Ƭ **AssetCreateTxn**: `ConstructTransaction`\<`SpecificParametersForCreate`, `OverwritesForCreate`\>

#### Defined in

types/transactions/asset.ts:27

___

### AssetDestroyTxn

Ƭ **AssetDestroyTxn**: `ConstructTransaction`\<`SpecificParametersForDestroy`, `OverwritesForDestroy`\>

#### Defined in

types/transactions/asset.ts:64

___

### AssetFreezeTxn

Ƭ **AssetFreezeTxn**: `ConstructTransaction`\<`SpecificParametersForFreeze`, `OverwritesForFreeze`\>

#### Defined in

types/transactions/asset.ts:82

___

### AssetTransferTxn

Ƭ **AssetTransferTxn**: `ConstructTransaction`\<`SpecificParametersForTransfer`, `OverwritesForTransfer`\>

#### Defined in

types/transactions/asset.ts:105

___

### KeyRegistrationTxn

Ƭ **KeyRegistrationTxn**: `ConstructTransaction`\<`SpecificParameters`, `Overwrites`\>

#### Defined in

types/transactions/keyreg.ts:19

___

### MustHaveSuggestedParams

Ƭ **MustHaveSuggestedParams**\<`T`\>: `Extract`\<`T`, \{ `suggestedParams`: [`SuggestedParams`](interfaces/SuggestedParams.md)  }\>

Only accept transaction objects that include suggestedParams as an object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ConstructTransaction` |

#### Defined in

types/transactions/builder.ts:56

___

### MustHaveSuggestedParamsInline

Ƭ **MustHaveSuggestedParamsInline**\<`T`\>: `Extract`\<`T`, [`SuggestedParams`](interfaces/SuggestedParams.md)\>

Only accept transaction objects that include suggestedParams inline instead of being
enclosed in its own property

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ConstructTransaction` |

#### Defined in

types/transactions/builder.ts:65

___

### PaymentTxn

Ƭ **PaymentTxn**: `ConstructTransaction`\<`SpecificParameters`, `Overwrites`\>

#### Defined in

types/transactions/payment.ts:13

___

### StateProofTxn

Ƭ **StateProofTxn**: `ConstructTransaction`\<`SpecificParameters`, `Overwrites`\>

#### Defined in

types/transactions/stateproof.ts:13

___

### TokenHeader

Ƭ **TokenHeader**: [`AlgodTokenHeader`](interfaces/AlgodTokenHeader.md) \| [`IndexerTokenHeader`](interfaces/IndexerTokenHeader.md) \| [`KMDTokenHeader`](interfaces/KMDTokenHeader.md) \| [`CustomTokenHeader`](interfaces/CustomTokenHeader.md)

#### Defined in

client/urlTokenBaseHTTPClient.ts:33

___

### TransactionLike

Ƭ **TransactionLike**: `AnyTransaction` \| [`Transaction`](classes/Transaction.md)

Either a valid transaction object or an instance of the Transaction class

#### Defined in

transaction.ts:1373

___

### TransactionSigner

Ƭ **TransactionSigner**: (`txnGroup`: [`Transaction`](classes/Transaction.md)[], `indexesToSign`: `number`[]) => `Promise`\<`Uint8Array`[]\>

#### Type declaration

▸ (`txnGroup`, `indexesToSign`): `Promise`\<`Uint8Array`[]\>

This type represents a function which can sign transactions from an atomic transaction group.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txnGroup` | [`Transaction`](classes/Transaction.md)[] | The atomic group containing transactions to be signed |
| `indexesToSign` | `number`[] | An array of indexes in the atomic transaction group that should be signed |

##### Returns

`Promise`\<`Uint8Array`[]\>

A promise which resolves an array of encoded signed transactions. The length of the
  array will be the same as the length of indexesToSign, and each index i in the array
  corresponds to the signed transaction from txnGroup[indexesToSign[i]]

#### Defined in

signer.ts:15

## Variables

### ADDR\_BYTE\_SIZE

• `Const` **ADDR\_BYTE\_SIZE**: ``32``

#### Defined in

abi/abi_type.ts:22

___

### ALGORAND\_MIN\_TX\_FEE

• `Const` **ALGORAND\_MIN\_TX\_FEE**: ``1000``

#### Defined in

transaction.ts:26

___

### ERROR\_INVALID\_MICROALGOS

• `Const` **ERROR\_INVALID\_MICROALGOS**: `Error`

#### Defined in

main.ts:116

___

### ERROR\_MULTISIG\_BAD\_SENDER

• `Const` **ERROR\_MULTISIG\_BAD\_SENDER**: `Error`

#### Defined in

main.ts:113

___

### INVALID\_MICROALGOS\_ERROR\_MSG

• `Const` **INVALID\_MICROALGOS\_ERROR\_MSG**: ``"Microalgos should be positive and less than 2^53 - 1."``

#### Defined in

convert.ts:2

___

### LENGTH\_ENCODE\_BYTE\_SIZE

• `Const` **LENGTH\_ENCODE\_BYTE\_SIZE**: ``2``

#### Defined in

abi/abi_type.ts:25

___

### MAX\_LEN

• `Const` **MAX\_LEN**: `number`

#### Defined in

abi/abi_type.ts:21

___

### MULTISIG\_BAD\_SENDER\_ERROR\_MSG

• `Const` **MULTISIG\_BAD\_SENDER\_ERROR\_MSG**: ``"The transaction sender address and multisig preimage do not match."``

#### Defined in

main.ts:13

___

### SINGLE\_BOOL\_SIZE

• `Const` **SINGLE\_BOOL\_SIZE**: ``1``

#### Defined in

abi/abi_type.ts:24

___

### SINGLE\_BYTE\_SIZE

• `Const` **SINGLE\_BYTE\_SIZE**: ``1``

#### Defined in

abi/abi_type.ts:23

## Functions

### abiCheckTransactionType

▸ **abiCheckTransactionType**(`type`, `txn`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | [`ABITransactionType`](enums/ABITransactionType.md) |
| `txn` | [`Transaction`](classes/Transaction.md) |

#### Returns

`boolean`

#### Defined in

abi/transaction.ts:52

___

### abiTypeIsReference

▸ **abiTypeIsReference**(`type`): type is ABIReferenceType

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `any` |

#### Returns

type is ABIReferenceType

#### Defined in

abi/reference.ts:18

___

### abiTypeIsTransaction

▸ **abiTypeIsTransaction**(`type`): type is ABITransactionType

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `any` |

#### Returns

type is ABITransactionType

#### Defined in

abi/transaction.ts:40

___

### algosToMicroalgos

▸ **algosToMicroalgos**(`algos`): `number`

algosToMicroalgos converts algos to microalgos

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `algos` | `number` | number |

#### Returns

`number`

number

#### Defined in

convert.ts:22

___

### appendSignMultisigTransaction

▸ **appendSignMultisigTransaction**(`multisigTxnBlob`, `«destructured»`, `sk`): `Object`

appendSignMultisigTransaction takes a multisig transaction blob, and appends our signature to it.
While we could derive public key preimagery from the partially-signed multisig transaction,
we ask the caller to pass it back in, to ensure they know what they are signing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multisigTxnBlob` | `Uint8Array` | an encoded multisig txn. Supports non-payment txn types. |
| `«destructured»` | [`MultisigMetadata`](interfaces/MultisigMetadata.md) | - |
| `sk` | `Uint8Array` | Algorand secret key |

#### Returns

`Object`

object containing txID, and blob representing encoded multisig txn

| Name | Type |
| :------ | :------ |
| `blob` | `Uint8Array` |
| `txID` | `string` |

#### Defined in

multisig.ts:429

___

### appendSignRawMultisigSignature

▸ **appendSignRawMultisigSignature**(`multisigTxnBlob`, `«destructured»`, `signerAddr`, `signature`): `Object`

appendMultisigTransactionSignature takes a multisig transaction blob, and appends a given raw signature to it.
This makes it possible to compile a multisig signature using only raw signatures from external methods.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multisigTxnBlob` | `Uint8Array` | an encoded multisig txn. Supports non-payment txn types. |
| `«destructured»` | [`MultisigMetadata`](interfaces/MultisigMetadata.md) | - |
| `signerAddr` | `string` | address of the signer |
| `signature` | `Uint8Array` | raw multisig signature |

#### Returns

`Object`

object containing txID, and blob representing encoded multisig txn

| Name | Type |
| :------ | :------ |
| `blob` | `Uint8Array` |
| `txID` | `string` |

#### Defined in

multisig.ts:461

___

### assignGroupID

▸ **assignGroupID**(`txns`, `from?`): [`Transaction`](classes/Transaction.md)[]

assignGroupID assigns group id to a given list of unsigned transactions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txns` | [`TransactionLike`](modules.md#transactionlike)[] | array of transactions (every element is a dict or Transaction) |
| `from?` | `string` | optional sender address specifying which transaction return |

#### Returns

[`Transaction`](classes/Transaction.md)[]

possible list of matching transactions

#### Defined in

group.ts:82

___

### bigIntToBytes

▸ **bigIntToBytes**(`bi`, `size`): `Uint8Array`

bigIntToBytes converts a BigInt to a big-endian Uint8Array for encoding.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bi` | `number` \| `bigint` | The bigint to convert. |
| `size` | `number` | The size of the resulting byte array. |

#### Returns

`Uint8Array`

A byte array containing the big-endian encoding of the input bigint

#### Defined in

encoding/bigint.ts:9

___

### bytesToBigInt

▸ **bytesToBigInt**(`bytes`): `bigint`

bytesToBigInt produces a bigint from a binary representation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | The Uint8Array to convert. |

#### Returns

`bigint`

The bigint that was encoded in the input data.

#### Defined in

encoding/bigint.ts:28

___

### computeGroupID

▸ **computeGroupID**(`txns`): `Buffer`

computeGroupID returns group ID for a group of transactions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txns` | [`TransactionLike`](modules.md#transactionlike)[] | array of transactions (every element is a dict or Transaction) |

#### Returns

`Buffer`

Buffer

#### Defined in

group.ts:61

___

### createDryrun

▸ **createDryrun**(`«destructured»`): `Promise`\<[`DryrunRequest`](classes/modelsv2.DryrunRequest.md)\>

createDryrun takes an Algod Client (from algod.AlgodV2Client) and an array of Signed Transactions
from (transaction.SignedTransaction) and creates a DryrunRequest object with relevant balances

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `client` | [`Algodv2`](classes/Algodv2.md) |
| › `latestTimestamp?` | `number` \| `bigint` |
| › `protocolVersion?` | `string` |
| › `round?` | `number` \| `bigint` |
| › `sources?` | [`DryrunSource`](classes/modelsv2.DryrunSource.md)[] |
| › `txns` | [`SignedTransaction`](interfaces/SignedTransaction.md)[] |

#### Returns

`Promise`\<[`DryrunRequest`](classes/modelsv2.DryrunRequest.md)\>

the DryrunRequest object constructed from the SignedTransactions passed

#### Defined in

dryrun.ts:55

___

### createMultisigTransaction

▸ **createMultisigTransaction**(`txn`, `«destructured»`): `Uint8Array`

createMultisigTransaction creates a raw, unsigned multisig transaction blob.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txn` | [`Transaction`](classes/Transaction.md) | the actual transaction. |
| `«destructured»` | [`MultisigMetadata`](interfaces/MultisigMetadata.md) | - |

#### Returns

`Uint8Array`

encoded multisig blob

#### Defined in

multisig.ts:53

___

### decodeAddress

▸ **decodeAddress**(`address`): [`Address`](interfaces/Address.md)

decodeAddress takes an Algorand address in string form and decodes it into a Uint8Array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | an Algorand address with checksum. |

#### Returns

[`Address`](interfaces/Address.md)

the decoded form of the address's public key and checksum

#### Defined in

encoding/address.ts:47

___

### decodeObj

▸ **decodeObj**(`o`): `unknown`

decodeObj takes a Uint8Array and returns its javascript obj

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `o` | `ArrayLike`\<`number`\> | Uint8Array to decode |

#### Returns

`unknown`

object

#### Defined in

main.ts:109

___

### decodeSignedTransaction

▸ **decodeSignedTransaction**(`transactionBuffer`): [`SignedTransaction`](interfaces/SignedTransaction.md)

decodeSignedTransaction takes a Buffer (from transaction.signTxn) and converts it to an object
containing the Transaction (txn), the signature (sig), and the auth-addr field if applicable (sgnr)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionBuffer` | `Uint8Array` | the Uint8Array containing a transaction |

#### Returns

[`SignedTransaction`](interfaces/SignedTransaction.md)

containing a Transaction, the signature, and possibly an auth-addr field

#### Defined in

transaction.ts:1357

___

### decodeUint64

▸ **decodeUint64**(`data`, `decodingMode`): `number`

decodeUint64 produces an integer from a binary representation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` | An typed array containing the big-endian encoding of an unsigned integer less than 2^64. This array must be at most 8 bytes long. |
| `decodingMode` | ``"safe"`` | Configure how the integer will be decoded. The options are: * "safe": The integer will be decoded as a Number, but if it is greater than Number.MAX_SAFE_INTEGER an error will be thrown. * "mixed": The integer will be decoded as a Number if it is less than or equal to Number.MAX_SAFE_INTEGER, otherwise it will be decoded as a BigInt. * "bigint": The integer will always be decoded as a BigInt. Defaults to "safe" if not included. |

#### Returns

`number`

The integer that was encoded in the input data. The return type will
  be determined by the parameter decodingMode.

#### Defined in

encoding/uint64.ts:47

▸ **decodeUint64**(`data`, `decodingMode`): `number` \| `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `decodingMode` | ``"mixed"`` |

#### Returns

`number` \| `bigint`

#### Defined in

encoding/uint64.ts:48

▸ **decodeUint64**(`data`, `decodingMode`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `decodingMode` | ``"bigint"`` |

#### Returns

`bigint`

#### Defined in

encoding/uint64.ts:52

___

### decodeUnsignedTransaction

▸ **decodeUnsignedTransaction**(`transactionBuffer`): [`Transaction`](classes/Transaction.md)

decodeUnsignedTransaction takes a Buffer (as if from encodeUnsignedTransaction) and converts it to a txnBuilder.Transaction object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionBuffer` | `ArrayLike`\<`number`\> | the Uint8Array containing a transaction |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

transaction.ts:1312

___

### encodeAddress

▸ **encodeAddress**(`address`): `string`

encodeAddress takes an Algorand address as a Uint8Array and encodes it into a string with checksum.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `Uint8Array` | a raw Algorand address |

#### Returns

`string`

the address and checksum encoded as a string.

#### Defined in

encoding/address.ts:103

___

### encodeObj

▸ **encodeObj**(`o`): `Uint8Array`

encodeObj takes a javascript object and returns its msgpack encoding
Note that the encoding sorts the fields alphabetically

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `o` | `Record`\<`string` \| `number` \| `symbol`, `any`\> | js obj |

#### Returns

`Uint8Array`

Uint8Array binary representation

#### Defined in

main.ts:100

___

### encodeUint64

▸ **encodeUint64**(`num`): `Uint8Array`

encodeUint64 converts an integer to its binary representation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `num` | `number` \| `bigint` | The number to convert. This must be an unsigned integer less than 2^64. |

#### Returns

`Uint8Array`

An 8-byte typed array containing the big-endian encoding of the input
  integer.

#### Defined in

encoding/uint64.ts:15

___

### encodeUnsignedSimulateTransaction

▸ **encodeUnsignedSimulateTransaction**(`transactionObject`): `Uint8Array`

encodeUnsignedSimulateTransaction takes a txnBuilder.Transaction object,
converts it into a SignedTransaction-like object, and converts it to a Buffer.

Note: this function should only be used to simulate unsigned transactions.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionObject` | [`Transaction`](classes/Transaction.md) | Transaction object to simulate. |

#### Returns

`Uint8Array`

#### Defined in

transaction.ts:1289

___

### encodeUnsignedTransaction

▸ **encodeUnsignedTransaction**(`transactionObject`): `Uint8Array`

encodeUnsignedTransaction takes a completed txnBuilder.Transaction object, such as from the makeFoo
family of transactions, and converts it to a Buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionObject` | [`Transaction`](classes/Transaction.md) | the completed Transaction object |

#### Returns

`Uint8Array`

#### Defined in

transaction.ts:1303

___

### generateAccount

▸ **generateAccount**(): [`Account`](interfaces/Account.md)

generateAccount returns a new Algorand address and its corresponding secret key

#### Returns

[`Account`](interfaces/Account.md)

#### Defined in

account.ts:8

___

### getApplicationAddress

▸ **getApplicationAddress**(`appID`): `string`

Get the escrow address of an application.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appID` | `number` \| `bigint` | The ID of the application. |

#### Returns

`string`

The address corresponding to that application's escrow account.

#### Defined in

encoding/address.ts:188

___

### getMethodByName

▸ **getMethodByName**(`methods`, `name`): [`ABIMethod`](classes/ABIMethod.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `methods` | [`ABIMethod`](classes/ABIMethod.md)[] |
| `name` | `string` |

#### Returns

[`ABIMethod`](classes/ABIMethod.md)

#### Defined in

abi/method.ts:176

___

### instantiateTxnIfNeeded

▸ **instantiateTxnIfNeeded**(`transactionLike`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionLike` | [`TransactionLike`](modules.md#transactionlike) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

transaction.ts:1375

___

### isTransactionWithSigner

▸ **isTransactionWithSigner**(`value`): value is TransactionWithSigner

Check if a value conforms to the TransactionWithSigner structure.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | The value to check. |

#### Returns

value is TransactionWithSigner

True if an only if the value has the structure of a TransactionWithSigner.

#### Defined in

signer.ts:117

___

### isValidAddress

▸ **isValidAddress**(`address`): `boolean`

isValidAddress checks if a string is a valid Algorand address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` | an Algorand address with checksum. |

#### Returns

`boolean`

true if valid, false otherwise

#### Defined in

encoding/address.ts:88

___

### logicSigFromByte

▸ **logicSigFromByte**(`encoded`): [`LogicSig`](classes/LogicSig.md)

logicSigFromByte accepts encoded logic sig bytes and attempts to call logicsig.fromByte on it,
returning the result

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | `Uint8Array` |

#### Returns

[`LogicSig`](classes/LogicSig.md)

#### Defined in

logicsig.ts:472

___

### makeApplicationCallTxnFromObject

▸ **makeApplicationCallTxnFromObject**(`options`): [`Transaction`](classes/Transaction.md)

Generic function for creating any application call transaction.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.accounts` | `string`[] |
| `options.appArgs` | `Uint8Array`[] |
| `options.appIndex` | `number` |
| `options.approvalProgram` | `Uint8Array` |
| `options.boxes` | [`BoxReference`](interfaces/BoxReference.md)[] |
| `options.clearProgram` | `Uint8Array` |
| `options.extraPages` | `number` |
| `options.foreignApps` | `number`[] |
| `options.foreignAssets` | `number`[] |
| `options.from` | `string` |
| `options.lease` | `Uint8Array` |
| `options.note` | `Uint8Array` |
| `options.numGlobalByteSlices` | `number` |
| `options.numGlobalInts` | `number` |
| `options.numLocalByteSlices` | `number` |
| `options.numLocalInts` | `number` |
| `options.onComplete` | [`OnApplicationComplete`](enums/OnApplicationComplete.md) |
| `options.rekeyTo` | `string` |
| `options.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:1403

___

### makeApplicationClearStateTxn

▸ **makeApplicationClearStateTxn**(`from`, `suggestedParams`, `appIndex`, `appArgs?`, `accounts?`, `foreignApps?`, `foreignAssets?`, `note?`, `lease?`, `rekeyTo?`, `boxes?`): [`Transaction`](classes/Transaction.md)

Make a transaction that clears a user's state in an application

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | address of sender |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `appIndex` | `number` | the ID of the app to use |
| `appArgs?` | `Uint8Array`[] | Array of Uint8Array, any additional arguments to the application |
| `accounts?` | `string`[] | Array of Address strings, any additional accounts to supply to the application |
| `foreignApps?` | `number`[] | Array of int, any other apps used by the application, identified by index |
| `foreignAssets?` | `number`[] | Array of int, any assets used by the application, identified by index |
| `note?` | `Uint8Array` | Arbitrary data for sender to store |
| `lease?` | `Uint8Array` | Lease a transaction |
| `rekeyTo?` | `string` | String representation of the Algorand address that will be used to authorize all future transactions |
| `boxes?` | [`BoxReference`](interfaces/BoxReference.md)[] | Array of BoxReference, app ID and name of box to be accessed |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeApplicationClearStateTxnFromObject](modules.md#makeapplicationclearstatetxnfromobject)

#### Defined in

makeTxn.ts:1229

___

### makeApplicationClearStateTxnFromObject

▸ **makeApplicationClearStateTxnFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.accounts` | `string`[] |
| `o.appArgs` | `Uint8Array`[] |
| `o.appIndex` | `number` |
| `o.boxes` | [`BoxReference`](interfaces/BoxReference.md)[] |
| `o.foreignApps` | `number`[] |
| `o.foreignAssets` | `number`[] |
| `o.from` | `string` |
| `o.lease` | `Uint8Array` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:1261

___

### makeApplicationCloseOutTxn

▸ **makeApplicationCloseOutTxn**(`from`, `suggestedParams`, `appIndex`, `appArgs?`, `accounts?`, `foreignApps?`, `foreignAssets?`, `note?`, `lease?`, `rekeyTo?`, `boxes?`): [`Transaction`](classes/Transaction.md)

Make a transaction that closes out a user's state in an application

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | address of sender |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `appIndex` | `number` | the ID of the app to use |
| `appArgs?` | `Uint8Array`[] | Array of Uint8Array, any additional arguments to the application |
| `accounts?` | `string`[] | Array of Address strings, any additional accounts to supply to the application |
| `foreignApps?` | `number`[] | Array of int, any other apps used by the application, identified by index |
| `foreignAssets?` | `number`[] | Array of int, any assets used by the application, identified by index |
| `note?` | `Uint8Array` | Arbitrary data for sender to store |
| `lease?` | `Uint8Array` | Lease a transaction |
| `rekeyTo?` | `string` | String representation of the Algorand address that will be used to authorize all future transactions |
| `boxes?` | [`BoxReference`](interfaces/BoxReference.md)[] | Array of BoxReference, app ID and name of box to be accessed |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeApplicationCloseOutTxnFromObject](modules.md#makeapplicationcloseouttxnfromobject)

#### Defined in

makeTxn.ts:1133

___

### makeApplicationCloseOutTxnFromObject

▸ **makeApplicationCloseOutTxnFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.accounts` | `string`[] |
| `o.appArgs` | `Uint8Array`[] |
| `o.appIndex` | `number` |
| `o.boxes` | [`BoxReference`](interfaces/BoxReference.md)[] |
| `o.foreignApps` | `number`[] |
| `o.foreignAssets` | `number`[] |
| `o.from` | `string` |
| `o.lease` | `Uint8Array` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:1165

___

### makeApplicationCreateTxn

▸ **makeApplicationCreateTxn**(`from`, `suggestedParams`, `onComplete`, `approvalProgram`, `clearProgram`, `numLocalInts`, `numLocalByteSlices`, `numGlobalInts`, `numGlobalByteSlices`, `appArgs?`, `accounts?`, `foreignApps?`, `foreignAssets?`, `note?`, `lease?`, `rekeyTo?`, `extraPages?`, `boxes?`): [`Transaction`](classes/Transaction.md)

Make a transaction that will create an application.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | address of sender |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `onComplete` | [`OnApplicationComplete`](enums/OnApplicationComplete.md) | algosdk.OnApplicationComplete, what application should do once the program is done being run |
| `approvalProgram` | `Uint8Array` | Uint8Array, the compiled TEAL that approves a transaction |
| `clearProgram` | `Uint8Array` | Uint8Array, the compiled TEAL that runs when clearing state |
| `numLocalInts` | `number` | restricts number of ints in per-user local state |
| `numLocalByteSlices` | `number` | restricts number of byte slices in per-user local state |
| `numGlobalInts` | `number` | restricts number of ints in global state |
| `numGlobalByteSlices` | `number` | restricts number of byte slices in global state |
| `appArgs?` | `Uint8Array`[] | Array of Uint8Array, any additional arguments to the application |
| `accounts?` | `string`[] | Array of Address strings, any additional accounts to supply to the application |
| `foreignApps?` | `number`[] | Array of int, any other apps used by the application, identified by index |
| `foreignAssets?` | `number`[] | Array of int, any assets used by the application, identified by index |
| `note?` | `Uint8Array` | Arbitrary data for sender to store |
| `lease?` | `Uint8Array` | Lease a transaction |
| `rekeyTo?` | `string` | String representation of the Algorand address that will be used to authorize all future transactions |
| `extraPages?` | `number` | integer extra pages of memory to rent on creation of application |
| `boxes?` | [`BoxReference`](interfaces/BoxReference.md)[] | Array of BoxReference, app ID and name of box to be accessed |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeApplicationCreateTxnFromObject](modules.md#makeapplicationcreatetxnfromobject)

#### Defined in

makeTxn.ts:702

___

### makeApplicationCreateTxnFromObject

▸ **makeApplicationCreateTxnFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.accounts` | `string`[] |
| `o.appArgs` | `Uint8Array`[] |
| `o.approvalProgram` | `Uint8Array` |
| `o.boxes` | [`BoxReference`](interfaces/BoxReference.md)[] |
| `o.clearProgram` | `Uint8Array` |
| `o.extraPages` | `number` |
| `o.foreignApps` | `number`[] |
| `o.foreignAssets` | `number`[] |
| `o.from` | `string` |
| `o.lease` | `Uint8Array` |
| `o.note` | `Uint8Array` |
| `o.numGlobalByteSlices` | `number` |
| `o.numGlobalInts` | `number` |
| `o.numLocalByteSlices` | `number` |
| `o.numLocalInts` | `number` |
| `o.onComplete` | [`OnApplicationComplete`](enums/OnApplicationComplete.md) |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:748

___

### makeApplicationDeleteTxn

▸ **makeApplicationDeleteTxn**(`from`, `suggestedParams`, `appIndex`, `appArgs?`, `accounts?`, `foreignApps?`, `foreignAssets?`, `note?`, `lease?`, `rekeyTo?`, `boxes?`): [`Transaction`](classes/Transaction.md)

Make a transaction that deletes an application

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | address of sender |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `appIndex` | `number` | the ID of the app to be deleted |
| `appArgs?` | `Uint8Array`[] | Array of Uint8Array, any additional arguments to the application |
| `accounts?` | `string`[] | Array of Address strings, any additional accounts to supply to the application |
| `foreignApps?` | `number`[] | Array of int, any other apps used by the application, identified by index |
| `foreignAssets?` | `number`[] | Array of int, any assets used by the application, identified by index |
| `note?` | `Uint8Array` | Arbitrary data for sender to store |
| `lease?` | `Uint8Array` | Lease a transaction |
| `rekeyTo?` | `string` | String representation of the Algorand address that will be used to authorize all future transactions |
| `boxes?` | [`BoxReference`](interfaces/BoxReference.md)[] | Array of BoxReference, app ID and name of box to be accessed |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeApplicationDeleteTxnFromObject](modules.md#makeapplicationdeletetxnfromobject)

#### Defined in

makeTxn.ts:941

___

### makeApplicationDeleteTxnFromObject

▸ **makeApplicationDeleteTxnFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.accounts` | `string`[] |
| `o.appArgs` | `Uint8Array`[] |
| `o.appIndex` | `number` |
| `o.boxes` | [`BoxReference`](interfaces/BoxReference.md)[] |
| `o.foreignApps` | `number`[] |
| `o.foreignAssets` | `number`[] |
| `o.from` | `string` |
| `o.lease` | `Uint8Array` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:973

___

### makeApplicationNoOpTxn

▸ **makeApplicationNoOpTxn**(`from`, `suggestedParams`, `appIndex`, `appArgs?`, `accounts?`, `foreignApps?`, `foreignAssets?`, `note?`, `lease?`, `rekeyTo?`, `boxes?`): [`Transaction`](classes/Transaction.md)

Make a transaction that just calls an application, doing nothing on completion

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | address of sender |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `appIndex` | `number` | the ID of the app to use |
| `appArgs?` | `Uint8Array`[] | Array of Uint8Array, any additional arguments to the application |
| `accounts?` | `string`[] | Array of Address strings, any additional accounts to supply to the application |
| `foreignApps?` | `number`[] | Array of int, any other apps used by the application, identified by index |
| `foreignAssets?` | `number`[] | Array of int, any assets used by the application, identified by index |
| `note?` | `Uint8Array` | Arbitrary data for sender to store |
| `lease?` | `Uint8Array` | Lease a transaction |
| `rekeyTo?` | `string` | String representation of the Algorand address that will be used to authorize all future transactions |
| `boxes?` | [`BoxReference`](interfaces/BoxReference.md)[] | Array of BoxReference, app ID and name of box to be accessed |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeApplicationNoOpTxnFromObject](modules.md#makeapplicationnooptxnfromobject)

#### Defined in

makeTxn.ts:1325

___

### makeApplicationNoOpTxnFromObject

▸ **makeApplicationNoOpTxnFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.accounts` | `string`[] |
| `o.appArgs` | `Uint8Array`[] |
| `o.appIndex` | `number` |
| `o.boxes` | [`BoxReference`](interfaces/BoxReference.md)[] |
| `o.foreignApps` | `number`[] |
| `o.foreignAssets` | `number`[] |
| `o.from` | `string` |
| `o.lease` | `Uint8Array` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:1357

___

### makeApplicationOptInTxn

▸ **makeApplicationOptInTxn**(`from`, `suggestedParams`, `appIndex`, `appArgs?`, `accounts?`, `foreignApps?`, `foreignAssets?`, `note?`, `lease?`, `rekeyTo?`, `boxes?`): [`Transaction`](classes/Transaction.md)

Make a transaction that opts in to use an application

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | address of sender |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `appIndex` | `number` | the ID of the app to join |
| `appArgs?` | `Uint8Array`[] | Array of Uint8Array, any additional arguments to the application |
| `accounts?` | `string`[] | Array of Address strings, any additional accounts to supply to the application |
| `foreignApps?` | `number`[] | Array of int, any other apps used by the application, identified by index |
| `foreignAssets?` | `number`[] | Array of int, any assets used by the application, identified by index |
| `note?` | `Uint8Array` | Arbitrary data for sender to store |
| `lease?` | `Uint8Array` | Lease a transaction |
| `rekeyTo?` | `string` | String representation of the Algorand address that will be used to authorize all future transactions |
| `boxes?` | [`BoxReference`](interfaces/BoxReference.md)[] | Array of BoxReference, app ID and name of box to be accessed |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeApplicationOptInTxnFromObject](modules.md#makeapplicationoptintxnfromobject)

#### Defined in

makeTxn.ts:1037

___

### makeApplicationOptInTxnFromObject

▸ **makeApplicationOptInTxnFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.accounts` | `string`[] |
| `o.appArgs` | `Uint8Array`[] |
| `o.appIndex` | `number` |
| `o.boxes` | [`BoxReference`](interfaces/BoxReference.md)[] |
| `o.foreignApps` | `number`[] |
| `o.foreignAssets` | `number`[] |
| `o.from` | `string` |
| `o.lease` | `Uint8Array` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:1069

___

### makeApplicationUpdateTxn

▸ **makeApplicationUpdateTxn**(`from`, `suggestedParams`, `appIndex`, `approvalProgram`, `clearProgram`, `appArgs?`, `accounts?`, `foreignApps?`, `foreignAssets?`, `note?`, `lease?`, `rekeyTo?`, `boxes?`): [`Transaction`](classes/Transaction.md)

Make a transaction that changes an application's approval and clear programs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | address of sender |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `appIndex` | `number` | the ID of the app to be updated |
| `approvalProgram` | `Uint8Array` | Uint8Array, the compiled TEAL that approves a transaction |
| `clearProgram` | `Uint8Array` | Uint8Array, the compiled TEAL that runs when clearing state |
| `appArgs?` | `Uint8Array`[] | Array of Uint8Array, any additional arguments to the application |
| `accounts?` | `string`[] | Array of Address strings, any additional accounts to supply to the application |
| `foreignApps?` | `number`[] | Array of int, any other apps used by the application, identified by index |
| `foreignAssets?` | `number`[] | Array of int, any assets used by the application, identified by index |
| `note?` | `Uint8Array` | Arbitrary data for sender to store |
| `lease?` | `Uint8Array` | Lease a transaction |
| `rekeyTo?` | `string` | String representation of the Algorand address that will be used to authorize all future transactions |
| `boxes?` | [`BoxReference`](interfaces/BoxReference.md)[] | Array of BoxReference, app ID and name of box to be accessed |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeApplicationUpdateTxnFromObject](modules.md#makeapplicationupdatetxnfromobject)

#### Defined in

makeTxn.ts:835

___

### makeApplicationUpdateTxnFromObject

▸ **makeApplicationUpdateTxnFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.accounts` | `string`[] |
| `o.appArgs` | `Uint8Array`[] |
| `o.appIndex` | `number` |
| `o.approvalProgram` | `Uint8Array` |
| `o.boxes` | [`BoxReference`](interfaces/BoxReference.md)[] |
| `o.clearProgram` | `Uint8Array` |
| `o.foreignApps` | `number`[] |
| `o.foreignAssets` | `number`[] |
| `o.from` | `string` |
| `o.lease` | `Uint8Array` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:871

___

### makeAssetConfigTxnWithSuggestedParams

▸ **makeAssetConfigTxnWithSuggestedParams**(`from`, `note`, `assetIndex`, `manager`, `reserve`, `freeze`, `clawback`, `suggestedParams`, `strictEmptyAddressChecking?`, `rekeyTo?`): [`Transaction`](classes/Transaction.md)

makeAssetConfigTxnWithSuggestedParams can be issued by the asset manager to change the manager, reserve, freeze, or clawback
you must respecify existing addresses to keep them the same; leaving a field blank is the same as turning
that feature off for this asset

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `from` | `string` | `undefined` | string representation of Algorand address of sender |
| `note` | `Uint8Array` | `undefined` | uint8array of arbitrary data for sender to store |
| `assetIndex` | `number` | `undefined` | int asset index uniquely specifying the asset |
| `manager` | `string` | `undefined` | string representation of new asset manager Algorand address |
| `reserve` | `string` | `undefined` | string representation of new reserve Algorand address |
| `freeze` | `string` | `undefined` | string representation of new freeze manager Algorand address |
| `clawback` | `string` | `undefined` | string representation of new revocation manager Algorand address |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | `undefined` | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `strictEmptyAddressChecking` | `boolean` | `true` | boolean - throw an error if any of manager, reserve, freeze, or clawback are undefined. optional, defaults to true. |
| `rekeyTo?` | `string` | `undefined` | rekeyTo address, optional |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeAssetConfigTxnWithSuggestedParamsFromObject](modules.md#makeassetconfigtxnwithsuggestedparamsfromobject)

#### Defined in

makeTxn.ts:372

___

### makeAssetConfigTxnWithSuggestedParamsFromObject

▸ **makeAssetConfigTxnWithSuggestedParamsFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.assetIndex` | `number` |
| `o.clawback` | `string` |
| `o.freeze` | `string` |
| `o.from` | `string` |
| `o.manager` | `string` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.reserve` | `string` |
| `o.strictEmptyAddressChecking` | `boolean` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:411

___

### makeAssetCreateTxnWithSuggestedParams

▸ **makeAssetCreateTxnWithSuggestedParams**(`from`, `note`, `total`, `decimals`, `defaultFrozen`, `manager`, `reserve`, `freeze`, `clawback`, `unitName`, `assetName`, `assetURL`, `assetMetadataHash`, `suggestedParams`, `rekeyTo?`): [`Transaction`](classes/Transaction.md)

makeAssetCreateTxnWithSuggestedParams takes asset creation arguments and returns a Transaction object
for creating that asset

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | string representation of Algorand address of sender |
| `note` | `Uint8Array` | uint8array of arbitrary data for sender to store |
| `total` | `number` \| `bigint` | integer total supply of the asset |
| `decimals` | `number` | integer number of decimals for asset unit calculation |
| `defaultFrozen` | `boolean` | boolean whether asset accounts should default to being frozen |
| `manager` | `string` | string representation of Algorand address in charge of reserve, freeze, clawback, destruction, etc |
| `reserve` | `string` | string representation of Algorand address representing asset reserve |
| `freeze` | `string` | string representation of Algorand address with power to freeze/unfreeze asset holdings |
| `clawback` | `string` | string representation of Algorand address with power to revoke asset holdings |
| `unitName` | `string` | string units name for this asset |
| `assetName` | `string` | string name for this asset |
| `assetURL` | `string` | string URL relating to this asset |
| `assetMetadataHash` | `string` \| `Uint8Array` | Uint8Array or UTF-8 string representation of a hash commitment with respect to the asset. Must be exactly 32 bytes long. |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `rekeyTo?` | `string` | rekeyTo address, optional |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeAssetCreateTxnWithSuggestedParamsFromObject](modules.md#makeassetcreatetxnwithsuggestedparamsfromobject)

#### Defined in

makeTxn.ts:255

___

### makeAssetCreateTxnWithSuggestedParamsFromObject

▸ **makeAssetCreateTxnWithSuggestedParamsFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.assetMetadataHash` | `string` \| `Uint8Array` |
| `o.assetName` | `string` |
| `o.assetURL` | `string` |
| `o.clawback` | `string` |
| `o.decimals` | `number` |
| `o.defaultFrozen` | `boolean` |
| `o.freeze` | `string` |
| `o.from` | `string` |
| `o.manager` | `string` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.reserve` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |
| `o.total` | `number` \| `bigint` |
| `o.unitName` | `string` |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:294

___

### makeAssetDestroyTxnWithSuggestedParams

▸ **makeAssetDestroyTxnWithSuggestedParams**(`from`, `note`, `assetIndex`, `suggestedParams`, `rekeyTo?`): [`Transaction`](classes/Transaction.md)

makeAssetDestroyTxnWithSuggestedParams will allow the asset's manager to remove this asset from the ledger, so long
as all outstanding assets are held by the creator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | string representation of Algorand address of sender |
| `note` | `Uint8Array` | uint8array of arbitrary data for sender to store |
| `assetIndex` | `number` | int asset index uniquely specifying the asset |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `rekeyTo?` | `string` | rekeyTo address, optional |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeAssetDestroyTxnWithSuggestedParamsFromObject](modules.md#makeassetdestroytxnwithsuggestedparamsfromobject)

#### Defined in

makeTxn.ts:470

___

### makeAssetDestroyTxnWithSuggestedParamsFromObject

▸ **makeAssetDestroyTxnWithSuggestedParamsFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.assetIndex` | `number` |
| `o.from` | `string` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:489

___

### makeAssetFreezeTxnWithSuggestedParams

▸ **makeAssetFreezeTxnWithSuggestedParams**(`from`, `note`, `assetIndex`, `freezeTarget`, `freezeState`, `suggestedParams`, `rekeyTo?`): [`Transaction`](classes/Transaction.md)

makeAssetFreezeTxnWithSuggestedParams will allow the asset's freeze manager to freeze or un-freeze an account,
blocking or allowing asset transfers to and from the targeted account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | string representation of Algorand address of sender |
| `note` | `Uint8Array` | uint8array of arbitrary data for sender to store |
| `assetIndex` | `number` | int asset index uniquely specifying the asset |
| `freezeTarget` | `string` | string representation of Algorand address being frozen or unfrozen |
| `freezeState` | `boolean` | true if freezeTarget should be frozen, false if freezeTarget should be allowed to transact |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `rekeyTo?` | `string` | rekeyTo address, optional |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeAssetFreezeTxnWithSuggestedParamsFromObject](modules.md#makeassetfreezetxnwithsuggestedparamsfromobject)

#### Defined in

makeTxn.ts:530

___

### makeAssetFreezeTxnWithSuggestedParamsFromObject

▸ **makeAssetFreezeTxnWithSuggestedParamsFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.assetIndex` | `number` |
| `o.freezeState` | `boolean` |
| `o.freezeTarget` | `string` |
| `o.from` | `string` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:553

___

### makeAssetTransferTxnWithSuggestedParams

▸ **makeAssetTransferTxnWithSuggestedParams**(`from`, `to`, `closeRemainderTo`, `revocationTarget`, `amount`, `note`, `assetIndex`, `suggestedParams`, `rekeyTo?`): [`Transaction`](classes/Transaction.md)

makeAssetTransferTxnWithSuggestedParams allows for the creation of an asset transfer transaction.
Special case: to begin accepting assets, set amount=0 and from=to.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | string representation of Algorand address of sender |
| `to` | `string` | string representation of Algorand address of asset recipient |
| `closeRemainderTo` | `string` | optional - string representation of Algorand address - if provided, send all remaining assets after transfer to the "closeRemainderTo" address and close "from"'s asset holdings |
| `revocationTarget` | `string` | optional - string representation of Algorand address - if provided, and if "from" is the asset's revocation manager, then deduct from "revocationTarget" rather than "from" |
| `amount` | `number` \| `bigint` | integer amount of assets to send |
| `note` | `Uint8Array` | uint8array of arbitrary data for sender to store |
| `assetIndex` | `number` | int asset index uniquely specifying the asset |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE * flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `rekeyTo?` | `string` | rekeyTo address, optional |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeAssetTransferTxnWithSuggestedParamsFromObject](modules.md#makeassettransfertxnwithsuggestedparamsfromobject)

#### Defined in

makeTxn.ts:610

___

### makeAssetTransferTxnWithSuggestedParamsFromObject

▸ **makeAssetTransferTxnWithSuggestedParamsFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.amount` | `number` \| `bigint` |
| `o.assetIndex` | `number` |
| `o.closeRemainderTo` | `string` |
| `o.from` | `string` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.revocationTarget` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |
| `o.to` | `string` |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:637

___

### makeBasicAccountTransactionSigner

▸ **makeBasicAccountTransactionSigner**(`account`): [`TransactionSigner`](modules.md#transactionsigner)

Create a TransactionSigner that can sign transactions for the provided basic Account.

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | [`Account`](interfaces/Account.md) |

#### Returns

[`TransactionSigner`](modules.md#transactionsigner)

#### Defined in

signer.ts:23

___

### makeEmptyTransactionSigner

▸ **makeEmptyTransactionSigner**(): [`TransactionSigner`](modules.md#transactionsigner)

Create a makeEmptyTransactionSigner that does not specify any signer or
signing capabilities. This should only be used to simulate transactions.

#### Returns

[`TransactionSigner`](modules.md#transactionsigner)

#### Defined in

signer.ts:91

___

### makeKeyRegistrationTxnWithSuggestedParams

▸ **makeKeyRegistrationTxnWithSuggestedParams**(`from`, `note`, `voteKey`, `selectionKey`, `voteFirst`, `voteLast`, `voteKeyDilution`, `suggestedParams`, `rekeyTo?`, `nonParticipation?`, `stateProofKey?`): [`Transaction`](classes/Transaction.md)

makeKeyRegistrationTxnWithSuggestedParams takes key registration arguments and returns a Transaction object for
that key registration operation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | string representation of Algorand address of sender |
| `note` | `Uint8Array` | uint8array of arbitrary data for sender to store |
| `voteKey` | `string` \| `Uint8Array` | voting key. for key deregistration, leave undefined |
| `selectionKey` | `string` \| `Uint8Array` | selection key. for key deregistration, leave undefined |
| `voteFirst` | `number` | first round on which voteKey is valid |
| `voteLast` | `number` | last round on which voteKey is valid |
| `voteKeyDilution` | `number` | integer |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `rekeyTo?` | `string` | rekeyTo address, optional |
| `nonParticipation?` | ``false`` | configure whether the address wants to stop participating. If true, voteKey, selectionKey, voteFirst, voteLast, and voteKeyDilution must be undefined. |
| `stateProofKey?` | `string` \| `Uint8Array` | state proof key. for key deregistration, leave undefined |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makeKeyRegistrationTxnWithSuggestedParamsFromObject](modules.md#makekeyregistrationtxnwithsuggestedparamsfromobject)

#### Defined in

makeTxn.ts:119

▸ **makeKeyRegistrationTxnWithSuggestedParams**(`from`, `note`, `voteKey`, `selectionKey`, `voteFirst`, `voteLast`, `voteKeyDilution`, `suggestedParams`, `rekeyTo?`, `nonParticipation?`, `stateProofKey?`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `string` |
| `note` | `Uint8Array` |
| `voteKey` | `undefined` |
| `selectionKey` | `undefined` |
| `voteFirst` | `undefined` |
| `voteLast` | `undefined` |
| `voteKeyDilution` | `undefined` |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |
| `rekeyTo?` | `string` |
| `nonParticipation?` | `boolean` |
| `stateProofKey?` | `undefined` |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:132

___

### makeKeyRegistrationTxnWithSuggestedParamsFromObject

▸ **makeKeyRegistrationTxnWithSuggestedParamsFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.from` | `string` |
| `o.nonParticipation?` | ``false`` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.selectionKey` | `string` \| `Uint8Array` |
| `o.stateProofKey` | `string` \| `Uint8Array` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |
| `o.voteFirst` | `number` |
| `o.voteKey` | `string` \| `Uint8Array` |
| `o.voteKeyDilution` | `number` |
| `o.voteLast` | `number` |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:176

▸ **makeKeyRegistrationTxnWithSuggestedParamsFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.from` | `string` |
| `o.nonParticipation` | `boolean` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:199

___

### makeLogicSigAccountTransactionSigner

▸ **makeLogicSigAccountTransactionSigner**(`account`): [`TransactionSigner`](modules.md#transactionsigner)

Create a TransactionSigner that can sign transactions for the provided LogicSigAccount.

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | [`LogicSigAccount`](classes/LogicSigAccount.md) |

#### Returns

[`TransactionSigner`](modules.md#transactionsigner)

#### Defined in

signer.ts:40

___

### makeMultiSigAccountTransactionSigner

▸ **makeMultiSigAccountTransactionSigner**(`msig`, `sks`): [`TransactionSigner`](modules.md#transactionsigner)

Create a TransactionSigner that can sign transactions for the provided Multisig account.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msig` | [`MultisigMetadata`](interfaces/MultisigMetadata.md) | The Multisig account metadata |
| `sks` | `Uint8Array`[] | An array of private keys belonging to the msig which should sign the transactions. |

#### Returns

[`TransactionSigner`](modules.md#transactionsigner)

#### Defined in

signer.ts:60

___

### makePaymentTxnWithSuggestedParams

▸ **makePaymentTxnWithSuggestedParams**(`from`, `to`, `amount`, `closeRemainderTo`, `note`, `suggestedParams`, `rekeyTo?`): [`Transaction`](classes/Transaction.md)

makePaymentTxnWithSuggestedParams takes payment arguments and returns a Transaction object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | string representation of Algorand address of sender |
| `to` | `string` | string representation of Algorand address of recipient |
| `amount` | `number` \| `bigint` | integer amount to send, in microAlgos |
| `closeRemainderTo` | `string` | optionally close out remaining account balance to this account, represented as string rep of Algorand address |
| `note` | `Uint8Array` | uint8array of arbitrary data for sender to store |
| `suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) | a dict holding common-to-all-txns args: fee - integer fee per byte, in microAlgos. for a flat fee, set flatFee to true flatFee - bool optionally set this to true to specify fee as microalgos-per-txn If true, txn fee may fall below the ALGORAND_MIN_TX_FEE firstRound - integer first protocol round on which this txn is valid lastRound - integer last protocol round on which this txn is valid genesisHash - string specifies hash genesis block of network in use genesisID - string specifies genesis ID of network in use |
| `rekeyTo?` | `string` | rekeyTo address, optional |

#### Returns

[`Transaction`](classes/Transaction.md)

**`Deprecated`**

This function will be removed in v3 in favor of [makePaymentTxnWithSuggestedParamsFromObject](modules.md#makepaymenttxnwithsuggestedparamsfromobject)

#### Defined in

makeTxn.ts:45

___

### makePaymentTxnWithSuggestedParamsFromObject

▸ **makePaymentTxnWithSuggestedParamsFromObject**(`o`): [`Transaction`](classes/Transaction.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `Object` |
| `o.amount` | `number` \| `bigint` |
| `o.closeRemainderTo` | `string` |
| `o.from` | `string` |
| `o.note` | `Uint8Array` |
| `o.rekeyTo` | `string` |
| `o.suggestedParams` | [`SuggestedParams`](interfaces/SuggestedParams.md) |
| `o.to` | `string` |

#### Returns

[`Transaction`](classes/Transaction.md)

#### Defined in

makeTxn.ts:68

___

### masterDerivationKeyToMnemonic

▸ **masterDerivationKeyToMnemonic**(`mdk`): `string`

masterDerivationKeyToMnemonic takes a master derivation key and returns the corresponding mnemonic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mdk` | `Uint8Array` | Uint8Array |

#### Returns

`string`

string mnemonic

#### Defined in

mnemonic/mnemonic.ts:179

___

### mergeMultisigTransactions

▸ **mergeMultisigTransactions**(`multisigTxnBlobs`): `Uint8Array`

mergeMultisigTransactions takes a list of multisig transaction blobs, and merges them.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `multisigTxnBlobs` | `Uint8Array`[] | a list of blobs representing encoded multisig txns |

#### Returns

`Uint8Array`

typed array msg-pack encoded multisig txn

#### Defined in

multisig.ts:230

___

### microalgosToAlgos

▸ **microalgosToAlgos**(`microalgos`): `number`

microalgosToAlgos converts microalgos to algos

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `microalgos` | `number` | number |

#### Returns

`number`

number

#### Defined in

convert.ts:10

___

### mnemonicFromSeed

▸ **mnemonicFromSeed**(`seed`): `string`

mnemonicFromSeed converts a 32-byte key into a 25 word mnemonic. The generated mnemonic includes a checksum.
Each word in the mnemonic represents 11 bits of data, and the last 11 bits are reserved for the checksum.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `Uint8Array` | 32 bytes long seed |

#### Returns

`string`

25 words mnemonic

#### Defined in

mnemonic/mnemonic.ts:54

___

### mnemonicToMasterDerivationKey

▸ **mnemonicToMasterDerivationKey**(`mn`): `Uint8Array`

mnemonicToMasterDerivationKey takes a mnemonic string and returns the corresponding master derivation key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mn` | `string` | 25 words Algorand mnemonic |

#### Returns

`Uint8Array`

Uint8Array

**`Throws`**

error if fails to decode the mnemonic

#### Defined in

mnemonic/mnemonic.ts:170

___

### mnemonicToSecretKey

▸ **mnemonicToSecretKey**(`mn`): [`Account`](interfaces/Account.md)

mnemonicToSecretKey takes a mnemonic string and returns the corresponding Algorand address and its secret key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mn` | `string` | 25 words Algorand mnemonic |

#### Returns

[`Account`](interfaces/Account.md)

**`Throws`**

error if fails to decode the mnemonic

#### Defined in

mnemonic/mnemonic.ts:146

___

### multisigAddress

▸ **multisigAddress**(`«destructured»`): `string`

multisigAddress takes multisig metadata (preimage) and returns the corresponding human readable Algorand address.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`MultisigMetadata`](interfaces/MultisigMetadata.md) |

#### Returns

`string`

#### Defined in

multisig.ts:490

___

### secretKeyToMnemonic

▸ **secretKeyToMnemonic**(`sk`): `string`

secretKeyToMnemonic takes an Algorand secret key and returns the corresponding mnemonic.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sk` | `Uint8Array` | Algorand secret key |

#### Returns

`string`

Secret key's associated mnemonic

#### Defined in

mnemonic/mnemonic.ts:158

___

### seedFromMnemonic

▸ **seedFromMnemonic**(`mnemonic`): `Uint8Array`

seedFromMnemonic converts a mnemonic generated using this library into the source key used to create it.
It returns an error if the passed mnemonic has an incorrect checksum, if the number of words is unexpected, or if one
of the passed words is not found in the words list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mnemonic` | `string` | 25 words mnemonic |

#### Returns

`Uint8Array`

32 bytes long seed

#### Defined in

mnemonic/mnemonic.ts:100

___

### signBid

▸ **signBid**(`bid`, `sk`): `Uint8Array`

signBid takes an object with the following fields: bidder key, bid amount, max price, bid ID, auctionKey, auction ID,
and a secret key and returns a signed blob to be inserted into a transaction Algorand note field.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bid` | `BidOptions` | Algorand Bid |
| `sk` | `Uint8Array` | Algorand secret key |

#### Returns

`Uint8Array`

Uint8Array binary signed bid

#### Defined in

main.ts:56

___

### signBytes

▸ **signBytes**(`bytes`, `sk`): `Uint8Array`

signBytes takes arbitrary bytes and a secret key, prepends the bytes with "MX" for domain separation, signs the bytes
with the private key, and returns the signature.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | Uint8array |
| `sk` | `Uint8Array` | Algorand secret key |

#### Returns

`Uint8Array`

binary signature

#### Defined in

main.ts:68

___

### signLogicSigTransaction

▸ **signLogicSigTransaction**(`txn`, `lsigObject`): `Object`

signLogicSigTransaction takes a transaction and a LogicSig object and returns
a signed transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txn` | [`TransactionLike`](modules.md#transactionlike) | The transaction to sign. |
| `lsigObject` | [`LogicSig`](classes/LogicSig.md) \| [`LogicSigAccount`](classes/LogicSigAccount.md) | The LogicSig object that will sign the transaction. |

#### Returns

`Object`

Object containing txID and blob representing signed transaction.

| Name | Type |
| :------ | :------ |
| `blob` | `Uint8Array` |
| `txID` | `string` |

**`Throws`**

error on failure

#### Defined in

logicsig.ts:460

___

### signLogicSigTransactionObject

▸ **signLogicSigTransactionObject**(`txn`, `lsigObject`): `Object`

signLogicSigTransactionObject takes a transaction and a LogicSig object and
returns a signed transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txn` | [`Transaction`](classes/Transaction.md) | The transaction to sign. |
| `lsigObject` | [`LogicSig`](classes/LogicSig.md) \| [`LogicSigAccount`](classes/LogicSigAccount.md) | The LogicSig object that will sign the transaction. |

#### Returns

`Object`

Object containing txID and blob representing signed transaction.

| Name | Type |
| :------ | :------ |
| `blob` | `Uint8Array` |
| `txID` | `string` |

#### Defined in

logicsig.ts:416

___

### signMultisigTransaction

▸ **signMultisigTransaction**(`txn`, `«destructured»`, `sk`): `Object`

signMultisigTransaction takes a raw transaction (see signTransaction), a multisig preimage, a secret key, and returns
a multisig transaction, which is a blob representing a transaction and multisignature account preimage. The returned
multisig txn can accumulate additional signatures through mergeMultisigTransactions or appendSignMultisigTransaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txn` | [`TransactionLike`](modules.md#transactionlike) | object with either payment or key registration fields |
| `«destructured»` | [`MultisigMetadata`](interfaces/MultisigMetadata.md) | - |
| `sk` | `Uint8Array` | Algorand secret key. The corresponding pk should be in the pre image. |

#### Returns

`Object`

object containing txID, and blob of partially signed multisig transaction (with multisig preimage information)
If the final calculated fee is lower than the protocol minimum fee, the fee will be increased to match the minimum.

| Name | Type |
| :------ | :------ |
| `blob` | `Uint8Array` |
| `txID` | `string` |

#### Defined in

multisig.ts:380

___

### signTransaction

▸ **signTransaction**(`txn`, `sk`): `Object`

signTransaction takes an object with either payment or key registration fields and
a secret key and returns a signed blob.

Payment transaction fields: from, to, amount, fee, firstRound, lastRound, genesisHash,
note(optional), GenesisID(optional), closeRemainderTo(optional)

Key registration fields: fee, firstRound, lastRound, voteKey, selectionKey, voteFirst,
voteLast, voteKeyDilution, genesisHash, note(optional), GenesisID(optional)

If flatFee is not set and the final calculated fee is lower than the protocol minimum fee, the fee will be increased to match the minimum.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txn` | [`TransactionLike`](modules.md#transactionlike) | object with either payment or key registration fields |
| `sk` | `Uint8Array` | Algorand Secret Key |

#### Returns

`Object`

object contains the binary signed transaction and its txID

| Name | Type |
| :------ | :------ |
| `blob` | `Uint8Array` |
| `txID` | `string` |

#### Defined in

main.ts:31

___

### tealSign

▸ **tealSign**(`sk`, `data`, `programHash`): `Uint8Array`

tealSign creates a signature compatible with ed25519verify opcode from program hash

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sk` | `Uint8Array` | uint8array with secret key |
| `data` | `Uint8Array` \| `Buffer` | buffer with data to sign |
| `programHash` | `string` | string representation of teal program hash (= contract address for LogicSigs) |

#### Returns

`Uint8Array`

#### Defined in

logicsig.ts:484

___

### tealSignFromProgram

▸ **tealSignFromProgram**(`sk`, `data`, `program`): `Uint8Array`

tealSignFromProgram creates a signature compatible with ed25519verify opcode from raw program bytes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sk` | `Uint8Array` | uint8array with secret key |
| `data` | `Uint8Array` \| `Buffer` | buffer with data to sign |
| `program` | `Uint8Array` | buffer with teal program |

#### Returns

`Uint8Array`

#### Defined in

logicsig.ts:528

___

### verifyBytes

▸ **verifyBytes**(`bytes`, `signature`, `addr`): `boolean`

verifyBytes takes array of bytes, an address, and a signature and verifies if the signature is correct for the public
key and the bytes (the bytes should have been signed with "MX" prepended for domain separation).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bytes` | `Uint8Array` | Uint8Array |
| `signature` | `Uint8Array` | binary signature |
| `addr` | `string` | string address |

#### Returns

`boolean`

bool

#### Defined in

main.ts:82

___

### verifyMultisig

▸ **verifyMultisig**(`toBeVerified`, `msig`, `publicKey`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `toBeVerified` | `Uint8Array` |
| `msig` | [`EncodedMultisig`](interfaces/EncodedMultisig.md) |
| `publicKey` | `Uint8Array` |

#### Returns

`boolean`

#### Defined in

multisig.ts:317

___

### verifyTealSign

▸ **verifyTealSign**(`data`, `programHash`, `sig`, `pk`): `boolean`

verifyTealSign verifies a signature as would the ed25519verify opcode

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Uint8Array` \| `Buffer` | buffer with original signed data |
| `programHash` | `string` | string representation of teal program hash (= contract address for LogicSigs) |
| `sig` | `Uint8Array` | uint8array with the signature to verify (produced by tealSign/tealSignFromProgram) |
| `pk` | `Uint8Array` | uint8array with public key to verify against |

#### Returns

`boolean`

#### Defined in

logicsig.ts:506

___

### waitForConfirmation

▸ **waitForConfirmation**(`client`, `txid`, `waitRounds`): `Promise`\<`Record`\<`string`, `any`\>\>

Wait until a transaction has been confirmed or rejected by the network, or
until 'waitRounds' number of rounds have passed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Algodv2`](classes/Algodv2.md) | An Algodv2 client |
| `txid` | `string` | The ID of the transaction to wait for. |
| `waitRounds` | `number` | The maximum number of rounds to wait for. |

#### Returns

`Promise`\<`Record`\<`string`, `any`\>\>

A promise that, upon success, will resolve to the output of the
  `pendingTransactionInformation` call for the confirmed transaction.

#### Defined in

wait.ts:12
