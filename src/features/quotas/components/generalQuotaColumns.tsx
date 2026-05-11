import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {  Column  } from '@components/ui';
import { QuotaItem } from '../data/quotaData';

interface GetGeneralQuotaColumnsProps {
  onEdit: (row: QuotaItem) => void;
  onReset: (row: QuotaItem) => void;
}

export const getGeneralQuotaColumns = ({
  onEdit,
  onReset,
}: GetGeneralQuotaColumnsProps): Column<QuotaItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
  { id: 'itemCode', label: 'รหัสเวชภัณฑ์', minWidth: 150 },
  { 
    id: 'itemName', 
    label: 'ชื่อเวชภัณฑ์', 
    minWidth: 400,
    format: (value: string, row: QuotaItem) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          {row.itemCode}
        </Typography>
      </Box>
    )
  },
  { id: 'category', label: 'หมวดหมู่', minWidth: 200 },
  { 
    id: 'minLimit', 
    label: 'Minimum Stock (Min)', 
    minWidth: 180,
    format: (val) => (
      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
        {val}
      </Typography>
    )
  },
  { 
    id: 'maxLimit', 
    label: 'Maximum Stock (Max)', 
    minWidth: 180,
    format: (val) => (
      <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
        {val}
      </Typography>
    )
  },
  { 
    id: 'activity', 
    label: 'กิจกรรม', 
    minWidth: 160, 
    align: 'center',
    format: (_, row: QuotaItem) => (
      <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />}
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'primary.contrastText', 
            fontSize: '0.75rem', 
            py: 0.5, 
            px: 1.5, 
            boxShadow: 'none', 
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' } 
          }}
          onClick={() => onEdit(row)}
        >
          กำหนด
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<RestartAltIcon sx={{ fontSize: '14px !important' }} />}
          sx={{ 
            bgcolor: 'grey.100', 
            color: 'text.primary', 
            fontSize: '0.75rem', 
            py: 0.5, 
            px: 1.5, 
            boxShadow: 'none', 
            textTransform: 'none',
            fontWeight: 600,
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': { bgcolor: 'grey.200', boxShadow: 'none' } 
          }}
          onClick={() => onReset(row)}
        >
          รีเซ็ต
        </Button>
      </Box>
    )
  },
];
