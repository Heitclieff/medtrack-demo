import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient';
import { quotaService } from '@/features/quotas/services/quotaService';
import { quotaKeys } from '@/features/quotas/hooks/useQuotaQueries';
import WardQuotasPageClient from './WardQuotasPageClient';

export default async function WardQuotasPage() {
  const queryClient = getQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: quotaKeys.wardList({}),
    queryFn: () => quotaService.getWardQuotas(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WardQuotasPageClient />
    </HydrationBoundary>
  );
}
