import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { inventoryService } from '@/features/inventory/services/inventoryService';
import { inventoryKeys } from '@/features/inventory/hooks/useInventoryQueries';
import ReturnItemPageClient from './ReturnItemPageClient';

export default async function ReturnItemPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: inventoryKeys.returnList({}),
    queryFn: () => inventoryService.getReturnHistory(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReturnItemPageClient />
    </HydrationBoundary>
  );
}
