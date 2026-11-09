[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / ApplicationStateOperation

# Class: ApplicationStateOperation

[modelsv2](../modules/modelsv2.md).ApplicationStateOperation

An operation against an application's global/local/box state.

## Hierarchy

- `default`

  ↳ **`ApplicationStateOperation`**

## Table of contents

### Constructors

- [constructor](modelsv2.ApplicationStateOperation.md#constructor)

### Properties

- [account](modelsv2.ApplicationStateOperation.md#account)
- [appStateType](modelsv2.ApplicationStateOperation.md#appstatetype)
- [attribute\_map](modelsv2.ApplicationStateOperation.md#attribute_map)
- [key](modelsv2.ApplicationStateOperation.md#key)
- [newValue](modelsv2.ApplicationStateOperation.md#newvalue)
- [operation](modelsv2.ApplicationStateOperation.md#operation)

### Methods

- [get\_obj\_for\_encoding](modelsv2.ApplicationStateOperation.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.ApplicationStateOperation.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ApplicationStateOperation**(`«destructured»`)

Creates a new `ApplicationStateOperation` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `account?` | `string` |
| › `appStateType` | `string` |
| › `key` | `string` \| `Uint8Array` |
| › `newValue?` | [`AvmValue`](modelsv2.AvmValue.md) |
| › `operation` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:1436

## Properties

### account

• `Optional` **account**: `string`

For local state changes, the address of the account associated with the local
state.

#### Defined in

client/v2/algod/models/types.ts:1419

___

### appStateType

• **appStateType**: `string`

Type of application state. Value `g` is **global state**, `l` is **local
state**, `b` is **boxes**.

#### Defined in

client/v2/algod/models/types.ts:1403

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### key

• **key**: `Uint8Array`

The key (name) of the global/local/box state.

#### Defined in

client/v2/algod/models/types.ts:1408

___

### newValue

• `Optional` **newValue**: [`AvmValue`](modelsv2.AvmValue.md)

Represents an AVM value.

#### Defined in

client/v2/algod/models/types.ts:1424

___

### operation

• **operation**: `string`

Operation type. Value `w` is **write**, `d` is **delete**.

#### Defined in

client/v2/algod/models/types.ts:1413

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ApplicationStateOperation`](modelsv2.ApplicationStateOperation.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ApplicationStateOperation`](modelsv2.ApplicationStateOperation.md)

#### Defined in

client/v2/algod/models/types.ts:1469
