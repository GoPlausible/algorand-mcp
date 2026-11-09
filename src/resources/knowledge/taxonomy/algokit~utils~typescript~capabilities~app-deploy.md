# App deployment

AlgoKit contains advanced smart contract deployment capabilities that allow you to have idempotent (safely retryable) deployment of a named app, including deploy-time immutability and permanence control and TEAL template substitution. This allows you to control the smart contract development lifecycle of a single-instance app across multiple environments (e.g. LocalNet, TestNet, MainNet).

It's optional to use this functionality, since you can construct your own deployment logic using create / update / delete calls and your own mechanism to maintaining app metadata (like app IDs etc.), but this capability is an opinionated out-of-the-box solution that takes care of the heavy lifting for you.

App deployment is a higher-order use case capability provided by AlgoKit Utils that builds on top of the core capabilities, particularly [App management](./app.md).

To see some usage examples check out the [automated tests](../../src/app-deploy.spec.ts).

## Smart contract development lifecycle

The design behind the deployment capability is unique. The architecture design behind app deployment is articulated in an [architecture decision record](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/architecture-decisions/2023-01-12_smart-contract-deployment.md). While the implementation will naturally evolve over time and diverge from this record, the principles and design goals behind the design are comprehensively explained.

Namely, it described the concept of a smart contract development lifecycle:

1. Development
   1. **Write** smart contracts
   2. **Transpile** smart contracts with development-time parameters (code configuration) to TEAL Templates
   3. **Verify** the TEAL Templates maintain [output stability](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/articles/output_stability.md) and any other static code quality checks
2. Deployment
   1. **Substitute** deploy-time parameters into TEAL Templates to create final TEAL code
   2. **Compile** the TEAL to create byte code using algod
   3. **Deploy** the byte code to one or more Algorand networks (e.g. LocalNet, TestNet, MainNet) to create Deployed Application(s)
3. Runtime
   1. **Validate** the deployed app via automated testing of the smart contracts to provide confidence in their correctness
   2. **Call** deployed smart contract with runtime parameters to utilise it

![App deployment lifecycle](../images/lifecycle.jpg)

The App deployment capability provided by AlgoKit Utils helps implement **#2 Deployment**.

Furthermore, the implementation contains the following implementation characteristics per the original architecture design:

