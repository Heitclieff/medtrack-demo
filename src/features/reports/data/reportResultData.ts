import React from 'react';
import { Typography } from '@mui/material';

export const REPORT_TITLES: Record<string, string> = {
  'stock-balance': 'รายงานยอดคงเหลือภาพรวม',
  'quota-comparison': 'รายงานจำนวนคงเหลือเทียบกับตารางสูงสุด',
  'payouts': 'รายงานยอดการจ่ายรายรายการและภาพรวม',
  'slow-moving': 'รายงานยอดเคลื่อนไหวน้อย',
  'low-stock': 'รายงานพัสดุเวชภัณฑ์ที่ใกล้หมด',
  'expiry': 'รายงานวันหมดอายุเวชภัณฑ์ / หมดอายุ',
};

export const getReportMockData = (reportId: string): any[] => {
  switch (reportId) {
    case 'stock-balance':
      return [
        { id: '1', category: 'เวชภัณฑ์ทางการแพทย์', code: 'G0001', name: 'ถุงมือยาง เบอร์ 7', unit: 'คู่', balance: 3500 },
        { id: '2', category: 'เครื่องมือแพทย์', code: 'G0002', name: 'หน้ากากอนามัย 3 ชั้น', unit: 'กล่อง', balance: 120 },
      ];
    case 'quota-comparison':
      return [
        { id: '1', wardDept: 'คลังวอร์ด ER', category: 'เวชภัณฑ์ทางการแพทย์', code: 'G0001', name: 'ถุงมือยาง เบอร์ 7', unit: 'คู่', maxQuota: 5000, balance: 3500 },
        { id: '2', wardDept: 'คลังวอร์ด OR', category: 'เครื่องมือแพทย์', code: 'G0002', name: 'หน้ากากอนามัย 3 ชั้น', unit: 'กล่อง', maxQuota: 100, balance: 120 },
      ];
    case 'payouts':
      return [
        { 
          id: '1', wardDept: 'Ward ER', requesterName: 'นส.สมหญิง ใจดี', requestId: 'REQ-01', approvalId: 'APP-01',
          requestDate: '10/03/67', approvalDate: '11/03/67', category: 'เวชภัณฑ์ทางการแพทย์',
          code: 'G0001', name: 'ถุงมือยาง เบอร์ 7', unit: 'คู่', requestedQty: 50, actualQty: 50, balance: 3500 
        },
      ];
    case 'slow-moving':
      return [
        { id: '1', code: 'G0001', name: 'ถุงมือยาง เบอร์ 7', category: 'เวชภัณฑ์ทางการแพทย์', unit: 'คู่', balance: 3500 },
        { id: '2', code: 'G0002', name: 'หน้ากากอนามัย 3 ชั้น', category: 'เครื่องมือแพทย์', unit: 'กล่อง', balance: 120 },
      ];
    case 'low-stock':
      return [
        { id: '1', code: 'G0001', name: 'ถุงมือยาง เบอร์ 7', category: 'เวชภัณฑ์ทางการแพทย์', balance: 45, reorderPoint: 100, unit: 'คู่' },
        { id: '2', code: 'G0003', name: 'สำลีพันก้าน', category: 'เวชภัณฑ์ทางการแพทย์', balance: 12, reorderPoint: 50, unit: 'แพ็ค' },
      ];
    case 'expiry':
      return [
        { id: '1', category: 'เวชภัณฑ์ทางการแพทย์', code: 'G0001', name: 'ถุงมือยาง เบอร์ 7', unit: 'คู่', lotNo: 'LOT-2024A', expiryDate: '15/06/27', balance: 3500 },
      ];
    default:
      return [
        { id: '1', code: 'G0001', name: 'เวชภัณฑ์ตัวอย่าง', category: 'ทั่วไป', unit: 'ชิ้น', balance: 100 },
      ];
  }
};
