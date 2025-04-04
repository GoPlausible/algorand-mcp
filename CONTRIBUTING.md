# Contributing to Algorand MCP

This guide will help you understand how to contribute new tools to the Algorand MCP server. We follow strict patterns and conventions to maintain code quality and consistency.

## Project Structure

```
packages/server/src/
├── tools/
│   ├── resource_tools/          # Resource-specific tool implementations
│   │   ├── [provider]/         # Provider-specific directory (e.g., tinyman, ultrade)
│   │   │   ├── index.ts        # Exports all tools
│   │   │   └── [feature].ts    # Feature-specific implementations
│   └── utils/                  # Shared utilities
│     └── responseProcessor.ts  # Response formatting utility
├── algorand-client/            # Algorand client integration
│   └── index.ts                # Client initialization and configuration
└── API specs/                  # API specifications and documentation 
```

## Adding New Tools

### 1. Create Provider Directory

Create a new directory under `packages/server/src/tools/resource_tools/` for your provider:

```bash
mkdir packages/server/src/tools/resource_tools/your-provider
```

### 2. Implement Tool Handlers

Create separate files for different features. Each file should:
- Export tool handlers
- Define input schemas
- Implement error handling
- Include documentation

Example structure:

```typescript
// packages/server/src/tools/resource_tools/your-provider/feature.ts

import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types';

// Define input schema
export const featureToolSchema = {
  type: 'object',
  properties: {
    param1: {
      type: 'string',
      description: 'Description of parameter'
    },
    // ... other parameters
  },
  required: ['param1']
};

// Implement tool handler
export const featureTool = async (args: any) => {
  try {
    // Input validation
    if (!args.param1) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Missing required parameter: param1'
      );
    }

    // Implementation
    const result = await yourImplementation(args);

    // Return formatted response
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }]
    };
  } catch (error) {
    // Error handling
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Feature operation failed: ${error.message}`
    );
  }
};
```

### 3. Create Index File

Create an `index.ts` file to export all tools:

```typescript
// packages/server/src/tools/resource_tools/your-provider/index.ts

export * from './feature';
// Export other tool modules
```

### 4. Register Tools

Add your tools to the main tools registry:

```typescript
// packages/server/src/tools/index.ts

import { featureTool, featureToolSchema } from './resource_tools/your-provider';

// Add to tools configuration
const toolsConfig = {
  // ... existing tools
  'your_provider_feature': {
    handler: featureTool,
    inputSchema: featureToolSchema
  }
};
```

## Code Style Guidelines

1. **TypeScript**
   - Use strict type checking
   - Define interfaces for all data structures
   - Use type guards for runtime checks

2. **Async/Await**
   - Use async/await for asynchronous operations
   - Properly handle promises and errors

3. **Error Handling**
   - Use McpError for standardized error reporting
   - Include descriptive error messages
   - Add appropriate error context

4. **Naming Conventions**
   - PascalCase for classes and types
   - camelCase for functions and variables
   - snake_case for tool names

## Testing Requirements

1. Create test files mirroring your tool structure:

```typescript
// packages/server/tests/tools/resource_tools/your-provider/feature.test.ts

describe('Your Provider Feature Tool', () => {
  it('should handle valid input correctly', async () => {
    // Test implementation
  });

  it('should handle invalid input appropriately', async () => {
    // Test error cases
  });

  // Add more test cases
});
```

2. Test coverage requirements:
   - Input validation
   - Success cases
   - Error handling
   - Edge cases
   - Integration with other components

## Documentation Standards

1. **JSDoc Comments**
```typescript
/**
 * Description of what the tool does
 * @param {Object} args - Tool arguments
 * @param {string} args.param1 - Description of parameter
 * @returns {Promise<Object>} Description of return value
 * @throws {McpError} Description of possible errors
 */
```

2. **Usage Examples**
```typescript
// Include example usage in comments
/*
Example usage:
{
  "param1": "example-value",
  "param2": 123
}
*/
```

3. **Error Documentation**
- Document all possible error cases
- Include error codes and messages
- Provide troubleshooting guidance

## Best Practices

1. **Input Validation**
   - Validate all input parameters
   - Use type guards for runtime checks
   - Provide clear error messages

2. **Response Formatting**
   - Use ResponseProcessor for consistent output
   - Include all relevant data
   - Format responses for readability

3. **Performance**
   - Implement caching where appropriate
   - Handle rate limits
   - Optimize network requests

4. **Security**
   - Validate all inputs
   - Sanitize sensitive data
   - Handle credentials securely

## Example Implementation

Here's a complete example of adding a new tool:

```typescript
// packages/server/src/tools/resource_tools/example-provider/get-data.ts

import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types';
import { ResponseProcessor } from '../../utils/responseProcessor';

export const getDataToolSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'Unique identifier for the data'
    },
    format: {
      type: 'string',
      enum: ['json', 'text'],
      description: 'Response format'
    }
  },
  required: ['id']
};

export const getDataTool = async (args: {
  id: string;
  format?: 'json' | 'text';
}) => {
  try {
    // Validate input
    if (!args.id) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Missing required parameter: id'
      );
    }

    // Implementation
    const data = await fetchData(args.id);

    // Format response
    return ResponseProcessor.format(data, args.format);
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get data: ${error.message}`
    );
  }
};
```

## Review Process

