export interface InventoryItem {
  id: string; // Used as ลำดับ
  name: string;
  code: string;
  category: string;
  unit: string;
  balance: string;
  minStockPercent: string;
  maxStock: string;
  maxWardStock: string;
  barcode: string;
  expiryDate: string;
  note: string;
  hasPartial: boolean;
  expiryThresholdDays: number;
  price: string;
  importHistory?: any[];
}

export const initialMockData: InventoryItem[] = [
  {
    id: '1',
    category: 'เวชภัณฑ์ทางการแพทย์',
    name: 'ชุดทำความสะอาดแผล',
    code: 'INV45612578',
    unit: 'ชุด',
    balance: '31',
    minStockPercent: '20',
    maxStock: '100',
    maxWardStock: '50',
    barcode: '45612578',
    expiryDate: '12/10/2026',
    note: '',
    hasPartial: true,
    expiryThresholdDays: 30,
    price: '1250.00',
    importHistory: [
      { id: 'h1', transactionId: 'PO-20240310-01', importQuantity: '50', balanceQuantity: '20', expiryDate: '15/10/2026', importDate: '10/03/2024', type: 'ซื้อ', importer: 'สมชาย เจริญสุข', note: 'ล็อตปกติ', attachment: 'po-01.pdf' },
      { id: 'h2', transactionId: 'DON-20240115-05', importQuantity: '20', balanceQuantity: '5', expiryDate: '15/10/2026', importDate: '15/01/2024', type: 'บริจาค', importer: 'มูลนิธิใจดี', note: 'ของบริจาคช่วยเหลือน้ำท่วม' }
    ]
  },
  {
    id: '2',
    category: 'เวชภัณฑ์ทางการแพทย์',
    name: 'เข็มฉีดยา เบอร์ 24',
    code: 'INCA001',
    unit: 'กล่อง',
    balance: '52',
    minStockPercent: '10',
    maxStock: '200',
    maxWardStock: '100',
    barcode: 'INCA001',
    expiryDate: '15/05/2026',
    note: '',
    hasPartial: false,
    expiryThresholdDays: 60,
    price: '450.50',
  },
  {
    id: '3',
    category: 'เวชภัณฑ์ทางการแพทย์',
    name: 'สายน้ำเกลือ',
    code: 'INCA002',
    unit: 'ชุด',
    balance: '40',
    minStockPercent: '15',
    maxStock: '150',
    maxWardStock: '75',
    barcode: 'INCA002',
    expiryDate: '20/11/2026',
    note: '',
    hasPartial: false,
    expiryThresholdDays: 30,
    price: '85.00',
  },
  {
    id: '4',
    category: 'วัสดุสำนักงาน',
    name: 'กระดาษ A4 80 แกรม',
    code: 'OFF001',
    unit: 'รีม',
    balance: '120',
    minStockPercent: '20',
    maxStock: '500',
    maxWardStock: '250',
    barcode: 'OFF001',
    expiryDate: '01/01/2028',
    note: '',
    hasPartial: false,
    expiryThresholdDays: 30,
    price: '110.00',
  },
  {
    id: '5',
    category: 'วัสดุสิ้นเปลือง',
    name: 'ผ้าพันแผล 4 นิ้ว',
    code: 'INSU008',
    unit: 'แพ็ค',
    balance: '15',
    minStockPercent: '10',
    maxStock: '50',
    maxWardStock: '25',
    barcode: 'INSU008',
    expiryDate: '10/12/2025',
    note: '',
    hasPartial: false,
    expiryThresholdDays: 30,
    price: '25.75',
  },
];

export const categories = ['ทุกหมวดหมู่', 'เวชภัณฑ์ทางการแพทย์', 'ยาแผนปัจจุบัน', 'วัสดุสิ้นเปลือง'];
