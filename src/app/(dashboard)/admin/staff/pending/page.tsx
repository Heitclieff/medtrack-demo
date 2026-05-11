import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { adminService } from '@/features/admin/services/adminService';
import { adminKeys } from '@/features/admin/hooks/useAdminQueries';
import PendingStaffPageClient from './PendingStaffPageClient';

export default async function PendingStaffPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: adminKeys.pendingStaffList({}),
    queryFn: () => adminService.getPendingStaff(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PendingStaffPageClient />
    </HydrationBoundary>
  );
}
