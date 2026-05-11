export interface UnitItem {
  id: string;
  name: string;
  building: string;
  internalNumber: string;
  description: string;
}

export const initialUnitMockData: UnitItem[] = [
  { id: '1', name: 'พัสดุ', building: 'อาคาร A', internalNumber: '1234', description: 'คลังพัสดุกลางและกระจายสินค้า' },
  { id: '2', name: 'ER', building: 'อาคาร B', internalNumber: '5678', description: 'ห้องฉุกเฉินและอุบัติเหตุ' },
  { id: '3', name: 'ICU', building: 'อาคาร C', internalNumber: '9012', description: 'หอผู้ป่วยวิกฤต' },
  { id: '4', name: 'OPD', building: 'อาคาร D', internalNumber: '3456', description: 'แผนกผู้ป่วยนอก' },
  { id: '5', name: 'LAB', building: 'อาคาร E', internalNumber: '7890', description: 'ห้องปฏิบัติการเทคนิคการแพทย์' },
];
