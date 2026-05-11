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

const LABEL_WIDTH = '220px';

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      py: 1.5, 
      px: 3, 
      borderBottom: '1px solid #eee',
      '&:last-child': { borderBottom: 'none' }
    }}
  >
    <Typography variant="body2" sx={{ width: LABEL_WIDTH, color: '#374151', fontWeight: 500 }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
      {value}
    </Typography>
  </Box>
);

const requestSchema = z.object({
  item: z.object({
    id: z.string(),
    itemCode: z.string(),
    itemName: z.string(),
    // Metadata fields made optional to match interface
    unit: z.string().optional(),
    mainStockBalance: z.number().optional(),
    currentBalance: z.number().optional(),
    pendingQuantity: z.number().optional(),
  }, { required_error: 'กรุณาเลือกรายการเวชภัณฑ์' }).nullable(),
  quantity: z.coerce.number({ invalid_type_error: 'กรุณาระบุจำนวน' }).positive('จำนวนต้องมากกว่า 0'),
  note: z.string().optional(),
});

type RequestFormValues = z.infer<typeof requestSchema>;

interface SupplyRequestModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: { item: SupplyItem; quantity: number; note?: string }) => void;
  initialItem?: SupplyItem | null;
}

export default function SupplyRequestModal({
  open,
  onClose,
  onConfirm,
  initialItem = null,
}: SupplyRequestModalProps) {
  const defaultValues: RequestFormValues = { 
    item: initialItem, 
    quantity: (initialItem as any)?.requestQuantity ?? 0,
    note: (initialItem as any)?.note ?? ''
  };

  const {
    control,
    onSubmit,
    formState: { errors },
  } = useFormModal<RequestFormValues>({
    schema: requestSchema,
    defaultValues,
    open,
    initialData: initialItem ? { 
      item: initialItem,
      quantity: (initialItem as any)?.requestQuantity ?? 0,
      note: (initialItem as any)?.note ?? ''
    } : undefined,
  });

  const handleConfirm = (data: RequestFormValues) => {
    if (data.item) {
      onConfirm({ 
        item: data.item as unknown as SupplyItem, 
        quantity: data.quantity,
        note: data.note
      });
      onClose();
    }
  };

  // const LABEL_WIDTH = '180px'; (Removed using constant above)

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="รายการขอเบิกพัสดุและเวชภัณฑ์"
      headerColor="#3f6ad8"
      contentSx={{ mt: 0, px: 0, pb: 2 }}
      actions={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 1, mb: 1 }}>
          <Button
            onClick={onClose}
            variant="text"
            sx={{ textTransform: 'none', color: 'text.secondary', fontWeight: 500 }}
          >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            onClick={onSubmit(handleConfirm)}
            startIcon={<span>+</span>}
            sx={{
              bgcolor: '#007bff',
              color: 'white',
              '&:hover': { bgcolor: '#0069d9' },
              textTransform: 'none',
              px: 3,
              py: 1,
              borderRadius: 1.5,
              fontWeight: 700,
              boxShadow: 'none',
              fontSize: '1rem',
            }}
          >
            เบิก
          </Button>
        </Box>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <InfoRow label="ชื่อเวชภัณฑ์ /พัสดุ" value={initialItem ? `${initialItem.itemCode} ${initialItem.itemName}` : '-'} />
        <InfoRow label="หน่วยบรรจุ" value={initialItem?.unit || '-'} />
        <InfoRow label="จำนวนคงคลัง (คลังใหญ่)" value={initialItem?.mainStockBalance || 0} />
        <InfoRow label="จำนวนคงคลังปัจจุบัน" value={initialItem?.currentBalance || 0} />
        <InfoRow label="จำนวนการเบิกคงค้าง" value={initialItem?.pendingQuantity || 0} />
        <InfoRow label="Quota สูงสุด" value={initialItem?.quota || 0} />

        <FormRow label="จำนวนที่ต้องการเบิก" required labelWidth={LABEL_WIDTH} sx={{ py: 2, px: 3, mb: 0 }}>
          <Controller
            name="quantity"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                type="number"
                placeholder="0"
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                slotProps={{
                  htmlInput: { min: 0 }
                }}
              />
            )}
          />
        </FormRow>

        <FormRow label="หมายเหตุ" labelWidth={LABEL_WIDTH} sx={{ py: 2, px: 3 }}>
          <Controller
            name="note"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                multiline
                rows={4}
                placeholder=""
                error={!!errors.note}
                helperText={errors.note?.message}
              />
            )}
          />
        </FormRow>
      </Box>
    </ModalShell>
  );
}
