import React from 'react';
import RequisitionDetailPageClient from './RequisitionDetailPageClient';

// In Next.js App Router, params are passed as a prop
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RequisitionDetailPageClient id={id} />;
}
