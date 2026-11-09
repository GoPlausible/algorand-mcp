# AlgoKit TestNet Dispenser API Documentation

## Overview

The AlgoKit TestNet Dispenser API provides functionalities to interact with the Dispenser service. This service enables users to fund and refund assets.

## Base URLs

-   **Production Instance (publicly available):**
    `https://api.dispenser.algorandfoundation.tools`

## Authorization

All API endpoints require an `Authorization` header containing a valid JWT token.

> Refer to [algokit dispenser](https://github.com/algorandfoundation/algokit-cli/blob/main/docs/features/dispenser.md#login) command documentation to learn how to obtain a valid JWT token by executing `algokit dispenser login --ci` command.

## Endpoints

### 1. `POST /fund/{assetID}`

Funds a user's wallet with a specified asset.

**URL Parameters:**

| Parameter | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `assetID` | ID of the asset for which the funding limit is sought. Use `0` for ALGO. |

**Request Body:**

| Parameter | Description                         |
| --------- | ----------------------------------- |
| receiver  | Address of the wallet to be funded. |
| amount    | Amount of the asset to be funded.   |

**Response Body:**

```json
{
    "txID": "string",
    "amount": "number"
}
```

| Parameter | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `txID`    | ID of the fund transaction from the dispenser to the requesting address. |
| `amount`  | Amount of the asset to be funded.                                        |

### 2. `GET /fund/{assetID}/limit`

Fetches the funding limit for a specified asset.

**URL Parameters:**

| Parameter | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `assetID` | ID of the asset for which the funding limit is sought. Use `0` for ALGO. |

**Response Body:**

```json
{
    "amount": "number"
}
```

| Parameter | Description                                         |
| --------- | --------------------------------------------------- |
| `amount`  | Current daily amount limit for the requested asset. |

### 3. `POST /refund`

Allows refunding a transaction. A status code `200` indicates a successful refund.

**Request Body:**

```json
{
    "refundTransactionID": "string"
}
```

| Parameter           | Description                   |
| ------------------- | ----------------------------- |
| refundTransactionID | ID of the refund transaction. |

---

## Error Handling

If an error occurs, the API returns a specific status and error code.

**Error Codes Table:**

| Status Code | Error Code               | Description                       |
| ----------- | ------------------------ | --------------------------------- |
| 400         | `dispenser_out_of_funds` | Dispenser is out of funds         |
| 403         | `forbidden`              | Dispenser access is forbidden     |
| 400         | `fund_limit_exceeded`    | Dispenser fund limit exceeded     |
| 400         | `missing_params`         | Missing required input parameters |
| 403         | `authorization_error`    | Authorization error               |
| 400         | `txn_expired`            | Transaction expired               |
| 400         | `txn_invalid`            | Invalid transaction               |
| 400         | `txn_already_processed`  | Transaction already processed     |
| 404         | `txn_not_found`          | Transaction not found             |
| 400         | `invalid_asset`          | Unsupported asset ID              |
| 500         | `unexpected_error`       | Unexpected internal error         |

For more detailed error information, please refer to the error code in the response body.

## Common Error Response

All error responses have the following common format:

```json
{
    "code": "string",
    "message": "string"
}
```

| Error Parameter | Description                                       |
| --------------- | ------------------------------------------------- |
| `code`          | Error code as described in the error codes table. |
| `message`       | Error message.                                    |

### `missing_params` error response

```json
{
    "code": "missing_params",
    "message": "string",
    "parameters": ["string"]
}
```

| Error Parameter | Description                 |
| --------------- | --------------------------- |
| `parameters`    | List of missing parameters. |

### `fund_limit_exceeded` error response

```json
{
    "code": "dispenser_fund_limit_exceeded",
    "message": "string",
    "limit": "number",
    "resetsAt": "string"
}
```

| Error Parameter | Description                                         |
| --------------- | --------------------------------------------------- |
| `limit`         | Current daily amount limit for the requested asset. |
| `resetsAt`      | Timestamp when the daily limit resets.              |
