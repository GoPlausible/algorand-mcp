/**
 * ResponseProcessor for Algorand Remote MCP on Cloudflare Workers
 * Handles pagination and consistent response formatting
 */
import { State } from '../types';

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

export class ResponseProcessor {
  // Default pagination size, can be overridden
  private static items_per_page = 10;

  /**
   * Set the pagination size from Durable Object state
   */
  static setItemsPerPage(itemsPerPage: number): void {
    this.items_per_page = itemsPerPage;
    console.log('[ResponseProcessor] Set items per page:', itemsPerPage);
  }

  /**
   * Generate a token for the next page
   */
  private static generateNextPageToken(page: number): string {
    const token = btoa(`page_${page}`); // Use btoa for base64 encoding in Workers
    console.log('[Pagination] Generated token:', { page, token });
    return token;
  }

  /**
   * Decode a page token to get the page number
   */
  private static decodePageToken(token: string): number {
    console.log('[Pagination] Decoding token:', token);
    try {
      const decoded = atob(token); // Use atob for base64 decoding in Workers
      console.log('[Pagination] Decoded token string:', decoded);
      const page = parseInt(decoded.replace('page_', ''));
      console.log('[Pagination] Parsed page number:', page);
      return isNaN(page) ? 1 : page;
    } catch (error) {
      console.log('[Pagination] Error decoding token:', error);
      return 1;
    }
  }

  /**
   * Determine if an array should be paginated
   */
  private static shouldPaginateArray(array: any[]): boolean {
    const should = array.length > this.items_per_page;
    console.log('[Pagination] Should paginate array?', { 
      arrayLength: array.length, 
      itemsPerPage: this.items_per_page,
      shouldPaginate: should 
    });
    return should;
  }

  /**
   * Determine if an object should be paginated (by keys)
   */
  private static shouldPaginateObject(obj: any): boolean {
    const should = Object.keys(obj).length > this.items_per_page;
    console.log('[Pagination] Should paginate object?', {
      objectKeys: Object.keys(obj).length,
      itemsPerPage: this.items_per_page,
      shouldPaginate: should
    });
    return should;
  }

  /**
   * Paginate an object by its keys
   */
  private static paginateObject(
    obj: { [key: string]: any },
    pageToken?: string
  ): { items: { [key: string]: any }; metadata: PaginationMetadata } {
    console.log('[Pagination] Starting object pagination', { pageToken });
    const entries = Object.entries(obj);
    const totalItems = entries.length;
    const totalPages = Math.ceil(totalItems / this.items_per_page);
    const currentPage = pageToken
      ? this.decodePageToken(pageToken)
      : 1;
    
    console.log('[Pagination] Object pagination state:', { totalItems, totalPages, currentPage });
    
    const startIndex = (currentPage - 1) * this.items_per_page;
    const endIndex = startIndex + this.items_per_page;
    const hasNextPage = endIndex < totalItems;

    const paginatedEntries = entries.slice(startIndex, endIndex);
    const paginatedObject = Object.fromEntries(paginatedEntries);

    console.log('[Pagination] Object pagination result:', {
      startIndex,
      endIndex,
      hasNextPage,
      paginatedEntriesLength: paginatedEntries.length
    });

    return {
      items: paginatedObject,
      metadata: {
        totalItems,
        itemsPerPage: this.items_per_page,
        currentPage,
        totalPages,
        hasNextPage,
        ...(hasNextPage && {
          pageToken: this.generateNextPageToken(currentPage + 1),
        }),
      }
    };
  }

  /**
   * Paginate an array
   */
  private static paginateArray<T>(
    array: T[],
    pageToken?: string
  ): { items: T[]; metadata: PaginationMetadata } {
    console.log('[Pagination] Starting array pagination', { 
      arrayLength: array.length,
      pageToken 
    });
    const totalItems = array.length;
    const totalPages = Math.ceil(totalItems / this.items_per_page);
    const currentPage = pageToken
      ? this.decodePageToken(pageToken)
      : 1;
    
    console.log('[Pagination] Array pagination state:', { totalItems, totalPages, currentPage });
    
    const startIndex = (currentPage - 1) * this.items_per_page;
    const endIndex = startIndex + this.items_per_page;
    const hasNextPage = endIndex < totalItems;

    const paginatedItems = array.slice(startIndex, endIndex);
    console.log('[Pagination] Array pagination result:', {
      startIndex,
      endIndex,
      hasNextPage,
      itemsCount: paginatedItems.length
    });

    return {
      items: paginatedItems,
      metadata: {
        totalItems,
        itemsPerPage: this.items_per_page,
        currentPage,
        totalPages,
        hasNextPage,
        ...(hasNextPage && {
          pageToken: this.generateNextPageToken(currentPage + 1),
        }),
      }
    };
  }

  /**
   * Determine if pagination should be skipped for specific objects
   */
  private static shouldSkipPagination(obj: any, key: string): boolean {
    // Skip pagination for application global-state and other special arrays
    if (obj.id && obj.params && key === 'global-state') {
      return true;
    }
    return false;
  }

  /**
   * Process a response with consistent formatting and pagination
   */
  static processResponse(response: any, pageToken?: string): any {
    console.log('[ResponseProcessor] Processing response', { 
      type: Array.isArray(response) ? 'array' : typeof response,
      pageToken
    });
    
    // Handle array responses
    if (Array.isArray(response)) {
      const arrayResponse = response as any[];
      
      // Only paginate if needed
      if (this.shouldPaginateArray(arrayResponse)) {
        const { items, metadata } = this.paginateArray(arrayResponse, pageToken);
        const wrappedResponse = {
          data: items,
          metadata
        };
        console.log('[ResponseProcessor] Array response result:', {
          itemsCount: items.length,
          metadata
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(wrappedResponse, null, 2)
          }]
        };
      } else {
        // Return without pagination metadata for small arrays
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ data: arrayResponse }, null, 2)
          }]
        };
      }
    }
  
    // Handle object responses with array values
    if (typeof response === 'object' && response !== null) {
      console.log('[ResponseProcessor] Processing object response');
      // Create a deep copy to avoid modifying the original object
      const processed = JSON.parse(JSON.stringify(response));
      let paginatedField: string | undefined;
      let paginationMetadata: PaginationMetadata | undefined;
      
      // Process each property of the object
      for (const key in processed) {
        console.log('[ResponseProcessor] Processing field:', key);
        if (Array.isArray(processed[key]) && !this.shouldSkipPagination(processed, key)) {
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
        console.log('[ResponseProcessor] Object response result with pagination:', {
          paginatedField,
          metadata: paginationMetadata
        });
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
      console.log('[ResponseProcessor] Object response result without pagination');
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
    console.log('[ResponseProcessor] Simple value response');
    return {
      content: [{
        type: 'text',
        text: JSON.stringify(wrappedResponse, null, 2)
      }]
    };
  }
}
