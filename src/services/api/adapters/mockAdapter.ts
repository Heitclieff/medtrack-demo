import { ApiAdapter, ApiResponse } from '../types';

import { initialMockData as inventoryData } from '@/features/inventory/data/inventoryData';
import { initialStaffMockData as staffData } from '@/features/admin/data/staffData';
import { initialUnitMockData as unitData } from '@/features/admin/data/unitData';
import { initialPackagingMockData as packagingData } from '@/features/admin/data/packagingData';
import { initialCategoryMockData as categoryData } from '@/features/admin/data/categoryData';

export class MockAdapter implements ApiAdapter {
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    await this.delay(300);

    let data: any = [];

    if (url.includes('/history/requisitions')) {
      const { initialRequisitionHistoryMockData } = await import('@/features/history/data/historyData');
      data = initialRequisitionHistoryMockData;
    } else if (url.includes('/history/returns')) {
      const { initialReturnHistoryMockData } = await import('@/features/history/data/historyData');
      data = initialReturnHistoryMockData;
    } else if (url.includes('/history/usage')) {
      const { initialUsageHistoryMockData } = await import('@/features/history/data/historyData');
      data = initialUsageHistoryMockData;
    } else if (url.includes('/quotas/ward')) {
      const { wardQuotaMockData } = await import('@/features/quotas/data/quotaData');
      data = wardQuotaMockData;
    } else if (url.includes('/quotas/general')) {
      const { generalQuotaMockData } = await import('@/features/quotas/data/quotaData');
      data = generalQuotaMockData;
    } else if (url.includes('/requisition/pending')) {
      const { requisitionMockData } = await import('@/features/requisition/data/requisitionData');
      data = requisitionMockData;
    } else if (url.includes('/inventory/returns')) {
      const { returnHistoryMock } = await import('@/features/inventory/data/returnItemData');
      data = returnHistoryMock;
    } else if (url.includes('/inventory/ward')) {
      const { initialWardInventoryMockData } = await import('@/features/inventory/data/wardInventoryData');
      data = initialWardInventoryMockData;
    } else if (url.includes('/inventory')) {
      data = inventoryData;
    } else if (url.includes('/admin/staff/pending')) {
      const { initialPendingStaffMockData } = await import('@/features/admin/data/staffData');
      data = initialPendingStaffMockData;
    } else if (url.includes('/admin/staff')) {
      data = staffData;
    } else if (url.includes('/admin/permissions')) {
      data = { roles: ['ผู้ดูแลระบบ'], permissions: {} };
    } else if (url.includes('/admin/devices')) {
      const { initialDeviceMockData } = await import('@/features/admin/data/deviceData');
      data = initialDeviceMockData;
    } else if (url.includes('/auth/me')) {
      data = {
        id: '1',
        username: 'admin',
        firstName: 'กิตติทัช',
        lastName: 'พูลประเสริฐ',
        role: 'ผู้ดูแลระบบ',
        email: 'kittituch@example.com',
      };
    } else if (url.includes('/admin/units')) {
      data = unitData;
    } else if (url.includes('/admin/packaging')) {
      data = packagingData;
    } else if (url.includes('/admin/categories')) {
      data = categoryData;
    } else {
      data = [];
    }

    return {
      data: data as T,
      message: 'Success (Mock)',
    };
  }

  async post<T>(url: string, body?: unknown): Promise<ApiResponse<T>> {
    await this.delay(500);

    if (url.includes('/auth/login')) {
      return {
        data: {
          token: 'mock-jwt-token-access',
          user: {
            id: '1',
            username: 'admin',
            role: 'ผู้ดูแลระบบ',
          },
        } as unknown as T,
        message: 'Login Success (Mock)',
      };
    }

    return {
      data: { ...((body as any) || {}), id: Date.now().toString() } as unknown as T,
      message: 'Created Successfully (Mock)',
    };
  }

  async put<T>(url: string, body?: unknown): Promise<ApiResponse<T>> {
    await this.delay(400);
    return {
      data: { ...((body as any) || {}) } as unknown as T,
      message: 'Updated Successfully (Mock)',
    };
  }

  async patch<T>(url: string, body?: unknown): Promise<ApiResponse<T>> {
    await this.delay(400);
    return {
      data: { ...((body as any) || {}) } as unknown as T,
      message: 'Patched Successfully (Mock)',
    };
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    await this.delay(400);
    return {
      data: {} as T,
      message: 'Deleted Successfully (Mock)',
    };
  }
}

export const mockAdapter = new MockAdapter();
