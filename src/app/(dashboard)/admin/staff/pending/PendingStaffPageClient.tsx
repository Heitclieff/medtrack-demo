'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
// import React, { useState, useMemo } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';
const PendingStaffViewModal = dynamic(() => import('@/features/admin/components').then(mod => mod.PendingStaffViewModal), { ssr: false });


import { PendingStaffItem } from '@/features/admin/data/staffData';
import { getPendingStaffColumns } from '@/features/admin/components/pendingStaffColumns';
import { usePendingStaffList, useApproveStaff, useRejectStaff } from '@/features/admin/hooks/useAdminQueries';

export default function PendingStaffPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PendingStaffItem | null>(null);

  const { data: response, isLoading } = usePendingStaffList();
  const pendingData: PendingStaffItem[] = response?.data || [];

  const approveMutation = useApproveStaff();
  const rejectMutation = useRejectStaff();

  const handleViewClick = (item: PendingStaffItem) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const handleApprove = (item: PendingStaffItem) => {
    if (window.confirm(`คุณต้องการอนุมัติ ${item.name} ใช่หรือไม่?`)) {
      approveMutation.mutate(item.id);
      setIsViewModalOpen(false);
    }
  };

  const handleReject = (item: PendingStaffItem) => {
    if (window.confirm(`คุณต้องการปฏิเสธ ${item.name} ใช่หรือไม่?`)) {
      rejectMutation.mutate({ id: item.id });
      setIsViewModalOpen(false);
    }
  };

  const columns = useMemo(() => getPendingStaffColumns({
    onApprove: handleApprove,
    onReject: handleReject,
  }), []);

  const filteredData = pendingData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="รายชื่อผู้สมัครรออนุมัติ"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'รายชื่อผู้สมัครรออนุมัติ' }
          ]}
        />

        <Toolbar
          actions={
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
              รายการรอตรวจสอบ ({filteredData.length})
            </Typography>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหาชื่อ, หน่วยงาน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 250 }}
            />
          }
        />

        <Box sx={{ '& .MuiPaper-root': { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }, position: 'relative', minHeight: 300 }}>
          {isLoading && (
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.7)', zIndex: 10 }}>
              <CircularProgress />
            </Box>
          )}
          <DataTable 
            title="ผู้สมัครทั้งหมด"
            columns={columns}
            data={filteredData}
            hideInternalSearch={true}
            showControls={false}
            onRowDoubleClick={handleViewClick}
          />
        </Box>

        <PendingStaffViewModal
          open={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          onApprove={handleApprove}
          onReject={handleReject}
          data={selectedItem}
        />
      </Box>
    </DashboardLayout>
  );
}
