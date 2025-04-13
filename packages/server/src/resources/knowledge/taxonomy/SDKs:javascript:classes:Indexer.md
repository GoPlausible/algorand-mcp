[algosdk](../README.md) / [Exports](../modules.md) / Indexer

# Class: Indexer

The Indexer provides a REST API interface of API calls to support searching the Algorand Blockchain.

The Indexer REST APIs retrieve the blockchain data from a PostgreSQL compatible database that must be populated.

This database is populated using the same indexer instance or a separate instance of the indexer which must connect to the algod process of a running Algorand node to read block data.

This node must also be an Archival node to make searching the entire blockchain possible.

#### Relevant Information
[Learn more about Indexer](https://developer.algorand.org/docs/get-details/indexer/)

[Run Indexer in Postman OAS3](https://developer.algorand.org/docs/rest-apis/restendpoints/#algod-indexer-and-kmd-rest-endpoints)

## Hierarchy

- `default`

  ↳ **`Indexer`**

## Table of contents

### Constructors

- [constructor](Indexer.md#constructor)

### GET Methods

- [lookupAccountAppLocalStates](Indexer.md#lookupaccountapplocalstates)
- [lookupAccountAssets](Indexer.md#lookupaccountassets)
- [lookupAccountByID](Indexer.md#lookupaccountbyid)
- [lookupAccountCreatedApplications](Indexer.md#lookupaccountcreatedapplications)
- [lookupAccountCreatedAssets](Indexer.md#lookupaccountcreatedassets)
- [lookupAccountTransactions](Indexer.md#lookupaccounttransactions)
- [lookupApplicationBoxByIDandName](Indexer.md#lookupapplicationboxbyidandname)
- [lookupApplicationLogs](Indexer.md#lookupapplicationlogs)
- [lookupApplications](Indexer.md#lookupapplications)
- [lookupAssetBalances](Indexer.md#lookupassetbalances)
- [lookupAssetByID](Indexer.md#lookupassetbyid)
- [lookupAssetTransactions](Indexer.md#lookupassettransactions)
- [lookupBlock](Indexer.md#lookupblock)
- [lookupTransactionByID](Indexer.md#lookuptransactionbyid)
- [makeHealthCheck](Indexer.md#makehealthcheck)
- [searchAccounts](Indexer.md#searchaccounts)
- [searchForApplicationBoxes](Indexer.md#searchforapplicationboxes)
- [searchForApplications](Indexer.md#searchforapplications)
- [searchForAssets](Indexer.md#searchforassets)
- [searchForTransactions](Indexer.md#searchfortransactions)

### Other Methods

- [getIntEncoding](Indexer.md#getintencoding)
- [setIntEncoding](Indexer.md#setintencoding)

## Constructors

### constructor

• **new Indexer**(`tokenOrBaseClient`, `baseServer?`, `port?`, `headers?`)

Create an IndexerClient from
* either a token, baseServer, port, and optional headers
* or a base client server for interoperability with external dApp wallets

#### Example
```typescript
const token  = "";
const server = "http://localhost";
const port   = 8980;
const indexerClient = new algosdk.Indexer(token, server, port);
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `tokenOrBaseClient` | `string` \| [`BaseHTTPClient`](../interfaces/BaseHTTPClient.md) \| [`IndexerTokenHeader`](../interfaces/IndexerTokenHeader.md) \| [`CustomTokenHeader`](../interfaces/CustomTokenHeader.md) | `undefined` | The API token for the Indexer API |
| `baseServer` | `string` | `'http://127.0.0.1'` | REST endpoint |
| `port` | `string` \| `number` | `8080` | Port number if specifically configured by the server |
| `headers` | `Record`\<`string`, `string`\> | `{}` | Optional headers |

**`Remarks`**

The above configuration is for a sandbox private network.
For applications on production, you are encouraged to run your own node with indexer, or use an Algorand REST API provider with a dedicated API key.

#### Overrides

ServiceClient.constructor

#### Defined in

client/v2/indexer/indexer.ts:64

## GET Methods

### lookupAccountAppLocalStates

▸ **lookupAccountAppLocalStates**(`account`): `default`

Returns application local state about the given account.

#### Example
```typescript
const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
const accountAppLocalStates = await indexerClient.lookupAccountAppLocalStates(address).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idapps-local-state)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account to look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:242

___

### lookupAccountAssets

▸ **lookupAccountAssets**(`account`): `default`

Returns asset about the given account.

#### Example
```typescript
const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
const accountAssets = await indexerClient.lookupAccountAssets(address).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idassets)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account to look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:208

___

### lookupAccountByID

▸ **lookupAccountByID**(`account`): `default`

Returns information about the given account.

#### Example
```typescript
const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
const accountInfo = await indexerClient.lookupAccountByID(address).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-id)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account to look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:191

___

### lookupAccountCreatedApplications

▸ **lookupAccountCreatedApplications**(`account`): `default`

Returns application information created by the given account.

#### Example
```typescript
const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
const accountCreatedApps = await indexerClient.lookupAccountCreatedApplications(address).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idcreated-applications)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account to look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:259

___

### lookupAccountCreatedAssets

▸ **lookupAccountCreatedAssets**(`account`): `default`

Returns asset information created by the given account.

#### Example
```typescript
const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
const accountCreatedAssets = await indexerClient.lookupAccountCreatedAssets(address).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idcreated-assets)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account to look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:225

___

### lookupAccountTransactions

▸ **lookupAccountTransactions**(`account`): `default`

Returns transactions relating to the given account.

#### Example
```typescript
const address = "XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA";
const accountTxns = await indexerClient.lookupAccountTransactions(address).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accountsaccount-idtransactions)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `account` | `string` | The address of the account. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:140

___

### lookupApplicationBoxByIDandName

▸ **lookupApplicationBoxByIDandName**(`appID`, `boxName`): `default`

Returns information about the application box given its name.

#### Example
```typescript
const boxName = Buffer.from("foo");
const boxResponse = await indexerClient
       .LookupApplicationBoxByIDandName(1234, boxName)
       .do();
const boxValue = boxResponse.value;
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-idbox)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appID` | `number` | The ID of the application with boxes. |
| `boxName` | `Uint8Array` | - |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:424

___

### lookupApplicationLogs

▸ **lookupApplicationLogs**(`appID`): `default`

Returns log messages generated by the passed in application.

#### Example
```typescript
const appId = 60553466;
const appLogs = await indexerClient.lookupApplicationLogs(appId).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-idlogs)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appID` | `number` | The ID of the application which generated the logs. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:314

___

### lookupApplications

▸ **lookupApplications**(`index`): `default`

Returns information about the passed application.

#### Example
```typescript
const appId = 60553466;
const appInfo = await indexerClient.lookupApplications(appId).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-id)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The ID of the application to look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:297

___

### lookupAssetBalances

▸ **lookupAssetBalances**(`index`): `default`

Returns the list of accounts who hold the given asset and their balance.

#### Example
```typescript
const assetId = 163650;
const assetBalances = await indexerClient.lookupAssetBalances(assetId).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assetsasset-idbalances)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The asset ID to look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:106

___

### lookupAssetByID

▸ **lookupAssetByID**(`index`): `default`

Returns information about the passed asset.

#### Example
```typescript
const assetId = 163650;
const assetInfo = await indexerClient.lookupAssetByID(assetId).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assetsasset-id)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The ID of the asset ot look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:280

___

### lookupAssetTransactions

▸ **lookupAssetTransactions**(`index`): `default`

Returns transactions relating to the given asset.

#### Example
```typescript
const assetId = 163650;
const assetTxns = await indexerClient.lookupAssetTransactions(assetId).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assetsasset-idtransactions)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The asset ID to look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:123

___

### lookupBlock

▸ **lookupBlock**(`round`): `default`

Returns the block for the passed round.

#### Example
```typescript
const targetBlock = 18309917;
const blockInfo = await indexerClient.lookupBlock(targetBlock).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2blocksround-number)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `round` | `number` | The number of the round to look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:157

___

### lookupTransactionByID

▸ **lookupTransactionByID**(`txID`): `default`

Returns information about the given transaction.

#### Example
```typescript
const txnId = "MEUOC4RQJB23CQZRFRKYEI6WBO73VTTPST5A7B3S5OKBUY6LFUDA";
const txnInfo = await indexerClient.lookupTransactionByID(txnId).do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2transactionstxid)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txID` | `string` | The ID of the transaction to look up. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:174

___

### makeHealthCheck

▸ **makeHealthCheck**(): `default`

Returns the health object for the service.
Returns 200 if healthy.

#### Example
```typescript
const health = await indexerClient.makeHealthCheck().do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-health)

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:89

___

### searchAccounts

▸ **searchAccounts**(): `default`

Returns information about indexed accounts.

#### Example
```typescript
const accounts = await indexerClient.searchAccounts().do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2accounts)

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:329

___

### searchForApplicationBoxes

▸ **searchForApplicationBoxes**(`appID`): `default`

Returns information about indexed application boxes.

#### Example
```typescript
const maxResults = 20;
const appID = 1234;

const responsePage1 = await indexerClient
       .searchForApplicationBoxes(appID)
       .limit(maxResults)
       .do();
const boxNamesPage1 = responsePage1.boxes.map(box => box.name);

const responsePage2 = await indexerClient
       .searchForApplicationBoxes(appID)
       .limit(maxResults)
       .nextToken(responsePage1.nextToken)
       .do();
const boxNamesPage2 = responsePage2.boxes.map(box => box.name);
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applicationsapplication-idboxes)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appID` | `number` | The ID of the application with boxes. |

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:404

___

### searchForApplications

▸ **searchForApplications**(): `default`

Returns information about indexed applications.

#### Example
```typescript
const apps = await indexerClient.searchForApplications().do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2applications)

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:374

___

### searchForAssets

▸ **searchForAssets**(): `default`

Returns information about indexed assets.

#### Example
```typescript
const assets = await indexerClient.searchForAssets().do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2assets)

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:359

___

### searchForTransactions

▸ **searchForTransactions**(): `default`

Returns information about indexed transactions.

#### Example
```typescript
const txns = await indexerClient.searchForTransactions().do();
```

[Response data schema details](https://developer.algorand.org/docs/rest-apis/indexer/#get-v2transactions)

#### Returns

`default`

#### Defined in

client/v2/indexer/indexer.ts:344

___

## Other Methods

### getIntEncoding

▸ **getIntEncoding**(): [`IntDecoding`](../enums/IntDecoding.md)

Get the default int decoding method for all JSON requests this client creates.

#### Returns

[`IntDecoding`](../enums/IntDecoding.md)

#### Inherited from

ServiceClient.getIntEncoding

#### Defined in

client/v2/serviceClient.ts:86

___

### setIntEncoding

▸ **setIntEncoding**(`method`): `void`

Set the default int decoding method for all JSON requests this client creates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `method` | [`IntDecoding`](../enums/IntDecoding.md) | {"default" \| "safe" \| "mixed" \| "bigint"} method The method to use when parsing the response for request. Must be one of "default", "safe", "mixed", or "bigint". See JSONRequest.setIntDecoding for more details about what each method does. |

#### Returns

`void`

#### Inherited from

ServiceClient.setIntEncoding

#### Defined in

client/v2/serviceClient.ts:79
