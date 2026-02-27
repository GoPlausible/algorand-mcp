[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionSignatureMultisigSubsignature

# Class: TransactionSignatureMultisigSubsignature

[indexerModels](../modules/indexerModels.md).TransactionSignatureMultisigSubsignature

## Hierarchy

- `default`

  ↳ **`TransactionSignatureMultisigSubsignature`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionSignatureMultisigSubsignature.md#constructor)

### Properties

- [attribute\_map](indexerModels.TransactionSignatureMultisigSubsignature.md#attribute_map)
- [publicKey](indexerModels.TransactionSignatureMultisigSubsignature.md#publickey)
- [signature](indexerModels.TransactionSignatureMultisigSubsignature.md#signature)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionSignatureMultisigSubsignature.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionSignatureMultisigSubsignature.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionSignatureMultisigSubsignature**(`«destructured»`)

Creates a new `TransactionSignatureMultisigSubsignature` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `publicKey?` | `string` \| `Uint8Array` |
| › `signature?` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:5607

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### publicKey

• `Optional` **publicKey**: `Uint8Array`

(pk)

#### Defined in

client/v2/indexer/models/types.ts:5595

___

### signature

• `Optional` **signature**: `Uint8Array`

(s)

#### Defined in

client/v2/indexer/models/types.ts:5600

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionSignatureMultisigSubsignature`](indexerModels.TransactionSignatureMultisigSubsignature.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionSignatureMultisigSubsignature`](indexerModels.TransactionSignatureMultisigSubsignature.md)

#### Defined in

client/v2/indexer/models/types.ts:5631
