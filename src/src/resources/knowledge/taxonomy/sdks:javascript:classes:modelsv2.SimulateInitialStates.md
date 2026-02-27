[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulateInitialStates

# Class: SimulateInitialStates

[modelsv2](../modules/modelsv2.md).SimulateInitialStates

Initial states of resources that were accessed during simulation.

## Hierarchy

- `default`

  ↳ **`SimulateInitialStates`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulateInitialStates.md#constructor)

### Properties

- [appInitialStates](modelsv2.SimulateInitialStates.md#appinitialstates)
- [attribute\_map](modelsv2.SimulateInitialStates.md#attribute_map)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulateInitialStates.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulateInitialStates.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulateInitialStates**(`appInitialStates`)

Creates a new `SimulateInitialStates` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appInitialStates` | `Object` | The initial states of accessed application before simulation. The order of this array is arbitrary. |
| `appInitialStates.appInitialStates?` | [`ApplicationInitialStates`](modelsv2.ApplicationInitialStates.md)[] | - |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4222

## Properties

### appInitialStates

• `Optional` **appInitialStates**: [`ApplicationInitialStates`](modelsv2.ApplicationInitialStates.md)[]

The initial states of accessed application before simulation. The order of this
array is arbitrary.

#### Defined in

client/v2/algod/models/types.ts:4215

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulateInitialStates`](modelsv2.SimulateInitialStates.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulateInitialStates`](modelsv2.SimulateInitialStates.md)

#### Defined in

client/v2/algod/models/types.ts:4236
