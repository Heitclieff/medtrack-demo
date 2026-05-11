'use client';

import React, { useMemo } from 'react';
import { 
  Box, 
  Button,
  Stack,
  Typography
} from '@mui/material';
import { PageHeader, DataTable, Column } from '@/shared/components/ui';
import DashboardLayout from '@/shared/components/layout/DashboardLayout';
import FilterListIcon from '@mui/icons-material/FilterList';
import PrintIcon from '@mui/icons-material/Print';
import CancelIcon from '@mui/icons-material/Cancel';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useRouter } from 'next/navigation';
import { allMockRequisitions, Requisition } from '@/features/inventory/data/requisitionData';

export default function PendingRequisitionsPageClient() {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/inventory/ward/requisition/${id}`);
  };

  const columns: readonly Column<any>[] = useMemo(() => [
    {
      id: 'idInTable',
      label: 'ลำดับ',
      align: 'center',
    },
    {
      id: 'ward',
      label: 'คลังวอร์ด',
      minWidth: 120,
    },
    {
      id: 'requesterName',
      label: 'ผู้เบิก',
      minWidth: 150,
    },
    {
      id: 'totalItems',
      label: 'รายการเบิก',
      align: 'center',
      format: (value) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>{value}</Typography>
      )
    },
    {
      id: 'mainCategory',
      label: 'หมวดหมู่',
      minWidth: 120,
    },
    {
      id: 'id',
      label: 'เลขที่ใบเบิก',
      format: (value) => (
        <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>{value}</Typography>
      )
    },
    {
      id: 'requestDate',
      label: 'วันที่ขอเบิก',
      format: (value: string) => {
        const [date, time] = value.split(' ');
        return (
          <Box>
            <Typography variant="body2" sx={{ fontSize: '0.8125rem' }}>{date}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{time}</Typography>
          </Box>
        );
      }
    },
    {
      id: 'actions',
      label: 'กิจกรรม',
      align: 'center',
      format: (_, row) => (
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button
            variant="contained"
            size="small"
            startIcon={<SubdirectoryArrowRightIcon sx={{ fontSize: '16px !important' }} />}
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(row.id);
            }}
            sx={{ 
              bgcolor: '#ff9800', 
              '&:hover': { bgcolor: '#f57c00' },
              textTransform: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              boxShadow: 'none',
              py: 0.5,
              px: 1.5,
              borderRadius: 1
            }}
          >
            เบิกเวชภัณฑ์
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<PrintIcon sx={{ fontSize: '16px !important' }} />}
            onClick={(e) => e.stopPropagation()}
            sx={{ 
              bgcolor: '#90a4ae', 
              '&:hover': { bgcolor: '#78909c' },
              textTransform: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              boxShadow: 'none',
              py: 0.5,
              px: 1.5,
              borderRadius: 1
            }}
          >
            พิมพ์
          </Button>
          <Button
            variant="contained"
            size="small"
            color="error"
            startIcon={<CancelIcon sx={{ fontSize: '16px !important' }} />}
            onClick={(e) => e.stopPropagation()}
            sx={{ 
              textTransform: 'none',
              fontSize: '0.75rem',
              fontWeight: 700,
              boxShadow: 'none',
              py: 0.5,
              px: 1.5,
              borderRadius: 1
            }}
          >
            ยกเลิก
          </Button>
        </Stack>
      )
    }
  ], []);

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <PageHeader 
          title="รายการขอเบิกเวชภัณฑ์"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'รายการขอเบิกเวชภัณฑ์' }
          ]}
        />

        <DataTable 
          columns={columns} 
          data={allMockRequisitions.map((r, i) => ({ ...r, idInTable: i + 1 }))} 
          searchPlaceholder="ค้นหาผู้เบิก, เลขที่ใบเบิก..."
          topActions={
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{ height: 40, color: 'text.secondary', borderColor: 'divider', textTransform: 'none' }}
            >
              กรองข้อมูล
            </Button>
          }
        />
      </Box>
    </DashboardLayout>
  );
}
