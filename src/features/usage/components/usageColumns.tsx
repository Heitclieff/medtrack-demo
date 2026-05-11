import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import {  Column  } from '@components/ui';
import { UsageInventoryItem } from '../data/usageData';

interface GetUsageColumnsProps {
  onUse: (row: UsageInventoryItem) => void;
}

export const getUsageColumns = ({
  onUse,
}: GetUsageColumnsProps): Column<UsageInventoryItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 60},
  { id: 'category', label: 'หมวดหมู่', minWidth: 150 },
  { 
    id: 'name', 
    label: 'ชื่อเวชภัณฑ์', 
    minWidth: 350,
    format: (value: string, row: UsageInventoryItem) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic', display: 'block' }}>
          {row.code}
        </Typography>
      </Box>
    )
  },
  { 
    id: 'balance', 
    label: 'คงเหลือ', 
    minWidth: 150,
    format: (value: string) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'success.main', mt: 0.5 }}>
          <Box 
            sx={{ 
              width: 20, 
              height: 10, 
              border: '1.5px solid currentColor', 
              borderRadius: '2px', 
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                right: -3,
                top: 2,
                width: 2,
                height: 3,
                bgcolor: 'currentColor',
                borderRadius: '0 1px 1px 0'
              }
            }}
          >
            <Box sx={{ width: '70%', height: '100%', bgcolor: 'currentColor' }} />
          </Box>
          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.7rem' }}>คงคลัง</Typography>
        </Box>
      </Box>
    )
  },
  { 
      id: 'lastUsedBy', 
      label: 'ผู้นำไปใช้', 
      minWidth: 200,
      format: (value: string, row: UsageInventoryItem) => (
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
            {value}
          </Typography>
          {row.lastUsedUnit !== '-' && (
            <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic', display: 'block' }}>
              หน่วยงาน: {row.lastUsedUnit}
            </Typography>
          )}
        </Box>
      )
    },
  { 
    id: 'activity', 
    label: 'กิจกรรม', 
    minWidth: 120, 
    align: 'center',
    format: (_, row: UsageInventoryItem) => (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          size="small" 
          startIcon={<ShoppingCartCheckoutOutlinedIcon sx={{ fontSize: '14px !important' }} />}
          onClick={() => onUse(row)}
          sx={{ 
              bgcolor: 'warning.main', 
              color: 'warning.contrastText', 
              fontSize: '0.75rem', 
              py: 0.5, 
              px: 1.5, 
              boxShadow: 'none', 
              textTransform: 'none',
              '&:hover': { bgcolor: 'warning.dark' } 
          }}
        >
          ใช้
        </Button>
      </Box>
    )
  },
];
