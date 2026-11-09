[algosdk](../README.md) / [Exports](../modules.md) / ABIMethodParams

# Interface: ABIMethodParams

## Table of contents

### Properties

- [args](ABIMethodParams.md#args)
- [desc](ABIMethodParams.md#desc)
- [events](ABIMethodParams.md#events)
- [name](ABIMethodParams.md#name)
- [readonly](ABIMethodParams.md#readonly)
- [returns](ABIMethodParams.md#returns)

## Properties

### args

• **args**: [`ABIMethodArgParams`](ABIMethodArgParams.md)[]

#### Defined in

abi/method.ts:63

___

### desc

• `Optional` **desc**: `string`

#### Defined in

abi/method.ts:62

___

### events

• `Optional` **events**: `ARC28Event`[]

[ARC-28](https://arc.algorand.foundation/ARCs/arc-0028) events that MAY be emitted by this method

#### Defined in

abi/method.ts:68

___

### name

• **name**: `string`

#### Defined in

abi/method.ts:61

___

### readonly

• `Optional` **readonly**: `boolean`

Optional, is it a read-only method (according to [ARC-22](https://arc.algorand.foundation/ARCs/arc-0022))

#### Defined in

abi/method.ts:66

___

### returns

• **returns**: [`ABIMethodReturnParams`](ABIMethodReturnParams.md)

#### Defined in

abi/method.ts:64
