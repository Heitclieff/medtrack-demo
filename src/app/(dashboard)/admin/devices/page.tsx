import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { adminService } from '@/features/admin/services/adminService';
import { adminKeys } from '@/features/admin/hooks/useAdminQueries';
import DevicesPageClient from './DevicesPageClient';

export default async function DevicesPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: adminKeys.deviceList({}),
    queryFn: () => adminService.getDevices(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DevicesPageClient />
    </HydrationBoundary>
  );
}
