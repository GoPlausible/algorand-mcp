export declare const indexerTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            address: {
                type: string;
                description: string;
            };
            limit?: undefined;
            assetId?: undefined;
            nextToken?: undefined;
            applicationId?: undefined;
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
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
            limit: {
                type: string;
                description: string;
            };
            assetId: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            applicationId?: undefined;
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            limit: {
                type: string;
                description: string;
            };
            assetId: {
                type: string;
                description: string;
            };
            applicationId: {
                type: string;
                description: string;
            };
            currencyGreaterThan: {
                type: string;
                description: string;
            };
            currencyLessThan: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            address?: undefined;
        };
        required?: undefined;
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
            limit?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            txid?: undefined;
            sender?: undefined;
            nextToken?: undefined;
            creator?: undefined;
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
            limit: {
                type: string;
                description: string;
            };
            minRound: {
                type: string;
                description: string;
            };
            maxRound: {
                type: string;
                description: string;
            };
            txid: {
                type: string;
                description: string;
            };
            sender: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            creator?: undefined;
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
            limit: {
                type: string;
                description: string;
            };
            creator: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            appId?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            txid?: undefined;
            sender?: undefined;
            boxName?: undefined;
            maxBoxes?: undefined;
        };
        required?: undefined;
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
            limit?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            txid?: undefined;
            sender?: undefined;
            nextToken?: undefined;
            creator?: undefined;
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
            limit?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            txid?: undefined;
            sender?: undefined;
            nextToken?: undefined;
            creator?: undefined;
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
            limit?: undefined;
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
            nextToken?: undefined;
            address?: undefined;
            beforeTime?: undefined;
            afterTime?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            addressRole?: undefined;
            excludeCloseTo?: undefined;
            txid?: undefined;
            creator?: undefined;
            name?: undefined;
            unit?: undefined;
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
            limit: {
                type: string;
                description: string;
            };
            currencyGreaterThan: {
                type: string;
                description: string;
            };
            currencyLessThan: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            address: {
                type: string;
                description: string;
            };
            beforeTime?: undefined;
            afterTime?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            addressRole?: undefined;
            excludeCloseTo?: undefined;
            txid?: undefined;
            creator?: undefined;
            name?: undefined;
            unit?: undefined;
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
            limit: {
                type: string;
                description: string;
            };
            beforeTime: {
                type: string;
                description: string;
            };
            afterTime: {
                type: string;
                description: string;
            };
            minRound: {
                type: string;
                description: string;
            };
            maxRound: {
                type: string;
                description: string;
            };
            address: {
                type: string;
                description: string;
            };
            addressRole: {
                type: string;
                description: string;
            };
            excludeCloseTo: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            txid: {
                type: string;
                description: string;
            };
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
            creator?: undefined;
            name?: undefined;
            unit?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            limit: {
                type: string;
                description: string;
            };
            creator: {
                type: string;
                description: string;
            };
            name: {
                type: string;
                description: string;
            };
            unit: {
                type: string;
                description: string;
            };
            assetId: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
            address?: undefined;
            beforeTime?: undefined;
            afterTime?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            addressRole?: undefined;
            excludeCloseTo?: undefined;
            txid?: undefined;
        };
        required?: undefined;
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
            limit?: undefined;
            beforeTime?: undefined;
            afterTime?: undefined;
            minRound?: undefined;
            maxRound?: undefined;
            txType?: undefined;
            assetId?: undefined;
            addressRole?: undefined;
            applicationId?: undefined;
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
            round?: undefined;
            nextToken?: undefined;
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
            limit: {
                type: string;
                description: string;
            };
            beforeTime: {
                type: string;
                description: string;
            };
            afterTime: {
                type: string;
                description: string;
            };
            minRound: {
                type: string;
                description: string;
            };
            maxRound: {
                type: string;
                description: string;
            };
            txType: {
                type: string;
                description: string;
            };
            assetId: {
                type: string;
                description: string;
            };
            txId?: undefined;
            addressRole?: undefined;
            applicationId?: undefined;
            currencyGreaterThan?: undefined;
            currencyLessThan?: undefined;
            round?: undefined;
            nextToken?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            limit: {
                type: string;
                description: string;
            };
            beforeTime: {
                type: string;
                description: string;
            };
            afterTime: {
                type: string;
                description: string;
            };
            minRound: {
                type: string;
                description: string;
            };
            maxRound: {
                type: string;
                description: string;
            };
            address: {
                type: string;
                description: string;
            };
            addressRole: {
                type: string;
                description: string;
            };
            txType: {
                type: string;
                description: string;
            };
            assetId: {
                type: string;
                description: string;
            };
            applicationId: {
                type: string;
                description: string;
            };
            currencyGreaterThan: {
                type: string;
                description: string;
            };
            currencyLessThan: {
                type: string;
                description: string;
            };
            round: {
                type: string;
                description: string;
            };
            nextToken: {
                type: string;
                description: string;
            };
            txId?: undefined;
        };
        required?: undefined;
    };
})[];
export declare function handleIndexerTools(name: string, args: any): Promise<any>;
