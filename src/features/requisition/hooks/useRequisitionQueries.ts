import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requisitionService } from '@/features/requisition/services/requisitionService';

type FilterParams = Record<string, unknown>;

export const requisitionKeys = {
  all: ['requisition'] as const,
  lists: () => [...requisitionKeys.all, 'list'] as const,
  list: (filters: FilterParams) => [...requisitionKeys.lists(), filters] as const,
  pendingAll: ['requisition', 'pending'] as const,
  pendingList: (filters: FilterParams) => [...requisitionKeys.pendingAll, 'list', filters] as const,
};

export function usePendingRequisitionList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: requisitionKeys.pendingList(filters),
    queryFn: () => requisitionService.getPending(filters),
  });
}

export function useApproveRequisition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data?: Record<string, unknown> }) => requisitionService.approve(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: requisitionKeys.pendingAll });
    },
  });
}

export function useRejectRequisition() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => requisitionService.reject(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: requisitionKeys.pendingAll });
    },
  });
}
