import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { historyService } from '@/features/history/services/historyService';
import { historyKeys } from '@/features/history/hooks/useHistoryQueries';
import UsageHistoryPageClient from './UsageHistoryPageClient';

export default async function UsageHistoryPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: historyKeys.usageList({}),
    queryFn: () => historyService.getUsageHistory({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UsageHistoryPageClient />
    </HydrationBoundary>
  );
}
