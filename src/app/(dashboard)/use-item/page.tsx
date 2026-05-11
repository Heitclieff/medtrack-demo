'use client';

import React, { useState, useMemo } from 'react';
import { Box, Button, Typography, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel } from '@mui/material';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';
import { Snackbar } from '@components/ui';

// Feature Components
import { SupplyUsageModal } from '@/features/inventory/components';

// Data & Helpers
import { usageMockData, UsageInventoryItem, USAGE_CATEGORIES } from '@/features/usage/data/usageData';
import { getUsageColumns } from '@/features/usage/components/usageColumns';

export default function UsagePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ทุกหมวดหมู่');
  const [inventoryData, setInventoryData] = useState<UsageInventoryItem[]>(usageMockData);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [usageInitialItem, setUsageInitialItem] = useState<{ id: string; itemCode: string; itemName: string } | null>(null);
  const [pendingUsageData, setPendingUsageData] = useState<{ item: any; quantity: number } | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleUseItem = (row: UsageInventoryItem) => {
    setPendingUsageData({ 
      item: { itemName: row.name, itemCode: row.code, unit: row.unit }, 
      quantity: 1
    });
    setIsConfirmDialogOpen(true);
  };

  const columns = useMemo(() => getUsageColumns({
    onUse: handleUseItem,
  }), []);

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ทุกหมวดหมู่' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="รายการพัสดุและเวชภัณฑ์ (คลังวอร์ด)"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'รายการพัสดุและเวชภัณฑ์ (คลังวอร์ด)' }
          ]}
        />

        <Toolbar
          actions={
            <Button 
              variant="contained" 
              startIcon={<ShoppingCartCheckoutOutlinedIcon />}
              onClick={() => {
                setUsageInitialItem(null);
                setIsUsageModalOpen(true);
              }}
              sx={{ 
                bgcolor: 'warning.main', 
                color: 'warning.contrastText',
                '&:hover': { bgcolor: 'warning.dark' }, 
                px: 2,
                fontWeight: 600,
                height: 40
              }}
            >
              ใช้เวชภัณฑ์และพัสดุ
            </Button>
          }
          search={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel shrink id="category-filter-label">หมวดหมู่</InputLabel>
                <Select
                  labelId="category-filter-label"
                  label="หมวดหมู่"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  IconComponent={FilterListIcon}
                >
                  {USAGE_CATEGORIES.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <SearchField label="ค้นหา" 
                placeholder="ค้นหาชื่อ, รหัส..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 250 }}
              />
            </Box>
          }
        />

        <Box sx={{ '& .MuiPaper-root': { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' } }}>
          <DataTable 
            columns={columns}
            data={filteredData}
            hideInternalSearch={true}
            showControls={false}
          />
        </Box>

        <SupplyUsageModal 
          open={isUsageModalOpen}
          initialItem={usageInitialItem}
          onClose={() => setIsUsageModalOpen(false)}
          onConfirm={(data) => {
            setPendingUsageData(data);
            setIsConfirmDialogOpen(true);
          }}
        />

        <Dialog 
          open={isConfirmDialogOpen} 
          onClose={() => setIsConfirmDialogOpen(false)}
          PaperProps={{ sx: { borderRadius: 1, minWidth: 400 } }}
        >
          <DialogTitle sx={{ fontWeight: 500 }}>
            ยืนยันการทำรายการ?
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" color="text.secondary">
              คุณแน่ใจหรือไม่ที่จะบันทึกการใช้งาน <strong>{pendingUsageData?.item.itemName}</strong> จำนวน <strong>{pendingUsageData?.quantity} {pendingUsageData?.item.unit || 'ชิ้น'}</strong>
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setIsConfirmDialogOpen(false)} sx={{ fontWeight: 600 }}>ยกเลิก</Button>
            <Button 
              variant="contained"
              onClick={() => {
                if (pendingUsageData) {
                  setInventoryData(prev => prev.filter(item => item.code !== pendingUsageData.item.itemCode));
                  setIsConfirmDialogOpen(false);
                  setIsUsageModalOpen(false);
                  setSnackbar({
                    open: true,
                    message: `ใช้ ${pendingUsageData.item.itemName} สำเร็จ`,
                    severity: 'success',
                  });
                }
              }}
              sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', fontWeight: 600, px: 3 }}
            >
              ใช้
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        />
      </Box>
    </DashboardLayout>
  );
}
