[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulationOpcodeTraceUnit

# Class: SimulationOpcodeTraceUnit

[modelsv2](../modules/modelsv2.md).SimulationOpcodeTraceUnit

The set of trace information and effect from evaluating a single opcode.

## Hierarchy

- `default`

  ↳ **`SimulationOpcodeTraceUnit`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulationOpcodeTraceUnit.md#constructor)

### Properties

- [attribute\_map](modelsv2.SimulationOpcodeTraceUnit.md#attribute_map)
- [pc](modelsv2.SimulationOpcodeTraceUnit.md#pc)
- [scratchChanges](modelsv2.SimulationOpcodeTraceUnit.md#scratchchanges)
- [spawnedInners](modelsv2.SimulationOpcodeTraceUnit.md#spawnedinners)
- [stackAdditions](modelsv2.SimulationOpcodeTraceUnit.md#stackadditions)
- [stackPopCount](modelsv2.SimulationOpcodeTraceUnit.md#stackpopcount)
- [stateChanges](modelsv2.SimulationOpcodeTraceUnit.md#statechanges)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulationOpcodeTraceUnit.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulationOpcodeTraceUnit.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulationOpcodeTraceUnit**(`«destructured»`)

Creates a new `SimulationOpcodeTraceUnit` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `pc` | `number` \| `bigint` |
| › `scratchChanges?` | [`ScratchChange`](modelsv2.ScratchChange.md)[] |
| › `spawnedInners?` | (`number` \| `bigint`)[] |
| › `stackAdditions?` | [`AvmValue`](modelsv2.AvmValue.md)[] |
| › `stackPopCount?` | `number` \| `bigint` |
| › `stateChanges?` | [`ApplicationStateOperation`](modelsv2.ApplicationStateOperation.md)[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:5155

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### pc

• **pc**: `number` \| `bigint`

The program counter of the current opcode being evaluated.

#### Defined in

client/v2/algod/models/types.ts:5119

___

### scratchChanges

• `Optional` **scratchChanges**: [`ScratchChange`](modelsv2.ScratchChange.md)[]

The writes into scratch slots.

#### Defined in

client/v2/algod/models/types.ts:5124

___

### spawnedInners

• `Optional` **spawnedInners**: (`number` \| `bigint`)[]

The indexes of the traces for inner transactions spawned by this opcode, if any.

#### Defined in

client/v2/algod/models/types.ts:5129

___

### stackAdditions

• `Optional` **stackAdditions**: [`AvmValue`](modelsv2.AvmValue.md)[]

The values added by this opcode to the stack.

#### Defined in

client/v2/algod/models/types.ts:5134

___

### stackPopCount

• `Optional` **stackPopCount**: `number` \| `bigint`

The number of deleted stack values by this opcode.

#### Defined in

client/v2/algod/models/types.ts:5139

___

### stateChanges

• `Optional` **stateChanges**: [`ApplicationStateOperation`](modelsv2.ApplicationStateOperation.md)[]

The operations against the current application's states.

#### Defined in

client/v2/algod/models/types.ts:5144

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulationOpcodeTraceUnit`](modelsv2.SimulationOpcodeTraceUnit.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulationOpcodeTraceUnit`](modelsv2.SimulationOpcodeTraceUnit.md)

#### Defined in

client/v2/algod/models/types.ts:5189
