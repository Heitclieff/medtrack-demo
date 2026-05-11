'use client';

import React from 'react';
import { Button, TextField, Box, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import { z } from 'zod';
import { FormRow } from '@components/ui';
import { SectionHeader } from '@components/ui';
import { ModalShell } from '@components/ui';
import { useFormModal } from '@/features/inventory/hooks/useFormModal';

const roleSchema = z.object({
  roleName: z.string().min(1, 'กรุณาระบุชื่อกลุ่มสิทธิ์'),
  copyFrom: z.string().optional(),
});

type RoleFormValues = z.infer<typeof roleSchema>;

interface RolePermissionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (roleName: string, copyFrom?: string) => void;
  mode: 'create' | 'edit';
  initialRoleName?: string;
  rolesList: string[];
}

export default function RolePermissionModal({
  open,
  onClose,
  onSave,
  mode,
  initialRoleName = '',
  rolesList,
}: RolePermissionModalProps) {
  const defaultValues: RoleFormValues = { roleName: initialRoleName, copyFrom: '' };

  const {
    control,
    onSubmit,
    formState: { errors },
  } = useFormModal<RoleFormValues>({
    schema: roleSchema,
    defaultValues,
    open,
    initialData: { roleName: initialRoleName, copyFrom: '' },
  });

  const handleSave = (data: RoleFormValues) => {
    onSave(data.roleName, data.copyFrom);
    onClose();
  };

  const isEdit = mode === 'edit';
  const LABEL_WIDTH = '180px';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={mode === 'create' ? 'สร้างกลุ่มสิทธิ์ใหม่' : 'แก้ไขชื่อกลุ่มสิทธิ์'}
      actions={
        <>
          <Button onClick={onClose} variant="text" sx={{ textTransform: 'none', color: '#6B7280', fontWeight: 600 }}>
            ยกเลิก
          </Button>
          <Button
            onClick={onSubmit(handleSave)}
            variant="contained"
            startIcon={mode === 'create' ? <AddIcon /> : <SaveIcon />}
            sx={{
              textTransform: 'none', bgcolor: '#3F6AD8', px: 3, py: 1, fontWeight: 600,
              boxShadow: 'none', '&:hover': { bgcolor: '#3155b1', boxShadow: 'none' },
            }}
          >
            {mode === 'create' ? 'เพิ่มกลุ่มสิทธิ์ใหม่' : 'บันทึกการแก้ไข'}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <SectionHeader title="ข้อมูลพื้นฐาน" />

        <FormRow label="ชื่อกลุ่มสิทธิ์" required hint="ตัวอย่าง: เจ้าหน้าทีคลัง, พยาบาลวอร์ด" labelWidth={LABEL_WIDTH}>
          <Controller name="roleName" control={control}
            render={({ field }: { field: ControllerRenderProps<RoleFormValues, 'roleName'> }) => (
              <TextField {...field} autoFocus fullWidth size="small" variant="outlined" placeholder="ระบุชื่อกลุ่มสิทธิ์" error={!!errors.roleName} helperText={errors.roleName?.message} />
            )}
          />
        </FormRow>

        {mode === 'create' && (
          <FormRow label="คัดลอกสิทธิ์จาก" hint="เว้นว่างไว้เพื่อสร้างสิทธิ์ใหม่แบบไม่มีสิทธิ์เริ่มต้น" labelWidth={LABEL_WIDTH}>
            <Controller name="copyFrom" control={control}
              render={({ field }: { field: ControllerRenderProps<RoleFormValues, 'copyFrom'> }) => (
                <Select {...field} fullWidth size="small" displayEmpty>
                  <MenuItem value=""><em>ไม่เลือก (สร้างแบบไม่มีสิทธิ์)</em></MenuItem>
                  {rolesList.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormRow>
        )}
      </Box>
    </ModalShell>
  );
}
