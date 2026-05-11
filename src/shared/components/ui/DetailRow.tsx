'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface DetailRowProps {
  label: string;
  value: string | React.ReactNode;
  noDivider?: boolean;
  highlight?: boolean;
  labelWidth?: string;
}

const DetailRow: React.FC<DetailRowProps> = ({
  label,
  value,
  noDivider = false,
  labelWidth = '130px',
}) => (
  <Box
    sx={{
      display: 'flex',
      py: 1.5,
      px: 1.5,
      borderBottom: noDivider ? 'none' : '1px solid #E5E7EB',
      alignItems: 'center',
      minHeight: '50px',
      gap: 1,
    }}
  >
    <Typography
      variant="body2"
      sx={{
        width: labelWidth,
        color: 'text.secondary',
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {label}
    </Typography>
    <Box sx={{ flexGrow: 1 }}>
      {typeof value === 'string' ? (
        <Typography
          variant="body2"
          sx={{ fontWeight: 500, color: 'text.primary' }}
        >
          {value || '-'}
        </Typography>
      ) : (
        value
      )}
    </Box>
  </Box>
);

export default React.memo(DetailRow);
