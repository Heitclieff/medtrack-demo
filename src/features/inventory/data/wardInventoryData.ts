export interface WardInventoryItem {
  id: string;
  category: string;
  name: string;
  code: string;
  balance: number;
  unit: string;
  price: string;
  expiryDate: string;
}

export const initialWardInventoryMockData: WardInventoryItem[] = [
  { 
    id: '1', 
    category: 'เวชภัณฑ์ทางการแพทย์', 
    name: 'หน้ากากอนามัย', 
    code: '8859130618966', 
    balance: 2, 
    unit: 'กล่อง',
    price: '120.00',
    expiryDate: '15/10/2026'
  },
  { 
    id: '2', 
    category: 'เวชภัณฑ์ทางการแพทย์', 
    name: 'กระบอกฉีดยา 5 มล.', 
    code: '8859130600015', 
    balance: 150, 
    unit: 'ชิ้น',
    price: '450.50',
    expiryDate: '20/12/2025'
  },
];

export const WARD_INVENTORY_CATEGORIES = ['ทุกหมวดหมู่', 'เวชภัณฑ์ทางการแพทย์', 'ยาแผนปัจจุบัน', 'วัสดุสิ้นเปลือง'];
export const EXPIRY_STATUS_OPTIONS = ['ทั้งหมด', 'ใกล้หมดอายุ', 'หมดอายุแล้ว'];
export const STOCK_STATUS_OPTIONS = ['ทั้งหมด', 'คงคลัง', 'ใกล้หมด', 'หมดพัสดุ'];
