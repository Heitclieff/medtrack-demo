import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Select,
  MenuItem,
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

const detailedReportSchema = z.object({
  dateMode: z.string(),
  dailyDate: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  year: z.number().optional(),
  month: z.number().optional(),
  yearType: z.string().optional(),
  dept: z.string(),
  category: z.string(),
  item: z.string(),
});

type DetailedReportFormValues = z.infer<typeof detailedReportSchema>;

interface DetailedReportFilterModalProps {
  open: boolean;
  onClose: () => void;
  reportId: string;
  reportTitle?: string;
}

const DetailedReportFilterModal = ({
  open,
  onClose,
  reportId,
  reportTitle
}: DetailedReportFilterModalProps) => {
  const router = useRouter();

  const { control, handleSubmit, watch } = useForm<DetailedReportFormValues>({
    resolver: zodResolver(detailedReportSchema),
    defaultValues: {
      dateMode: 'daily', dailyDate: '', startDate: '', endDate: '',
      year: 2567, month: 3, yearType: 'fiscal',
      dept: 'ทั้งหมด (คลังใหญ่ + วอร์ด)', category: 'ทุกหมวดหมู่', item: 'ทั้งหมด',
    },
  });

  const dateMode = watch('dateMode');

  const onSubmit = (data: DetailedReportFormValues) => {
    const query = new URLSearchParams({ dateMode: data.dateMode, dept: data.dept, category: data.category, item: data.item, sortOrder: 'none' });
    if (data.dateMode === 'daily' && data.dailyDate) query.append('date', data.dailyDate);
    if (data.dateMode === 'range') {
      if (data.startDate) query.append('startDate', data.startDate);
      if (data.endDate) query.append('endDate', data.endDate);
    }
    if (data.dateMode === 'monthly') {
      if (data.year) query.append('year', data.year.toString());
      if (data.month) query.append('month', data.month.toString());
    }
    if (data.dateMode === 'yearly') {
      if (data.year) query.append('year', data.year.toString());
      if (data.yearType) query.append('yearType', data.yearType);
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
          <FormRow label="เลือกความถี่ของรายงาน" layout="vertical">
            <Controller name="dateMode" control={control}
              render={({ field }) => (
                <Select {...field} fullWidth size="small" sx={{ bgcolor: 'white' }}>
                  <MenuItem value="daily">รายวัน (เลือกวันที่เจาะจง)</MenuItem>
                  <MenuItem value="range">ช่วงวันที่ (กำหนดวันเริ่มต้น-สิ้นสุด)</MenuItem>
                  <MenuItem value="monthly">รายเดือน (เลือกปีและเดือน)</MenuItem>
                  <MenuItem value="yearly">รายปี (ปีงบประมาณ/ปีปฏิทิน)</MenuItem>
                </Select>
              )}
            />
          </FormRow>

          <Grid size={{ xs: 12 }} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', ml: 1 }}>
              <Box sx={{ width: 14, mb: 2.5, mr: 1, alignSelf: 'stretch', borderLeft: '2px solid #E5E7EB', borderBottom: '2px solid #E5E7EB' }} />
              <Box sx={{ flexGrow: 1, py: 0.5 }}>
                <Grid container spacing={2}>
                  {dateMode === 'daily' && (
                    <Grid size={{ xs: 12 }}>
                      <FormRow label="ระบุวันที่" layout="vertical">
                        <Controller name="dailyDate" control={control} render={({ field }) => (<TextField {...field} fullWidth type="date" size="small" />)} />
                      </FormRow>
                    </Grid>
                  )}
                  {dateMode === 'range' && (
                    <>
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
                    </>
                  )}
                  {dateMode === 'monthly' && (
                    <>
                      <Grid size={{ xs: 12, sm: 5 }}>
                        <FormRow label="ปี พ.ศ." layout="vertical">
                          <Controller name="year" control={control} render={({ field }) => (
                            <Select {...field} fullWidth size="small">
                              <MenuItem value={2567}>2567</MenuItem>
                              <MenuItem value={2568}>2568</MenuItem>
                            </Select>
                          )} />
                        </FormRow>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 7 }}>
                        <FormRow label="เดือน" layout="vertical">
                          <Controller name="month" control={control} render={({ field }) => (
                            <Select {...field} fullWidth size="small">
                              <MenuItem value={1}>มกราคม</MenuItem>
                              <MenuItem value={2}>กุมภาพันธ์</MenuItem>
                              <MenuItem value={3}>มีนาคม</MenuItem>
                              <MenuItem value={4}>เมษายน</MenuItem>
                              <MenuItem value={5}>พฤษภาคม</MenuItem>
                              <MenuItem value={6}>มิถุนายน</MenuItem>
                              <MenuItem value={7}>กรกฎาคม</MenuItem>
                              <MenuItem value={8}>สิงหาคม</MenuItem>
                              <MenuItem value={9}>กันยายน</MenuItem>
                              <MenuItem value={10}>ตุลาคม</MenuItem>
                              <MenuItem value={11}>พฤศจิกายน</MenuItem>
                              <MenuItem value={12}>ธันวาคม</MenuItem>
                            </Select>
                          )} />
                        </FormRow>
                      </Grid>
                    </>
                  )}
                  {dateMode === 'yearly' && (
                    <>
                      <Grid size={{ xs: 12, sm: 7 }}>
                        <FormRow label="ประเภทปี" layout="vertical">
                          <Controller name="yearType" control={control} render={({ field }) => (
                            <Select {...field} fullWidth size="small">
                              <MenuItem value="fiscal">ปีงบประมาณ</MenuItem>
                              <MenuItem value="calendar">ปีปฏิทิน</MenuItem>
                            </Select>
                          )} />
                        </FormRow>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 5 }}>
                        <FormRow label="ประจำปี พ.ศ." layout="vertical">
                          <Controller name="year" control={control} render={({ field }) => (
                            <Select {...field} fullWidth size="small">
                              <MenuItem value={2567}>2567</MenuItem>
                              <MenuItem value={2568}>2568</MenuItem>
                            </Select>
                          )} />
                        </FormRow>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </Box>
          </Grid>

          <SectionHeader title="การกรองข้อมูล" />

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
            <Grid size={{ xs: 12 }}>
              <FormRow label="เวชภัณฑ์" layout="vertical">
                <Controller name="item" control={control} render={({ field }) => (
                  <Autocomplete {...field} size="small"
                    options={['ทั้งหมด', 'ถุงมือยาง เบอร์ 7', 'หน้ากากอนามัย 3 ชั้น', 'แอลกอฮอล์ 70%', 'สำลีพันก้าน', 'พลาสเตอร์ปิดแผล']}
                    value={field.value} onChange={(_, val) => field.onChange(val || '')}
                    renderInput={(params) => <TextField {...params} placeholder="พิมพ์ชื่อเวชภัณฑ์เพื่อค้นหา..." sx={{ bgcolor: 'white' }} />}
                  />
                )} />
              </FormRow>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </ModalShell>
  );
};

export default React.memo(DetailedReportFilterModal);
