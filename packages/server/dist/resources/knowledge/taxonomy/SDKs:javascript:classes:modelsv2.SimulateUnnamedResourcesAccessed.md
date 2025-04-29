[algosdk](../README.md) / [Exports](../modules.md) / [modelsv2](../modules/modelsv2.md) / SimulateUnnamedResourcesAccessed

# Class: SimulateUnnamedResourcesAccessed

[modelsv2](../modules/modelsv2.md).SimulateUnnamedResourcesAccessed

These are resources that were accessed by this group that would normally have
caused failure, but were allowed in simulation. Depending on where this object
is in the response, the unnamed resources it contains may or may not qualify for
group resource sharing. If this is a field in SimulateTransactionGroupResult,
the resources do qualify, but if this is a field in SimulateTransactionResult,
they do not qualify. In order to make this group valid for actual submission,
resources that qualify for group sharing can be made available by any
transaction of the group; otherwise, resources must be placed in the same
transaction which accessed them.

## Hierarchy

- `default`

  ↳ **`SimulateUnnamedResourcesAccessed`**

## Table of contents

### Constructors

- [constructor](modelsv2.SimulateUnnamedResourcesAccessed.md#constructor)

### Properties

- [accounts](modelsv2.SimulateUnnamedResourcesAccessed.md#accounts)
- [appLocals](modelsv2.SimulateUnnamedResourcesAccessed.md#applocals)
- [apps](modelsv2.SimulateUnnamedResourcesAccessed.md#apps)
- [assetHoldings](modelsv2.SimulateUnnamedResourcesAccessed.md#assetholdings)
- [assets](modelsv2.SimulateUnnamedResourcesAccessed.md#assets)
- [attribute\_map](modelsv2.SimulateUnnamedResourcesAccessed.md#attribute_map)
- [boxes](modelsv2.SimulateUnnamedResourcesAccessed.md#boxes)
- [extraBoxRefs](modelsv2.SimulateUnnamedResourcesAccessed.md#extraboxrefs)

### Methods

- [get\_obj\_for\_encoding](modelsv2.SimulateUnnamedResourcesAccessed.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](modelsv2.SimulateUnnamedResourcesAccessed.md#from_obj_for_encoding)

## Constructors

### constructor

• **new SimulateUnnamedResourcesAccessed**(`«destructured»`)

Creates a new `SimulateUnnamedResourcesAccessed` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `accounts?` | `string`[] |
| › `appLocals?` | [`ApplicationLocalReference`](modelsv2.ApplicationLocalReference.md)[] |
| › `apps?` | (`number` \| `bigint`)[] |
| › `assetHoldings?` | [`AssetHoldingReference`](modelsv2.AssetHoldingReference.md)[] |
| › `assets?` | (`number` \| `bigint`)[] |
| › `boxes?` | [`BoxReference`](modelsv2.BoxReference.md)[] |
| › `extraBoxRefs?` | `number` \| `bigint` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/algod/models/types.ts:4945

## Properties

### accounts

• `Optional` **accounts**: `string`[]

The unnamed accounts that were referenced. The order of this array is arbitrary.

#### Defined in

client/v2/algod/models/types.ts:4893

___

### appLocals

• `Optional` **appLocals**: [`ApplicationLocalReference`](modelsv2.ApplicationLocalReference.md)[]

The unnamed application local states that were referenced. The order of this
array is arbitrary.

#### Defined in

client/v2/algod/models/types.ts:4899

___

### apps

• `Optional` **apps**: (`number` \| `bigint`)[]

The unnamed applications that were referenced. The order of this array is
arbitrary.

#### Defined in

client/v2/algod/models/types.ts:4905

___

### assetHoldings

• `Optional` **assetHoldings**: [`AssetHoldingReference`](modelsv2.AssetHoldingReference.md)[]

The unnamed asset holdings that were referenced. The order of this array is
arbitrary.

#### Defined in

client/v2/algod/models/types.ts:4911

___

### assets

• `Optional` **assets**: (`number` \| `bigint`)[]

The unnamed assets that were referenced. The order of this array is arbitrary.

#### Defined in

client/v2/algod/models/types.ts:4916

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### boxes

• `Optional` **boxes**: [`BoxReference`](modelsv2.BoxReference.md)[]

The unnamed boxes that were referenced. The order of this array is arbitrary.

#### Defined in

client/v2/algod/models/types.ts:4921

___

### extraBoxRefs

• `Optional` **extraBoxRefs**: `number` \| `bigint`

The number of extra box references used to increase the IO budget. This is in
addition to the references defined in the input transaction group and any
referenced to unnamed boxes.

#### Defined in

client/v2/algod/models/types.ts:4928

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

▸ `Static` **from_obj_for_encoding**(`data`): [`SimulateUnnamedResourcesAccessed`](modelsv2.SimulateUnnamedResourcesAccessed.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`SimulateUnnamedResourcesAccessed`](modelsv2.SimulateUnnamedResourcesAccessed.md)

#### Defined in

client/v2/algod/models/types.ts:4983
