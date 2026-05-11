import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {  Column  } from '@components/ui';
import { InventoryItem } from '../data/inventoryData';
import StockStatusBattery from './StockStatusBattery';

interface GetInventoryColumnsProps {
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  onAddStock?: (item: InventoryItem) => void;
}

export const getInventoryColumns = ({
  onEdit,
  onDelete,
  onAddStock,
}: GetInventoryColumnsProps): Column<InventoryItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 60 },
  { id: 'category', label: 'หมวดหมู่', minWidth: 150 },
  { 
    id: 'name', 
    label: 'ชื่อเวชภัณฑ์', 
    minWidth: 400,
    format: (value: string, row: InventoryItem) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          {row.code}
        </Typography>
      </Box>
    )
  },
  { 
    id: 'balance', 
    label: 'คงเหลือ', 
    minWidth: 140,
    format: (value: string, row: InventoryItem) => (
      <StockStatusBattery value={value} unit={row.unit} />
    )
  },
  { 
    id: 'price', 
    label: 'ราคา', 
    minWidth: 100,
    align: 'right',
    format: (value: string) => (
      <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
        {value ? Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " บาท" : '-'}
      </Typography>
    )
  },
  { id: 'expiryDate', label: 'วันหมดอายุ', minWidth: 120, align: 'center' },
  { 
    id: 'activity', 
    label: 'กิจกรรม', 
    minWidth: 200, 
    align: 'center',
    format: (_, row: InventoryItem) => (
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<AddIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => onAddStock?.(row)}
          sx={{ 
            bgcolor: 'primary.main', 
            fontSize: '0.7rem', 
            py: 0.25, 
            px: 1, 
            boxShadow: 'none',
            '&:hover': { bgcolor: 'primary.dark' } 
          }}
        >
          นำเข้า
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => onEdit(row)}
          sx={{ 
            bgcolor: 'warning.main', 
            color: 'warning.contrastText', 
            fontSize: '0.7rem', 
            py: 0.25, 
            px: 1, 
            boxShadow: 'none',
            '&:hover': { bgcolor: 'warning.dark' } 
          }}
        >
          แก้ไข
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<DeleteIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => onDelete(row.id)}
          sx={{ 
            bgcolor: 'error.main', 
            fontSize: '0.7rem', 
            py: 0.25, 
            px: 1, 
            boxShadow: 'none',
            '&:hover': { bgcolor: 'error.dark' } 
          }}
        >
          ลบ
        </Button>
      </Box>
    )
  },
];
