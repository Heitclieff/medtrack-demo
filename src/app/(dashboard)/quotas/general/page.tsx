import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { quotaService } from '@/features/quotas/services/quotaService';
import { quotaKeys } from '@/features/quotas/hooks/useQuotaQueries';
import GeneralQuotasPageClient from './GeneralQuotasPageClient';

export default async function GeneralQuotasPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: quotaKeys.generalList({}),
    queryFn: () => quotaService.getGeneralQuotas(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GeneralQuotasPageClient />
    </HydrationBoundary>
  );
}
