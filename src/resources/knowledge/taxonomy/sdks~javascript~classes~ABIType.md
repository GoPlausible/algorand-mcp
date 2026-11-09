[algosdk](../README.md) / [Exports](../modules.md) / ABIType

# Class: ABIType

## Hierarchy

- **`ABIType`**

  ↳ [`ABIUintType`](ABIUintType.md)

  ↳ [`ABIUfixedType`](ABIUfixedType.md)

  ↳ [`ABIAddressType`](ABIAddressType.md)

  ↳ [`ABIBoolType`](ABIBoolType.md)

  ↳ [`ABIByteType`](ABIByteType.md)

  ↳ [`ABIStringType`](ABIStringType.md)

  ↳ [`ABIArrayStaticType`](ABIArrayStaticType.md)

  ↳ [`ABIArrayDynamicType`](ABIArrayDynamicType.md)

  ↳ [`ABITupleType`](ABITupleType.md)

## Table of contents

### Constructors

- [constructor](ABIType.md#constructor)

### Methods

- [byteLen](ABIType.md#bytelen)
- [decode](ABIType.md#decode)
- [encode](ABIType.md#encode)
- [equals](ABIType.md#equals)
- [isDynamic](ABIType.md#isdynamic)
- [toString](ABIType.md#tostring)
- [from](ABIType.md#from)

## Constructors

### constructor

• **new ABIType**()

## Methods

### byteLen

▸ `Abstract` **byteLen**(): `number`

#### Returns

`number`

#### Defined in

abi/abi_type.ts:51

___

### decode

▸ `Abstract` **decode**(`byteString`): [`ABIValue`](../modules.md#abivalue)

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteString` | `Uint8Array` |

#### Returns

[`ABIValue`](../modules.md#abivalue)

#### Defined in

abi/abi_type.ts:55

___

### encode

▸ `Abstract` **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`ABIValue`](../modules.md#abivalue) |

#### Returns

`Uint8Array`

#### Defined in

abi/abi_type.ts:53

___

### equals

▸ `Abstract` **equals**(`other`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `other` | [`ABIType`](ABIType.md) |

#### Returns

`boolean`

#### Defined in

abi/abi_type.ts:47

___

### isDynamic

▸ `Abstract` **isDynamic**(): `boolean`

#### Returns

`boolean`

#### Defined in

abi/abi_type.ts:49

___

### toString

▸ `Abstract` **toString**(): `string`

#### Returns

`string`

#### Defined in

abi/abi_type.ts:45

___

### from

▸ `Static` **from**(`str`): [`ABIType`](ABIType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`ABIType`](ABIType.md)

#### Defined in

abi/abi_type.ts:57
