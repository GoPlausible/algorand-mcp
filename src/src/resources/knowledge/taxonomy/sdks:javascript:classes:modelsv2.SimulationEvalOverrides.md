[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulationEvalOverrides

# Class: SimulationEvalOverrides

[modelsv2](../modules/modelsv2.md).SimulationEvalOverrides

The set of parameters and limits override during simulation. If this set of
parameters is present, then evaluation parameters may differ from standard
evaluation in certain ways.

## Hierarchy

- `default`

  ↳ **`SimulationEvalOverrides`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulationEvalOverrides.md#constructor)

### Properties

- [allowEmptySignatures](modelsv2.SimulationEvalOverrides.md#allowemptysignatures)
- [allowUnnamedResources](modelsv2.SimulationEvalOverrides.md#allowunnamedresources)
- [attribute\_map](modelsv2.SimulationEvalOverrides.md#attribute_map)
- [extraOpcodeBudget](modelsv2.SimulationEvalOverrides.md#extraopcodebudget)
- [fixSigners](modelsv2.SimulationEvalOverrides.md#fixsigners)
- [maxLogCalls](modelsv2.SimulationEvalOverrides.md#maxlogcalls)
- [maxLogSize](modelsv2.SimulationEvalOverrides.md#maxlogsize)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulationEvalOverrides.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulationEvalOverrides.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulationEvalOverrides**(`«destructured»`)

Creates a new `SimulationEvalOverrides` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `allowEmptySignatures?` | `boolean` |
| › `allowUnnamedResources?` | `boolean` |
| › `extraOpcodeBudget?` | `number` \| `bigint` |
| › `fixSigners?` | `boolean` |
| › `maxLogCalls?` | `number` \| `bigint` |
| › `maxLogSize?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:5062

## Properties

### allowEmptySignatures

• `Optional` **allowEmptySignatures**: `boolean`

If true, transactions without signatures are allowed and simulated as if they
were properly signed.

#### Defined in

client/v2/algod/models/types.ts:5023

___

### allowUnnamedResources

• `Optional` **allowUnnamedResources**: `boolean`

If true, allows access to unnamed resources during simulation.

#### Defined in

client/v2/algod/models/types.ts:5028

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### extraOpcodeBudget

• `Optional` **extraOpcodeBudget**: `number` \| `bigint`

The extra opcode budget added to each transaction group during simulation

#### Defined in

client/v2/algod/models/types.ts:5033

___

### fixSigners

• `Optional` **fixSigners**: `boolean`

If true, signers for transactions that are missing signatures will be fixed
during evaluation.

#### Defined in

client/v2/algod/models/types.ts:5039

___

### maxLogCalls

• `Optional` **maxLogCalls**: `number` \| `bigint`

The maximum log calls one can make during simulation

#### Defined in

client/v2/algod/models/types.ts:5044

___

### maxLogSize

• `Optional` **maxLogSize**: `number` \| `bigint`

The maximum byte number to log during simulation

#### Defined in

client/v2/algod/models/types.ts:5049

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulationEvalOverrides`](modelsv2.SimulationEvalOverrides.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulationEvalOverrides`](modelsv2.SimulationEvalOverrides.md)

#### Defined in

client/v2/algod/models/types.ts:5096
