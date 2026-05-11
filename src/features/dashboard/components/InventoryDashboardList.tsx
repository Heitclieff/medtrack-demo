'use client';

import React from 'react';
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import Link from 'next/link';

export interface DashboardListItem {
  id: string | number;
  name: string;
  value: string | number;
  subValue?: string;
  color?: string;
}

interface InventoryDashboardListProps {
  title: string;
  headerColor: string;
  color? : string;
  columns: { id: string; label: string; align?: 'left' | 'right' | 'center' }[];
  data: DashboardListItem[];
  viewAllHref?: string;
}

export default function InventoryDashboardList({
  title,
  headerColor,
  columns,
  data,
  color = "#fff",
  viewAllHref,
}: InventoryDashboardListProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 0.5,
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          bgcolor: headerColor,
          p: 1,
          px: 2,
          color: color,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color : color }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ cursor: 'pointer', opacity: 0.8 }}>
          —
        </Typography>
      </Box>
      <TableContainer sx={{ flexGrow: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f9fafb' }}>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align}
                  sx={{ py: 1, fontWeight: 500, color: 'text.secondary', fontSize: '0.75rem' }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ py: 1.5, fontSize: '0.8125rem', borderBottom: index === data.length - 1 ? 'none' : undefined }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8125rem' }}>
                    {item.name}
                  </Typography>
                  {item.subValue && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontStyle: 'italic' }}>
                      {item.subValue}
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="right" sx={{ py: 1.5, color: item.color || 'inherit', fontWeight: 600, fontSize: '0.8125rem', borderBottom: index === data.length - 1 ? 'none' : undefined }}>
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {viewAllHref && (
        <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider', textAlign: 'right' }}>
          <Link href={viewAllHref} style={{ textDecoration: 'none' }}>
            <Typography variant="caption" color="primary" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
              ดูทั้งหมด ▶
            </Typography>
          </Link>
        </Box>
      )}
    </Card>
  );
}
