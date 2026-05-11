import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { adminService } from '@/features/admin/services/adminService';
import { adminKeys } from '@/features/admin/hooks/useAdminQueries';
import StaffPageClient from './StaffPageClient';

export default async function StaffPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: adminKeys.staffList({}),
    queryFn: () => adminService.getStaff(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StaffPageClient />
    </HydrationBoundary>
  );
}
