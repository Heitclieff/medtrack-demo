import React from 'react';
import { Box, Typography, Button, Popover, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { DateFilterBar } from '@components/ui';
import { HISTORY_WARDS } from '../data/historyData';

interface UsageFilterPopoverProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  filters: {
    ward: string;
    startDate: string;
    endDate: string;
  };
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
}

export default function UsageFilterPopover({
  anchorEl,
  onClose,
  filters,
  onFilterChange,
  onReset,
}: UsageFilterPopoverProps) {
  const open = Boolean(anchorEl);
  const id = open ? 'usage-filter-popover' : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        sx: { width: 350, p: 3, mt: 1, boxShadow: 3, borderRadius: 2 }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>ตัวกรองข้อมูล</Typography>
        <Button size="small" onClick={onReset} sx={{ textTransform: 'none' }}>ล้างตัวกรอง</Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <FormControl fullWidth size="small">
          <InputLabel>คลังวอร์ด</InputLabel>
          <Select
            label="คลังวอร์ด"
            value={filters.ward}
            onChange={(e) => onFilterChange('ward', e.target.value)}
            sx={{ fontSize: '0.875rem' }}
          >
            {HISTORY_WARDS.map(ward => <MenuItem key={ward} value={ward} sx={{ fontSize: '0.875rem' }}>{ward}</MenuItem>)}
          </Select>
        </FormControl>

        <Divider sx={{ my: 1 }} />
        
        <Box>
          <Typography variant="caption" sx={{ display: 'block', mb: 1, fontWeight: 600, color: 'text.secondary' }}>ช่วงวันที่นำไปใช้</Typography>
          <DateFilterBar 
            flat 
            showPrint={false} 
            onSearch={(start, end) => {
              onFilterChange('startDate', start);
              onFilterChange('endDate', end);
            }} 
          />
        </Box>
      </Box>
    </Popover>
  );
}
