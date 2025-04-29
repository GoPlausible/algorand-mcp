import { Transaction, SuggestedParams } from 'algosdk';
export declare const assetTransactionSchemas: {
    makeAssetCreateTxn: {
        type: string;
        properties: {
            from: {
                type: string;
                description: string;
            };
            total: {
                type: string;
                description: string;
            };
            decimals: {
                type: string;
                description: string;
            };
            defaultFrozen: {
                type: string;
                description: string;
            };
            unitName: {
                type: string;
                optional: boolean;
                description: string;
            };
            assetName: {
                type: string;
                optional: boolean;
                description: string;
            };
            assetURL: {
                type: string;
                optional: boolean;
                description: string;
            };
            assetMetadataHash: {
                type: string;
                optional: boolean;
                description: string;
            };
            manager: {
                type: string;
                optional: boolean;
                description: string;
            };
            reserve: {
                type: string;
                optional: boolean;
                description: string;
            };
            freeze: {
                type: string;
                optional: boolean;
                description: string;
            };
            clawback: {
                type: string;
                optional: boolean;
                description: string;
            };
            note: {
                type: string;
                optional: boolean;
                description: string;
            };
            rekeyTo: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
    makeAssetConfigTxn: {
        type: string;
        properties: {
            from: {
                type: string;
                description: string;
            };
            assetIndex: {
                type: string;
                description: string;
            };
            manager: {
                type: string;
                optional: boolean;
                description: string;
            };
            reserve: {
                type: string;
                optional: boolean;
                description: string;
            };
            freeze: {
                type: string;
                optional: boolean;
                description: string;
            };
            clawback: {
                type: string;
                optional: boolean;
                description: string;
            };
            strictEmptyAddressChecking: {
                type: string;
                description: string;
            };
            note: {
                type: string;
                optional: boolean;
                description: string;
            };
            rekeyTo: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
    makeAssetDestroyTxn: {
        type: string;
        properties: {
            from: {
                type: string;
                description: string;
            };
            assetIndex: {
                type: string;
                description: string;
            };
            note: {
                type: string;
                optional: boolean;
                description: string;
            };
            rekeyTo: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
    makeAssetFreezeTxn: {
        type: string;
        properties: {
            from: {
                type: string;
                description: string;
            };
            assetIndex: {
                type: string;
                description: string;
            };
            freezeTarget: {
                type: string;
                description: string;
            };
            freezeState: {
                type: string;
                description: string;
            };
            note: {
                type: string;
                optional: boolean;
                description: string;
            };
            rekeyTo: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
    makeAssetTransferTxn: {
        type: string;
        properties: {
            from: {
                type: string;
                description: string;
            };
            to: {
                type: string;
                description: string;
            };
            assetIndex: {
                type: string;
                description: string;
            };
            amount: {
                type: string;
                description: string;
            };
            note: {
                type: string;
                optional: boolean;
                description: string;
            };
            closeRemainderTo: {
                type: string;
                optional: boolean;
                description: string;
            };
            rekeyTo: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
};
export declare const assetTransactionTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        properties: {
            from: {
                type: string;
                description: string;
            };
            total: {
                type: string;
                description: string;
            };
            decimals: {
                type: string;
                description: string;
            };
            defaultFrozen: {
                type: string;
                description: string;
            };
            unitName: {
                type: string;
                optional: boolean;
                description: string;
            };
            assetName: {
                type: string;
                optional: boolean;
                description: string;
            };
            assetURL: {
                type: string;
                optional: boolean;
                description: string;
            };
            assetMetadataHash: {
                type: string;
                optional: boolean;
                description: string;
            };
            manager: {
                type: string;
                optional: boolean;
                description: string;
            };
            reserve: {
                type: string;
                optional: boolean;
                description: string;
            };
            freeze: {
                type: string;
                optional: boolean;
                description: string;
            };
            clawback: {
                type: string;
                optional: boolean;
                description: string;
            };
            note: {
                type: string;
                optional: boolean;
                description: string;
            };
            rekeyTo: {
                type: string;
                optional: boolean;
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
            from: {
                type: string;
                description: string;
            };
            assetIndex: {
                type: string;
                description: string;
            };
            note: {
                type: string;
                optional: boolean;
                description: string;
            };
            rekeyTo: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
})[];
export declare class AssetTransactionManager {
    /**
     * Creates an asset creation transaction
     */
    static makeAssetCreateTxn(params: {
        from: string;
        note?: Uint8Array;
        rekeyTo?: string;
        suggestedParams: SuggestedParams;
        total: number | bigint;
        decimals: number;
        defaultFrozen: boolean;
        unitName?: string;
        assetName?: string;
        assetURL?: string;
        assetMetadataHash?: string | Uint8Array;
        manager?: string;
        reserve?: string;
        freeze?: string;
        clawback?: string;
    }): Transaction;
    /**
     * Creates an asset configuration transaction
     */
    static makeAssetConfigTxn(params: {
        from: string;
        note?: Uint8Array;
        rekeyTo?: string;
        suggestedParams: SuggestedParams;
        assetIndex: number;
        manager?: string;
        reserve?: string;
        freeze?: string;
        clawback?: string;
        strictEmptyAddressChecking: boolean;
    }): Transaction;
    /**
     * Creates an asset destroy transaction
     */
    static makeAssetDestroyTxn(params: {
        from: string;
        note?: Uint8Array;
        rekeyTo?: string;
        suggestedParams: SuggestedParams;
        assetIndex: number;
    }): Transaction;
    /**
     * Creates an asset freeze transaction
     */
    static makeAssetFreezeTxn(params: {
        from: string;
        note?: Uint8Array;
        rekeyTo?: string;
        suggestedParams: SuggestedParams;
        assetIndex: number;
        freezeTarget: string;
        freezeState: boolean;
    }): Transaction;
    /**
     * Creates an asset transfer transaction
     */
    static makeAssetTransferTxn(params: {
        from: string;
        to: string;
        closeRemainderTo?: string;
        revocationTarget?: string;
        amount: number | bigint;
        note?: Uint8Array;
        rekeyTo?: string;
        suggestedParams: SuggestedParams;
        assetIndex: number;
    }): Transaction;
    static handleTool(name: string, args: Record<string, unknown>): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
}
