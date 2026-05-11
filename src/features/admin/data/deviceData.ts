export interface Device {
  id: string;
  name: string;
  type: 'Gate' | 'Scanner';
  location: string;
  status: 'Online' | 'Offline' | 'Alarm';
  sensitivity: number;
  volume: number;
  lastActive: string;
}

export interface AlarmLog {
  id: string;
  deviceId: string;
  deviceName: string;
  time: string;
  details: string;
}

export const initialDeviceMockData: Device[] = [
  { 
    id: 'DEV-001', 
    name: 'EAS Gate 01', 
    type: 'Gate', 
    location: 'ทางเข้า-ออกหลัก', 
    status: 'Online', 
    sensitivity: 75, 
    volume: 60,
    lastActive: '16/03/2569 17:30'
  },
  { 
    id: 'DEV-002', 
    name: 'EAS Gate 02', 
    type: 'Gate', 
    location: 'ทางออกฉุกเฉิน', 
    status: 'Online', 
    sensitivity: 80, 
    volume: 50,
    lastActive: '16/03/2569 17:32'
  },
  { 
    id: 'DEV-003', 
    name: 'RFID Scanner 01', 
    type: 'Scanner', 
    location: 'เคาน์เตอร์จ่ายเวชภัณฑ์', 
    status: 'Online', 
    sensitivity: 90, 
    volume: 40,
    lastActive: '16/03/2569 17:35'
  },
  { 
    id: 'DEV-004', 
    name: 'EAS Gate 03', 
    type: 'Gate', 
    location: 'ทางเดินเชื่อมตึก', 
    status: 'Offline', 
    sensitivity: 70, 
    volume: 60,
    lastActive: '15/03/2569 09:00'
  }
];

export const initialAlarmLogMockData: AlarmLog[] = [
  { id: '1', deviceId: 'DEV-001', deviceName: 'EAS Gate 01', time: '16/03/2569 16:45', details: 'ตรวจพบเวชภัณฑ์ไม่ได้ลงทะเบียน' },
  { id: '2', deviceId: 'DEV-002', deviceName: 'EAS Gate 02', time: '16/03/2569 14:20', details: 'ตรวจพบการเคลื่อนย้ายผิดปกติ' },
  { id: '3', deviceId: 'DEV-001', deviceName: 'EAS Gate 01', time: '15/03/2569 10:30', details: 'ตรวจพบเวชภัณฑ์ไม่ได้ลงทะเบียน' },
];
