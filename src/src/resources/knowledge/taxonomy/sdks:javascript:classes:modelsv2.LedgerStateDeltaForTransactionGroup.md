[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / LedgerStateDeltaForTransactionGroup

# Class: LedgerStateDeltaForTransactionGroup

[modelsv2](../modules/modelsv2.md).LedgerStateDeltaForTransactionGroup

Contains a ledger delta for a single transaction group

## Hierarchy

- `default`

  ↳ **`LedgerStateDeltaForTransactionGroup`**

## Table of contents

### Constructors

- [constructor](modelsv2.LedgerStateDeltaForTransactionGroup.md#constructor)

### Properties

- [attribute\_map](modelsv2.LedgerStateDeltaForTransactionGroup.md#attribute_map)
- [delta](modelsv2.LedgerStateDeltaForTransactionGroup.md#delta)
- [ids](modelsv2.LedgerStateDeltaForTransactionGroup.md#ids)

### Methods

- [get\_obj\_for\_encoding](modelsv2.LedgerStateDeltaForTransactionGroup.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.LedgerStateDeltaForTransactionGroup.md#from_obj_for_encoding)

## Constructors

### constructor

• **new LedgerStateDeltaForTransactionGroup**(`«destructured»`)

Creates a new `LedgerStateDeltaForTransactionGroup` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `delta` | `Record`\<`string`, `any`\> |
| › `ids` | `string`[] |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:3384

## Properties

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### delta

• **delta**: `Record`\<`string`, `any`\>

Ledger StateDelta object

#### Defined in

client/v2/algod/models/types.ts:3375

___

### ids

• **ids**: `string`[]

#### Defined in

client/v2/algod/models/types.ts:3377

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

▸ `Static` **from_obj_for_encoding**(`data`): [`LedgerStateDeltaForTransactionGroup`](modelsv2.LedgerStateDeltaForTransactionGroup.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`LedgerStateDeltaForTransactionGroup`](modelsv2.LedgerStateDeltaForTransactionGroup.md)

#### Defined in

client/v2/algod/models/types.ts:3396
