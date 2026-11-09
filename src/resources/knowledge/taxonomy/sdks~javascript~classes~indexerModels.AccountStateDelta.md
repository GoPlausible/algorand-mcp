[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / AccountStateDelta

# Class: AccountStateDelta

[indexerModels](../modules/indexerModels.md).AccountStateDelta

Application state delta.

## Hierarchy

- `default`

  ↳ **`AccountStateDelta`**

## Table of contents

### Constructors

- [constructor](indexerModels.AccountStateDelta.md#constructor)

### Properties

- [address](indexerModels.AccountStateDelta.md#address)
- [attribute\_map](indexerModels.AccountStateDelta.md#attribute_map)
- [delta](indexerModels.AccountStateDelta.md#delta)

### Methods

- [get\_obj\_for\_encoding](indexerModels.AccountStateDelta.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.AccountStateDelta.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AccountStateDelta**(`«destructured»`)

Creates a new `AccountStateDelta` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `address` | `string` |
| › `delta` | [`EvalDeltaKeyValue`](indexerModels.EvalDeltaKeyValue.md)[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:680

## Properties

### address

• **address**: `string`

#### Defined in

client/v2/indexer/models/types.ts:668

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### delta

• **delta**: [`EvalDeltaKeyValue`](indexerModels.EvalDeltaKeyValue.md)[]

Application state delta.

#### Defined in

client/v2/indexer/models/types.ts:673

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AccountStateDelta`](indexerModels.AccountStateDelta.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AccountStateDelta`](indexerModels.AccountStateDelta.md)

#### Defined in

client/v2/indexer/models/types.ts:698
