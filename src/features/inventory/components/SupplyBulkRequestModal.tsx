'use client';

import React, { useState } from 'react';
import {
  TextField,
  Box,
  Typography,
  Divider,
  Autocomplete,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ModalShell } from '@components/ui';
import { supplyOptions, SupplyItem } from '../data/supplyOptions';
import { useRouter } from 'next/navigation';

const itemSchema = z.object({
  id: z.string(),
  itemCode: z.string(),
  itemName: z.string(),
  unit: z.string().optional(),
  mainStockBalance: z.number().optional(),
  currentBalance: z.number().optional(),
  pendingQuantity: z.number().optional(),
  quota: z.number().optional(),
  requestQuantity: z.coerce.number({ invalid_type_error: 'กรุณาระบุจำนวน' }).positive('จำนวนต้องมากกว่า 0'),
  note: z.string().optional(),
});

const bulkRequestSchema = z.object({
  items: z.array(itemSchema).min(1, 'กรุณาเพิ่มอย่างน้อย 1 รายการ'),
  generalNote: z.string().optional(),
});

type BulkRequestFormValues = z.infer<typeof bulkRequestSchema>;

interface SupplyBulkRequestModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: BulkRequestFormValues) => void;
  initialItems?: any[];
  onUpdateItems?: (items: any[]) => void;
  onEditItem?: (item: any) => void;
}

export default function SupplyBulkRequestModal({
  open,
  onClose,
  onConfirm,
  initialItems = [],
  onUpdateItems,
  onEditItem,
}: SupplyBulkRequestModalProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch,
  } = useForm<BulkRequestFormValues>({
    resolver: zodResolver(bulkRequestSchema),
    defaultValues: { items: [], generalNote: '' },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const [selectedSupply, setSelectedSupply] = useState<SupplyItem | null>(null);

  React.useEffect(() => {
    if (open) {
      reset({ items: initialItems, generalNote: '' });
      setSelectedSupply(null);
    }
  }, [open, reset, initialItems]);

  const handleAddItem = () => {
    if (selectedSupply) {
      if (fields.some((f: any) => f.itemCode === selectedSupply.itemCode)) {
        alert('รายการนี้ถูกเพิ่มไปแล้ว');
        return;
      }

      append({
        id: selectedSupply.id,
        itemCode: selectedSupply.itemCode,
        itemName: selectedSupply.itemName,
        unit: selectedSupply.unit || 'ชิ้น',
        mainStockBalance: selectedSupply.mainStockBalance,
        currentBalance: selectedSupply.currentBalance,
        pendingQuantity: selectedSupply.pendingQuantity,
        quota: selectedSupply.quota,
        requestQuantity: 1,
      });
      setSelectedSupply(null);
    }
  };

  const onSubmit = (data: BulkRequestFormValues) => {
    onConfirm(data);
    onClose();
    
    // Simulate navigation to the new detail page with a mock ID
    const mockId = `REQ-20240416-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    router.push(`/inventory/ward/requisition/${mockId}`);
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="รายการใบเบิกพัสดุแและเวชภัณฑ์"
      maxWidth="md"
      headerColor="#3f6ad8"
      contentSx={{ mt: 0, px: 0, minHeight: '500px' }}
      actions={
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', px: 2, pb: 1 }}>
          <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
            สถานะ: <Box component="span" sx={{ color: '#333', fontWeight: 700 }}>รอยืนยันการส่งเบิก</Box>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
             <Button onClick={onClose} sx={{ color: 'text.secondary', textTransform: 'none' }}>
              ยกเลิก
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disabled={fields.length === 0}
              startIcon={<span>+</span>}
              sx={{
                bgcolor: '#007bff',
                px: 3,
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: 'none',
                borderRadius: 1.5,
                '&:hover': { bgcolor: '#0069d9' },
              }}
            >
              ยืนยันการเบิก
            </Button>
          </Box>
        </Box>
      }
    >
      <Box sx={{ p: 3 }}>
        {/* Search Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#374151' }}>
            ค้นหาและเพิ่มรายการที่ต้องการเบิก
          </Typography>
          <Stack direction="row" spacing={1}>
            <Autocomplete
              fullWidth
              size="small"
              options={supplyOptions}
              getOptionLabel={(option) => `[${option.itemCode}] ${option.itemName}`}
              value={selectedSupply}
              onChange={(_, newValue) => setSelectedSupply(newValue)}
              renderInput={(params) => (
                <TextField {...params} placeholder="ระบุคีย์เวิร์ด, รหัส หรือชื่อเวชภัณฑ์..." />
              )}
            />
            <Button
              variant="outlined"
              startIcon={<AddCircleIcon />}
              onClick={handleAddItem}
              disabled={!selectedSupply}
              sx={{ textTransform: 'none', whiteSpace: 'nowrap', px: 3 }}
            >
              เพิ่มเข้าลิสต์
            </Button>
          </Stack>
        </Box>

        {/* Table Section */}
        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1, border: '1px solid #eee', mb: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#ffc107' }}>
                <TableCell sx={{ color: '#333', fontWeight: 700, py: 1.5 }}>ชื่อเวชภัณฑ์</TableCell>
                <TableCell align="center" sx={{ color: '#333', fontWeight: 700, width: 120 }}>จำนวนขอเบิก</TableCell>
                <TableCell align="center" sx={{ color: '#333', fontWeight: 700, width: 120 }}>หน่วยบรรจุ</TableCell>
                <TableCell align="center" sx={{ color: '#333', fontWeight: 700, width: 180 }}>กิจกรรม</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.length > 0 ? (
                fields.map((field: any, index: number) => (
                  <TableRow key={field.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {field.itemCode} {field.itemName}
                      </Typography>
                      {field.note && (
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            display: 'block', 
                            color: 'text.secondary', 
                            fontStyle: 'italic',
                            mt: 0.5,
                            pl: 1,
                            borderLeft: '2px solid #ddd'
                          }}
                        >
                          หมายเหตุ: {field.note}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">     
                        {field.requestQuantity}
                    </TableCell>
                    <TableCell align="center">
                      {field.unit}
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => onEditItem?.(field)}
                          startIcon={<EditIcon sx={{ fontSize: '14px !important' }} />}
                          sx={{ 
                            bgcolor: '#fbc02d', 
                            color: '#333', 
                            textTransform: 'none', 
                            fontSize: '12px',
                            minWidth: 'auto',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#f9a825' }
                          }}
                        >
                          แก้ไข
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => {
                            const newItems = fields.filter((_, i) => i !== index);
                            remove(index);
                            if (onUpdateItems) onUpdateItems(newItems);
                          }}
                          startIcon={<CloseIcon sx={{ fontSize: '14px !important' }} />}
                          sx={{ 
                            bgcolor: '#d32f2f', 
                            color: 'white', 
                            textTransform: 'none', 
                            fontSize: '12px',
                            minWidth: 'auto',
                            boxShadow: 'none',
                            '&:hover': { bgcolor: '#b71c1c' }
                          }}
                        >
                          ลบ
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                    <ShoppingCartIcon sx={{ fontSize: 40, color: '#ddd', mb: 1, display: 'block', mx: 'auto' }} />
                    ยังไม่มีรายการในใบเบิก
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Global Remarks */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#374151' }}>
            หมายเหตุการขอเบิก
          </Typography>
          <Controller
            name="generalNote"
            control={control}
            render={({ field }: { field: any }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                placeholder="ระบุหมายเหตุเพิ่มเติม (ถ้ามี)..."
                variant="outlined"
                sx={{ bgcolor: '#fff' }}
              />
            )}
          />
        </Box>
      </Box>
    </ModalShell>
  );
}
