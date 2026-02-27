[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / StateProofParticipant

# Class: StateProofParticipant

[indexerModels](../modules/indexerModels.md).StateProofParticipant

## Hierarchy

- `default`

  ↳ **`StateProofParticipant`**

## Table of contents

### Constructors

- [constructor](indexerModels.StateProofParticipant.md#constructor)

### Properties

- [attribute\_map](indexerModels.StateProofParticipant.md#attribute_map)
- [verifier](indexerModels.StateProofParticipant.md#verifier)
- [weight](indexerModels.StateProofParticipant.md#weight)

### Methods

- [get\_obj\_for\_encoding](indexerModels.StateProofParticipant.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.StateProofParticipant.md#from_obj_for_encoding)

## Constructors

### constructor

• **new StateProofParticipant**(`«destructured»`)

Creates a new `StateProofParticipant` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `verifier?` | [`StateProofVerifier`](indexerModels.StateProofVerifier.md) |
| › `weight?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3596

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### verifier

• `Optional` **verifier**: [`StateProofVerifier`](indexerModels.StateProofVerifier.md)

(p)

#### Defined in

client/v2/indexer/models/types.ts:3584

___

### weight

• `Optional` **weight**: `number` \| `bigint`

(w)

#### Defined in

client/v2/indexer/models/types.ts:3589

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

▸ `Static` **from_obj_for_encoding**(`data`): [`StateProofParticipant`](indexerModels.StateProofParticipant.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`StateProofParticipant`](indexerModels.StateProofParticipant.md)

#### Defined in

client/v2/indexer/models/types.ts:3614
