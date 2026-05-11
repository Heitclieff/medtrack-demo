import React from 'react';
import { Box, Typography, Button, Popover, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { DateFilterBar } from '@components/ui';
import { REQUISITION_CATEGORIES } from '../data/historyData';

interface RequisitionFilterPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  filters: {
    category: string;
    dateType: 'request' | 'approval';
    startDate: string;
    endDate: string;
  };
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
}

export default function RequisitionFilterPopover({
  anchorEl,
  onClose,
  filters,
  onFilterChange,
  onReset,
}: RequisitionFilterPopoverProps) {
  const open = Boolean(anchorEl);
  const id = open ? 'requisition-filter-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        sx: { width: 400, mt: 1, p: 2.5, borderRadius: 2, boxShadow: 3 }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>ตัวกรองข้อมูล</Typography>
        <Button size="small" onClick={onReset} sx={{ textTransform: 'none', fontWeight: 600 }}>ล้างตัวกรอง</Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <FormControl fullWidth size="small">
          <InputLabel>หมวดหมู่</InputLabel>
          <Select
            label="หมวดหมู่"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            {REQUISITION_CATEGORIES.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Divider />
        <Box>
          <FormControl fullWidth size="small">
            <InputLabel>ตัวกรองจากวันที่</InputLabel>
            <Select
              label="ตัวกรองจากวันที่"
              value={filters.dateType}
              onChange={(e) => onFilterChange('dateType', e.target.value)}
            >
              <MenuItem value="request">วันที่ขอเบิก</MenuItem>
              <MenuItem value="approval">วันที่อนุมัติ</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ mt: 2 }}>
            <DateFilterBar 
              flat 
              onSearch={(start, end) => {
                onFilterChange('startDate', start);
                onFilterChange('endDate', end);
              }}
            />
          </Box>
        </Box>
      </Box>
    </Popover>
  );
}
