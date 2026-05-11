import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryService } from '@/features/inventory/services/inventoryService';
import { InventoryItem } from '@/features/inventory/data/inventoryData';

type FilterParams = Record<string, unknown>;

export const inventoryKeys = {
  all: ['inventory'] as const,
  lists: () => [...inventoryKeys.all, 'list'] as const,
  list: (filters: FilterParams) => [...inventoryKeys.lists(), filters] as const,
  
  wardAll: ['inventory', 'ward'] as const,
  wardList: (filters: FilterParams) => [...inventoryKeys.wardAll, 'list', filters] as const,

  returnAll: ['inventory', 'return'] as const,
  returnList: (filters: FilterParams) => [...inventoryKeys.returnAll, 'list', filters] as const,
};

export function useInventoryList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: inventoryKeys.list(filters),
    queryFn: () => inventoryService.getAll(filters),
  });
}

export function useInventoryDetail(id: string) {
  return useQuery({
    queryKey: [...inventoryKeys.all, 'detail', id],
    queryFn: () => inventoryService.getById(id),
    enabled: !!id,
  });
}

export function useCreateInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<InventoryItem>) => inventoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });
    },
  });
}

export function useUpdateInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InventoryItem> }) => inventoryService.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: [...inventoryKeys.all, 'detail', variables.id] });
    },
  });
}

export function useDeleteInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.lists() });
    },
  });
}

export function useWardInventoryList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: inventoryKeys.wardList(filters),
    queryFn: () => inventoryService.getWardInventory(filters),
  });
}

export function useImportWardSupply() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => inventoryService.importWardSupply(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.wardAll });
      queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
    },
  });
}

export function useConsumeWardSupply() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => inventoryService.useWardSupply(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.wardAll });
    },
  });
}

export function useReturnHistoryList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: inventoryKeys.returnList(filters),
    queryFn: () => inventoryService.getReturnHistory(filters),
  });
}

export function useCreateReturn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => inventoryService.createReturn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inventoryKeys.returnAll });
    },
  });
}

export function useWardSupplyUsage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => inventoryService.useWardSupply(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: inventoryKeys.wardAll }),
  });
}
export function useDeleteWardSupply() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inventoryService.deleteWardSupply(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: inventoryKeys.wardAll }),
  });
}
