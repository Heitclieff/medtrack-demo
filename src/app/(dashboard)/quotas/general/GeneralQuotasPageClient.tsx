'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
// import React, { useState, useMemo } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';
import { Snackbar } from '@components/ui';

const QuotaModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.QuotaModal), { ssr: false });

const AssignSupplyModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.AssignSupplyModal), { ssr: false });


import { QuotaItem } from '@/features/quotas/data/quotaData';
import { getGeneralQuotaColumns } from '@/features/quotas/components/generalQuotaColumns';
import { 
  useGeneralQuotaList, 
  useUpdateGeneralQuota, 
  useAssignGeneralQuota, 
  useResetGeneralQuota 
} from '@/features/quotas/hooks/useQuotaQueries';

export default function GeneralQuotasPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedQuota, setSelectedQuota] = useState<QuotaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const { data: response, isLoading } = useGeneralQuotaList();
  const quotaData: QuotaItem[] = response?.data || [];

  const updateMutation = useUpdateGeneralQuota();
  const assignMutation = useAssignGeneralQuota();
  const resetMutation = useResetGeneralQuota();

  const handleEditClick = (row: QuotaItem) => {
    setSelectedQuota(row);
    setIsModalOpen(true);
  };

  const handleResetQuota = (row: QuotaItem) => {
    if (window.confirm(`คุณต้องการรีเซ็ตค่า Min/Max ของ ${row.itemName} ใช่หรือไม่?`)) {
      resetMutation.mutate(row.id, {
        onSuccess: () => {
          setSnackbar({ open: true, message: `รีเซ็ต ${row.itemName} สำเร็จ`, severity: 'success' });
        }
      });
    }
  };

  const handleAddClick = () => {
    setIsAssignModalOpen(true);
  };

  const handleSaveQuota = (data: { minLimit: number; maxLimit: number }) => {
    if (selectedQuota) {
      updateMutation.mutate({ id: selectedQuota.id, data }, {
        onSuccess: () => {
          setSnackbar({ open: true, message: `บันทึก ${selectedQuota.itemName} สำเร็จ`, severity: 'success' });
        }
      });
    }
  };

  const handleAssignSupply = (data: { itemCode: string; itemName: string; minLimit: number; maxLimit: number }) => {
    assignMutation.mutate(data, {
      onSuccess: () => {
        setSnackbar({ open: true, message: `เพิ่ม ${data.itemName} สำเร็จ`, severity: 'success' });
      }
    });
  };

  const columns = useMemo(() => getGeneralQuotaColumns({
    onEdit: handleEditClick,
    onReset: handleResetQuota,
  }), []);

  const filteredData = quotaData.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="กำหนดเวชภัณฑ์คงคลัง (คลังใหญ่)"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'กำหนดเวชภัณฑ์คงคลัง: คลังใหญ่' }]}
        />

        <Toolbar
          actions={
            <Button 
              variant="contained" 
              onClick={handleAddClick}
              startIcon={<AddCircleIcon />}
              sx={{ height: 40, px: 2, fontWeight: 600 }}
            >
              เพิ่มเพื่อกำหนดเวชภัณฑ์
            </Button>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหาชื่อ, รหัส..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 250 }}
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
            selectable={false}
            hideInternalSearch={true}
            showControls={false}
          />
        </Box>

        <QuotaModal 
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveQuota}
          initialData={selectedQuota}
        />

        <AssignSupplyModal
          open={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          onSave={handleAssignSupply}
          mode="general"
        />

        <Snackbar
          open={snackbar.open}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      </Box>
    </DashboardLayout>
  );
}
