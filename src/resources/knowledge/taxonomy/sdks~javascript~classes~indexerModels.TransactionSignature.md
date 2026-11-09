[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionSignature

# Class: TransactionSignature

[indexerModels](../modules/indexerModels.md).TransactionSignature

Validation signature associated with some data. Only one of the signatures
should be provided.

## Hierarchy

- `default`

  ↳ **`TransactionSignature`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionSignature.md#constructor)

### Properties

- [attribute\_map](indexerModels.TransactionSignature.md#attribute_map)
- [logicsig](indexerModels.TransactionSignature.md#logicsig)
- [multisig](indexerModels.TransactionSignature.md#multisig)
- [sig](indexerModels.TransactionSignature.md#sig)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionSignature.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionSignature.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionSignature**(`«destructured»`)

Creates a new `TransactionSignature` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `logicsig?` | [`TransactionSignatureLogicsig`](indexerModels.TransactionSignatureLogicsig.md) |
| › `multisig?` | [`TransactionSignatureMultisig`](indexerModels.TransactionSignatureMultisig.md) |
| › `sig?` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:5388

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### logicsig

• `Optional` **logicsig**: [`TransactionSignatureLogicsig`](indexerModels.TransactionSignatureLogicsig.md)

(lsig) Programatic transaction signature.
Definition:
data/transactions/logicsig.go

#### Defined in

client/v2/indexer/models/types.ts:5364

___

### multisig

• `Optional` **multisig**: [`TransactionSignatureMultisig`](indexerModels.TransactionSignatureMultisig.md)

(msig) structure holding multiple subsignatures.
Definition:
crypto/multisig.go : MultisigSig

#### Defined in

client/v2/indexer/models/types.ts:5371

___

### sig

• `Optional` **sig**: `Uint8Array`

(sig) Standard ed25519 signature.

#### Defined in

client/v2/indexer/models/types.ts:5376

## Methods

### get\_obj\_for\_encoding

▸ **get_obj_for_encoding**(`binary?`): `Record`\<`string`, `any`\>

Get an object ready for encoding to either JSON or msgpack.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `binary` | `boolean` | `false` | Use true to indicate that the encoding can handle raw binary objects (Uint8Arrays). Use false to indicate that raw binary objects should be converted to base64 strings. True should be used for objects that will be encoded with msgpack, and false should be used for objects that will be encoded with JSON. |

#### Returns

`Record`\<`string`, `any`\>

#### Inherited from

BaseModel.get\_obj\_for\_encoding

#### Defined in

client/v2/basemodel.ts:65

___

### from\_obj\_for\_encoding

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionSignature`](indexerModels.TransactionSignature.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionSignature`](indexerModels.TransactionSignature.md)

#### Defined in

client/v2/indexer/models/types.ts:5413
