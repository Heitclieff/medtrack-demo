'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
// import React, { useState, useMemo } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';

const StaffModal = dynamic(() => import('@/features/admin/components').then(mod => mod.StaffModal), { ssr: false });

const StaffViewModal = dynamic(() => import('@/features/admin/components').then(mod => mod.StaffViewModal), { ssr: false });

import { StaffFilterPopover } from '@/features/admin/components';

import { StaffItem } from '@/features/admin/data/staffData';
import { getStaffColumns } from '@/features/admin/components/staffColumns';
import { 
  useStaffList, 
  useCreateStaff, 
  useUpdateStaff, 
  useDeleteStaff 
} from '@/features/admin/hooks/useAdminQueries';

export default function StaffPageClient() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    unit: 'ทั้งหมด',
    position: 'ทั้งหมด',
    role: 'ทั้งหมด',
    status: 'ทั้งหมด',
  });
  
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // React Query Fetch
  const { data: response, isLoading } = useStaffList();
  const staffList: StaffItem[] = response?.data || [];

  // React Query Mutations
  const createMutation = useCreateStaff();
  const updateMutation = useUpdateStaff();
  const deleteMutation = useDeleteStaff();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleResetFilters = () => {
    setFilters({
      unit: 'ทั้งหมด',
      position: 'ทั้งหมด',
      role: 'ทั้งหมด',
      status: 'ทั้งหมด',
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== 'ทั้งหมด').length;

  const handleEditStaff = (staff: StaffItem) => {
    const detailedStaff = {
      ...staff,
      gender: 'ชาย',
      prefix: 'นาย',
      firstName: staff.name.split(' ')[0],
      lastName: staff.name.split(' ').slice(1).join(' '),
      email: `${staff.username}@example.com`,
      phone: '081-234-5678',
    };
    setSelectedStaff(detailedStaff);
    setIsModalOpen(true);
  };

  const handleDeleteStaff = (id: string) => {
    if (window.confirm('คุณต้องการลบรายชื่อเจ้าหน้าที่นี้ใช่หรือไม่?')) {
       deleteMutation.mutate(id);
    }
  };

  const columns = useMemo(() => getStaffColumns({
    onEdit: handleEditStaff,
    onDelete: handleDeleteStaff,
  }), [handleEditStaff, handleDeleteStaff]);

  const filteredData = staffList.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = filters.unit === 'ทั้งหมด' || item.unit === filters.unit;
    const matchesPosition = filters.position === 'ทั้งหมด' || item.position === filters.position;
    const matchesRole = filters.role === 'ทั้งหมด' || item.role === filters.role;
    const matchesStatus = filters.status === 'ทั้งหมด' || item.status === filters.status;
    return matchesSearch && matchesUnit && matchesPosition && matchesRole && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setSelectedStaff(null);
    setIsModalOpen(true);
  };

  const handleViewStaff = (staff: StaffItem) => {
    setSelectedStaff(staff);
    setIsViewModalOpen(true);
  };

  const handleSaveStaff = (data: any) => {
    if (selectedStaff) {
      updateMutation.mutate({
        id: selectedStaff.id,
        data: {
          ...selectedStaff,
          name: `${data.prefix}${data.firstName} ${data.lastName}`,
          username: data.username,
          unit: data.unit,
          role: data.role,
          status: data.status
        }
      });
    } else {
      createMutation.mutate({
        name: `${data.prefix}${data.firstName} ${data.lastName}`,
        username: data.username,
        unit: data.unit,
        position: 'เจ้าหน้าที่ใหม่',
        role: data.role,
        status: data.status,
        lastLogin: '-'
      });
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="จัดการรายชื่อเจ้าหน้าที่"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'จัดการเจ้าหน้าที่' }
          ]}
        />

        <Toolbar
          actions={
            <>
              <Button 
                variant="contained" 
                startIcon={<AddCircleIcon />}
                onClick={handleOpenAddModal}
                sx={{ height: 40 }}
              >
                เพิ่มเจ้าหน้าที่ใหม่
              </Button>
              
              <Button 
                variant="outlined" 
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
                sx={{ 
                  height: 40,
                  color: activeFilterCount > 0 ? 'primary.main' : 'text.secondary',
                  borderColor: activeFilterCount > 0 ? 'primary.main' : 'divider',
                }}
              >
                กรองข้อมูล {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหาชื่อ, username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          }
        />

        <StaffFilterPopover 
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
            title="ข้อมูลเจ้าหน้าที่ทั้งหมด"
            columns={columns}
            data={filteredData}
            hideInternalSearch={true}
            showControls={false}
            onRowDoubleClick={handleViewStaff}
          />
        </Box>

        <StaffModal 
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveStaff}
          initialData={selectedStaff}
        />

        <StaffViewModal
          open={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          onEdit={(staff) => {
            setIsViewModalOpen(false);
            handleEditStaff(staff);
          }}
          onDelete={(staff) => {
            setIsViewModalOpen(false);
            handleDeleteStaff(staff.id);
          }}
          data={selectedStaff}
        />
      </Box>
    </DashboardLayout>
  );
}
