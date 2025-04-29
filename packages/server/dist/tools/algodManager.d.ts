import type { EncodedSignedTransaction } from 'algosdk';
import type { SimulateResponse, CompileResponse, DisassembleResponse, SimulateTraceConfig, PostTransactionsResponse } from 'algosdk/dist/types/client/v2/algod/models/types';
export declare const algodToolSchemas: {
    compileTeal: {
        type: string;
        properties: {
            source: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    disassembleTeal: {
        type: string;
        properties: {
            bytecode: {
                type: string;
                description: string;
            };
        };
        required: string[];
    };
    sendRawTransaction: {
        type: string;
        properties: {
            signedTxns: {
                type: string;
                items: {
                    type: string;
                    description: string;
                };
                description: string;
            };
        };
        required: string[];
    };
    simulateRawTransactions: {
        type: string;
        properties: {
            txns: {
                type: string;
                items: {
                    type: string;
                    description: string;
                };
                description: string;
            };
        };
        required: string[];
    };
    simulateTransactions: {
        type: string;
        properties: {
            txnGroups: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        txns: {
                            type: string;
                            items: {
                                type: string;
                                description: string;
                            };
                            description: string;
                        };
                    };
                    required: string[];
                    description: string;
                };
                description: string;
            };
            allowEmptySignatures: {
                type: string;
                optional: boolean;
                description: string;
            };
            allowMoreLogging: {
                type: string;
                optional: boolean;
                description: string;
            };
            allowUnnamedResources: {
                type: string;
                optional: boolean;
                description: string;
            };
            execTraceConfig: {
                type: string;
                optional: boolean;
                description: string;
            };
            extraOpcodeBudget: {
                type: string;
                optional: boolean;
                description: string;
            };
            round: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
};
export declare class AlgodManager {
    static readonly algodTools: ({
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                source: {
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
                bytecode: {
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
                signedTxns: {
                    type: string;
                    items: {
                        type: string;
                        description: string;
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
                txns: {
                    type: string;
                    items: {
                        type: string;
                        description: string;
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
                txnGroups: {
                    type: string;
                    items: {
                        type: string;
                        properties: {
                            txns: {
                                type: string;
                                items: {
                                    type: string;
                                    description: string;
                                };
                                description: string;
                            };
                        };
                        required: string[];
                        description: string;
                    };
                    description: string;
                };
                allowEmptySignatures: {
                    type: string;
                    optional: boolean;
                    description: string;
                };
                allowMoreLogging: {
                    type: string;
                    optional: boolean;
                    description: string;
                };
                allowUnnamedResources: {
                    type: string;
                    optional: boolean;
                    description: string;
                };
                execTraceConfig: {
                    type: string;
                    optional: boolean;
                    description: string;
                };
                extraOpcodeBudget: {
                    type: string;
                    optional: boolean;
                    description: string;
                };
                round: {
                    type: string;
                    optional: boolean;
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
     * Compiles TEAL source code to binary
     * @param source TEAL source code as string or bytes
     * @returns Compilation result with hash and bytecode
     */
    static compile(source: string | Uint8Array): Promise<CompileResponse>;
    /**
     * Disassembles TEAL bytecode back to source
     * @param bytecode TEAL bytecode as string or bytes
     * @returns Disassembled TEAL source code
     */
    static disassemble(bytecode: string | Uint8Array): Promise<DisassembleResponse>;
    /**
     * Broadcasts signed transactions to the network
     * @param signedTxns Single signed transaction or array of signed transactions
     * @returns Transaction ID of the submission
     */
    static sendRawTransaction(signedTxns: Uint8Array | Uint8Array[]): Promise<PostTransactionsResponse>;
    /**
     * Simulates raw transactions
     * @param txns Single transaction or array of transactions to simulate
     * @returns Simulation results
     */
    static simulateRawTransactions(txns: Uint8Array | Uint8Array[]): Promise<SimulateResponse>;
    /**
     * Simulates transactions with detailed configuration
     * @param request Simulation request with transaction groups and configuration
     * @returns Simulation results
     */
    static simulateTransactions(request: {
        txnGroups: {
            txns: EncodedSignedTransaction[];
        }[];
        allowEmptySignatures?: boolean;
        allowMoreLogging?: boolean;
        allowUnnamedResources?: boolean;
        execTraceConfig?: SimulateTraceConfig;
        extraOpcodeBudget?: number;
        round?: number;
    }): Promise<SimulateResponse>;
}
