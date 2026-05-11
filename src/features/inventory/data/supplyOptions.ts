export interface SupplyItem {
  id: string;
  itemCode: string;
  itemName: string;
  unit?: string;
  mainStockBalance?: number;
  currentBalance?: number;
  pendingQuantity?: number;
  quota?: number;
}

export const supplyOptions: SupplyItem[] = [
  { 
    id: '1', 
    itemCode: 'G00035', 
    itemName: 'หน้ากากอนามัย 3 ชั้น/สีเขียวอ่อน',
    unit: 'กล่อง',
    mainStockBalance: 486,
    currentBalance: 2,
    pendingQuantity: 10,
    quota: 2
  },
  { 
    id: '2', 
    itemCode: 'INCA001', 
    itemName: 'กระบอกฉีดยา 5 มล.',
    unit: 'ชิ้น',
    mainStockBalance: 1200,
    currentBalance: 150,
    pendingQuantity: 0,
    quota: 500
  },
  { 
    id: '3', 
    itemCode: 'INCA002', 
    itemName: 'สายน้ำเกลือ',
    unit: 'ชุด',
    mainStockBalance: 300,
    currentBalance: 40,
    pendingQuantity: 5,
    quota: 100
  },
];

// Supply options for AssignSupplyModal (different shape)
export interface AssignSupplyItem {
  code: string;
  name: string;
}

export const assignSupplyOptions: AssignSupplyItem[] = [
  { code: 'INCA001', name: 'เข็มฉีดยา เบอร์ 24' },
  { code: 'INCA002', name: 'สายน้ำเกลือ' },
  { code: 'G00001', name: 'ชุดทำความชื้น Draeger รุ่น MP00234' },
  { code: '8859130618966', name: 'หน้ากากอนามัย 3 ชั้น/สีเขียวอ่อน' },
  { code: 'INSU008', name: 'ผ้าพันแผล 4 นิ้ว' },
];

export const wardOptions = ['ER', 'ICU', 'OPD', 'LAB', 'Ward 1', 'Ward 2'];
