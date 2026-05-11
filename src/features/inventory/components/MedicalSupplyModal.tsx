'use client';

import React from 'react';
import {
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import { z } from 'zod';
import { FormRow } from '@components/ui';
import { SectionHeader } from '@components/ui';
import { ModalShell } from '@components/ui';
import { useFormModal } from '../hooks/useFormModal';

const medicalSupplySchema = z.object({
  name: z.string().min(1, 'กรุณาระบุชื่อเวชภัณฑ์'),
  code: z.string().min(1, 'กรุณาระบุรหัสเวชภัณฑ์'),
  category: z.string().min(1, 'กรุณาเลือกหมวดหมู่'),
  unit: z.string().min(1, 'กรุณาเลือกหน่วยบรรจุ'),
  balance: z.string().optional().default('0'),
  minStockPercent: z.string().optional().default('10'),
  maxStock: z.string().optional().default('100'),
  maxWardStock: z.string().optional().default('50'),
  barcode: z.string().optional(),
  expiryDate: z.string().optional().default(''),
  note: z.string().optional(),
  expiryThresholdDays: z.number().default(30),
  price: z.string().optional().default('0.00'),
});

type MedicalSupplyFormValues = z.infer<typeof medicalSupplySchema>;

interface MedicalSupplyModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Partial<MedicalSupplyFormValues>) => void;
  initialData?: any | null;
}

const defaultValues: MedicalSupplyFormValues = {
  name: '',
  code: '',
  category: 'เวชภัณฑ์ทางการแพทย์',
  unit: 'ชุด',
  balance: '0',
  minStockPercent: '10',
  maxStock: '100',
  maxWardStock: '50',
  barcode: '',
  expiryDate: '',
  note: '',
  expiryThresholdDays: 30,
  price: '0.00',
};

const categories = ['ทั้งหมด', 'เวชภัณฑ์ทางการแพทย์', 'ยาแผนปัจจุบัน', 'วัสดุสิ้นเปลือง'];
const units = ['ทั้งหมด', 'กล่อง', 'ขวด', 'แผง', 'ชุด'];

