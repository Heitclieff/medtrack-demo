import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SectionHeader } from '@components/ui';
import { FormRow } from '@components/ui';
import { ModalShell } from '@components/ui';

const movementSchema = z.object({
  frequency: z.string(),
  specificDate: z.string().optional(),
});

type MovementFormValues = z.infer<typeof movementSchema>;

interface MovementFilterModalProps {
  open: boolean;
  onClose: () => void;
  reportId: string;
  reportTitle?: string;
}

const MovementFilterModal = ({
  open,
  onClose,
  reportId,
  reportTitle
}: MovementFilterModalProps) => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<MovementFormValues>({
    resolver: zodResolver(movementSchema),
    defaultValues: { frequency: 'daily', specificDate: '' },
  });

  const frequency = watch('frequency');

  const onSubmit = (data: MovementFormValues) => {
    const query = new URLSearchParams({
      dateMode: data.frequency,
      dept: 'ทั้งหมด (คลังใหญ่ + วอร์ด)',
      category: 'ทุกหมวดหมู่',
      item: 'ทั้งหมด',
      sortOrder: 'none'
    });
    if (data.frequency === 'daily' && data.specificDate) query.append('date', data.specificDate);
    router.push(`/reports/${reportId}?${query.toString()}`);
    onClose();
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={`กำหนดเงื่อนไขรายงาน : ${reportTitle}`}
      contentSx={{ p: 4, mt: 2 }}
      actions={
        <>
          <Button onClick={onClose} variant="text" sx={{ textTransform: 'none', color: '#6B7280', fontWeight: 600, mr: 1 }}>
            ยกเลิก
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)} sx={{ boxShadow: 'none', '&:hover': { bgcolor: '#3155b1', boxShadow: 'none' } }}>
            แสดงรายงาน
          </Button>
        </>
      }
    >
      <SectionHeader title="ประเภทช่วงเวลา" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          <FormRow label="ความถี่ของรายงาน" layout="vertical">
            <Controller name="frequency" control={control} render={({ field }) => (
              <Select {...field} fullWidth size="small" sx={{ bgcolor: 'white' }}>
                <MenuItem value="daily">รายวัน (เลือกวันที่เจาะจง)</MenuItem>
                <MenuItem value="monthly">รายเดือน (ย้อนหลัง 30 วัน)</MenuItem>
                <MenuItem value="yearly">รายปี (ปีงบประมาณปัจจุบัน)</MenuItem>
              </Select>
            )} />
          </FormRow>

          <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
            <Box sx={{ display: frequency === 'daily' ? 'flex' : 'none', ml: 1 }}>
              <Box sx={{ width: 14, mb: 2.5, mr: 1, alignSelf: 'stretch', borderLeft: '2px solid #E5E7EB', borderBottom: '2px solid #E5E7EB' }} />
              <Box sx={{ flexGrow: 1, py: 0.5 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <FormRow label="ระบุวันที่" layout="vertical">
                      <Controller name="specificDate" control={control} render={({ field }) => (<TextField {...field} fullWidth type="date" size="small" />)} />
                    </FormRow>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    </ModalShell>
  );
};

export default React.memo(MovementFilterModal);
