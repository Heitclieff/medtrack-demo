'use client';

import React from 'react';
import {
  Button,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ModalShell } from '@components/ui';

const barcodeGeneratorSchema = z.object({
  printSize: z.enum(['small', 'large']),
});

type BarcodeGeneratorValues = z.infer<typeof barcodeGeneratorSchema>;

interface InventoryItem {
  id: string;
  name: string;
  code: string;
  barcode: string;
}

interface BarcodeGeneratorModalProps {
  open: boolean;
  onClose: () => void;
  items: InventoryItem[];
}

export default function BarcodeGeneratorModal({
  open,
  onClose,
  items,
}: BarcodeGeneratorModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { control, handleSubmit } = useForm<BarcodeGeneratorValues>({
    resolver: zodResolver(barcodeGeneratorSchema),
    defaultValues: { printSize: 'small' },
  });

  const onSubmit = (data: BarcodeGeneratorValues) => {
    console.log('Printing barcodes with size:', data.printSize);
  };

  if (items.length === 0) return null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="ออกบาร์โค้ด"
      fullScreen={fullScreen}
      contentSx={{ p: 0, maxHeight: '70vh', overflowY: 'auto' }}
      actions={
        <>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ textTransform: 'none', color: 'text.secondary', borderColor: '#d1d5db' }}
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            startIcon={<PrintIcon />}
            sx={{
              bgcolor: '#007bff',
              textTransform: 'none',
              px: 3,
              '&:hover': { bgcolor: '#0069d9' },
            }}
          >
            พิมพ์บาร์โค้ด
          </Button>
        </>
      }
    >
      <Box sx={{ p: 3 }}>
        {items.map((item, index) => (
          <Box key={item.id} sx={{ mb: index === items.length - 1 ? 0 : 6 }}>
            {/* Item Info Table-like structure */}
            <Box sx={{ border: '1px solid #e5e7eb', borderRadius: 1, overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
                <Box sx={{ width: 140, p: 1.5, bgcolor: '#f9fafb', borderRight: '1px solid #e5e7eb' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>ชื่อเวชภัณฑ์</Typography>
                </Box>
                <Box sx={{ flex: 1, p: 1.5 }}>
                  <Typography variant="body2">{item.name}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: 140, p: 1.5, bgcolor: '#f9fafb', borderRight: '1px solid #e5e7eb' }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>รหัสเวชภัณฑ์ (SKU)</Typography>
                </Box>
                <Box sx={{ flex: 1, p: 1.5 }}>
                  <Typography variant="body2">{item.code}</Typography>
                </Box>
              </Box>
            </Box>

            {/* Barcode Preview Area */}
            <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Box sx={{ mr: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>บาร์โค้ด</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{
                    width: 300, height: 100, bgcolor: 'white',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Box sx={{
                      width: '100%', height: 80,
                      backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px, #000 4px, #000 5px, transparent 5px, transparent 7px)',
                      backgroundSize: '20px 100%',
                    }} />
                    <Typography variant="h6" sx={{ mt: 1, letterSpacing: 2, fontWeight: 600 }}>
                      {item.barcode || item.code}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            {index < items.length - 1 && <Divider sx={{ my: 4, borderStyle: 'dashed' }} />}
          </Box>
        ))}

        <Divider sx={{ width: '100%', my: 4 }} />

        {/* Print Size Selection */}
        <Box sx={{ width: '100%', display: 'flex', pb: 2 }}>
          <Box sx={{ width: 140, pt: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>ขนาดที่ต้องการพิมพ์</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormControl component="fieldset">
              <Controller
                name="printSize"
                control={control}
                render={({ field }: { field: ControllerRenderProps<BarcodeGeneratorValues, 'printSize'> }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel value="small" control={<Radio size="small" />} label={<Typography variant="body2">ขนาดเล็ก : 7ซม. x 2.5ซม.</Typography>} />
                    <FormControlLabel value="large" control={<Radio size="small" />} label={<Typography variant="body2">ขนาดใหญ่ : 8ซม. x 4.8ซม.</Typography>} />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Box>
        </Box>
      </Box>
    </ModalShell>
  );
}
