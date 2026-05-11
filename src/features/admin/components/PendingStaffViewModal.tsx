'use client';

import React from 'react';
import { Button, Box, Typography, Avatar, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { ModalShell } from '@components/ui';
import { SectionHeader } from '@components/ui';
import { DetailRow } from '@components/ui';

interface PendingStaffItem {
  id: string;
  name: string;
  unit: string;
  role: string;
  date: string;
  status: 'pending';
  username: string;
  email?: string;
  phone?: string;
}

interface PendingStaffViewModalProps {
  open: boolean;
  onClose: () => void;
  onApprove: (item: PendingStaffItem) => void;
  onReject: (item: PendingStaffItem) => void;
  data: PendingStaffItem | null;
}

export default function PendingStaffViewModal({ open, onClose, onApprove, onReject, data }: PendingStaffViewModalProps) {
  if (!data) return null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="รายละเอียดผู้สมัคร"
      contentSx={{ p: 0, bgcolor: '#fff' }}
      actions={
        <>
          <Button onClick={onClose} variant="text" sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}>
            ปิดหน้าต่าง
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={1}>
            <Button onClick={() => onReject(data)} variant="outlined" color="error" startIcon={<CancelIcon />} sx={{ textTransform: 'none', fontWeight: 600 }}>
              ไม่อนุมัติ
            </Button>
            <Button onClick={() => onApprove(data)} variant="contained" color="success" startIcon={<CheckCircleIcon />}
              sx={{ textTransform: 'none', fontWeight: 600, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
            >
              อนุมัติการสมัคร
            </Button>
          </Stack>
        </>
      }
    >
      <Box sx={{ bgcolor: '#F8FAFC', p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: '#3F6AD8', fontSize: '1.5rem' }}>
          {data.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E293B' }}>{data.name}</Typography>
          <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>ตำแหน่ง: {data.role}</Typography>
        </Box>
      </Box>

      <Box sx={{ px: 3, pb: 4 }}>
        <SectionHeader title="ข้อมูลส่วนตัว" />
        <DetailRow label="ชื่อ-นามสกุล" value={data.name} />
        <DetailRow label="ชื่อผู้ใช้" value={data.username} />
        <DetailRow label="หน่วยงาน" value={data.unit} />
        <DetailRow label="ตำแหน่ง" value={data.role} />
        <DetailRow label="เบอร์โทรศัพท์" value={data.phone || '08x-xxx-xxxx'} />
        <DetailRow label="อีเมล" value={data.email || 'sample@email.com'} noDivider />

        <SectionHeader title="ข้อมูลการสมัคร" />
        <DetailRow label="วันที่สมัคร" value={data.date} noDivider />
      </Box>
    </ModalShell>
  );
}
