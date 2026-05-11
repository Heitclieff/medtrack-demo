'use client';

import React from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';

export type StatusType = 'success' | 'warning' | 'error' | 'info' | 'inactive';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  sx?: SxProps<Theme>;
}

const getStatusStyles = (status: StatusType) => {
  switch (status) {
    case 'success':
      return {
        bgcolor: '#DCFCE7',
        color: '#166534',
        border: '1px solid #BBF7D0',
      };
    case 'warning':
      return {
        bgcolor: '#FEF3C7',
        color: '#92400E',
        border: '1px solid #FDE68A',
      };
    case 'error':
      return {
        bgcolor: '#FEE2E2',
        color: '#991B1B',
        border: '1px solid #FECACA',
      };
    case 'info':
      return {
        bgcolor: '#E0F2FE',
        color: '#075985',
        border: '1px solid #BAE6FD',
      };
    case 'inactive':
    default:
      return {
        bgcolor: '#F3F4F6',
        color: '#374151',
        border: '1px solid #E5E7EB',
      };
  }
};

export default function StatusBadge({ status, label, sx }: StatusBadgeProps) {
  const styles = getStatusStyles(status);

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 0.75,
        borderRadius: 1,
        fontSize: '0.8125rem',
        fontWeight: 600,
        ...styles,
        ...sx,
      }}
    >
      <Typography 
        variant="caption" 
        sx={{ 
          fontSize: 'inherit', 
          fontWeight: 'inherit',
          lineHeight: 1
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
