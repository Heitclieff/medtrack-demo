import { ApiAdapter, ApiResponse, ApiError } from '../types';

export class HttpAdapter implements ApiAdapter {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
  }

  private async handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const error: ApiError = {
        status: res.status,
        message: body.message || res.statusText,
        errors: body.errors,
      };
      throw error;
    }
    return res.json();
  }

  private buildUrl(path: string, params?: Record<string, unknown>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };

    if (typeof window === 'undefined') {
      try {
        const { cookies } = await import('next/headers');
        const { getIronSession } = await import('iron-session');
        const { sessionOptions } = await import('@/lib/session');
        const cookieStore = await cookies();
        const session = await getIronSession<any>(cookieStore, sessionOptions);
        if (session.token) {
          headers['Authorization'] = `Bearer ${session.token}`;
        }
      } catch {
        // Ignore
      }
    }
    return headers;
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const headers = await this.getAuthHeaders();
    const res = await fetch(this.buildUrl(url, params), { headers, cache: 'no-store' });
    return this.handleResponse<T>(res);
  }

  async post<T>(url: string, body?: unknown): Promise<ApiResponse<T>> {
    const headers = await this.getAuthHeaders();
    const res = await fetch(this.buildUrl(url), { method: 'POST', headers, body: JSON.stringify(body) });
    return this.handleResponse<T>(res);
  }

  async put<T>(url: string, body?: unknown): Promise<ApiResponse<T>> {
    const headers = await this.getAuthHeaders();
    const res = await fetch(this.buildUrl(url), { method: 'PUT', headers, body: JSON.stringify(body) });
    return this.handleResponse<T>(res);
  }

  async patch<T>(url: string, body?: unknown): Promise<ApiResponse<T>> {
    const headers = await this.getAuthHeaders();
    const res = await fetch(this.buildUrl(url), { method: 'PATCH', headers, body: JSON.stringify(body) });
    return this.handleResponse<T>(res);
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const headers = await this.getAuthHeaders();
    const res = await fetch(this.buildUrl(url), { method: 'DELETE', headers });
    return this.handleResponse<T>(res);
  }
}

export const httpAdapter = new HttpAdapter();
