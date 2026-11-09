[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / ApplicationLogData

# Class: ApplicationLogData

[indexerModels](../modules/indexerModels.md).ApplicationLogData

Stores the global information associated with an application.

## Hierarchy

- `default`

  ↳ **`ApplicationLogData`**

## Table of contents

### Constructors

- [constructor](indexerModels.ApplicationLogData.md#constructor)

### Properties

- [attribute\_map](indexerModels.ApplicationLogData.md#attribute_map)
- [logs](indexerModels.ApplicationLogData.md#logs)
- [txid](indexerModels.ApplicationLogData.md#txid)

### Methods

- [get\_obj\_for\_encoding](indexerModels.ApplicationLogData.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.ApplicationLogData.md#from_obj_for_encoding)

## Constructors

### constructor

• **new ApplicationLogData**(`«destructured»`)

Creates a new `ApplicationLogData` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `logs` | `Uint8Array`[] |
| › `txid` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:1053

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### logs

• **logs**: `Uint8Array`[]

Logs for the application being executed by the transaction.

#### Defined in

client/v2/indexer/models/types.ts:1041

___

### txid

• **txid**: `string`

Transaction ID

#### Defined in

client/v2/indexer/models/types.ts:1046

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

▸ `Static` **from_obj_for_encoding**(`data`): [`ApplicationLogData`](indexerModels.ApplicationLogData.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`ApplicationLogData`](indexerModels.ApplicationLogData.md)

#### Defined in

client/v2/indexer/models/types.ts:1065
