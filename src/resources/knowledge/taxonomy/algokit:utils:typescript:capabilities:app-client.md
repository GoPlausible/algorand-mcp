# App client and App factory

> [!NOTE]
> This page covers the untyped app client, but we recommend using [typed clients](./typed-app-clients.md), which will give you a better developer experience with strong typing and intellisense specific to the app itself.

App client and App factory are higher-order use case capabilities provided by AlgoKit Utils that builds on top of the core capabilities, particularly [App deployment](./app-deploy.md) and [App management](./app.md). They allow you to access high productivity application clients that work with [ARC-56](https://github.com/algorandfoundation/ARCs/pull/258) and [ARC-32](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0032.md) application spec defined smart contracts, which you can use to create, update, delete, deploy and call a smart contract and access state data for it.

> ![NOTE]
>
> If you are confused about when to use the factory vs client the mental model is: use the client if you know the app ID, use the factory if you don't know the app ID (deferred knowledge or the instance doesn't exist yet on the blockchain) or you have multiple app IDs

## `AppFactory`

The [`AppFactory`](../code/classes/types_app_factory.AppFactory.md) is a class that, for a given app spec, allows you to create and deploy one or more app instances and to create one or more app clients to interact with those (or other) app instances.

To get an instance of `AppFactory` you can use either [`AlgorandClient`](./algorand-client.md) via `algorand.client.getAppFactory` or instantiate it directly (passing in an app spec, an `AlgorandClient` instance and other optional parameters):

```typescript
// Minimal example
const factory = algorand.client.getAppFactory({
  appSpec: '{/* ARC-56 or ARC-32 compatible JSON */}',
})
// Advanced example
const factory = algorand.client.getAppFactory({
  appSpec: parsedArc32OrArc56AppSpec,
  defaultSender: 'SENDERADDRESS',
  appName: 'OverriddenAppName',
  version: '2.0.0',
  updatable: true,
  deletable: false,
  deployTimeParams: { ONE: 1, TWO: 'value' },
})
```

## `AppClient`

The [`AppClient`](../code/classes/types_app_client.AppClient.md) is a class that, for a given app spec, allows you to manage calls and state for a specific deployed instance of an app (with a known app ID).

To get an instance of `AppClient` you can use either [`AlgorandClient`](./algorand-client.md) via `algorand.client.getAppClient*` or instantiate it directly (passing in an app ID, app spec, `AlgorandClient` instance and other optional parameters):

```typescript
// Minimal examples
const appClient = algorand.client.getAppClientByCreatorAndName({
  appSpec: '{/* ARC-56 or ARC-32 compatible JSON */}',
  // appId resolved by looking for app ID of named app by this creator
  creatorAddress: 'CREATORADDRESS',
})
const appClient = algorand.client.getAppClientById({
  appSpec: '{/* ARC-56 or ARC-32 compatible JSON */}',
  appId: 12345n,
})
const appClient = algorand.client.getAppClientByNetwork({
  appSpec: '{/* ARC-56 or ARC-32 compatible JSON */}',
  // appId resolved by using ARC-56 spec to find app ID for current network
})

// Advanced example
const appClient = algorand.client.getAppClientById({
  appSpec: parsedAppSpec_AppSpec_or_Arc56Contract,
  appId: 12345n,
  appName: 'OverriddenAppName',
  defaultSender: 'SENDERADDRESS',
  approvalSourceMap: approvalTealSourceMap,
  clearSourceMap: clearTealSourceMap,
})
```

You can get the `appId` and `appAddress` at any time as properties on the `AppClient` along with `appName` and `appSpec`.

## Dynamically creating clients for a given app spec

As well as allowing you to control creation and deployment of apps, the `AppFactory` allows you to conveniently create multiple `AppClient` instances on-the-fly with information pre-populated.

This is possible via two methods on the app factory:

