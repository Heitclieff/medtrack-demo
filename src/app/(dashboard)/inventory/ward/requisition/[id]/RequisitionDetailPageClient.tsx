'use client';

import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Divider, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Stack,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PageHeader, StatusBadge } from '@/shared/components/ui';
import DashboardLayout from '@/shared/components/layout/DashboardLayout';
import { useRouter } from 'next/navigation';
import { getRequisitionById } from '@/features/inventory/data/requisitionData';

interface RequisitionDetailPageClientProps {
  id: string;
}

export default function RequisitionDetailPageClient({ id }: RequisitionDetailPageClientProps) {
  const router = useRouter();
  const requisition = getRequisitionById(id);
  const [currentStatus, setCurrentStatus] = React.useState<string>(requisition?.status || 'รอยืนยัน');

  if (!requisition) {
    return (
      <DashboardLayout>
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">ไม่พบข้อมูลใบเบิกที่ระบุ</Typography>
          <Button onClick={() => router.back()} startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
            กลับไปหน้าก่อนหน้า
          </Button>
        </Box>
      </DashboardLayout>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleApprove = () => {
    setCurrentStatus('รอรับของ');
    // In a real app, this would be the logged-in user
    requisition.approverName = 'กิตติธัช พูลประเสริฐ (Admin)';
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
        <PageHeader 
          title={`รายละเอียดใบเบิก`}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'คลังวอร์ด', href: '/inventory/ward' },
            { label: 'รายละเอียดใบเบิก' }
          ]}
          actionPanel={
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push('/inventory/ward')}
                sx={{ textTransform: 'none', borderColor: '#ddd', color: '#666' }}
              >
                กลับไปหน้าคลัง
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                sx={{ textTransform: 'none' }}
              >
                ยกเลิกคำขอ
              </Button>

              {currentStatus === 'รอยืนยัน' && (
                <Button
                  variant="contained"
                  startIcon={<CheckCircleIcon />}
                  onClick={handleApprove}
                  sx={{ 
                    textTransform: 'none', 
                    bgcolor: '#34495e', 
                    '&:hover': { bgcolor: '#2c3e50' },
                    boxShadow: 'none',
                    px: 3
                  }}
                >
                  ยืนยันการเบิก
                </Button>
              )}

              {currentStatus === 'รอรับของ' && (
                <Button
                  variant="contained"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                  sx={{ 
                    textTransform: 'none', 
                    bgcolor: '#34495e', 
                    '&:hover': { bgcolor: '#2c3e50' },
                    boxShadow: 'none'
                  }}
                >
                  พิมพ์ใบเบิก
                </Button>
              )}
            </Stack>
          }
        />

        <Paper sx={{ p: 0, borderRadius: 2, overflow: 'hidden', mb: 3, border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          {/* Requisition Header Info */}
          <Box sx={{ bgcolor: '#f8f9fa', p: 3, borderBottom: '1px solid #eee' }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5 }}>
                  เลขที่ใบเบิก
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#2c3e50' }}>
                  {id}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5 }}>
                  สถานะ
                </Typography>
                <StatusBadge 
                  status={currentStatus === 'รอยืนยัน' ? 'warning' : 'success'} 
                  label={currentStatus} 
                />
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5 }}>
                  วันที่ส่งคำขอ
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {requisition.requestDate}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5 }}>
                  ผู้อนุมัติ
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: currentStatus === 'รอรับของ' ? 'primary.main' : 'text.disabled' }}>
                  {currentStatus === 'รอรับของ' ? (requisition.approverName || 'กิตติธัช พูลประเสริฐ') : '-'}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ p: 3 }}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5 }}>
                  ชื่อผู้ส่งคำขอ
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {requisition.requesterName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5 }}>
                  แผนก / วอร์ด
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {requisition.department}
                </Typography>
              </Grid>
            </Grid>

            {/* Table Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#34495e' }}>
              รายการพัสดุและเวชภัณฑ์ที่เบิก ({requisition.items.length} รายการ)
            </Typography>
            
            <TableContainer component={Box} sx={{ border: '1px solid #eee', borderRadius: 1, mb: 4 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f4f6f8' }}>
                    <TableCell sx={{ fontWeight: 700, py: 1.5 }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>ชื่อเวชภัณฑ์</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>จำนวนเบิก</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>จำนวนอนุมัติ</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>หน่วย</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>หมายเหตุ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requisition.items.map((item, index) => (
                    <TableRow key={item.itemId}>
                      <TableCell sx={{ color: 'text.secondary' }}>{index + 1}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.itemName}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>รหัส: {item.itemCode}</Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                        {item.requestQuantity}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 700, color: 'success.main' }}>
                        {currentStatus === 'รอรับของ' ? (item.receivedQuantity || item.requestQuantity) : '-'}
                      </TableCell>
                      <TableCell align="center">{item.unit}</TableCell>
                      <TableCell sx={{ fontStyle: 'italic', color: 'text.secondary', fontSize: '13px' }}>
                        {item.note || '-'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* General Remarks */}
            <Box sx={{ p: 2, bgcolor: '#fff9e6', borderRadius: 1, border: '1px solid #ffeeba' }}>
              <Typography variant="caption" sx={{ color: '#856404', fontWeight: 700, display: 'block', mb: 0.5 }}>
                หมายเหตุการขอเบิกภาพรวม:
              </Typography>
              <Typography variant="body2" sx={{ color: '#856404' }}>
                {requisition.generalNote || 'ไม่มีหมายเหตุเพิ่มเติม'}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </DashboardLayout>
  );
}
