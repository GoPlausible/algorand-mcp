[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / ApplicationLocalReference

# Class: ApplicationLocalReference

[modelsv2](../modules/modelsv2.md).ApplicationLocalReference

References an account's local state for an application.

## Hierarchy

- `default`

  ↳ **`ApplicationLocalReference`**

## Table of contents

### Constructors

- [constructor](modelsv2.ApplicationLocalReference.md#constructor)

### Properties

- [account](modelsv2.ApplicationLocalReference.md#account)
- [app](modelsv2.ApplicationLocalReference.md#app)
- [attribute\_map](modelsv2.ApplicationLocalReference.md#attribute_map)

### Methods

- [get\_obj\_for\_encoding](modelsv2.ApplicationLocalReference.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.ApplicationLocalReference.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ApplicationLocalReference**(`«destructured»`)

Creates a new `ApplicationLocalReference` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `account` | `string` |
| › `app` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:1167

## Properties

### account

• **account**: `string`

Address of the account with the local state.

#### Defined in

client/v2/algod/models/types.ts:1155

___

### app

• **app**: `number` \| `bigint`

Application ID of the local state application.

#### Defined in

client/v2/algod/models/types.ts:1160

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ApplicationLocalReference`](modelsv2.ApplicationLocalReference.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ApplicationLocalReference`](modelsv2.ApplicationLocalReference.md)

#### Defined in

client/v2/algod/models/types.ts:1179
