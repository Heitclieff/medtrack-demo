export interface RequisitionItem {
  id: string;
  ward: string;
  requester: string;
  itemCount: number;
  category: string;
  docNo: string;
  date: string;
  time: string;
  status: 'pending';
}

export const requisitionMockData: RequisitionItem[] = [
  { 
    id: '1', 
    ward: 'ชีวาภิบาล', 
    requester: 'กิตติธัช พูลประเสริฐ', 
    itemCount: 12, 
    category: 'เวชภัณฑ์', 
    docNo: 'REQ-6703-001', 
    date: '15/03/2569', 
    time: '14:30',
    status: 'pending' 
  },
  { 
    id: '2', 
    ward: 'ER', 
    requester: 'นพ. สมชาย มั่นคง', 
    itemCount: 5, 
    category: 'พัสดุทางการแพทย์', 
    docNo: 'REQ-6703-002', 
    date: '16/03/2569', 
    time: '09:15',
    status: 'pending' 
  },
  { 
    id: '3', 
    ward: 'ICU', 
    requester: 'พยาบาล สมหญิง', 
    itemCount: 8, 
    category: 'เวชภัณฑ์', 
    docNo: 'REQ-6703-003', 
    date: '16/03/2569', 
    time: '11:45',
    status: 'pending' 
  },
];

export const REQUISITION_CATEGORIES = ['ทั้งหมด', 'เวชภัณฑ์', 'พัสดุทางการแพทย์', 'วัสดุสำนักงาน'];
