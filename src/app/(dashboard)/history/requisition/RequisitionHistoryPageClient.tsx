'use client';

import React, { useState, useMemo } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';

import { RequisitionHistoryItem } from '@/features/history/data/historyData';
import { getRequisitionHistoryColumns } from '@/features/history/components/requisitionHistoryColumns';
import { RequisitionFilterPopover } from '@/features/history/components';
import { useRequisitionHistoryList } from '@/features/history/hooks/useHistoryQueries';

export default function RequisitionHistoryPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'ทั้งหมด',
    dateType: 'request' as 'request' | 'approval',
    startDate: '',
    endDate: '',
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data: response, isLoading } = useRequisitionHistoryList(filters);
  const filteredDataUnfiltered: RequisitionHistoryItem[] = response?.data || [];

  const handleOpenFilter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'ทั้งหมด',
      dateType: 'request',
      startDate: '',
      endDate: '',
    });
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const activeFilterCount = [
    filters.category !== 'ทั้งหมด',
    filters.dateType !== 'request',
    filters.startDate !== '' || filters.endDate !== '',
  ].filter(Boolean).length;

  const handlePrint = (item: RequisitionHistoryItem) => {
    console.log('Printing requisition history:', item);
  };

  const columns = useMemo(() => getRequisitionHistoryColumns({
    onPrint: handlePrint,
  }), []);

  const filteredData = filteredDataUnfiltered.filter(item => {
    const matchesSearch = 
      item.ward.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.docNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filters.category !== 'ทั้งหมด' && item.category !== filters.category) return false;

    if (filters.startDate || filters.endDate) {
      const dateStr = filters.dateType === 'request' ? item.requestDate : item.approvalDate;
      if (filters.startDate && dateStr < filters.startDate) return false;
      if (filters.endDate && dateStr > filters.endDate) return false;
    }

    return true;
  });

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="รายการประวัติการเบิกพัสดุและเวชภัณฑ์"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'ประวัติการเบิก' }
          ]}
        />

        <Toolbar
          actions={
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleOpenFilter}
              sx={{ 
                height: 40,
                color: activeFilterCount > 0 ? 'primary.main' : 'text.secondary',
                borderColor: activeFilterCount > 0 ? 'primary.main' : 'divider',
              }}
            >
              กรองข้อมูล {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหาใบเบิก, คลัง, ผู้เบิก..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
            />
          }
        />

        <RequisitionFilterPopover 
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        <Box sx={{ '& .MuiPaper-root': { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }, position: 'relative', minHeight: 400 }}>
          {isLoading && (
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.7)', zIndex: 10 }}>
              <CircularProgress />
            </Box>
          )}
          <DataTable 
            columns={columns}
            data={filteredData}
            hideInternalSearch={true}
            showControls={false}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
