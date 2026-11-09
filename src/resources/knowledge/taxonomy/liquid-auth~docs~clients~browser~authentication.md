---
title: 'Browser: Authentication'
sidebar:
  badge:
    text: "TODO"
    variant: danger
---

Authenticate an existing [Passkey](/guides/concepts/#passkeys) with the [Service](/guides/server/introduction).

### Who is this for?

- **dApps** logging back into the service without connecting to another client
- **Browser Wallets** that want to communicate with other clients

## Client

Sign in with an existing account using an instance of the `SignalClient`
```typescript
//app.ts
await client.assertion(
    credentialId, // Some known credential ID
    {requestId: 12345} // Optional requestId to link
)
```

## Stateless

Using the stateless method without a `SignalClient`

```typescript
//app.ts
import {assertion} from '@algorandfoundation/liquid-auth/assertion'
await assertion(
  "https://my-liquid-service.com",
  credentialId, // Some known credential ID
  {requestId: 12345} // Optional requestId to link
)
```

## Manual

If you want to manually handle the process of creating a passkey, you can use the following methods and preforming
the three steps of the process.

### 🧮 Options

Manually fetching the `Options` from the service.

```typescript
import {fetchAssertionRequestOptions} from '@algorandfoundation/liquid-client/assertion'

const encodedOptions = await fetchAssertionRequestOptions("https://my-liquid-service.com", "<KNOWN_CREDENTIAL_ID>")
```

### 🎉 Retrieving

Decode the options and fetch the Passkey.

```typescript
import {fromBase64Url} from "@algorandfoundation/liquid-client/encoding";
const options = { ...encodedOptions };
// Challenge from the service
options.challenge = fromBase64Url(options.challenge);
// Decode any known credentials
if (options.allowCredentials) {
  for (const cred of options.allowCredentials) {
    cred.id = fromBase64Url(cred.id);
  }
}
const credential = navigator.credentials.get({
  publicKey: options
})
```

### 🔐 Liquid Extension

Optionally, Authenticate a remote user with the Liquid Extension.

```typescript
credential.clientExtensionResults = {
    // Optionally authenticate a remote peer
    requestId: "<UUID_FROM_QR_CODE>"
}
```

### 🚚 Response

Encode and submit the passkey to the service.

```typescript
import {fetchAssertionResponse} from '@algorandfoundation/liquid-client/assertion'
import {toBase64URL} from '@algorandfoundation/liquid-client/encoding'

const result = await fetchAssertionResponse("https://my-liquid-service.com", {
  id: credential.id,
  type: credential.type,
  rawId: toBase64URL(credential.rawId),
  clientExtensionResults: credential.clientExtensionResults,
  response: Object.keys(AuthenticatorAssertionResponse.prototype).reduce((prev, curr) => {
    prev[curr] = toBase64URL(credential.response[curr]);
    return prev;
  }, {
    clientDataJSON: toBase64URL(credential.response.clientDataJSON),
  }),
})
```
