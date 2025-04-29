export declare const nfdTools: ({
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
})[];
export declare function handleNFDTools(name: string, args: any): Promise<any>;
