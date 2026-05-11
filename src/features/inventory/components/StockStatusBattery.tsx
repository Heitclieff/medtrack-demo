import React from 'react';
import { Box, Typography } from '@mui/material';

interface StockStatusBatteryProps {
  value: string;
  unit: string;
}

const StockStatusBattery: React.FC<StockStatusBatteryProps> = ({ value, unit }) => {
  const balanceNum = parseInt(value) || 0;
  let status = 'คงคลัง';
  let color = '#10B981'; // Green
  let batteryWidth = '75%';

  if (balanceNum === 0) {
    status = 'หมดพัสดุ';
    color = '#EF4444'; // Red
    batteryWidth = '10%';
  } else if (balanceNum <= 10) {
    status = 'ใกล้หมด';
    color = '#F59E0B'; // Orange
    batteryWidth = '35%';
  }

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>
        {value} {unit}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color, mt: 0.5 }}>
        <Box 
          sx={{ 
            width: 18, 
            height: 9, 
            border: '1.2px solid currentColor', 
            borderRadius: '1px', 
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              right: -2.5,
              top: 1.5,
              width: 1.5,
              height: 3,
              bgcolor: 'currentColor',
              borderRadius: '0 1px 1px 0'
            }
          }}
        >
          <Box sx={{ width: batteryWidth, height: '100%', bgcolor: 'currentColor' }} />
        </Box>
        <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.7rem' }}>
          {status}
        </Typography>
      </Box>
    </Box>
  );
};

export default StockStatusBattery;
