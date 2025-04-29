export declare const knowledgeResources: {
    canHandle: (uri: string) => boolean;
    handle: (uri: string) => Promise<{
        contents: {
            uri: string;
            mimeType: string;
            text: string;
        }[];
    }>;
    getResourceDefinitions: () => ({
        uri: string;
        name: string;
        description: string;
        schema: {
            type: string;
            properties: {
                categories: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            name: {
                                type: string;
                            };
                            description: {
                                type: string;
                            };
                            content: {
                                type: string;
                            };
                        };
                    };
                };
            };
        };
    } | {
        uri: string;
        name: any;
        description: any;
        schema: {
            type: string;
            properties: {
                name: {
                    type: string;
                };
                description: {
                    type: string;
                };
                subcategories: {
                    type: string;
                };
                documents: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            name: {
                                type: string;
                            };
                            description: {
                                type: string;
                            };
                            path: {
                                type: string;
                            };
                        };
                    };
                };
            };
        };
    })[];
};
