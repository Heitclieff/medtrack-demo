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

const PackagingModal = dynamic(() => import('@/features/admin/components').then(mod => mod.PackagingModal), { ssr: false });

const PackagingViewModal = dynamic(() => import('@/features/admin/components').then(mod => mod.PackagingViewModal), { ssr: false });


import { PackagingItem } from '@/features/admin/data/packagingData';
import { getPackagingColumns } from '@/features/admin/components/packagingColumns';
import {
  usePackagingList,
  useCreatePackaging,
  useUpdatePackaging,
  useDeletePackaging
} from '@/features/admin/hooks/useAdminQueries';

export default function PackagingPageClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: response, isLoading } = usePackagingList();
  const packagingData: PackagingItem[] = response?.data || [];

  const createMutation = useCreatePackaging();
  const updateMutation = useUpdatePackaging();
  const deleteMutation = useDeletePackaging();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PackagingItem | null>(null);

  const handleAddClick = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item: PackagingItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleViewClick = (item: PackagingItem) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const handleSave = (item: Partial<PackagingItem>) => {
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, data: item });
    } else {
      createMutation.mutate(item);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string | number) => {
    if (window.confirm('คุณต้องการลบหน่วยบรรจุภัณฑ์นี้ใช่หรือไม่?')) {
      deleteMutation.mutate(id.toString());
    }
  };

  const columns = useMemo(() => getPackagingColumns({
    onEdit: handleEditClick,
    onDelete: handleDelete,
  }), []);

  const filteredData = packagingData.filter((item: any) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="จัดการหน่วยบรรจุเวชภัณฑ์"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'จัดการหน่วยบรรจุภัณฑ์' }
          ]}
        />

        <Toolbar
          actions={
            <Button 
              variant="contained" 
              onClick={handleAddClick}
              startIcon={<AddCircleIcon />}
              sx={{ height: 40 }}
            >
              เพิ่มหน่วยบรรจุภัณฑ์
            </Button>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหาชื่อหน่วยบรรจุภัณฑ์..."
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
            title="รายการหน่วยบรรจุภัณฑ์ทั้งหมด"
            columns={columns}
            data={filteredData}
            hideInternalSearch={true}
            showControls={false}
            onRowDoubleClick={handleViewClick}
          />
        </Box>

        <PackagingModal 
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={selectedItem}
        />

        <PackagingViewModal
          open={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          onEdit={handleEditClick}
          data={selectedItem}
        />
      </Box>
    </DashboardLayout>
  );
}
