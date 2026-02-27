[algosdk](../README.md) / [Exports](../modules.md) / ABIInterface

# Class: ABIInterface

## Table of contents

### Constructors

- [constructor](ABIInterface.md#constructor)

### Properties

- [description](ABIInterface.md#description)
- [methods](ABIInterface.md#methods)
- [name](ABIInterface.md#name)

### Methods

- [getMethodByName](ABIInterface.md#getmethodbyname)
- [toJSON](ABIInterface.md#tojson)

## Constructors

### constructor

• **new ABIInterface**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ABIInterfaceParams`](../interfaces/ABIInterfaceParams.md) |

#### Defined in

abi/interface.ts:14

## Properties

### description

• `Optional` `Readonly` **description**: `string`

#### Defined in

abi/interface.ts:11

___

### methods

• `Readonly` **methods**: [`ABIMethod`](ABIMethod.md)[]

#### Defined in

abi/interface.ts:12

___

### name

• `Readonly` **name**: `string`

#### Defined in

abi/interface.ts:10

## Methods

### getMethodByName

▸ **getMethodByName**(`name`): [`ABIMethod`](ABIMethod.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`ABIMethod`](ABIMethod.md)

#### Defined in

abi/interface.ts:32

___

### toJSON

▸ **toJSON**(): [`ABIInterfaceParams`](../interfaces/ABIInterfaceParams.md)

#### Returns

[`ABIInterfaceParams`](../interfaces/ABIInterfaceParams.md)

#### Defined in

abi/interface.ts:24
