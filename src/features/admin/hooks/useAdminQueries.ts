import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/features/admin/services/adminService';
import { StaffItem, PendingStaffItem } from '@/features/admin/data/staffData';
import { CategoryItem } from '@/features/admin/data/categoryData';
import { UnitItem } from '@/features/admin/data/unitData';
import { PackagingItem } from '@/features/admin/data/packagingData';
import { PermissionGroup } from '@/features/admin/data/permissionData';
import { Device } from '@/features/admin/data/deviceData';

type FilterParams = Record<string, unknown>;

export const adminKeys = {
  allStaff: ['admin', 'staff'] as const,
  staffList: (filters: FilterParams) => [...adminKeys.allStaff, 'list', filters] as const,
  allCategories: ['admin', 'categories'] as const,
  categoryList: (filters: FilterParams) => [...adminKeys.allCategories, 'list', filters] as const,
  allUnits: ['admin', 'units'] as const,
  unitList: (filters: FilterParams) => [...adminKeys.allUnits, 'list', filters] as const,
  allPackaging: ['admin', 'packaging'] as const,
  packagingList: (filters: FilterParams) => [...adminKeys.allPackaging, 'list', filters] as const,
  allPermissions: ['admin', 'permissions'] as const,
  permissionsList: (filters: FilterParams) => [...adminKeys.allPermissions, 'list', filters] as const,
  allDevices: ['admin', 'devices'] as const,
  deviceList: (filters: FilterParams) => [...adminKeys.allDevices, 'list', filters] as const,
  allPendingStaff: ['admin', 'staff', 'pending'] as const,
  pendingStaffList: (filters: FilterParams) => [...adminKeys.allPendingStaff, 'list', filters] as const,
};

export function useStaffList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: adminKeys.staffList(filters),
    queryFn: () => adminService.getStaff(filters),
  });
}

export function useCreateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<StaffItem>) => adminService.createStaff(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allStaff });
    },
  });
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<StaffItem> }) => adminService.updateStaff(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allStaff });
    },
  });
}

export function useDeleteStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allStaff });
    },
  });
}

export function useCategoryList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: adminKeys.categoryList(filters),
    queryFn: () => adminService.getCategories(filters),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<CategoryItem>) => adminService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allCategories });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CategoryItem> }) => adminService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allCategories });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allCategories });
    },
  });
}

export function useUnitList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: adminKeys.unitList(filters),
    queryFn: () => adminService.getUnits(filters),
  });
}

export function useCreateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<UnitItem>) => adminService.createUnit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allUnits });
    },
  });
}

export function useUpdateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UnitItem> }) => adminService.updateUnit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allUnits });
    },
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteUnit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allUnits });
    },
  });
}

export function usePackagingList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: adminKeys.packagingList(filters),
    queryFn: () => adminService.getPackaging(filters),
  });
}

export function useCreatePackaging() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<PackagingItem>) => adminService.createPackaging(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allPackaging });
    },
  });
}

export function useUpdatePackaging() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PackagingItem> }) => adminService.updatePackaging(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allPackaging });
    },
  });
}

export function useDeletePackaging() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deletePackaging(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allPackaging });
    },
  });
}

export function usePermissionsList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: adminKeys.permissionsList(filters),
    queryFn: () => adminService.getPermissions(filters),
  });
}

export function useUpdatePermissions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ role, data }: { role: string; data: PermissionGroup[] }) => adminService.updatePermissions(role, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allPermissions });
    },
  });
}

export function useDeviceList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: adminKeys.deviceList(filters),
    queryFn: () => adminService.getDevices(filters),
  });
}

export function useUpdateDevice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Device> }) => adminService.updateDevice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allDevices });
    },
  });
}

export function usePendingStaffList(filters: FilterParams = {}) {
  return useQuery({
    queryKey: adminKeys.pendingStaffList(filters),
    queryFn: () => adminService.getPendingStaff(filters),
  });
}

export function useApproveStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.approveStaff(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allPendingStaff });
      queryClient.invalidateQueries({ queryKey: adminKeys.allStaff });
    },
  });
}

export function useRejectStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) => adminService.rejectStaff(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.allPendingStaff });
    },
  });
}
