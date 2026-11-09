[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / StateSchema

# Class: StateSchema

[indexerModels](../modules/indexerModels.md).StateSchema

Represents a (apls) local-state or (apgs) global-state schema. These schemas
determine how much storage may be used in a local-state or global-state for an
application. The more space used, the larger minimum balance must be maintained
in the account holding the data.

## Hierarchy

- `default`

  ↳ **`StateSchema`**

## Table of contents

### Constructors

- [constructor](indexerModels.StateSchema.md#constructor)

### Properties

- [attribute\_map](indexerModels.StateSchema.md#attribute_map)
- [numByteSlice](indexerModels.StateSchema.md#numbyteslice)
- [numUint](indexerModels.StateSchema.md#numuint)

### Methods

- [get\_obj\_for\_encoding](indexerModels.StateSchema.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.StateSchema.md#from_obj_for_encoding)

## Constructors

### constructor

• **new StateSchema**(`«destructured»`)

Creates a new `StateSchema` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `numByteSlice` | `number` \| `bigint` |
| › `numUint` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:3944

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### numByteSlice

• **numByteSlice**: `number` \| `bigint`

Maximum number of TEAL byte slices that may be stored in the key/value store.

#### Defined in

client/v2/indexer/models/types.ts:3932

___

### numUint

• **numUint**: `number` \| `bigint`

Maximum number of TEAL uints that may be stored in the key/value store.

#### Defined in

client/v2/indexer/models/types.ts:3937

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

▸ `Static` **from_obj_for_encoding**(`data`): [`StateSchema`](indexerModels.StateSchema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`StateSchema`](indexerModels.StateSchema.md)

#### Defined in

client/v2/indexer/models/types.ts:3962
