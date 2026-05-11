import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { inventoryService } from '@/features/inventory/services/inventoryService';
import { inventoryKeys } from '@/features/inventory/hooks/useInventoryQueries';
import WardInventoryPageClient from './WardInventoryPageClient';

export default async function WardInventoryPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: inventoryKeys.wardList({}),
    queryFn: () => inventoryService.getWardInventory(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WardInventoryPageClient />
    </HydrationBoundary>
  );
}
