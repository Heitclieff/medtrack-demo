export interface QuotaItem {
  id: string;
  itemCode: string;
  itemName: string;
  category: string;
  minLimit: number;
  maxLimit: number;
}

export interface WardQuotaItem {
  id: string;
  itemCode: string;
  itemName: string;
  ward: string;
  minLimit: number;
  maxLimit: number;
}

export const generalQuotaMockData: QuotaItem[] = [
  { id: '1', itemCode: 'INCA001', itemName: 'เข็มฉีดยา เบอร์ 24', category: 'เวชภัณฑ์ทางการแพทย์', minLimit: 50, maxLimit: 500 },
  { id: '2', itemCode: 'INCA002', itemName: 'สายน้ำเกลือ', category: 'เวชภัณฑ์ทางการแพทย์', minLimit: 20, maxLimit: 200 },
];

export const wardQuotaMockData: WardQuotaItem[] = [
  { id: '1', itemCode: 'INCA001', itemName: 'เข็มฉีดยา เบอร์ 24', ward: 'ER', minLimit: 10, maxLimit: 50 },
  { id: '2', itemCode: 'INCA002', itemName: 'สายน้ำเกลือ', ward: 'ICU', minLimit: 20, maxLimit: 100 },
];

export const WARD_OPTIONS = [
  { label: 'ทั้งหมด', value: 'all' },
  { label: 'ER', value: 'er' },
  { label: 'ICU', value: 'icu' },
  { label: 'OPD', value: 'opd' },
];
