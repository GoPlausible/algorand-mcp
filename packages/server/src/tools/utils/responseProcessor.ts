import { Buffer } from 'buffer';
import { env } from '../../env.js';

export interface PaginationMetadata {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  nextPageToken?: string;
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

export class ResponseProcessor {
  private static generateNextPageToken(page: number): string {
    return Buffer.from(`page_${page}`).toString('base64');
  }

  private static decodePageToken(token: string): number {
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      const page = parseInt(decoded.replace('page_', ''));
      return isNaN(page) ? 1 : page;
    } catch {
      return 1;
    }
  }

  private static shouldPaginateArray(array: any[]): boolean {
    return array.length > env.items_per_page;
  }

  private static shouldPaginateObject(obj: any): boolean {
    return Object.keys(obj).length > env.items_per_page;
  }

  private static paginateObject(
    obj: { [key: string]: any },
    pageToken?: string
  ): { items: { [key: string]: any }; metadata: PaginationMetadata } {
    const entries = Object.entries(obj);
    const totalItems = entries.length;
    const totalPages = Math.ceil(totalItems / env.items_per_page);
    const currentPage = pageToken
      ? this.decodePageToken(pageToken)
      : 1;
    
    const startIndex = (currentPage - 1) * env.items_per_page;
    const endIndex = startIndex + env.items_per_page;
    const hasNextPage = endIndex < totalItems;

    const paginatedEntries = entries.slice(startIndex, endIndex);
    const paginatedObject = Object.fromEntries(paginatedEntries);

    return {
      items: paginatedObject,
      metadata: {
        totalItems,
        itemsPerPage: env.items_per_page,
        currentPage,
        totalPages,
        hasNextPage,
        ...(hasNextPage && {
          nextPageToken: this.generateNextPageToken(currentPage + 1),
        }),
      }
    };
  }

  private static paginateArray<T>(
    array: T[],
    pageToken?: string
  ): { items: T[]; metadata: PaginationMetadata } {
    const totalItems = array.length;
    const totalPages = Math.ceil(totalItems / env.items_per_page);
    const currentPage = pageToken
      ? this.decodePageToken(pageToken)
      : 1;
    
    const startIndex = (currentPage - 1) * env.items_per_page;
    const endIndex = startIndex + env.items_per_page;
    const hasNextPage = endIndex < totalItems;

    return {
      items: array.slice(startIndex, endIndex),
      metadata: {
        totalItems,
        itemsPerPage: env.items_per_page,
        currentPage,
        totalPages,
        hasNextPage,
        ...(hasNextPage && {
          nextPageToken: this.generateNextPageToken(currentPage + 1),
        }),
      }
    };
  }

  private static shouldSkipPagination(obj: any, key: string): boolean {
    // Skip pagination for application global-state and other special arrays
    if (obj.id && obj.params && key === 'global-state') {
      return true;
    }
    return false;
  }

  static processResponse(response: any, pageToken?: string): any {
    // Handle array responses
    if (Array.isArray(response)) {
      const arrayResponse = response as any[];
      const { items, metadata } = this.paginateArray(arrayResponse, pageToken);
      const wrappedResponse = {
        data: items,
        metadata
      };
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(wrappedResponse, null, 2)
        }]
      };
    }
  
    // Handle object responses with array values
    if (typeof response === 'object' && response !== null) {
      // Create a deep copy to avoid modifying the original object
      const processed = JSON.parse(JSON.stringify(response));
      let paginatedField: string | undefined;
      let paginationMetadata: PaginationMetadata | undefined;
      
      // Process each property of the object
      for (const key in processed) {
        if (Array.isArray(processed[key])) {
          if (this.shouldPaginateArray(processed[key])) {
            const result = this.paginateArray(processed[key], pageToken);
            processed[key] = result.items;
            if (result.metadata) {
              paginatedField = key;
              paginationMetadata = result.metadata;
            }
          }
        } else if (typeof processed[key] === 'object' && processed[key] !== null) {
          // Check if the object needs pagination
          if (this.shouldPaginateObject(processed[key])) {
            const result = this.paginateObject(processed[key], pageToken);
            processed[key] = result.items;
            if (result.metadata) {
              paginatedField = key;
              paginationMetadata = result.metadata;
            }
          }
          // Recursively process nested objects
          const nestedResult = this.processResponse(processed[key], pageToken);
          
          // If the nested processing returned content with a wrapped response
          if (nestedResult.content && nestedResult.content[0] && nestedResult.content[0].text) {
            try {
              const parsedNested = JSON.parse(nestedResult.content[0].text);
              // If the nested result has data/metadata structure, preserve it
              if (parsedNested.data) {
                processed[key] = parsedNested;
              } else {
                processed[key] = parsedNested;
              }
            } catch (e) {
              processed[key] = nestedResult.content[0].text;
            }
          }
        }
      }

      // If any array was paginated, wrap the response
      if (paginationMetadata) {
        const wrappedResponse = {
          data: processed,
          metadata: {
            ...paginationMetadata,
            arrayField: paginatedField
          }
        };
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(wrappedResponse, null, 2)
          }]
        };
      }
  
      // If no pagination occurred, wrap in data property for consistency
      const wrappedResponse = {
        data: processed
      };
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(wrappedResponse, null, 2)
        }]
      };
    }
  
    // Return other values wrapped in data property
    const wrappedResponse = {
      data: response
    };
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(wrappedResponse, null, 2)
      }]
    };
  }

  // Higher-order function to wrap resource tool handlers
  static wrapResourceHandler<T extends (...args: any[]) => Promise<any>>(
    handler: T
  ): T {
    return ((...args: Parameters<T>) => {
      return handler(...args);
    }) as T;
  }
}
