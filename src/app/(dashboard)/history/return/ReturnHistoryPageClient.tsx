'use client';

import React, { useState, useMemo } from 'react';
import { Box, CircularProgress } from '@mui/material';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';

import { getReturnHistoryColumns } from '@/features/history/components/returnHistoryColumns';
import { useReturnHistoryList } from '@/features/history/hooks/useHistoryQueries';
import { ReturnHistoryItem } from '@/features/history/data/historyData';

export default function ReturnHistoryPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: response, isLoading } = useReturnHistoryList();
  const returnHistoryData: ReturnHistoryItem[] = response?.data || [];
  
  const columns = useMemo(() => getReturnHistoryColumns(), []);

  const filteredData = returnHistoryData.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.returnedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="ประวัติการคืนเวชภัณฑ์พัสดุ"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'ประวัติการคืนเวชภัณฑ์พัสดุ' }]}
        />
        
        <Toolbar
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหารหัส, ชื่อ, ผู้ส่งคืน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 300 }}
            />
          }
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
            title="ข้อมูลประวัติการคืน" 
            hideInternalSearch={true}
            showControls={false}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