- [`factory.getAppClientById(params)`](../code/classes/types_app_factory.AppFactory.md#getappclientbyid) - Returns a new `AppClient` client for an app instance of the given ID. Automatically populates appName, defaultSender and source maps from the factory if not specified in the params.
- [`factory.getAppClientByCreatorAndName(params)`](../code/classes/types_app_factory.AppFactory.md#getappclientbycreatorandname) - Returns a new `AppClient` client, resolving the app by creator address and name using AlgoKit app deployment semantics (i.e. looking for the app creation transaction note). Automatically populates appName, defaultSender and source maps from the factory if not specified in the params.

```typescript
const appClient1 = factory.getAppClientById({ appId: 12345n })
const appClient2 = factory.getAppClientById({ appId: 12346n })
const appClient3 = factory.getAppClientById({ appId: 12345n, defaultSender: 'SENDER2ADDRESS' })
const appClient4 = factory.getAppClientByCreatorAndName({
  creatorAddress: 'CREATORADDRESS',
})
const appClient5 = factory.getAppClientByCreatorAndName({
  creatorAddress: 'CREATORADDRESS',
  appName: 'NonDefaultAppName',
})
const appClient6 = factory.getAppClientByCreatorAndName({
  creatorAddress: 'CREATORADDRESS',
  appName: 'NonDefaultAppName',
  ignoreCache: true, // Perform fresh indexer lookups
  defaultSender: 'SENDER2ADDRESS',
})
```

## Creating and deploying an app

Once you have an [app factory](#appfactory) you can perform the following actions:

- [`factory.create(params?)`](../code/classes/types_app_factory.AppFactory.md#create) - Signs and sends a transaction to create an app and returns the [result of that call](./app.md#creation) and an [`AppClient`](#appclient) instance for the created app
- [`factory.deploy(params)`](../code/classes/types_app_factory.AppFactory.md#deploy) - Uses the [creator address and app name pattern](./app-deploy.md#lookup-deployed-apps-by-name) to find if the app has already been deployed or not and either creates, updates or replaces that app based on the [deployment rules](./app-deploy.md#performing-a-deployment) (i.e. it's an idempotent deployment) and returns the [result of the deployment](./app-deploy.md#return-value) and an [`AppClient`](#appclient) instance for the created/updated/existing app

### Create

The create method is a wrapper over the `appCreate` (bare calls) and `appCreateMethodCall` (ABI method calls) [methods](./app.md#creation), with the following differences:

- You don't need to specify the `approvalProgram`, `clearStateProgram`, or `schema` because these are all specified or calculated from the app spec (noting you can override the `schema`)
- `sender` is optional and if not specified then the `defaultSender` from the `AppFactory` constructor is used (if it was specified, otherwise an error is thrown)
- `deployTimeParams`, `updatable` and `deletable` can be passed in to control [deploy-time parameter replacements and deploy-time immutability and permanence control](./app-deploy.md#compilation-and-template-substitution); these values can also be passed into the `AppFactory` constructor instead and if so will be used if not defined in the params to the create call

```typescript
// Use no-argument bare-call
const { result, appClient } = factory.send.bare.create()
// Specify parameters for bare-call and override other parameters
const { result, appClient } = factory.send.bare.create({
  args: [new Uint8Array(1, 2, 3, 4)],
  staticFee: (3000).microAlgo(),
  onComplete: algosdk.OnApplicationComplete.OptIn,
  deployTimeParams: {
    ONE: 1,
    TWO: 'two',
  },
  updatable: true,
  deletable: false,
  populateAppCallResources: true,
})
// Specify parameters for ABI method call
const { result, appClient } = factory.send.create({
  method: 'create_application',
  args: [1, 'something'],
})
```

If you want to construct a custom create call, use the underlying [`algorand.send.appCreate` / `algorand.createTransaction.appCreate` / `algorand.send.appCreateMethodCall` / `algorand.createTransaction.appCreateMethodCall` methods](./app.md#creation) then you can get params objects:

- `factory.params.create(params)` - ABI method create call for deploy method or an underlying [`appCreateMethodCall` call](./app.md#creation)
- `factory.params.bare.create(params)` - Bare create call for deploy method or an underlying [`appCreate` call](./app.md#creation)

### Deploy

The deploy method is a wrapper over the [`AppDeployer`'s `deploy` method](./app-deploy.md#performing-a-deployment), with the following differences:

- You don't need to specify the `approvalProgram`, `clearStateProgram`, or `schema` in the `createParams` because these are all specified or calculated from the app spec (noting you can override the `schema`)
- `sender` is optional for `createParams`, `updateParams` and `deleteParams` and if not specified then the `defaultSender` from the `AppFactory` constructor is used (if it was specified, otherwise an error is thrown)
- You don't need to pass in `metadata` to the deploy params - it's calculated from:
  - `updatable` and `deletable`, which you can optionally pass in directly to the method params
  - `version` and `name`, which are optionally passed into the `AppFactory` constructor
- `deployTimeParams`, `updatable` and `deletable` can all be passed into the `AppFactory` and if so will be used if not defined in the params to the deploy call for the [deploy-time parameter replacements and deploy-time immutability and permanence control](./app-deploy.md#compilation-and-template-substitution)
- `createParams`, `updateParams` and `deleteParams` are optional, if they aren't specified then default values are used for everything and a no-argument bare call will be made for any create/update/delete calls
- If you want to call an ABI method for create/update/delete calls then you can pass in a string for `method` (as opposed to an `ABIMethod` object), which can either be the method name, or if you need to disambiguate between multiple methods of the same name it can be the ABI signature (see example below)

```typescript
// Use no-argument bare-calls to deploy with default behaviour
//  for when update or schema break detected (fail the deployment)
const { result, appClient } = factory.deploy({})
// Specify parameters for bare-calls and override the schema break behaviour
const { result, appClient } = factory.deploy({
  createParams: {
    args: [new Uint8Array(1, 2, 3, 4)],
    staticFee: (3000).microAlgo(),
    onComplete: algosdk.OnApplicationComplete.OptIn:
  },
  updateParams: {
    args: [new Uint8Array(1, 2, 3)],
  },
  deleteParams: {
    args: [new Uint8Array(1, 2)],
  },
  deployTimeParams: {
    ONE: 1,
    TWO: 'two',
  },
  onUpdate: 'update',
  onSchemaBreak: 'replace',
  updatable: true,
  deletable: true,
})
// Specify parameters for ABI method calls
const { result, appClient } = factory.deploy({
  createParams: {
    method: "create_application",
    args: [1, "something"],
  },
  updateParams: {
    method: "update",
  },
  deleteParams: {
    method: "delete_app(uint64,uint64,uint64)uint64",
    args: [1, 2, 3]
  }
})
```

If you want to construct a custom deploy call, use the underlying [`algorand.appDeployer.deploy` method](./app-deploy.md#performing-a-deployment) then you can get params objects for the `createParams`, `updateParams` and `deleteParams`:

- `factory.params.create(params)` - ABI method create call for deploy method or an underlying [`appCreateMethodCall` call](./app.md#creation)
- `factory.params.deployUpdate(params)` - ABI method update call for deploy method
- `factory.params.deployDelete(params)` - ABI method delete call for deploy method
- `factory.params.bare.create(params)` - Bare create call for deploy method or an underlying [`appCreate` call](./app.md#creation)
- `factory.params.bare.deployUpdate(params)` - Bare update call for deploy method
- `factory.params.bare.deployDelete(params)` - Bare delete call for deploy method

## Updating and deleting an app

Deploy method aside, the ability to make update and delete calls happens after there is an instance of an app so are done via `AppClient`. The semantics of this are no different than [other calls](#calling-the-app), with the caveat that the update call is a bit different to the others since the code will be compiled when constructing the update params (making it an async method) and the update calls thus optionally takes compilation parameters (`deployTimeParams`, `updatable` and `deletable`) for [deploy-time parameter replacements and deploy-time immutability and permanence control](./app-deploy.md#compilation-and-template-substitution).

## Calling the app

You can construct a params object, transaction(s) and sign and send a transaction to call the app that a given `AppClient` instance is pointing to.

This is done via the following properties:

- `appClient.params.{onComplete}(params)` - Params for an ABI method call
- `appClient.params.bare.{onComplete}(params)` - Params for a bare call
- `appClient.createTransaction.{onComplete}(params)` - Transaction(s) for an ABI method call
- `appClient.createTransaction.bare.{onComplete}(params)` - Transaction for a bare call
- `appClient.send.{onComplete}(params)` - Sign and send an ABI method call
- `appClient.send.bare.{onComplete}(params)` - Sign and send a bare call

To make one of these calls `{onComplete}` needs to be swapped with the [on complete action](https://developer.algorand.org/docs/get-details/dapps/smart-contracts/apps/#the-lifecycle-of-a-smart-contract) that should be made:

- `update` - An update call
- `optIn` - An opt-in call
- `delete` - A delete application call
- `clearState` - A clear state call (note: calls the clear program and only applies to bare calls)
- `closeOut` - A close-out call
- `call` - A no-op call (or other call if `onComplete` is specified to anything other than update)

The input payload for all of these calls is the same as the [underlying app methods](./app.md#calling-apps) with the caveat that the `appId` is not passed in (since the `AppClient` already knows the app ID), `sender` is optional (it uses `defaultSender` from the `AppClient` constructor if it was specified) and `method` (for ABI method calls) is a string rather than an `ABIMethod` object (which can either be the method name, or if you need to disambiguate between multiple methods of the same name it can be the ABI signature).

The return payload for all of these is the same as the [underlying methods](./app.md#calling-apps).

```typescript
const call1 = await appClient.send.update({
  method: 'update_abi',
  args: ['string_io'],
  deployTimeParams,
})
const call2 = await appClient.send.delete({
  method: 'delete_abi',
  args: ['string_io'],
})
const call3 = await appClient.send.optIn({ method: 'opt_in' })
const call4 = await appClient.send.bare.clearState()

const transaction = await appClient.createTransaction.bare.closeOut({
  args: [new Uint8Array(1, 2, 3)],
})

const params = appClient.params.optIn({ method: 'optin' })
```

### Nested ABI Method Call Transactions

The ARC4 ABI specification supports ABI method calls as arguments to other ABI method calls, enabling some interesting use cases. While this conceptually resembles a function call hierarchy, in practice, the transactions are organized as a flat, ordered transaction group. Unfortunately, this logically hierarchical structure cannot always be correctly represented as a flat transaction group, making some scenarios impossible.

To illustrate this, let's consider an example of two ABI methods with the following signatures:

- `myMethod(pay,appl)void`
- `myOtherMethod(pay)void`

These signatures are compatible, so `myOtherMethod` can be passed as an ABI method call argument to `myMethod`, which would look like:

Hierarchical method call

```
myMethod(pay, myOtherMethod(pay))
```

Flat transaction group

```
pay (pay)
appl (myOtherMethod)
appl (myMethod)
```

An important limitation to note is that the flat transaction group representation does not allow having two different pay transactions. This invariant is represented in the hierarchical call interface of the app client by passing an `undefined` value. This acts as a placeholder and tells the app client that another ABI method call argument will supply the value for this argument. For example:

```typescript
const payment = algorand.createTransaction.payment({
  sender: alice.addr,
  receiver: alice.addr,
  amount: microAlgo(1),
})

const myOtherMethodCall = await appClient.params.call({
  method: 'myOtherMethod',
  args: [payment],
})

const myMethodCall = await appClient.send.call({
  method: 'myMethod',
  args: [undefined, myOtherMethodCall],
})
```

`myOtherMethodCall` supplies the pay transaction to the transaction group and, by association, `myOtherMethodCall` has access to it as defined in its signature.
To ensure the app client builds the correct transaction group, you must supply a value for every argument in a method call signature.

## Funding the app account

Often there is a need to fund an app account to cover minimum balance requirements for boxes and other scenarios. There is an app client method that will do this for you `fundAppAccount(params)`.

The input parameters are:

- A [`FundAppParams`](../code/modules/types_app_client.md#fundappparams), which has the same properties as a [payment transaction](./transfer.md#payment) except `receiver` is not required and `sender` is optional (if not specified then it will be set to the app client's default sender if configured).

Note: If you are passing the funding payment in as an ABI argument so it can be validated by the ABI method then you'll want to get the funding call as a transaction, e.g.:

```typescript
const result = await appClient.send.call({
  method: 'bootstrap',
  args: [
    appClient.createTransaction.fundAppAccount({
      amount: microAlgo(200_000),
    }),
  ],
  boxReferences: ['Box1'],
})
```

You can also get the funding call as a params object via `appClient.params.fundAppAccount(params)`.

## Reading state

`AppClient` has a number of mechanisms to read state (global, local and box storage) from the app instance.

### App spec methods

The ARC-56 app spec can specify detailed information about the encoding format of state values and as such allows for a more advanced ability to automatically read state values and decode them as their high-level language types rather than the limited `bigint` / `bytes` / `string` ability that the [generic methods](#generic-methods) give you.

You can access this functionality via:

- `appClient.state.global.{method}()` - Global state
- `appClient.state.local(address).{method}()` - Local state
- `appClient.state.box.{method}()` - Box storage

Where `{method}` is one of:

- `getAll()` - Returns all single-key state values in a record keyed by the key name and the value a decoded ABI value.
- `getValue(name)` - Returns a single state value for the current app with the value a decoded ABI value.
- `getMapValue(mapName, key)` - Returns a single value from the given map for the current app with the value a decoded ABI value. Key can either be a `Uint8Array` with the binary value of the key value on-chain (without the map prefix) or the high level (decoded) value that will be encoded to bytes for the app spec specified `keyType`
- `getMap(mapName)` - Returns all map values for the given map in a key=>value record. It's recommended that this is only done when you have a unique `prefix` for the map otherwise there's a high risk that incorrect values will be included in the map.

```typescript
const values = appClient.state.global.getAll()
const value = appClient.state.local('ADDRESS').getValue('value1')
const mapValue = appClient.state.box.getMapValue('map1', 'mapKey')
const map = appClient.state.global.getMap('myMap')
```

### Generic methods

There are various methods defined that let you read state from the smart contract app:

- `getGlobalState()` - Gets the current global state using [`algorand.app.getGlobalState`](./app.md#global-state)
- `getLocalState(address: string)` - Gets the current local state for the given account address using [`algorand.app.getLocalState`](./app.md#local-state).
- `getBoxNames()` - Gets the current box names using [`algorand.app.getBoxNames`](./app.md#boxes)
- `getBoxValue(name)` - Gets the current value of the given box using [`algorand.app.getBoxValue`](./app.md#boxes)
- `getBoxValueFromABIType(name)` - Gets the current value of the given box from an ABI type using [`algorand.app.getBoxValueFromABIType`](./app.md#boxes)
- `getBoxValues(filter)` - Gets the current values of the boxes using [`algorand.app.getBoxValues`](./app.md#boxes)
- `getBoxValuesFromABIType(type, filter)` - Gets the current values of the boxes from an ABI type using [`algorand.app.getBoxValuesFromABIType`](./app.md#boxes)

```typescript
const globalState = await appClient.getGlobalState()
const localState = await appClient.getLocalState('ACCOUNTADDRESS')

const boxName: BoxReference = 'my-box'
const boxName2: BoxReference = 'my-box2'

const boxNames = appClient.getBoxNames()
const boxValue = appClient.getBoxValue(boxName)
const boxValues = appClient.getBoxValues([boxName, boxName2])
const boxABIValue = appClient.getBoxValueFromABIType(boxName, algosdk.ABIStringType)
const boxABIValues = appClient.getBoxValuesFromABIType([boxName, boxName2], algosdk.ABIStringType)
```

## Handling logic errors and diagnosing errors

Often when calling a smart contract during development you will get logic errors that cause an exception to throw. This may be because of a failing assertion, a lack of fees, exhaustion of opcode budget, or any number of other reasons.

When this occurs, you will generally get an error that looks something like: `TransactionPool.Remember: transaction {TRANSACTION_ID}: logic eval error: {ERROR_MESSAGE}. Details: pc={PROGRAM_COUNTER_VALUE}, opcodes={LIST_OF_OP_CODES}`.

The information in that error message can be parsed and when combined with the [source map from compilation](./app-deploy.md#compilation-and-template-substitution) you can expose debugging information that makes it much easier to understand what's happening. The ARC-56 app spec, if provided, can also specify human-readable error messages against certain program counter values and further augment the error message.

The app client and app factory automatically provide this functionality for all smart contract calls. They also expose a function that can be used for any custom calls you manually construct and need to add into your own try/catch `exposeLogicError(e: Error, isClear?: boolean)`.

When an error is thrown then the resulting error that is re-thrown will be a [`LogicError` object](../code/classes/types_logic_error.LogicError.md), which has the following fields:

- `message: string` - The formatted error message `{ERROR_MESSAGE}. at:{TEAL_LINE}. {ERROR_DESCRIPTION}`
- `stack: string` - A stack trace of the TEAL code showing where the error was with the 5 lines either side of it
- `led: LogicErrorDetails` - The parsed [logic error details](../code/interfaces/types_logic_error.LogicErrorDetails.md) from the error message, with the following properties:
  - `txId: string` - The transaction ID that triggered the error
  - `pc: number` - The program counter
  - `msg: string` - The raw error message
  - `desc: string` - The full error description
  - `traces: Record<string, unknown>[]` - Any traces that were included in the error
- `program: string[]` - The TEAL program split by line
- `teal_line: number` - The line number in the TEAL program that triggered the error

Note: This information will only show if the app client / app factory has a source map. This will occur if:

- You have called `create`, `update` or `deploy`
- You have called `importSourceMaps(sourceMaps)` and provided the source maps (which you can get by calling `exportSourceMaps()` after variously calling `create`, `update`, or `deploy` and it returns a serialisable value)
- You had source maps present in an app factory and then used it to [create an app client](#dynamically-creating-clients-for-a-given-app-spec) (they are automatically passed through)

If you want to go a step further and automatically issue a [simulated transaction](https://algorand.github.io/js-algorand-sdk/classes/modelsv2.SimulateTransactionResult.html) and get trace information when there is an error when an ABI method is called you can turn on debug mode:

```typescript
Config.configure({ debug: true })
```

If you do that then the exception will have the `traces` property within the underlying exception will have key information from the simulation within it and this will get populated into the `led.traces` property of the thrown error.

When this debug flag is set, it will also emit debugging symbols to allow break-point debugging of the calls if the [project root is also configured](./debugging.md).

## Default arguments

If an ABI method call specifies default argument values for any of its arguments you can pass in `undefined` for the value of that argument for the default value to be automatically populated.
