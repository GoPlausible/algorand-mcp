[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulateTransactionGroupResult

# Class: SimulateTransactionGroupResult

[modelsv2](../modules/modelsv2.md).SimulateTransactionGroupResult

Simulation result for an atomic transaction group

## Hierarchy

- `default`

  ↳ **`SimulateTransactionGroupResult`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulateTransactionGroupResult.md#constructor)

### Properties

- [appBudgetAdded](modelsv2.SimulateTransactionGroupResult.md#appbudgetadded)
- [appBudgetConsumed](modelsv2.SimulateTransactionGroupResult.md#appbudgetconsumed)
- [attribute\_map](modelsv2.SimulateTransactionGroupResult.md#attribute_map)
- [failedAt](modelsv2.SimulateTransactionGroupResult.md#failedat)
- [failureMessage](modelsv2.SimulateTransactionGroupResult.md#failuremessage)
- [txnResults](modelsv2.SimulateTransactionGroupResult.md#txnresults)
- [unnamedResourcesAccessed](modelsv2.SimulateTransactionGroupResult.md#unnamedresourcesaccessed)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulateTransactionGroupResult.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulateTransactionGroupResult.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulateTransactionGroupResult**(`«destructured»`)

Creates a new `SimulateTransactionGroupResult` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `appBudgetAdded?` | `number` \| `bigint` |
| › `appBudgetConsumed?` | `number` \| `bigint` |
| › `failedAt?` | (`number` \| `bigint`)[] |
| › `failureMessage?` | `string` |
| › `txnResults` | [`SimulateTransactionResult`](modelsv2.SimulateTransactionResult.md)[] |
| › `unnamedResourcesAccessed?` | [`SimulateUnnamedResourcesAccessed`](modelsv2.SimulateUnnamedResourcesAccessed.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4684

## Properties

### appBudgetAdded

• `Optional` **appBudgetAdded**: `number` \| `bigint`

Total budget added during execution of app calls in the transaction group.

#### Defined in

client/v2/algod/models/types.ts:4629

___

### appBudgetConsumed

• `Optional` **appBudgetConsumed**: `number` \| `bigint`

Total budget consumed during execution of app calls in the transaction group.

#### Defined in

client/v2/algod/models/types.ts:4634

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### failedAt

• `Optional` **failedAt**: (`number` \| `bigint`)[]

If present, indicates which transaction in this group caused the failure. This
array represents the path to the failing transaction. Indexes are zero based,
the first element indicates the top-level transaction, and successive elements
indicate deeper inner transactions.

#### Defined in

client/v2/algod/models/types.ts:4642

___

### failureMessage

• `Optional` **failureMessage**: `string`

If present, indicates that the transaction group failed and specifies why that
happened

#### Defined in

client/v2/algod/models/types.ts:4648

___

### txnResults

• **txnResults**: [`SimulateTransactionResult`](modelsv2.SimulateTransactionResult.md)[]

Simulation result for individual transactions

#### Defined in

client/v2/algod/models/types.ts:4624

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

client/v2/algod/models/types.ts:4661

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulateTransactionGroupResult`](modelsv2.SimulateTransactionGroupResult.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulateTransactionGroupResult`](modelsv2.SimulateTransactionGroupResult.md)

#### Defined in

client/v2/algod/models/types.ts:4718
