[@algorandfoundation/algokit-utils](../README.md) / [types/app](../modules/types_app.md) / AppMetadata

# Interface: AppMetadata

[types/app](../modules/types_app.md).AppMetadata

The metadata that can be collected about a deployed app

## Hierarchy

- [`AppReference`](types_app.AppReference.md)

- [`AppDeployMetadata`](types_app.AppDeployMetadata.md)

  ↳ **`AppMetadata`**

## Table of contents

### Properties

- [appAddress](types_app.AppMetadata.md#appaddress)
- [appId](types_app.AppMetadata.md#appid)
- [createdMetadata](types_app.AppMetadata.md#createdmetadata)
- [createdRound](types_app.AppMetadata.md#createdround)
- [deletable](types_app.AppMetadata.md#deletable)
- [deleted](types_app.AppMetadata.md#deleted)
- [name](types_app.AppMetadata.md#name)
- [updatable](types_app.AppMetadata.md#updatable)
- [updatedRound](types_app.AppMetadata.md#updatedround)
- [version](types_app.AppMetadata.md#version)

## Properties

### appAddress

• **appAddress**: `string`

The Algorand address of the account associated with the app

#### Inherited from

[AppReference](types_app.AppReference.md).[appAddress](types_app.AppReference.md#appaddress)

#### Defined in

[src/types/app.ts:43](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L43)

___

### appId

• **appId**: `number` \| `bigint`

The id of the app

#### Inherited from

[AppReference](types_app.AppReference.md).[appId](types_app.AppReference.md#appid)

#### Defined in

[src/types/app.ts:41](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L41)

___

### createdMetadata

• **createdMetadata**: [`AppDeployMetadata`](types_app.AppDeployMetadata.md)

The metadata when the app was created

#### Defined in

[src/types/app.ts:265](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L265)

___

### createdRound

• **createdRound**: `number`

The round the app was created

#### Defined in

[src/types/app.ts:261](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L261)

___

### deletable

• `Optional` **deletable**: `boolean`

Whether or not the app is deletable / permanent / unspecified

#### Inherited from

[AppDeployMetadata](types_app.AppDeployMetadata.md).[deletable](types_app.AppDeployMetadata.md#deletable)

#### Defined in

[src/types/app.ts:253](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L253)

___

### deleted

• **deleted**: `boolean`

Whether or not the app is deleted

#### Defined in

[src/types/app.ts:267](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L267)

___

### name

• **name**: `string`

The unique name identifier of the app within the creator account

#### Inherited from

[AppDeployMetadata](types_app.AppDeployMetadata.md).[name](types_app.AppDeployMetadata.md#name)

#### Defined in

[src/types/app.ts:249](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L249)

___

### updatable

• `Optional` **updatable**: `boolean`

Whether or not the app is updatable / immutable / unspecified

#### Inherited from

[AppDeployMetadata](types_app.AppDeployMetadata.md).[updatable](types_app.AppDeployMetadata.md#updatable)

#### Defined in

[src/types/app.ts:255](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L255)

___

### updatedRound

• **updatedRound**: `number`

The last round that the app was updated

#### Defined in

[src/types/app.ts:263](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L263)

___

### version

• **version**: `string`

The version of app that is / will be deployed

#### Inherited from

[AppDeployMetadata](types_app.AppDeployMetadata.md).[version](types_app.AppDeployMetadata.md#version)

#### Defined in

[src/types/app.ts:251](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L251)
