[algosdk](../README.md) / [Exports](../modules.md) / SourceMap

# Class: SourceMap

## Table of contents

### Constructors

- [constructor](SourceMap.md#constructor)

### Properties

- [lineToPc](SourceMap.md#linetopc)
- [mappings](SourceMap.md#mappings)
- [names](SourceMap.md#names)
- [pcToLine](SourceMap.md#pctoline)
- [sources](SourceMap.md#sources)
- [version](SourceMap.md#version)

### Methods

- [getLineForPc](SourceMap.md#getlineforpc)
- [getPcsForLine](SourceMap.md#getpcsforline)

## Constructors

### constructor

• **new SourceMap**(`«destructured»`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `mappings` | `string` |
| › `names` | `string`[] |
| › `sources` | `string`[] |
| › `version` | `number` |

#### Defined in

logic/sourcemap.ts:12

## Properties

### lineToPc

• **lineToPc**: `Object`

#### Index signature

▪ [key: `number`]: `number`[]

#### Defined in

logic/sourcemap.ts:10

___

### mappings

• **mappings**: `string`

#### Defined in

logic/sourcemap.ts:7

___

### names

• **names**: `string`[]

#### Defined in

logic/sourcemap.ts:6

___

### pcToLine

• **pcToLine**: `Object`

#### Index signature

▪ [key: `number`]: `number`

#### Defined in

logic/sourcemap.ts:9

___

### sources

• **sources**: `string`[]

#### Defined in

logic/sourcemap.ts:5

___

### version

• **version**: `number`

#### Defined in

logic/sourcemap.ts:4

## Methods

### getLineForPc

▸ **getLineForPc**(`pc`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pc` | `number` |

#### Returns

`number`

#### Defined in

logic/sourcemap.ts:60

___

### getPcsForLine

▸ **getPcsForLine**(`line`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `line` | `number` |

#### Returns

`number`[]

#### Defined in

logic/sourcemap.ts:64
