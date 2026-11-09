---
title: 'Server: Running Locally'
sidebar:
  order: 1
  label: "Running Locally" 
---

The Liquid Auth service is distributed as a Docker image. FIDO2 and WebRTC require a secure connection, we recommend [using ngrok](#ngrok) to create a secure tunnel to your local server.
See the server [integrations](./integrations) guide for examples of how to add Liquid Auth to a web application.

### Prerequisites

[Install Docker]() and [login to the GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authenticating-with-a-personal-access-token-classic).
```bash
export CR_PAT=<YOUR_TOKEN>
echo $CR_PAT | docker login ghcr.io -u <USERNAME> --password-stdin
```

## Docker Image

The service is designed to be run in a Docker container, it requires a [MongoDB]() and [Redis]() instance to be running.
See the [Environment Variables](../environment-variables) section for more information about crafting a `.env.docker` file.

```bash 
docker run -d --env-file .env.docker -p 3000:3000 ghcr.io/algorandfoundation/liquid-auth:develop
```

### Compose Example
> Example of using Docker Compose to run the Liquid Auth service.

```yaml
#docker-compose.yml
services:
  liquid-auth:
    image: ghcr.io/algorandfoundation/liquid-auth:develop
    env_file:
      - .env.docker
    ports:
      - "3000:3000"
    depends_on:
      - redis
      - mongo
  redis:
    image: redis
    ports:
      - "6379:6379"
  mongo:
    image: mongo:7.0
    environment:
      - MONGO_INITDB_DATABASE=${DB_NAME:-fido}
      - MONGO_INITDB_ROOT_USERNAME=${DB_USERNAME:-algorand}
      - MONGO_INITDB_ROOT_PASSWORD=${DB_PASSWORD:-algorand}
    ports:
      - "27017:27017"
    volumes:
      - mongo:/data/db
volumes:
  mongo:
```

### Building

Optionally, create the Docker image locally from the source:

```bash
git clone git@github.com:algorandfoundation/liquid-auth.git && cd liquid-auth
docker build -t my-amazing-liquid-auth:latest .
```

## NGROK

Sign up for a free account at [ngrok](https://ngrok.com/) and follow the instructions to get your `<NGROK_AUTH_TOKEN>` and `<NGROK_STATIC_DOMAIN>`.

#### Configuration
ngrok will ask you to add your auth token to your configuration file.

``` bash
ngrok config add-authtoken <NGROK_AUTH_TOKEN>
```

It will then ask you to deploy your static domain, make sure to change the port to **3000** like this:

``` bash
ngrok http --domain=<NGROK_STATIC_DOMAIN> 3000
```


Ensure the service's `ORIGIN` and `HOSTNAME` [environment variables](../environment-variables) are configured correctly with the ngrok domain.
