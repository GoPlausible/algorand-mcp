[@algorandfoundation/algokit-utils](../README.md) / types/network-client

# Module: types/network-client

## Table of contents

### Interfaces

- [AlgoClientConfig](../interfaces/types_network_client.AlgoClientConfig.md)
- [AlgoConfig](../interfaces/types_network_client.AlgoConfig.md)
- [NetworkDetails](../interfaces/types_network_client.NetworkDetails.md)

### Functions

- [genesisIdIsLocalNet](types_network_client.md#genesisidislocalnet)

## Functions

### genesisIdIsLocalNet

▸ **genesisIdIsLocalNet**(`genesisId`): `boolean`

Returns true if the given network genesisId is associated with a LocalNet network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `genesisId` | `string` | The network genesis ID |

#### Returns

`boolean`

Whether the given genesis ID is associated with a LocalNet network

#### Defined in

[src/types/network-client.ts:42](https://github.com/algorandfoundation/algokit-utils-ts/blob/main/src/types/network-client.ts#L42)
