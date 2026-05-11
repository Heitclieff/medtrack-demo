import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3F6AD8', // The main blue from the screenshot
      light: '#7293E3',
      dark: '#2A4A9C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#64748B', // Slate color for secondary actions
      light: '#94A3B8',
      dark: '#475569',
      contrastText: '#fff',
    },
    background: {
      default: '#F8FAFC', // Slightly lighter dashboard background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
    success: {
      main: '#10B981',
      light: '#D1FAE5',
      dark: '#059669',
      contrastText: '#fff',
    },
    warning: {
      main: '#F59E0B',
      light: '#FEF3C7',
      dark: '#D97706',
      contrastText: '#000',
    },
    error: {
      main: '#EF4444',
      light: '#FEE2E2',
      dark: '#DC2626',
      contrastText: '#fff',
    },
    info: {
      main: '#3B82F6',
      light: '#DBEAFE',
      dark: '#2563EB',
      contrastText: '#fff',
    },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: 'var(--font-noto-sans-thai), "Sukhumvit Set", sans-serif',
    h5: {
      fontWeight: 700,
      color: '#1E293B',
    },
    h4: {
      fontWeight: 700,
      color: '#1E293B',
    },
    h6: {
      fontWeight: 700,
      color: '#1E293B',
    },
    subtitle1: {
      fontWeight: 600,
      color: '#fff',
    },
    subtitle2: {
      fontWeight: 600,
      color: '#64748B',
    },
    body1: {
      color: '#334155',
    },
    body2: {
      color: '#64748B',
    },
  },
  shape: {
    // borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          fontWeight: 600,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#3F6AD8',
          '&:hover': {
            backgroundColor: '#3155b1',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          border: '1px solid #E2E8F0',
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          border: '1px solid #E2E8F0',
          boxShadow: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#F8FAFC',
          color: '#64748B',
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
        root: {
          padding: '12px 16px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#E2E8F0',
          },
          '&:hover fieldset': {
            borderColor: '#CBD5E1',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#3F6AD8', // primary.main
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '&.Mui-focused': {
            color: '#3F6AD8',
          },
        },
      },
    },
  },
});

export default theme;
