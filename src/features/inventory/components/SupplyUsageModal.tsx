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

const usageSchema = z.object({
  item: z.object({
    id: z.string(),
    itemCode: z.string(),
    itemName: z.string(),
  }, { required_error: 'กรุณาเลือกรายการเวชภัณฑ์' }).nullable(),
  quantity: z.number().positive('จำนวนต้องมากกว่า 0'),
});

type UsageFormValues = z.infer<typeof usageSchema>;

interface SupplyUsageModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: { item: SupplyItem; quantity: number }) => void;
  initialItem?: SupplyItem | null;
}

export default function SupplyUsageModal({
  open,
  onClose,
  onConfirm,
  initialItem = null,
}: SupplyUsageModalProps) {
  const defaultValues: UsageFormValues = { item: initialItem, quantity: 0 };

  const {
    control,
    onSubmit,
    formState: { errors },
  } = useFormModal<UsageFormValues>({
    schema: usageSchema,
    defaultValues,
    open,
    initialData: initialItem ? { item: initialItem } : undefined,
  });

  const handleConfirm = (data: UsageFormValues) => {
    if (data.item) {
      onConfirm({ item: data.item, quantity: data.quantity });
      onClose();
    }
  };

  const LABEL_WIDTH = '180px';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="บันทึกการใช้พัสดุและเวชภัณฑ์"
      headerColor="#ffc107"
      headerTextColor="#000"
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
              bgcolor: '#ffc107',
              color: '#000',
              '&:hover': { bgcolor: '#e0a800' },
              textTransform: 'none',
              px: 4,
              fontWeight: 700,
              boxShadow: 'none',
            }}
          >
            ยืนยันการใช้
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ffc107', mb: 2 }}>
          รายละเอียดการใช้งาน
        </Typography>

        <FormRow label="รายการเวชภัณฑ์" required={!initialItem} labelWidth={LABEL_WIDTH}>
          {initialItem ? (
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#111827', pt: 0.5 }}>
              {initialItem.itemName}
            </Typography>
          ) : (
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
          )}
        </FormRow>

        {initialItem && (
          <FormRow label="รหัสเวชภัณฑ์" labelWidth={LABEL_WIDTH}>
            <Typography variant="body2" sx={{ pt: 0.5, fontWeight: 500, color: '#111827' }}>
              {initialItem.itemCode}
            </Typography>
          </FormRow>
        )}

        <Divider sx={{ my: initialItem ? 2 : 3 }} />

        <FormRow label="จำนวนที่ใช้งาน" required labelWidth={LABEL_WIDTH}>
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
