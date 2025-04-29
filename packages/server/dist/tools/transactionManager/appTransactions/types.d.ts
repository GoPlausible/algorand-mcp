import { SuggestedParams, OnApplicationComplete } from 'algosdk';
export interface BaseAppTxnParams {
    from: string;
    suggestedParams: SuggestedParams;
    note?: Uint8Array;
    lease?: Uint8Array;
    rekeyTo?: string;
    appArgs?: Array<Uint8Array>;
    accounts?: string[];
    foreignApps?: number[];
    foreignAssets?: number[];
    boxes?: Array<{
        appIndex: number;
        name: Uint8Array;
    }>;
    onComplete?: OnApplicationComplete;
}
export interface AppCreateTxnParams extends BaseAppTxnParams {
    approvalProgram: Uint8Array;
    clearProgram: Uint8Array;
    numGlobalByteSlices: number;
    numGlobalInts: number;
    numLocalByteSlices: number;
    numLocalInts: number;
    extraPages?: number;
}
export interface AppUpdateTxnParams extends BaseAppTxnParams {
    appIndex: number;
    approvalProgram: Uint8Array;
    clearProgram: Uint8Array;
}
export interface AppDeleteTxnParams extends BaseAppTxnParams {
    appIndex: number;
}
export interface AppOptInTxnParams extends BaseAppTxnParams {
    appIndex: number;
}
export interface AppCloseOutTxnParams extends BaseAppTxnParams {
    appIndex: number;
}
export interface AppClearStateTxnParams extends BaseAppTxnParams {
    appIndex: number;
}
export interface AppCallTxnParams extends BaseAppTxnParams {
    appIndex: number;
}
export declare const appTransactionSchemas: {
    makeAppCreateTxn: {
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
    makeAppUpdateTxn: {
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
            approvalProgram: {
                type: string;
                description: string;
            };
            clearProgram: {
                type: string;
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
            onComplete: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
    makeAppDeleteTxn: {
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
            onComplete: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
    makeAppOptInTxn: {
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
            onComplete: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
    makeAppCloseOutTxn: {
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
            onComplete: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
    makeAppClearTxn: {
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
            onComplete: {
                type: string;
                optional: boolean;
                description: string;
            };
        };
        required: string[];
    };
    makeAppCallTxn: {
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
};
export declare const appTransactionTools: ({
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
})[];
