'use client';

import React from 'react';
import {
  TextField,
  Box,
  Typography,
  Divider,
  Autocomplete,
  Button,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { z } from 'zod';
import { FormRow } from '@components/ui';
import { ModalShell } from '@components/ui';
import { useFormModal } from '../hooks/useFormModal';
import { supplyOptions, SupplyItem } from '../data/supplyOptions';

const returnSchema = z.object({
  item: z.object({
    id: z.string(),
    itemCode: z.string(),
    itemName: z.string(),
  }, { required_error: 'กรุณาเลือกรายการเวชภัณฑ์' }).nullable(),
  quantity: z.number().positive('จำนวนต้องมากกว่า 0'),
});

type ReturnFormValues = z.infer<typeof returnSchema>;

interface SupplyReturnModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: { item: SupplyItem; quantity: number }[]) => void;
}

const defaultValues: ReturnFormValues = { item: null, quantity: 0 };

export default function SupplyReturnModal({
  open,
  onClose,
  onConfirm,
}: SupplyReturnModalProps) {
  const {
    control,
    onSubmit,
    formState: { errors },
  } = useFormModal<ReturnFormValues>({
    schema: returnSchema,
    defaultValues,
    open,
  });

  const handleConfirm = (data: ReturnFormValues) => {
    if (data.item) {
      onConfirm([{ item: data.item, quantity: data.quantity }]);
      onClose();
    }
  };

  const LABEL_WIDTH = '180px';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="เลือกรายการคืนพัสดุและเวชภัณฑ์"
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
            variant="contained"
            onClick={onSubmit(handleConfirm)}
            sx={{
              bgcolor: '#3F6AD8',
              '&:hover': { bgcolor: '#3155b1' },
              textTransform: 'none',
              px: 4,
              fontWeight: 600,
              boxShadow: 'none',
            }}
          >
            ยืนยันการคืน
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3F6AD8', mb: 2 }}>
          เลือกรายละเอียดการคืน
        </Typography>

        <FormRow label="รายการเวชภัณฑ์" required labelWidth={LABEL_WIDTH}>
          <Controller
            name="item"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                size="small"
                options={supplyOptions}
                getOptionLabel={(option) => option ? `[${option.itemCode}] ${option.itemName}` : ''}
                isOptionEqualToValue={(option, value) => option.id === value?.id}
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

        <FormRow label="จำนวนที่ต้องการคืน" required labelWidth={LABEL_WIDTH}>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                type="number"
                placeholder="0"
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
              />
            )}
          />
        </FormRow>
      </Box>
    </ModalShell>
  );
}
