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

const CategoryModal = dynamic(() => import('@/features/admin/components').then(mod => mod.CategoryModal), { ssr: false });

const CategoryViewModal = dynamic(() => import('@/features/admin/components').then(mod => mod.CategoryViewModal), { ssr: false });


import { CategoryItem } from '@/features/admin/data/categoryData';
import { getCategoryColumns } from '@/features/admin/components/categoryColumns';
import { 
  useCategoryList, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory 
} from '@/features/admin/hooks/useAdminQueries';

export default function CategoriesPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // React Query Fetch
  const { data: response, isLoading } = useCategoryList();
  const categoriesData: CategoryItem[] = response?.data || [];
  
  // React Query Mutations
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);

  const handleAddClick = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (item: CategoryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleViewClick = (item: CategoryItem) => {
    setSelectedItem(item);
    setIsViewModalOpen(true);
  };

  const handleSave = (item: Partial<CategoryItem>) => {
    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem.id, data: item });
    } else {
      createMutation.mutate(item);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string | number) => {
    if (window.confirm('คุณต้องการลบหมวดหมู่ภูนี้ใช่หรือไม่?')) {
      deleteMutation.mutate(id.toString());
    }
  };

  const columns = useMemo(() => getCategoryColumns({
    onEdit: handleEditClick,
    onDelete: handleDelete,
  }), []);

  const filteredData = categoriesData.filter((item: any) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="จัดการหมวดหมู่เวชภัณฑ์พัสดุ"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'จัดการหมวดหมู่หน่วยงาน' }
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
              เพิ่มหมวดหมู่ใหม่
            </Button>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหาชื่อหมวดหมู่..."
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
            title="รายการหมวดหมู่ทั้งหมด"
            columns={columns}
            data={filteredData}
            hideInternalSearch={true}
            showControls={false}
            onRowDoubleClick={handleViewClick}
          />
        </Box>

        <CategoryModal 
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={selectedItem}
        />

        <CategoryViewModal
          open={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          onEdit={handleEditClick}
          data={selectedItem}
        />
      </Box>
    </DashboardLayout>
  );
}
