import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quotaService } from '@/features/quotas/services/quotaService';
import { WardQuotaItem, QuotaItem } from '@/features/quotas/data/quotaData';

type FilterParams = Record<string, unknown>;

export const quotaKeys = {
  all: ['quotas'] as const,
  wardAll: ['quotas', 'ward'] as const,
  wardList: (filters: FilterParams) => [...quotaKeys.wardAll, 'list', filters] as const,
  generalAll: ['quotas', 'general'] as const,
  generalList: (filters: FilterParams) => [...quotaKeys.generalAll, 'list', filters] as const,
};

export function useWardQuotaList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: quotaKeys.wardList(filters),
    queryFn: () => quotaService.getWardQuotas(filters),
  });
}

export function useUpdateWardQuota() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Pick<WardQuotaItem, 'minLimit' | 'maxLimit'> }) => 
      quotaService.updateWardQuota(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quotaKeys.wardAll });
    },
  });
}

export function useAssignWardQuota() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<WardQuotaItem>) => quotaService.assignWardQuota(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quotaKeys.wardAll });
    },
  });
}

export function useResetWardQuota() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => quotaService.resetWardQuota(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quotaKeys.wardAll });
    },
  });
}

export function useGeneralQuotaList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: quotaKeys.generalList(filters),
    queryFn: () => quotaService.getGeneralQuotas(filters),
  });
}

export function useUpdateGeneralQuota() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Pick<QuotaItem, 'minLimit' | 'maxLimit'> }) => 
      quotaService.updateGeneralQuota(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quotaKeys.generalAll });
    },
  });
}

export function useAssignGeneralQuota() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<QuotaItem>) => quotaService.assignGeneralQuota(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quotaKeys.generalAll });
    },
  });
}

export function useResetGeneralQuota() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => quotaService.resetGeneralQuota(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: quotaKeys.generalAll });
    },
  });
}
