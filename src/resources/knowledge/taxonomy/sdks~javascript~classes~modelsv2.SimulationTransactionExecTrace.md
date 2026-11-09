[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulationTransactionExecTrace

# Class: SimulationTransactionExecTrace

[modelsv2](../modules/modelsv2.md).SimulationTransactionExecTrace

The execution trace of calling an app or a logic sig, containing the inner app
call trace in a recursive way.

## Hierarchy

- `default`

  ↳ **`SimulationTransactionExecTrace`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulationTransactionExecTrace.md#constructor)

### Properties

- [approvalProgramHash](modelsv2.SimulationTransactionExecTrace.md#approvalprogramhash)
- [approvalProgramTrace](modelsv2.SimulationTransactionExecTrace.md#approvalprogramtrace)
- [attribute\_map](modelsv2.SimulationTransactionExecTrace.md#attribute_map)
- [clearStateProgramHash](modelsv2.SimulationTransactionExecTrace.md#clearstateprogramhash)
- [clearStateProgramTrace](modelsv2.SimulationTransactionExecTrace.md#clearstateprogramtrace)
- [clearStateRollback](modelsv2.SimulationTransactionExecTrace.md#clearstaterollback)
- [clearStateRollbackError](modelsv2.SimulationTransactionExecTrace.md#clearstaterollbackerror)
- [innerTrace](modelsv2.SimulationTransactionExecTrace.md#innertrace)
- [logicSigHash](modelsv2.SimulationTransactionExecTrace.md#logicsighash)
- [logicSigTrace](modelsv2.SimulationTransactionExecTrace.md#logicsigtrace)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulationTransactionExecTrace.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulationTransactionExecTrace.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulationTransactionExecTrace**(`«destructured»`)

Creates a new `SimulationTransactionExecTrace` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `approvalProgramHash?` | `string` \| `Uint8Array` |
| › `approvalProgramTrace?` | [`SimulationOpcodeTraceUnit`](modelsv2.SimulationOpcodeTraceUnit.md)[] |
| › `clearStateProgramHash?` | `string` \| `Uint8Array` |
| › `clearStateProgramTrace?` | [`SimulationOpcodeTraceUnit`](modelsv2.SimulationOpcodeTraceUnit.md)[] |
| › `clearStateRollback?` | `boolean` |
| › `clearStateRollbackError?` | `string` |
| › `innerTrace?` | [`SimulationTransactionExecTrace`](modelsv2.SimulationTransactionExecTrace.md)[] |
| › `logicSigHash?` | `string` \| `Uint8Array` |
| › `logicSigTrace?` | [`SimulationOpcodeTraceUnit`](modelsv2.SimulationOpcodeTraceUnit.md)[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:5288

## Properties

### approvalProgramHash

• `Optional` **approvalProgramHash**: `Uint8Array`

SHA512_256 hash digest of the approval program executed in transaction.

#### Defined in

client/v2/algod/models/types.ts:5226

___

### approvalProgramTrace

• `Optional` **approvalProgramTrace**: [`SimulationOpcodeTraceUnit`](modelsv2.SimulationOpcodeTraceUnit.md)[]

Program trace that contains a trace of opcode effects in an approval program.

#### Defined in

client/v2/algod/models/types.ts:5231

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### clearStateProgramHash

• `Optional` **clearStateProgramHash**: `Uint8Array`

SHA512_256 hash digest of the clear state program executed in transaction.

#### Defined in

client/v2/algod/models/types.ts:5236

___

### clearStateProgramTrace

• `Optional` **clearStateProgramTrace**: [`SimulationOpcodeTraceUnit`](modelsv2.SimulationOpcodeTraceUnit.md)[]

Program trace that contains a trace of opcode effects in a clear state program.

#### Defined in

client/v2/algod/models/types.ts:5241

___

### clearStateRollback

• `Optional` **clearStateRollback**: `boolean`

If true, indicates that the clear state program failed and any persistent state
changes it produced should be reverted once the program exits.

#### Defined in

client/v2/algod/models/types.ts:5247

___

### clearStateRollbackError

• `Optional` **clearStateRollbackError**: `string`

The error message explaining why the clear state program failed. This field will
only be populated if clear-state-rollback is true and the failure was due to an
execution error.

#### Defined in

client/v2/algod/models/types.ts:5254

___

### innerTrace

• `Optional` **innerTrace**: [`SimulationTransactionExecTrace`](modelsv2.SimulationTransactionExecTrace.md)[]

An array of SimulationTransactionExecTrace representing the execution trace of
any inner transactions executed.

#### Defined in

client/v2/algod/models/types.ts:5260

___

### logicSigHash

• `Optional` **logicSigHash**: `Uint8Array`

SHA512_256 hash digest of the logic sig executed in transaction.

#### Defined in

client/v2/algod/models/types.ts:5265

___

### logicSigTrace

• `Optional` **logicSigTrace**: [`SimulationOpcodeTraceUnit`](modelsv2.SimulationOpcodeTraceUnit.md)[]

Program trace that contains a trace of opcode effects in a logic sig.

#### Defined in

client/v2/algod/models/types.ts:5270

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulationTransactionExecTrace`](modelsv2.SimulationTransactionExecTrace.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulationTransactionExecTrace`](modelsv2.SimulationTransactionExecTrace.md)

#### Defined in

client/v2/algod/models/types.ts:5343
