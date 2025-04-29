interface Arc26ToolInput {
    address: string;
    label?: string;
    amount?: number;
    asset?: number;
    note?: string;
    xnote?: string;
}
export declare class Arc26Manager {
    arc26Tools: {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                address: {
                    type: string;
                    description: string;
                };
                label: {
                    type: string;
                    description: string;
                    optional: boolean;
                };
                amount: {
                    type: string;
                    description: string;
                    optional: boolean;
                };
                asset: {
                    type: string;
                    description: string;
                    optional: boolean;
                };
                note: {
                    type: string;
                    description: string;
                    optional: boolean;
                };
                xnote: {
                    type: string;
                    description: string;
                    optional: boolean;
                };
            };
            required: string[];
        };
    }[];
    /**
     * Constructs an Algorand URI according to ARC-26 specification and generates a QR code
     * @param params The parameters for constructing the URI
     * @returns Object containing the URI and QR code as base64 data URL
     */
    generateUriAndQr(params: Arc26ToolInput): Promise<{
        uri: string;
        qrCode: string;
    }>;
    handleTool(name: string, args: Record<string, unknown>): Promise<{
        content: ({
            type: string;
            text: string;
            mimeType?: undefined;
        } | {
            type: string;
            text: string;
            mimeType: string;
        })[];
    }>;
}
export declare const arc26Manager: Arc26Manager;
export {};
