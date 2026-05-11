'use client';

import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  Pagination,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  SelectChangeEvent,
  InputAdornment,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SearchField from './SearchField';

export interface Column<T> {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  format?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: readonly Column<T>[];
  data: T[];
  title?: string;
  searchPlaceholder?: string;
  selectable?: boolean;
  showControls?: boolean;
  topActions?: React.ReactNode;
  externalSearchTerm?: string;
  onExternalSearchChange?: (value: string) => void;
  hideInternalSearch?: boolean;
  selectedIds?: (string | number)[];
  onSelectionChange?: (ids: (string | number)[]) => void;
  onRowDoubleClick?: (row: any) => void;
  sx?: any;
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  title,
  searchPlaceholder = 'Search...',
  selectable = true,
  showControls = true,
  topActions,
  externalSearchTerm,
  onExternalSearchChange,
  hideInternalSearch = false,
  selectedIds = [],
  onSelectionChange,
  onRowDoubleClick,
  sx,
}: DataTableProps<T>) {
  const [internalPage, setInternalPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [internalSearchTerm, setInternalSearchTerm] = useState('');

  const searchTerm = externalSearchTerm !== undefined ? externalSearchTerm : internalSearchTerm;
  const setSearchTerm = onExternalSearchChange || setInternalSearchTerm;
  const page = internalPage;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (onExternalSearchChange) {
      onExternalSearchChange(value);
    } else {
      setInternalSearchTerm(value);
    }
    setInternalPage(1);
  };

  const filteredData = data.filter((item: any) =>
    Object.values(item).some(
      (val) => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && onSelectionChange) {
      const newSelected = filteredData.map((n) => n.id);
      onSelectionChange(newSelected);
      return;
    }
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  const handleClick = (id: string | number) => {
    if (!onSelectionChange) return;
    const selectedIndex = selectedIds.indexOf(id);
    let newSelected: (string | number)[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelected = newSelected.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
    }

    onSelectionChange(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setInternalPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setInternalPage(1);
  };

  const isSelected = (id: string | number) => selectedIds.indexOf(id) !== -1;

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', ...sx }}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        {showControls && (
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {topActions}
            </Box>
            <SearchField label="ค้นหา" 
              placeholder={searchPlaceholder || 'ค้นหาชื่อ, รหัส...'}
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: 250 }}
            />
          </Box>
        )}

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="mira table">
            <TableHead>
              <TableRow>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox 
                      inputProps={{ 'aria-label': 'Select all rows' }}
                      size="small" 
                      indeterminate={selectedIds.length > 0 && selectedIds.length < filteredData.length}
                      checked={filteredData.length > 0 && selectedIds.length === filteredData.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{ 
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const isLastRow = index === paginatedData.length - 1;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(row)}
                    sx={{ 
                      cursor: onRowDoubleClick ? 'pointer' : 'default',
                    }}
                  >
                    {selectable && (
                      <TableCell padding="checkbox" sx={{ borderBottom: isLastRow ? 'none' : '1px solid', borderColor: 'divider' }}>
                        <Checkbox
                          inputProps={{ 'aria-label': `Select row` }}
                          size="small"
                          checked={isItemSelected}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClick(row.id);
                          }}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const value = (row as any)[column.id];
                      return (
                        <TableCell 
                          key={column.id} 
                          align={column.align}
                          sx={{ 
                            borderBottom: isLastRow ? 'none' : '1px solid', 
                            borderColor: '#E5E7EB', 
                            pt: 1, 
                            pb: 1,
                            fontWeight: 500, 
                            fontSize: '0.875rem' 
                          }}
                        >
                          {column.format ? column.format(value, row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={selectable ? columns.length + 1 : columns.length} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      ไม่มีข้อมูลที่ตรงกัน
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredData.length)} of {filteredData.length} entries
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '13px' }}>Rows per page:</Typography>
              <Select
                size="small"
                value={rowsPerPage}
                onChange={(e: any) => handleChangeRowsPerPage(e)}
                variant="standard"
                inputProps={{ 'aria-label': 'Rows per page' }}
                sx={{ 
                  fontSize: '13px',
                  color: 'text.secondary',
                  '&:before, &:after': { display: 'none' },
                  '& .MuiSelect-select': { py: 0.5 }
                }}
              >
                {[10, 25, 50, 100].map((pageSize) => (
                  <MenuItem key={pageSize} value={pageSize}>
                    {pageSize}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, p) => handleChangePage(e, p)}
            color="primary"
            size="small"
            shape="rounded"
            showFirstButton 
            showLastButton
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default DataTable;