1. **Code Review Checklist**
   - Follows project structure
   - Implements proper error handling
   - Includes comprehensive tests
   - Provides clear documentation
   - Follows naming conventions
   - Handles edge cases

2. **Testing Requirements**
   - All tests pass
   - Adequate test coverage
   - Integration tests included
   - Performance tests if applicable

3. **Documentation Requirements**
   - JSDoc comments complete
   - Usage examples provided
   - Error cases documented
   - README updates if needed

## Getting Help

- Review existing implementations in `packages/server/src/tools/resource_tools/`
- Check test files for examples
- Consult project maintainers
- Reference API specifications in `packages/server/API specs/`

Remember to follow the established patterns and maintain consistency with the existing codebase. The following example implementation demonstrates all the key concepts:

## Complete Example Implementation

### 1. Tool Implementation (get-balance.ts)
```typescript
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types';
import { ResponseProcessor } from '../../utils/responseProcessor';
import { algodClient } from '../../../algorand-client';

/**
 * Example tool to demonstrate implementation patterns
 * Gets account balance and assets for a given address
 * 
 * @param {Object} args - Tool arguments
 * @param {string} args.address - Algorand address to check
 * @returns {Promise<Object>} Account balance information including assets
 * @throws {McpError} If address is invalid or operation fails
 */
export const getBalanceToolSchema = {
  type: 'object',
  properties: {
    address: {
      type: 'string',
      description: 'Algorand address in standard format (58 characters)'
    }
  },
  required: ['address']
};

export const getBalanceTool = async (args: { address: string }) => {
  try {
    // Input validation
    if (!args.address) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Missing required parameter: address'
      );
    }

    if (!/^[A-Z2-7]{58}$/.test(args.address)) {
      throw new McpError(
        ErrorCode.InvalidParams,
        'Invalid Algorand address format'
      );
    }

    // Get account information using Algorand client
    const accountInfo = await algodClient.accountInformation(args.address).do();

    // Format response data
    const response = {
      address: args.address,
      amount: accountInfo.amount,
      assets: accountInfo.assets || [],
      status: 'success'
    };

    // Use ResponseProcessor to format the output
    return ResponseProcessor.processResponse(response);
  } catch (error: unknown) {
    // Handle specific Algorand API errors
    if (error instanceof McpError) {
      throw error;
    }

    // Format error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to get account balance: ${errorMessage}`
    );
  }
};
```

### 2. Tool Registration (index.ts)
```typescript
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types';
import { getBalanceTool, getBalanceToolSchema } from './get-balance';

// Define tool configurations
export const exampleTools = [
  {
    name: 'resource_example_get_balance',
    description: 'Get account balance and assets',
    handler: getBalanceTool,
    inputSchema: getBalanceToolSchema
  }
];

// Handle example tools
export async function handleExampleTools(name: string, args: any): Promise<any> {
  switch (name) {
    case 'resource_example_get_balance':
      return getBalanceTool(args);
    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown example tool: ${name}`
      );
  }
}
```

### 3. Unit Tests (get-balance.test.ts)
```typescript
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types';
import { getBalanceTool } from '../../../../src/tools/resource_tools/example/get-balance';
import { algodClient } from '../../../../src/algorand-client';

jest.mock('../../../../src/algorand-client', () => ({
  algodClient: {
    accountInformation: jest.fn()
  }
}));

describe('Example Get Balance Tool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle valid address', async () => {
    const validAddress = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    const mockAccountInfo = {
      amount: 1000000,
      assets: []
    };

    // Mock the Algorand client response
    (algodClient.accountInformation as jest.Mock).mockReturnValue({
      do: jest.fn().mockResolvedValue(mockAccountInfo)
    });

    const result = await getBalanceTool({ address: validAddress });
    
    expect(result).toBeDefined();
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('text');
    
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed.data).toBeDefined();
    expect(parsed.data.address).toBe(validAddress);
    expect(parsed.data.amount).toBe(mockAccountInfo.amount);
    expect(Array.isArray(parsed.data.assets)).toBe(true);
    expect(parsed.data.status).toBe('success');
  });

  it('should reject invalid address format', async () => {
    await expect(getBalanceTool({ 
      address: 'invalid-address'
    })).rejects.toThrow(new McpError(
      ErrorCode.InvalidParams,
      'Invalid Algorand address format'
    ));
  });

  it('should reject missing address', async () => {
    await expect(getBalanceTool({
      address: ''
    })).rejects.toThrow(new McpError(
      ErrorCode.InvalidParams,
      'Missing required parameter: address'
    ));
  });

  it('should handle Algorand API errors', async () => {
    const validAddress = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    const mockError = new Error('API Error');

    // Mock the Algorand client to throw an error
    (algodClient.accountInformation as jest.Mock).mockReturnValue({
      do: jest.fn().mockRejectedValue(mockError)
    });

    await expect(getBalanceTool({
      address: validAddress
    })).rejects.toThrow(new McpError(
      ErrorCode.InternalError,
      `Failed to get account balance: ${mockError.message}`
    ));
  });
});
```

This example demonstrates:
1. Proper tool structure and organization
2. Input validation and error handling
3. Algorand client integration
4. Response formatting using ResponseProcessor
5. Comprehensive unit testing with mocks
6. Clear documentation and type definitions
7. Integration with the resource tools system

You can use this example as a template when implementing your own tools, adapting the patterns to your specific use case while maintaining consistency with the project's standards.
