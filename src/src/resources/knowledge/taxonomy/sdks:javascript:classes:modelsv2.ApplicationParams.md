[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / ApplicationParams

# Class: ApplicationParams

[modelsv2](../modules/modelsv2.md).ApplicationParams

Stores the global information associated with an application.

## Hierarchy

- `default`

  ↳ **`ApplicationParams`**

## Table of contents

### Constructors

- [constructor](modelsv2.ApplicationParams.md#constructor)

### Properties

- [approvalProgram](modelsv2.ApplicationParams.md#approvalprogram)
- [attribute\_map](modelsv2.ApplicationParams.md#attribute_map)
- [clearStateProgram](modelsv2.ApplicationParams.md#clearstateprogram)
- [creator](modelsv2.ApplicationParams.md#creator)
- [extraProgramPages](modelsv2.ApplicationParams.md#extraprogrampages)
- [globalState](modelsv2.ApplicationParams.md#globalstate)
- [globalStateSchema](modelsv2.ApplicationParams.md#globalstateschema)
- [localStateSchema](modelsv2.ApplicationParams.md#localstateschema)

### Methods

- [get\_obj\_for\_encoding](modelsv2.ApplicationParams.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.ApplicationParams.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ApplicationParams**(`«destructured»`)

Creates a new `ApplicationParams` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `approvalProgram` | `string` \| `Uint8Array` |
| › `clearStateProgram` | `string` \| `Uint8Array` |
| › `creator` | `string` |
| › `extraProgramPages?` | `number` \| `bigint` |
| › `globalState?` | [`TealKeyValue`](modelsv2.TealKeyValue.md)[] |
| › `globalStateSchema?` | [`ApplicationStateSchema`](modelsv2.ApplicationStateSchema.md) |
| › `localStateSchema?` | [`ApplicationStateSchema`](modelsv2.ApplicationStateSchema.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:1313

## Properties

### approvalProgram

• **approvalProgram**: `Uint8Array`

(approv) approval program.

#### Defined in

client/v2/algod/models/types.ts:1269

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### clearStateProgram

• **clearStateProgram**: `Uint8Array`

(clearp) approval program.

#### Defined in

client/v2/algod/models/types.ts:1274

___

### creator

• **creator**: `string`

The address that created this application. This is the address where the
parameters and global state for this application can be found.

#### Defined in

client/v2/algod/models/types.ts:1280

___

### extraProgramPages

• `Optional` **extraProgramPages**: `number` \| `bigint`

(epp) the amount of extra program pages available to this app.

#### Defined in

client/v2/algod/models/types.ts:1285

___

### globalState

• `Optional` **globalState**: [`TealKeyValue`](modelsv2.TealKeyValue.md)[]

(gs) global state

#### Defined in

client/v2/algod/models/types.ts:1290

___

### globalStateSchema

• `Optional` **globalStateSchema**: [`ApplicationStateSchema`](modelsv2.ApplicationStateSchema.md)

(gsch) global schema

#### Defined in

client/v2/algod/models/types.ts:1295

___

### localStateSchema

• `Optional` **localStateSchema**: [`ApplicationStateSchema`](modelsv2.ApplicationStateSchema.md)

(lsch) local schema

#### Defined in

client/v2/algod/models/types.ts:1300

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ApplicationParams`](modelsv2.ApplicationParams.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ApplicationParams`](modelsv2.ApplicationParams.md)

#### Defined in

client/v2/algod/models/types.ts:1357
