import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { adminService } from '@/features/admin/services/adminService';
import { adminKeys } from '@/features/admin/hooks/useAdminQueries';
import UnitsPageClient from './UnitsPageClient';

export default async function UnitsPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: adminKeys.unitList({}),
    queryFn: () => adminService.getUnits(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UnitsPageClient />
    </HydrationBoundary>
  );
}
