[@algorandfoundation/algokit-utils](../README.md) / types/expand

# Module: types/expand

## Table of contents

### Type Aliases

- [Expand](types_expand.md#expand)

## Type Aliases

### Expand

Ƭ **Expand**\<`T`\>: `T` extends (...`args`: infer A) => infer R ? (...`args`: [`Expand`](types_expand.md#expand)\<`A`\>) => [`Expand`](types_expand.md#expand)\<`R`\> : `T` extends infer O ? \{ [K in keyof O]: O[K] } : `never`

Expands types for IntelliSense so they are more human readable
See https://stackoverflow.com/a/69288824

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/types/expand.ts:5](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/expand.ts#L5)
