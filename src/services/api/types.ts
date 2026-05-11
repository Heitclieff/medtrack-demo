// ─── Shared API types ──────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  meta?: PageMeta;
  message?: string;
}

export interface PageMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface ListParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: unknown;
}

export interface ApiAdapter {
  get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>>;
  post<T>(url: string, body?: unknown): Promise<ApiResponse<T>>;
  put<T>(url: string, body?: unknown): Promise<ApiResponse<T>>;
  patch<T>(url: string, body?: unknown): Promise<ApiResponse<T>>;
  delete<T>(url: string): Promise<ApiResponse<T>>;
}
