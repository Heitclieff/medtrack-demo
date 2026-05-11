'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
// import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Popover,
  CircularProgress
} from '@mui/material';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import FilterListIcon from '@mui/icons-material/FilterList';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';
import { Snackbar } from '@components/ui';

const SupplyReturnModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.SupplyReturnModal), { ssr: false });

import { returnHistoryColumns } from '@/features/inventory/components/returnItemHistoryColumns';
import { useReturnHistoryList, useCreateReturn } from '@/features/inventory/hooks/useInventoryQueries';
import { ReturnHistoryEntry } from '@/features/inventory/data/returnItemData';

export default function ReturnItemPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const { data: response, isLoading } = useReturnHistoryList();
  const returnHistoryData: ReturnHistoryEntry[] = response?.data || [];
  
  const createMutation = useCreateReturn();

  const handleReturnConfirm = (data: any[]) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setSnackbar({
          open: true,
          message: 'คืนสำเร็จ',
          severity: 'success'
        });
        setIsModalOpen(false);
      }
    });
  };

  const filteredData = returnHistoryData.filter(h => 
    h.returnCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.items.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="ประวัติรายการคืนพัสดุและเวชภัณฑ์ (คลังวอร์ด)"
          breadcrumbs={[
            { label: 'Home', href: '/' }, 
            { label: 'คืนเวชภัณฑ์พัสดุ' }
          ]}
        />
        
        <Toolbar
          actions={
            <Button 
              variant="contained" 
              startIcon={<AssignmentReturnIcon />}
              onClick={() => setIsModalOpen(true)}
              sx={{ px: 3, height: 40 }}
            >
              คืนเวชภัณฑ์
            </Button>
          }
          search={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  color: 'text.secondary',
                  borderColor: 'divider',
                  px: 2,
                  height: 40,
                }}
              >
                กรองข้อมูล
              </Button>

              <SearchField label="ค้นหา" 
                placeholder="ค้นหารหัสการคืน..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 250 }}
              />
            </Box>
          }
        >
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ sx: { p: 2, mt: 1, width: 200, boxShadow: 3, borderRadius: 2 } }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>เร็วๆ นี้...</Typography>
          </Popover>
        </Toolbar>

        <Box sx={{ '& .MuiPaper-root': { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }, position: 'relative', minHeight: 400 }}>
          {isLoading && (
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.7)', zIndex: 10 }}>
              <CircularProgress />
            </Box>
          )}
          <DataTable 
            columns={returnHistoryColumns} 
            data={filteredData} 
            hideInternalSearch={true}
            showControls={false}
          />
        </Box>

        <SupplyReturnModal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handleReturnConfirm}
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
