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

const UnitModal = dynamic(() => import('@/features/admin/components').then(mod => mod.UnitModal), { ssr: false });

const UnitViewModal = dynamic(() => import('@/features/admin/components').then(mod => mod.UnitViewModal), { ssr: false });


import { UnitItem } from '@/features/admin/data/unitData';
import { getUnitColumns } from '@/features/admin/components/unitColumns';
import {
  useUnitList,
  useCreateUnit,
  useUpdateUnit,
  useDeleteUnit
} from '@/features/admin/hooks/useAdminQueries';

export default function UnitsPageClient() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: response, isLoading } = useUnitList();
  const unitsData: UnitItem[] = response?.data || [];

  const createUnit = useCreateUnit();
  const updateUnit = useUpdateUnit();
  const deleteUnit = useDeleteUnit();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitItem | null>(null);

  const handleAddClick = () => {
    setSelectedUnit(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (unit: UnitItem) => {
    setSelectedUnit(unit);
    setIsModalOpen(true);
  };

  const handleViewClick = (unit: UnitItem) => {
    setSelectedUnit(unit);
    setIsViewModalOpen(true);
  };

  const handleSave = (item: Partial<UnitItem>) => {
    if (selectedUnit) {
      updateUnit.mutate({ id: selectedUnit.id, data: item });
    } else {
      createUnit.mutate(item);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string | number) => {
    if (window.confirm('คุณต้องการลบหน่วยงานนี้ใช่หรือไม่?')) {
      deleteUnit.mutate(id.toString());
    }
  };

  const columns = useMemo(() => getUnitColumns({
    onEdit: handleEditClick,
    onDelete: handleDelete,
  }), []);

  const filteredData = unitsData.filter((item: any) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.internalNumber.includes(searchTerm)
  );

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="จัดการหน่วยงาน"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'จัดการหน่วยงาน' }
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
              เพิ่มหน่วยงานใหม่
            </Button>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหาชื่อหน่วยงาน, รหัส..."
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
            title="รายการหน่วยงานทั้งหมด"
            columns={columns}
            data={filteredData}
            hideInternalSearch={true}
            showControls={false}
            onRowDoubleClick={handleViewClick}
          />
        </Box>

        <UnitModal 
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={selectedUnit}
        />

        <UnitViewModal
          open={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          onEdit={handleEditClick}
          data={selectedUnit}
        />
      </Box>
    </DashboardLayout>
  );
}
