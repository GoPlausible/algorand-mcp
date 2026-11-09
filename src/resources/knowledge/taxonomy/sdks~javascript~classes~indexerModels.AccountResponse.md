[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / AccountResponse

# Class: AccountResponse

[indexerModels](../modules/indexerModels.md).AccountResponse

## Hierarchy

- `default`

  ↳ **`AccountResponse`**

## Table of contents

### Constructors

- [constructor](indexerModels.AccountResponse.md#constructor)

### Properties

- [account](indexerModels.AccountResponse.md#account)
- [attribute\_map](indexerModels.AccountResponse.md#attribute_map)
- [currentRound](indexerModels.AccountResponse.md#currentround)

### Methods

- [get\_obj\_for\_encoding](indexerModels.AccountResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.AccountResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AccountResponse**(`«destructured»`)

Creates a new `AccountResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `account` | [`Account`](indexerModels.Account.md) |
| › `currentRound` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:630

## Properties

### account

• **account**: [`Account`](indexerModels.Account.md)

Account information at a given round.
Definition:
data/basics/userBalance.go : AccountData

#### Defined in

client/v2/indexer/models/types.ts:616

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### currentRound

• **currentRound**: `number` \| `bigint`

Round at which the results were computed.

#### Defined in

client/v2/indexer/models/types.ts:621

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AccountResponse`](indexerModels.AccountResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AccountResponse`](indexerModels.AccountResponse.md)

#### Defined in

client/v2/indexer/models/types.ts:648
