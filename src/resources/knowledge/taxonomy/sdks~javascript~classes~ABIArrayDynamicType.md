[algosdk](../README.md) / [Exports](../modules.md) / ABIArrayDynamicType

# Class: ABIArrayDynamicType

## Hierarchy

- [`ABIType`](ABIType.md)

  ↳ **`ABIArrayDynamicType`**

## Table of contents

### Constructors

- [constructor](ABIArrayDynamicType.md#constructor)

### Properties

- [childType](ABIArrayDynamicType.md#childtype)

### Methods

- [byteLen](ABIArrayDynamicType.md#bytelen)
- [decode](ABIArrayDynamicType.md#decode)
- [encode](ABIArrayDynamicType.md#encode)
- [equals](ABIArrayDynamicType.md#equals)
- [isDynamic](ABIArrayDynamicType.md#isdynamic)
- [toABITupleType](ABIArrayDynamicType.md#toabitupletype)
- [toString](ABIArrayDynamicType.md#tostring)
- [from](ABIArrayDynamicType.md#from)

## Constructors

### constructor

• **new ABIArrayDynamicType**(`argType`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `argType` | [`ABIType`](ABIType.md) |

#### Overrides

[ABIType](ABIType.md).[constructor](ABIType.md#constructor)

#### Defined in

abi/abi_type.ts:481

## Properties

### childType

• **childType**: [`ABIType`](ABIType.md)

#### Defined in

abi/abi_type.ts:479

## Methods

### byteLen

▸ **byteLen**(): `never`

#### Returns

`never`

#### Overrides

[ABIType](ABIType.md).[byteLen](ABIType.md#bytelen)

#### Defined in

abi/abi_type.ts:501

___

### decode

▸ **decode**(`byteString`): [`ABIValue`](../modules.md#abivalue)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteString` | `Uint8Array` |

#### Returns

[`ABIValue`](../modules.md#abivalue)[]

#### Overrides

[ABIType](ABIType.md).[decode](ABIType.md#decode)

#### Defined in

abi/abi_type.ts:519

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

abi/abi_type.ts:505

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

abi/abi_type.ts:490

___

### isDynamic

▸ **isDynamic**(): `boolean`

#### Returns

`boolean`

#### Overrides

[ABIType](ABIType.md).[isDynamic](ABIType.md#isdynamic)

#### Defined in

abi/abi_type.ts:497

___

### toABITupleType

▸ **toABITupleType**(`length`): [`ABITupleType`](ABITupleType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `length` | `number` |

#### Returns

[`ABITupleType`](ABITupleType.md)

#### Defined in

abi/abi_type.ts:528

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[ABIType](ABIType.md).[toString](ABIType.md#tostring)

#### Defined in

abi/abi_type.ts:486

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
