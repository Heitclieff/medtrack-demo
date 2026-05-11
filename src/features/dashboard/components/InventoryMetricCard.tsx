'use client';

import React from 'react';
import { Box, Card, Typography, IconProps } from '@mui/material';

interface InventoryMetricCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export default function InventoryMetricCard({
  value,
  label,
  icon,
  color,
  bgColor,
}: InventoryMetricCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 0.5,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: color }}>
            {value}
          </Typography>
        </Box>
        <Box sx={{ color: color, opacity: 0.3 }}>
          {icon}
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: bgColor,
          p: 0.75,
          color: '#fff',
          textAlign: 'left',
          px: 2,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
          {label}
        </Typography>
      </Box>
    </Card>
  );
}
