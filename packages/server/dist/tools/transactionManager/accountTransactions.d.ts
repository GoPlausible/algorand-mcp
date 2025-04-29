import { Transaction, SuggestedParams } from 'algosdk';
export declare const accountTransactionSchemas: {
    makePaymentTxn: {
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
    makeKeyRegTxn: {
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
};
export declare const accountTransactionTools: ({
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
})[];
export declare class AccountTransactionManager {
    /**
     * Creates a payment transaction
     */
    static makePaymentTxn(txn: {
        from: string;
        to: string;
        amount: number;
        closeRemainderTo?: string;
        note?: Uint8Array;
        rekeyTo?: string;
        suggestedParams: SuggestedParams;
    }): Transaction;
    /**
     * Creates a key registration transaction
     */
    static makeKeyRegTxn(txn: {
        from: string;
        note?: Uint8Array;
        rekeyTo?: string;
        suggestedParams: SuggestedParams;
        voteKey: string;
        selectionKey: string;
        stateProofKey: string;
        voteFirst: number;
        voteLast: number;
        voteKeyDilution: number;
        nonParticipation?: boolean;
    }): Transaction;
    static handleTool(name: string, args: Record<string, unknown>): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
}
