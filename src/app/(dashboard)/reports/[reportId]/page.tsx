'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';

// Data & Helpers
import { REPORT_TITLES, getReportMockData } from '@/features/reports/data/reportResultData';
import { getReportResultColumns } from '@/features/reports/components/reportResultColumns';

export default function ReportResultPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.reportId as string;
  
  const title = REPORT_TITLES[reportId] || 'รายงาน';

  const columns = useMemo(() => getReportResultColumns(reportId), [reportId]);
  const data = useMemo(() => getReportMockData(reportId), [reportId]);

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 3 } }}>
        <PageHeader 
          title={title} 
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'รายงาน', href: '/reports' },
            { label: title }
          ]}
        />

        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-start' }}>
          <Button 
            onClick={() => router.push('/reports')}
            variant="outlined" 
            size="small"
            startIcon={<ArrowBackIcon />}
            sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary', borderColor: 'divider' }}
          >
            ย้อนกลับไปหน้ารายงาน
          </Button>
        </Box>

        <Box>
          <DataTable 
            title={`ผลการประมวลผล : ${title}`}
            columns={columns}
            data={data}
            selectable={false}
            showControls={true}
            searchPlaceholder="ค้นหาในรายงาน..."
            topActions={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" size="small" startIcon={<FileDownloadIcon />} sx={{ textTransform: 'none', fontWeight: 600, borderColor: 'divider', color: 'text.primary', height: 32 }}>
                  Export Excel
                </Button>
                <Button variant="contained" color="success" size="small" startIcon={<PrintIcon />} sx={{ textTransform: 'none', fontWeight: 600, boxShadow: 'none', height: 32 }}>
                  พิมพ์รายงาน
                </Button>
              </Box>
            }
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
