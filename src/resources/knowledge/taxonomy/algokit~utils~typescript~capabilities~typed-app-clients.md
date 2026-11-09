# Typed application clients

Typed application clients are automatically generated, typed TypeScript deployment and invocation clients for smart contracts that have a defined [ARC-56](https://github.com/algorandfoundation/ARCs/pull/258) or [ARC-32](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0032.md) application specification so that the development experience is easier with less upskill ramp-up and less deployment errors. These clients give you a type-safe, intellisense-driven experience for invoking the smart contract.

Typed application clients are the recommended way of interacting with smart contracts. If you don't have/want a typed client, but have an ARC-56/ARC-32 app spec then you can use the [non-typed application clients](./app-client.md) and if you want to call a smart contract you don't have an app spec file for you can use the underlying [app management](./app.md) and [app deployment](./app-deploy.md) functionality to manually construct transactions.

## Generating an app spec

You can generate an app spec file:

- Using [Algorand Python](https://algorandfoundation.github.io/puya/#quick-start)
- Using [TEALScript](https://tealscript.netlify.app/tutorials/hello-world/0004-artifacts/)
- By hand by following the specification [ARC-56](https://github.com/algorandfoundation/ARCs/pull/258)/[ARC-32](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0032.md)
- Using [Beaker](https://algorand-devrel.github.io/beaker/html/usage.html) (PyTEAL) _(DEPRECATED)_

## Generating a typed client

To generate a typed client from an app spec file you can use [AlgoKit CLI](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/generate.md#1-typed-clients):

```
> algokit generate client application.json --output /absolute/path/to/client.ts
```

Note: AlgoKit Utils >= 7.0.0 is compatible with the older 3.0.0 generated typed clients, however if you want to utilise the new features or leverage ARC-56 support, you will need to generate using >= 4.0.0. See [AlgoKit CLI generator version pinning](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/generate.md#version-pinning) for more information on how to lock to a specific version.

## Getting a typed client instance

To get an instance of a typed client you can use an [`AlgorandClient`](./algorand-client.md) instance or a typed app [`Factory`](#creating-a-typed-factory-instance) instance.

The approach to obtaining a client instance depends on how many app clients you require for a given app spec and if the app has already been deployed, which is summarised below:

### App is deployed

<table>
<thead>
<tr>
<th colspan="2">Resolve App by ID</th>
<th colspan="2">Resolve App by Creator and Name</th>
</tr>
<tr>
<th>Single App Client Instance</th>
<th>Multiple App Client Instances</th>
<th>Single App Client Instance</th>
<th>Multiple App Client Instances</th>
</tr>
</thead>
<tbody>
<tr>
<td>

```typescript
const appClient = algorand.client.getTypedAppClientById(MyContractClient, {
  appId: 1234n,
  // ...
})
//or
const appClient = new MyContractClient({
  algorand,
  appId: 1234n,
  // ...
})
```

</td>
<td>

```typescript
const appClient1 = factory.getAppClientById({
  appId: 1234n,
  // ...
})
const appClient2 = factory.getAppClientById({
  appId: 4321n,
  // ...
})
```

</td>
<td>

```typescript
const appClient = await algorand.client.getTypedAppClientByCreatorAndName(MyContractClient, {
  creatorAddress: 'CREATORADDRESS',
  appName: 'contract-name',
  // ...
})
//or
const appClient = await MyContractClient.fromCreatorAndName({
  algorand,
  creatorAddress: 'CREATORADDRESS',
  appName: 'contract-name',
  // ...
})
```

</td>
<td>

```typescript
const appClient1 = await factory.getAppClientByCreatorAndName({
  creatorAddress: 'CREATORADDRESS',
  appName: 'contract-name',
  // ...
})
const appClient2 = await factory.getAppClientByCreatorAndName({
  creatorAddress: 'CREATORADDRESS',
  appName: 'contract-name-2',
  // ...
})
```

</td>
</tr>
</tbody>
</table>

To understand the difference between resolving by ID vs by creator and name see the underlying [app client documentation](./app-client.md#appclient).

### App is not deployed

<table>
<thead>
<tr>
<th>Deploy a New App</th>
<th>Deploy or Resolve App Idempotently by Creator and Name</th>
</tr>
</thead>
<tbody>
<tr>
<td>

```typescript
const { appClient } = await factory.send.create.bare({
  args: [],
  // ...
})
// or
const { appClient } = await factory.send.create.METHODNAME({
  args: [],
  // ...
})
```

</td>
<td>

```typescript
const { appClient } = await factory.deploy({
  appName: 'contract-name',
  // ...
})
```

</td>
</tr>
</tbody>
</table>

### Creating a typed factory instance

If your scenario calls for an app factory, you can create one using the below:

```typescript
const factory = algorand.client.getTypedAppFactory(MyContractFactory)
//or
const factory = new MyContractFactory({
  algorand,
})
```

## Client usage

See the [official usage docs](https://github.com/algorandfoundation/algokit-client-generator-ts/blob/main/docs/usage.md) for full details.

For a simple example that deploys a contract and calls a `"hello"` method, see below:

```typescript
// A similar working example can be seen in the AlgoKit init production smart contract templates, when using TypeScript deployment
// In this case the generated factory is called `HelloWorldAppFactory` and is in `./artifacts/HelloWorldApp/client.ts`
import { HelloWorldAppClient } from './artifacts/HelloWorldApp/client'
import { AlgorandClient } from '@algorandfoundation/algokit-utils'

// These require environment variables to be present, or it will retrieve from default LocalNet
const algorand = AlgorandClient.fromEnvironment()
const deployer = algorand.account.fromEnvironment('DEPLOYER', (1).algo())

// Create the typed app factory
const factory = algorand.client.getTypedAppFactory(HelloWorldAppFactory, {
  creatorAddress: deployer,
  defaultSender: deployer,
})

// Create the app and get a typed app client for the created app (note: this creates a new instance of the app every time,
//  you can use .deploy() to deploy idempotently if the app wasn't previously
//  deployed or needs to be updated if that's allowed)
const { appClient } = await factory.create()

// Make a call to an ABI method and print the result
const response = await appClient.hello({ name: 'world' })
console.log(response)
```
