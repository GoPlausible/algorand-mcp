[algosdk](../README.md) / [Exports](../modules.md) / ABIUintType

# Class: ABIUintType

## Hierarchy

- [`ABIType`](ABIType.md)

  ↳ **`ABIUintType`**

## Table of contents

### Constructors

- [constructor](ABIUintType.md#constructor)

### Properties

- [bitSize](ABIUintType.md#bitsize)

### Methods

- [byteLen](ABIUintType.md#bytelen)
- [decode](ABIUintType.md#decode)
- [encode](ABIUintType.md#encode)
- [equals](ABIUintType.md#equals)
- [isDynamic](ABIUintType.md#isdynamic)
- [toString](ABIUintType.md#tostring)
- [from](ABIUintType.md#from)

## Constructors

### constructor

• **new ABIUintType**(`size`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Overrides

[ABIType](ABIType.md).[constructor](ABIType.md#constructor)

#### Defined in

abi/abi_type.ts:131

## Properties

### bitSize

• **bitSize**: `number`

#### Defined in

abi/abi_type.ts:129

## Methods

### byteLen

▸ **byteLen**(): `number`

#### Returns

`number`

#### Overrides

[ABIType](ABIType.md).[byteLen](ABIType.md#bytelen)

#### Defined in

abi/abi_type.ts:151

___

### decode

▸ **decode**(`byteString`): `bigint`

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteString` | `Uint8Array` |

#### Returns

`bigint`

#### Overrides

[ABIType](ABIType.md).[decode](ABIType.md#decode)

#### Defined in

abi/abi_type.ts:172

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ABIValue`](../modules.md#abivalue) |

#### Returns

`Uint8Array`

#### Overrides

[ABIType](ABIType.md).[encode](ABIType.md#encode)

#### Defined in

abi/abi_type.ts:155

___

### equals

▸ **equals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`ABIType`](ABIType.md) |

#### Returns

`boolean`

#### Overrides

[ABIType](ABIType.md).[equals](ABIType.md#equals)

#### Defined in

abi/abi_type.ts:143

___

### isDynamic

▸ **isDynamic**(): `boolean`

#### Returns

`boolean`

#### Overrides

[ABIType](ABIType.md).[isDynamic](ABIType.md#isdynamic)

#### Defined in

abi/abi_type.ts:147

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[ABIType](ABIType.md).[toString](ABIType.md#tostring)

#### Defined in

abi/abi_type.ts:139

___

### from

▸ `Static` **from**(`str`): [`ABIType`](ABIType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`ABIType`](ABIType.md)

#### Inherited from

[ABIType](ABIType.md).[from](ABIType.md#from)

#### Defined in

abi/abi_type.ts:57
