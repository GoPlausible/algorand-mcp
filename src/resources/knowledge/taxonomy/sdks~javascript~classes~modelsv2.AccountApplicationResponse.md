[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / AccountApplicationResponse

# Class: AccountApplicationResponse

[modelsv2](../modules/modelsv2.md).AccountApplicationResponse

AccountApplicationResponse describes the account's application local state and
global state (AppLocalState and AppParams, if either exists) for a specific
application ID. Global state will only be returned if the provided address is
the application's creator.

## Hierarchy

- `default`

  ↳ **`AccountApplicationResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.AccountApplicationResponse.md#constructor)

### Properties

- [appLocalState](modelsv2.AccountApplicationResponse.md#applocalstate)
- [attribute\_map](modelsv2.AccountApplicationResponse.md#attribute_map)
- [createdApp](modelsv2.AccountApplicationResponse.md#createdapp)
- [round](modelsv2.AccountApplicationResponse.md#round)

### Methods

- [get\_obj\_for\_encoding](modelsv2.AccountApplicationResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.AccountApplicationResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AccountApplicationResponse**(`«destructured»`)

Creates a new `AccountApplicationResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `appLocalState?` | [`ApplicationLocalState`](modelsv2.ApplicationLocalState.md) |
| › `createdApp?` | [`ApplicationParams`](modelsv2.ApplicationParams.md) |
| › `round` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:481

## Properties

### appLocalState

• `Optional` **appLocalState**: [`ApplicationLocalState`](modelsv2.ApplicationLocalState.md)

(appl) the application local data stored in this account.
The raw account uses `AppLocalState` for this type.

#### Defined in

client/v2/algod/models/types.ts:463

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### createdApp

• `Optional` **createdApp**: [`ApplicationParams`](modelsv2.ApplicationParams.md)

(appp) parameters of the application created by this account including app
global data.
The raw account uses `AppParams` for this type.

#### Defined in

client/v2/algod/models/types.ts:470

___

### round

• **round**: `number` \| `bigint`

The round for which this information is relevant.

#### Defined in

client/v2/algod/models/types.ts:457

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AccountApplicationResponse`](modelsv2.AccountApplicationResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AccountApplicationResponse`](modelsv2.AccountApplicationResponse.md)

#### Defined in

client/v2/algod/models/types.ts:503
