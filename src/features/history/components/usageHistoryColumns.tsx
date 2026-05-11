import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import {  Column  } from '@components/ui';
import { UsageHistoryItem } from '../data/historyData';

interface GetUsageHistoryColumnsProps {
  onPrint: (item: UsageHistoryItem) => void;
}

export const getUsageHistoryColumns = ({
  onPrint,
}: GetUsageHistoryColumnsProps): Column<UsageHistoryItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
  { id: 'ward', label: 'คลังวอร์ด', minWidth: 180 },
  { id: 'usedBy', label: 'ผู้นำไปใช้', minWidth: 220 },
  { id: 'itemCount', label: 'รายการเบิก', minWidth: 100, align: 'center' },
  { 
    id: 'date', 
    label: 'วันที่นำไปใช้', 
    minWidth: 150,
    format: (value: string, row: UsageHistoryItem) => (
      <Box>
         <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.8125rem' }}>{value}</Typography>
         <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.75rem' }}>{row.time}</Typography>
      </Box>
    )
  },
  { 
    id: 'activity', 
    label: 'กิจกรรม', 
    minWidth: 150, 
    align: 'center',
    format: (_, row: UsageHistoryItem) => (
      <Button 
        variant="contained" 
        size="small" 
        startIcon={<PrintIcon sx={{ fontSize: '14px !important' }} />}
        onClick={() => onPrint(row)}
        sx={{ 
          bgcolor: 'warning.main', 
          color: 'warning.contrastText', 
          fontSize: '0.75rem', 
          textTransform: 'none',
          boxShadow: 'none',
          py: 0.5,
          px: 1,
          '&:hover': { bgcolor: 'warning.dark' }
        }}
      >
        รายการนำไปใช้
      </Button>
    )
  },
];
