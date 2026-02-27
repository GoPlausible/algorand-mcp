# Overview

Communicating across platforms in a decentralized manner

## Decisions

- Limit dependency on WebSockets to signaling
- Allow bidirectional communication between peers
- Enforce locality of device?

## Implementation

A WebSocket Service should establish the SDP handshake and emit ICE candidates for WebRTC clients.

This implementation should replace Wallet Connect with the following sequence
```mermaid
sequenceDiagram
    participant Website
    participant Server
    participant Wallet
    Note over Website, Wallet: Link devices
    Website->>Server: GET Challenge Message
    Server->>Website: Send Challenge Message
    
    Website-->>Website: Display QR Connect Nonce
    Website->>Server: Subscribe to 'wss:link'
    Wallet->>Website: Scan QR Code
    Wallet->>Server: POST Nonce + Signature + Answer
    Server-->>Server: Validate Signature
    Server-->>Website: HTTPOnly Session
    Server->>Wallet: Ok Response + HTTPOnly Session
    Server->>Website: Emit to `wss:link` client
    Note over Website, Wallet: Passkeys/FIDO2
    Website-->>Website: Continue FIDO2 Flow
    Wallet-->>Wallet: Continue FIDO2 Flow
    Note over Website, Wallet: Signaling Peer Offer/Answer
    Website-->>Server: Subscribe to 'wss:answer-${address}'
    Wallet-->>Server: Subscribe to 'wss:offer-${address}'

    Website-->>Website: Create Peer Offer & DataChannel
    Website-->>Server: POST Offer
    Server-->>Wallet: Emit Offer
    
    Wallet-->>Wallet: Create Peer Answer with Offer & DataChannel
   
    Wallet-->>Server: POST Answer
    Server-->>Website: Emit Answer
    Website-->>Website: Set Remote SDP
    Website-->>Website: Discover ICE Candidates
    Website->>Server: Emit candidates to `wss:offer-${address}`
    Server->>Wallet: Emit candidates to `wss:offer-${address}`
    Wallet-->>Wallet: Set Candidates
    Wallet-->>Wallet: Discover ICE Candidates
    Wallet->>Server: Emit candidates to `wss:answer-${address}`
    Server->>Website: Emit to `wss:answer`
    Website->>Website: Set Candidates
    
```

*Note: This process may be deprecated in the future in favor of `libp2p` which allows for an agnostic discovery layer and also supports the WebRTC transport
