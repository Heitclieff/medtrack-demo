import { Box, Typography, Button, Popover, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { STAFF_UNITS, STAFF_POSITIONS, STAFF_ROLES } from '../data/staffData';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

const staffFilterSchema = z.object({
  unit: z.string(),
  position: z.string(),
  role: z.string(),
  status: z.string(),
});

type StaffFilterValues = z.infer<typeof staffFilterSchema>;

interface StaffFilterPopoverProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  filters: StaffFilterValues;
  onFilterChange: (key: string, value: string) => void;
  onReset: () => void;
}

export default function StaffFilterPopover({
  anchorEl,
  onClose,
  filters,
  onFilterChange,
  onReset,
}: StaffFilterPopoverProps) {
  const open = Boolean(anchorEl);
  const id = open ? 'staff-filter-popover' : undefined;

  const { control, reset } = useForm<StaffFilterValues>({
    resolver: zodResolver(staffFilterSchema),
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
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        sx: { width: 320, p: 2, mt: 1, boxShadow: 3, borderRadius: 2 }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2">ตัวกรองข้อมูล</Typography>
        <Button 
          size="small" 
          onClick={() => {
            onReset();
          }} 
          sx={{ color: 'primary.main' }}
        >
          ล้างตัวกรอง
        </Button>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="staff-unit-label">หน่วยงาน</InputLabel>
          <Controller
            name="unit"
            control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFilterValues, 'unit'> }) => (
              <Select
                {...field}
                labelId="staff-unit-label"
                label="หน่วยงาน"
                onChange={(e) => {
                  field.onChange(e);
                  onFilterChange('unit', e.target.value as string);
                }}
              >
                {STAFF_UNITS.map(u => <MenuItem key={u} value={u}>{u}</MenuItem>)}
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="staff-position-label">ตำแหน่ง</InputLabel>
          <Controller
            name="position"
            control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFilterValues, 'position'> }) => (
              <Select
                {...field}
                labelId="staff-position-label"
                label="ตำแหน่ง"
                onChange={(e) => {
                  field.onChange(e);
                  onFilterChange('position', e.target.value as string);
                }}
              >
                {STAFF_POSITIONS.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="staff-role-label">สิทธิ์การใช้งาน</InputLabel>
          <Controller
            name="role"
            control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFilterValues, 'role'> }) => (
              <Select
                {...field}
                labelId="staff-role-label"
                label="สิทธิ์การใช้งาน"
                onChange={(e) => {
                  field.onChange(e);
                  onFilterChange('role', e.target.value as string);
                }}
              >
                {STAFF_ROLES.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
              </Select>
            )}
          />
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="staff-status-label">สถานะ</InputLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFilterValues, 'status'> }) => (
              <Select
                {...field}
                labelId="staff-status-label"
                label="สถานะ"
                onChange={(e) => {
                  field.onChange(e);
                  onFilterChange('status', e.target.value as string);
                }}
              >
                <MenuItem value="ทั้งหมด">ทั้งหมด</MenuItem>
                <MenuItem value="active">ใช้งาน</MenuItem>
                <MenuItem value="inactive">ระงับการใช้งาน</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Box>
    </Popover>
  );
}

