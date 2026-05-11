'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
// import React, { useState, useMemo } from 'react';
import { Box, Button, CircularProgress, IconButton, Tooltip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BarcodeIcon from '@mui/icons-material/FormatAlignJustify';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FilterListIcon from '@mui/icons-material/FilterList';

import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
const MedicalSupplyModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.MedicalSupplyModal), { ssr: false });

const BarcodeGeneratorModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.BarcodeGeneratorModal), { ssr: false });

const BarcodeScannerModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.BarcodeScannerModal), { ssr: false });

const InventoryDetailModal = dynamic(() => import('@/features/inventory/components').then(mod => mod.InventoryDetailModal), { ssr: false });

import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';

import { InventoryItem } from '@/features/inventory/data/inventoryData';
import { getInventoryColumns } from '@/features/inventory/components/inventoryColumns';
import { InventoryFilterPopover } from '@/features/inventory/components';

import { 
  useInventoryList, 
  useCreateInventory, 
  useUpdateInventory, 
  useDeleteInventoryItem 
} from '@/features/inventory/hooks/useInventoryQueries';

export default function MainInventoryPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'ทุกหมวดหมู่',
    expiryStatus: 'ทั้งหมด',
    stockStatus: 'ทั้งหมด',
    startDate: null as Date | null,
    endDate: null as Date | null,
  });
  
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // React Query Fetch
  const { data: response, isLoading } = useInventoryList();
  const inventoryData: InventoryItem[] = response?.data || [];

  // React Query Mutations
  const createMutation = useCreateInventory();
  const updateMutation = useUpdateInventory();
  const deleteMutation = useDeleteInventoryItem();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  
  // Barcode states
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<InventoryItem | null>(null);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: InventoryItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (itemData: Partial<InventoryItem>) => {
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: itemData });
    } else {
      createMutation.mutate(itemData);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('คุณต้องการลบรายการนี้ใช่หรือไม่?')) {
      deleteMutation.mutate(id);
    }
  };

  const columns = useMemo(() => getInventoryColumns({
    onEdit: handleOpenEditModal,
    onDelete: handleDeleteItem,
    onAddStock: (item) => console.log('Add stock for:', item.name)
  }), []);

  const handleRowDoubleClick = (item: InventoryItem) => {
    setSelectedDetailItem(item);
    setIsDetailModalOpen(true);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

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

  const filteredData = inventoryData.filter((item: any) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.code.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    const matchesCategory = filters.category === 'ทุกหมวดหมู่' || item.category === filters.category;
    if (!matchesCategory) return false;

    // Expiry Logic
    const [d, m, y] = item.expiryDate.split('/').map(Number);
    const expiryDate = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (filters.expiryStatus !== 'ทั้งหมด') {
      const thresholdDays = item.expiryThresholdDays || 30;
      const thresholdDate = new Date();
      thresholdDate.setDate(thresholdDate.getDate() + thresholdDays);

      if (filters.expiryStatus === 'ใกล้หมดอายุ') {
        if (!(expiryDate >= today && expiryDate <= thresholdDate)) return false;
      } else if (filters.expiryStatus === 'หมดอายุแล้ว') {
        if (expiryDate >= today) return false;
      }
    }

    // Date Range Logic
    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59, 999);
      if (!(expiryDate >= start && expiryDate <= end)) return false;
    }

    // Stock Level Logic
    if (filters.stockStatus !== 'ทั้งหมด') {
      const balanceNum = parseInt(item.balance) || 0;
      if (filters.stockStatus === 'ใกล้หมด' && (balanceNum <= 0 || balanceNum > 10)) return false;
      if (filters.stockStatus === 'หมดพัสดุ' && balanceNum !== 0) return false;
      if (filters.stockStatus === 'คงคลัง' && balanceNum <= 10) return false;
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
          title="ทะเบียนพัสดุและเวชภัณฑ์"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'คลังเวชภัณฑ์พัสดุ(คลังใหญ่)' }
          ]}
        />

        <Toolbar
          actions={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="contained" 
                startIcon={<AddCircleIcon />}
                onClick={handleOpenAddModal}
                sx={{ px: 2, height: 40 }}
              >
                เพิ่มเวชภัณฑ์ใหม่
              </Button>
              <Button 
                variant="contained" 
                startIcon={<BarcodeIcon sx={{ transform: 'rotate(90deg)' }} />}
                disabled={selectedIds.length === 0}
                onClick={() => setIsBarcodeModalOpen(true)}
                sx={{ 
                  bgcolor: '#76bed0', 
                  '&:hover': { bgcolor: '#61a7b8' }, 
                  height: 40,
                  '&.Mui-disabled': { bgcolor: '#d1d5db', color: '#9ca3af' }
                }}
              >
                ออกบาร์โค้ด {selectedIds.length > 0 && `(${selectedIds.length})`}
              </Button>
            </Box>
          }
          search={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
                sx={{
                  color: activeFilterCount > 0 ? 'primary.main' : 'text.secondary',
                  borderColor: activeFilterCount > 0 ? 'primary.main' : 'divider',
                  minWidth: 'fit-content',
                  height: 40,
                }}
              >
                กรองข้อมูล {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>

              <SearchField 
                id="main-inventory-search"
                label="ค้นหา" 
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
            </Box>
          }
        >
          <InventoryFilterPopover 
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </Toolbar>

        <Box sx={{ '& .MuiPaper-root': { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }, position: 'relative', minHeight: 400 }}>
          {isLoading && (
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.7)', zIndex: 10 }}>
              <CircularProgress />
            </Box>
          )}
          <DataTable 
            title="ข้อมูลเวชภัณฑ์พัสดุ"
            columns={columns}
            data={filteredData}
            externalSearchTerm={searchTerm}
            onExternalSearchChange={setSearchTerm}
            hideInternalSearch={true}
            showControls={false}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onRowDoubleClick={handleRowDoubleClick}
          />
        </Box>
      </Box>

      <MedicalSupplyModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        initialData={editingItem}
      />

      <BarcodeGeneratorModal
        open={isBarcodeModalOpen}
        onClose={() => setIsBarcodeModalOpen(false)}
        items={inventoryData.filter((item: any) => selectedIds.includes(item.id))}
      />

      <InventoryDetailModal
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        item={selectedDetailItem}
        onPrintBarcode={(item) => {
          setSelectedIds([item.id]);
          setIsBarcodeModalOpen(true);
        }}
      />

      <BarcodeScannerModal
        open={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        inventoryData={inventoryData}
        onConfirm={(mode, entries) => {
          console.log(`[${mode}] Confirmed ${entries.length} entries:`, entries);
          // TODO: connect to actual stock-in / stock-out mutation
        }}
      />
    </DashboardLayout>
  );
}
