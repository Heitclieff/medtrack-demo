export interface StaffItem {
  id: string;
  name: string;
  username: string;
  unit: string;
  position: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface PendingStaffItem {
  id: string;
  name: string;
  unit: string;
  role: string;
  date: string;
  status: 'pending';
  username: string;
}

export const initialStaffMockData: StaffItem[] = [
  { id: '1', name: 'กิตติธัช พูลประเสริฐ', username: 'kittituch', unit: 'พัสดุ', position: 'เจ้าหน้าที่บริหารงานทั่วไป', role: 'ผู้ดูแลระบบ', status: 'active', lastLogin: '20/11/2566 21:36' },
  { id: '2', name: 'นพ. สมชาย มั่นคง', username: 'somchai', unit: 'ER', position: 'นายแพทย์ชำนาญการ', role: 'แพทย์', status: 'active', lastLogin: '12/03/2569 10:09' },
  { id: '3', name: 'นาย วิทยา ทดสอบ', username: 'witaya', unit: 'ICU', position: 'พยาบาลวิชาชีพ', role: 'พยาบาล', status: 'inactive', lastLogin: '12/02/2567 02:18' },
];

export const initialPendingStaffMockData: PendingStaffItem[] = [
  { id: '1', name: 'พยาบาล มานี', unit: 'OPD', role: 'พยาบาล', username : 'manee', date: '25/01/2567 09:30', status: 'pending' },
  { id: '2', name: 'นาย ปิติ สมบูรณ์', unit: 'ER', role: 'เจ้าหน้าที่เวชกิจ', username : 'piti', date: '25/01/2567 10:15', status: 'pending' },
  { id: '3', name: 'นางสาว ชูใจ ใจดี', unit: 'ICU', role: 'พยาบาลวิชาชีพ', username : 'chujai', date: '25/01/2567 13:45', status: 'pending' },
];

export const STAFF_UNITS = ['ทั้งหมด', 'พัสดุ', 'ER', 'ICU', 'OPD', 'LAB'];
export const STAFF_POSITIONS = ['ทั้งหมด', 'เจ้าหน้าที่บริหารงานทั่วไป', 'นายแพทย์ชำนาญการ', 'พยาบาลวิชาชีพ', 'เภสัชกร'];
export const STAFF_ROLES = ['ทั้งหมด', 'ผู้ดูแลระบบ', 'แพทย์', 'พยาบาล', 'เจ้าหน้าที่พัสดุ'];
