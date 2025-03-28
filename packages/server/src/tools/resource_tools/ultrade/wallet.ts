import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResponseProcessor } from '../../utils/responseProcessor.js';
import { env } from '../../../env.js';

export const walletTools: Tool[] = [
  // Key Management
  {
    name: 'resource_ultrade_wallet_add_key',
    description: 'Add a trading key',
    inputSchema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'The signed message in hex format'
        },
        signature: {
          type: 'string',
          description: 'The signature of the message'
        },
        walletAddress: {
          type: 'string',
          description: 'Login wallet address'
        },
        walletToken: {
          type: 'string',
          description: 'Login session token'
        }
      },
      required: ['message', 'signature', 'walletAddress', 'walletToken']
    }
  },
  {
    name: 'resource_ultrade_wallet_revoke_key',
    description: 'Revoke a trading key',
    inputSchema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'The signed message in hex format'
        },
        signature: {
          type: 'string',
          description: 'The signature of the message'
        },
        walletAddress: {
          type: 'string',
          description: 'Login wallet address'
        },
        walletToken: {
          type: 'string',
          description: 'Login session token'
        }
      },
      required: ['message', 'signature', 'walletAddress', 'walletToken']
    }
  },
  {
    name: 'resource_ultrade_wallet_withdraw',
    description: 'Withdraw token',
    inputSchema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'The signed message in hex format'
        },
        signature: {
          type: 'string',
          description: 'The signature of the message'
        },
        walletAddress: {
          type: 'string',
          description: 'Login wallet address'
        },
        walletToken: {
          type: 'string',
          description: 'Login session token'
        }
      },
      required: ['message', 'signature', 'walletAddress', 'walletToken']
    }
  },
  // Signin
  {
    name: 'resource_ultrade_wallet_signin_message',
    description: 'Generate message from the sign in data',
    inputSchema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            address: { type: 'string', description: 'Login wallet address' },
            technology: {
              type: 'string',
              description: 'Technology type',
              enum: ['ALGORAND', 'EVM', 'SOLANA']
            }
          },
          required: ['address', 'technology']
        },
        customMessage: {
          type: 'string',
          description: 'Custom signing message'
        }
      },
      required: ['data']
    }
  },
  {
    name: 'resource_ultrade_wallet_signin',
    description: 'Sign in to trading account',
    inputSchema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'The signed message in hex format'
        },
        signature: {
          type: 'string',
          description: 'The signature of the message'
        },
        data: {
          type: 'object',
          properties: {
            address: { type: 'string' },
            technology: {
              type: 'string',
              enum: ['ALGORAND', 'EVM', 'SOLANA']
            }
          },
          required: ['address', 'technology']
        },
        referralToken: {
          type: 'string',
          description: 'Affiliate referral token'
        }
      },
      required: ['message', 'signature', 'data']
    }
  },

  // Trading Keys
  {
    name: 'resource_ultrade_wallet_keys',
    description: 'Get trading keys',
    inputSchema: {
      type: 'object',
      properties: {
        walletAddress: {
          type: 'string',
          description: 'Login wallet address'
        },
        walletToken: {
          type: 'string',
          description: 'Login session token'
        }
      },
      required: ['walletAddress', 'walletToken']
    }
  },
  {
    name: 'resource_ultrade_wallet_key_message',
    description: 'Generate message from the trading key data',
    inputSchema: {
      type: 'object',
      properties: {
        tkAddress: {
          type: 'string',
          description: 'Trading key algorand address'
        },
        loginAddress: {
          type: 'string',
          description: 'Login wallet address'
        },
        loginChainId: {
          type: 'number',
          description: 'Wormhole chain id',
          enum: [1, 8, 5, 4, 6, 23, 24, 30, 2, 10002, 10003, 10004, 10005, 10007]
        },
        expiredDate: {
          type: 'number',
          description: 'UTC timestamp in seconds; If not set then no expiration'
        },
        addKey: {
          type: 'boolean',
          description: 'Add a trading key if true, otherwise revoke'
        },
        type: {
          type: 'string',
          description: 'Type of trading key',
          enum: ['User', 'API']
        }
      },
      required: ['tkAddress', 'loginAddress', 'loginChainId', 'addKey', 'type']
    }
  },

  // Trades and Transactions
  {
    name: 'resource_ultrade_wallet_trades',
    description: 'Get filtered wallet trades',
    inputSchema: {
      type: 'object',
      properties: {
        walletAddress: {
          type: 'string',
          description: 'Login wallet address'
        },
        walletToken: {
          type: 'string',
          description: 'Login session token'
        },
        tradingKey: {
          type: 'string',
          description: 'Trading key address'
        }
      },
      required: ['walletAddress']
    }
  },
  {
    name: 'resource_ultrade_wallet_transactions',
    description: 'Get filtered wallet transactions',
    inputSchema: {
      type: 'object',
      properties: {
        walletAddress: {
          type: 'string',
          description: 'Login wallet address'
        },
        walletToken: {
          type: 'string',
          description: 'Login session token'
        },
        tradingKey: {
          type: 'string',
          description: 'Trading key address'
        }
      },
      required: ['walletAddress']
    }
  },

  // Withdrawals
  {
    name: 'resource_ultrade_wallet_withdraw_message',
    description: 'Generate message from the withdrawal data',
    inputSchema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            loginAddress: { type: 'string' },
            loginChainId: { type: 'number' },
            tokenAmount: { type: 'string' },
            tokenIndex: { type: 'string' },
            tokenChainId: { type: 'number' },
            recipient: { type: 'string' },
            recipientChainId: { type: 'number' },
            isNative: { type: 'boolean' },
            fee: { type: 'number' }
          },
          required: ['loginAddress', 'loginChainId', 'tokenAmount', 'tokenIndex',
            'tokenChainId', 'recipient', 'recipientChainId', 'isNative', 'fee']
        },
        customMessage: {
          type: 'string',
          description: 'The custom message visible to the user'
        }
      },
      required: ['data']
    }
  }
];

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, any>;
  body?: any;
}

