[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / StateProof

# Class: StateProof

[modelsv2](../modules/modelsv2.md).StateProof

Represents a state proof and its corresponding message

## Hierarchy

- `default`

  ↳ **`StateProof`**

## Table of contents

### Constructors

- [constructor](modelsv2.StateProof.md#constructor)

### Properties

- [attribute\_map](modelsv2.StateProof.md#attribute_map)
- [message](modelsv2.StateProof.md#message)
- [stateproof](modelsv2.StateProof.md#stateproof)

### Methods

- [get\_obj\_for\_encoding](modelsv2.StateProof.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.StateProof.md#from_obj_for_encoding)

## Constructors

### constructor

• **new StateProof**(`«destructured»`)

Creates a new `StateProof` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `message` | [`StateProofMessage`](modelsv2.StateProofMessage.md) |
| › `stateproof` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:5401

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### message

• **message**: [`StateProofMessage`](modelsv2.StateProofMessage.md)

Represents the message that the state proofs are attesting to.

#### Defined in

client/v2/algod/models/types.ts:5389

___

### stateproof

• **stateproof**: `Uint8Array`

The encoded StateProof for the message.

#### Defined in

client/v2/algod/models/types.ts:5394

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

▸ `Static` **from_obj_for_encoding**(`data`): [`StateProof`](modelsv2.StateProof.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`StateProof`](modelsv2.StateProof.md)

#### Defined in

client/v2/algod/models/types.ts:5422
