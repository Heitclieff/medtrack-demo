'use client';

import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ModalShell } from '@components/ui';
import { SectionHeader } from '@components/ui';
import { DetailRow } from '@components/ui';

interface PackagingItem {
  id: string;
  name: string;
}

interface PackagingViewModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (item: PackagingItem) => void;
  data: PackagingItem | null;
}

export default function PackagingViewModal({ open, onClose, onEdit, data }: PackagingViewModalProps) {
  if (!data) return null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="รายละเอียดหน่วยบรรจุภัณฑ์"
      contentSx={{ p: 0, bgcolor: '#fff' }}
      actions={
        <>
          <Button onClick={onClose} variant="text" sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary' }}>
            ปิดหน้าต่าง
          </Button>
          <Button
            onClick={() => { onClose(); onEdit(data); }}
            variant="contained"
            startIcon={<EditIcon />}
            sx={{ textTransform: 'none', fontWeight: 600, boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
          >
            แก้ไขข้อมูล
          </Button>
        </>
      }
    >
      <SectionHeader title="ข้อมูลพื้นฐาน" />
      <DetailRow label="ชื่อหน่วยบรรจุภัณฑ์" value={data.name} noDivider labelWidth="150px" />
      <DetailRow label="รหัสเรียกใช้งาน" value={data.id.padStart(4, '0')} noDivider labelWidth="150px" />
    </ModalShell>
  );
}
