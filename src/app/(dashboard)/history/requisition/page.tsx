import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { historyService } from '@/features/history/services/historyService';
import { historyKeys } from '@/features/history/hooks/useHistoryQueries';
import RequisitionHistoryPageClient from './RequisitionHistoryPageClient';

export default async function RequisitionHistoryPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: historyKeys.requisitionList({}),
    queryFn: () => historyService.getRequisitionHistory({}),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RequisitionHistoryPageClient />
    </HydrationBoundary>
  );
}
