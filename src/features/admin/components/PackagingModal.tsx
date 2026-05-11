'use client';

import React from 'react';
import { Button, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import { z } from 'zod';
import { FormRow } from '@components/ui';
import { SectionHeader } from '@components/ui';
import { ModalShell } from '@components/ui';
import { useFormModal } from '@/features/inventory/hooks/useFormModal';

interface PackagingItem {
  id: string;
  name: string;
}

const packagingSchema = z.object({
  name: z.string().min(1, 'กรุณาระบุชื่อหน่วยบรรจุภัณฑ์'),
});

type PackagingFormValues = z.infer<typeof packagingSchema>;

interface PackagingModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Partial<PackagingItem>) => void;
  initialData?: PackagingItem | null;
}

const defaultValues: PackagingFormValues = { name: '' };

export default function PackagingModal({
  open,
  onClose,
  onSave,
  initialData,
}: PackagingModalProps) {
  const {
    control,
    onSubmit,
    formState: { errors },
  } = useFormModal<PackagingFormValues>({
    schema: packagingSchema,
    defaultValues,
    open,
    initialData: initialData ? { name: initialData.name } : undefined,
  });

  const handleSave = (data: PackagingFormValues) => {
    onSave(data);
    onClose();
  };

  const isEdit = Boolean(initialData);
  const LABEL_WIDTH = '200px';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={isEdit ? 'แก้ไขข้อมูลหน่วยบรรจุภัณฑ์' : 'เพิ่มหน่วยบรรจุภัณฑ์ใหม่'}
      actions={
        <>
          <Button onClick={onClose} variant="text" sx={{ textTransform: 'none', color: 'text.secondary', mr: 1 }}>
            ยกเลิก
          </Button>
          <Button
            onClick={onSubmit(handleSave)}
            variant="contained"
            startIcon={isEdit ? <SaveIcon /> : <AddIcon />}
            sx={{ textTransform: 'none', fontWeight: 600, boxShadow: 'none', '&:hover': { bgcolor: '#0069d9', boxShadow: 'none' } }}
          >
            {isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มหน่วยบรรจุภัณฑ์'}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <SectionHeader title="ข้อมูลพื้นฐาน" />
        <FormRow label="ชื่อหน่วยบรรจุภัณฑ์" required hint="ตัวอย่าง: ชิ้น, กล่อง, แพ็ค" labelWidth={LABEL_WIDTH}>
          <Controller
            name="name"
            control={control}
            render={({ field }: { field: ControllerRenderProps<PackagingFormValues, 'name'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="ระบุชื่อหน่วยบรรจุภัณฑ์" error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
        </FormRow>
      </Box>
    </ModalShell>
  );
}
