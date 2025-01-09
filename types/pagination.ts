export interface PaginatedResponse<T> {
  items: T[];
  metadata: {
    totalCount: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}
