import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    isUp: boolean;
    label: string;
  };
  variant?: 'white' | 'blue';
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, variant = 'white', icon }) => {
  const isBlue = variant === 'blue';

  return (
    <Paper
      elevation={0}
      sx={{
        px: 2,
        py: 3,
        bgcolor: isBlue ? '#EEF2FF' : 'white',
        border: '1px solid',
        borderColor: isBlue ? '#E0E7FF' : '#E5E7EB',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            color: isBlue ? '#3F6AD8' : '#6B7280',
            mb: 1.5,
            textTransform: 'uppercase',
            letterSpacing: '0.025em',
            fontSize: '0.75rem',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#111827',
            mb: 1.5,
          }}
        >
          {value}
        </Typography>
      </Box>

      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            size="small"
            label={trend.value}
            icon={trend.isUp ? <TrendingUpIcon style={{ fontSize: 14 }} /> : <TrendingDownIcon style={{ fontSize: 14 }} />}
            sx={{
              height: 24,
              fontSize: '0.75rem',
              fontWeight: 700,
              bgcolor: trend.isUp ? '#DCFCE7' : '#FEE2E2',
              color: trend.isUp ? '#166534' : '#991B1B',
              '& .MuiChip-icon': {
                color: 'inherit',
                ml: 0.5,
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              color: '#6B7280',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          >
            {trend.label}
          </Typography>
        </Box>
      )}

      {icon && (
        <Box
          sx={{
            position: 'absolute',
            right: -10,
            bottom: -10,
            opacity: 0.1,
            transform: 'rotate(-15deg)',
            fontSize: 80,
            '& svg': { fontSize: 'inherit' }
          }}
        >
          {icon}
        </Box>
      )}
    </Paper>
  );
};

export default StatCard;
