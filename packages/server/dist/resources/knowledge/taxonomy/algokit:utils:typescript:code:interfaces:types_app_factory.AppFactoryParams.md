[@algorandfoundation/algokit-utils](../README.md) / [types/app-factory](../modules/types_app_factory.md) / AppFactoryParams

# Interface: AppFactoryParams

[types/app-factory](../modules/types_app_factory.md).AppFactoryParams

Parameters to create an app client

## Table of contents

### Properties

- [algorand](types_app_factory.AppFactoryParams.md#algorand)
- [appName](types_app_factory.AppFactoryParams.md#appname)
- [appSpec](types_app_factory.AppFactoryParams.md#appspec)
- [defaultSender](types_app_factory.AppFactoryParams.md#defaultsender)
- [defaultSigner](types_app_factory.AppFactoryParams.md#defaultsigner)
- [deletable](types_app_factory.AppFactoryParams.md#deletable)
- [deployTimeParams](types_app_factory.AppFactoryParams.md#deploytimeparams)
- [updatable](types_app_factory.AppFactoryParams.md#updatable)
- [version](types_app_factory.AppFactoryParams.md#version)

## Properties

### algorand

• **algorand**: [`AlgorandClientInterface`](types_algorand_client_interface.AlgorandClientInterface.md)

`AlgorandClient` instance

#### Defined in

[src/types/app-factory.ts:56](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-factory.ts#L56)

___

### appName

• `Optional` **appName**: `string`

Optional override for the app name; used for on-chain metadata and lookups.
Defaults to the ARC-32/ARC-56 app spec name.

#### Defined in

[src/types/app-factory.ts:62](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-factory.ts#L62)

___

### appSpec

• **appSpec**: `string` \| [`Arc56Contract`](types_app_arc56.Arc56Contract.md) \| [`AppSpec`](types_app_spec.AppSpec.md)

The ARC-56 or ARC-32 application spec as either:
 * Parsed JSON ARC-56 `Contract`
 * Parsed JSON ARC-32 `AppSpec`
 * Raw JSON string (in either ARC-56 or ARC-32 format)

#### Defined in

[src/types/app-factory.ts:53](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-factory.ts#L53)

___

### defaultSender

• `Optional` **defaultSender**: `string` \| `Address`

Optional address to use for the account to use as the default sender for calls.

#### Defined in

[src/types/app-factory.ts:65](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-factory.ts#L65)

___

### defaultSigner

• `Optional` **defaultSigner**: `TransactionSigner`

Optional signer to use as the default signer for default sender calls (if not specified then the signer will be resolved from `AlgorandClient`).

#### Defined in

[src/types/app-factory.ts:68](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-factory.ts#L68)

___

### deletable

• `Optional` **deletable**: `boolean`

Whether or not the contract should have deploy-time permanence control set, undefined = ignore.
If specified here will get used in calls to `deploy` and `create` calls unless overridden in those calls.

Useful if you want to vend multiple contracts from the same factory without specifying this value
for each call.

#### Defined in

[src/types/app-factory.ts:89](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-factory.ts#L89)

___

### deployTimeParams

• `Optional` **deployTimeParams**: [`TealTemplateParams`](types_app.TealTemplateParams.md)

Optional deploy-time TEAL template replacement parameters.
If specified here will get used in calls to `deploy` and `create` calls unless overridden in those calls.

Useful if you want to vend multiple contracts from the same factory without specifying this value
for each call.

#### Defined in

[src/types/app-factory.ts:98](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-factory.ts#L98)

___

### updatable

• `Optional` **updatable**: `boolean`

Whether or not the contract should have deploy-time immutability control set, undefined = ignore.
If specified here will get used in calls to `deploy` and `create` calls unless overridden in those calls.

Useful if you want to vend multiple contracts from the same factory without specifying this value
for each call.

#### Defined in

[src/types/app-factory.ts:80](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-factory.ts#L80)

___

### version

• `Optional` **version**: `string`

The version of app that is / will be deployed; defaults to 1.0

#### Defined in

[src/types/app-factory.ts:71](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-factory.ts#L71)
