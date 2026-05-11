import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { adminService } from '@/features/admin/services/adminService';
import { adminKeys } from '@/features/admin/hooks/useAdminQueries';
import CategoriesPageClient from './CategoriesPageClient';

export default async function CategoriesPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: adminKeys.categoryList({}),
    queryFn: () => adminService.getCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoriesPageClient />
    </HydrationBoundary>
  );
}
