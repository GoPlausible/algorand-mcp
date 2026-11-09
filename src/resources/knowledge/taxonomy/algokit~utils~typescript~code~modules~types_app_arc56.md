[@algorandfoundation/algokit-utils](../README.md) / types/app-arc56

# Module: types/app-arc56

## Table of contents

### Classes

- [Arc56Method](../classes/types_app_arc56.Arc56Method.md)

### Interfaces

- [Arc56Contract](../interfaces/types_app_arc56.Arc56Contract.md)
- [Event](../interfaces/types_app_arc56.Event.md)
- [Method](../interfaces/types_app_arc56.Method.md)
- [ProgramSourceInfo](../interfaces/types_app_arc56.ProgramSourceInfo.md)
- [StorageKey](../interfaces/types_app_arc56.StorageKey.md)
- [StorageMap](../interfaces/types_app_arc56.StorageMap.md)
- [StructField](../interfaces/types_app_arc56.StructField.md)

### Type Aliases

- [ABIStruct](types_app_arc56.md#abistruct)
- [ABIType](types_app_arc56.md#abitype)
- [AVMBytes](types_app_arc56.md#avmbytes)
- [AVMString](types_app_arc56.md#avmstring)
- [AVMType](types_app_arc56.md#avmtype)
- [AVMUint64](types_app_arc56.md#avmuint64)
- [Arc56MethodArg](types_app_arc56.md#arc56methodarg)
- [Arc56MethodReturnType](types_app_arc56.md#arc56methodreturntype)
- [StructName](types_app_arc56.md#structname)

### Functions

- [getABIDecodedValue](types_app_arc56.md#getabidecodedvalue)
- [getABIEncodedValue](types_app_arc56.md#getabiencodedvalue)
- [getABIStructFromABITuple](types_app_arc56.md#getabistructfromabituple)
- [getABITupleFromABIStruct](types_app_arc56.md#getabituplefromabistruct)
- [getABITupleTypeFromABIStructDefinition](types_app_arc56.md#getabitupletypefromabistructdefinition)
- [getArc56Method](types_app_arc56.md#getarc56method)
- [getArc56ReturnValue](types_app_arc56.md#getarc56returnvalue)

## Type Aliases

### ABIStruct

Ƭ **ABIStruct**: `Object`

Decoded ARC-56 struct as a struct rather than a tuple.

#### Index signature

▪ [key: `string`]: [`ABIStruct`](types_app_arc56.md#abistruct) \| `algosdk.ABIValue`

#### Defined in

[src/types/app-arc56.ts:108](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L108)

___

### ABIType

Ƭ **ABIType**: `string`

An ABI-encoded type

#### Defined in

[src/types/app-arc56.ts:436](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L436)

___

### AVMBytes

Ƭ **AVMBytes**: ``"AVMBytes"``

Raw byteslice without the length prefixed that is specified in ARC-4

#### Defined in

[src/types/app-arc56.ts:442](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L442)

___

### AVMString

Ƭ **AVMString**: ``"AVMString"``

A utf-8 string without the length prefix that is specified in ARC-4

#### Defined in

[src/types/app-arc56.ts:445](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L445)

___

### AVMType

Ƭ **AVMType**: [`AVMBytes`](types_app_arc56.md#avmbytes) \| [`AVMString`](types_app_arc56.md#avmstring) \| [`AVMUint64`](types_app_arc56.md#avmuint64)

A native AVM type

#### Defined in

[src/types/app-arc56.ts:451](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L451)

___

### AVMUint64

Ƭ **AVMUint64**: ``"AVMUint64"``

A 64-bit unsigned integer

#### Defined in

[src/types/app-arc56.ts:448](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L448)

___

### Arc56MethodArg

Ƭ **Arc56MethodArg**: [`Expand`](types_expand.md#expand)\<`Omit`\<[`Method`](../interfaces/types_app_arc56.Method.md)[``"args"``][`number`], ``"type"``\> & \{ `type`: `algosdk.ABIArgumentType`  }\>

Type to describe an argument within an `Arc56Method`.

#### Defined in

[src/types/app-arc56.ts:6](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L6)

___

### Arc56MethodReturnType

Ƭ **Arc56MethodReturnType**: [`Expand`](types_expand.md#expand)\<`Omit`\<[`Method`](../interfaces/types_app_arc56.Method.md)[``"returns"``], ``"type"``\> & \{ `type`: `algosdk.ABIReturnType`  }\>

Type to describe a return type within an `Arc56Method`.

#### Defined in

[src/types/app-arc56.ts:13](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L13)

___

### StructName

Ƭ **StructName**: `string`

The name of a defined struct

#### Defined in

[src/types/app-arc56.ts:439](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L439)

## Functions

### getABIDecodedValue

▸ **getABIDecodedValue**(`value`, `type`, `structs`): `algosdk.ABIValue` \| [`ABIStruct`](types_app_arc56.md#abistruct)

Returns the decoded ABI value (or struct for a struct type)
for the given raw Algorand value given an ARC-56 type and defined ARC-56 structs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` \| `bigint` \| `Uint8Array` | The raw Algorand value (bytes or uint64) |
| `type` | `string` | The ARC-56 type - either an ABI Type string or a struct name |
| `structs` | `Record`\<`string`, [`StructField`](../interfaces/types_app_arc56.StructField.md)[]\> | The defined ARC-56 structs |

#### Returns

`algosdk.ABIValue` \| [`ABIStruct`](types_app_arc56.md#abistruct)

The decoded ABI value or struct

#### Defined in

[src/types/app-arc56.ts:120](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L120)

___

### getABIEncodedValue

▸ **getABIEncodedValue**(`value`, `type`, `structs`): `Uint8Array`

Returns the ABI-encoded value for the given value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `ABIValue` \| [`ABIStruct`](types_app_arc56.md#abistruct) | The value to encode either already in encoded binary form (`Uint8Array`), a decoded ABI value or an ARC-56 struct |
| `type` | `string` | The ARC-56 type - either an ABI Type string or a struct name |
| `structs` | `Record`\<`string`, [`StructField`](../interfaces/types_app_arc56.StructField.md)[]\> | The defined ARC-56 structs |

#### Returns

`Uint8Array`

The binary ABI-encoded value

#### Defined in

[src/types/app-arc56.ts:142](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L142)

___

### getABIStructFromABITuple

▸ **getABIStructFromABITuple**\<`TReturn`\>(`decodedABITuple`, `structFields`, `structs`): `TReturn`

Converts a decoded ABI tuple as a struct.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TReturn` | extends [`ABIStruct`](types_app_arc56.md#abistruct) = `Record`\<`string`, `any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `decodedABITuple` | `ABIValue`[] | The decoded ABI tuple value |
| `structFields` | [`StructField`](../interfaces/types_app_arc56.StructField.md)[] | The struct fields from an ARC-56 app spec |
| `structs` | `Record`\<`string`, [`StructField`](../interfaces/types_app_arc56.StructField.md)[]\> | - |

#### Returns

`TReturn`

The struct as a Record<string, any>

#### Defined in

[src/types/app-arc56.ts:70](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L70)

___

### getABITupleFromABIStruct

▸ **getABITupleFromABIStruct**(`struct`, `structFields`, `structs`): `algosdk.ABIValue`[]

Converts an ARC-56 struct as an ABI tuple.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `struct` | [`ABIStruct`](types_app_arc56.md#abistruct) | The struct to convert |
| `structFields` | [`StructField`](../interfaces/types_app_arc56.StructField.md)[] | The struct fields from an ARC-56 app spec |
| `structs` | `Record`\<`string`, [`StructField`](../interfaces/types_app_arc56.StructField.md)[]\> | - |

#### Returns

`algosdk.ABIValue`[]

The struct as a decoded ABI tuple

#### Defined in

[src/types/app-arc56.ts:94](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L94)

___

### getABITupleTypeFromABIStructDefinition

▸ **getABITupleTypeFromABIStructDefinition**(`struct`, `structs`): `algosdk.ABITupleType`

Returns the `ABITupleType` for the given ARC-56 struct definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `struct` | [`StructField`](../interfaces/types_app_arc56.StructField.md)[] | The ARC-56 struct definition |
| `structs` | `Record`\<`string`, [`StructField`](../interfaces/types_app_arc56.StructField.md)[]\> | - |

#### Returns

`algosdk.ABITupleType`

The `ABITupleType`

#### Defined in

[src/types/app-arc56.ts:48](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L48)

___

### getArc56Method

▸ **getArc56Method**(`methodNameOrSignature`, `appSpec`): [`Arc56Method`](../classes/types_app_arc56.Arc56Method.md)

Returns the ARC-56 ABI method object for a given method name or signature and ARC-56 app spec.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `methodNameOrSignature` | `string` | The method name or method signature to call if an ABI call is being emitted. e.g. `my_method` or `my_method(unit64,string)bytes` |
| `appSpec` | [`Arc56Contract`](../interfaces/types_app_arc56.Arc56Contract.md) | The app spec for the app |

#### Returns

[`Arc56Method`](../classes/types_app_arc56.Arc56Method.md)

The `Arc56Method`

#### Defined in

[src/types/app-arc56.ts:172](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L172)

___

### getArc56ReturnValue

▸ **getArc56ReturnValue**\<`TReturn`\>(`returnValue`, `method`, `structs`): `TReturn`

Checks for decode errors on the AppCallTransactionResult and maps the return value to the specified generic type

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TReturn` | extends `undefined` \| `ABIValue` \| [`ABIStruct`](types_app_arc56.md#abistruct) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `returnValue` | `undefined` \| [`ABIReturn`](types_app.md#abireturn) | The smart contract response |
| `method` | [`Method`](../interfaces/types_app_arc56.Method.md) \| [`Arc56Method`](../classes/types_app_arc56.Arc56Method.md) | The method that was called |
| `structs` | `Record`\<`string`, [`StructField`](../interfaces/types_app_arc56.StructField.md)[]\> | The struct fields from the app spec |

#### Returns

`TReturn`

The smart contract response with an updated return value

#### Defined in

[src/types/app-arc56.ts:203](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/app-arc56.ts#L203)
