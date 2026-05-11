import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { adminService } from '@/features/admin/services/adminService';
import { adminKeys } from '@/features/admin/hooks/useAdminQueries';
import PermissionsPageClient from './PermissionsPageClient';

export default async function PermissionsPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: adminKeys.permissionsList({}),
    queryFn: () => adminService.getPermissions(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PermissionsPageClient />
    </HydrationBoundary>
  );
}
