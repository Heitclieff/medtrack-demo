import { apiClient } from '@/services/api/apiClient';
import { ApiAdapter } from '@/services/api/types';
import { UsageHistoryItem, RequisitionHistoryItem, ReturnHistoryItem } from '@/features/history/data/historyData';

export class HistoryService {
  private client: ApiAdapter;

  constructor(client: ApiAdapter) {
    this.client = client;
  }

  getUsageHistory(filters?: Record<string, unknown>) {
    return this.client.get<UsageHistoryItem[]>('/history/usage', filters);
  }

  getRequisitionHistory(filters?: Record<string, unknown>) {
    return this.client.get<RequisitionHistoryItem[]>('/history/requisitions', filters);
  }

  getReturnHistory(filters?: Record<string, unknown>) {
    return this.client.get<ReturnHistoryItem[]>('/history/returns', filters);
  }
}

export const historyService = new HistoryService(apiClient);
