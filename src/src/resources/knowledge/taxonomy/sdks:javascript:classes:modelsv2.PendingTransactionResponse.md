[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / PendingTransactionResponse

# Class: PendingTransactionResponse

[modelsv2](../modules/modelsv2.md).PendingTransactionResponse

Details about a pending transaction. If the transaction was recently confirmed,
includes confirmation details like the round and reward details.

## Hierarchy

- `default`

  ↳ **`PendingTransactionResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.PendingTransactionResponse.md#constructor)

### Properties

- [applicationIndex](modelsv2.PendingTransactionResponse.md#applicationindex)
- [assetClosingAmount](modelsv2.PendingTransactionResponse.md#assetclosingamount)
- [assetIndex](modelsv2.PendingTransactionResponse.md#assetindex)
- [attribute\_map](modelsv2.PendingTransactionResponse.md#attribute_map)
- [closeRewards](modelsv2.PendingTransactionResponse.md#closerewards)
- [closingAmount](modelsv2.PendingTransactionResponse.md#closingamount)
- [confirmedRound](modelsv2.PendingTransactionResponse.md#confirmedround)
- [globalStateDelta](modelsv2.PendingTransactionResponse.md#globalstatedelta)
- [innerTxns](modelsv2.PendingTransactionResponse.md#innertxns)
- [localStateDelta](modelsv2.PendingTransactionResponse.md#localstatedelta)
- [logs](modelsv2.PendingTransactionResponse.md#logs)
- [poolError](modelsv2.PendingTransactionResponse.md#poolerror)
- [receiverRewards](modelsv2.PendingTransactionResponse.md#receiverrewards)
- [senderRewards](modelsv2.PendingTransactionResponse.md#senderrewards)
- [txn](modelsv2.PendingTransactionResponse.md#txn)

### Methods

- [get\_obj\_for\_encoding](modelsv2.PendingTransactionResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.PendingTransactionResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new PendingTransactionResponse**(`«destructured»`)

Creates a new `PendingTransactionResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `applicationIndex?` | `number` \| `bigint` |
| › `assetClosingAmount?` | `number` \| `bigint` |
| › `assetIndex?` | `number` \| `bigint` |
| › `closeRewards?` | `number` \| `bigint` |
| › `closingAmount?` | `number` \| `bigint` |
| › `confirmedRound?` | `number` \| `bigint` |
| › `globalStateDelta?` | [`EvalDeltaKeyValue`](modelsv2.EvalDeltaKeyValue.md)[] |
| › `innerTxns?` | [`PendingTransactionResponse`](modelsv2.PendingTransactionResponse.md)[] |
| › `localStateDelta?` | [`AccountStateDelta`](modelsv2.AccountStateDelta.md)[] |
| › `logs?` | `Uint8Array`[] |
| › `poolError` | `string` |
| › `receiverRewards?` | `number` \| `bigint` |
| › `senderRewards?` | `number` \| `bigint` |
| › `txn` | [`EncodedSignedTransaction`](../interfaces/EncodedSignedTransaction.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:3948

## Properties

### applicationIndex

• `Optional` **applicationIndex**: `number` \| `bigint`

The application index if the transaction was found and it created an
application.

#### Defined in

client/v2/algod/models/types.ts:3867

___

### assetClosingAmount

• `Optional` **assetClosingAmount**: `number` \| `bigint`

The number of the asset's unit that were transferred to the close-to address.

#### Defined in

client/v2/algod/models/types.ts:3872

___

### assetIndex

• `Optional` **assetIndex**: `number` \| `bigint`

The asset index if the transaction was found and it created an asset.

#### Defined in

client/v2/algod/models/types.ts:3877

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### closeRewards

• `Optional` **closeRewards**: `number` \| `bigint`

Rewards in microalgos applied to the close remainder to account.

#### Defined in

client/v2/algod/models/types.ts:3882

___

### closingAmount

• `Optional` **closingAmount**: `number` \| `bigint`

Closing amount for the transaction.

#### Defined in

client/v2/algod/models/types.ts:3887

___

### confirmedRound

• `Optional` **confirmedRound**: `number` \| `bigint`

The round where this transaction was confirmed, if present.

#### Defined in

client/v2/algod/models/types.ts:3892

___

### globalStateDelta

• `Optional` **globalStateDelta**: [`EvalDeltaKeyValue`](modelsv2.EvalDeltaKeyValue.md)[]

Global state key/value changes for the application being executed by this
transaction.

#### Defined in

client/v2/algod/models/types.ts:3898

___

### innerTxns

• `Optional` **innerTxns**: [`PendingTransactionResponse`](modelsv2.PendingTransactionResponse.md)[]

Inner transactions produced by application execution.

#### Defined in

client/v2/algod/models/types.ts:3903

___

### localStateDelta

• `Optional` **localStateDelta**: [`AccountStateDelta`](modelsv2.AccountStateDelta.md)[]

Local state key/value changes for the application being executed by this
transaction.

#### Defined in

client/v2/algod/models/types.ts:3909

___

### logs

• `Optional` **logs**: `Uint8Array`[]

Logs for the application being executed by this transaction.

#### Defined in

client/v2/algod/models/types.ts:3914

___

### poolError

• **poolError**: `string`

Indicates that the transaction was kicked out of this node's transaction pool
(and specifies why that happened). An empty string indicates the transaction
wasn't kicked out of this node's txpool due to an error.

#### Defined in

client/v2/algod/models/types.ts:3856

___

### receiverRewards

• `Optional` **receiverRewards**: `number` \| `bigint`

Rewards in microalgos applied to the receiver account.

#### Defined in

client/v2/algod/models/types.ts:3919

___

### senderRewards

• `Optional` **senderRewards**: `number` \| `bigint`

Rewards in microalgos applied to the sender account.

#### Defined in

client/v2/algod/models/types.ts:3924

___

### txn

• **txn**: [`EncodedSignedTransaction`](../interfaces/EncodedSignedTransaction.md)

The raw signed transaction.

#### Defined in

client/v2/algod/models/types.ts:3861

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

▸ `Static` **from_obj_for_encoding**(`data`): [`PendingTransactionResponse`](modelsv2.PendingTransactionResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`PendingTransactionResponse`](modelsv2.PendingTransactionResponse.md)

#### Defined in

client/v2/algod/models/types.ts:4014
