'use client';

import React from 'react';
import { Box, Stack, useTheme } from '@mui/material';

interface ToolbarProps {
  children?: React.ReactNode;
  actions?: React.ReactNode;
  search?: React.ReactNode;
  sx?: any;
}

export default function Toolbar({
  children,
  actions,
  search,
  sx
}: ToolbarProps) {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' },
      justifyContent: 'space-between',
      alignItems: { xs: 'stretch', md: 'center' },
      gap: 2, 
      p: 2,
      bgcolor:'white',
      border: '1px solid',
      borderColor: 'divider',
      borderBottom: 'none',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      ...sx
    }}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ order: { xs: 2, md: 1 } }}>
        {actions}
      </Stack>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
        order: { xs: 1, md: 2 },
        width: { xs: '100%', md: 'auto' },
        justifyContent: { xs: 'stretch', md: 'flex-end' }
      }}>
        {search}
        {children}
      </Box>
    </Box>
  );
}
