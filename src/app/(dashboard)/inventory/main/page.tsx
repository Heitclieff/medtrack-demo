import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { inventoryService } from '@/features/inventory/services/inventoryService';
import { inventoryKeys } from '@/features/inventory/hooks/useInventoryQueries';
import MainInventoryPageClient from './MainInventoryPageClient';

export default async function MainInventoryPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: inventoryKeys.list({}),
    queryFn: () => inventoryService.getAll(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainInventoryPageClient />
    </HydrationBoundary>
  );
}
