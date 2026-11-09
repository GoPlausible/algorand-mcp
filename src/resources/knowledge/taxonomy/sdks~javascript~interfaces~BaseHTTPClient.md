[algosdk](../README.md) / [Exports](../modules.md) / BaseHTTPClient

# Interface: BaseHTTPClient

BaseHTTPClient is an interface abstracting the queries that can be
made to an algod/indexer endpoint.
The SDK normally uses the URLTokenBaseHTTPClient implementation.
But when used via wallets, the wallet may provide a different object
satisfying the HTTPClient interface. This is useful to allow
wallets to provide access to paid API services without leaking
the secret tokens/URLs.

Note that post and delete also have an optional query parameter
This is to allow future extension where post and delete may have queries
Currently however HTTPClient does not make use of it

Compared to HTTPClient, BaseHTTPClient does not deal with serialization/deserialization
Everything is already string/Uint8Array
and all the headers (including Accept/Content-Type) are assumed to be provided

In case of non-200 status, all methods must throw an error of type
BaseHTTPClientError

## Table of contents

### Methods

- [delete](BaseHTTPClient.md#delete)
- [get](BaseHTTPClient.md#get)
- [post](BaseHTTPClient.md#post)

## Methods

### delete

▸ **delete**(`relativePath`, `data`, `query?`, `requestHeaders?`): `Promise`\<[`BaseHTTPClientResponse`](BaseHTTPClientResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `relativePath` | `string` |
| `data` | `Uint8Array` |
| `query?` | `Query`\<`string`\> |
| `requestHeaders?` | `Record`\<`string`, `string`\> |

#### Returns

`Promise`\<[`BaseHTTPClientResponse`](BaseHTTPClientResponse.md)\>

#### Defined in

client/baseHTTPClient.ts:52

___

### get

▸ **get**(`relativePath`, `query?`, `requestHeaders?`): `Promise`\<[`BaseHTTPClientResponse`](BaseHTTPClientResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `relativePath` | `string` |
| `query?` | `Query`\<`string`\> |
| `requestHeaders?` | `Record`\<`string`, `string`\> |

#### Returns

`Promise`\<[`BaseHTTPClientResponse`](BaseHTTPClientResponse.md)\>

#### Defined in

client/baseHTTPClient.ts:41

___

### post

▸ **post**(`relativePath`, `data`, `query?`, `requestHeaders?`): `Promise`\<[`BaseHTTPClientResponse`](BaseHTTPClientResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `relativePath` | `string` |
| `data` | `Uint8Array` |
| `query?` | `Query`\<`string`\> |
| `requestHeaders?` | `Record`\<`string`, `string`\> |

#### Returns

`Promise`\<[`BaseHTTPClientResponse`](BaseHTTPClientResponse.md)\>

#### Defined in

client/baseHTTPClient.ts:46
