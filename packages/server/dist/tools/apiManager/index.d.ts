export declare const apiManager: ({
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
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            nameOrID: {
                type: string;
                description: string;
            };
            view: {
                type: string;
                enum: string[];
                description: string;
            };
            poll: {
                type: string;
                description: string;
            };
            nocache: {
                type: string;
                description: string;
            };
            address?: undefined;
            limit?: undefined;
            name?: undefined;
            type?: undefined;
            afterTime?: undefined;
            sort?: undefined;
            buyer?: undefined;
            seller?: undefined;
            event?: undefined;
            requireBuyer?: undefined;
            includeOwner?: undefined;
            excludeNFDAsSeller?: undefined;
            category?: undefined;
            minPrice?: undefined;
            maxPrice?: undefined;
            offset?: undefined;
            saleType?: undefined;
            state?: undefined;
            owner?: undefined;
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
                items: {
                    type: string;
                };
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            view: {
                type: string;
                enum: string[];
                description: string;
            };
            nameOrID?: undefined;
            poll?: undefined;
            nocache?: undefined;
            name?: undefined;
            type?: undefined;
            afterTime?: undefined;
            sort?: undefined;
            buyer?: undefined;
            seller?: undefined;
            event?: undefined;
            requireBuyer?: undefined;
            includeOwner?: undefined;
            excludeNFDAsSeller?: undefined;
            category?: undefined;
            minPrice?: undefined;
            maxPrice?: undefined;
            offset?: undefined;
            saleType?: undefined;
            state?: undefined;
            owner?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            type: {
                type: string;
                enum: string[];
                description: string;
            };
            afterTime: {
                type: string;
                format: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            sort: {
                type: string;
                enum: string[];
                description: string;
            };
            nameOrID?: undefined;
            view?: undefined;
            poll?: undefined;
            nocache?: undefined;
            address?: undefined;
            buyer?: undefined;
            seller?: undefined;
            event?: undefined;
            requireBuyer?: undefined;
            includeOwner?: undefined;
            excludeNFDAsSeller?: undefined;
            category?: undefined;
            minPrice?: undefined;
            maxPrice?: undefined;
            offset?: undefined;
            saleType?: undefined;
            state?: undefined;
            owner?: undefined;
        };
        required: string[];
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
                items?: undefined;
            };
            buyer: {
                type: string;
                description: string;
            };
            seller: {
                type: string;
                description: string;
            };
            event: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
            requireBuyer: {
                type: string;
                description: string;
            };
            includeOwner: {
                type: string;
                description: string;
            };
            excludeNFDAsSeller: {
                type: string;
                description: string;
            };
            category: {
                type: string;
                items: {
                    type: string;
                    enum: string[];
                };
            };
            minPrice: {
                type: string;
                description: string;
            };
            maxPrice: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            offset: {
                type: string;
                description: string;
            };
            sort: {
                type: string;
                enum: string[];
                description: string;
            };
            nameOrID?: undefined;
            view?: undefined;
            poll?: undefined;
            nocache?: undefined;
            address?: undefined;
            type?: undefined;
            afterTime?: undefined;
            saleType?: undefined;
            state?: undefined;
            owner?: undefined;
        };
        required?: undefined;
    };
} | {
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            name: {
                type: string;
                description: string;
                items?: undefined;
            };
            category: {
                type: string;
                items: {
                    type: string;
                    enum: string[];
                };
            };
            saleType: {
                type: string;
                items: {
                    type: string;
                    enum: string[];
                };
            };
            state: {
                type: string;
                items: {
                    type: string;
                    enum: string[];
                };
            };
            owner: {
                type: string;
                description: string;
            };
            minPrice: {
                type: string;
                description: string;
            };
            maxPrice: {
                type: string;
                description: string;
            };
            limit: {
                type: string;
                description: string;
            };
            offset: {
                type: string;
                description: string;
            };
            sort: {
                type: string;
                enum: string[];
                description: string;
            };
            view: {
                type: string;
                enum: string[];
                description: string;
            };
            nameOrID?: undefined;
            poll?: undefined;
            nocache?: undefined;
            address?: undefined;
            type?: undefined;
            afterTime?: undefined;
            buyer?: undefined;
            seller?: undefined;
            event?: undefined;
            requireBuyer?: undefined;
            includeOwner?: undefined;
            excludeNFDAsSeller?: undefined;
        };
        required?: undefined;
    };
} | {
    [x: string]: unknown;
    name: string;
    inputSchema: {
        [x: string]: unknown;
        type: "object";
        properties?: {
            [x: string]: unknown;
        } | undefined;
    };
    description?: string | undefined;
})[];
export declare function handleApiManager(name: string, args: any): Promise<any>;
