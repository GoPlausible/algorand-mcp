[algosdk](../README.md) / [Exports](../modules.md) / [indexerModels](../modules/indexerModels.md) / TransactionApplication

# Class: TransactionApplication

[indexerModels](../modules/indexerModels.md).TransactionApplication

Fields for application transactions.
Definition:
data/transactions/application.go : ApplicationCallTxnFields

## Hierarchy

- `default`

  ↳ **`TransactionApplication`**

## Table of contents

### Constructors

- [constructor](indexerModels.TransactionApplication.md#constructor)

### Properties

- [accounts](indexerModels.TransactionApplication.md#accounts)
- [applicationArgs](indexerModels.TransactionApplication.md#applicationargs)
- [applicationId](indexerModels.TransactionApplication.md#applicationid)
- [approvalProgram](indexerModels.TransactionApplication.md#approvalprogram)
- [attribute\_map](indexerModels.TransactionApplication.md#attribute_map)
- [clearStateProgram](indexerModels.TransactionApplication.md#clearstateprogram)
- [extraProgramPages](indexerModels.TransactionApplication.md#extraprogrampages)
- [foreignApps](indexerModels.TransactionApplication.md#foreignapps)
- [foreignAssets](indexerModels.TransactionApplication.md#foreignassets)
- [globalStateSchema](indexerModels.TransactionApplication.md#globalstateschema)
- [localStateSchema](indexerModels.TransactionApplication.md#localstateschema)
- [onCompletion](indexerModels.TransactionApplication.md#oncompletion)

### Methods

- [get\_obj\_for\_encoding](indexerModels.TransactionApplication.md#get_obj_for_encoding)
- [from\_obj\_for\_encoding](indexerModels.TransactionApplication.md#from_obj_for_encoding)

## Constructors

### constructor

• **new TransactionApplication**(`«destructured»`)

Creates a new `TransactionApplication` object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `accounts?` | `string`[] |
| › `applicationArgs?` | `Uint8Array`[] |
| › `applicationId` | `number` \| `bigint` |
| › `approvalProgram?` | `string` \| `Uint8Array` |
| › `clearStateProgram?` | `string` \| `Uint8Array` |
| › `extraProgramPages?` | `number` \| `bigint` |
| › `foreignApps?` | (`number` \| `bigint`)[] |
| › `foreignAssets?` | (`number` \| `bigint`)[] |
| › `globalStateSchema?` | [`StateSchema`](indexerModels.StateSchema.md) |
| › `localStateSchema?` | [`StateSchema`](indexerModels.StateSchema.md) |
| › `onCompletion?` | `string` |

#### Overrides

BaseModel.constructor

#### Defined in

client/v2/indexer/models/types.ts:4763

## Properties

### accounts

• `Optional` **accounts**: `string`[]

(apat) List of accounts in addition to the sender that may be accessed from the
application's approval-program and clear-state-program.

#### Defined in

client/v2/indexer/models/types.ts:4653

___

### applicationArgs

• `Optional` **applicationArgs**: `Uint8Array`[]

(apaa) transaction specific arguments accessed from the application's
approval-program and clear-state-program.

#### Defined in

client/v2/indexer/models/types.ts:4659

___

### applicationId

• **applicationId**: `number` \| `bigint`

(apid) ID of the application being configured or empty if creating.

#### Defined in

client/v2/indexer/models/types.ts:4647

___

### approvalProgram

• `Optional` **approvalProgram**: `Uint8Array`

(apap) Logic executed for every application transaction, except when
on-completion is set to "clear". It can read and write global state for the
application, as well as account-specific local state. Approval programs may
reject the transaction.

#### Defined in

client/v2/indexer/models/types.ts:4667

___

### attribute\_map

• **attribute\_map**: `Record`\<`string`, `string`\>

#### Inherited from

BaseModel.attribute\_map

#### Defined in

client/v2/basemodel.ts:56

___

### clearStateProgram

• `Optional` **clearStateProgram**: `Uint8Array`

(apsu) Logic executed for application transactions with on-completion set to
"clear". It can read and write global state for the application, as well as
account-specific local state. Clear state programs cannot reject the
transaction.

#### Defined in

client/v2/indexer/models/types.ts:4675

___

### extraProgramPages

• `Optional` **extraProgramPages**: `number` \| `bigint`

(epp) specifies the additional app program len requested in pages.

#### Defined in

client/v2/indexer/models/types.ts:4680

___

### foreignApps

• `Optional` **foreignApps**: (`number` \| `bigint`)[]

(apfa) Lists the applications in addition to the application-id whose global
states may be accessed by this application's approval-program and
clear-state-program. The access is read-only.

#### Defined in

client/v2/indexer/models/types.ts:4687

___

### foreignAssets

• `Optional` **foreignAssets**: (`number` \| `bigint`)[]

(apas) lists the assets whose parameters may be accessed by this application's
ApprovalProgram and ClearStateProgram. The access is read-only.

#### Defined in

client/v2/indexer/models/types.ts:4693

___

### globalStateSchema

• `Optional` **globalStateSchema**: [`StateSchema`](indexerModels.StateSchema.md)

Represents a (apls) local-state or (apgs) global-state schema. These schemas
determine how much storage may be used in a local-state or global-state for an
application. The more space used, the larger minimum balance must be maintained
in the account holding the data.

#### Defined in

client/v2/indexer/models/types.ts:4701

___

### localStateSchema

• `Optional` **localStateSchema**: [`StateSchema`](indexerModels.StateSchema.md)

Represents a (apls) local-state or (apgs) global-state schema. These schemas
determine how much storage may be used in a local-state or global-state for an
application. The more space used, the larger minimum balance must be maintained
in the account holding the data.

#### Defined in

client/v2/indexer/models/types.ts:4709

___

### onCompletion

• `Optional` **onCompletion**: `string`

(apan) defines the what additional actions occur with the transaction.
Valid types:
* noop
* optin
* closeout
* clear
* update
* update
* delete

#### Defined in

client/v2/indexer/models/types.ts:4722

## Methods

### get\_obj\_for\_encoding

▸ **get_obj_for_encoding**(`binary?`): `Record`\<`string`, `any`\>

Get an object ready for encoding to either JSON or msgpack.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `binary` | `boolean` | `false` | Use true to indicate that the encoding can handle raw binary objects (Uint8Arrays). Use false to indicate that raw binary objects should be converted to base64 strings. True should be used for objects that will be encoded with msgpack, and false should be used for objects that will be encoded with JSON. |

#### Returns

`Record`\<`string`, `any`\>

#### Inherited from

BaseModel.get\_obj\_for\_encoding

#### Defined in

client/v2/basemodel.ts:65

___

### from\_obj\_for\_encoding

▸ `Static` **from_obj_for_encoding**(`data`): [`TransactionApplication`](indexerModels.TransactionApplication.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`\<`string`, `any`\> |

#### Returns

[`TransactionApplication`](indexerModels.TransactionApplication.md)

#### Defined in

client/v2/indexer/models/types.ts:4823
