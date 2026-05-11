export interface UsageInventoryItem {
  id: string;
  category: string;
  name: string;
  code: string;
  balance: string;
  unit: string;
  lastUsedBy: string;
  lastUsedUnit: string;
}

export const usageMockData: UsageInventoryItem[] = [
  {
    id: '1',
    category: 'เวชภัณฑ์ทางการแพทย์',
    name: 'หน้ากากอนามัย',
    code: '8859130618966',
    balance: '2 กล่อง',
    unit: 'กล่อง',
    lastUsedBy: 'นพ. สมชาย มั่นคง',
    lastUsedUnit: 'ER'
  },
  {
    id: '2',
    category: 'คลังพัสดุกลาง',
    name: 'A00010 ดินสอดำ',
    code: '8851553207451',
    balance: '1 กล่อง',
    unit: 'กล่อง',
    lastUsedBy: 'คุณ กิตติธัช',
    lastUsedUnit: 'พัสดุ'
  },
  {
    id: '3',
    category: 'คลังพัสดุกลาง',
    name: 'A00027 ยางลบดินสอ',
    code: '8851553207452',
    balance: '0 ก้อน',
    unit: 'ก้อน',
    lastUsedBy: '-',
    lastUsedUnit: '-'
  }
];

export const USAGE_CATEGORIES = ['ทุกหมวดหมู่', 'เวชภัณฑ์ทางการแพทย์', 'คลังพัสดุกลาง', 'ยาแผนปัจจุบัน'];
