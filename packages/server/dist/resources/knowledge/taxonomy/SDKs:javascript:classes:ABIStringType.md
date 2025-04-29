[algosdk](../README.md) / [Exports](../modules.md) / ABIStringType

# Class: ABIStringType

## Hierarchy

- [`ABIType`](ABIType.md)

  ↳ **`ABIStringType`**

## Table of contents

### Constructors

- [constructor](ABIStringType.md#constructor)

### Methods

- [byteLen](ABIStringType.md#bytelen)
- [decode](ABIStringType.md#decode)
- [encode](ABIStringType.md#encode)
- [equals](ABIStringType.md#equals)
- [isDynamic](ABIStringType.md#isdynamic)
- [toString](ABIStringType.md#tostring)
- [from](ABIStringType.md#from)

## Constructors

### constructor

• **new ABIStringType**()

#### Inherited from

[ABIType](ABIType.md).[constructor](ABIType.md#constructor)

## Methods

### byteLen

▸ **byteLen**(): `never`

#### Returns

`never`

#### Overrides

[ABIType](ABIType.md).[byteLen](ABIType.md#bytelen)

#### Defined in

abi/abi_type.ts:375

___

### decode

▸ **decode**(`byteString`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteString` | `Uint8Array` |

#### Returns

`string`

#### Overrides

[ABIType](ABIType.md).[decode](ABIType.md#decode)

#### Defined in

abi/abi_type.ts:396

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

abi/abi_type.ts:379

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

abi/abi_type.ts:367

___

### isDynamic

▸ **isDynamic**(): `boolean`

#### Returns

`boolean`

#### Overrides

[ABIType](ABIType.md).[isDynamic](ABIType.md#isdynamic)

#### Defined in

abi/abi_type.ts:371

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[ABIType](ABIType.md).[toString](ABIType.md#tostring)

#### Defined in

abi/abi_type.ts:363

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
