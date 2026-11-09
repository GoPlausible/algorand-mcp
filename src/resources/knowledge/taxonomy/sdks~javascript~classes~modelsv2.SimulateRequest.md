[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulateRequest

# Class: SimulateRequest

[modelsv2](../modules/modelsv2.md).SimulateRequest

Request type for simulation endpoint.

## Hierarchy

- `default`

  ↳ **`SimulateRequest`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulateRequest.md#constructor)

### Properties

- [allowEmptySignatures](modelsv2.SimulateRequest.md#allowemptysignatures)
- [allowMoreLogging](modelsv2.SimulateRequest.md#allowmorelogging)
- [allowUnnamedResources](modelsv2.SimulateRequest.md#allowunnamedresources)
- [attribute\_map](modelsv2.SimulateRequest.md#attribute_map)
- [execTraceConfig](modelsv2.SimulateRequest.md#exectraceconfig)
- [extraOpcodeBudget](modelsv2.SimulateRequest.md#extraopcodebudget)
- [fixSigners](modelsv2.SimulateRequest.md#fixsigners)
- [round](modelsv2.SimulateRequest.md#round)
- [txnGroups](modelsv2.SimulateRequest.md#txngroups)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulateRequest.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulateRequest.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulateRequest**(`«destructured»`)

Creates a new `SimulateRequest` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `allowEmptySignatures?` | `boolean` |
| › `allowMoreLogging?` | `boolean` |
| › `allowUnnamedResources?` | `boolean` |
| › `execTraceConfig?` | [`SimulateTraceConfig`](modelsv2.SimulateTraceConfig.md) |
| › `extraOpcodeBudget?` | `number` \| `bigint` |
| › `fixSigners?` | `boolean` |
| › `round?` | `number` \| `bigint` |
| › `txnGroups` | [`SimulateRequestTransactionGroup`](modelsv2.SimulateRequestTransactionGroup.md)[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4317

## Properties

### allowEmptySignatures

• `Optional` **allowEmptySignatures**: `boolean`

Allows transactions without signatures to be simulated as if they had correct
signatures.

#### Defined in

client/v2/algod/models/types.ts:4265

___

### allowMoreLogging

• `Optional` **allowMoreLogging**: `boolean`

Lifts limits on log opcode usage during simulation.

#### Defined in

client/v2/algod/models/types.ts:4270

___

### allowUnnamedResources

• `Optional` **allowUnnamedResources**: `boolean`

Allows access to unnamed resources during simulation.

#### Defined in

client/v2/algod/models/types.ts:4275

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### execTraceConfig

• `Optional` **execTraceConfig**: [`SimulateTraceConfig`](modelsv2.SimulateTraceConfig.md)

An object that configures simulation execution trace.

#### Defined in

client/v2/algod/models/types.ts:4280

___

### extraOpcodeBudget

• `Optional` **extraOpcodeBudget**: `number` \| `bigint`

Applies extra opcode budget during simulation for each transaction group.

#### Defined in

client/v2/algod/models/types.ts:4285

___

### fixSigners

• `Optional` **fixSigners**: `boolean`

If true, signers for transactions that are missing signatures will be fixed
during evaluation.

#### Defined in

client/v2/algod/models/types.ts:4291

___

### round

• `Optional` **round**: `number` \| `bigint`

If provided, specifies the round preceding the simulation. State changes through
this round will be used to run this simulation. Usually only the 4 most recent
rounds will be available (controlled by the node config value MaxAcctLookback).
If not specified, defaults to the latest available round.

#### Defined in

client/v2/algod/models/types.ts:4299

___

### txnGroups

• **txnGroups**: [`SimulateRequestTransactionGroup`](modelsv2.SimulateRequestTransactionGroup.md)[]

The transaction groups to simulate.

#### Defined in

client/v2/algod/models/types.ts:4259

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulateRequest`](modelsv2.SimulateRequest.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulateRequest`](modelsv2.SimulateRequest.md)

#### Defined in

client/v2/algod/models/types.ts:4359
