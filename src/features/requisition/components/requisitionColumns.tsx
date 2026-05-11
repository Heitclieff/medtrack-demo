import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PrintIcon from '@mui/icons-material/Print';
import CancelIcon from '@mui/icons-material/Cancel';
import {  Column  } from '@components/ui';
import { RequisitionItem } from '../data/requisitionData';

interface GetRequisitionColumnsProps {
  onRequisition: (row: RequisitionItem) => void;
  onPrint: (row: RequisitionItem) => void;
  onCancel: (row: RequisitionItem) => void;
}

export const getRequisitionColumns = ({
  onRequisition,
  onPrint,
  onCancel,
}: GetRequisitionColumnsProps): Column<RequisitionItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
  { 
    id: 'ward', 
    label: 'คลังวอร์ด', 
    minWidth: 150,
  },
  { 
    id: 'requester', 
    label: 'ผู้เบิก', 
    minWidth: 180,
  },
  { 
    id: 'itemCount', 
    label: 'รายการเบิก', 
    minWidth: 100, 
    align: 'center',
  },
  { 
    id: 'category', 
    label: 'หมวดหมู่', 
    minWidth: 150,
  },
  { 
    id: 'docNo', 
    label: 'เลขที่ใบเบิก', 
    minWidth: 150,
  },
  { 
    id: 'date', 
    label: 'วันที่ขอเบิก', 
    minWidth: 140,
    format: (value: string, row: RequisitionItem) => (
      <Box>
         <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>{value}</Typography>
         <Typography variant="caption" sx={{ color: 'text.secondary' }}>{row.time}</Typography>
      </Box>
    )
  },
  { 
    id: 'activity', 
    label: 'กิจกรรม', 
    minWidth: 320, 
    align: 'center',
    format: (_, row: RequisitionItem) => (
      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<CompareArrowsIcon />}
          sx={{ 
            bgcolor: 'warning.main', 
            color: 'warning.contrastText', 
            textTransform: 'none',
            '&:hover': { bgcolor: 'warning.dark' },
            boxShadow: 'none',
            px: 1.5
          }}
          onClick={() => onRequisition(row)}
        >
          เบิกเวชภัณฑ์
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<PrintIcon />}
          sx={{ 
            bgcolor: 'grey.500', 
            color: '#fff', 
            textTransform: 'none',
            '&:hover': { bgcolor: 'grey.600' },
            boxShadow: 'none',
            px: 1.5
          }}
          onClick={() => onPrint(row)}
        >
          พิมพ์
        </Button>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<CancelIcon />}
          sx={{ 
            bgcolor: 'error.main', 
            color: '#fff', 
            textTransform: 'none',
            '&:hover': { bgcolor: 'error.dark' },
            boxShadow: 'none',
            px: 1.5
          }}
          onClick={() => onCancel(row)}
        >
          ยกเลิก
        </Button>
      </Box>
    )
  },
];
