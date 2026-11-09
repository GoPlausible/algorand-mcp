[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / ApplicationParams

# Class: ApplicationParams

[indexerModels](../modules/indexerModels.md).ApplicationParams

Stores the global information associated with an application.

## Hierarchy

- `default`

  ↳ **`ApplicationParams`**

## Table of contents

### Constructors

- [constructor](indexerModels.ApplicationParams.md#constructor)

### Properties

- [approvalProgram](indexerModels.ApplicationParams.md#approvalprogram)
- [attribute\_map](indexerModels.ApplicationParams.md#attribute_map)
- [clearStateProgram](indexerModels.ApplicationParams.md#clearstateprogram)
- [creator](indexerModels.ApplicationParams.md#creator)
- [extraProgramPages](indexerModels.ApplicationParams.md#extraprogrampages)
- [globalState](indexerModels.ApplicationParams.md#globalstate)
- [globalStateSchema](indexerModels.ApplicationParams.md#globalstateschema)
- [localStateSchema](indexerModels.ApplicationParams.md#localstateschema)

### Methods

- [get\_obj\_for\_encoding](indexerModels.ApplicationParams.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.ApplicationParams.md#from_obj_for_encoding)

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
| › `creator?` | `string` |
| › `extraProgramPages?` | `number` \| `bigint` |
| › `globalState?` | [`TealKeyValue`](indexerModels.TealKeyValue.md)[] |
| › `globalStateSchema?` | [`ApplicationStateSchema`](indexerModels.ApplicationStateSchema.md) |
| › `localStateSchema?` | [`ApplicationStateSchema`](indexerModels.ApplicationStateSchema.md) |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:1213

## Properties

### approvalProgram

• **approvalProgram**: `Uint8Array`

approval program.

#### Defined in

client/v2/indexer/models/types.ts:1169

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

clear state program.

#### Defined in

client/v2/indexer/models/types.ts:1174

___

### creator

• `Optional` **creator**: `string`

The address that created this application. This is the address where the
parameters and global state for this application can be found.

#### Defined in

client/v2/indexer/models/types.ts:1180

___

### extraProgramPages

• `Optional` **extraProgramPages**: `number` \| `bigint`

the number of extra program pages available to this app.

#### Defined in

client/v2/indexer/models/types.ts:1185

___

### globalState

• `Optional` **globalState**: [`TealKeyValue`](indexerModels.TealKeyValue.md)[]

global state

#### Defined in

client/v2/indexer/models/types.ts:1190

___

### globalStateSchema

• `Optional` **globalStateSchema**: [`ApplicationStateSchema`](indexerModels.ApplicationStateSchema.md)

global schema

#### Defined in

client/v2/indexer/models/types.ts:1195

___

### localStateSchema

• `Optional` **localStateSchema**: [`ApplicationStateSchema`](indexerModels.ApplicationStateSchema.md)

local schema

#### Defined in

client/v2/indexer/models/types.ts:1200

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ApplicationParams`](indexerModels.ApplicationParams.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ApplicationParams`](indexerModels.ApplicationParams.md)

#### Defined in

client/v2/indexer/models/types.ts:1257
