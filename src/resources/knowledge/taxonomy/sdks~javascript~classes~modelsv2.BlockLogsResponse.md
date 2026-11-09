[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / BlockLogsResponse

# Class: BlockLogsResponse

[modelsv2](../modules/modelsv2.md).BlockLogsResponse

All logs emitted in the given round. Each app call, whether top-level or inner,
that contains logs results in a separate AppCallLogs object. Therefore there may
be multiple AppCallLogs with the same application ID and outer transaction ID in
the event of multiple inner app calls to the same app. App calls with no logs
are not included in the response. AppCallLogs are returned in the same order
that their corresponding app call appeared in the block (pre-order traversal of
inner app calls)

## Hierarchy

- `default`

  ↳ **`BlockLogsResponse`**

## Table of contents

### Constructors

- [constructor](modelsv2.BlockLogsResponse.md#constructor)

### Properties

- [attribute\_map](modelsv2.BlockLogsResponse.md#attribute_map)
- [logs](modelsv2.BlockLogsResponse.md#logs)

### Methods

- [get\_obj\_for\_encoding](modelsv2.BlockLogsResponse.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.BlockLogsResponse.md#from_obj_for_encoding)

## Constructors

### constructor

• **new BlockLogsResponse**(`logs`)

Creates a new `BlockLogsResponse` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `logs` | `Object` |
| `logs.logs` | [`AppCallLogs`](modelsv2.AppCallLogs.md)[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:2117

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### logs

• **logs**: [`AppCallLogs`](modelsv2.AppCallLogs.md)[]

#### Defined in

client/v2/algod/models/types.ts:2111

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

▸ `Static` **from_obj_for_encoding**(`data`): [`BlockLogsResponse`](modelsv2.BlockLogsResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`BlockLogsResponse`](modelsv2.BlockLogsResponse.md)

#### Defined in

client/v2/algod/models/types.ts:2127
