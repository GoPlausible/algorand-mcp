import { AccountTransactionManager } from './accountTransactions.js';
import { AssetTransactionManager } from './assetTransactions.js';
import { AppTransactionManager } from './appTransactions/index.js';
import { GeneralTransactionManager } from './generalTransaction.js';
export declare const transactionTools: ({
    name: string;
    description: string;
    inputSchema: {
        type: string;
        description: string;
        properties: {
            from: {
                type: string;
                description: string;
            };
            to: {
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
            voteKey: {
                type: string;
                description: string;
            };
            selectionKey: {
                type: string;
                description: string;
            };
            stateProofKey: {
                type: string;
                description: string;
            };
            voteFirst: {
                type: string;
                description: string;
            };
            voteLast: {
                type: string;
                description: string;
            };
            voteKeyDilution: {
                type: string;
                description: string;
            };
            nonParticipation: {
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
            approvalProgram: {
                type: string;
                description: string;
            };
            clearProgram: {
                type: string;
                description: string;
            };
            numGlobalByteSlices: {
                type: string;
                description: string;
            };
            numGlobalInts: {
                type: string;
                description: string;
            };
            numLocalByteSlices: {
                type: string;
                description: string;
            };
            numLocalInts: {
                type: string;
                description: string;
            };
            extraPages: {
                type: string;
                optional: boolean;
                description: string;
            };
            note: {
                type: string;
                optional: boolean;
                description: string;
            };
            lease: {
                type: string;
                optional: boolean;
                description: string;
            };
            rekeyTo: {
                type: string;
                optional: boolean;
                description: string;
            };
            appArgs: {
                type: string;
                items: {
                    type: string;
                };
                optional: boolean;
                description: string;
            };
            accounts: {
                type: string;
                items: {
                    type: string;
                };
                optional: boolean;
                description: string;
            };
            foreignApps: {
                type: string;
                items: {
                    type: string;
                };
                optional: boolean;
                description: string;
            };
            foreignAssets: {
                type: string;
                items: {
                    type: string;
                };
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
            appIndex: {
                type: string;
                description: string;
            };
            appArgs: {
                type: string;
                items: {
                    type: string;
                };
                optional: boolean;
                description: string;
            };
            accounts: {
                type: string;
                items: {
                    type: string;
                };
                optional: boolean;
                description: string;
            };
            foreignApps: {
                type: string;
                items: {
                    type: string;
                };
                optional: boolean;
                description: string;
            };
            foreignAssets: {
                type: string;
                items: {
                    type: string;
                };
                optional: boolean;
                description: string;
            };
            note: {
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
export declare class TransactionManager {
    static handleTool(name: string, args: Record<string, unknown>): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
}
export { AccountTransactionManager, AssetTransactionManager, AppTransactionManager, GeneralTransactionManager };
