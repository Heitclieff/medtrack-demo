'use client';

import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

interface SectionHeaderProps {
  title: string;
  mt?: number;
  mb?: number;
}

const SectionHeader = ({ title, mt = 3, mb = 2 }: SectionHeaderProps) => (
  <Box sx={{ mt, mb, display: 'flex', alignItems: 'center' }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3F6AD8', mr: 2, whiteSpace: 'nowrap' }}>
      {title}
    </Typography>
    <Divider sx={{ flexGrow: 1, borderColor: '#e5e7eb' }} />
  </Box>
);

export default React.memo(SectionHeader);
