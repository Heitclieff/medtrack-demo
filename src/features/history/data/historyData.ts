export interface UsageHistoryItem {
  id: string;
  ward: string;
  usedBy: string;
  itemCount: number;
  date: string; // Format: DD/MM/YYYY
  time: string;
}

export interface RequisitionHistoryItem {
  id: string;
  ward: string;
  requester: string;
  itemsRequested: number;
  itemsApproved: number;
  docNo: string;
  approvalNo: string;
  requestDate: string;
  requestTime: string;
  approvalDate: string;
  approvalTime: string;
  category: string;
}

export interface ReturnHistoryItem {
  id: string;
  itemCode: string;
  itemName: string;
  returnedBy: string;
  unit: string;
  quantity: string;
  reason: string;
  date: string;
}

export const initialUsageHistoryMockData: UsageHistoryItem[] = [
  { id: '1', ward: 'ชีวาภิบาล', usedBy: 'กิตติธัช พูลประเสริฐ', itemCount: 1, date: '01/03/2569', time: '06:48' },
  { id: '2', ward: 'ชีวาภิบาล', usedBy: 'กิตติธัช พูลประเสริฐ', itemCount: 1, date: '01/03/2569', time: '06:20' },
  { id: '3', ward: 'ER', usedBy: 'นพ. สมชาย มั่นคง', itemCount: 2, date: '15/03/2569', time: '10:30' },
];

export const initialRequisitionHistoryMockData: RequisitionHistoryItem[] = [
  { 
    id: '1', 
    ward: 'ห้องตรวจศัลยกรรมกระดูก', 
    requester: 'กิตติธัช พูลประเสริฐ', 
    itemsRequested: 1, 
    itemsApproved: 1, 
    docNo: 'RN2569031472', 
    approvalNo: 'AN2569031431', 
    requestDate: '16/03/2569', 
    requestTime: '11:46',
    approvalDate: '16/03/2569',
    approvalTime: '11:47',
    category: 'เวชภัณฑ์'
  },
  { 
    id: '2', 
    ward: 'หอผู้ป่วยชาย 2', 
    requester: 'สมรัก ยอดเยี่ยม', 
    itemsRequested: 5, 
    itemsApproved: 5, 
    docNo: 'RN2569031455', 
    approvalNo: 'AN2569031440', 
    requestDate: '15/03/2569', 
    requestTime: '09:30',
    approvalDate: '15/03/2569',
    approvalTime: '10:15',
    category: 'พัสดุทางการแพทย์'
  },
  { 
    id: '3', 
    ward: 'ห้องฉุกเฉิน (ER)', 
    requester: 'สมชาย มั่นคง', 
    itemsRequested: 3, 
    itemsApproved: 3, 
    docNo: 'RN2569031430', 
    approvalNo: 'AN2569031420', 
    requestDate: '14/03/2569', 
    requestTime: '14:20',
    approvalDate: '14/03/2569',
    approvalTime: '15:00',
    category: 'วัสดุสำนักงาน'
  }
];

export const initialReturnHistoryMockData: ReturnHistoryItem[] = [
  { id: '1', itemCode: 'INCA001', itemName: 'เข็มฉีดยา เบอร์ 24', returnedBy: 'นาย วิทยา', unit: 'ER', quantity: '10 ชิ้น', reason: 'เบิกเกิน', date: '21/01/2567' },
];

export const HISTORY_WARDS = ['ทุกคลังวอร์ด', 'ชีวาภิบาล', 'ER', 'ICU', 'OPD'];
export const REQUISITION_CATEGORIES = ['ทั้งหมด', 'เวชภัณฑ์', 'พัสดุทางการแพทย์', 'วัสดุสำนักงาน', 'อื่นๆ'];
