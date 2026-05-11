import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DeleteIcon from '@mui/icons-material/Delete';
import {  Column  } from '@components/ui';
import { WardInventoryItem } from '../data/wardInventoryData';
import StockStatusBattery from './StockStatusBattery';

interface GetWardInventoryColumnsProps {
  onRequest: (item: WardInventoryItem) => void;
  onUse: (item: WardInventoryItem) => void;
  onDelete: (item: WardInventoryItem) => void;
}

export const getWardInventoryColumns = ({
  onRequest,
  onUse,
  onDelete,
}: GetWardInventoryColumnsProps): Column<WardInventoryItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
  { 
    id: 'category', 
    label: 'หมวดหมู่', 
    minWidth: 150,
  },
  { 
    id: 'name', 
    label: 'ชื่อเวชภัณฑ์', 
    minWidth: 350,
    format: (value: string, row: WardInventoryItem) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic', fontWeight: 500 }}>
          {row.code}
        </Typography>
      </Box>
    )
  },
  { 
    id: 'balance', 
    label: 'คงเหลือ', 
    minWidth: 140,
    format: (value: number, row: WardInventoryItem) => (
      <StockStatusBattery value={value.toString()} unit={row.unit} />
    )
  },
  { 
    id: 'price', 
    label: 'ราคา', 
    minWidth: 100,
    align: 'right',
    format: (value: string) => (
      <Typography variant="body2" sx = {{ color: 'text.primary' , fontWeight : 500}}>
        {value ? Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " บาท" : '-'}
      </Typography>
    )
  },
  { id: 'expiryDate', label: 'วันหมดอายุ', minWidth: 120, align: 'center' },
  { 
    id: 'activity', 
    label: 'กิจกรรม', 
    minWidth: 250, 
    align: 'center',
    format: (_, row: WardInventoryItem) => (
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          startIcon={<ShoppingCartIcon sx={{ fontSize: '16px !important' }} />}
          onClick={() => onRequest(row)}
          sx={{ fontSize: '0.8rem', py: 0.5, px: 1.5, fontWeight: 600, boxShadow: 'none'}}
        >
          ขอเบิก
        </Button>
        <Button 
          variant="contained" 
          startIcon={<LocalHospitalIcon sx={{ fontSize: '16px !important' }} />}
          onClick={() => onUse(row)}
          sx={{ bgcolor: 'warning.main', color: 'warning.contrastText', fontSize: '0.8rem', py: 0.5, px: 1.5, fontWeight: 600, boxShadow: 'none', '&:hover': { bgcolor: 'warning.dark' } }}
        >
          ใช้
        </Button>
        <Button 
          variant="contained" 
          startIcon={<DeleteIcon sx={{ fontSize: '16px !important' }} />}
          onClick={() => onDelete(row)}
          sx={{ bgcolor: 'error.main', color: 'error.contrastText', fontSize: '0.8rem', py: 0.5, px: 1.5, fontWeight: 600, boxShadow: 'none', '&:hover': { bgcolor: 'error.dark' } }}
        >
          ลบ
        </Button>
      </Box>
    )
  },
];
