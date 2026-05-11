import React from 'react';
import { Box, Typography } from '@mui/material';
import {  Column  } from '@components/ui';

export const getReportResultColumns = (reportId: string): Column<any>[] => {
  const commonItemColumn: Column<any> = { 
    id: 'name', 
    label: 'ชื่อเวชภัณฑ์', 
    minWidth: 250,
    format: (value: string, row: any) => (
      <Box>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>
          {value}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          {row.code}
        </Typography>
      </Box>
    )
  };

  switch (reportId) {
    case 'stock-balance':
      return [
        { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
        { id: 'category', label: 'หมวดหมู่', minWidth: 150 },
        commonItemColumn,
        { id: 'unit', label: 'หน่วย', minWidth: 80, align: 'center' },
        { id: 'balance', label: 'จำนวนคงเหลือ', minWidth: 120, align: 'right', format: (v: number) => v.toLocaleString() },
      ];
    case 'quota-comparison':
      return [
        { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
        { id: 'wardDept', label: 'หน่วยงาน', minWidth: 120 },
        { id: 'category', label: 'หมวดหมู่', minWidth: 150 },
        commonItemColumn,
        { id: 'unit', label: 'หน่วย', minWidth: 80, align: 'center' },
        { id: 'maxQuota', label: 'จำนวนคงคลังสูงสุด', minWidth: 120, align: 'right', format: (v: number) => v.toLocaleString() },
        { id: 'balance', label: 'จำนวนคงเหลือ', minWidth: 120, align: 'right', format: (v: number) => v.toLocaleString() },
      ];
    case 'payouts':
      return [
        { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
        { id: 'wardDept', label: 'คลังวอร์ด', minWidth: 120 },
        { id: 'requesterName', label: 'ผู้เบิก', minWidth: 120 },
        { 
          id: 'requestId', 
          label: 'เลขที่เบิก', 
          minWidth: 100,
          format: (value: string) => (
            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.primary' }}>{value || '-'}</Typography>
          )
        },
        { 
          id: 'approvalId', 
          label: 'เลขที่อนุมัติ', 
          minWidth: 100,
          format: (value: string) => (
            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'text.primary' }}>{value || '-'}</Typography>
          )
        },
        { id: 'requestDate', label: 'วันที่เบิก', minWidth: 100 },
        { id: 'approvalDate', label: 'วันที่อนุมัติ', minWidth: 100 },
        { id: 'category', label: 'หมวดหมู่', minWidth: 150 },
        commonItemColumn,
        { id: 'unit', label: 'หน่วย', minWidth: 80, align: 'center' },
        { id: 'requestedQty', label: 'จำนวนขอเบิก', minWidth: 100, align: 'right', format: (v: number) => v.toLocaleString() },
        { id: 'actualQty', label: 'จำนวนเบิกจริง', minWidth: 100, align: 'right', format: (v: number) => v.toLocaleString() },
        { id: 'balance', label: 'จำนวนคงเหลือ', minWidth: 100, align: 'right', format: (v: number) => v.toLocaleString() },
      ];
    case 'slow-moving':
      return [
        { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
        { id: 'category', label: 'หมวดหมู่', minWidth: 150 },
        commonItemColumn,
        { id: 'unit', label: 'หน่วย', minWidth: 80, align: 'center' },
        { id: 'balance', label: 'จำนวนคงเหลือ', minWidth: 120, align: 'right', format: (v: number) => v.toLocaleString() },
      ];
    case 'low-stock':
      return [
        { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
        commonItemColumn,
        { id: 'category', label: 'หมวดหมู่', minWidth: 150 },
        { id: 'balance', label: 'จำนวนคงเหลือ', minWidth: 120, align: 'right', format: (v: number) => (
          <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 700 }}>{v.toLocaleString()}</Typography>
        )},
        { id: 'reorderPoint', label: 'จุดสั่งซื้อ', minWidth: 120, align: 'right', format: (v: number) => v.toLocaleString() },
        { id: 'unit', label: 'หน่วย', minWidth: 80, align: 'center' },
      ];
    case 'expiry':
      return [
        { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
        { id: 'category', label: 'หมวดหมู่', minWidth: 150 },
        commonItemColumn,
        { id: 'unit', label: 'หน่วย', minWidth: 80, align: 'center' },
        { id: 'lotNo', label: 'ล็อตที่', minWidth: 100 },
        { id: 'expiryDate', label: 'วันหมดอายุ', minWidth: 120, format: (v: string) => (
          <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 600 }}>{v}</Typography>
        )},
        { id: 'balance', label: 'จำนวนคงเหลือ', minWidth: 100, align: 'right', format: (v: number) => v.toLocaleString() },
      ];
    default:
      return [
        { id: 'id', label: 'ลำดับ', minWidth: 60, align: 'center' },
        commonItemColumn,
        { id: 'category', label: 'หมวดหมู่', minWidth: 150 },
        { id: 'unit', label: 'หน่วย', minWidth: 80, align: 'center' },
        { id: 'balance', label: 'จำนวนคงเหลือ', minWidth: 120, align: 'right', format: (v: number) => v.toLocaleString() },
      ];
  }
};
