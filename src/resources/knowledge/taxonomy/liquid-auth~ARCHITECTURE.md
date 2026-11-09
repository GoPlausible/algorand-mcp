## Overview

### Components
- Nest.js (Microservices/REST API)
- Redis (Events/WebSockets)
- MongoDB (SessionStore/Users)

This service uses [FIDO2 REST API]() endpoints for credential creation and assertions.

## FIDO2 Endpoints

Two main components, Assertion and Attestation. 
The purposed liquid extension is used to sign the FIDO2 responses with a different key pair and allow remote authentication

### Liquid FIDO2 Extension

```typescript
// Authenticator Create Response
interface LiquidClientAttestationExtensionResults {
  liquid: {
    type: string; // Currently only "algorand" supported
    address: string; // Wallet Address
    signature: string; // Base64URL Encoded Signature
    requestId?: string // Optional Request ID , authenticate a remote user simaltaneously
    device?: string // Optional Device Name
  }
}
// Authenticator Get Response
interface LiquidClientAssertionExtensionResults {
  liquid: {
    requestId?: string; // Optional Request ID
  }
}

// Selector Options
interface LiquidExtensionOptions {
  liquid: boolean;
}
```

### POST /attestation/request

Returns the credential creation options supported by the service. It accepts
the standard PublicKeyCreateOptions as the `body`. The response can be passed 
to an available authenticator which will generate the credentials.

The request must enable the `liquid` extension in order to sign the response.

#### BODY

```json
{
  "username": "2SPDE6XLJNXFTOO7OIGNRNKSEDOHJWVD3HBSEAPHONZQ4IQEYOGYTP6LXA",
  "displayName": "Liquid Auth User",
  "authenticatorSelection": {
    "userVerification": "required"
  },
  "extensions": {
    "liquid": true
  }
}
```

#### Example CredentialCreateOptions Response
```json
{
  "challenge": "35JYpoXGnM4s8IICakWSLllcXy3Z_lc3AaLSl872qXM",
  "rp": {
    "name": "Algorand Foundation FIDO2 Server",
    "id": "catfish-pro-wolf.ngrok-free.app"
  },
  "user": {
    "id": "2SPDE6XLJNXFTOO7OIGNRNKSEDOHJWVD3HBSEAPHONZQ4IQEYOGYTP6LXA",
    "name": "2SPDE6XLJNXFTOO7OIGNRNKSEDOHJWVD3HBSEAPHONZQ4IQEYOGYTP6LXA",
    "displayName": "2SPDE6XLJNXFTOO7OIGNRNKSEDOHJWVD3HBSEAPHONZQ4IQEYOGYTP6LXA"
  },
  "pubKeyCredParams": [
    {
      "type": "public-key",
      "alg": -7
    },
    {
      "type": "public-key",
      "alg": -257
    }
  ],
  "timeout": 1800000,
  "attestation": "none",
  "excludeCredentials": [],
  "authenticatorSelection": {
    "userVerification": "required"
  },
  "extensions": {
    "liquid": true
  }
}
```
### POST /attestation/response

Receives the PublicKeyCredential result from the authenticator and validates the credential signature.
`body` uses base64URL encoding for keys.

The authenticator must include the `liquid` extension in the response with the signature and address.
This will associate the credential with the wallet address and the credential can be used for future assertions without the need for signing with the wallet keys

#### BODY
```json
{
  "id": "AYMPi2Rbhcnu2gSHOO1TNvzDJ38iU00rrlCqyH874XCIEoIotRc7eVRFpx0TvsQurg7BAnXy5KnWdKC8LeWs0k0",
  "type": "public-key",
  "rawId": "AYMPi2Rbhcnu2gSHOO1TNvzDJ38iU00rrlCqyH874XCIEoIotRc7eVRFpx0TvsQurg7BAnXy5KnWdKC8LeWs0k0",
  "clientExtensionResults": {
    "liquid": {
      "type": "algorand",
      "requestId": "019097ff-bb8c-7c42-9700-f11b9446fad7",
      "address": "2SPDE6XLJNXFTOO7OIGNRNKSEDOHJWVD3HBSEAPHONZQ4IQEYOGYTP6LXA",
      "signature": "QY31mdH8AwpJ9p4pCXBO2iA5WdU-BjG52xEtJNuSJNHJIaJ10uzqk3FdR0fvYVfb_rzXTuWn4k1PFFeg-vpEDw",
      "device": "Pixel 8 Pro"
    }
  },
  "response": {
    "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiMzVKWXBvWEduTTRzOElJQ2FrV1NMbGxjWHkzWl9sYzNBYUxTbDg3MnFYTSIsIm9yaWdpbiI6ImFuZHJvaWQ6YXBrLWtleS1oYXNoOlI4eE83cmxRV2FXTDRCbEZ5Z3B0V1JiNXFjS1dkZmp6WklhU1JpdDlYVnciLCJhbmRyb2lkUGFja2FnZU5hbWUiOiJmb3VuZGF0aW9uLmFsZ29yYW5kLmRlbW8ifQ",
    "attestationObject": "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YVjFlpPmT7RcYTDeFJdKhDtiKwzb05n-ojlcqqYw5SomXZBFAAAAAAAAAAAAAAAAAAAAAAAAAAAAQQGDD4tkW4XJ7toEhzjtUzb8wyd_IlNNK65Qqsh_O-FwiBKCKLUXO3lURacdE77ELq4OwQJ18uSp1nSgvC3lrNJNpQECAyYgASFYIB2dcp3wanhReRhgRIpJCUfRSwkCvyE9OdvEL_NlncSJIlggkSIz7h7O5nrAXGJrkCOmeolChSc09eHzniCFLFxaKH0"
  },
  "device": "Pixel 8 Pro"
}
```


