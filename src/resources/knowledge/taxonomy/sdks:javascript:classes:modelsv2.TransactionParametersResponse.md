[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / TransactionParametersResponse

# Class: TransactionParametersResponse

[modelsv2](../modules/modelsv2.md).TransactionParametersResponse

TransactionParams contains the parameters that help a client construct a new
transaction.

## Hierarchy

- `default`

  ↳ **`TransactionParametersResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.TransactionParametersResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.TransactionParametersResponse.md#attribute_map)
- [consensusVersion](modelsv2.TransactionParametersResponse.md#consensusversion)
- [fee](modelsv2.TransactionParametersResponse.md#fee)
- [genesisHash](modelsv2.TransactionParametersResponse.md#genesishash)
- [genesisId](modelsv2.TransactionParametersResponse.md#genesisid)
- [lastRound](modelsv2.TransactionParametersResponse.md#lastround)
- [minFee](modelsv2.TransactionParametersResponse.md#minfee)

### Methods

- [get\_obj\_for\_encoding](modelsv2.TransactionParametersResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.TransactionParametersResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionParametersResponse**(`«destructured»`)

Creates a new `TransactionParametersResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `consensusVersion` | `string` |
| › `fee` | `number` \| `bigint` |
| › `genesisHash` | `string` \| `Uint8Array` |
| › `genesisId` | `string` |
| › `lastRound` | `number` \| `bigint` |
| › `minFee` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:5816

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### consensusVersion

• **consensusVersion**: `string`

ConsensusVersion indicates the consensus protocol version
as of LastRound.

#### Defined in

client/v2/algod/models/types.ts:5771

___

### fee

• **fee**: `number` \| `bigint`

Fee is the suggested transaction fee
Fee is in units of micro-Algos per byte.
Fee may fall to zero but transactions must still have a fee of
at least MinTxnFee for the current network protocol.

#### Defined in

client/v2/algod/models/types.ts:5779

___

### genesisHash

• **genesisHash**: `Uint8Array`

GenesisHash is the hash of the genesis block.

#### Defined in

client/v2/algod/models/types.ts:5784

___

### genesisId

• **genesisId**: `string`

GenesisID is an ID listed in the genesis block.

#### Defined in

client/v2/algod/models/types.ts:5789

___

### lastRound

• **lastRound**: `number` \| `bigint`

LastRound indicates the last round seen

#### Defined in

client/v2/algod/models/types.ts:5794

___

### minFee

• **minFee**: `number` \| `bigint`

The minimum transaction fee (not per byte) required for the
txn to validate for the current network protocol.

#### Defined in

client/v2/algod/models/types.ts:5800

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

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionParametersResponse`](modelsv2.TransactionParametersResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionParametersResponse`](modelsv2.TransactionParametersResponse.md)

#### Defined in

client/v2/algod/models/types.ts:5853
