/**
 * Example tool to demonstrate implementation patterns
 * Gets account balance and assets for a given address
 *
 * @param {Object} args - Tool arguments
 * @param {string} args.address - Algorand address to check
 * @returns {Promise<Object>} Account balance information including assets
 * @throws {McpError} If address is invalid or operation fails
 */
export declare const getBalanceToolSchema: {
    type: "object";
    properties: any;
    required: string[];
};
export declare const getBalanceTool: (args: {
    address: string;
}) => Promise<Record<string, any>>;
