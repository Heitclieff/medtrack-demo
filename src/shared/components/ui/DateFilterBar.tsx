import React from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';

interface DateFilterBarProps {
  onSearch?: (startDate: string, endDate: string) => void;
  onPrint?: () => void;
  showPrint?: boolean;
  flat?: boolean;
  sx?: any;
}

const DateFilterBar = ({ onSearch, onPrint, showPrint = false, flat = false, sx = {} }: DateFilterBarProps) => {
  // Simple state for uncontrolled example, or could be controlled by props.
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(startDate, endDate);
    }
  };

  const content = (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 3,
      flexWrap: 'wrap',
      ...sx
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
          เริ่มวันที่
        </Typography>
        <TextField
          type="date"
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ '& .MuiInputBase-root': { bgcolor: 'background.paper' } }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
          ถึงวันที่
        </Typography>
        <TextField
          type="date"
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ '& .MuiInputBase-root': { bgcolor: 'background.paper' } }}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Button
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSearch}
        sx={{
          px: 3,
          boxShadow: '0 4px 10px rgba(55, 111, 255, 0.24)',
          '&:hover': {
            boxShadow: '0 6px 14px rgba(55, 111, 255, 0.32)',
          },
        }}
      >
        ค้นหา
      </Button>

      {showPrint && (
        <Button
          variant="contained"
          color="success"
          startIcon={<PrintIcon />}
          onClick={onPrint}
          sx={{
            px: 3,
            boxShadow: '0 4px 10px rgba(56, 142, 60, 0.24)',
            '&:hover': {
              boxShadow: '0 6px 14px rgba(56, 142, 60, 0.32)',
            },
          }}
        >
          พิมพ์รายงาน
        </Button>
      )}
    </Box>
  );

  if (flat) return content;

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        mb: 3, 
        borderRadius: 0.5,
        border: '1px solid',
        borderColor: 'divider',
        ...sx
      }}
    >
      {content}
    </Paper>
  );
};

export default DateFilterBar;
