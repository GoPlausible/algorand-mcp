# Contributing to Algorand MCP

This guide will help you understand how to contribute new tools to the Algorand MCP server. We follow strict patterns and conventions to maintain code quality and consistency.

## Project Structure

```
packages/server/src/
├── tools/
│   ├── apiManager/          # Resource-specific tool implementations
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

Create a new directory under `packages/server/src/tools/apiManager/` for your provider:

```bash
mkdir packages/server/src/tools/apiManager/your-provider
```

### 2. Implement Tool Handlers

Create separate files for different features. Each file should:
- Export tool handlers
- Define input schemas
- Implement error handling
- Include documentation

Example structure:

```typescript
// packages/server/src/tools/apiManager/your-provider/feature.ts

import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

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

    // Return result directly - MCP server handles wrapping
    return result;
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
// packages/server/src/tools/apiManager/your-provider/index.ts

import { McpError, ErrorCode, Tool } from '@modelcontextprotocol/sdk/types.js';
import { featureTool, featureToolSchema } from './feature.js';

// Define tool configurations
export const providerTools: Tool[] = [
  {
    name: 'api_provider_feature',
    description: 'Feature description',
    handler: featureTool,
    inputSchema: featureToolSchema
  }
];

// Handle provider tools
export async function handleProviderTools(name: string, args: any): Promise<any> {
  switch (name) {
    case 'api_provider_feature':
      return featureTool(args);
    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
  }
}
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

## Response Processing

### ResponseProcessor Overview
The ResponseProcessor is a utility class that handles response formatting and pagination in a standardized way. It provides:
1. Automatic pagination for large arrays and objects
2. Consistent response wrapping
3. Deep object traversal and processing
4. Page token generation and handling

### Key Features
1. **Automatic Pagination**
   - Handles arrays longer than `env.items_per_page`
   - Generates page tokens for navigation
   - Maintains metadata about pagination state

2. **Deep Object Processing**
   - Recursively processes nested objects
   - Handles arrays at any level of nesting
   - Preserves object structure while paginating

3. **Smart Pagination**
   - Skips pagination for special cases (e.g., application global-state)
   - Handles both arrays and objects with many keys
   - Preserves data integrity during pagination

### Usage Patterns

1. **Direct Usage**
```typescript
import { ResponseProcessor } from '../../utils/responseProcessor.js';

// Process a simple response
const result = ResponseProcessor.processResponse(data);

// Process with pagination
const result = ResponseProcessor.processResponse(data, pageToken);
```

2. **Response Structure**
```typescript
// Input: Any data structure
const data = {
  field1: 'value1',
  arrayField: [1, 2, 3, ...],
  nestedObject: {
    subArray: [...]
  }
};

// Output: Processed and paginated response
{
  content: [{
    type: 'text',
    text: JSON.stringify({
      data: {
        field1: 'value1',
        arrayField: [1, 2, 3], // Paginated if needed
        nestedObject: {
          subArray: [...] // Also paginated if needed
        }
      },
      metadata: { // Only present if pagination occurred
        totalItems: 100,
        itemsPerPage: 10,
        currentPage: 1,
        totalPages: 10,
        hasNextPage: true,
        pageToken: 'base64token',
        arrayField: 'arrayField' // Indicates which field was paginated
      }
    }, null, 2)
  }]
}
```

3. **Pagination Control**
```typescript
// Environment configuration
env.items_per_page = 10; // Default page size

// Automatic pagination triggers when:
// - Arrays have more items than items_per_page
// - Objects have more keys than items_per_page
```

### Best Practices

1. **Return Raw Data**
```typescript
// Good: Let ResponseProcessor handle wrapping
return accountInfo;

// Bad: Manual wrapping
return {
  content: [{
    type: 'text',
    text: JSON.stringify(accountInfo)
  }]
};
```

2. **Handle Page Tokens**
```typescript
export const yourTool = async (args: { pageToken?: string }) => {
  // Get data
  const data = await getData();
  
  // Let ResponseProcessor handle pagination
  return data;
};
```

3. **Preserve Data Structure**
```typescript
// ResponseProcessor maintains structure while paginating
const response = {
  summary: "Account info",
  details: {
    assets: [...], // Will be paginated if needed
    apps: [...] // Will be paginated if needed
  }
};
```

### Error Handling
```typescript
try {
  const data = await getData();
  return data; // ResponseProcessor will handle wrapping
} catch (error) {
  throw new McpError(
    ErrorCode.InternalError,
    `Operation failed: ${error.message}`
  );
}
```

## Response Handling

### Direct Response Pattern
Tools should return their data directly. The MCP server framework handles:
1. Response wrapping
2. Pagination for large datasets
3. Metadata generation

Example of server-handled pagination:
```json
{
  "data": {
    "address": "...",
    "assets": [...]
  },
  "metadata": {
    "totalItems": 355,
    "itemsPerPage": 10,
    "currentPage": 1,
    "totalPages": 36,
    "hasNextPage": true,
    "pageToken": "cGFnZV8y",
    "arrayField": "assets"
  }
}
```

### Pagination Support
- The MCP server automatically handles pagination for large arrays
- Tools can accept pageToken parameter for subsequent pages
- No need to manually implement pagination logic

## Current Example Implementation

The example tool demonstrates these concepts:

```typescript
// packages/server/src/tools/apiManager/example/get-balance.ts

import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import { algodClient } from '../../../algorand-client.js';

export const getBalanceToolSchema: { type: "object", properties: any, required: string[] } = {
  type: "object",
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

    // Return account info directly - MCP server handles pagination
    return accountInfo;
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

Key features demonstrated:
1. Proper import paths with .js extensions
2. TypeScript type definitions
3. Input validation
4. Direct response pattern
5. Error handling
6. Integration with Algorand client
7. Automatic pagination support

## Testing Requirements

1. Create test files mirroring your tool structure:

```typescript
// packages/server/tests/tools/apiManager/your-provider/feature.test.ts

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

Example response:
{
  "data": {
    // Tool-specific data
  },
  "metadata": {
    // Pagination metadata if applicable
  }
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

2. **Response Handling**
   - Return raw data directly
   - Let MCP server handle response wrapping
   - Let MCP server handle pagination

3. **Performance**
   - Implement caching where appropriate
   - Handle rate limits
   - Optimize network requests

4. **Security**
   - Validate all inputs
   - Sanitize sensitive data
   - Handle credentials securely

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

- Review existing implementations in `packages/server/src/tools/apiManager/`
- Check test files for examples
- Consult project maintainers
- Reference API specifications in `packages/server/API specs/`

Remember to follow the established patterns and maintain consistency with the existing codebase.
