/**
 * Global BigInt JSON serialization support.
 * algosdk v3 returns BigInt for numeric fields; JSON.stringify cannot handle them natively.
 * This patch ensures all JSON.stringify calls throughout the codebase work with BigInt values.
 */
(BigInt.prototype as any).toJSON = function () {
  return Number(this);
};

const DEFAULT_ITEMS_PER_PAGE = 10;

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
  private static generateNextPageToken(page: number): string {
    return btoa(`page_${page}`);
  }

  private static decodePageToken(token: string): number {
    try {
      const decoded = atob(token);
      const page = parseInt(decoded.replace('page_', ''));
      return isNaN(page) ? 1 : page;
    } catch {
      return 1;
    }
  }

  private static shouldPaginateArray(array: any[], itemsPerPage: number): boolean {
    return array.length > itemsPerPage;
  }

  private static shouldPaginateObject(obj: any, itemsPerPage: number): boolean {
    return Object.keys(obj).length > itemsPerPage;
  }

  private static paginateObject(
    obj: { [key: string]: any },
    itemsPerPage: number,
    pageToken?: string
  ): { items: { [key: string]: any }; metadata: PaginationMetadata } {
    const entries = Object.entries(obj);
    const totalItems = entries.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = pageToken ? this.decodePageToken(pageToken) : 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const hasNextPage = endIndex < totalItems;

    const paginatedEntries = entries.slice(startIndex, endIndex);
    const paginatedObject = Object.fromEntries(paginatedEntries);

    return {
      items: paginatedObject,
      metadata: {
        totalItems,
        itemsPerPage,
        currentPage,
        totalPages,
        hasNextPage,
        ...(hasNextPage && {
          pageToken: this.generateNextPageToken(currentPage + 1),
        }),
      }
    };
  }

  private static paginateArray<T>(
    array: T[],
    itemsPerPage: number,
    pageToken?: string
  ): { items: T[]; metadata: PaginationMetadata } {
    const totalItems = array.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = pageToken ? this.decodePageToken(pageToken) : 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const hasNextPage = endIndex < totalItems;

    const paginatedItems = array.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      metadata: {
        totalItems,
        itemsPerPage,
        currentPage,
        totalPages,
        hasNextPage,
        ...(hasNextPage && {
          pageToken: this.generateNextPageToken(currentPage + 1),
        }),
      }
    };
  }

  static processResponse(response: any, pageToken?: string, itemsPerPage?: number): any {
    const perPage = itemsPerPage || DEFAULT_ITEMS_PER_PAGE;

    // Handle array responses
    if (Array.isArray(response)) {
      const { items, metadata } = this.paginateArray(response, perPage, pageToken);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ data: items, metadata }, null, 2)
        }]
      };
    }

    // Handle object responses with array values
    if (typeof response === 'object' && response !== null) {
      const processed = JSON.parse(JSON.stringify(response));
      let paginatedField: string | undefined;
      let paginationMetadata: PaginationMetadata | undefined;

      for (const key in processed) {
        if (Array.isArray(processed[key])) {
          if (this.shouldPaginateArray(processed[key], perPage)) {
            const result = this.paginateArray(processed[key], perPage, pageToken);
            processed[key] = result.items;
            if (result.metadata) {
              paginatedField = key;
              paginationMetadata = result.metadata;
            }
          }
        } else if (typeof processed[key] === 'object' && processed[key] !== null) {
          if (this.shouldPaginateObject(processed[key], perPage)) {
            const result = this.paginateObject(processed[key], perPage, pageToken);
            processed[key] = result.items;
            if (result.metadata) {
              paginatedField = key;
              paginationMetadata = result.metadata;
            }
          }
          const nestedResult = this.processResponse(processed[key], pageToken, perPage);
          if (nestedResult.content?.[0]?.text) {
            try {
              processed[key] = JSON.parse(nestedResult.content[0].text);
            } catch {
              processed[key] = nestedResult.content[0].text;
            }
          }
        }
      }

      if (paginationMetadata) {
        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              data: processed,
              metadata: { ...paginationMetadata, arrayField: paginatedField }
            }, null, 2)
          }]
        };
      }

      return {
        content: [{
          type: 'text',
          text: JSON.stringify({ data: processed }, null, 2)
        }]
      };
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({ data: response }, null, 2)
      }]
    };
  }

  static wrapResourceHandler<T extends (...args: any[]) => Promise<any>>(handler: T): T {
    return ((...args: Parameters<T>) => handler(...args)) as T;
  }
}
