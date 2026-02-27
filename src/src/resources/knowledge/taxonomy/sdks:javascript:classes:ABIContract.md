[algosdk](../README.md) / [Exports](../modules.md) / ABIContract

# Class: ABIContract

## Table of contents

### Constructors

- [constructor](ABIContract.md#constructor)

### Properties

- [description](ABIContract.md#description)
- [events](ABIContract.md#events)
- [methods](ABIContract.md#methods)
- [name](ABIContract.md#name)
- [networks](ABIContract.md#networks)

### Methods

- [getMethodByName](ABIContract.md#getmethodbyname)
- [toJSON](ABIContract.md#tojson)

## Constructors

### constructor

• **new ABIContract**(`params`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ABIContractParams`](../interfaces/ABIContractParams.md) |

#### Defined in

abi/contract.ts:28

## Properties

### description

• `Optional` `Readonly` **description**: `string`

#### Defined in

abi/contract.ts:22

___

### events

• `Optional` `Readonly` **events**: `ARC28Event`[]

[ARC-28](https://arc.algorand.foundation/ARCs/arc-0028) events that MAY be emitted by this contract

#### Defined in

abi/contract.ts:26

___

### methods

• `Readonly` **methods**: [`ABIMethod`](ABIMethod.md)[]

#### Defined in

abi/contract.ts:24

___

### name

• `Readonly` **name**: `string`

#### Defined in

abi/contract.ts:21

___

### networks

• `Readonly` **networks**: [`ABIContractNetworks`](../interfaces/ABIContractNetworks.md)

#### Defined in

abi/contract.ts:23

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

abi/contract.ts:54

___

### toJSON

▸ **toJSON**(): [`ABIContractParams`](../interfaces/ABIContractParams.md)

#### Returns

[`ABIContractParams`](../interfaces/ABIContractParams.md)

#### Defined in

abi/contract.ts:44
