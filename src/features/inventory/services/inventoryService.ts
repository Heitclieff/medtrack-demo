import { apiClient } from '@/services/api/apiClient';
import { ApiAdapter } from '@/services/api/types';
import { InventoryItem } from '@/features/inventory/data/inventoryData';
import { WardInventoryItem } from '@/features/inventory/data/wardInventoryData';
import { ReturnHistoryEntry } from '@/features/inventory/data/returnItemData';

export class InventoryService {
  private client: ApiAdapter;

  constructor(client: ApiAdapter) {
    this.client = client;
  }

  getAll(filters?: Record<string, unknown>) {
    return this.client.get<InventoryItem[]>('/inventory', filters);
  }

  getById(id: string) {
    return this.client.get<InventoryItem>(`/inventory/${id}`);
  }

  create(data: Partial<InventoryItem>) {
    return this.client.post<InventoryItem>('/inventory', data);
  }

  update(id: string, data: Partial<InventoryItem>) {
    return this.client.put<InventoryItem>(`/inventory/${id}`, data);
  }

  delete(id: string) {
    return this.client.delete<boolean>(`/inventory/${id}`);
  }

  getWardInventory(filters?: Record<string, unknown>) {
    return this.client.get<WardInventoryItem[]>('/inventory/ward', filters);
  }

  importWardSupply(data: Record<string, unknown>) {
    return this.client.post<WardInventoryItem>('/inventory/ward/import', data);
  }

  deleteWardSupply(id: string) {
    return this.client.delete<boolean>(`/inventory/ward/${id}`);
  }

  useWardSupply(data: Record<string, unknown>) {
    return this.client.post<WardInventoryItem>('/inventory/ward/use', data);
  }

  getReturnHistory(filters?: Record<string, unknown>) {
    return this.client.get<ReturnHistoryEntry[]>('/inventory/returns', filters);
  }

  createReturn(data: any) {
    return this.client.post<ReturnHistoryEntry>('/inventory/returns', data);
  }
}

export const inventoryService = new InventoryService(apiClient);
