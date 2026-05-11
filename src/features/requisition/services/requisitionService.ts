import { apiClient } from '@/services/api/apiClient';
import { ApiAdapter } from '@/services/api/types';
import { RequisitionItem } from '@/features/requisition/data/requisitionData';

export class RequisitionService {
  private client: ApiAdapter;

  constructor(client: ApiAdapter) {
    this.client = client;
  }

  getPending(filters?: Record<string, unknown>) {
    return this.client.get<RequisitionItem[]>('/requisition/pending', filters);
  }

  approve(id: string, data?: Record<string, unknown>) {
    return this.client.post<RequisitionItem>(`/requisition/pending/${id}/approve`, data);
  }

  reject(id: string, reason: string) {
    return this.client.post<RequisitionItem>(`/requisition/pending/${id}/reject`, { reason });
  }
}

export const requisitionService = new RequisitionService(apiClient);