export default function MedicalSupplyModal({
  open,
  onClose,
  onSave,
  initialData,
}: MedicalSupplyModalProps) {
  const {
    control,
    onSubmit,
    formState: { errors },
  } = useFormModal<MedicalSupplyFormValues>({
    schema: medicalSupplySchema,
    defaultValues,
    open,
    initialData: initialData || undefined,
  });

  const handleSave = (data: MedicalSupplyFormValues) => {
    onSave(data);
    onClose();
  };

  const LABEL_WIDTH = '240px';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="นำเข้าเวชภัณฑ์และพัสดุ"
      contentSx={{ maxHeight: '80vh', overflowY: 'auto' }}
      actions={
        <Button
          onClick={onSubmit(handleSave)}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            boxShadow: 'none',
            '&:hover': { bgcolor: '#0069d9', boxShadow: 'none' },
          }}
        >
          {initialData ? 'บันทึก' : 'เพิ่ม'}
        </Button>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormRow label="รหัสเวชภัณฑ์ /พัสดุ" required labelWidth={LABEL_WIDTH}>
          <Controller
            name="code"
            control={control}
            render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'code'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="รหัสเวชภัณฑ์" error={!!errors.code} helperText={errors.code?.message} />
            )}
          />
        </FormRow>

        <FormRow label="ชื่อเวชภัณฑ์ /พัสดุ" required labelWidth={LABEL_WIDTH}>
          <Controller
            name="name"
            control={control}
            render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'name'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="ชื่อเวชภัณฑ์" error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
        </FormRow>

        <FormRow label="หมวดหมู่" required labelWidth={LABEL_WIDTH}>
          <FormControl fullWidth size="small" error={!!errors.category}>
            <Controller
              name="category"
              control={control}
              render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'category'> }) => (
                <Select {...field} displayEmpty>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat === 'ทั้งหมด' ? 'เลือกหมวดหมู่...' : cat}</MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.category?.message}</FormHelperText>
          </FormControl>
        </FormRow>

        <FormRow label="หน่วยบรรจุ" required labelWidth={LABEL_WIDTH}>
          <FormControl fullWidth size="small" error={!!errors.unit}>
            <Controller
              name="unit"
              control={control}
              render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'unit'> }) => (
                <Select {...field} displayEmpty>
                  {units.map((u) => (
                    <MenuItem key={u} value={u}>{u === 'ทั้งหมด' ? 'เลือกหน่วยบรรจุ...' : u}</MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.unit?.message}</FormHelperText>
          </FormControl>
        </FormRow>

        <FormRow label="รูปภาพเวชภัณฑ์พัสดุ" labelWidth={LABEL_WIDTH}>
          <Button
            variant="contained"
            startIcon={<PhotoCameraIcon />}
            sx={{
              textTransform: 'none',
              boxShadow: 'none',
              bgcolor: '#F3F4F6',
              color: '#374151',
              border: '1px solid #D1D5DB',
              '&:hover': { bgcolor: '#E5E7EB', boxShadow: 'none' },
            }}
          >
            เลือกไฟล์รูปภาพ
          </Button>
        </FormRow>

        <SectionHeader title="การตั้งค่าคงคลังและราคา" />

        <FormRow label="จำนวนคงคลัง" labelWidth={LABEL_WIDTH}>
          <Controller name="balance" control={control}
            render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'balance'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="0" />
            )}
          />
        </FormRow>

        <FormRow label="ราคาต่อหน่วย (บาท)" labelWidth={LABEL_WIDTH}>
          <Controller name="price" control={control}
            render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'price'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="0.00" type="number" slotProps={{ htmlInput: { step: "0.01" } }} />
            )}
          />
        </FormRow>

        <FormRow label="ระดับการเตือน ขั้นต่ำ (%)" labelWidth={LABEL_WIDTH}>
          <Controller name="minStockPercent" control={control}
            render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'minStockPercent'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="10" />
            )}
          />
        </FormRow>

        <FormRow label="จำนวนคงคลังสูงสุด" labelWidth={LABEL_WIDTH}>
          <Controller name="maxStock" control={control}
            render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'maxStock'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="100" />
            )}
          />
        </FormRow>

        <FormRow label="ค่าเริ่มต้น จำนวนคงคลังวอร์ดสูงสุด" labelWidth={LABEL_WIDTH}>
          <Controller name="maxWardStock" control={control}
            render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'maxWardStock'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="50" />
            )}
          />
        </FormRow>

        <SectionHeader title="การตรวจสอบวันหมดอายุ" />

        <FormRow label="วันหมดอายุ" labelWidth={LABEL_WIDTH}>
          <Controller name="expiryDate" control={control}
            render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'expiryDate'> }) => (
              <TextField {...field} fullWidth type="date" size="small" slotProps={{ inputLabel: { shrink: true } }} />
            )}
          />
        </FormRow>

        <FormRow label="แจ้งเตือนหมดอายุล่วงหน้า (วัน)" hint="กำหนดจำนวนวันที่ต้องการให้แจ้งเตือนว่า 'ใกล้หมดอายุ'" labelWidth={LABEL_WIDTH}>
          <FormControl fullWidth size="small">
            <Controller name="expiryThresholdDays" control={control}
              render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'expiryThresholdDays'> }) => (
                <Select {...field}>
                  {[1, 3, 7, 15, 30, 60, 90].map((day) => (
                    <MenuItem key={day} value={day}>{day} วัน</MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </FormRow>

        <SectionHeader title="ข้อมูลเพิ่มเติม" />

        <FormRow label="กำหนดรหัส Bar Code" hint="(ถ้าไม่ได้กำหนดระบบจะสร้างให้เอง)" labelWidth={LABEL_WIDTH}>
          <Controller name="barcode" control={control}
            render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'barcode'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="ระบุรหัสบาร์โค้ด" />
            )}
          />
        </FormRow>

        <FormRow label="หมายเหตุ" labelWidth={LABEL_WIDTH}>
          <Controller name="note" control={control}
            render={({ field }: { field: ControllerRenderProps<MedicalSupplyFormValues, 'note'> }) => (
              <TextField {...field} fullWidth size="small" multiline rows={3} placeholder="ระบุรายละเอียดเพิ่มเติม" />
            )}
          />
        </FormRow>
      </Box>
    </ModalShell>
  );
}
