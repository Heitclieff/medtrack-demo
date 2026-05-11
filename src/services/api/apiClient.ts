import { ApiAdapter } from './types';
import { httpAdapter } from './adapters/httpAdapter';
import { mockAdapter } from './adapters/mockAdapter';

export class ApiClientFactory {
  static createClient(): ApiAdapter {
    const useMock = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' || true;
    return useMock ? mockAdapter : httpAdapter;
  }
}

export const apiClient = ApiClientFactory.createClient();
