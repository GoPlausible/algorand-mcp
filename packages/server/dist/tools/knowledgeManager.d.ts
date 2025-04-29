export declare const knowledgeToolSchemas: {
    getKnowledgeDoc: {
        type: string;
        properties: {
            documents: {
                type: string;
                items: {
                    type: string;
                };
                description: string;
            };
        };
        required: string[];
    };
};
export declare class KnowledgeManager {
    static readonly knowledgeTools: {
        name: string;
        description: string;
        inputSchema: {
            type: string;
            properties: {
                documents: {
                    type: string;
                    items: {
                        type: string;
                    };
                    description: string;
                };
            };
            required: string[];
        };
    }[];
    static handleTool(name: string, args: Record<string, unknown>): Promise<{
        content: {
            type: string;
            text: string;
        }[];
    }>;
}
