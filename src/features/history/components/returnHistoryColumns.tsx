import React from 'react';
import {  Column  } from '@components/ui';
import { ReturnHistoryItem } from '../data/historyData';

export const getReturnHistoryColumns = (): Column<ReturnHistoryItem>[] => [
  { id: 'id', label: 'ลำดับ', minWidth: 50, align: 'center' },
  { id: 'itemCode', label: 'รหัสเวชภัณฑ์', minWidth: 120 },
  { id: 'itemName', label: 'ชื่อเวชภัณฑ์', minWidth: 170 },
  { id: 'returnedBy', label: 'ผู้ส่งคืน', minWidth: 150 },
  { id: 'unit', label: 'หน่วยงาน', minWidth: 120 },
  { id: 'quantity', label: 'จำนวนที่คืน', minWidth: 100 },
  { id: 'reason', label: 'เหตุผล', minWidth: 150 },
  { id: 'date', label: 'วันที่ทำรายการ', minWidth: 120 },
];
