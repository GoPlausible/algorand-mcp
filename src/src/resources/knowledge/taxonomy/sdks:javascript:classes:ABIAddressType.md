[algosdk](../README.md) / [Exports](../modules.md) / ABIAddressType

# Class: ABIAddressType

## Hierarchy

- [`ABIType`](ABIType.md)

  ↳ **`ABIAddressType`**

## Table of contents

### Constructors

- [constructor](ABIAddressType.md#constructor)

### Methods

- [byteLen](ABIAddressType.md#bytelen)
- [decode](ABIAddressType.md#decode)
- [encode](ABIAddressType.md#encode)
- [equals](ABIAddressType.md#equals)
- [isDynamic](ABIAddressType.md#isdynamic)
- [toString](ABIAddressType.md#tostring)
- [from](ABIAddressType.md#from)

## Constructors

### constructor

• **new ABIAddressType**()

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

abi/abi_type.ts:254

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

abi/abi_type.ts:273

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

abi/abi_type.ts:258

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

abi/abi_type.ts:246

___

### isDynamic

▸ **isDynamic**(): `boolean`

#### Returns

`boolean`

#### Overrides

[ABIType](ABIType.md).[isDynamic](ABIType.md#isdynamic)

#### Defined in

abi/abi_type.ts:250

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[ABIType](ABIType.md).[toString](ABIType.md#tostring)

#### Defined in

abi/abi_type.ts:242

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
