[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / AppCallLogs

# Class: AppCallLogs

[modelsv2](../modules/modelsv2.md).AppCallLogs

The logged messages from an app call along with the app ID and outer transaction
ID. Logs appear in the same order that they were emitted.

## Hierarchy

- `default`

  ↳ **`AppCallLogs`**

## Table of contents

### Constructors

- [constructor](modelsv2.AppCallLogs.md#constructor)

### Properties

- [applicationIndex](modelsv2.AppCallLogs.md#applicationindex)
- [attribute\_map](modelsv2.AppCallLogs.md#attribute_map)
- [logs](modelsv2.AppCallLogs.md#logs)
- [txid](modelsv2.AppCallLogs.md#txid)

### Methods

- [get\_obj\_for\_encoding](modelsv2.AppCallLogs.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.AppCallLogs.md#from_obj_for_encoding)

## Constructors

### constructor

• **new AppCallLogs**(`«destructured»`)

Creates a new `AppCallLogs` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `applicationIndex` | `number` \| `bigint` |
| › `logs` | `Uint8Array`[] |
| › `txid` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:924

## Properties

### applicationIndex

• **applicationIndex**: `number` \| `bigint`

The application from which the logs were generated

#### Defined in

client/v2/algod/models/types.ts:906

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### logs

• **logs**: `Uint8Array`[]

An array of logs

#### Defined in

client/v2/algod/models/types.ts:911

___

### txid

• **txid**: `string`

The transaction ID of the outer app call that lead to these logs

#### Defined in

client/v2/algod/models/types.ts:916

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

▸ `Static` **from_obj_for_encoding**(`data`): [`AppCallLogs`](modelsv2.AppCallLogs.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`AppCallLogs`](modelsv2.AppCallLogs.md)

#### Defined in

client/v2/algod/models/types.ts:946
