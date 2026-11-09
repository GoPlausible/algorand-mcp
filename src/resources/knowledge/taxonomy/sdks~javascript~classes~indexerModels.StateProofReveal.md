[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / StateProofReveal

# Class: StateProofReveal

[indexerModels](../modules/indexerModels.md).StateProofReveal

## Hierarchy

- `default`

  ↳ **`StateProofReveal`**

## Table of contents

### Constructors

- [constructor](indexerModels.StateProofReveal.md#constructor)

### Properties

- [attribute\_map](indexerModels.StateProofReveal.md#attribute_map)
- [participant](indexerModels.StateProofReveal.md#participant)
- [position](indexerModels.StateProofReveal.md#position)
- [sigSlot](indexerModels.StateProofReveal.md#sigslot)

### Methods

- [get\_obj\_for\_encoding](indexerModels.StateProofReveal.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.StateProofReveal.md#from_obj_for_encoding)

## Constructors

### constructor

• **new StateProofReveal**(`«destructured»`)

Creates a new `StateProofReveal` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `participant?` | [`StateProofParticipant`](indexerModels.StateProofParticipant.md) |
| › `position?` | `number` \| `bigint` |
| › `sigSlot?` | [`StateProofSigSlot`](indexerModels.StateProofSigSlot.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3653

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### participant

• `Optional` **participant**: [`StateProofParticipant`](indexerModels.StateProofParticipant.md)

(p)

#### Defined in

client/v2/indexer/models/types.ts:3633

___

### position

• `Optional` **position**: `number` \| `bigint`

The position in the signature and participants arrays corresponding to this
entry.

#### Defined in

client/v2/indexer/models/types.ts:3639

___

### sigSlot

• `Optional` **sigSlot**: [`StateProofSigSlot`](indexerModels.StateProofSigSlot.md)

(s)

#### Defined in

client/v2/indexer/models/types.ts:3644

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

▸ `Static` **from_obj_for_encoding**(`data`): [`StateProofReveal`](indexerModels.StateProofReveal.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`StateProofReveal`](indexerModels.StateProofReveal.md)

#### Defined in

client/v2/indexer/models/types.ts:3675
