[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / StateProofSigSlot

# Class: StateProofSigSlot

[indexerModels](../modules/indexerModels.md).StateProofSigSlot

## Hierarchy

- `default`

  ↳ **`StateProofSigSlot`**

## Table of contents

### Constructors

- [constructor](indexerModels.StateProofSigSlot.md#constructor)

### Properties

- [attribute\_map](indexerModels.StateProofSigSlot.md#attribute_map)
- [lowerSigWeight](indexerModels.StateProofSigSlot.md#lowersigweight)
- [signature](indexerModels.StateProofSigSlot.md#signature)

### Methods

- [get\_obj\_for\_encoding](indexerModels.StateProofSigSlot.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.StateProofSigSlot.md#from_obj_for_encoding)

## Constructors

### constructor

• **new StateProofSigSlot**(`«destructured»`)

Creates a new `StateProofSigSlot` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `lowerSigWeight?` | `number` \| `bigint` |
| › `signature?` | [`StateProofSignature`](indexerModels.StateProofSignature.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3705

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### lowerSigWeight

• `Optional` **lowerSigWeight**: `number` \| `bigint`

(l) The total weight of signatures in the lower-numbered slots.

#### Defined in

client/v2/indexer/models/types.ts:3696

___

### signature

• `Optional` **signature**: [`StateProofSignature`](indexerModels.StateProofSignature.md)

#### Defined in

client/v2/indexer/models/types.ts:3698

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

▸ `Static` **from_obj_for_encoding**(`data`): [`StateProofSigSlot`](indexerModels.StateProofSigSlot.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`StateProofSigSlot`](indexerModels.StateProofSigSlot.md)

#### Defined in

client/v2/indexer/models/types.ts:3723
