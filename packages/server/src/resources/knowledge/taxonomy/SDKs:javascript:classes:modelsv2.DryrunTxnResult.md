[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / DryrunTxnResult

# Class: DryrunTxnResult

[modelsv2](../modules/modelsv2.md).DryrunTxnResult

DryrunTxnResult contains any LogicSig or ApplicationCall program debug
information and state updates from a dryrun.

## Hierarchy

- `default`

  ↳ **`DryrunTxnResult`**

## Table of contents

### Constructors

- [constructor](modelsv2.DryrunTxnResult.md#constructor)

### Properties

- [appCallMessages](modelsv2.DryrunTxnResult.md#appcallmessages)
- [appCallTrace](modelsv2.DryrunTxnResult.md#appcalltrace)
- [attribute\_map](modelsv2.DryrunTxnResult.md#attribute_map)
- [budgetAdded](modelsv2.DryrunTxnResult.md#budgetadded)
- [budgetConsumed](modelsv2.DryrunTxnResult.md#budgetconsumed)
- [disassembly](modelsv2.DryrunTxnResult.md#disassembly)
- [globalDelta](modelsv2.DryrunTxnResult.md#globaldelta)
- [localDeltas](modelsv2.DryrunTxnResult.md#localdeltas)
- [logicSigDisassembly](modelsv2.DryrunTxnResult.md#logicsigdisassembly)
- [logicSigMessages](modelsv2.DryrunTxnResult.md#logicsigmessages)
- [logicSigTrace](modelsv2.DryrunTxnResult.md#logicsigtrace)
- [logs](modelsv2.DryrunTxnResult.md#logs)

### Methods

- [get\_obj\_for\_encoding](modelsv2.DryrunTxnResult.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.DryrunTxnResult.md#from_obj_for_encoding)

## Constructors

### constructor

• **new DryrunTxnResult**(`«destructured»`)

Creates a new `DryrunTxnResult` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `appCallMessages?` | `string`[] |
| › `appCallTrace?` | [`DryrunState`](modelsv2.DryrunState.md)[] |
| › `budgetAdded?` | `number` \| `bigint` |
| › `budgetConsumed?` | `number` \| `bigint` |
| › `disassembly` | `string`[] |
| › `globalDelta?` | [`EvalDeltaKeyValue`](modelsv2.EvalDeltaKeyValue.md)[] |
| › `localDeltas?` | [`AccountStateDelta`](modelsv2.AccountStateDelta.md)[] |
| › `logicSigDisassembly?` | `string`[] |
| › `logicSigMessages?` | `string`[] |
| › `logicSigTrace?` | [`DryrunState`](modelsv2.DryrunState.md)[] |
| › `logs?` | `Uint8Array`[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:3008

## Properties

### appCallMessages

• `Optional` **appCallMessages**: `string`[]

#### Defined in

client/v2/algod/models/types.ts:2962

___

### appCallTrace

• `Optional` **appCallTrace**: [`DryrunState`](modelsv2.DryrunState.md)[]

#### Defined in

client/v2/algod/models/types.ts:2964

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### budgetAdded

• `Optional` **budgetAdded**: `number` \| `bigint`

Budget added during execution of app call transaction.

#### Defined in

client/v2/algod/models/types.ts:2969

___

### budgetConsumed

• `Optional` **budgetConsumed**: `number` \| `bigint`

Budget consumed during execution of app call transaction.

#### Defined in

client/v2/algod/models/types.ts:2974

___

### disassembly

• **disassembly**: `string`[]

Disassembled program line by line.

#### Defined in

client/v2/algod/models/types.ts:2960

___

### globalDelta

• `Optional` **globalDelta**: [`EvalDeltaKeyValue`](modelsv2.EvalDeltaKeyValue.md)[]

Application state delta.

#### Defined in

client/v2/algod/models/types.ts:2979

___

### localDeltas

• `Optional` **localDeltas**: [`AccountStateDelta`](modelsv2.AccountStateDelta.md)[]

#### Defined in

client/v2/algod/models/types.ts:2981

___

### logicSigDisassembly

• `Optional` **logicSigDisassembly**: `string`[]

Disassembled lsig program line by line.

#### Defined in

client/v2/algod/models/types.ts:2986

___

### logicSigMessages

• `Optional` **logicSigMessages**: `string`[]

#### Defined in

client/v2/algod/models/types.ts:2988

___

### logicSigTrace

• `Optional` **logicSigTrace**: [`DryrunState`](modelsv2.DryrunState.md)[]

#### Defined in

client/v2/algod/models/types.ts:2990

___

### logs

• `Optional` **logs**: `Uint8Array`[]

#### Defined in

client/v2/algod/models/types.ts:2992

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

▸ `Static` **from_obj_for_encoding**(`data`): [`DryrunTxnResult`](modelsv2.DryrunTxnResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`DryrunTxnResult`](modelsv2.DryrunTxnResult.md)

#### Defined in

client/v2/algod/models/types.ts:3062
