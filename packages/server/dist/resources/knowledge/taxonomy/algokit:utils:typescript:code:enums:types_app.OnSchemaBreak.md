[@algorandfoundation/algokit-utils](../README.md) / [types/app](../modules/types_app.md) / OnSchemaBreak

# Enumeration: OnSchemaBreak

[types/app](../modules/types_app.md).OnSchemaBreak

What action to perform when deploying an app and a breaking schema change is detected

## Table of contents

### Enumeration Members

- [AppendApp](types_app.OnSchemaBreak.md#appendapp)
- [Fail](types_app.OnSchemaBreak.md#fail)
- [ReplaceApp](types_app.OnSchemaBreak.md#replaceapp)

## Enumeration Members

### AppendApp

• **AppendApp** = ``2``

Create a new app

#### Defined in

[src/types/app.ts:306](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L306)

___

### Fail

• **Fail** = ``0``

Fail the deployment

#### Defined in

[src/types/app.ts:302](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L302)

___

### ReplaceApp

• **ReplaceApp** = ``1``

Delete the app and create a new one in its place

#### Defined in

[src/types/app.ts:304](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app.ts#L304)
