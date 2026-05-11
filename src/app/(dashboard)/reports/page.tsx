'use client';

import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';

// Feature Components
import { ReportCard } from '@/features/reports/components';
import { StockBalanceFilterModal } from '@/features/reports/components';
import { DetailedReportFilterModal } from '@/features/reports/components';
import { QuotaComparisonFilterModal } from '@/features/reports/components';
import { MovementFilterModal } from '@/features/reports/components';
import { CategorySidebar } from '@/features/reports/components';

// Data & Types
import { reportsMockData, REPORT_CATEGORIES } from '@/features/reports/data/reportsData';

export default function ReportsPage() {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [reportSearchTerm, setReportSearchTerm] = useState('');
  
  const filteredReports = reportsMockData.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(reportSearchTerm.toLowerCase()) ||
                          r.description.toLowerCase().includes(reportSearchTerm.toLowerCase());
    const matchesCategory = activeCategory === null || r.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectReport = (id: string) => {
    setSelectedReportId(id);
    setIsFilterModalOpen(true);
  };

  const selectedReport = reportsMockData.find(r => r.id === selectedReportId);

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 3 } }}>
        <PageHeader 
          title="รายงานและสถิติ" 
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'รายงาน' }]}
        />

        <Box sx={{ mt: 1 }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 3, lg: 2.5 }}>
              <CategorySidebar 
                categories={REPORT_CATEGORIES} 
                activeCategory={activeCategory} 
                onSelect={setActiveCategory} 
                searchTerm={reportSearchTerm}
                onSearchChange={setReportSearchTerm}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 9, lg: 9.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.secondary', mb: 2, textTransform: 'uppercase' }}>
                {activeCategory || 'รายการรายงานทั้งหมด'}
              </Typography>
              <Grid container spacing={2}>
                {filteredReports.map((report) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={report.id}>
                    <ReportCard {...report} onClick={handleSelectReport} />
                  </Grid>
                ))}
                {filteredReports.length === 0 && (
                  <Box sx={{ py: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'text.disabled' }}>
                    <DescriptionIcon sx={{ fontSize: 48, mb: 1.5, opacity: 0.5 }} />
                    <Typography variant="body2">ไม่พบผลการค้นหารายงาน</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>

        {selectedReportId === 'stock-balance' ? (
          <StockBalanceFilterModal 
            open={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            reportId={selectedReportId}
            reportTitle={selectedReport?.title}
          />
        ) : selectedReportId === 'quota-comparison' ? (
          <QuotaComparisonFilterModal 
            open={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            reportId={selectedReportId}
            reportTitle={selectedReport?.title}
          />
        ) : (selectedReportId === 'fast-moving' || selectedReportId === 'slow-moving') ? (
          <MovementFilterModal 
            open={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            reportId={selectedReportId}
            reportTitle={selectedReport?.title}
          />
        ) : (
          <DetailedReportFilterModal 
            open={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            reportId={selectedReportId || ''}
            reportTitle={selectedReport?.title}
          />
        )}
      </Box>
    </DashboardLayout>
  );
}
