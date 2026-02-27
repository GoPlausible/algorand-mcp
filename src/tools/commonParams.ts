// Common schema fragments added to all tool inputSchemas

export const networkParam = {
  network: {
    type: 'string',
    enum: ['mainnet', 'testnet', 'localnet'],
    description: 'Algorand network to use (default: mainnet)',
  },
};

export const itemsPerPageParam = {
  itemsPerPage: {
    type: 'integer',
    description: 'Number of items per page for paginated responses (default: 10)',
  },
};

/**
 * Merges network and itemsPerPage into a tool's inputSchema.
 * Preserves existing properties and required fields.
 */
export function withCommonParams(schema: any): any {
  return {
    ...schema,
    properties: {
      ...schema.properties,
      ...networkParam,
      ...itemsPerPageParam,
    },
  };
}
