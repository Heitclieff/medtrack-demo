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

interface UnitItem {
  id: string;
  name: string;
  building: string;
  internalNumber: string;
  description: string;
}

const unitSchema = z.object({
  name: z.string().min(1, 'กรุณาระบุชื่อหน่วยงาน'),
  building: z.string().min(1, 'กรุณาระบุอาคาร / สถานที่'),
  internalNumber: z.string().optional(),
  description: z.string().optional(),
});

type UnitFormValues = z.infer<typeof unitSchema>;

interface UnitModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Partial<UnitItem>) => void;
  initialData?: UnitItem | null;
}

const defaultValues: UnitFormValues = {
  name: '',
  building: '',
  internalNumber: '',
  description: '',
};

export default function UnitModal({
  open,
  onClose,
  onSave,
  initialData,
}: UnitModalProps) {
  const {
    control,
    onSubmit,
    formState: { errors },
  } = useFormModal<UnitFormValues>({
    schema: unitSchema,
    defaultValues,
    open,
    initialData: initialData
      ? { name: initialData.name, building: initialData.building, internalNumber: initialData.internalNumber, description: initialData.description }
      : undefined,
  });

  const handleSave = (data: UnitFormValues) => {
    onSave(data);
    onClose();
  };

  const isEdit = Boolean(initialData);
  const LABEL_WIDTH = '200px';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={isEdit ? 'แก้ไขข้อมูลหน่วยงาน' : 'เพิ่มหน่วยงานใหม่'}
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
            {isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มหน่วยงาน'}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <SectionHeader title="ข้อมูลหน่วยงานพื้นฐาน" />

        <FormRow label="ชื่อหน่วยงาน" required labelWidth={LABEL_WIDTH}>
          <Controller name="name" control={control}
            render={({ field }: { field: ControllerRenderProps<UnitFormValues, 'name'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="ระบุชื่อหน่วยงาน" error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
        </FormRow>

        <FormRow label="อาคาร / สถานที่" required labelWidth={LABEL_WIDTH}>
          <Controller name="building" control={control}
            render={({ field }: { field: ControllerRenderProps<UnitFormValues, 'building'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="ระบุอาคารและชั้น" error={!!errors.building} helperText={errors.building?.message} />
            )}
          />
        </FormRow>

        <FormRow label="หมายเลขโทรศัพท์ภายใน" hint="ตัวอย่าง: 1234" labelWidth={LABEL_WIDTH}>
          <Controller name="internalNumber" control={control}
            render={({ field }: { field: ControllerRenderProps<UnitFormValues, 'internalNumber'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="ระบุหมายเลขภายใน" />
            )}
          />
        </FormRow>

        <SectionHeader title="ข้อมูลเพิ่มเติม" />

        <FormRow label="รายละเอียดหน่วยงาน" labelWidth={LABEL_WIDTH}>
          <Controller name="description" control={control}
            render={({ field }: { field: ControllerRenderProps<UnitFormValues, 'description'> }) => (
              <TextField {...field} fullWidth size="small" multiline rows={3} placeholder="ระบุรายละเอียดเพิ่มเติม (ถ้ามี)" />
            )}
          />
        </FormRow>
      </Box>
    </ModalShell>
  );
}
