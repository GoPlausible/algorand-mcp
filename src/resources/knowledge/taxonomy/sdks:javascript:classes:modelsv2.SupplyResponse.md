[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SupplyResponse

# Class: SupplyResponse

[modelsv2](../modules/modelsv2.md).SupplyResponse

Supply represents the current supply of MicroAlgos in the system.

## Hierarchy

- `default`

  ↳ **`SupplyResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.SupplyResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.SupplyResponse.md#attribute_map)
- [currentRound](modelsv2.SupplyResponse.md#currentround)
- [onlineMoney](modelsv2.SupplyResponse.md#onlinemoney)
- [totalMoney](modelsv2.SupplyResponse.md#totalmoney)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SupplyResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SupplyResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SupplyResponse**(`«destructured»`)

Creates a new `SupplyResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `currentRound` | `number` \| `bigint` |
| › `onlineMoney` | `number` \| `bigint` |
| › `totalMoney` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:5573

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### currentRound

• **currentRound**: `number` \| `bigint`

Round

#### Defined in

client/v2/algod/models/types.ts:5555

___

### onlineMoney

• **onlineMoney**: `number` \| `bigint`

OnlineMoney

#### Defined in

client/v2/algod/models/types.ts:5560

___

### totalMoney

• **totalMoney**: `number` \| `bigint`

TotalMoney

#### Defined in

client/v2/algod/models/types.ts:5565

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SupplyResponse`](modelsv2.SupplyResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SupplyResponse`](modelsv2.SupplyResponse.md)

#### Defined in

client/v2/algod/models/types.ts:5595
