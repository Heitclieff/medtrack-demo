import React from 'react';
import { Snackbar as MuiSnackbar, Alert, AlertColor, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface SnackbarProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity = 'success',
  onClose,
  autoHideDuration = 3000,
}) => {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ mt: 2 }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        iconMapping={{
          success: <CheckCircleIcon fontSize="inherit" />,
          error: <ErrorIcon fontSize="inherit" />,
        }}
        sx={{
          width: '100%',
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          px: 3,
          py: 0.5,
          '& .MuiAlert-message': {
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
          },
          '& .MuiAlert-icon': {
            color: '#fff',
            opacity: 1,
          },
          '& .MuiAlert-action': {
            color: '#fff',
          },
          bgcolor: severity === 'success' ? '#00b894' : undefined,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#fff' }}>
          {message}
        </Typography>
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