async function makeRequest(endpoint: string, options: RequestOptions = {}): Promise<any> {
  const { method = 'GET', headers = {}, queryParams = {}, body } = options;

  try {
    let url = `${env.ultrade_api_url}${endpoint}`;

    // Add query parameters for GET requests
    if (method === 'GET' && Object.keys(queryParams).length > 0) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(queryParams)) {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
    }

    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new McpError(
        ErrorCode.InternalError,
        `Ultrade API error: ${response.status} ${response.statusText}`
      );
    }
    let result: any;
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      result = await response.text();
    }

    return result;
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to make request: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

async function getSigninMessage(data: { address: string; technology: string }, customMessage?: string): Promise<any> {

  // const jsonStr = JSON.stringify(data) + "\n";

  // const jsonBytes = new TextEncoder().encode(jsonStr);

  // const mxBytes = new TextEncoder().encode("MX");

  // const fullBytes = new Uint8Array(mxBytes.length + jsonBytes.length);
  // fullBytes.set(mxBytes);
  // fullBytes.set(jsonBytes, mxBytes.length);


  // const modifiedMessage = Buffer.from(fullBytes).toString('hex');
  return makeRequest('/wallet/signin/message', {
    method: 'POST',
    body: { data, customMessage }
  });
}

async function signin(message: string, signature: string, data: { address: string; technology: string }, referralToken?: string): Promise<any> {
  // const messageBytes = Buffer.from(message, 'hex');
  // const mxBytes = new TextEncoder().encode("MX");
  // const fullBytes = new Uint8Array(mxBytes.length + messageBytes.length);
  // fullBytes.set(mxBytes);
  // fullBytes.set(messageBytes, mxBytes.length);
  
  // // Convert back to hex
  // const modifiedMessage = Buffer.from(fullBytes).toString('hex');
  // console.log("mxBytes", mxBytes);
  // console.log("messageBytes", messageBytes);
  // console.log("fullBytes", fullBytes);
  // console.log("modifiedMessage", modifiedMessage);
  // console.log("signature", signature);
  // console.log("data", data);

  return makeRequest('/wallet/signin', {
    method: 'PUT',
    headers: {
      'companyId': '1'
    },
    body: { message, signature, data, referralToken }
  });
}

async function getWalletKeys(auth: { walletAddress: string; walletToken: string }): Promise<any> {
  return makeRequest('/wallet/keys', {
    headers: {
      'x-wallet-address': auth.walletAddress,
      'x-wallet-token': auth.walletToken
    }
  });
}

async function getKeyMessage(params: {
  tkAddress: string;
  loginAddress: string;
  loginChainId: number;
  expiredDate?: number;
  addKey: boolean;
  type: 'User' | 'API';
}): Promise<any> {
  return makeRequest('/wallet/key/message', {
    method: 'POST',
    body: params
  });
}

