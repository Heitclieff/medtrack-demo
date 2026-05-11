'use client';

import React from 'react';
import {
  TextField,
  Box,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Controller } from 'react-hook-form';
import { z } from 'zod';
import { FormRow } from '@components/ui';
import { ModalShell } from '@components/ui';
import { useFormModal } from '../hooks/useFormModal';

interface QuotaData {
  id: string;
  itemCode: string;
  itemName: string;
  ward?: string;
  minLimit: number;
  maxLimit: number;
}

const quotaSchema = z.object({
  minLimit: z.number().min(0, 'ต้องไม่ติดลบ'),
  maxLimit: z.number().min(0, 'ต้องไม่ติดลบ'),
});

type QuotaFormValues = z.infer<typeof quotaSchema>;

interface QuotaModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: { minLimit: number; maxLimit: number }) => void;
  initialData: QuotaData | null;
}

const defaultValues: QuotaFormValues = { minLimit: 0, maxLimit: 0 };

export default function QuotaModal({
  open,
  onClose,
  onSave,
  initialData,
}: QuotaModalProps) {
  const {
    control,
    onSubmit,
    reset,
    formState: { errors },
  } = useFormModal<QuotaFormValues>({
    schema: quotaSchema,
    defaultValues,
    open,
    initialData: initialData ? {
      minLimit: initialData.minLimit,
      maxLimit: initialData.maxLimit,
    } : undefined,
  });

  const handleSave = (data: QuotaFormValues) => {
    onSave(data);
    onClose();
  };

  const handleResetForm = () => {
    reset(defaultValues);
  };

  const LABEL_WIDTH = '180px';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="กำหนด Min/Max Stock"
      maxWidth="xs"
      contentSx={{ mt: 1 }}
      actions={
        <>
          <Button
            onClick={onClose}
            variant="text"
            sx={{ textTransform: 'none', color: 'text.secondary' }}
          >
            ยกเลิก
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Button
              onClick={handleResetForm}
              variant="contained"
              startIcon={<RestartAltIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                bgcolor: '#F3F4F6',
                color: '#374151',
                boxShadow: 'none',
                border: '1px solid #E5E7EB',
                '&:hover': { bgcolor: '#E5E7EB', boxShadow: 'none' },
              }}
            >
              รีเซ็ต
            </Button>
            <Button
              onClick={onSubmit(handleSave)}
              variant="contained"
              startIcon={<EditIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 'none',
                bgcolor: '#3F6AD8',
                '&:hover': { bgcolor: '#3155b1', boxShadow: 'none' },
              }}
            >
              กำหนด
            </Button>
          </Box>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', pt: 1 }}>
        <Box sx={{ mb: 3 }}>
          {initialData?.ward && (
            <>
              <Typography variant="caption" color="text.secondary" display="block">หน่วยงาน</Typography>
              <Typography variant="body1" fontWeight={700} gutterBottom>
                {initialData.ward}
              </Typography>
            </>
          )}
          <Typography variant="caption" color="text.secondary" display="block">รหัสเวชภัณฑ์</Typography>
          <Typography variant="body1" fontWeight={600} gutterBottom>{initialData?.itemCode}</Typography>
          <Typography variant="caption" color="text.secondary" display="block">ชื่อเวชภัณฑ์</Typography>
          <Typography variant="body1" fontWeight={600}>{initialData?.itemName}</Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

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
