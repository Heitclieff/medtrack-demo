import { useQuery } from '@tanstack/react-query';
import { historyService } from '@/features/history/services/historyService';

type FilterParams = Record<string, unknown>;

export const historyKeys = {
  all: ['history'] as const,
  requisitionAll: ['history', 'requisition'] as const,
  requisitionList: (filters: FilterParams) => [...historyKeys.requisitionAll, 'list', filters] as const,
  returnAll: ['history', 'return'] as const,
  returnList: (filters: FilterParams) => [...historyKeys.returnAll, 'list', filters] as const,
  usageAll: ['history', 'usage'] as const,
  usageList: (filters: FilterParams) => [...historyKeys.usageAll, 'list', filters] as const,
};

export function useRequisitionHistoryList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: historyKeys.requisitionList(filters),
    queryFn: () => historyService.getRequisitionHistory(filters),
  });
}

export function useReturnHistoryList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: historyKeys.returnList(filters),
    queryFn: () => historyService.getReturnHistory(filters),
  });
}

export function useUsageHistoryList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: historyKeys.usageList(filters),
    queryFn: () => historyService.getUsageHistory(filters),
  });
}
