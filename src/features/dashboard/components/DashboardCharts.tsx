import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, action, children }) => (
  <Paper
    elevation={0}
    sx={{
      px: 2,
      py: 3,
      pb : 8,
      border: '1px solid #E5E7EB',
      height: '100%',
      bgcolor: 'white',
    }}
  >
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem', lineHeight: 1.2 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 500, display: 'block', mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box sx={{ ml: 1 }}>{action}</Box>}
    </Box>
    <Box sx={{ width: '100%', height: 350, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      {children}
    </Box>
  </Paper>
);

export const InventoryBarChart = () => {
  return (
    <ChartCard title="วิเคราะห์การเคลื่อนไหวสต็อก (Stock Movement)" subtitle="เปรียบเทียบการนำเข้าและเบิกจ่ายรายเดือน">
      <BarChart
        series={[
          { data: [45, 62, 38, 51, 65, 42, 55, 48, 60, 52, 49, 12], label: 'นำเข้า (In)', color: '#10B981' },
          { data: [38, 48, 45, 42, 55, 30, 48, 40, 52, 45, 38, 8], label: 'เบิกจ่าย (Out)', color: '#3F6AD8' }
        ]}
        xAxis={[{ data: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'], scaleType: 'band' }]}
        height={310}
        margin={{ top: 30, bottom: 10, left: 10, right: 10 }} // Adjusted margin for better spacing as per user preference
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: 0,
            labelStyle: { fontSize: 12, fontWeight: 500, fill: '#6B7280' },
          } as any
        }}
        sx={{
          '& .MuiChartsAxis-bottom .MuiChartsAxis-line': { stroke: '#E5E7EB' },
          '& .MuiChartsAxis-left .MuiChartsAxis-line': { display: 'none' },
          '& .MuiChartsAxis-tick': { stroke: '#E5E7EB' },
        }}
      />
    </ChartCard>
  );
};

export const DynamicDonutChart = () => {
  const [view, setView] = React.useState('status');

  const chartData = {
    status: {
      title: 'สัดส่วนสถานะเวชภัณฑ์',
      subtitle: 'ภาพรวมความสมบูรณ์ของคลังพัสดุ',
      centerValue: '2,103',
      centerLabel: 'ทั้งหมด',
      data: [
        { id: 0, value: 65, label: 'ปกติ (Healthy)', color: '#10B981' },
        { id: 1, value: 20, label: 'ใกล้หมด (Low Stock)', color: '#F59E0B' },
        { id: 2, value: 15, label: 'หมดสต็อก (Out of Stock)', color: '#EF4444' },
      ]
    },
    category: {
      title: 'สัดส่วนหมวดหมู่เวชภัณฑ์',
      subtitle: '5 อันดับหมวดหมู่ที่มีจำนวนรายการสูงสุด',
      centerValue: '11',
      centerLabel: 'หมวดหมู่',
      data: [
        { id: 0, value: 450, label: 'ยาและเวชภัณฑ์', color: '#3F6AD8' },
        { id: 1, value: 320, label: 'วัสดุสำนักงาน', color: '#10B981' },
        { id: 2, value: 280, label: 'เครื่องใช้ไฟฟ้า', color: '#F59E0B' },
        { id: 3, value: 150, label: 'วัสดุซ่อมบำรุง', color: '#6366F1' },
        { id: 4, value: 80, label: 'อื่นๆ', color: '#9CA3AF' },
      ]
    },
    department: {
      title: 'สัดส่วนการเข้าใช้งานแผนก',
      subtitle: 'ปริมาณการเบิกจ่ายแยกตามแผนก',
      centerValue: '840',
      centerLabel: 'รายการเบิก',
      data: [
        { id: 0, value: 35, label: 'IPD', color: '#3F6AD8' },
        { id: 1, value: 25, label: 'OPD', color: '#10B981' },
        { id: 2, value: 20, label: 'ER', color: '#F59E0B' },
        { id: 3, value: 12, label: 'OR', color: '#EF4444' },
        { id: 4, value: 8, label: 'อื่นๆ', color: '#6366F1' },
      ]
    }
  };

  const current = chartData[view as keyof typeof chartData];

  return (
    <ChartCard 
      title={current.title} 
      subtitle={current.subtitle}
      action={
        <FormControl fullWidth size="small" >
          <InputLabel id="chart-view-label">มุมมอง</InputLabel>
          <Select
            labelId="chart-view-label"
            value={view}
            label="มุมมอง"
            onChange={(e) => setView(e.target.value)}
            sx={{
              fontSize: '0.85rem',
            }}
          >
            <MenuItem value="status" sx={{ fontSize: '0.85rem' }}>สถิติตามสถานะ</MenuItem>
            <MenuItem value="category" sx={{ fontSize: '0.85rem'}}>สถิติตามหมวดหมู่</MenuItem>
            <MenuItem value="department" sx={{ fontSize: '0.85rem'}}>สถิติตามแผนก</MenuItem>
          </Select>
        </FormControl>
      }
    >
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <PieChart
          series={[
            {
              data: current.data,
              innerRadius: 65,
              outerRadius: 95,
              paddingAngle: 3,
              cornerRadius: 6,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 60, additionalRadius: -5, color: 'gray' },
            },
          ]}
          height={310}
          margin={{ top: 0, bottom: 65, left: 0, right: 0 }} // More natural margin with extra bottom padding in container
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'center' },
              padding: 0,
              labelStyle: { fontSize: 11, fontWeight: 500, fill: '#6B7280' },
            } as any
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '36%', // Recalibrated for perfect optical center (310h - 65m = 245 plot area, center at 122.5 from top, 122.5/350 = ~35%)
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#111827', lineHeight: 1 }}>
            {current.centerValue}
          </Typography>
          <Typography variant="caption" sx={{ color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {current.centerLabel}
          </Typography>
        </Box>
      </Box>
    </ChartCard>
  );
};
