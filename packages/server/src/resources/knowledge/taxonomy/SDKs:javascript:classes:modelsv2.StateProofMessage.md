[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / StateProofMessage

# Class: StateProofMessage

[modelsv2](../modules/modelsv2.md).StateProofMessage

Represents the message that the state proofs are attesting to.

## Hierarchy

- `default`

  ↳ **`StateProofMessage`**

## Table of contents

### Constructors

- [constructor](modelsv2.StateProofMessage.md#constructor)

### Properties

- [attribute\_map](modelsv2.StateProofMessage.md#attribute_map)
- [blockheaderscommitment](modelsv2.StateProofMessage.md#blockheaderscommitment)
- [firstattestedround](modelsv2.StateProofMessage.md#firstattestedround)
- [lastattestedround](modelsv2.StateProofMessage.md#lastattestedround)
- [lnprovenweight](modelsv2.StateProofMessage.md#lnprovenweight)
- [voterscommitment](modelsv2.StateProofMessage.md#voterscommitment)

### Methods

- [get\_obj\_for\_encoding](modelsv2.StateProofMessage.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.StateProofMessage.md#from_obj_for_encoding)

## Constructors

### constructor

• **new StateProofMessage**(`«destructured»`)

Creates a new `StateProofMessage` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `blockheaderscommitment` | `string` \| `Uint8Array` |
| › `firstattestedround` | `number` \| `bigint` |
| › `lastattestedround` | `number` \| `bigint` |
| › `lnprovenweight` | `number` \| `bigint` |
| › `voterscommitment` | `string` \| `Uint8Array` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:5479

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### blockheaderscommitment

• **blockheaderscommitment**: `Uint8Array`

The vector commitment root on all light block headers within a state proof
interval.

#### Defined in

client/v2/algod/models/types.ts:5446

___

### firstattestedround

• **firstattestedround**: `number` \| `bigint`

The first round the message attests to.

#### Defined in

client/v2/algod/models/types.ts:5451

___

### lastattestedround

• **lastattestedround**: `number` \| `bigint`

The last round the message attests to.

#### Defined in

client/v2/algod/models/types.ts:5456

___

### lnprovenweight

• **lnprovenweight**: `number` \| `bigint`

An integer value representing the natural log of the proven weight with 16 bits
of precision. This value would be used to verify the next state proof.

#### Defined in

client/v2/algod/models/types.ts:5462

___

### voterscommitment

• **voterscommitment**: `Uint8Array`

The vector commitment root of the top N accounts to sign the next StateProof.

#### Defined in

client/v2/algod/models/types.ts:5467

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

▸ `Static` **from_obj_for_encoding**(`data`): [`StateProofMessage`](modelsv2.StateProofMessage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`StateProofMessage`](modelsv2.StateProofMessage.md)

#### Defined in

client/v2/algod/models/types.ts:5515
