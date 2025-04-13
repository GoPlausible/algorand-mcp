---
title: Architecture
sidebar:
  order: 6
prev: false
next: false
---

This is a high level overview of the sequence of events that happens while using Liquid Auth.
See the [Getting Started](./guides/getting-started) section for more detailed information on each step.
Diagrams are generated using [Mermaid](https://mermaid-js.github.io/mermaid/#/).

## Authentication

A user can link their device to a website by scanning a QR code. 
The website will subscribe to a WebSocket channel to receive the link status. 
The wallet will scan the QR code and send a [FIDO2 PublicKeyCredential]() to the server. 
The server will validate the FIDO2 credential and send a response to the wallet and website.

```mermaid
sequenceDiagram
    participant Website as Answer Client
    participant Server
    participant Wallet as Offer Client
    Website->>Server: Subscribe to 'wss:link'
    Website-->>Website: Display QR Connect Request ID
    Wallet->>Website: Scan QR Code
    Server-->>Wallet: Get Challenge/Options
    Wallet->>Server: POST FIDO2 Credential + Liquid Auth Extension
    Server-->>Server: Validate Signatures
    Server-->>Website: HTTPOnly Session
    Server->>Wallet: Ok Response + HTTPOnly Session
    Server->>Website: Emit to `wss:link` client
```

## Signaling

The website and wallet can subscribe to an isolated WebSocket channel to broker [Session Description]() answers and offers.
[ICE Candidates]() are discovered when any peer has both an offer and answer.

```mermaid
sequenceDiagram
    participant Website as Answer Client
    participant Server
    participant Wallet as Offer Client
    Website-->>Server: Subscribe to 'wss:offer-description'
    Website-->>Server: Subscribe to 'wss:offer-candidate'
    Wallet-->>Server: Subscribe to 'wss:answer-description'
    Wallet-->>Server: Subscribe to 'wss:answer-candidate'
```

### Offer

[Offers]() are created by a peer and sent through the signaling service. 
A client with an offer will listen for an answer description. 
Answers are only emitted in response to an offer.
Offer clients are responsible for creating the [Data Channel]().

```mermaid
sequenceDiagram
    participant Website as Answer Client
    participant Server
    participant Wallet as Offer Client
    Wallet-->>Wallet: On answer-description, set Remote SDP
    Wallet-->>Wallet: On answer-candidate, add ICE Candidate
    Wallet-->>Wallet: Create Peer Offer & DataChannel
    Wallet-->>Server: Emit `wss:offer-description`
    Wallet-->>Server: Emit `wss:offer-candidate`
```

### Answer

An [Answer]() is created by a peer in response to an offer.
The answer description and candidates are emitted to the signaling service.

```mermaid
sequenceDiagram
    participant Website as Answer Client
    participant Server
    participant Wallet as Offer Client
    Website-->>Website: On offer-description, set Remote SDP and create Answer
    Website-->>Website: On offer-candidate, add ICE Candidate
    Website-->>Server: Emit `wss:answer-description`
    Website-->>Server: Emit `wss:answer-candidate`
```

### Data Channel

Once an Offer and Answer have been exchanged, a [Data Channel]() will be emitted to the peer who created the answer.
This channel is used to send messages between the website and wallet in real-time over the established P2P connection.
```mermaid
sequenceDiagram
    participant Website as Answer Client
    participant Server
    participant Wallet as Offer Client
    Wallet-->>Website: Emit DataChannel
    Wallet-->>Wallet: On Message, Handle Message
    Website-->>Website: On DataChannel, listen for Messages
    Website-->>Wallet: Emit Messages
    Wallet-->>Website: Emit Messages
```
