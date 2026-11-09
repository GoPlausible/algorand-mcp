[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionSignatureMultisig

# Class: TransactionSignatureMultisig

[indexerModels](../modules/indexerModels.md).TransactionSignatureMultisig

(msig) structure holding multiple subsignatures.
Definition:
crypto/multisig.go : MultisigSig

## Hierarchy

- `default`

  ↳ **`TransactionSignatureMultisig`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionSignatureMultisig.md#constructor)

### Properties

- [attribute\_map](indexerModels.TransactionSignatureMultisig.md#attribute_map)
- [subsignature](indexerModels.TransactionSignatureMultisig.md#subsignature)
- [threshold](indexerModels.TransactionSignatureMultisig.md#threshold)
- [version](indexerModels.TransactionSignatureMultisig.md#version)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionSignatureMultisig.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionSignatureMultisig.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionSignatureMultisig**(`«destructured»`)

Creates a new `TransactionSignatureMultisig` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `subsignature?` | [`TransactionSignatureMultisigSubsignature`](indexerModels.TransactionSignatureMultisigSubsignature.md)[] |
| › `threshold?` | `number` \| `bigint` |
| › `version?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:5551

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### subsignature

• `Optional` **subsignature**: [`TransactionSignatureMultisigSubsignature`](indexerModels.TransactionSignatureMultisigSubsignature.md)[]

(subsig) holds pairs of public key and signatures.

#### Defined in

client/v2/indexer/models/types.ts:5533

___

### threshold

• `Optional` **threshold**: `number` \| `bigint`

(thr)

#### Defined in

client/v2/indexer/models/types.ts:5538

___

### version

• `Optional` **version**: `number` \| `bigint`

(v)

#### Defined in

client/v2/indexer/models/types.ts:5543

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionSignatureMultisig`](indexerModels.TransactionSignatureMultisig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionSignatureMultisig`](indexerModels.TransactionSignatureMultisig.md)

#### Defined in

client/v2/indexer/models/types.ts:5573
