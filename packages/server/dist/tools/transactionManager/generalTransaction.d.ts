export declare const generalTransactionSchemas: {
    assignGroupId: {
        type: string;
        properties: {
            transactions: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
        };
        required: string[];
    };
    signTransaction: {
        type: string;
        properties: {
            transaction: {
                type: string;
                description: string;
            };
            sk: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    signBytes: {
        type: string;
        properties: {
            bytes: {
                type: string;
                description: string;
            };
            sk: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    encodeObj: {
        type: string;
        properties: {
            obj: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    decodeObj: {
        type: string;
        properties: {
            bytes: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare const generalTransactionTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            transactions: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            transaction: {
                type: string;
                description: string;
            };
            sk: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            obj: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            bytes: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
})[];
export declare class GeneralTransactionManager {
    /**
     * Assigns a group ID to a list of transactions
     */
    static handleTool(name: string, args: Record<string, unknown>): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
}
