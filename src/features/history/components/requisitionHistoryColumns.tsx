import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import {  Column  } from '@components/ui';
import { RequisitionHistoryItem } from '../data/historyData';

interface GetRequisitionHistoryColumnsProps {
  onPrint: (item: RequisitionHistoryItem) => void;
}

export const getRequisitionHistoryColumns = ({
  onPrint,
}: GetRequisitionHistoryColumnsProps): Column<RequisitionHistoryItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
  { 
    id: 'ward', 
    label: 'คลังวอร์ด', 
    minWidth: 200
  },
  { 
    id: 'requester', 
    label: 'ผู้เบิก', 
    minWidth: 180,
  },
  { 
    id: 'itemsRequested', 
    label: 'รายการเบิก / รายการอนุมัติ', 
    minWidth: 150, 
    align: 'center',
    format: (_, row: RequisitionHistoryItem) => (
      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.8125rem' }}>
        {row.itemsRequested} / {row.itemsApproved}
      </Typography>
    )
  },
  { id: 'docNo', label: 'เลขที่ใบเบิก', minWidth: 140 },
  { id: 'approvalNo', label: 'เลขที่อนุมัติ', minWidth: 140 },
  { 
    id: 'requestDate', 
    label: 'วันที่ขอเบิก', 
    minWidth: 140,
    format: (_, row: RequisitionHistoryItem) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.8125rem' }}>{row.requestDate}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.75rem' }}>{row.requestTime}</Typography>
      </Box>
    )
  },
  { 
    id: 'approvalDate', 
    label: 'วันที่อนุมัติ', 
    minWidth: 140,
    format: (_, row: RequisitionHistoryItem) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.8125rem' }}>{row.approvalDate}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.75rem' }}>{row.approvalTime}</Typography>
      </Box>
    )
  },
  { 
    id: 'activity', 
    label: 'กิจกรรม', 
    minWidth: 150, 
    align: 'center',
    format: (_, row: RequisitionHistoryItem) => (
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
          fontWeight: 600,
          py: 0.5, 
          px: 1.5, 
          boxShadow: 'none', 
          '&:hover': { bgcolor: 'warning.dark' } 
        }}
      >
        ใบเบิกเวชภัณฑ์
      </Button>
    )
  },
];
