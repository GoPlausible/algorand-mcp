# Configuration (Algorand MCP)

## Network

All Algorand MCP Haystack Router tools accept a `network` parameter:

- `"mainnet"` — MainNet (default)
- `"testnet"` — TestNet

```
→ api_haystack_get_swap_quote {
    fromASAID: 0, toASAID: 31566704, amount: 1000000,
    network: "testnet"
  }
```

Default to **testnet** during development; confirm with user before using mainnet.

## Slippage

Set slippage (percentage tolerance on output) when executing swaps:

```
→ api_haystack_execute_swap {
    fromASAID: 0, toASAID: 31566704, amount: 1000000,
    slippage: 1,        // 1% — receive at least 99% of quoted output
    network: "testnet"
  }
```

**Recommendations:**

- **Stable pairs** (ALGO/USDC): 0.5–1%
- **Volatile pairs**: 1–3%
- **Low liquidity**: 3–5%

Slippage is verified on the **final output** of the swap, not on individual hops.

## Rate Limits

The Algorand MCP server uses a free tier API key (60 requests/min). This applies to all Haystack Router tool calls. Override via `HAYSTACK_API_KEY` environment variable.

## Common ASA IDs

| Asset | ASA ID    |
| ----- | --------- |
| ALGO  | 0         |
| USDC  | 31566704  |
| USDt  | 312769    |
| goBTC | 386192725 |
| goETH | 386195940 |

Look up ASA IDs on [Allo.info](https://allo.info) or [Pera Explorer](https://explorer.perawallet.app/).
