'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider, TextField, Stack } from '@mui/material';

const filterOptions = [
  { label: '7 วันล่าสุด', value: '7' },
  { label: '14 วันล่าสุด', value: '14' },
  { label: '30 วันล่าสุด', value: '30' },
  { label: '90 วันล่าสุด', value: '90' },
  { label: 'กำหนดเอง...', value: 'custom' },
];

export default function DashboardDateFilter() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRange, setSelectedRange] = useState('30');
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowCustomRange(false);
  };

  const handleSelect = (value: string) => {
    if (value === 'custom') {
      setShowCustomRange(true);
      return;
    }
    setSelectedRange(value);
    handleClose();
  };

  const handleApplyCustom = () => {
    if (startDate && endDate) {
      setSelectedRange(`custom:${startDate}_${endDate}`);
      handleClose();
    }
  };

  const getLabel = () => {
    if (selectedRange.startsWith('custom:')) {
      const dates = selectedRange.replace('custom:', '').split('_');
      return `${dates[0]} - ${dates[1]}`;
    }
    return filterOptions.find(opt => opt.value === selectedRange)?.label || '30 วันล่าสุด';
  };

  const selectedLabel = getLabel();
  const todayDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <Box>
      <Button
        id="dashboard-date-filter-button"
        aria-controls={open ? 'dashboard-date-filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
        sx={{
          bgcolor: '#3F6AD8',
          textTransform: 'none',
          fontWeight: 500,
          color: 'white',
          '&:hover': { bgcolor: '#3457B1' },
          '& .MuiButton-endIcon': { ml: 1 }
        }}
      >
        {selectedRange === 'today' || selectedRange === '30' ? `วันนี้: ${todayDate}` : selectedLabel}
      </Button>
      <Menu
        id="dashboard-date-filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dashboard-date-filter-button',
        }}
        PaperProps={{
          sx: {     
            minWidth: 240,
            p: showCustomRange ? 2 : 0,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!showCustomRange ? (
          filterOptions.map((option) => (
            <MenuItem 
              key={option.value} 
              selected={selectedRange === option.value}
              onClick={() => handleSelect(option.value)}
              sx={{ py: 1, px: 2, fontSize: '0.875rem' }}
            >
              {option.label}
              {selectedRange === option.value && <CheckIcon sx={{ ml: 'auto', fontSize: 16, color: '#3F6AD8' }} />}
            </MenuItem>
          ))
        ) : (
          <Box sx={{ minWidth: 200 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Button 
                size="small" 
                startIcon={<ArrowBackIcon fontSize="small" />} 
                onClick={() => setShowCustomRange(false)}
                sx={{ textTransform: 'none', color: '#6B7280', p: 0, minWidth: 0, mr: 1 }}
              >
                ย้อนกลับ
              </Button>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>กำหนดเอง</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <Box>
                <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600, display: 'block', mb: 0.5 }}>เริ่มต้น</Typography>
                <TextField 
                  type="date" 
                  fullWidth 
                  size="small" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600, display: 'block', mb: 0.5 }}>สิ้นสุด</Typography>
                <TextField 
                  type="date" 
                  fullWidth 
                  size="small" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Button 
                variant="contained" 
                fullWidth 
                disableElevation
                onClick={handleApplyCustom}
                disabled={!startDate || !endDate}
                sx={{ bgcolor: '#3F6AD8', textTransform: 'none', mt: 1 }}
              >
                ยืนยันการกรอง
              </Button>
            </Stack>
          </Box>
        )}
      </Menu>
    </Box>
  );
}
