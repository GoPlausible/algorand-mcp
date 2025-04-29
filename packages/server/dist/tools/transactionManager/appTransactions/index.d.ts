import { appTransactionSchemas, appTransactionTools } from './types.js';
import { makeApplicationCreateTxn, handleCreateTxn } from './createTxn.js';
import { makeApplicationUpdateTxn, handleUpdateTxn } from './updateTxn.js';
import { makeApplicationDeleteTxn, handleDeleteTxn } from './deleteTxn.js';
import { makeApplicationOptInTxn, handleOptInTxn } from './optInTxn.js';
import { makeApplicationCloseOutTxn, handleCloseOutTxn } from './closeOutTxn.js';
import { makeApplicationClearStateTxn, handleClearTxn } from './clearTxn.js';
import { makeApplicationCallTxn, handleCallTxn } from './callTxn.js';
export { makeApplicationCreateTxn, makeApplicationUpdateTxn, makeApplicationDeleteTxn, makeApplicationOptInTxn, makeApplicationCloseOutTxn, makeApplicationClearStateTxn, makeApplicationCallTxn };
export { handleCreateTxn, handleUpdateTxn, handleDeleteTxn, handleOptInTxn, handleCloseOutTxn, handleClearTxn, handleCallTxn };
export { appTransactionSchemas, appTransactionTools };
export * from './types.js';
export declare class AppTransactionManager {
    /**
     * Handle application transaction tools
     */
    static handleTool(name: string, args: Record<string, unknown>): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
}
