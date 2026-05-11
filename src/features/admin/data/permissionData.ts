export interface PermissionSubMenu {
  id: string;
  name: string;
  enabled: boolean;
}

export interface PermissionGroup {
  id: string;
  mainMenu: string;
  subMenus: PermissionSubMenu[];
}

export const MENU_STRUCTURE = [
  { mainMenu: 'คลังเวชภัณฑ์พัสดุ', subMenus: ['คลังพัสดุใหญ่', 'คลังวอร์ด'] },
  { mainMenu: 'รายการรอเบิก/ใบเบิกเวชภัณฑ์', subMenus: [''] },
  { mainMenu: 'นำไปใช้', subMenus: [''] },
  { mainMenu: 'คืนเวชภัณฑ์พัสดุ', subMenus: [''] },
  { mainMenu: 'หมวดหมู่พัสดุภัณฑ์', subMenus: [''] },
  { mainMenu: 'เจ้าหน้าที่', subMenus: [''] },
  { mainMenu: 'รายงาน', subMenus: ['รายงานทะเบียน', 'รายงานสถิติ', 'รายงานยอดการจ่าย'] },
  { mainMenu: 'การจัดการสิทธิ์แบบกลุ่ม', subMenus: [''] },
  { mainMenu: 'Log', subMenus: [''] },
  { mainMenu: 'กำหนดเวชภัณฑ์คงคลัง (Quota)', subMenus: ['กำหนดรายเวชภัณฑ์/พัสดุ', 'กำหนดรายคลังวอร์ด'] },
];

export const INITIAL_ROLES = [
  'ผู้ดูแลระบบ',
  'เจ้าหน้าที่คลังพัสดุ',
  'เจ้าหน้าที่/พยาบาลคลังวอร์ด',
  'พยาบาลประจำวอร์ด'
];

export type RolePermissions = Record<string, PermissionGroup[]>;

export const generateInitialPermissionData = (rolesToUse: string[]): RolePermissions => {
  const data: RolePermissions = {};
  rolesToUse.forEach(role => {
    data[role] = MENU_STRUCTURE.map((m, idx) => ({
      id: `${idx}`,
      mainMenu: m.mainMenu,
      subMenus: m.subMenus.map((s, sIdx) => ({
        id: `${idx}-${sIdx}`,
        name: s,
        enabled: role === 'ผู้ดูแลระบบ' 
      }))
    }));
  });
  return data;
};
