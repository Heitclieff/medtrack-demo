'use client';

import React, { useId } from 'react';
import { TextField, InputAdornment, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchFieldProps extends Omit<TextFieldProps, 'variant'> {
  showIcon?: boolean;
  endAdornment?: React.ReactNode;
}

export default function SearchField({ 
  placeholder = "ค้นหา...", 
  label,
  showIcon = true,
  endAdornment,
  sx, 
  InputProps,
  id: idProp,
  ...props 
}: SearchFieldProps) {
  const generatedId = useId();
  const id = idProp || generatedId;

  return (
    <TextField
      id={id}
      size="small"
      label={label}
      placeholder={placeholder}
      variant="outlined"
      sx={{ 
        width: { xs: '100%', sm: 250 },
        ...sx
      }}
      InputLabelProps={{
        shrink: label ? true : undefined,
      }}
      InputProps={{
        startAdornment: showIcon ? (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
          </InputAdornment>
        ) : null,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">
            {endAdornment}
          </InputAdornment>
        ) : undefined,
        ...InputProps
      }}
      {...props}
    />
  );
}
