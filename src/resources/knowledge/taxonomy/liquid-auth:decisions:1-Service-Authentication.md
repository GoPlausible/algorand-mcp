# Overview

FIDO2 is a standard for authentication. This repository seeks to explore the concrete implementations for 
WebAuthn(Browser) and FIDO2(Android).

## Decisions

- Reference Implementation: https://codelabs.developers.google.com/codelabs/fido2-for-android#0
- Use `Nest.js` as a backend for team familiarity
- Use https://developer.chrome.com/docs/devtools/webauthn/ for Browser testing
- Use https://simplewebauthn.dev/ for primary server library
- Use https://developers.google.com/android/reference/com/google/android/gms/fido/fido2/package-summary for primary Android Library

## Implementation

Service Authentication is done using `Nest.js` and `Express-Session`. This
is a simple, unsecure way to authenticate users. It is not recommended for
production user. Adds routes for FIDO2 registration and authentication.