async function getWalletTrades(auth: { walletAddress: string; walletToken?: string; tradingKey?: string }): Promise<any> {
  const headers: Record<string, string> = {
    'x-wallet-address': auth.walletAddress
  };
  if (auth.walletToken) headers['x-wallet-token'] = auth.walletToken;
  if (auth.tradingKey) headers['x-trading-key'] = auth.tradingKey;

  return makeRequest('/wallet/trades', { headers });
}

async function getWalletTransactions(auth: { walletAddress: string; walletToken?: string; tradingKey?: string }): Promise<any> {
  const headers: Record<string, string> = {
    'x-wallet-address': auth.walletAddress
  };
  if (auth.walletToken) headers['x-wallet-token'] = auth.walletToken;
  if (auth.tradingKey) headers['x-trading-key'] = auth.tradingKey;

  return makeRequest('/wallet/transactions', { headers });
}

async function getWithdrawMessage(data: {
  loginAddress: string;
  loginChainId: number;
  tokenAmount: string;
  tokenIndex: string;
  tokenChainId: number;
  recipient: string;
  recipientChainId: number;
  isNative: boolean;
  fee: number;
}, customMessage?: string): Promise<any> {
  return makeRequest('/wallet/withdraw/message', {
    method: 'POST',
    body: { data, customMessage }
  });
}

async function addTradingKey(params: {
  message: string;
  signature: string;
  walletAddress: string;
  walletToken: string;
}): Promise<any> {
  return makeRequest('/wallet/key', {
    method: 'POST',
    headers: {
      'x-wallet-address': params.walletAddress,
      'x-wallet-token': params.walletToken
    },
    body: {
      message: params.message,
      signature: params.signature
    }
  });
}

async function revokeTradingKey(params: {
  message: string;
  signature: string;
  walletAddress: string;
  walletToken: string;
}): Promise<any> {
  return makeRequest('/wallet/key', {
    method: 'DELETE',
    headers: {
      'x-wallet-address': params.walletAddress,
      'x-wallet-token': params.walletToken
    },
    body: {
      message: params.message,
      signature: params.signature
    }
  });
}

async function withdrawToken(params: {
  message: string;
  signature: string;
  walletAddress: string;
  walletToken: string;
}): Promise<any> {
  return makeRequest('/wallet/withdraw', {
    method: 'POST',
    headers: {
      'x-wallet-address': params.walletAddress,
      'x-wallet-token': params.walletToken
    },
    body: {
      message: params.message,
      signature: params.signature
    }
  });
}

export async function handleWalletTools(args: any): Promise<any> {
  switch (args.name) {
    case 'resource_ultrade_wallet_signin_message':
      return await getSigninMessage(args.data, args.customMessage);

    case 'resource_ultrade_wallet_signin':
      return await signin(args.message, args.signature, args.data, args.referralToken);

    case 'resource_ultrade_wallet_keys':
      return await getWalletKeys({
        walletAddress: args.walletAddress,
        walletToken: args.walletToken
      });

    case 'resource_ultrade_wallet_key_message':
      return await getKeyMessage({
        tkAddress: args.tkAddress,
        loginAddress: args.loginAddress,
        loginChainId: args.loginChainId,
        expiredDate: args.expiredDate,
        addKey: args.addKey,
        type: args.type
      });

    case 'resource_ultrade_wallet_trades':
      return await getWalletTrades({
        walletAddress: args.walletAddress,
        walletToken: args.walletToken,
        tradingKey: args.tradingKey
      });

    case 'resource_ultrade_wallet_transactions':
      return await getWalletTransactions({
        walletAddress: args.walletAddress,
        walletToken: args.walletToken,
        tradingKey: args.tradingKey
      });

    case 'resource_ultrade_wallet_withdraw_message':
      return await getWithdrawMessage(args.data, args.customMessage);

    case 'resource_ultrade_wallet_add_key':
      return await addTradingKey({
        message: args.message,
        signature: args.signature,
        walletAddress: args.walletAddress,
        walletToken: args.walletToken
      });

    case 'resource_ultrade_wallet_revoke_key':
      return await revokeTradingKey({
        message: args.message,
        signature: args.signature,
        walletAddress: args.walletAddress,
        walletToken: args.walletToken
      });

    case 'resource_ultrade_wallet_withdraw':
      return await withdrawToken({
        message: args.message,
        signature: args.signature,
        walletAddress: args.walletAddress,
        walletToken: args.walletToken
      });

    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${args.name}`
      );
  }
}
