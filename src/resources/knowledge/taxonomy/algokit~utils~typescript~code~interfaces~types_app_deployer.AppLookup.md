[@algorandfoundation/algokit-utils](../README.md) / [types/app-deployer](../modules/types_app_deployer.md) / AppLookup

# Interface: AppLookup

[types/app-deployer](../modules/types_app_deployer.md).AppLookup

A lookup of name -> Algorand app for a creator

## Table of contents

### Properties

- [apps](types_app_deployer.AppLookup.md#apps)
- [creator](types_app_deployer.AppLookup.md#creator)

## Properties

### apps

• **apps**: `Object`

A hash map of app name to app metadata

#### Index signature

▪ [name: `string`]: [`AppMetadata`](types_app_deployer.AppMetadata.md)

#### Defined in

[src/types/app-deployer.ts:93](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L93)

___

### creator

• **creator**: `Readonly`\<`Address`\>

The address of the creator associated with this lookup

#### Defined in

[src/types/app-deployer.ts:91](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-deployer.ts#L91)
