'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PieChart } from '@mui/x-charts/PieChart';

export default function SourceMediumChartCard() {
  const data = [
    { id: 0, value: 35, color: '#3B82F6', label: 'Direct' }, // Blue
    { id: 1, value: 40, color: '#10B981', label: 'Search' }, // Green
    { id: 2, value: 25, color: '#EF4444', label: 'Social' }, // Red
  ];

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Source / Medium
          </Typography>
          <IconButton size="small">
            <MoreVertIcon sx={{ color: '#9CA3AF' }} />
          </IconButton>
        </Box>

        <Box sx={{ position: 'relative', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
          <PieChart
            series={[
              {
                data,
                innerRadius: 65,
                outerRadius: 85,
                paddingAngle: 5,
                cornerRadius: 5,
                cx: '50%',
                cy: '50%',
              },
            ]}
            width={200}
            height={200}
            sx={{ '& .MuiChartsLegend-root': { display: 'none' } }}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
          />
          <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={700}>
              +23%
            </Typography>
            <Typography variant="caption" color="text.secondary">
              new visitors
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>Source</Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ ml: 'auto', pr: 2 }}>Revenue</Typography>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>Value</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Social</Typography>
            <Typography variant="body2" sx={{ ml: 'auto', pr: 2 }}>260</Typography>
            <Typography variant="body2" color="success.main" fontWeight={600}>+35%</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Search</Typography>
            <Typography variant="body2" sx={{ ml: 'auto', pr: 2 }}>125</Typography>
            <Typography variant="body2" color="error.main" fontWeight={600}>-12%</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">Direct</Typography>
            <Typography variant="body2" sx={{ ml: 'auto', pr: 2 }}>54</Typography>
            <Typography variant="body2" color="success.main" fontWeight={600}>+46%</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
