'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';

interface FormRowProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
  labelWidth?: string | number;
  layout?: 'horizontal' | 'vertical';
  sx?: object;
}

const FormRow = ({ 
  label, 
  required = false, 
  children, 
  hint,
  labelWidth = '160px',
  layout = 'horizontal',
  sx
}: FormRowProps) => {
  if (layout === 'vertical') {
    return (
      <Box sx={{ mb: 2.5, width: '100%', ...sx }}>
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 600, 
            color: '#374151', 
            mb: 1,
            display: 'block'
          }}
        >
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {children}
          {hint && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary', 
                mt: 0.5, 
                display: 'block', 
                fontSize: '11px',
              }}
            >
              {hint}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, width: '100%' }}>
      <Box sx={{ width: labelWidth, pt: 1, pr: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
          {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {children}
        {hint && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary', 
              mt: 0.5, 
              display: 'block', 
              fontSize: '11px',
            }}
          >
            {hint}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(FormRow);
