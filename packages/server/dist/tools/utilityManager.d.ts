/// <reference types="node" />
export declare const utilityToolSchemas: {
    ping: {
        type: string;
        properties: {};
        required: never[];
    };
    validateAddress: {
        type: string;
        properties: {
            address: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    encodeAddress: {
        type: string;
        properties: {
            publicKey: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    decodeAddress: {
        type: string;
        properties: {
            address: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    getApplicationAddress: {
        type: string;
        properties: {
            appId: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    bytesToBigint: {
        type: string;
        properties: {
            bytes: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    bigintToBytes: {
        type: string;
        properties: {
            value: {
                type: string;
                description: string;
            };
            size: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    encodeUint64: {
        type: string;
        properties: {
            value: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    decodeUint64: {
        type: string;
        properties: {
            bytes: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    verifyBytes: {
        type: string;
        properties: {
            bytes: {
                type: string;
                description: string;
            };
            signature: {
                type: string;
                description: string;
            };
            address: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
};
export declare class UtilityManager {
    static readonly utilityTools: ({
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
                address: {
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
                publicKey: {
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
                appId: {
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
    } | {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                value: {
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
                sk: {
                    type: string;
                    description: string;
                };
                obj?: undefined;
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
                bytes?: undefined;
                sk?: undefined;
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
     * Checks if an address is valid
     * @param address The address to validate
     * @returns True if the address is valid, false otherwise
     */
    static isValidAddress(address: string): boolean;
    /**
     * Encodes a public key to an Algorand address
     * @param publicKey The public key to encode
     * @returns The encoded address
     */
    static encodeAddress(publicKey: Buffer): string;
    /**
     * Decodes an Algorand address to a public key
     * @param address The address to decode
     * @returns The decoded public key
     */
    static decodeAddress(address: string): Uint8Array;
    /**
     * Gets the application address for a given application ID
     * @param appId The application ID
     * @returns The application address
     */
    static getApplicationAddress(appId: number): string;
    /**
     * Converts bytes to a BigInt
     * @param bytes The bytes to convert
     * @returns The BigInt value
     */
    static bytesToBigInt(bytes: Uint8Array): bigint;
    /**
     * Converts a BigInt to bytes
     * @param value The BigInt value to convert
     * @param size The size of the resulting byte array
     * @returns The bytes representation
     */
    static bigIntToBytes(value: bigint, size: number): Uint8Array;
    /**
     * Encodes a uint64 to bytes
     * @param value The uint64 value to encode
     * @returns The encoded bytes
     */
    static encodeUint64(value: bigint): Uint8Array;
    /**
     * Decodes bytes to a uint64
     * @param bytes The bytes to decode
     * @returns The decoded uint64 value
     */
    static decodeUint64(bytes: Uint8Array): bigint;
    /**
     * Verifies a signature against bytes with a public key
     * @param bytes The bytes that were signed
     * @param signature The signature to verify
     * @param address The Algorand address of the signer
     * @returns True if the signature is valid
     */
    static verifyBytes(bytes: Uint8Array, signature: Uint8Array, address: string): boolean;
}
