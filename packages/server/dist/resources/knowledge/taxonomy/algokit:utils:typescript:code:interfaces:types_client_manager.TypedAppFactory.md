[@algorandfoundation/algokit-utils](../README.md) / [types/client-manager](../modules/types_client_manager.md) / TypedAppFactory

# Interface: TypedAppFactory\<TClient\>

[types/client-manager](../modules/types_client_manager.md).TypedAppFactory

Interface to identify a typed factory that can be used to create and deploy an application.

## Type parameters

| Name |
| :------ |
| `TClient` |

## Table of contents

### Constructors

- [constructor](types_client_manager.TypedAppFactory.md#constructor)

## Constructors

### constructor

• **new TypedAppFactory**(`params`): `TClient`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Omit`\<[`AppFactoryParams`](types_app_factory.AppFactoryParams.md), ``"appSpec"``\> |

#### Returns

`TClient`

#### Defined in

[src/types/client-manager.ts:642](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/client-manager.ts#L642)
