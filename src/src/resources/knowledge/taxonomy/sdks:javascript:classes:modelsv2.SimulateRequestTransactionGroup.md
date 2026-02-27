[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulateRequestTransactionGroup

# Class: SimulateRequestTransactionGroup

[modelsv2](../modules/modelsv2.md).SimulateRequestTransactionGroup

A transaction group to simulate.

## Hierarchy

- `default`

  ↳ **`SimulateRequestTransactionGroup`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulateRequestTransactionGroup.md#constructor)

### Properties

- [attribute\_map](modelsv2.SimulateRequestTransactionGroup.md#attribute_map)
- [txns](modelsv2.SimulateRequestTransactionGroup.md#txns)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulateRequestTransactionGroup.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulateRequestTransactionGroup.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulateRequestTransactionGroup**(`txns`)

Creates a new `SimulateRequestTransactionGroup` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txns` | `Object` | An atomic transaction group. |
| `txns.txns` | [`EncodedSignedTransaction`](../interfaces/EncodedSignedTransaction.md)[] | - |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4397

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### txns

• **txns**: [`EncodedSignedTransaction`](../interfaces/EncodedSignedTransaction.md)[]

An atomic transaction group.

#### Defined in

client/v2/algod/models/types.ts:4391

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulateRequestTransactionGroup`](modelsv2.SimulateRequestTransactionGroup.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulateRequestTransactionGroup`](modelsv2.SimulateRequestTransactionGroup.md)

#### Defined in

client/v2/algod/models/types.ts:4407
