import { Box, Typography, Button, Popover, FormControl, InputLabel, Select, MenuItem, Divider } from '@mui/material';
import { DateFilterBar } from '@components/ui';
import { 
  WARD_INVENTORY_CATEGORIES, 
  EXPIRY_STATUS_OPTIONS, 
  STOCK_STATUS_OPTIONS 
} from '../data/wardInventoryData';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

const wardInventoryFilterSchema = z.object({
  category: z.string(),
  expiryStatus: z.string(),
  stockStatus: z.string(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
});

type WardInventoryFilterValues = z.infer<typeof wardInventoryFilterSchema>;

interface WardInventoryFilterPopoverProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  filters: WardInventoryFilterValues;
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
}

export default function WardInventoryFilterPopover({
  anchorEl,
  onClose,
  filters,
  onFilterChange,
  onReset,
}: WardInventoryFilterPopoverProps) {
  const open = Boolean(anchorEl);
  const id = open ? 'ward-inventory-filter-popover' : undefined;

  const { control, reset } = useForm<WardInventoryFilterValues>({
    resolver: zodResolver(wardInventoryFilterSchema),
    defaultValues: filters,
  });

  // Update form when props change
  useEffect(() => {
    reset(filters);
  }, [filters, reset]);

  return (
    <Popover
      id={id}
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
          <InputLabel id="ward-category-label">หมวดหมู่</InputLabel>
          <Controller
            name="category"
            control={control}
            render={({ field }: { field: ControllerRenderProps<WardInventoryFilterValues, 'category'> }) => (
              <Select
                {...field}
                labelId="ward-category-label"
                label="หมวดหมู่"
                onChange={(e) => {
                  field.onChange(e);
                  onFilterChange('category', e.target.value);
                }}
              >
                {WARD_INVENTORY_CATEGORIES.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Divider sx={{ my: 0.5 }} />

        <FormControl fullWidth size="small">
          <InputLabel id="ward-expiry-status-label">สถานะวันหมดอายุ</InputLabel>
          <Controller
            name="expiryStatus"
            control={control}
            render={({ field }: { field: ControllerRenderProps<WardInventoryFilterValues, 'expiryStatus'> }) => (
              <Select
                {...field}
                labelId="ward-expiry-status-label"
                label="สถานะวันหมดอายุ"
                onChange={(e) => {
                  field.onChange(e);
                  onFilterChange('expiryStatus', e.target.value);
                }}
              >
                {EXPIRY_STATUS_OPTIONS.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
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
          <InputLabel id="ward-stock-status-label">สถานะคงเหลือ</InputLabel>
          <Controller
            name="stockStatus"
            control={control}
            render={({ field }: { field: ControllerRenderProps<WardInventoryFilterValues, 'stockStatus'> }) => (
              <Select
                {...field}
                labelId="ward-stock-status-label"
                label="สถานะคงเหลือ"
                onChange={(e) => {
                  field.onChange(e);
                  onFilterChange('stockStatus', e.target.value);
                }}
              >
                {STOCK_STATUS_OPTIONS.map(opt => (
                  <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Box>
    </Popover>
  );
}

