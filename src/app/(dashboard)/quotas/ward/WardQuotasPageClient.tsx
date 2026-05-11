'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
// import React, { useState, useMemo } from 'react';
import { Box, Select, MenuItem, Stack, FormControl, InputLabel, Button, CircularProgress } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';
import { Snackbar } from '@components/ui';

const QuotaModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.QuotaModal), { ssr: false });

const AssignSupplyModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.AssignSupplyModal), { ssr: false });


import { WardQuotaItem, WARD_OPTIONS } from '@/features/quotas/data/quotaData';
import { getWardQuotaColumns } from '@/features/quotas/components/wardQuotaColumns';
import { 
  useWardQuotaList, 
  useUpdateWardQuota, 
  useAssignWardQuota, 
  useResetWardQuota 
} from '@/features/quotas/hooks/useQuotaQueries';

export default function WardQuotasPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedQuota, setSelectedQuota] = useState<WardQuotaItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [wardFilter, setWardFilter] = useState('all');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const { data: response, isLoading } = useWardQuotaList();
  const quotaData: WardQuotaItem[] = response?.data || [];

  const updateMutation = useUpdateWardQuota();
  const assignMutation = useAssignWardQuota();
  const resetMutation = useResetWardQuota();

  const handleEditClick = (row: WardQuotaItem) => {
    setSelectedQuota(row);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setIsAssignModalOpen(true);
  };

  const handleResetQuota = (row: WardQuotaItem) => {
    if (window.confirm(`คุณต้องการรีเซ็ตค่า Min/Max ของ ${row.itemName} ใช่หรือไม่?`)) {
      resetMutation.mutate(row.id, {
        onSuccess: () => {
          setSnackbar({ open: true, message: `รีเซ็ต ${row.itemName} สำเร็จ`, severity: 'success' });
        }
      });
    }
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

  const handleAssignSupply = (data: { ward?: string; itemCode: string; itemName: string; minLimit: number; maxLimit: number }) => {
    assignMutation.mutate(data, {
      onSuccess: () => {
        setSnackbar({ open: true, message: `เพิ่ม ${data.itemName} สำเร็จ`, severity: 'success' });
      }
    });
  };

  const columns = useMemo(() => getWardQuotaColumns({
    onEdit: handleEditClick,
    onReset: handleResetQuota,
  }), []);

  const filteredData = quotaData.filter(item => {
    const matchesSearch = 
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (wardFilter !== 'all' && item.ward.toLowerCase() !== wardFilter.toLowerCase()) {
      return false;
    }

    return true;
  });

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="กำหนดเวชภัณฑ์คงคลัง (คลังวอร์ด)"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'กำหนดเวชภัณฑ์คงคลัง: คลังวอร์ด' }]}
        />
        
        <Toolbar
          actions={
            <Stack direction="row" spacing={2} alignItems="center">
              <Button 
                variant="contained" 
                onClick={handleAddClick}
                startIcon={<AddCircleIcon />}
                sx={{ height: 40, px: 2, fontWeight: 600 }}
              >
                กำหนดเวชภัณฑ์คงคลัง
              </Button>
            
              <FormControl size="small" sx={{ width: 140 }}>
                <InputLabel sx={{ fontSize: '0.875rem' }}>หน่วยงาน</InputLabel>
                <Select
                  label="หน่วยงาน"
                  value={wardFilter}
                  onChange={(e) => setWardFilter(e.target.value)}
                  sx={{ height: 40, fontSize: '0.875rem' }}
                >
                  {WARD_OPTIONS.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหารหัส หรือ ชื่อเวชภัณฑ์"
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
