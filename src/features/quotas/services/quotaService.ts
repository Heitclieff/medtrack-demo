import { apiClient } from '@/services/api/apiClient';
import { ApiAdapter } from '@/services/api/types';
import { WardQuotaItem, QuotaItem } from '@/features/quotas/data/quotaData';

export class QuotaService {
  private client: ApiAdapter;

  constructor(client: ApiAdapter) {
    this.client = client;
  }

  getWardQuotas(filters?: Record<string, unknown>) {
    return this.client.get<WardQuotaItem[]>('/quotas/ward', filters);
  }

  updateWardQuota(id: string, data: Pick<WardQuotaItem, 'minLimit' | 'maxLimit'>) {
    return this.client.put<WardQuotaItem>(`/quotas/ward/${id}`, data);
  }

  assignWardQuota(data: Partial<WardQuotaItem>) {
    return this.client.post<WardQuotaItem>('/quotas/ward', data);
  }

  resetWardQuota(id: string) {
    return this.client.post<WardQuotaItem>(`/quotas/ward/${id}/reset`);
  }

  getGeneralQuotas(filters?: Record<string, unknown>) {
    return this.client.get<QuotaItem[]>('/quotas/general', filters);
  }

  updateGeneralQuota(id: string, data: Pick<QuotaItem, 'minLimit' | 'maxLimit'>) {
    return this.client.put<QuotaItem>(`/quotas/general/${id}`, data);
  }

  assignGeneralQuota(data: Partial<QuotaItem>) {
    return this.client.post<QuotaItem>('/quotas/general', data);
  }

  resetGeneralQuota(id: string) {
    return this.client.post<QuotaItem>(`/quotas/general/${id}/reset`);
  }
}

export const quotaService = new QuotaService(apiClient);
