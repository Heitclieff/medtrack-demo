import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SectionHeader } from '@components/ui';
import { FormRow } from '@components/ui';
import { ModalShell } from '@components/ui';

const stockBalanceSchema = z.object({
  timeType: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  sortOrder: z.string(),
});

type StockBalanceFormValues = z.infer<typeof stockBalanceSchema>;

interface StockBalanceFilterModalProps {
  open: boolean;
  onClose: () => void;
  reportId: string;
  reportTitle?: string;
}

const StockBalanceFilterModal = ({
  open,
  onClose,
  reportId,
  reportTitle
}: StockBalanceFilterModalProps) => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<StockBalanceFormValues>({
    resolver: zodResolver(stockBalanceSchema),
    defaultValues: { timeType: 'all', startDate: '', endDate: '', sortOrder: 'desc' },
  });

  const timeType = watch('timeType');

  const onSubmit = (data: StockBalanceFormValues) => {
    const query = new URLSearchParams({
      dateMode: data.timeType, sortOrder: data.sortOrder,
      dept: 'ทั้งหมด (คลังใหญ่ + วอร์ด)', category: 'ทุกหมวดหมู่', item: 'ทั้งหมด'
    });
    if (data.timeType === 'custom') {
      if (data.startDate) query.append('startDate', data.startDate);
      if (data.endDate) query.append('endDate', data.endDate);
    }
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
          <FormRow label="ประเภทช่วงเวลา" layout="vertical">
            <Controller name="timeType" control={control} render={({ field }) => (
              <Select {...field} fullWidth size="small" sx={{ bgcolor: 'white' }}>
                <MenuItem value="all">ทั้งหมด (ไม่กำหนดช่วงเวลา)</MenuItem>
                <MenuItem value="7">7 วัน ล่าสุด</MenuItem>
                <MenuItem value="14">14 วัน ล่าสุด</MenuItem>
                <MenuItem value="30">30 วัน ล่าสุด</MenuItem>
                <MenuItem value="60">60 วัน ล่าสุด</MenuItem>
                <MenuItem value="custom">กำหนดเอง (ระบุช่วงวันที่)</MenuItem>
              </Select>
            )} />
          </FormRow>

          <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', ml: 1 }}>
              {timeType === 'custom' && (
                <>
                  <Box sx={{ width: 14, mb: 2.5, mr: 1, alignSelf: 'stretch', borderLeft: '2px solid #E5E7EB', borderBottom: '2px solid #E5E7EB' }} />
                  <Box sx={{ flexGrow: 1, py: 0.5 }}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 5.5 }}>
                        <FormRow label="วันที่เริ่มต้น" layout="vertical">
                          <Controller name="startDate" control={control} render={({ field }) => (<TextField {...field} fullWidth type="date" size="small" />)} />
                        </FormRow>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 1 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 2.5 }}>
                        <Typography variant="caption" sx={{ color: '#9CA3AF', fontWeight: 800 }}>ถึง</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 5.5 }}>
                        <FormRow label="วันที่สิ้นสุด" layout="vertical">
                          <Controller name="endDate" control={control} render={({ field }) => (<TextField {...field} fullWidth type="date" size="small" />)} />
                        </FormRow>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}
            </Box>

            <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
              <FormRow label="เรียงลำดับตามจำนวนคงเหลือ" layout="vertical">
                <Controller name="sortOrder" control={control} render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel value="desc" control={<Radio size="small" />} label={<Typography variant="body2" sx={{ fontWeight: 500 }}>มากสุด-น้อยสุด</Typography>} />
                    <FormControlLabel value="asc" control={<Radio size="small" />} label={<Typography variant="body2" sx={{ fontWeight: 500 }}>น้อยสุด-มากสุด</Typography>} />
                  </RadioGroup>
                )} />
              </FormRow>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </ModalShell>
  );
};

export default React.memo(StockBalanceFilterModal);
