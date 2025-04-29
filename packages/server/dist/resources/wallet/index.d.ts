export declare const walletResources: {
    canHandle: (uri: string) => boolean;
    handle: (uri: string) => Promise<{
        contents: {
            uri: "algorand://wallet/account";
            mimeType: string;
            text: string;
        }[];
    } | {
        contents: {
            uri: "algorand://wallet/assets";
            mimeType: string;
            text: string;
        }[];
    } | {
        contents: {
            uri: "algorand://wallet/secretkey";
            mimeType: string;
            text: string;
        }[];
    } | {
        contents: {
            uri: "algorand://wallet/publickey";
            mimeType: string;
            text: string;
        }[];
    } | {
        contents: {
            uri: "algorand://wallet/mnemonic";
            mimeType: string;
            text: string;
        }[];
    } | {
        contents: {
            uri: "algorand://wallet/address";
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
                secretKey: {
                    type: string;
                };
                publicKey?: undefined;
                mnemonic?: undefined;
                address?: undefined;
                accounts?: undefined;
                assets?: undefined;
            };
        };
    } | {
        uri: string;
        name: string;
        description: string;
        schema: {
            type: string;
            properties: {
                publicKey: {
                    type: string;
                };
                secretKey?: undefined;
                mnemonic?: undefined;
                address?: undefined;
                accounts?: undefined;
                assets?: undefined;
            };
        };
    } | {
        uri: string;
        name: string;
        description: string;
        schema: {
            type: string;
            properties: {
                mnemonic: {
                    type: string;
                };
                secretKey?: undefined;
                publicKey?: undefined;
                address?: undefined;
                accounts?: undefined;
                assets?: undefined;
            };
        };
    } | {
        uri: string;
        name: string;
        description: string;
        schema: {
            type: string;
            properties: {
                address: {
                    type: string;
                };
                secretKey?: undefined;
                publicKey?: undefined;
                mnemonic?: undefined;
                accounts?: undefined;
                assets?: undefined;
            };
        };
    } | {
        uri: string;
        name: string;
        description: string;
        schema: {
            type: string;
            properties: {
                accounts: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            address: {
                                type: string;
                            };
                            amount: {
                                type: string;
                            };
                            assets: {
                                type: string;
                            };
                        };
                    };
                };
                secretKey?: undefined;
                publicKey?: undefined;
                mnemonic?: undefined;
                address?: undefined;
                assets?: undefined;
            };
        };
    } | {
        uri: string;
        name: string;
        description: string;
        schema: {
            type: string;
            properties: {
                assets: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            id: {
                                type: string;
                            };
                            amount: {
                                type: string;
                            };
                            frozen: {
                                type: string;
                            };
                        };
                    };
                };
                secretKey?: undefined;
                publicKey?: undefined;
                mnemonic?: undefined;
                address?: undefined;
                accounts?: undefined;
            };
        };
    })[];
};
