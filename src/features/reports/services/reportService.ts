import { apiClient } from '@/services/api/apiClient';
import { ApiAdapter } from '@/services/api/types';

export class ReportService {
  private client: ApiAdapter;

  constructor(client: ApiAdapter) {
    this.client = client;
  }

  getSummary(filters?: any) {
    return this.client.get<any>('/reports/summary', filters);
  }

  getDetails(id: string) {
    return this.client.get<any>(`/reports/${id}`);
  }
}

export const reportService = new ReportService(apiClient);
