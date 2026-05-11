'use client';

import React from 'react';
import {
  TextField,
  Box,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Autocomplete,
  FormHelperText,
  Button,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormRow } from '@components/ui';
import { ModalShell } from '@components/ui';
import { assignSupplyOptions, wardOptions } from '../data/supplyOptions';

interface AssignmentData {
  ward?: string;
  itemCode: string;
  itemName: string;
  minLimit: number;
  maxLimit: number;
}

const assignSchemaBase = z.object({
  ward: z.string().optional(),
  item: z.object({
    code: z.string(),
    name: z.string(),
  }, { required_error: 'กรุณาเลือกรายการเวชภัณฑ์' }).nullable(),
  minLimit: z.number().min(0, 'ต้องไม่ติดลบ'),
  maxLimit: z.number().min(0, 'ต้องไม่ติดลบ'),
});

type AssignFormValues = z.infer<typeof assignSchemaBase>;

interface AssignSupplyModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: AssignmentData) => void;
  mode?: 'ward' | 'general';
}

const defaultValues: AssignFormValues = {
  ward: '',
  item: null,
  minLimit: 0,
  maxLimit: 0,
};

export default function AssignSupplyModal({
  open,
  onClose,
  onSave,
  mode = 'ward',
}: AssignSupplyModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignFormValues>({
    resolver: zodResolver(assignSchemaBase.superRefine((data, ctx) => {
      if (mode === 'ward' && !data.ward) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "กรุณาเลือกหน่วยงาน",
          path: ["ward"],
        });
      }
      if (!data.item) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "กรุณาเลือกรายการเวชภัณฑ์",
          path: ["item"],
        });
      }
    })),
    defaultValues,
  });

  React.useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  const onSubmit = (data: AssignFormValues) => {
    if (data.item) {
      onSave({
        ...(mode === 'ward' ? { ward: data.ward } : {}),
        itemCode: data.item.code,
        itemName: data.item.name,
        minLimit: data.minLimit,
        maxLimit: data.maxLimit,
      });
      onClose();
    }
  };

  const LABEL_WIDTH = '180px';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={mode === 'ward' ? 'กำหนดเวชภัณฑ์สำหรับหน่วยงาน' : 'กำหนดเวชภัณฑ์สำหรับคลังใหญ่'}
      contentSx={{ mt: 3 }}
      actions={
        <>
          <Button
            onClick={onClose}
            variant="text"
            sx={{ textTransform: 'none', color: 'text.secondary', mr: 1 }}
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              bgcolor: '#3F6AD8',
              '&:hover': { bgcolor: '#3155b1', boxShadow: 'none' },
            }}
          >
            {mode === 'ward' ? 'กำหนดเวชภัณฑ์' : 'เพิ่มรายการกำหนด'}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3F6AD8', mb: 2 }}>
          {mode === 'ward' ? 'เลือกหน่วยงานและเวชภัณฑ์' : 'เลือกเวชภัณฑ์'}
        </Typography>

        {mode === 'ward' && (
          <FormRow label="หน่วยงาน/วอร์ด" required labelWidth={LABEL_WIDTH}>
            <FormControl fullWidth size="small" error={!!errors.ward}>
              <Controller
                name="ward"
                control={control}
                render={({ field }) => (
                  <Select {...field} displayEmpty>
                    <MenuItem value="" disabled>เลือกหน่วยงาน...</MenuItem>
                    {wardOptions.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.ward && <FormHelperText>{errors.ward.message}</FormHelperText>}
            </FormControl>
          </FormRow>
        )}

        <FormRow label="รายการเวชภัณฑ์" required labelWidth={LABEL_WIDTH}>
          <Controller
            name="item"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                size="small"
                options={assignSupplyOptions}
                getOptionLabel={(option) => option ? `[${option.code}] ${option.name}` : ''}
                isOptionEqualToValue={(option, value) => option.code === value?.code}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="ค้นหาหรือเลือกเวชภัณฑ์..."
                    error={!!errors.item}
                    helperText={errors.item?.message}
                  />
                )}
              />
            )}
          />
        </FormRow>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3F6AD8', mb: 2 }}>
          ตั้งค่าปริมาณสำรอง (Inventory Limits)
        </Typography>

        <FormRow label="Minimum Stock (Min)" labelWidth={LABEL_WIDTH}>
          <Controller
            name="minLimit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                type="number"
                placeholder="0"
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors.minLimit}
                helperText={errors.minLimit?.message}
              />
            )}
          />
        </FormRow>

        <FormRow label="Maximum Stock (Max)" labelWidth={LABEL_WIDTH}>
          <Controller
            name="maxLimit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                type="number"
                placeholder="0"
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors.maxLimit}
                helperText={errors.maxLimit?.message}
              />
            )}
          />
        </FormRow>
      </Box>
    </ModalShell>
  );
}
