export interface ReturnHistoryEntry {
  id: string;
  returnCode: string;
  items: string;
  quantity: number;
  returnDate: string;
  status: 'สำเร็จ' | 'รอการยืนยัน';
}

export const returnHistoryMock: ReturnHistoryEntry[] = [
  {
    id: 'H1',
    returnCode: 'RT-20240316-001',
    items: 'MASK 50 ชิ้น (GPO), SYRINGE 5 ML',
    quantity: 25,
    returnDate: '16/03/2024 14:30',
    status: 'สำเร็จ'
  },
  {
    id: 'H2',
    returnCode: 'RT-20240316-002',
    items: 'SYRINGE 10 ML',
    quantity: 10,
    returnDate: '16/03/2024 16:45',
    status: 'สำเร็จ'
  }
];
