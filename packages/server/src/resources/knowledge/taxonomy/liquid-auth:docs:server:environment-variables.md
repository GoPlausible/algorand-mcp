---
title: "Server: Configuration"
sidebar:
  order: 2
  label: 'Configuration'
---

All configurations are set using environment variables.
Creating a `.env.docker` file is recommended to store all the environment variables required to run the server.

The following sections describe the environment variables required to run the server.

## Environment Variables

Attestations and Assertions require a valid `RP_NAME`, `HOSTNAME`, and `ORIGIN` to be set.
`ORIGIN` and `HOSTNAME` must be set to a valid domain secured with HTTPS.

```sh
RP_NAME=<SERVICE_NAME> # Friendly name of the service
HOSTNAME=<DOMAIN_NAME> # Hostname of the service
ORIGIN=https://<DOMAIN_NAME> # Origin of the service
```

If you are using a custom Android client, make sure to update the `SHA256` fingerprint.

```bash
ANDROID_SHA256HASH=<00:00:...> # SHA256 fingerprint of the Android client
ANDROID_PACKAGENAME=<com.example.my-wallet> # Package name of the Android client
```

Configuration for MongoDB

```bash
DB_HOST=<MONGO_DB_HOST:PORT> # Hostname of the MongoDB instance
DB_USERNAME=<MONGO_DB_USERNAME> # Username for the MongoDB instance
DB_PASSWORD=<MONGO_DB_PASSWORD> # Password for the MongoDB instance
DB_NAME=<MONGO_DB_NAME> # Database name
DB_ATLAS=false # Set to true if using MongoDB Atlas
```

Configuration for Redis

```bash
REDIS_HOST=<REDIS_HOST> # Hostname of the Redis instance
REDIS_PORT=<REDIS_PORT> # Port for the Redis instance
REDIS_USERNAME=<REDIS_USERNAME> # Username for the Redis instance
REDIS_PASSWORD= # Password for the Redis instance
```

## Full Example 

```bash
# .env.docker

# Database
DB_HOST=mongo:27017
DB_USERNAME=algorand
DB_PASSWORD=algorand
DB_NAME=fido
DB_ATLAS=false

# Events
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=

# FIDO2
RP_NAME="Auth Server"
HOSTNAME=my-static-domain.ngrok-free.app
ORIGIN=https://my-static-domain.ngrok-free.app

ANDROID_SHA256HASH=47:CC:4E:EE:B9:50:59:A5:8B:E0:19:45:CA:0A:6D:59:16:F9:A9:C2:96:75:F8:F3:64:86:92:46:2B:7D:5D:5C
ANDROID_PACKAGENAME=foundation.algorand.demo
```
