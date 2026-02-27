[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulateTraceConfig

# Class: SimulateTraceConfig

[modelsv2](../modules/modelsv2.md).SimulateTraceConfig

An object that configures simulation execution trace.

## Hierarchy

- `default`

  ↳ **`SimulateTraceConfig`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulateTraceConfig.md#constructor)

### Properties

- [attribute\_map](modelsv2.SimulateTraceConfig.md#attribute_map)
- [enable](modelsv2.SimulateTraceConfig.md#enable)
- [scratchChange](modelsv2.SimulateTraceConfig.md#scratchchange)
- [stackChange](modelsv2.SimulateTraceConfig.md#stackchange)
- [stateChange](modelsv2.SimulateTraceConfig.md#statechange)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulateTraceConfig.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulateTraceConfig.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulateTraceConfig**(`«destructured»`)

Creates a new `SimulateTraceConfig` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `enable?` | `boolean` |
| › `scratchChange?` | `boolean` |
| › `stackChange?` | `boolean` |
| › `stateChange?` | `boolean` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4579

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### enable

• `Optional` **enable**: `boolean`

A boolean option for opting in execution trace features simulation endpoint.

#### Defined in

client/v2/algod/models/types.ts:4549

___

### scratchChange

• `Optional` **scratchChange**: `boolean`

A boolean option enabling returning scratch slot changes together with execution
trace during simulation.

#### Defined in

client/v2/algod/models/types.ts:4555

___

### stackChange

• `Optional` **stackChange**: `boolean`

A boolean option enabling returning stack changes together with execution trace
during simulation.

#### Defined in

client/v2/algod/models/types.ts:4561

___

### stateChange

• `Optional` **stateChange**: `boolean`

A boolean option enabling returning application state changes (global, local,
and box changes) with the execution trace during simulation.

#### Defined in

client/v2/algod/models/types.ts:4567

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulateTraceConfig`](modelsv2.SimulateTraceConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulateTraceConfig`](modelsv2.SimulateTraceConfig.md)

#### Defined in

client/v2/algod/models/types.ts:4605
