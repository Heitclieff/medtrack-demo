import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { historyService } from '@/features/history/services/historyService';
import { historyKeys } from '@/features/history/hooks/useHistoryQueries';
import ReturnHistoryPageClient from './ReturnHistoryPageClient';

export default async function ReturnHistoryPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: historyKeys.returnList({}),
    queryFn: () => historyService.getReturnHistory({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReturnHistoryPageClient />
    </HydrationBoundary>
  );
}
