[algosdk](../README.md) / [Exports](../modules.md) / LogicSig

# Class: LogicSig

LogicSig implementation

LogicSig cannot sign transactions in all cases.  Instead, use LogicSigAccount as a safe, general purpose signing mechanism.  Since LogicSig does not track the provided signature's public key, LogicSig cannot sign transactions when delegated to a non-multisig account _and_ the sender is not the delegating account.

## Implements

- `LogicSigStorageStructure`

## Table of contents

### Constructors

- [constructor](LogicSig.md#constructor)

### Properties

- [args](LogicSig.md#args)
- [logic](LogicSig.md#logic)
- [msig](LogicSig.md#msig)
- [sig](LogicSig.md#sig)
- [tag](LogicSig.md#tag)

### Methods

- [address](LogicSig.md#address)
- [appendToMultisig](LogicSig.md#appendtomultisig)
- [get\_obj\_for\_encoding](LogicSig.md#get_obj_for_encoding)
- [sign](LogicSig.md#sign)
- [signProgram](LogicSig.md#signprogram)
- [singleSignMultisig](LogicSig.md#singlesignmultisig)
- [toByte](LogicSig.md#tobyte)
- [verify](LogicSig.md#verify)
- [fromByte](LogicSig.md#frombyte)
- [from\_obj\_for\_encoding](LogicSig.md#from_obj_for_encoding)

## Constructors

### constructor

• **new LogicSig**(`program`, `programArgs?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `program` | `Uint8Array` |
| `programArgs?` | (`Uint8Array` \| `Buffer`)[] |

#### Defined in

logicsig.ts:69

## Properties

### args

• **args**: `Uint8Array`[]

#### Implementation of

LogicSigStorageStructure.args

#### Defined in

logicsig.ts:65

___

### logic

• **logic**: `Uint8Array`

#### Implementation of

LogicSigStorageStructure.logic

#### Defined in

logicsig.ts:64

___

### msig

• `Optional` **msig**: [`EncodedMultisig`](../interfaces/EncodedMultisig.md)

#### Implementation of

LogicSigStorageStructure.msig

#### Defined in

logicsig.ts:67

___

### sig

• `Optional` **sig**: `Uint8Array`

#### Implementation of

LogicSigStorageStructure.sig

#### Defined in

logicsig.ts:66

___

### tag

• **tag**: `Buffer`

#### Defined in

logicsig.ts:62

## Methods

### address

▸ **address**(): `string`

Compute hash of the logic sig program (that is the same as escrow account address) as string address

#### Returns

`string`

String representation of the address

#### Defined in

logicsig.ts:152

___

### appendToMultisig

▸ **appendToMultisig**(`secretKey`): `void`

Appends a signature to multi signature

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretKey` | `Uint8Array` | Secret key to sign with |

#### Returns

`void`

#### Defined in

logicsig.ts:186

___

### get\_obj\_for\_encoding

▸ **get_obj_for_encoding**(): [`EncodedLogicSig`](../interfaces/EncodedLogicSig.md)

#### Returns

[`EncodedLogicSig`](../interfaces/EncodedLogicSig.md)

#### Defined in

logicsig.ts:96

___

### sign

▸ **sign**(`secretKey`, `msig?`): `void`

Creates signature (if no msig provided) or multi signature otherwise

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `secretKey` | `Uint8Array` | Secret key to sign with |
| `msig?` | [`MultisigMetadata`](../interfaces/MultisigMetadata.md) | Multisig account as {version, threshold, addrs} |

#### Returns

`void`

#### Defined in

logicsig.ts:163

___

### signProgram

▸ **signProgram**(`secretKey`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKey` | `Uint8Array` |

#### Returns

`Uint8Array`

#### Defined in

logicsig.ts:194

___

### singleSignMultisig

▸ **singleSignMultisig**(`secretKey`, `msig`): [sig: Uint8Array, index: number]

#### Parameters

| Name | Type |
| :------ | :------ |
| `secretKey` | `Uint8Array` |
| `msig` | [`EncodedMultisig`](../interfaces/EncodedMultisig.md) |

#### Returns

[sig: Uint8Array, index: number]

#### Defined in

logicsig.ts:200

___

### toByte

▸ **toByte**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

logicsig.ts:220

___

### verify

▸ **verify**(`publicKey`): `boolean`

Performs signature verification

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `publicKey` | `Uint8Array` | Verification key (derived from sender address or escrow address) |

#### Returns

`boolean`

#### Defined in

logicsig.ts:123

___

### fromByte

▸ `Static` **fromByte**(`encoded`): [`LogicSig`](LogicSig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | `ArrayLike`\<`any`\> |

#### Returns

[`LogicSig`](LogicSig.md)

#### Defined in

logicsig.ts:224

___

### from\_obj\_for\_encoding

▸ `Static` **from_obj_for_encoding**(`encoded`): [`LogicSig`](LogicSig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | [`EncodedLogicSig`](../interfaces/EncodedLogicSig.md) |

#### Returns

[`LogicSig`](LogicSig.md)

#### Defined in

logicsig.ts:112