### POST /assertion/request/:credId

Request a PublicKeyGetCredentialOptions from the service. This differs slightly from the FIDO2 API conformance in order to limit
allowed credentials.

#### BODY (Optional)
```json
{
  "authenticatorSelection": {
    "userVerification": "required"
  },
  "extensions": {
    "liquid": true
  }
}
```

#### Example Response
```json
{
  "challenge": "0TXu4G4iu3sbAQopheoPe_CpnLJOB-QlIUvwFBC317Q",
  "allowCredentials": [
    {
      "id": "AYMPi2Rbhcnu2gSHOO1TNvzDJ38iU00rrlCqyH874XCIEoIotRc7eVRFpx0TvsQurg7BAnXy5KnWdKC8LeWs0k0",
      "type": "public-key"
    }
  ],
  "timeout": 1800000,
  "userVerification": "required",
  "rpId": "catfish-pro-wolf.ngrok-free.app",
  "extensions": {
    "liquid": true
  }
}
```

### POST /assertion/response

Base64URL encoded response from the authenticator. 
Optionally add a `requestId` to also authenticate a remote session

#### BODY
```json
 {
  "id": "AYMPi2Rbhcnu2gSHOO1TNvzDJ38iU00rrlCqyH874XCIEoIotRc7eVRFpx0TvsQurg7BAnXy5KnWdKC8LeWs0k0",
  "type": "public-key",
  "rawId": "AYMPi2Rbhcnu2gSHOO1TNvzDJ38iU00rrlCqyH874XCIEoIotRc7eVRFpx0TvsQurg7BAnXy5KnWdKC8LeWs0k0",
  "clientExtensionResults": {
    "liquid": {
      "requestId": "019097ff-bb8d-75d8-b950-33de977c2d3f"
    }
  },
  "response": {
    "clientDataJSON": "eyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiMFRYdTRHNGl1M3NiQVFvcGhlb1BlX0NwbkxKT0ItUWxJVXZ3RkJDMzE3USIsIm9yaWdpbiI6ImFuZHJvaWQ6YXBrLWtleS1oYXNoOlI4eE83cmxRV2FXTDRCbEZ5Z3B0V1JiNXFjS1dkZmp6WklhU1JpdDlYVnciLCJhbmRyb2lkUGFja2FnZU5hbWUiOiJmb3VuZGF0aW9uLmFsZ29yYW5kLmRlbW8ifQ",
    "authenticatorData": "lpPmT7RcYTDeFJdKhDtiKwzb05n-ojlcqqYw5SomXZAFAAAAAQ",
    "signature": "MEUCIQDcV2y6ub3Qh8pyTCCLdWKRH_cmR2xlFuNy1Fn1QsSUygIgTZh9b6mB77C-aQrBj7Evb8u3S4j3vjlnSPAKcR7Kld4"
  }
}
```

#### Example Response
```json
{
  "id": "M6RT4iT5FkNDM2i57MXzBhLDt9zl2CrLt2p4Ar03t2Q",
  "wallet": "2SPDE6XLJNXFTOO7OIGNRNKSEDOHJWVD3HBSEAPHONZQ4IQEYOGYTP6LXA",
  "credentials": [
    {
      "device": "Pixel 8 Pro",
      "publicKey": "pQECAyYgASFYIB2dcp3wanhReRhgRIpJCUfRSwkCvyE9OdvEL_NlncSJIlggkSIz7h7O5nrAXGJrkCOmeolChSc09eHzniCFLFxaKH0",
      "credId": "AYMPi2Rbhcnu2gSHOO1TNvzDJ38iU00rrlCqyH874XCIEoIotRc7eVRFpx0TvsQurg7BAnXy5KnWdKC8LeWs0k0",
      "prevCounter": 0
    }
  ]
}
```
## Signaling Service

The signaling service is used to establish a WebRTC connection between the wallet and the website.

### Events

#### microservice:auth

Emits to the event bus when a client attests or asserts a credential with a requestId.

#### wss:link

Submit a request to link the current client to a remote wallet. 
The server will acknowledge the request when the `microservice:auth` event is received.

```typescript
const response: LinkMessage = await client.link(requestId)
```

#### wss:offer-description | wss:answer-description

Wait for the server to emit an offer or answer description to the client.

```typescript
const response: string = await client.signal('offer' | 'answer')
```

#### wss:offer-candidate | wss:answer-candidate

Emits the offer or answer ICE Candidates to connected clients.

```typescript
client.peerClient.onicecandidate=(event)=>{
  client.socket.emit('offer-candidate', event.candidate.toJSON())
}

```
