'use client';

import React from 'react';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ModalShell } from '@components/ui';
import { SectionHeader } from '@components/ui';
import { DetailRow } from '@components/ui';

interface UnitItem {
  id: string;
  name: string;
  building: string;
  internalNumber: string;
  description: string;
}

interface UnitViewModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (item: UnitItem) => void;
  data: UnitItem | null;
}

export default function UnitViewModal({ open, onClose, onEdit, data }: UnitViewModalProps) {
  if (!data) return null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="รายละเอียดหน่วยงาน"
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
      <SectionHeader title="ข้อมูลหน่วยงานพื้นฐาน" />
      <DetailRow label="ชื่อหน่วยงาน" value={data.name} labelWidth="150px" />
      <DetailRow label="อาคาร / สถานที่" value={data.building} labelWidth="150px" />
      <DetailRow label="หมายเลขโทรศัพท์ภายใน" value={data.internalNumber} noDivider labelWidth="150px" />

      <SectionHeader title="ข้อมูลเพิ่มเติม" />
      <DetailRow label="รายละเอียดหน่วยงาน" value={data.description} noDivider labelWidth="150px" />
    </ModalShell>
  );
}
