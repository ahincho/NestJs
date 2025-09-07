export class PaginationResponse<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  items: T;
}
