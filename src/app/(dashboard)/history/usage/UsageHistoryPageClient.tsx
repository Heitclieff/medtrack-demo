'use client';

import React, { useState, useMemo } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';

import { UsageHistoryItem } from '@/features/history/data/historyData';
import { getUsageHistoryColumns } from '@/features/history/components/usageHistoryColumns';
import { UsageFilterPopover } from '@/features/history/components';
import { useUsageHistoryList } from '@/features/history/hooks/useHistoryQueries';

export default function UsageHistoryPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    ward: 'ทุกคลังวอร์ด',
    startDate: '',
    endDate: '',
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { data: response, isLoading } = useUsageHistoryList(filters);
  const usageHistoryData: UsageHistoryItem[] = response?.data || [];

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResetFilters = () => {
    setFilters({
      ward: 'ทุกคลังวอร์ด',
      startDate: '',
      endDate: '',
    });
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const activeFilterCount = [
    filters.ward !== 'ทุกคลังวอร์ด',
    filters.startDate !== '' || filters.endDate !== '',
  ].filter(Boolean).length;

  const handlePrint = (item: UsageHistoryItem) => {
    console.log('Printing usage history:', item);
    // Add print logic here
  };

  const columns = useMemo(() => getUsageHistoryColumns({
    onPrint: handlePrint,
  }), []);

  const filteredData = usageHistoryData.filter(item => {
    const matchesSearch = item.usedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWard = filters.ward === 'ทุกคลังวอร์ด' || item.ward === filters.ward;
    
    let matchesDate = true;
    if (filters.startDate || filters.endDate) {
      if (filters.startDate && item.date < filters.startDate) matchesDate = false;
      if (filters.endDate && item.date > filters.endDate) matchesDate = false;
    }

    return matchesSearch && matchesWard && matchesDate;
  });

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="ประวัติการนำไปใช้"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'ประวัติการนำไปใช้' }]}
        />
        
        <Toolbar
          actions={
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
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
              placeholder="ค้นหาผู้นำไปใช้..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 250 }}
            />
          }
        />

        <UsageFilterPopover 
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
            title="รายการประวัติการนำไปใช้พัสดุและเวชภัณฑ์" 
            hideInternalSearch={true}
            showControls={false}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
