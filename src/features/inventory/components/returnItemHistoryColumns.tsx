import React from 'react';
import { Typography } from '@mui/material';
import {  Column  } from '@components/ui';
import { ReturnHistoryEntry } from '../data/returnItemData';

export const returnHistoryColumns: Column<ReturnHistoryEntry>[] = [
  { 
    id: 'returnCode', 
    label: 'รหัสการคืน', 
    minWidth: 150,
  },
  { 
    id: 'items', 
    label: 'รายการ', 
    minWidth: 300,
    format: (val) => (
      <Typography variant="body2" sx={{ 
        maxWidth: 300, 
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap',
        color: 'text.secondary'
      }}>
        {val}
      </Typography>
    )
  },
  { id: 'quantity', label: 'จำนวนรวม', minWidth: 100, align: 'center' },
  { id: 'returnDate', label: 'วันที่คืน', minWidth: 150, align: 'center' },
];
