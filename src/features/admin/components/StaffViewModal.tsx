'use client';

import React from 'react';
import { Button, Box, Typography, Avatar, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StatusBadge } from '@components/ui';
import { ModalShell } from '@components/ui';
import { SectionHeader } from '@components/ui';
import { DetailRow } from '@components/ui';

interface StaffItem {
  id: string;
  name: string;
  username: string;
  unit: string;
  position: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  email?: string;
  phone?: string;
}

interface StaffViewModalProps {
  open: boolean;
  onClose: () => void;
  onEdit?: (data: StaffItem) => void;
  onDelete?: (data: StaffItem) => void;
  data: StaffItem | null;
}

export default function StaffViewModal({ open, onClose, onEdit, onDelete, data }: StaffViewModalProps) {
  if (!data) return null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="รายละเอียดเจ้าหน้าที่"
      contentSx={{ p: 0, bgcolor: '#fff' }}
      actions={
        <Stack direction="row" spacing={1}>
          {onDelete && (
            <Button onClick={() => onDelete(data)} variant="outlined" color="error" startIcon={<DeleteIcon />} sx={{ textTransform: 'none', fontWeight: 600 }}>
              ลบข้อมูล
            </Button>
          )}
          {onEdit && (
            <Button
              onClick={() => onEdit(data)}
              variant="contained"
              startIcon={<EditIcon />}
              sx={{ textTransform: 'none', fontWeight: 600, bgcolor: '#ffc107', color: '#000', boxShadow: 'none', '&:hover': { bgcolor: '#e0a800', boxShadow: 'none' } }}
            >
              แก้ไขข้อมูล
            </Button>
          )}
        </Stack>
      }
    >
      <Box sx={{ bgcolor: '#F8FAFC', p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: '#3F6AD8', fontSize: '1.5rem' }}>
          {data.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#1E293B' }}>{data.name}</Typography>
          <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>ตำแหน่ง: {data.position}</Typography>
          <Box sx={{ mt: 0.5 }}>
            <StatusBadge status={data.status === 'active' ? 'success' : 'inactive'} label={data.status === 'active' ? 'ใช้งาน' : 'ระงับการใช้งาน'} />
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 3, pb: 4 }}>
        <SectionHeader title="ข้อมูลส่วนตัว" />
        <DetailRow label="ชื่อ-นามสกุล" value={data.name} />
        <DetailRow label="ชื่อผู้ใช้" value={data.username} />
        <DetailRow label="หน่วยงาน" value={data.unit} />
        <DetailRow label="ตำแหน่ง" value={data.position} />
        <DetailRow label="สิทธิการใช้งาน" value={
          <Box sx={{ display: 'inline-block', px: 1.5, py: 0.5, bgcolor: '#E0F2FE', color: '#0369A1', borderRadius: 1, fontWeight: 500, fontSize: '0.875rem' }}>
            {data.role}
          </Box>
        } />
        <DetailRow label="เบอร์โทรศัพท์" value={data.phone || '08x-xxx-xxxx'} />
        <DetailRow label="อีเมล" value={data.email || `${data.username}@example.com`} noDivider />

        <SectionHeader title="ข้อมูลระบบ" />
        <DetailRow label="การเข้าใช้งานล่าสุด" value={data.lastLogin} noDivider />
      </Box>
    </ModalShell>
  );
}
