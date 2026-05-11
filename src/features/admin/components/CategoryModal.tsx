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

interface CategoryItem {
  id: string;
  name: string;
}

const categorySchema = z.object({
  name: z.string().min(1, 'กรุณาระบุชื่อหมวดหมู่'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Partial<CategoryItem>) => void;
  initialData?: CategoryItem | null;
}

const defaultValues: CategoryFormValues = { name: '' };

export default function CategoryModal({
  open,
  onClose,
  onSave,
  initialData,
}: CategoryModalProps) {
  const {
    control,
    onSubmit,
    formState: { errors },
  } = useFormModal<CategoryFormValues>({
    schema: categorySchema,
    defaultValues,
    open,
    initialData: initialData ? { name: initialData.name } : undefined,
  });

  const handleSave = (data: CategoryFormValues) => {
    onSave(data);
    onClose();
  };

  const isEdit = Boolean(initialData);
  const LABEL_WIDTH = '200px';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={isEdit ? 'แก้ไขข้อมูลหมวดหมู่' : 'เพิ่มหมวดหมู่ใหม่'}
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
            {isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มหมวดหมู่'}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <SectionHeader title="ข้อมูลพื้นฐาน" />
        <FormRow label="ชื่อหมวดหมู่" required hint="ตัวอย่าง: เวชภัณฑ์ทางการแพทย์, ยาแผนปัจจุบัน" labelWidth={LABEL_WIDTH}>
          <Controller
            name="name"
            control={control}
            render={({ field }: { field: ControllerRenderProps<CategoryFormValues, 'name'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="ระบุชื่อหมวดหมู่" error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
        </FormRow>
      </Box>
    </ModalShell>
  );
}
