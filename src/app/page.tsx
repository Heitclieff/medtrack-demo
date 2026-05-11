'use client';

import React from 'react';
import DashboardLayout from '@components/layout/DashboardLayout';
import {
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
  LinearProgress,
  Chip,
  TableCell
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import LayersIcon from '@mui/icons-material/Layers';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import BatteryAlertIcon from '@mui/icons-material/BatteryAlert';
import RefreshIcon from '@mui/icons-material/Refresh';
import FilterListIcon from '@mui/icons-material/FilterList';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { PageHeader } from '@components/ui';
import { DashboardDateFilter } from '@/features/dashboard/components';
import { StatCard } from '@/features/dashboard/components';
import { InventoryBarChart, DynamicDonutChart } from '@/features/dashboard/components/DashboardCharts';
import { DashboardTable } from '@/features/dashboard/components';

export default function Home() {
  const refillData = [
    { id: 1, name: 'J00203 Dispose Injection Needle No.23', subValue: '(1 กล่อง)', value: 0, color: 'error.main' },
    { id: 2, name: 'J00205 Suction polyp trap', subValue: 'กระปุก (กระปุก)', value: 0, color: 'error.main' },
    { id: 3, name: 'J00210 Reusable rotatable clip fixing devices', subValue: '(1 กล่อง)', value: 0, color: 'error.main' },
    { id: 4, name: 'J00212 สายยืดค้ำยันเล็บในระบบทางเดินอาหาร', subValue: 'เส้น', value: 0, color: 'error.main' },
    { id: 5, name: 'J00213 Biopsy Forceps 2.5mm x 1800mm', subValue: 'เส้น', value: 0, color: 'error.main' },
  ];

  const expiredData = [
    { id: 1, name: 'ถุงมือผ่าตัดฆ่าเชื้อแบบไม่มีแป้ง SIZE 7.5', value: '30/04/2568' },
    { id: 2, name: 'สำลี', value: '31/10/2567' },
    { id: 3, name: 'GLOVE NITRILE SIZE L', value: '30/04/2568' },
    { id: 4, name: 'GLOVE NITRILE SIZE M', value: '28/02/2568' },
    { id: 5, name: 'GLOVE NITRILE SIZE S', value: '31/03/2568' },
  ];

  const pendingData = [
    { id: 1, source: 'ตึกฉุกเฉิน (ER)', qty: 120, status: 'Completed', time: '10:25 AM' },
    { id: 2, source: 'วอร์ดเด็ก (Pediatric)', qty: 45, status: 'Pending', time: '09:12 AM' },
    { id: 3, source: 'ศูนย์ไตเทียม', qty: 300, status: 'Completed', time: '08:45 AM' },
    { id: 4, source: 'ห้องผ่าตัดใหญ่', qty: 15, status: 'Cancelled', time: '07:30 AM' },
    { id: 5, source: 'ห้องตรวจเลือด', qty: 85, status: 'Completed', time: '06:15 AM' },
  ];

  const officialPendingData = [
    { id: 1, name: 'คลินิกต่างชาติ ชั้น 2', value: 1 },
    { id: 2, name: 'พิเศษ 7', value: 1 },
    { id: 3, name: 'ฝ่ายงบประมาณ', value: 6 },
    { id: 4, name: 'ฝ่ายบริหารงานทั่วไป', value: 4 },
    { id: 5, name: 'ER', value: 1 },
  ];

  const priceComparisonData = [
    { id: 1, name: 'Mask N95 (Brand A)', comparison: '+7.1%', detail: 'vs Brand B (฿45/฿42)', status: 'up' },
    { id: 2, name: 'Syringe 5ml', comparison: '-2.5%', detail: 'Current vs Last Quarter', status: 'down' },
    { id: 3, name: 'Nitrile Gloves (Box)', comparison: '฿320/฿280', detail: 'Market Price vs Contract', status: 'neutral' },
  ];

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '1600px', mx: 'auto', px: { xs: 1, md: 1 }, py: { xs: 2, md: 3 }, minHeight: '100vh' }}>
        {/* Analytics Dashboard Header */}
        <PageHeader 
          title="สรุปข้อมูลแดชบอร์ด"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'แดชบอร์ด' }
          ]}
          actionPanel={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton sx={{ color: '#3F6AD8', bgcolor: 'white', border: '1px solid #E5E7EB', borderRadius: 2 }}>
                <RefreshIcon fontSize="small" />
              </IconButton>
              <DashboardDateFilter />
            </Box>
          }
        />                  

        {/* Top Row: Key Metrics - 6 Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <StatCard
              title="เวชภัณฑ์พัสดุทั้งหมด"
              value="2,103"
              variant="blue"
              trend={{ value: '+14%', isUp: true, label: 'จากเดือนที่แล้ว' }}
              icon={<MedicalServicesIcon />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <StatCard
              title="จำนวนคลังย่อย"
              value="115"
              trend={{ value: '+2', isUp: true, label: 'คลังใหม่' }}
              icon={<WarehouseIcon />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <StatCard
              title="หมวดหมู่เวชภัณฑ์พัสดุ"
              value="11"
              trend={{ value: 'คงที่', isUp: true, label: 'ไม่มีการเปลี่ยนแปลง' }}
              icon={<LayersIcon />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <StatCard
              title="จำนวนเวชภัณฑ์รอเบิก"
              value="5"
              trend={{ value: '-12%', isUp: false, label: 'รอการอนุมัติ' }}
              icon={<HourglassEmptyIcon />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <StatCard
              title="เวชภัณฑ์ที่ใกล้หมดอายุ"
              value="1,330"
              trend={{ value: '-18%', isUp: false, label: 'กำลังคัดเลิก' }}
              icon={<EventBusyIcon />}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <StatCard
              title="จำนวนเวชภัณฑ์ที่ใกล้หมด"
              value="612"
              trend={{ value: '+27%', isUp: true, label: 'ต้องสั่งซื้อเพิ่ม' }}
              icon={<BatteryAlertIcon />}
            />
          </Grid>
        </Grid>

        {/* Middle Row: Charts - 8-4 Balanced Dynamic layout */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <InventoryBarChart />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <DynamicDonutChart />
          </Grid>
        </Grid>

        {/* Expired and Pending Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <DashboardTable
              title="รายการเวชภัณฑ์พัสดุที่ใกล้หมดอายุ"
              columns={[
                { id: 'name', label: 'Item Name' },
                { id: 'value', label: 'วันหมดอายุ', align: 'right' },
              ]}
              data={expiredData}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <DashboardTable
              title="รายการขอเบิกที่รอการอนุมัติ"
              columns={[
                { id: 'name', label: 'คลัง/วอร์ดที่ขอเบิก' },
                { id: 'value', label: 'จำนวนรายการ', align: 'right' },
              ]}
              data={officialPendingData}
            />
          </Grid>
        </Grid>

        {/* Price Comparison Row */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <DashboardTable
              title="เปรียบเทียบราคาเวชภัณฑ์ (Price Comparison)"
              columns={[
                { id: 'name', label: 'รายการเวชภัณฑ์' },
                { id: 'comparison', label: 'ส่วนต่าง / เปรียบเทียบ', align: 'right' },
              ]}
              data={priceComparisonData}
              renderRow={(row: any) => (
                <React.Fragment key={row.id}>
                  <TableCell sx={{ py: 1.5, borderBottom: '1px solid #F3F4F6' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>{row.name}</Typography>
                    <Typography variant="caption" sx={{ color: '#6B7280' }}>{row.detail}</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ py: 1.5, borderBottom: '1px solid #F3F4F6' }}>
                    <Chip 
                      label={row.comparison} 
                      size="small" 
                      icon={row.status === 'up' ? <TrendingUpIcon style={{ fontSize: 14 }} /> : row.status === 'down' ? <TrendingDownIcon style={{ fontSize: 14 }} /> : undefined}
                      sx={{ 
                        height: 24, 
                        fontSize: '0.75rem', 
                        fontWeight: 700,
                        bgcolor: row.status === 'up' ? '#FEE2E2' : row.status === 'down' ? '#DCFCE7' : '#F3F4F6',
                        color: row.status === 'up' ? '#991B1B' : row.status === 'down' ? '#166534' : '#374151',
                        '& .MuiChip-icon': { color: 'inherit' }
                      }} 
                    />
                  </TableCell>
                </React.Fragment>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
