[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / TransactionProofResponse

# Class: TransactionProofResponse

[modelsv2](../modules/modelsv2.md).TransactionProofResponse

Proof of transaction in a block.

## Hierarchy

- `default`

  ↳ **`TransactionProofResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.TransactionProofResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.TransactionProofResponse.md#attribute_map)
- [hashtype](modelsv2.TransactionProofResponse.md#hashtype)
- [idx](modelsv2.TransactionProofResponse.md#idx)
- [proof](modelsv2.TransactionProofResponse.md#proof)
- [stibhash](modelsv2.TransactionProofResponse.md#stibhash)
- [treedepth](modelsv2.TransactionProofResponse.md#treedepth)

### Methods

- [get\_obj\_for\_encoding](modelsv2.TransactionProofResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.TransactionProofResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionProofResponse**(`«destructured»`)

Creates a new `TransactionProofResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `hashtype?` | `string` |
| › `idx` | `number` \| `bigint` |
| › `proof` | `string` \| `Uint8Array` |
| › `stibhash` | `string` \| `Uint8Array` |
| › `treedepth` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:5932

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### hashtype

• `Optional` **hashtype**: `string`

The type of hash function used to create the proof, must be one of:
* sha512_256
* sha256

#### Defined in

client/v2/algod/models/types.ts:5919

___

### idx

• **idx**: `number` \| `bigint`

Index of the transaction in the block's payset.

#### Defined in

client/v2/algod/models/types.ts:5896

___

### proof

• **proof**: `Uint8Array`

Proof of transaction membership.

#### Defined in

client/v2/algod/models/types.ts:5901

___

### stibhash

• **stibhash**: `Uint8Array`

Hash of SignedTxnInBlock for verifying proof.

#### Defined in

client/v2/algod/models/types.ts:5906

___

### treedepth

• **treedepth**: `number` \| `bigint`

Represents the depth of the tree that is being proven, i.e. the number of edges
from a leaf to the root.

#### Defined in

client/v2/algod/models/types.ts:5912

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionProofResponse`](modelsv2.TransactionProofResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionProofResponse`](modelsv2.TransactionProofResponse.md)

#### Defined in

client/v2/algod/models/types.ts:5968
