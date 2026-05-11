import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from '@mui/material';

interface DashboardTableProps {
  title: string;
  columns: { id: string; label: string; align?: 'left' | 'right' | 'center' }[];
  data: any[];
  renderRow?: (row: any) => React.ReactNode;
}

const DashboardTable: React.FC<DashboardTableProps> = ({ title, columns, data, renderRow }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        px: 2,
        py: 3,
        border: '1px solid #E5E7EB',
        height: '100%',
        bgcolor: 'white',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#111827', fontSize: '1rem' }}>
          {title}
        </Typography>
      </Box>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{
                    fontWeight: 600,
                    color: '#6B7280',
                    borderBottom: '1px solid #F3F4F6',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.025em',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.id || index}
                sx={{
                  '&:last-child td': { borderBottom: 0 },
                  '&:hover': { bgcolor: '#F9FAFB' },
                }}
              >
                {renderRow ? (
                  renderRow(row)
                ) : (
                  columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || 'left'}
                      sx={{ borderBottom: '1px solid #F3F4F6', color: '#374151', py: 1.5, fontSize: '0.875rem' }}
                    >
                      {row[column.id]}
                    </TableCell>
                  ))
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DashboardTable;
