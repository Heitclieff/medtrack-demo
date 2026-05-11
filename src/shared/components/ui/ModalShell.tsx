'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  title: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
  headerColor?: string;
  headerTextColor?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  fullScreen?: boolean;
  contentSx?: object;
  sx?: object;
  headerSx?: object;
  disableHeaderPadding?: boolean;
}

const ModalShell: React.FC<ModalShellProps> = ({
  open,
  onClose,
  title,
  maxWidth = 'sm',
  headerColor = '#3F6AD8',
  headerTextColor = 'white',
  children,
  actions,
  fullScreen = false,
  contentSx,
  sx,
  headerSx,
  disableHeaderPadding = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      fullScreen={fullScreen}
      sx={sx}
      PaperProps={{
        sx: { 
          borderRadius: 2, // Slightly more rounded as per image
          overflow: 'hidden',
          border: 'none',
          boxShadow: (theme) => theme.shadows[24]
        },
      }}
    >
      <DialogTitle
        component="div"
        sx={{
          m: 0,
          p: 0,
          bgcolor: headerColor,
          color: headerTextColor,
          ...headerSx
        }}
      >
        <Box
          sx={{
            py: 2,
            px: disableHeaderPadding ? 2 : 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ color: headerTextColor }}
            aria-label="close modal"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 4, pt: 0, ...contentSx }}>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions
          sx={{
            p: 2,
            borderTop: 'none',
            justifyContent: 'flex-end',
          }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default React.memo(ModalShell);
