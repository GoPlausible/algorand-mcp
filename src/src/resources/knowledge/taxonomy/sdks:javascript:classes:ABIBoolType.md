[algosdk](../README.md) / [Exports](../modules.md) / ABIBoolType

# Class: ABIBoolType

## Hierarchy

- [`ABIType`](ABIType.md)

  ↳ **`ABIBoolType`**

## Table of contents

### Constructors

- [constructor](ABIBoolType.md#constructor)

### Methods

- [byteLen](ABIBoolType.md#bytelen)
- [decode](ABIBoolType.md#decode)
- [encode](ABIBoolType.md#encode)
- [equals](ABIBoolType.md#equals)
- [isDynamic](ABIBoolType.md#isdynamic)
- [toString](ABIBoolType.md#tostring)
- [from](ABIBoolType.md#from)

## Constructors

### constructor

• **new ABIBoolType**()

#### Inherited from

[ABIType](ABIType.md).[constructor](ABIType.md#constructor)

## Methods

### byteLen

▸ **byteLen**(): `number`

#### Returns

`number`

#### Overrides

[ABIType](ABIType.md).[byteLen](ABIType.md#bytelen)

#### Defined in

abi/abi_type.ts:294

___

### decode

▸ **decode**(`byteString`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteString` | `Uint8Array` |

#### Returns

`boolean`

#### Overrides

[ABIType](ABIType.md).[decode](ABIType.md#decode)

#### Defined in

abi/abi_type.ts:308

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

abi/abi_type.ts:298

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

abi/abi_type.ts:286

___

### isDynamic

▸ **isDynamic**(): `boolean`

#### Returns

`boolean`

#### Overrides

[ABIType](ABIType.md).[isDynamic](ABIType.md#isdynamic)

#### Defined in

abi/abi_type.ts:290

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[ABIType](ABIType.md).[toString](ABIType.md#tostring)

#### Defined in

abi/abi_type.ts:282

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
