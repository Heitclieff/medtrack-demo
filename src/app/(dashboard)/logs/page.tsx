'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Popover, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Divider 
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DateFilterBar } from '@components/ui';
import {  Column  } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField, DataTable } from '@components/ui';

interface LogItem {
  id: string;
  datetime: string;
  user: string;
  action: string;
  module: string;
  details: string;
}

const mockData: LogItem[] = [
  { id: '1', datetime: '24/01/2567 10:30:15', user: 'กิตติธัช พูลประเสริฐ', action: 'Update', module: 'Medical Inventory', details: 'แก้ไขจำนวน Stock (INCA001) จาก 50 เป็น 48' },
  { id: '2', datetime: '24/01/2567 09:15:00', user: 'นพ. สมชาย', action: 'Create', module: 'Requisition', details: 'สร้างใบเบิก REQ-6701-001' },
  { id: '3', datetime: '23/01/2567 16:45:22', user: 'System', action: 'Login', module: 'Auth', details: 'Successful login form IP 192.168.1.45' },
];

export default function SystemLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('ทั้งหมด');
  const [moduleFilter, setModuleFilter] = useState('ทั้งหมด');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const modules = ['ทั้งหมด', 'Medical Inventory', 'Requisition', 'Auth'];

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleResetFilters = () => {
    setUserFilter('ทั้งหมด');
    setModuleFilter('ทั้งหมด');
    setStartDate(null);
    setEndDate(null);
  };

  const isFilterOpen = Boolean(anchorEl);
  const popoverId = isFilterOpen ? 'advanced-filter-popover' : undefined;

  const filteredData = mockData.filter(item => {
    const matchesSearch = 
      item.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.module.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUser = userFilter === 'ทั้งหมด' || item.user === userFilter;
    const matchesModule = moduleFilter === 'ทั้งหมด' || item.module === moduleFilter;

    let matchesDate = true;
    if (startDate && endDate) {
      // Date filtering logic would go here
    }

    return matchesSearch && matchesUser && matchesModule && matchesDate;
  });

  const activeFilterCount = [
    userFilter !== 'ทั้งหมด',
    moduleFilter !== 'ทั้งหมด',
    startDate !== null
  ].filter(Boolean).length;

  const columns: Column<LogItem>[] = [
    { id: 'id', label: 'ลำดับ', minWidth: 50, align: 'center' },
    { id: 'datetime', label: 'วันเวลา', minWidth: 150 },
    { 
      id: 'user', 
      label: 'ผู้ใช้งาน', 
      minWidth: 180,
    },
    { id: 'module', label: 'ระบบ', minWidth: 120 },
    { 
      id: 'details', 
      label: 'รายละเอียดความเคลื่อนไหว', 
      minWidth: 400,
    },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="Log (ประวัติการใช้งานระบบ)"
          breadcrumbs={[
            { label: 'Home', href: '/' }, 
            { label: 'Log' }
          ]}
        />

        <Toolbar
          actions={
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
              sx={{
                color: activeFilterCount > 0 ? 'primary.main' : 'text.secondary',
                borderColor: activeFilterCount > 0 ? 'primary.main' : 'divider',
                height: 40,
              }}
            >
              กรองข้อมูล {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหาชื่อผู้ใช้, รายละเอียด..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 280 }}
            />
          }
        >
          <Popover
            id={popoverId}
            open={isFilterOpen}
            anchorEl={anchorEl}
            onClose={handleFilterClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { width: 340, p: 2, mt: 1, boxShadow: 3, borderRadius: 2 }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle2">ตัวกรองขั้นสูง</Typography>
              <Button size="small" onClick={handleResetFilters}>ล้างตัวกรอง</Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="module-filter-label">ระบบ</InputLabel>
                <Select
                  labelId="module-filter-label"
                  label="ระบบ"
                  value={moduleFilter}
                  onChange={(e) => setModuleFilter(e.target.value)}
                >
                  {modules.map(m => (
                    <MenuItem key={m} value={m}>{m}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Divider />

              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block', color: 'text.secondary' }}>ช่วงวันที่</Typography>
                <DateFilterBar 
                  flat 
                  onSearch={(start, end) => {
                    setStartDate(start ? new Date(start) : null);
                    setEndDate(end ? new Date(end) : null);
                  }}
                />
              </Box>
            </Box>
          </Popover>
        </Toolbar>

        <Box sx={{ '& .MuiPaper-root': { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' } }}>
          <DataTable 
            title="ประวัติการใช้งานระบบ" 
            columns={columns} 
            data={filteredData}
            externalSearchTerm={searchTerm}
            onExternalSearchChange={setSearchTerm}
            hideInternalSearch={true}
            showControls={false}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
