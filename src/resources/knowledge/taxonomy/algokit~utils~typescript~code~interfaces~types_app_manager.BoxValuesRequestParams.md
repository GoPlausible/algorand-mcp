[@algorandfoundation/algokit-utils](../README.md) / [types/app-manager](../modules/types_app_manager.md) / BoxValuesRequestParams

# Interface: BoxValuesRequestParams

[types/app-manager](../modules/types_app_manager.md).BoxValuesRequestParams

Parameters to get and decode a box value as an ABI type.

## Table of contents

### Properties

- [appId](types_app_manager.BoxValuesRequestParams.md#appid)
- [boxNames](types_app_manager.BoxValuesRequestParams.md#boxnames)
- [type](types_app_manager.BoxValuesRequestParams.md#type)

## Properties

### appId

• **appId**: `bigint`

The ID of the app return box names for

#### Defined in

[src/types/app-manager.ts:90](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-manager.ts#L90)

___

### boxNames

• **boxNames**: [`BoxIdentifier`](../modules/types_app_manager.md#boxidentifier)[]

The names of the boxes to return either as a string, binary array or BoxName`

#### Defined in

[src/types/app-manager.ts:92](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-manager.ts#L92)

___

### type

• **type**: `ABIType`

The ABI type to decode the value using

#### Defined in

[src/types/app-manager.ts:94](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-manager.ts#L94)
