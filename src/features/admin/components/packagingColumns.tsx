import React from 'react';
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {  Column  } from '@components/ui';
import { PackagingItem } from '../data/packagingData';

interface GetPackagingColumnsProps {
  onEdit: (item: PackagingItem) => void;
  onDelete: (id: string | number) => void;
}

export const getPackagingColumns = ({
  onEdit,
  onDelete,
}: GetPackagingColumnsProps): Column<PackagingItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
  { id: 'name', label: 'ชื่อหน่วยบรรจุภัณฑ์', minWidth: 300 },
  { 
    id: 'activity', 
    label: 'กิจกรรม', 
    minWidth: 160, 
    align: 'center',
    format: (_, row: PackagingItem) => (
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="small" 
          onClick={() => onEdit(row)}
          startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />}
          sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', fontSize: '0.7rem', py: 0.25, px: 1, boxShadow: 'none', '&:hover': { bgcolor: 'warning.dark' } }}
        >
          แก้ไข
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          onClick={() => onDelete(row.id)}
          startIcon={<DeleteIcon sx={{ fontSize: '14px !important' }} />}
          sx={{ bgcolor: 'error.main', fontSize: '0.7rem', py: 0.25, px: 1, boxShadow: 'none', '&:hover': { bgcolor: 'error.dark' } }}
        >
          ลบ
        </Button>
      </Box>
    )
  },
];
