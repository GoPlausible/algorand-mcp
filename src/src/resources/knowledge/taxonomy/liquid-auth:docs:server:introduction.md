---
title: 'Server: Introduction'
prev: false
sidebar:
  order: 0
  label: 'Introduction'
---

Liquid Auth is a self-hosted authentication service that provides a simple way to associate Passkeys to KeyPair(s) commonly found in cryptocurrencies.

#### Technical Details

It is built using the [NestJS](https://nestjs.com/) framework
and uses [mongoose](https://docs.nestjs.com/techniques/mongodb) to interact with MongoDB.
Signaling is handled using [Socket.IO](https://docs.nestjs.com/websockets/gateways)
backed by a [Redis Adapter](https://socket.io/docs/v4/redis-adapter/).

The service request to be running on the same origin as the dApp.
We recommend configuring your frontend service to proxy requests to the authentication service.



