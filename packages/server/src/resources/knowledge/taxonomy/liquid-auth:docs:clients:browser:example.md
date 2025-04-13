---
title: 'Browser: Example'
next: false
---

You can check the example in the <a href="https://github.com/algorandfoundation/liquid-auth-js/tree/develop/example" target="blank">GitHub repository</a> for a working browser based application


## Answer Client
A dApp that wants a remote wallet to log into the service and create a peer-to-peer connection.
```typescript
import { SignalClient } from "@algorandfoundation/liquid-client";
const client = new SignalClient(window.origin);

const requestId = SignalClient.generateRequestId() // 12345

// Wait for the Offer Client to connect
client.peer(requestId, 'offer').then((dc)=>{
  // Handle Peer Messages
  dc.onmessage = (event: MessageEvent) => {
    console.log(event.data)
  }
  // Send Messages to Peer
  dc.send('Hello World')
})

// Generate a QR Code
const qrData = await client.qrCode()
```

## Offer Client

The remote browser-based wallet. This could be an extension or hybrid mobile application.

```typescript
import * as nacl from 'tweetnacl'
import { SignalClient, toBase64URL } from "@algorandfoundation/liquid-client";

const requestId = 12345 // A known request ID from a Answer Client
const origin = "https://example.com" // Some known origin
const address = "encoded-address" // Some known address
const secretKey = new Uint8Array(32) // Some secret key

// Sign in to the service with a new credential
await client.attestation(async (challenge: Uint8Array) => ({
  type: 'algorand',
  requestId,
  origin,
  address,
  signature: toBase64URL(nacl.sign.detached(challenge, secretKey)),
  device: 'Demo Web Wallet'
}))

// Wait for the Answer Client to connect
client.peer(requestId, 'answer').then((dc)=>{
  // Handle Peer Messages
  dc.onmessage = (event: MessageEvent) => {
    console.log(event.data)
  }
  // Send Messages to Peer
  dc.send('Hello World')
})
```

