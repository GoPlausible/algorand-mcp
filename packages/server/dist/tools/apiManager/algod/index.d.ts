export declare const algodTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            address: {
                type: string;
                description: string;
            };
            appId?: undefined;
            assetId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            address: {
                type: string;
                description: string;
            };
            appId: {
                type: string;
                description: string;
            };
            assetId?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            appId: {
                type: string;
                description: string;
            };
            boxName?: undefined;
            maxBoxes?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            appId: {
                type: string;
                description: string;
            };
            boxName: {
                type: string;
                description: string;
            };
            maxBoxes?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            appId: {
                type: string;
                description: string;
            };
            maxBoxes: {
                type: string;
                description: string;
            };
            boxName?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            assetId: {
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
            txId: {
                type: string;
                description: string;
            };
            address?: undefined;
            maxTxns?: undefined;
            round?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            address: {
                type: string;
                description: string;
            };
            txId?: undefined;
            maxTxns?: undefined;
            round?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            maxTxns: {
                type: string;
                description: string;
            };
            txId?: undefined;
            address?: undefined;
            round?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            txId?: undefined;
            address?: undefined;
            maxTxns?: undefined;
            round?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            round: {
                type: string;
                description: string;
            };
            txId?: undefined;
            address?: undefined;
            maxTxns?: undefined;
        };
        required: string[];
    };
})[];
export declare function handleAlgodTools(name: string, args: any): Promise<any>;
