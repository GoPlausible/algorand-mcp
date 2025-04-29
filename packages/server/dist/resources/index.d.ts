export declare class ResourceManager {
    static get resources(): {
        uri: string;
        name: string;
        description: string;
        schema?: any;
    }[];
    static get schemas(): Record<string, any>;
    static handleResource(uri: string): Promise<{
        contents: {
            uri: string;
            mimeType: string;
            text: string;
        }[];
    }>;
}
