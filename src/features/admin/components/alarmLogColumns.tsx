import {  Column  } from '@components/ui';
import { AlarmLog } from '../data/deviceData';

export const alarmLogColumns: Column<AlarmLog>[] = [
  { id: 'time', label: 'เวลาที่เกิดเหตุ', minWidth: 150 },
  { id: 'deviceName', label: 'ชื่ออุปกรณ์', minWidth: 140 },
  { id: 'details', label: 'รายละเอียด', minWidth: 200 },
];
