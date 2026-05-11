import React from 'react';
import { Box, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {  Column  } from '@components/ui';
import { StatusBadge } from '@components/ui';
import { PendingStaffItem } from '../data/staffData';

interface GetPendingStaffColumnsProps {
  onApprove: (item: PendingStaffItem) => void;
  onReject: (item: PendingStaffItem) => void;
}

export const getPendingStaffColumns = ({
  onApprove,
  onReject,
}: GetPendingStaffColumnsProps): Column<PendingStaffItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
  { id: 'name', label: 'ชื่อ-นามสกุล', minWidth: 170 },
  { id: 'unit', label: 'หน่วยงาน', minWidth: 120 },
  { 
    id: 'role', 
    label: 'ตำแหน่ง', 
    minWidth: 150, 
    format: (value: string) => (
       <Box sx={{ 
        display: 'inline-block',
        px: 1.5,
        py: 0.5,
        bgcolor: 'info.light',
        color: 'info.dark',
        borderRadius: 1,
        fontWeight: 600,
        fontSize: '0.75rem'
      }}>          
        {value}      
      </Box>
    ) 
  },
  { id: 'date', label: 'วันที่/เวลาขออนุมัติ', minWidth: 160 },
  { 
    id: 'status', 
    label: 'สถานะ', 
    minWidth: 100, 
    align: 'center',
    format: () => <StatusBadge status="warning" label="รออนุมัติ" />
  },
  { 
    id: 'activity', 
    label: 'ดำเนินการ', 
    minWidth: 200, 
    align: 'center',
    format: (_, row: PendingStaffItem) => (
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="small" 
          onClick={() => onApprove(row)}
          startIcon={<CheckCircleIcon sx={{ fontSize: '14px !important' }} />}
          sx={{ bgcolor: 'success.main', fontSize: '0.7rem', py: 0.25, px: 1, boxShadow: 'none', '&:hover': { bgcolor: 'success.dark' } }}
        >
          อนุมัติ
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          onClick={() => onReject(row)}
          startIcon={<CancelIcon sx={{ fontSize: '14px !important' }} />}
          sx={{ bgcolor: 'error.main', fontSize: '0.7rem', py: 0.25, px: 1, boxShadow: 'none', '&:hover': { bgcolor: 'error.dark' } }}
        >
          ปฏิเสธ
        </Button>
      </Box>
    )
  },
];
