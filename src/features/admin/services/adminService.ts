import { apiClient } from '@/services/api/apiClient';
import { ApiAdapter } from '@/services/api/types';
import { StaffItem, PendingStaffItem } from '@/features/admin/data/staffData';
import { CategoryItem } from '@/features/admin/data/categoryData';
import { UnitItem } from '@/features/admin/data/unitData';
import { PackagingItem } from '@/features/admin/data/packagingData';
import { PermissionGroup } from '@/features/admin/data/permissionData';
import { Device } from '@/features/admin/data/deviceData';

export class AdminService {
  private client: ApiAdapter;

  constructor(client: ApiAdapter) {
    this.client = client;
  }

  getStaff(filters?: Record<string, unknown>) {
    return this.client.get<StaffItem[]>('/admin/staff', filters);
  }

  createStaff(data: Partial<StaffItem>) {
    return this.client.post<StaffItem>('/admin/staff', data);
  }

  updateStaff(id: string, data: Partial<StaffItem>) {
    return this.client.put<StaffItem>(`/admin/staff/${id}`, data);
  }

  deleteStaff(id: string) {
    return this.client.delete<boolean>(`/admin/staff/${id}`);
  }

  getCategories(filters?: Record<string, unknown>) {
    return this.client.get<CategoryItem[]>('/admin/categories', filters);
  }

  createCategory(data: Partial<CategoryItem>) {
    return this.client.post<CategoryItem>('/admin/categories', data);
  }

  updateCategory(id: string, data: Partial<CategoryItem>) {
    return this.client.put<CategoryItem>(`/admin/categories/${id}`, data);
  }

  deleteCategory(id: string) {
    return this.client.delete<boolean>(`/admin/categories/${id}`);
  }

  getUnits(filters?: Record<string, unknown>) {
    return this.client.get<UnitItem[]>('/admin/units', filters);
  }

  createUnit(data: Partial<UnitItem>) {
    return this.client.post<UnitItem>('/admin/units', data);
  }

  updateUnit(id: string, data: Partial<UnitItem>) {
    return this.client.put<UnitItem>(`/admin/units/${id}`, data);
  }

  deleteUnit(id: string) {
    return this.client.delete<boolean>(`/admin/units/${id}`);
  }

  getPackaging(filters?: Record<string, unknown>) {
    return this.client.get<PackagingItem[]>('/admin/packaging', filters);
  }

  createPackaging(data: Partial<PackagingItem>) {
    return this.client.post<PackagingItem>('/admin/packaging', data);
  }

  updatePackaging(id: string, data: Partial<PackagingItem>) {
    return this.client.put<PackagingItem>(`/admin/packaging/${id}`, data);
  }

  deletePackaging(id: string) {
    return this.client.delete<boolean>(`/admin/packaging/${id}`);
  }

  getPermissions(filters?: Record<string, unknown>) {
    return this.client.get<PermissionGroup[]>('/admin/permissions', filters);
  }

  updatePermissions(role: string, data: PermissionGroup[]) {
    return this.client.put<PermissionGroup>(`/admin/permissions/${role}`, data);
  }

  getDevices(filters?: Record<string, unknown>) {
    return this.client.get<Device[]>('/admin/devices', filters);
  }

  updateDevice(id: string, data: Partial<Device>) {
    return this.client.put<Device>(`/admin/devices/${id}`, data);
  }

  getPendingStaff(filters?: Record<string, unknown>) {
    return this.client.get<PendingStaffItem[]>('/admin/staff/pending', filters);
  }

  approveStaff(id: string) {
    return this.client.post<PendingStaffItem>(`/admin/staff/pending/${id}/approve`);
  }

  rejectStaff(id: string, reason?: string) {
    return this.client.post<PendingStaffItem>(`/admin/staff/pending/${id}/reject`, { reason });
  }
}

export const adminService = new AdminService(apiClient);
