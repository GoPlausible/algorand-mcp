[@algorandfoundation/algokit-utils](../README.md) / [types/app](../modules/types_app.md) / BoxValuesRequestParams

# Interface: BoxValuesRequestParams

[types/app](../modules/types_app.md).BoxValuesRequestParams

**`Deprecated`**

Use `types/app-manager/BoxValuesRequestParams` instead.
Parameters to get and decode a box value as an ABI type.

## Table of contents

### Properties

- [appId](types_app.BoxValuesRequestParams.md#appid)
- [boxNames](types_app.BoxValuesRequestParams.md#boxnames)
- [type](types_app.BoxValuesRequestParams.md#type)

## Properties

### appId

• **appId**: `number`

The ID of the app return box names for

#### Defined in

[src/types/app.ts:413](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L413)

___

### boxNames

• **boxNames**: (`string` \| `Uint8Array` \| [`BoxName`](types_app.BoxName.md))[]

The names of the boxes to return either as a string, binary array or BoxName`

#### Defined in

[src/types/app.ts:415](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L415)

___

### type

• **type**: `ABIType`

The ABI type to decode the value using

#### Defined in

[src/types/app.ts:417](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L417)
