[algosdk](../README.md) / [Exports](../modules.md) / ABIUfixedType

# Class: ABIUfixedType

## Hierarchy

- [`ABIType`](ABIType.md)

  ↳ **`ABIUfixedType`**

## Table of contents

### Constructors

- [constructor](ABIUfixedType.md#constructor)

### Properties

- [bitSize](ABIUfixedType.md#bitsize)
- [precision](ABIUfixedType.md#precision)

### Methods

- [byteLen](ABIUfixedType.md#bytelen)
- [decode](ABIUfixedType.md#decode)
- [encode](ABIUfixedType.md#encode)
- [equals](ABIUfixedType.md#equals)
- [isDynamic](ABIUfixedType.md#isdynamic)
- [toString](ABIUfixedType.md#tostring)
- [from](ABIUfixedType.md#from)

## Constructors

### constructor

• **new ABIUfixedType**(`size`, `denominator`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |
| `denominator` | `number` |

#### Overrides

[ABIType](ABIType.md).[constructor](ABIType.md#constructor)

#### Defined in

abi/abi_type.ts:184

## Properties

### bitSize

• **bitSize**: `number`

#### Defined in

abi/abi_type.ts:181

___

### precision

• **precision**: `number`

#### Defined in

abi/abi_type.ts:182

## Methods

### byteLen

▸ **byteLen**(): `number`

#### Returns

`number`

#### Overrides

[ABIType](ABIType.md).[byteLen](ABIType.md#bytelen)

#### Defined in

abi/abi_type.ts:212

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

abi/abi_type.ts:233

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

abi/abi_type.ts:216

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

abi/abi_type.ts:200

___

### isDynamic

▸ **isDynamic**(): `boolean`

#### Returns

`boolean`

#### Overrides

[ABIType](ABIType.md).[isDynamic](ABIType.md#isdynamic)

#### Defined in

abi/abi_type.ts:208

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[ABIType](ABIType.md).[toString](ABIType.md#tostring)

#### Defined in

abi/abi_type.ts:196

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
