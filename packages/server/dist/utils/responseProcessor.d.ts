export interface PaginationMetadata {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    pageToken?: string;
}
export interface PaginatedResponse<T> {
    data: T;
    metadata: PaginationMetadata & {
        arrayField?: string;
    };
}
export interface ProcessedResponse {
    [key: string]: any;
    content?: any[];
    metadata?: PaginationMetadata & {
        arrayField?: string;
    };
}
export declare class ResponseProcessor {
    private static generateNextPageToken;
    private static decodePageToken;
    private static shouldPaginateArray;
    private static shouldPaginateObject;
    private static paginateObject;
    private static paginateArray;
    private static shouldSkipPagination;
    static processResponse(response: any, pageToken?: string): any;
    static wrapResourceHandler<T extends (...args: any[]) => Promise<any>>(handler: T): T;
}
