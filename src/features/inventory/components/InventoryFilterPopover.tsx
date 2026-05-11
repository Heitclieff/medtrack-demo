import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Popover, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Divider 
} from '@mui/material';
import { DateFilterBar } from '@components/ui';
import { categories } from '../data/inventoryData';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

const inventoryFilterSchema = z.object({
  category: z.string(),
  expiryStatus: z.string(),
  stockStatus: z.string(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

type InventoryFilterValues = z.infer<typeof inventoryFilterSchema>;

interface InventoryFilterPopoverProps {
  id?: string;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  filters: InventoryFilterValues;
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
}

const InventoryFilterPopover: React.FC<InventoryFilterPopoverProps> = ({
  id,
  anchorEl,
  onClose,
  filters,
  onFilterChange,
  onReset,
}) => {
  const open = Boolean(anchorEl);

  const { control, reset, watch } = useForm<InventoryFilterValues>({
    resolver: zodResolver(inventoryFilterSchema),
    defaultValues: filters,
  });

  // Update form when props change
  useEffect(() => {
    reset(filters);
  }, [filters, reset]);

  return (
    <Popover
      id={id || (open ? 'inventory-filter-popover' : undefined)}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: { width: 340, p: 2, mt: 1, boxShadow: 3, borderRadius: 2 }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>ตัวกรองขั้นสูง</Typography>
        <Button 
          size="small" 
          onClick={() => {
            onReset();
          }} 
          sx={{ textTransform: 'none' }}
        >
          ล้างตัวกรอง
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="category-filter-label">หมวดหมู่</InputLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }: { field: ControllerRenderProps<InventoryFilterValues, 'category'> }) => (
              <Select
                {...field}
                labelId="category-filter-label"
                label="หมวดหมู่"
                onChange={(e) => {
                  field.onChange(e);
                  onFilterChange('category', e.target.value);
                }}
              >
                {categories.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Divider sx={{ my: 0.5 }} />

        <FormControl fullWidth size="small">
          <InputLabel id="expiry-status-label">สถานะวันหมดอายุ</InputLabel>
          <Controller
            name="expiryStatus"
            control={control}
            render={({ field }: { field: ControllerRenderProps<InventoryFilterValues, 'expiryStatus'> }) => (
              <Select
                {...field}
                labelId="expiry-status-label"
                label="สถานะวันหมดอายุ"
                onChange={(e) => {
                  field.onChange(e);
                  onFilterChange('expiryStatus', e.target.value);
                }}
              >
                <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
                <MenuItem value="ใกล้หมดอายุ">ใกล้หมดอายุ (ภายใน 3 เดือน)</MenuItem>
                <MenuItem value="หมดอายุแล้ว">หมดอายุแล้ว</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <Box>
          <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: 'block', color: 'text.secondary' }}>ช่วงวันที่หมดอายุ</Typography>
          <DateFilterBar 
            flat 
            onSearch={(start, end) => {
              onFilterChange('startDate', start ? new Date(start) : null);
              onFilterChange('endDate', end ? new Date(end) : null);
            }}
          />
        </Box>

        <Divider sx={{ my: 0.5 }} />

        <FormControl fullWidth size="small">
          <InputLabel id="stock-status-label">สถานะคงเหลือ</InputLabel>
          <Controller
            name="stockStatus"
            control={control}
            render={({ field }: { field: ControllerRenderProps<InventoryFilterValues, 'stockStatus'> }) => (
              <Select
                {...field}
                labelId="stock-status-label"
                label="สถานะคงเหลือ"
                onChange={(e) => {
                  field.onChange(e);
                  onFilterChange('stockStatus', e.target.value);
                }}
              >
                <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
                <MenuItem value="คงคลัง">คงคลัง (Stock OK)</MenuItem>
                <MenuItem value="ใกล้หมด">ใกล้หมด (Low Stock)</MenuItem>
                <MenuItem value="หมดพัสดุ">หมดพัสดุ (Out of Stock)</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Box>
    </Popover>
  );
};

export default InventoryFilterPopover;
