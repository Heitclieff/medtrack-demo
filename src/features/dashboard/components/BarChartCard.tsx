'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BarChart } from '@mui/x-charts/BarChart';

export default function MobileDesktopChartCard() {
  const dataset = [
    { month: 'Jan', mobile: 65, desktop: 45 },
    { month: 'Feb', mobile: 80, desktop: 50 },
    { month: 'Mar', mobile: 40, desktop: 25 },
    { month: 'Apr', mobile: 55, desktop: 45 },
    { month: 'May', mobile: 70, desktop: 50 },
    { month: 'Jun', mobile: 45, desktop: 40 },
    { month: 'Jul', mobile: 65, desktop: 50 },
    { month: 'Aug', mobile: 80, desktop: 55 },
    { month: 'Sep', mobile: 85, desktop: 60 },
    { month: 'Oct', mobile: 90, desktop: 70 },
    { month: 'Nov', mobile: 50, desktop: 40 },
    { month: 'Dec', mobile: 95, desktop: 65 },
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3, pb: '16px !important' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Mobile / Desktop
          </Typography>
          <IconButton size="small">
            <MoreVertIcon sx={{ color: '#9CA3AF' }} />
          </IconButton>
        </Box>
        
        <Box sx={{ width: '100%', height: 260 }}>
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'month', id: 'bottomAxis', categoryGapRatio: 0.6 }]}
            series={[
              { dataKey: 'mobile', color: '#1E40AF', stack: 'total' }, // Darker blue
              { dataKey: 'desktop', color: '#BFDBFE', stack: 'total' }, // Lighter blue
            ]}
            height={260}
            margin={{ left: 30, right: 10, top: 20, bottom: 20 }}
            sx={{ '& .MuiChartsLegend-root': { display: 'none' } }}
            borderRadius={2}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
