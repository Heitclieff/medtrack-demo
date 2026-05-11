import React from 'react';
import {
  Grid,
  Button,
  TextField,
  Autocomplete
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SectionHeader } from '@components/ui';
import { FormRow } from '@components/ui';
import { ModalShell } from '@components/ui';

const quotaComparisonSchema = z.object({
  dept: z.string(),
  category: z.string(),
});

type QuotaComparisonFormValues = z.infer<typeof quotaComparisonSchema>;

interface QuotaComparisonFilterModalProps {
  open: boolean;
  onClose: () => void;
  reportId: string;
  reportTitle?: string;
}

const QuotaComparisonFilterModal = ({
  open,
  onClose,
  reportId,
  reportTitle
}: QuotaComparisonFilterModalProps) => {
  const router = useRouter();

  const { control, handleSubmit } = useForm<QuotaComparisonFormValues>({
    resolver: zodResolver(quotaComparisonSchema),
    defaultValues: { dept: 'ทั้งหมด (คลังใหญ่ + วอร์ด)', category: 'ทุกหมวดหมู่' },
  });

  const onSubmit = (data: QuotaComparisonFormValues) => {
    const query = new URLSearchParams({ dept: data.dept, category: data.category, dateMode: 'none', sortOrder: 'none' }).toString();
    router.push(`/reports/${reportId}?${query}`);
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
      <SectionHeader title="การกรองข้อมูล" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormRow label="หน่วยงาน / คลัง" layout="vertical">
              <Controller name="dept" control={control} render={({ field }) => (
                <Autocomplete {...field} size="small"
                  options={['ทั้งหมด (คลังใหญ่ + วอร์ด)', 'คลังใหญ่ส่วนกลาง', 'คลังวอร์ด ER', 'คลังวอร์ด OR', 'คลังวอร์ด IPD 1']}
                  value={field.value} onChange={(_, val) => field.onChange(val || '')}
                  renderInput={(params) => <TextField {...params} placeholder="ค้นหาหน่วยงาน..." sx={{ bgcolor: 'white' }} />}
                />
              )} />
            </FormRow>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormRow label="หมวดหมู่เวชภัณฑ์" layout="vertical">
              <Controller name="category" control={control} render={({ field }) => (
                <Autocomplete {...field} size="small"
                  options={['ทุกหมวดหมู่', 'เวชภัณฑ์ทางการแพทย์', 'เวชภัณฑ์ที่มิใช่ยา', 'น้ำยาและสารเคมี', 'วัสดุสำนักงาน']}
                  value={field.value} onChange={(_, val) => field.onChange(val || '')}
                  renderInput={(params) => <TextField {...params} placeholder="ค้นหาหมวดหมู่..." sx={{ bgcolor: 'white' }} />}
                />
              )} />
            </FormRow>
          </Grid>
        </Grid>
      </form>
    </ModalShell>
  );
};

export default React.memo(QuotaComparisonFilterModal);