- Deploy-time parameters can be provided and substituted into a TEAL Template by convention (by replacing `TMPL_{KEY}`)
- Contracts can be built by any smart contract framework that supports [ARC-0032](https://github.com/algorandfoundation/ARCs/pull/150) and [ARC-0004](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0004.md) ([Beaker](https://beaker.algo.xyz/) or otherwise), which also means the deployment language can be different to the development language e.g. you can deploy a Python smart contract with TypeScript for instance
- There is explicit control of the immutability (updatability / upgradeability) and permanence (deletability) of the smart contract, which can be varied per environment to allow for easier development and testing in non-MainNet environments (by replacing `TMPL_UPDATABLE` and `TMPL_DELETABLE` at deploy-time by convention, if present)
- Contracts are resolvable by a string "name" for a given creator to allow automated determination of whether that contract had been deployed previously or not, but can also be resolved by ID instead

This design allows you to have the same deployment code across environments without having to specify an ID for each environment. This makes it really easy to apply [continuous delivery](https://continuousdelivery.com/) practices to your smart contract deployment and make the deployment process completely automated.

## `AppDeployer`

The [`AppDeployer`](../code/classes/types_app_deployer.AppDeployer.md) is a class that is used to manage app deployments and deployment metadata.

To get an instance of `AppDeployer` you can use either [`AlgorandClient`](./algorand-client.md) via `algorand.appDeployer` or instantiate it directly (passing in an [`AppManager`](./app.md#appmanager), [`AlgorandClientTransactionSender`](./algorand-client.md#sending-a-single-transaction) and optionally an indexer client instance):

```typescript
import { AppDeployer } from '@algorandfoundation/algokit-utils/types/app-deployer'

const appDeployer = new AppDeployer(appManager, transactionSender, indexer)
```

## Deployment metadata

When AlgoKit performs a deployment of an app it creates metadata to describe that deployment and includes this metadata in an [ARC-2](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0002.md) transaction note on any creation and update transactions.

The deployment metadata is defined in [`AppDeployMetadata`](../code/interfaces/types_app.AppDeployMetadata.md), which is an object with:

- `name: string` - The unique name identifier of the app within the creator account
- `version: string` - The version of app that is / will be deployed; can be an arbitrary string, but we recommend using [semver](https://semver.org/)
- `deletable?: boolean` - Whether or not the app is deletable (`true`) / permanent (`false`) / unspecified (`undefined`)
- `updatable?: boolean` - Whether or not the app is updatable (`true`) / immutable (`false`) / unspecified (`undefined`)

An example of the ARC-2 transaction note that is attached as an app creation / update transaction note to specify this metadata is:

```
ALGOKIT_DEPLOYER:j{name:"MyApp",version:"1.0",updatable:true,deletable:false}
```

## Lookup deployed apps by name

In order to resolve what apps have been previously deployed and their metadata, AlgoKit provides a method that does a series of indexer lookups and returns a map of name to app metadata via `algorand.appDeployer.getCreatorAppsByName(creatorAddress)`.

```typescript
const appLookup = algorand.appDeployer.getCreatorAppsByName('CREATORADDRESS')
const app1Metadata = appLookup['app1']
```

This method caches the result of the lookup, since it's a reasonably heavyweight call (N+1 indexer calls for N deployed apps by the creator). If you want to skip the cache to get a fresh version then you can pass in a second parameter `ignoreCache?: boolean`. This should only be needed if you are performing parallel deployments outside of the current `AppDeployer` instance, since it will keep its cache updated based on its own deployments.

The return type of `getCreatorAppsByName` is [`AppLookup`](../code/interfaces/types_app_deployer.AppLookup.md):

```typescript
export interface AppLookup {
  creator: Readonly<string>
  apps: {
    [name: string]: AppMetadata
  }
}
```

The `apps` property contains a lookup by app name that resolves to the current [`AppMetadata`](../code/interfaces/types_app_deployer.AppMetadata.md) value:

```typescript
interface AppMetadata {
  /** The id of the app */
  appId: bigint
  /** The Algorand address of the account associated with the app */
  appAddress: string
  /** The unique name identifier of the app within the creator account */
  name: string
  /** The version of app that is / will be deployed */
  version: string
  /** Whether or not the app is deletable / permanent / unspecified */
  deletable?: boolean
  /** Whether or not the app is updatable / immutable / unspecified */
  updatable?: boolean
  /** The round the app was created */
  createdRound: bigint
  /** The last round that the app was updated */
  updatedRound: bigint
  /** The metadata when the app was created */
  createdMetadata: AppDeployMetadata
  /** Whether or not the app is deleted */
  deleted: boolean
}
```

An example `AppLookup` might look like this:

```json
{
  "creator": "<creator_address>",
  "apps": {
    "<app_name>": {
      /** The id of the app */
      "appId": 1,
      /** The Algorand address of the account associated with the app */
      "appAddress": "<app_account_address>",
      /** The unique name identifier of the app within the creator account */
      "name": "<app_name>",
      /** The version of app that is / will be deployed */
      "version": "2.0.0",
      /** Whether or not the app is deletable / permanent / unspecified */
      "deletable": false,
      /** Whether or not the app is updatable / immutable / unspecified */
      "updatable": false,
      /** The round the app was created */
      "createdRound": 1,
      /** The last round that the app was updated */
      "updatedRound": 2,
      /** Whether or not the app is deleted */
      "deleted": false,
      /** The metadata when the app was created */
      "createdMetadata": {
        /** The unique name identifier of the app within the creator account */
        "name": "<app_name>",
        /** The version of app that is / will be deployed */
        "version": "1.0.0",
        /** Whether or not the app is deletable / permanent / unspecified */
        "deletable": true,
        /** Whether or not the app is updatable / immutable / unspecified */
        "updatable": true
      }
    }
    //...
  }
}
```

## Performing a deployment

In order to perform a deployment, AlgoKit provides the `algorand.appDeployer.deploy(deployment)` method.

For example:

```typescript
const deploymentResult = algorand.appDeployer.deploy({
  metadata: {
    name: 'MyApp',
    version: '1.0.0',
    deletable: false,
    updatable: false,
  },
  createParams: {
    sender: 'CREATORADDRESS',
    approvalProgram: approvalTealTemplateOrByteCode,
    clearStateProgram: clearStateTealTemplateOrByteCode,
    schema: {
      globalInts: 1,
      globalByteSlices: 2,
      localInts: 3,
      localByteSlices: 4,
    },
    // Other parameters if a create call is made...
  },
  updateParams: {
    sender: 'SENDERADDRESS',
    // Other parameters if an update call is made...
  },
  deleteParams: {
    sender: 'SENDERADDRESS',
    // Other parameters if a delete call is made...
  },
  deployTimeParams: {
    // Key => value of any TEAL template variables to replace before compilation
    VALUE: 1,
  },
  // How to handle a schema break
  onSchemaBreak: OnSchemaBreak.Append,
  // How to handle a contract code update
  onUpdate: OnUpdate.Update,
  // Optional execution control parameters
  populateAppCallResources: true,
})
```

This method performs an idempotent (safely retryable) deployment. It will detect if the app already exists and if it doesn't it will create it. If the app does already exist then it will:

- Detect if the app has been updated (i.e. the program logic has changed) and either fail, perform an update, deploy a new version or perform a replacement (delete old app and create new app) based on the deployment configuration.
- Detect if the app has a breaking schema change (i.e. more global or local storage is needed than were originally requested) and either fail, deploy a new version or perform a replacement (delete old app and create new app) based on the deployment configuration.

It will automatically [add metadata to the transaction note of the create or update transactions](#deployment-metadata) that indicates the name, version, updatability and deletability of the contract. This metadata works in concert with [`appDeployer.getCreatorAppsByName`](#lookup-deployed-apps-by-name) to allow the app to be reliably retrieved against that creator in it's currently deployed state. It will automatically update it's lookup cache so subsequent calls to `getCreatorAppsByName` or `deploy` will use the latest metadata without needing to call indexer again.

`deploy` also automatically executes [template substitution](#compilation-and-template-substitution) including deploy-time control of permanence and immutability if the requisite template parameters are specified in the provided TEAL template.

### Input parameters

The first parameter `deployment` is an [`AppDeployParams`](../code/interfaces/types_app_deployer.AppDeployParams.md), which is an object with:

- `metadata: AppDeployMetadata` - determines the [deployment metadata](#deployment-metadata) of the deployment
- `createParams: AppCreateParams | AppCreateMethodCall` - the parameters for an [app creation call](./app.md#creation) (raw or ABI method call)
- `updateParams: Omit<AppUpdateParams | AppUpdateMethodCall, 'appId' | 'approvalProgram' | 'clearStateProgram'>` - the parameters for an [app update call](./app.md#updating) (raw or ABI method call) without the `appId`, `approvalProgram` or `clearStateProgram`, since these are calculated by the `deploy` method
- `deleteParams: Omit<AppDeleteParams | AppDeleteMethodCall, 'appId'>` - the parameters for an [app delete call](./app.md#deleting) (raw or ABI method call) without the `appId`, since this is calculated by the `deploy` method
- `deployTimeParams?: TealTemplateParams` - allows automatic substitution of [deploy-time TEAL template variables](#compilation-and-template-substitution)
  - [`TealTemplateParams`](../code/interfaces/types_app.TealTemplateParams.md) is a `key => value` object that will result in `TMPL_{key}` being replaced with `value` (where a string or `Uint8Array` will be appropriately encoded as bytes within the TEAL code)
- `onSchemaBreak?: 'replace' | 'fail' | 'append' | OnSchemaBreak` - determines [what should happen](../code/enums/types_app.OnSchemaBreak.md) if a breaking change to the schema is detected (e.g. if you need more global or local state that was previously requested when the contract was originally created)
- `onUpdate?: 'update' | 'replace' | 'fail' | 'append' | OnUpdate` - determines [what should happen](../code/enums/types_app.OnUpdate.md) if an update to the smart contract is detected (e.g. the TEAL code has changed since last deployment)
- `existingDeployments?: AppLookup` - optionally allows the [app lookup retrieval](#lookup-deployed-apps-by-name) to be skipped if it's already been retrieved outside of this `AppDeployer` instance
- `ignoreCache?: boolean` - optionally allows the [lookup cache](#lookup-deployed-apps-by-name) to be ignored and force retrieval of fresh deployment metadata from indexer
- Everything from [`SendParams`](../code/interfaces/types_transaction.SendParams.md) - [transaction execution control parameters](./algorand-client.md#transaction-parameters)

### Idempotency

`deploy` is idempotent which means you can safely call it again multiple times and it will only apply any changes it detects. If you call it again straight after calling it then it will do nothing.

### Compilation and template substitution

When compiling TEAL template code, the capabilities described in the [above design](#design) are present, namely the ability to supply deploy-time parameters and the ability to control immutability and permanence of the smart contract at deploy-time.

In order for a smart contract to opt-in to use this functionality, it must have a TEAL Template that contains the following:

- `TMPL_{key}` - Which can be replaced with a number or a string / byte array which wil be automatically hexadecimal encoded (for any number of `{key}` => `{value}` pairs)
- `TMPL_UPDATABLE` - Which will be replaced with a `1` if an app should be updatable and `0` if it shouldn't (immutable)
- `TMPL_DELETABLE` - Which will be replaced with a `1` if an app should be deletable and `0` if it shouldn't (permanent)

If you are building a smart contract using the production [AlgoKit init templates](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/init.md) provide a reference implementation out of the box for the deploy-time immutability and permanence control.

If you passed in a TEAL template for the approvalProgram or clearStateProgram (i.e. a `string` rather than a `Uint8Array`) then `deploy` will return the [compilation result](../code/interfaces/types_app.CompiledTeal.md) of substituting then compiling the TEAL template(s) in the following properties of the return value:

- `compiledApproval?: CompiledTeal`
- `compiledClear?: CompiledTeal`

Template substitution is done by executing `algorand.app.compileTealTemplate(tealTemplateCode, templateParams?, deploymentMetadata?)`, which in turn calls the following in order and returns the compilation result per above (all of which can also be invoked directly):

- `AppManager.stripTealComments(tealCode)` - Strips out any TEAL comments to reduce the payload that is sent to algod and reduce the likelihood of hitting the max payload limit
- `AppManager.replaceTealTemplateParams(tealTemplateCode, templateParams)` - Replaces the `templateParams` by looking for `TMPL_{key}`
- `AppManager.replaceTealTemplateDeployTimeControlParams(tealTemplateCode, deploymentMetadata)` - If `deploymentMetadata` is provided, it allows for deploy-time immutability and permanence control by replacing `TMPL_UPDATABLE` with `deploymentMetadata.updatable` if it's not `undefined` and replacing `TMPL_DELETABLE` with `deploymentMetadata.deletable` if it's not `undefined`
- `algorand.app.compileTeal(tealCode)` - Sends the final TEAL to algod for compilation and returns the result including the source map and caches the compilation result within the `AppManager` instance

### Return value

When `deploy` executes it will return a [comprehensive result](../code/modules/types_app_deployer.md#appdeployresult) object that describes exactly what it did and has comprehensive metadata to describe the end result of the deployed app.

The `deploy` call itself may do one of the following (which you can determine by looking at the `operationPerformed` field on the return value from the function):

- `create` - The smart contract app was created
- `update` - The smart contract app was updated
- `replace` - The smart contract app was deleted and created again (in an atomic transaction)
- `nothing` - Nothing was done since it was detected the existing smart contract app deployment was up to date

As well as the `operationPerformed` parameter and the [optional compilation result](#compilation-and-template-substitution), the return value will have the [`AppMetadata`](../code/interfaces/types_app_deployer.AppMetadata.md) [fields](#deployment-metadata) present.

Based on the value of `operationPerformed` there will be other data available in the return value:

- If `create`, `update` or `replace` then it will have the relevant [`SendAppTransactionResult`](./app.md#calling-an-app) values
- If `replace` then it will also have `{deleteReturn?: ABIReturn, deleteResult: ConfirmedTransactionResult}` to capture the [result](./algorand-client.md#sending-a-single-transaction) of the deletion of the existing app
