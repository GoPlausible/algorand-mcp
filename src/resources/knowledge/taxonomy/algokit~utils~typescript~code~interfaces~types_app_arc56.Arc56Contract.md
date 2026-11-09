[@algorandfoundation/algokit-utils](../README.md) / [types/app-arc56](../modules/types_app_arc56.md) / Arc56Contract

# Interface: Arc56Contract

[types/app-arc56](../modules/types_app_arc56.md).Arc56Contract

Describes the entire contract. This interface is an extension of the interface described in ARC-4

## Table of contents

### Properties

- [arcs](types_app_arc56.Arc56Contract.md#arcs)
- [bareActions](types_app_arc56.Arc56Contract.md#bareactions)
- [byteCode](types_app_arc56.Arc56Contract.md#bytecode)
- [compilerInfo](types_app_arc56.Arc56Contract.md#compilerinfo)
- [desc](types_app_arc56.Arc56Contract.md#desc)
- [events](types_app_arc56.Arc56Contract.md#events)
- [methods](types_app_arc56.Arc56Contract.md#methods)
- [name](types_app_arc56.Arc56Contract.md#name)
- [networks](types_app_arc56.Arc56Contract.md#networks)
- [scratchVariables](types_app_arc56.Arc56Contract.md#scratchvariables)
- [source](types_app_arc56.Arc56Contract.md#source)
- [sourceInfo](types_app_arc56.Arc56Contract.md#sourceinfo)
- [state](types_app_arc56.Arc56Contract.md#state)
- [structs](types_app_arc56.Arc56Contract.md#structs)
- [templateVariables](types_app_arc56.Arc56Contract.md#templatevariables)

## Properties

### arcs

• **arcs**: `number`[]

The ARCs used and/or supported by this contract. All contracts implicitly support ARC4 and ARC56

#### Defined in

[src/types/app-arc56.ts:233](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L233)

___

### bareActions

• **bareActions**: `Object`

Supported bare actions for the contract. An action is a combination of call/create and an OnComplete

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `call` | (``"NoOp"`` \| ``"OptIn"`` \| ``"DeleteApplication"`` \| ``"CloseOut"`` \| ``"ClearState"`` \| ``"UpdateApplication"``)[] | OnCompletes this method allows when appID !== 0 |
| `create` | (``"NoOp"`` \| ``"OptIn"`` \| ``"DeleteApplication"``)[] | OnCompletes this method allows when appID === 0 |

#### Defined in

[src/types/app-arc56.ts:281](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L281)

___

### byteCode

• `Optional` **byteCode**: `Object`

The compiled bytecode for the application. MUST be omitted if included as part of ARC23

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `approval` | `string` | The approval program |
| `clear` | `string` | The clear program |

#### Defined in

[src/types/app-arc56.ts:302](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L302)

___

### compilerInfo

• `Optional` **compilerInfo**: `Object`

Information used to get the given byteCode and/or PC values in sourceInfo. MUST be given if byteCode or PC values are present

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `compiler` | ``"algod"`` \| ``"puya"`` | The name of the compiler |
| `compilerVersion` | \{ `commitHash?`: `string` ; `major`: `number` ; `minor`: `number` ; `patch`: `number`  } | Compiler version information |
| `compilerVersion.commitHash?` | `string` | - |
| `compilerVersion.major` | `number` | - |
| `compilerVersion.minor` | `number` | - |
| `compilerVersion.patch` | `number` | - |

#### Defined in

[src/types/app-arc56.ts:309](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L309)

___

### desc

• `Optional` **desc**: `string`

Optional, user-friendly description for the interface

#### Defined in

[src/types/app-arc56.ts:237](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L237)

___

### events

• `Optional` **events**: [`Event`](types_app_arc56.Event.md)[]

ARC-28 events that MAY be emitted by this contract

#### Defined in

[src/types/app-arc56.ts:321](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L321)

___

### methods

• **methods**: [`Method`](types_app_arc56.Method.md)[]

All of the methods that the contract implements

#### Defined in

[src/types/app-arc56.ts:254](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L254)

___

### name

• **name**: `string`

A user-friendly name for the contract

#### Defined in

[src/types/app-arc56.ts:235](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L235)

___

### networks

• `Optional` **networks**: `Object`

Optional object listing the contract instances across different networks.
The key is the base64 genesis hash of the network, and the value contains
information about the deployed contract in the network indicated by the
key. A key containing the human-readable name of the network MAY be
included, but the corresponding genesis hash key MUST also be defined

#### Index signature

▪ [network: `string`]: \{ `appID`: `number`  }

#### Defined in

[src/types/app-arc56.ts:245](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L245)

___

### scratchVariables

• `Optional` **scratchVariables**: `Object`

The scratch variables used during runtime

#### Index signature

▪ [name: `string`]: \{ `slot`: `number` ; `type`: [`ABIType`](../modules/types_app_arc56.md#abitype) \| [`AVMType`](../modules/types_app_arc56.md#avmtype) \| [`StructName`](../modules/types_app_arc56.md#structname)  }

#### Defined in

[src/types/app-arc56.ts:332](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L332)

___

### source

• `Optional` **source**: `Object`

The pre-compiled TEAL that may contain template variables. MUST be omitted if included as part of ARC23

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `approval` | `string` | The approval program |
| `clear` | `string` | The clear program |

#### Defined in

[src/types/app-arc56.ts:295](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L295)

___

### sourceInfo

• `Optional` **sourceInfo**: `Object`

Information about the TEAL programs

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `approval` | [`ProgramSourceInfo`](types_app_arc56.ProgramSourceInfo.md) | Approval program information |
| `clear` | [`ProgramSourceInfo`](types_app_arc56.ProgramSourceInfo.md) | Clear program information |

#### Defined in

[src/types/app-arc56.ts:288](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L288)

___

### state

• **state**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `keys` | \{ `box`: \{ `[name: string]`: [`StorageKey`](types_app_arc56.StorageKey.md);  } ; `global`: \{ `[name: string]`: [`StorageKey`](types_app_arc56.StorageKey.md);  } ; `local`: \{ `[name: string]`: [`StorageKey`](types_app_arc56.StorageKey.md);  }  } | Mapping of human-readable names to StorageKey objects |
| `keys.box` | \{ `[name: string]`: [`StorageKey`](types_app_arc56.StorageKey.md);  } | - |
| `keys.global` | \{ `[name: string]`: [`StorageKey`](types_app_arc56.StorageKey.md);  } | - |
| `keys.local` | \{ `[name: string]`: [`StorageKey`](types_app_arc56.StorageKey.md);  } | - |
| `maps` | \{ `box`: \{ `[name: string]`: [`StorageMap`](types_app_arc56.StorageMap.md);  } ; `global`: \{ `[name: string]`: [`StorageMap`](types_app_arc56.StorageMap.md);  } ; `local`: \{ `[name: string]`: [`StorageMap`](types_app_arc56.StorageMap.md);  }  } | Mapping of human-readable names to StorageMap objects |
| `maps.box` | \{ `[name: string]`: [`StorageMap`](types_app_arc56.StorageMap.md);  } | - |
| `maps.global` | \{ `[name: string]`: [`StorageMap`](types_app_arc56.StorageMap.md);  } | - |
| `maps.local` | \{ `[name: string]`: [`StorageMap`](types_app_arc56.StorageMap.md);  } | - |
| `schema` | \{ `global`: \{ `bytes`: `number` ; `ints`: `number`  } ; `local`: \{ `bytes`: `number` ; `ints`: `number`  }  } | Defines the values that should be used for GlobalNumUint, GlobalNumByteSlice, LocalNumUint, and LocalNumByteSlice when creating the application |
| `schema.global` | \{ `bytes`: `number` ; `ints`: `number`  } | - |
| `schema.global.bytes` | `number` | - |
| `schema.global.ints` | `number` | - |
| `schema.local` | \{ `bytes`: `number` ; `ints`: `number`  } | - |
| `schema.local.bytes` | `number` | - |
| `schema.local.ints` | `number` | - |

#### Defined in

[src/types/app-arc56.ts:255](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L255)

___

### structs

• **structs**: `Object`

Named structs used by the application. Each struct field appears in the same order as ABI encoding.

#### Index signature

▪ [structName: [`StructName`](../modules/types_app_arc56.md#structname)]: [`StructField`](types_app_arc56.StructField.md)[]

#### Defined in

[src/types/app-arc56.ts:252](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L252)

___

### templateVariables

• `Optional` **templateVariables**: `Object`

A mapping of template variable names as they appear in the TEAL (not including TMPL_ prefix) to their respective types and values (if applicable)

#### Index signature

▪ [name: `string`]: \{ `type`: [`ABIType`](../modules/types_app_arc56.md#abitype) \| [`AVMType`](../modules/types_app_arc56.md#avmtype) \| [`StructName`](../modules/types_app_arc56.md#structname) ; `value?`: `string`  }

#### Defined in

[src/types/app-arc56.ts:323](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L323)
