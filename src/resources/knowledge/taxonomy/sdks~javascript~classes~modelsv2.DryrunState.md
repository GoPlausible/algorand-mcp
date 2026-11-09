[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / DryrunState

# Class: DryrunState

[modelsv2](../modules/modelsv2.md).DryrunState

Stores the TEAL eval step data

## Hierarchy

- `default`

  ↳ **`DryrunState`**

## Table of contents

### Constructors

- [constructor](modelsv2.DryrunState.md#constructor)

### Properties

- [attribute\_map](modelsv2.DryrunState.md#attribute_map)
- [error](modelsv2.DryrunState.md#error)
- [line](modelsv2.DryrunState.md#line)
- [pc](modelsv2.DryrunState.md#pc)
- [scratch](modelsv2.DryrunState.md#scratch)
- [stack](modelsv2.DryrunState.md#stack)

### Methods

- [get\_obj\_for\_encoding](modelsv2.DryrunState.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.DryrunState.md#from_obj_for_encoding)

## Constructors

### constructor

• **new DryrunState**(`«destructured»`)

Creates a new `DryrunState` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `error?` | `string` |
| › `line` | `number` \| `bigint` |
| › `pc` | `number` \| `bigint` |
| › `scratch?` | [`TealValue`](modelsv2.TealValue.md)[] |
| › `stack` | [`TealValue`](modelsv2.TealValue.md)[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2898

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### error

• `Optional` **error**: `string`

Evaluation error if any

#### Defined in

client/v2/algod/models/types.ts:2886

___

### line

• **line**: `number` \| `bigint`

Line number

#### Defined in

client/v2/algod/models/types.ts:2874

___

### pc

• **pc**: `number` \| `bigint`

Program counter

#### Defined in

client/v2/algod/models/types.ts:2879

___

### scratch

• `Optional` **scratch**: [`TealValue`](modelsv2.TealValue.md)[]

#### Defined in

client/v2/algod/models/types.ts:2888

___

### stack

• **stack**: [`TealValue`](modelsv2.TealValue.md)[]

#### Defined in

client/v2/algod/models/types.ts:2881

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

▸ `Static` **from_obj_for_encoding**(`data`): [`DryrunState`](modelsv2.DryrunState.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`DryrunState`](modelsv2.DryrunState.md)

#### Defined in

client/v2/algod/models/types.ts:2928
