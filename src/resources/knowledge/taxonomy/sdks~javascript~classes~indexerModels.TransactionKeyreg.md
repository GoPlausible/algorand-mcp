[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionKeyreg

# Class: TransactionKeyreg

[indexerModels](../modules/indexerModels.md).TransactionKeyreg

Fields for a keyreg transaction.
Definition:
data/transactions/keyreg.go : KeyregTxnFields

## Hierarchy

- `default`

  ↳ **`TransactionKeyreg`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionKeyreg.md#constructor)

### Properties

- [attribute\_map](indexerModels.TransactionKeyreg.md#attribute_map)
- [nonParticipation](indexerModels.TransactionKeyreg.md#nonparticipation)
- [selectionParticipationKey](indexerModels.TransactionKeyreg.md#selectionparticipationkey)
- [stateProofKey](indexerModels.TransactionKeyreg.md#stateproofkey)
- [voteFirstValid](indexerModels.TransactionKeyreg.md#votefirstvalid)
- [voteKeyDilution](indexerModels.TransactionKeyreg.md#votekeydilution)
- [voteLastValid](indexerModels.TransactionKeyreg.md#votelastvalid)
- [voteParticipationKey](indexerModels.TransactionKeyreg.md#voteparticipationkey)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionKeyreg.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionKeyreg.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionKeyreg**(`«destructured»`)

Creates a new `TransactionKeyreg` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `nonParticipation?` | `boolean` |
| › `selectionParticipationKey?` | `string` \| `Uint8Array` |
| › `stateProofKey?` | `string` \| `Uint8Array` |
| › `voteFirstValid?` | `number` \| `bigint` |
| › `voteKeyDilution?` | `number` \| `bigint` |
| › `voteLastValid?` | `number` \| `bigint` |
| › `voteParticipationKey?` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:5150

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### nonParticipation

• `Optional` **nonParticipation**: `boolean`

(nonpart) Mark the account as participating or non-participating.

#### Defined in

client/v2/indexer/models/types.ts:5106

___

### selectionParticipationKey

• `Optional` **selectionParticipationKey**: `Uint8Array`

(selkey) Public key used with the Verified Random Function (VRF) result during
committee selection.

#### Defined in

client/v2/indexer/models/types.ts:5112

___

### stateProofKey

• `Optional` **stateProofKey**: `Uint8Array`

(sprfkey) State proof key used in key registration transactions.

#### Defined in

client/v2/indexer/models/types.ts:5117

___

### voteFirstValid

• `Optional` **voteFirstValid**: `number` \| `bigint`

(votefst) First round this participation key is valid.

#### Defined in

client/v2/indexer/models/types.ts:5122

___

### voteKeyDilution

• `Optional` **voteKeyDilution**: `number` \| `bigint`

(votekd) Number of subkeys in each batch of participation keys.

#### Defined in

client/v2/indexer/models/types.ts:5127

___

### voteLastValid

• `Optional` **voteLastValid**: `number` \| `bigint`

(votelst) Last round this participation key is valid.

#### Defined in

client/v2/indexer/models/types.ts:5132

___

### voteParticipationKey

• `Optional` **voteParticipationKey**: `Uint8Array`

(votekey) Participation public key used in key registration transactions.

#### Defined in

client/v2/indexer/models/types.ts:5137

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionKeyreg`](indexerModels.TransactionKeyreg.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionKeyreg`](indexerModels.TransactionKeyreg.md)

#### Defined in

client/v2/indexer/models/types.ts:5197
