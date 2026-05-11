'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
// import React, { useState, useMemo } from 'react';
import { Box, Button, Stack, CircularProgress } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListIcon from '@mui/icons-material/FilterList';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';
import { Snackbar } from '@components/ui';
import { IconButton, Tooltip } from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const SupplyImportModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.SupplyImportModal), { ssr: false });

const SupplyRequestModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.SupplyRequestModal), { ssr: false });
const SupplyBulkRequestModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.SupplyBulkRequestModal), { ssr: false });

const SupplyUsageModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.SupplyUsageModal), { ssr: false });
const BarcodeScannerModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.BarcodeScannerModal), { ssr: false });

import { WardInventoryFilterPopover } from '@/features/inventory/components';

import { WardInventoryItem } from '@/features/inventory/data/wardInventoryData';
import { SupplyItem } from '@/features/inventory/data/supplyOptions';
import { getWardInventoryColumns } from '@/features/inventory/components/wardInventoryColumns';
import { 
  useWardInventoryList, 
  useImportWardSupply, 
  useWardSupplyUsage, 
  useDeleteWardSupply 
} from '@/features/inventory/hooks/useInventoryQueries';

export default function WardInventoryPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'ทุกหมวดหมู่',
    expiryStatus: 'ทั้งหมด',
    stockStatus: 'ทั้งหมด',
    startDate: null as Date | null,
    endDate: null as Date | null,
  });
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  
  const { data: response, isLoading } = useWardInventoryList();
  const inventoryData: WardInventoryItem[] = response?.data || [];

  const importMutation = useImportWardSupply();
  const usageMutation = useWardSupplyUsage();
  const deleteMutation = useDeleteWardSupply();

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isBulkRequestModalOpen, setIsBulkRequestModalOpen] = useState(false);
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SupplyItem | null>(null);
  
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const [requisitionBasket, setRequisitionBasket] = useState<any[]>([]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'ทุกหมวดหมู่',
      expiryStatus: 'ทั้งหมด',
      stockStatus: 'ทั้งหมด',
      startDate: null,
      endDate: null,
    });
  };

  const handleRequest = (item: WardInventoryItem) => {
    setSelectedItem({ 
      id: item.id, 
      itemCode: item.code, 
      itemName: item.name,
      unit: item.unit || 'ชิ้น',
      mainStockBalance: 486, // Mocked as per image
      currentBalance: item.balance,
      pendingQuantity: 10,  // Mocked as per image
      quota: 2             // Mocked as per image
    });
    setIsRequestModalOpen(true);
  };

  const handleUse = (item: WardInventoryItem) => {
    setSelectedItem({ 
      id: item.id, 
      itemCode: item.code, 
      itemName: item.name,
      unit: item.unit || 'ชิ้น',
      mainStockBalance: 0,
      currentBalance: item.balance,
      pendingQuantity: 0,
      quota: 0
    });
    setIsUsageModalOpen(true);
  };

  const handleDelete = (item: WardInventoryItem) => {
    if (confirm(`คุณต้องการลบ ${item.name} ใช่หรือไม่?`)) {
      deleteMutation.mutate(item.id, {
        onSuccess: () => {
          setSnackbar({ open: true, message: `ลบ ${item.name} สำเร็จ`, severity: 'success' });
        }
      });
    }
  };

  const columns = useMemo(() => getWardInventoryColumns({
    onRequest: handleRequest,
    onUse: handleUse,
    onDelete: handleDelete,
  }), []);

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    const matchesCategory = filters.category === 'ทุกหมวดหมู่' || item.category === filters.category;
    if (!matchesCategory) return false;

    if (filters.stockStatus !== 'ทั้งหมด') {
      const balance = item.balance;
      if (filters.stockStatus === 'ใกล้หมด' && (balance <= 0 || balance > 10)) return false;
      if (filters.stockStatus === 'หมดพัสดุ' && balance !== 0) return false;
      if (filters.stockStatus === 'คงคลัง' && balance <= 10) return false;
    }

    return true;
  });

  const activeFilterCount = [
    filters.category !== 'ทุกหมวดหมู่',
    filters.expiryStatus !== 'ทั้งหมด',
    filters.stockStatus !== 'ทั้งหมด',
    filters.startDate !== null
  ].filter(Boolean).length;

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="ทะเบียนพัสดุและเวชภัณฑ์ (คลังวอร์ด)"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'คลังวอร์ด' }]}
        />
        
        <Toolbar
          actions={
            <Stack direction="row" spacing={1}>
              <Button 
                variant="contained" 
                startIcon={<AddCircleIcon />}
                onClick={() => setIsImportModalOpen(true)}
                sx={{ textTransform: 'none', px: 2, height: 40 }}
              >
                นำเข้าเวชภัณฑ์และพัสดุใหม่
              </Button>
              <Button 
                variant="contained" 
                startIcon={<ShoppingCartIcon />}
                onClick={() => {
                  setIsBulkRequestModalOpen(true);
                }}
                sx={{ 
                  bgcolor: 'warning.main',
                  color: 'warning.contrastText',
                  '&:hover': { bgcolor: 'warning.dark' },
                  textTransform: 'none', 
                  px: 2,
                  height: 40,
                  fontWeight: 600,
                  position: 'relative',
                }}
              >
                รายการเบิกเวชภัณฑ์
                {requisitionBasket.length > 0 && (
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: -8, 
                      right: -8, 
                      bgcolor: 'error.main', 
                      color: 'white', 
                      borderRadius: '50%', 
                      width: 20, 
                      height: 20, 
                      fontSize: '11px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: 700,
                      border: '2px solid white'
                    }}
                  >
                    {requisitionBasket.length}
                  </Box>
                )}
              </Button>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  height: 40,
                  color: activeFilterCount > 0 ? 'primary.main' : 'text.secondary',
                  borderColor: activeFilterCount > 0 ? 'primary.main' : 'divider',
                }}
              >
                กรองข้อมูล {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </Stack>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหาชื่อ, รหัส..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 250 }}
              endAdornment={
                <Tooltip title="สแกนบาร์โค้ด">
                  <IconButton 
                    size="small" 
                    onClick={() => setIsScannerModalOpen(true)}
                    sx={{ color: 'text.secondary', p: 0.5 }}
                  >
                    <QrCodeScannerIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </Tooltip>
              }
            />
          }
        />

        <WardInventoryFilterPopover 
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

        <SupplyImportModal 
          open={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
          onConfirm={(data) => {
            importMutation.mutate(data, {
              onSuccess: () => {
                setSnackbar({ open: true, message: `นำเข้า ${data.item.itemName} สำเร็จ`, severity: 'success' });
              }
            });
          }}
        />

        <SupplyRequestModal 
          open={isRequestModalOpen}
          initialItem={selectedItem}
          onClose={() => setIsRequestModalOpen(false)}
          onConfirm={(data) => {
            // Add to basket instead of submitting
            setRequisitionBasket(prev => {
              const existing = prev.findIndex(item => item.itemCode === data.item.itemCode);
              if (existing >= 0) {
                const newBasket = [...prev];
                newBasket[existing] = { ...data.item, requestQuantity: data.quantity, note: data.note };
                return newBasket;
              }
              return [...prev, { ...data.item, requestQuantity: data.quantity, note: data.note }];
            });
            setSnackbar({ open: true, message: `เพิ่ม ${data.item.itemName} ลงในรายการเบิกแล้ว`, severity: 'success' });
          }}
        />

        <SupplyBulkRequestModal
          open={isBulkRequestModalOpen}
          initialItems={requisitionBasket}
          onClose={() => setIsBulkRequestModalOpen(false)}
          onConfirm={(data) => {
            setRequisitionBasket([]); // Clear basket on confirm
            setSnackbar({ open: true, message: `ส่งคำขอเบิกจำนวน ${data.items.length} รายการสำเร็จ`, severity: 'success' });
          }}
          onUpdateItems={(items) => setRequisitionBasket(items)}
          onEditItem={(item) => {
            setSelectedItem(item);
            setIsRequestModalOpen(true);
          }}
        />

        <SupplyUsageModal 
          open={isUsageModalOpen}
          initialItem={selectedItem}
          onClose={() => setIsUsageModalOpen(false)}
          onConfirm={(data) => {
            usageMutation.mutate(data, {
              onSuccess: () => {
                setSnackbar({ open: true, message: `ใช้ ${data.item.itemName} สำเร็จ`, severity: 'success' });
              }
            });
          }}
        />

        <BarcodeScannerModal 
          open={isScannerModalOpen}
          onClose={() => setIsScannerModalOpen(false)}
          inventoryData={inventoryData as any}
          onConfirm={(mode, entries) => {
            console.log('Scanned entries:', mode, entries);
            // Handle scanned results if needed
            if (entries.length > 0) {
              setSearchTerm(entries[0].item.code);
            }
          }}
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
