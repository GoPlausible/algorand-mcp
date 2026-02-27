[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulateTransactionResult

# Class: SimulateTransactionResult

[modelsv2](../modules/modelsv2.md).SimulateTransactionResult

Simulation result for an individual transaction

## Hierarchy

- `default`

  ↳ **`SimulateTransactionResult`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulateTransactionResult.md#constructor)

### Properties

- [appBudgetConsumed](modelsv2.SimulateTransactionResult.md#appbudgetconsumed)
- [attribute\_map](modelsv2.SimulateTransactionResult.md#attribute_map)
- [execTrace](modelsv2.SimulateTransactionResult.md#exectrace)
- [fixedSigner](modelsv2.SimulateTransactionResult.md#fixedsigner)
- [logicSigBudgetConsumed](modelsv2.SimulateTransactionResult.md#logicsigbudgetconsumed)
- [txnResult](modelsv2.SimulateTransactionResult.md#txnresult)
- [unnamedResourcesAccessed](modelsv2.SimulateTransactionResult.md#unnamedresourcesaccessed)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulateTransactionResult.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulateTransactionResult.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulateTransactionResult**(`«destructured»`)

Creates a new `SimulateTransactionResult` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `appBudgetConsumed?` | `number` \| `bigint` |
| › `execTrace?` | [`SimulationTransactionExecTrace`](modelsv2.SimulationTransactionExecTrace.md) |
| › `fixedSigner?` | `string` |
| › `logicSigBudgetConsumed?` | `number` \| `bigint` |
| › `txnResult` | [`PendingTransactionResponse`](modelsv2.PendingTransactionResponse.md) |
| › `unnamedResourcesAccessed?` | [`SimulateUnnamedResourcesAccessed`](modelsv2.SimulateUnnamedResourcesAccessed.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4812

## Properties

### appBudgetConsumed

• `Optional` **appBudgetConsumed**: `number` \| `bigint`

Budget used during execution of an app call transaction. This value includes
budged used by inner app calls spawned by this transaction.

#### Defined in

client/v2/algod/models/types.ts:4759

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### execTrace

• `Optional` **execTrace**: [`SimulationTransactionExecTrace`](modelsv2.SimulationTransactionExecTrace.md)

The execution trace of calling an app or a logic sig, containing the inner app
call trace in a recursive way.

#### Defined in

client/v2/algod/models/types.ts:4765

___

### fixedSigner

• `Optional` **fixedSigner**: `string`

The account that needed to sign this transaction when no signature was provided
and the provided signer was incorrect.

#### Defined in

client/v2/algod/models/types.ts:4771

___

### logicSigBudgetConsumed

• `Optional` **logicSigBudgetConsumed**: `number` \| `bigint`

Budget used during execution of a logic sig transaction.

#### Defined in

client/v2/algod/models/types.ts:4776

___

### txnResult

• **txnResult**: [`PendingTransactionResponse`](modelsv2.PendingTransactionResponse.md)

Details about a pending transaction. If the transaction was recently confirmed,
includes confirmation details like the round and reward details.

#### Defined in

client/v2/algod/models/types.ts:4753

___

### unnamedResourcesAccessed

• `Optional` **unnamedResourcesAccessed**: [`SimulateUnnamedResourcesAccessed`](modelsv2.SimulateUnnamedResourcesAccessed.md)

These are resources that were accessed by this group that would normally have
caused failure, but were allowed in simulation. Depending on where this object
is in the response, the unnamed resources it contains may or may not qualify for
group resource sharing. If this is a field in SimulateTransactionGroupResult,
the resources do qualify, but if this is a field in SimulateTransactionResult,
they do not qualify. In order to make this group valid for actual submission,
resources that qualify for group sharing can be made available by any
transaction of the group; otherwise, resources must be placed in the same
transaction which accessed them.

#### Defined in

client/v2/algod/models/types.ts:4789

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulateTransactionResult`](modelsv2.SimulateTransactionResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulateTransactionResult`](modelsv2.SimulateTransactionResult.md)

#### Defined in

client/v2/algod/models/types.ts:4846
