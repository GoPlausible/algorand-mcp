# Overview

Deprecate ARC-31/Arbitrary Auth Message in favor of custom FIDO2 extension

## Decisions

- Remove connect module and endpoints
- Use FIDO2 Attestation/Assertions for device linking

## Implementation

```mermaid
sequenceDiagram
    participant Website
    participant Server
    participant Wallet
    Note over Website, Wallet: Link devices
    Website->>Server: Subscribe to 'wss:link'
    Website-->>Website: Display QR Connect Request ID
    Wallet->>Website: Scan QR Code
    Server-->>Wallet: Get Challenge/Options
    Wallet->>Server: POST FIDO2 Credential + Liquid Auth Signature
    Server-->>Server: Validate Signatures
    Server-->>Website: HTTPOnly Session
    Server->>Wallet: Ok Response + HTTPOnly Session
    Server->>Website: Emit to `wss:link` client
    Note over Website, Wallet: Signaling Channels
    Website-->>Server: Subscribe to 'wss:offer-description'
    Website-->>Server: Subscribe to 'wss:offer-candidate'
    Wallet-->>Server: Subscribe to 'wss:answer-description'
    Wallet-->>Server: Subscribe to 'wss:answer-candidate'
    
    Note over Website, Wallet: Peer Offer
    Wallet-->>Wallet: On answer-description, set Remote SDP
    Wallet-->>Wallet: On answer-candidate, add ICE Candidate
    Wallet-->>Wallet: Create Peer Offer & DataChannel
    Wallet-->>Server: Emit `wss:offer-description`
    Wallet-->>Server: Emit `wss:offer-candidate`
    
    Note over Website, Wallet: Peer Answer
    Website-->>Website: On offer-description, set Remote SDP and create Answer
    Website-->>Website: On offer-candidate, add ICE Candidate
    Website-->>Server: Emit `wss:answer-description`
    Website-->>Server: Emit `wss:answer-candidate`
    
    Note over Website, Wallet: Data Channel
    Website-->>Wallet: On DataChannel, Emit Messages
    
```

*Note: It may be possible to handle signaling in a fully decentralized manner in the future. 
