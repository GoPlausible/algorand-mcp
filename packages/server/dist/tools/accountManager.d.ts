import algosdk from 'algosdk';
export declare const accountToolSchemas: {
    createAccount: {
        type: string;
        properties: {};
        required: never[];
    };
    rekeyAccount: {
        type: string;
        properties: {
            sourceAddress: {
                type: string;
                description: string;
            };
            targetAddress: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    mnemonicToMdk: {
        type: string;
        properties: {
            mnemonic: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    mdkToMnemonic: {
        type: string;
        properties: {
            mdk: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    secretKeyToMnemonic: {
        type: string;
        properties: {
            secretKey: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    mnemonicToSecretKey: {
        type: string;
        properties: {
            mnemonic: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    seedFromMnemonic: {
        type: string;
        properties: {
            mnemonic: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    mnemonicFromSeed: {
        type: string;
        properties: {
            seed: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare class AccountManager {
    static readonly accountTools: ({
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {};
            required: never[];
        };
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                sourceAddress: {
                    type: string;
                    description: string;
                };
                targetAddress: {
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
                mnemonic: {
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
                mdk: {
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
                secretKey: {
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
                seed: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
    })[];
    static handleTool(name: string, args: Record<string, unknown>): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
    /**
     * Creates a new account
     * @returns Object containing the address and mnemonic
     */
    static createAccount(): {
        address: string;
        mnemonic: string;
    };
    /**
     * Rekeys an account to a new address
     * @param fromAddress The address to rekey from
     * @param toAddress The address to rekey to
     * @returns The rekey transaction object
     */
    static createRekeyTransaction(fromAddress: string, toAddress: string): Promise<algosdk.Transaction>;
    /**
     * Converts a mnemonic to a master derivation key
     * @param mnemonic The mnemonic to convert
     * @returns The master derivation key
     */
    static mnemonicToMasterDerivationKey(mnemonic: string): Uint8Array;
    /**
     * Converts a master derivation key to a mnemonic
     * @param mdk The master derivation key to convert
     * @returns The mnemonic
     */
    static masterDerivationKeyToMnemonic(mdk: Uint8Array): string;
    /**
     * Converts a secret key to a mnemonic
     * @param secretKey The secret key to convert
     * @returns The mnemonic
     */
    static secretKeyToMnemonic(secretKey: Uint8Array): string;
    /**
     * Converts a mnemonic to a secret key
     * @param mnemonic The mnemonic to convert
     * @returns The secret key
     */
    static mnemonicToSecretKey(mnemonic: string): {
        sk: Uint8Array;
        addr: string;
    };
    /**
     * Generates a seed from a mnemonic
     * @param mnemonic The mnemonic to generate the seed from
     * @returns The seed
     */
    static seedFromMnemonic(mnemonic: string): Uint8Array;
    /**
     * Generates a mnemonic from a seed
     * @param seed The seed to generate the mnemonic from
     * @returns The mnemonic
     */
    static mnemonicFromSeed(seed: Uint8Array): string;
}
