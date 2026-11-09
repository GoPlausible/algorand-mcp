[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulateResponse

# Class: SimulateResponse

[modelsv2](../modules/modelsv2.md).SimulateResponse

Result of a transaction group simulation.

## Hierarchy

- `default`

  ↳ **`SimulateResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulateResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.SimulateResponse.md#attribute_map)
- [evalOverrides](modelsv2.SimulateResponse.md#evaloverrides)
- [execTraceConfig](modelsv2.SimulateResponse.md#exectraceconfig)
- [initialStates](modelsv2.SimulateResponse.md#initialstates)
- [lastRound](modelsv2.SimulateResponse.md#lastround)
- [txnGroups](modelsv2.SimulateResponse.md#txngroups)
- [version](modelsv2.SimulateResponse.md#version)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulateResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulateResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulateResponse**(`«destructured»`)

Creates a new `SimulateResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `evalOverrides?` | [`SimulationEvalOverrides`](modelsv2.SimulationEvalOverrides.md) |
| › `execTraceConfig?` | [`SimulateTraceConfig`](modelsv2.SimulateTraceConfig.md) |
| › `initialStates?` | [`SimulateInitialStates`](modelsv2.SimulateInitialStates.md) |
| › `lastRound` | `number` \| `bigint` |
| › `txnGroups` | [`SimulateTransactionGroupResult`](modelsv2.SimulateTransactionGroupResult.md)[] |
| › `version` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4471

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### evalOverrides

• `Optional` **evalOverrides**: [`SimulationEvalOverrides`](modelsv2.SimulationEvalOverrides.md)

The set of parameters and limits override during simulation. If this set of
parameters is present, then evaluation parameters may differ from standard
evaluation in certain ways.

#### Defined in

client/v2/algod/models/types.ts:4447

___

### execTraceConfig

• `Optional` **execTraceConfig**: [`SimulateTraceConfig`](modelsv2.SimulateTraceConfig.md)

An object that configures simulation execution trace.

#### Defined in

client/v2/algod/models/types.ts:4452

___

### initialStates

• `Optional` **initialStates**: [`SimulateInitialStates`](modelsv2.SimulateInitialStates.md)

Initial states of resources that were accessed during simulation.

#### Defined in

client/v2/algod/models/types.ts:4457

___

### lastRound

• **lastRound**: `number` \| `bigint`

The round immediately preceding this simulation. State changes through this
round were used to run this simulation.

#### Defined in

client/v2/algod/models/types.ts:4430

___

### txnGroups

• **txnGroups**: [`SimulateTransactionGroupResult`](modelsv2.SimulateTransactionGroupResult.md)[]

A result object for each transaction group that was simulated.

#### Defined in

client/v2/algod/models/types.ts:4435

___

### version

• **version**: `number` \| `bigint`

The version of this response object.

#### Defined in

client/v2/algod/models/types.ts:4440

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulateResponse`](modelsv2.SimulateResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulateResponse`](modelsv2.SimulateResponse.md)

#### Defined in

client/v2/algod/models/types.ts:4505
