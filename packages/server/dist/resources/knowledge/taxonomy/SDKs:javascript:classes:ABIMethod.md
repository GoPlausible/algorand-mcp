[algosdk](../README.md) / [Exports](../modules.md) / ABIMethod

# Class: ABIMethod

## Table of contents

### Constructors

- [constructor](ABIMethod.md#constructor)

### Properties

- [args](ABIMethod.md#args)
- [description](ABIMethod.md#description)
- [events](ABIMethod.md#events)
- [name](ABIMethod.md#name)
- [readonly](ABIMethod.md#readonly)
- [returns](ABIMethod.md#returns)

### Methods

- [getSelector](ABIMethod.md#getselector)
- [getSignature](ABIMethod.md#getsignature)
- [toJSON](ABIMethod.md#tojson)
- [txnCount](ABIMethod.md#txncount)
- [fromSignature](ABIMethod.md#fromsignature)

## Constructors

### constructor

• **new ABIMethod**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ABIMethodParams`](../interfaces/ABIMethodParams.md) |

#### Defined in

abi/method.ts:88

## Properties

### args

• `Readonly` **args**: \{ `description?`: `string` ; `name?`: `string` ; `type`: [`ABIArgumentType`](../modules.md#abiargumenttype)  }[]

#### Defined in

abi/method.ts:78

___

### description

• `Optional` `Readonly` **description**: `string`

#### Defined in

abi/method.ts:77

___

### events

• `Optional` `Readonly` **events**: `ARC28Event`[]

#### Defined in

abi/method.ts:85

___

### name

• `Readonly` **name**: `string`

#### Defined in

abi/method.ts:76

___

### readonly

• `Optional` `Readonly` **readonly**: `boolean`

#### Defined in

abi/method.ts:86

___

### returns

• `Readonly` **returns**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description?` | `string` |
| `type` | [`ABIReturnType`](../modules.md#abireturntype) |

#### Defined in

abi/method.ts:84

## Methods

### getSelector

▸ **getSelector**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

abi/method.ts:132

___

### getSignature

▸ **getSignature**(): `string`

#### Returns

`string`

#### Defined in

abi/method.ts:126

___

### toJSON

▸ **toJSON**(): [`ABIMethodParams`](../interfaces/ABIMethodParams.md)

#### Returns

[`ABIMethodParams`](../interfaces/ABIMethodParams.md)

#### Defined in

abi/method.ts:147

___

### txnCount

▸ **txnCount**(): `number`

#### Returns

`number`

#### Defined in

abi/method.ts:137

___

### fromSignature

▸ `Static` **fromSignature**(`signature`): [`ABIMethod`](ABIMethod.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | `string` |

#### Returns

[`ABIMethod`](ABIMethod.md)

#### Defined in

abi/method.ts:165
