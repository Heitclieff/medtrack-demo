import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArchiveIcon from '@mui/icons-material/Archive';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  onArchive?: () => void;
  editText?: string;
  deleteText?: string;
  viewText?: string;
  archiveText?: string;
}

const ActionButtons = ({
  onEdit,
  onDelete,
  onView,
  onArchive,
  editText = 'แก้ไขข้อมูล',
  deleteText = 'ลบ',
  viewText = 'ดูข้อมูล',
  archiveText = 'จัดเก็บ',
}: ActionButtonsProps) => {
  return (
    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
      {onArchive && (
        <Tooltip title={archiveText}>
          <IconButton size="small" onClick={onArchive} sx={{ color: 'text.secondary' }} aria-label="Archive">
            <ArchiveIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {onView && (
        <Tooltip title={viewText}>
          <IconButton size="small" onClick={onView} sx={{ color: 'text.secondary' }} aria-label="View">
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title={editText}>
          <IconButton size="small" onClick={onEdit} sx={{ color: 'text.secondary' }} aria-label="Edit">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      {onDelete && (
        <Tooltip title={deleteText}>
          <IconButton size="small" onClick={onDelete} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} aria-label="Delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default ActionButtons;
