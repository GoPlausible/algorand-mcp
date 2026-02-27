[algosdk](../README.md) / [Exports](../modules.md) / ABIArrayStaticType

# Class: ABIArrayStaticType

## Hierarchy

- [`ABIType`](ABIType.md)

  ↳ **`ABIArrayStaticType`**

## Table of contents

### Constructors

- [constructor](ABIArrayStaticType.md#constructor)

### Properties

- [childType](ABIArrayStaticType.md#childtype)
- [staticLength](ABIArrayStaticType.md#staticlength)

### Methods

- [byteLen](ABIArrayStaticType.md#bytelen)
- [decode](ABIArrayStaticType.md#decode)
- [encode](ABIArrayStaticType.md#encode)
- [equals](ABIArrayStaticType.md#equals)
- [isDynamic](ABIArrayStaticType.md#isdynamic)
- [toABITupleType](ABIArrayStaticType.md#toabitupletype)
- [toString](ABIArrayStaticType.md#tostring)
- [from](ABIArrayStaticType.md#from)

## Constructors

### constructor

• **new ABIArrayStaticType**(`argType`, `arrayLength`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `argType` | [`ABIType`](ABIType.md) |
| `arrayLength` | `number` |

#### Overrides

[ABIType](ABIType.md).[constructor](ABIType.md#constructor)

#### Defined in

abi/abi_type.ts:421

## Properties

### childType

• **childType**: [`ABIType`](ABIType.md)

#### Defined in

abi/abi_type.ts:418

___

### staticLength

• **staticLength**: `number`

#### Defined in

abi/abi_type.ts:419

## Methods

### byteLen

▸ **byteLen**(): `number`

#### Returns

`number`

#### Overrides

[ABIType](ABIType.md).[byteLen](ABIType.md#bytelen)

#### Defined in

abi/abi_type.ts:448

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

abi/abi_type.ts:468

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

abi/abi_type.ts:455

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

abi/abi_type.ts:436

___

### isDynamic

▸ **isDynamic**(): `boolean`

#### Returns

`boolean`

#### Overrides

[ABIType](ABIType.md).[isDynamic](ABIType.md#isdynamic)

#### Defined in

abi/abi_type.ts:444

___

### toABITupleType

▸ **toABITupleType**(): [`ABITupleType`](ABITupleType.md)

#### Returns

[`ABITupleType`](ABITupleType.md)

#### Defined in

abi/abi_type.ts:473

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Overrides

[ABIType](ABIType.md).[toString](ABIType.md#tostring)

#### Defined in

abi/abi_type.ts:432

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
