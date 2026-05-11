import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {  Column  } from '@components/ui';
import { StatusBadge } from '@components/ui';
import { StaffItem } from '../data/staffData';

interface GetStaffColumnsProps {
  onEdit: (item: StaffItem) => void;
  onDelete: (id: string) => void;
}

export const getStaffColumns = ({
  onEdit,
  onDelete,
}: GetStaffColumnsProps): Column<StaffItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 60 },
  { id: 'name', label: 'ชื่อ-นามสกุล', minWidth: 200 },
  { id: 'username', label: 'ชื่อผู้ใช้งาน', minWidth: 120 },
  { id: 'unit', label: 'หน่วยงาน', minWidth: 120 },
  { 
    id: 'role', 
    label: 'ตำแหน่ง/สิทธิ์', 
    minWidth: 180,
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
  { 
    id: 'lastLogin', 
    label: 'เข้าใช้งานล่าสุด', 
    minWidth: 140,
    format: (value: string) => {
      if (!value || value === '-') return '-';
      const [date, time] = value.split(' ');
      return (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.8125rem' }}>{date}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.75rem' }}>{time}</Typography>
        </Box>
      );
    }
  },
  { 
    id: 'status', 
    label: 'สถานะ', 
    minWidth: 110, 
    format: (value: StaffItem['status']) => (
      <StatusBadge 
        status={value === 'active' ? 'success' : 'inactive'} 
        label={value === 'active' ? 'ใช้งาน' : 'ระงับการใช้งาน'} 
      />
    )
  },
  { 
    id: 'activity', 
    label: 'จัดการ', 
    minWidth: 160, 
    align: 'center',
    format: (_, row: StaffItem) => (
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => onEdit(row)}
          sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', fontSize: '0.75rem', '&:hover': { bgcolor: 'warning.dark' } }}
        >
          แก้ไข
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<DeleteIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => onDelete(row.id)}
          sx={{ bgcolor: 'error.main', fontSize: '0.75rem', '&:hover': { bgcolor: 'error.dark' } }}
        >
          ลบ
        </Button>
      </Box>
    )
  },
];
