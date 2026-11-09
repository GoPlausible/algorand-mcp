---
title: "Android 14: Authenticate"
---

```kotlin
// MainActivity.kt
val request = PendingIntentHandler.retrieveProviderCreateCredentialRequest(intent)
if (request.callingRequest is CreatePublicKeyCredentialRequest) {
    val result = viewModel.processCreatePasskey(this@CreatePasskeyActivity, request)
} else {
   val text = resources.getString(R.string.get_passkey_error)
}
```
