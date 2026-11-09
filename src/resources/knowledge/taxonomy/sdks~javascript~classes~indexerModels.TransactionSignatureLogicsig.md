[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionSignatureLogicsig

# Class: TransactionSignatureLogicsig

[indexerModels](../modules/indexerModels.md).TransactionSignatureLogicsig

(lsig) Programatic transaction signature.
Definition:
data/transactions/logicsig.go

## Hierarchy

- `default`

  ↳ **`TransactionSignatureLogicsig`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionSignatureLogicsig.md#constructor)

### Properties

- [args](indexerModels.TransactionSignatureLogicsig.md#args)
- [attribute\_map](indexerModels.TransactionSignatureLogicsig.md#attribute_map)
- [logic](indexerModels.TransactionSignatureLogicsig.md#logic)
- [multisigSignature](indexerModels.TransactionSignatureLogicsig.md#multisigsignature)
- [signature](indexerModels.TransactionSignatureLogicsig.md#signature)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionSignatureLogicsig.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionSignatureLogicsig.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionSignatureLogicsig**(`«destructured»`)

Creates a new `TransactionSignatureLogicsig` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `args?` | `Uint8Array`[] |
| › `logic` | `string` \| `Uint8Array` |
| › `multisigSignature?` | [`TransactionSignatureMultisig`](indexerModels.TransactionSignatureMultisig.md) |
| › `signature?` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:5471

## Properties

### args

• `Optional` **args**: `Uint8Array`[]

(arg) Logic arguments, base64 encoded.

#### Defined in

client/v2/indexer/models/types.ts:5447

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### logic

• **logic**: `Uint8Array`

(l) Program signed by a signature or multi signature, or hashed to be the
address of ana ccount. Base64 encoded TEAL program.

#### Defined in

client/v2/indexer/models/types.ts:5442

___

### multisigSignature

• `Optional` **multisigSignature**: [`TransactionSignatureMultisig`](indexerModels.TransactionSignatureMultisig.md)

(msig) structure holding multiple subsignatures.
Definition:
crypto/multisig.go : MultisigSig

#### Defined in

client/v2/indexer/models/types.ts:5454

___

### signature

• `Optional` **signature**: `Uint8Array`

(sig) ed25519 signature.

#### Defined in

client/v2/indexer/models/types.ts:5459

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionSignatureLogicsig`](indexerModels.TransactionSignatureLogicsig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionSignatureLogicsig`](indexerModels.TransactionSignatureLogicsig.md)

#### Defined in

client/v2/indexer/models/types.ts:5503
