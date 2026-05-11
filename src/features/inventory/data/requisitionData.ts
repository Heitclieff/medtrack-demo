export interface RequisitionItem {
  itemId: string;
  itemCode: string;
  itemName: string;
  unit: string;
  requestQuantity: number;
  receivedQuantity?: number;
  note?: string;
}

export interface Requisition {
  id: string;
  status: 'รอยืนยัน' | 'รอรับของ' | 'เสร็จสิ้น' | 'ยกเลิก';
  requestDate: string;
  requesterName: string;
  department: string;
  ward: string;
  items: RequisitionItem[];
  generalNote?: string;
  totalItems: number;
  mainCategory: string;
  approverName?: string;
  approvalDate?: string;
}

export const mockRequisitions: Record<string, Requisition> = {
  'REQ-6703-001': {
    id: 'REQ-6703-001',
    status: 'รอยืนยัน',
    requestDate: '15/03/2569 14:30',
    requesterName: 'กิตติธัช พูลประเสริฐ',
    department: 'พัสดุ',
    ward: 'ชีวาภิบาล',
    mainCategory: 'เวชภัณฑ์',
    items: [
      {
        itemId: '1',
        itemCode: 'G00035',
        itemName: 'หน้ากากอนามัย 3 ชั้น/สีเขียวอ่อน',
        unit: 'กล่อง',
        requestQuantity: 5,
        note: 'ใช้ในวอร์ดฉุกเฉิน'
      }
    ],
    generalNote: 'เบิกด่วนสำหรับการใช้งานรอบบ่าย',
    totalItems: 12
  },
  'REQ-6703-002': {
    id: 'REQ-6703-002',
    status: 'รอรับของ',
    requestDate: '16/03/2569 09:15',
    requesterName: 'นพ. สมชาย มั่นคง',
    department: 'พยาบาลวิชาชีพ',
    ward: 'ER',
    mainCategory: 'พัสดุทางการแพทย์',
    items: [],
    totalItems: 5
  },
  'REQ-6703-003': {
    id: 'REQ-6703-003',
    status: 'รอยืนยัน',
    requestDate: '16/03/2569 11:45',
    requesterName: 'พยาบาล สมหญิง',
    department: 'พยาบาล',
    ward: 'ICU',
    mainCategory: 'เวชภัณฑ์',
    items: [],
    totalItems: 8
  }
};

export const allMockRequisitions: Requisition[] = Object.values(mockRequisitions);

export const getRequisitionById = (id: string): Requisition | undefined => {
  return mockRequisitions[id] || {
    ...mockRequisitions['REQ-6703-001'],
    id,
  };
};
