import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Popover, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import { REQUISITION_CATEGORIES } from '../data/requisitionData';

interface RequisitionFilterPopoverProps {
  id?: string;
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  categoryFilter: string;
  onCategoryChange: (val: string) => void;
  onReset: () => void;
}

const RequisitionFilterPopover: React.FC<RequisitionFilterPopoverProps> = ({
  id,
  anchorEl,
  onClose,
  categoryFilter,
  onCategoryChange,
  onReset,
}) => {
  const open = Boolean(anchorEl);
  
  return (
    <Popover
      id={id || (open ? 'requisition-filter-popover' : undefined)}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        sx: { width: 320, p: 2, mt: 1, boxShadow: 3, borderRadius: 2 }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>ตัวกรองข้อมูล</Typography>
        <Button size="small" onClick={onReset} sx={{ textTransform: 'none' }}>ล้างตัวกรอง</Button>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel>หมวดหมู่</InputLabel>
          <Select
            label="หมวดหมู่"
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {REQUISITION_CATEGORIES.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    </Popover>
  );
};

export default RequisitionFilterPopover;
