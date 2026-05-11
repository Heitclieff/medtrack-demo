import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { adminService } from '@/features/admin/services/adminService';
import { adminKeys } from '@/features/admin/hooks/useAdminQueries';
import PackagingPageClient from './PackagingPageClient';

export default async function PackagingPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: adminKeys.packagingList({}),
    queryFn: () => adminService.getPackaging(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PackagingPageClient />
    </HydrationBoundary>
  );
}
