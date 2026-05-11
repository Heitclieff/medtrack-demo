import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Checkbox,
  Tooltip
} from '@mui/material';
import { PermissionGroup } from '../data/permissionData';

interface PermissionTableProps {
  permissions: PermissionGroup[];
  selectedRole: string;
  searchTerm: string;
  onToggle: (groupId: string, subMenuId: string) => void;
  onToggleGroup: (groupId: string) => void;
}

const PermissionTable: React.FC<PermissionTableProps> = ({
  permissions,
  selectedRole,
  searchTerm,
  onToggle,
  onToggleGroup,
}) => {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: 'grey.50' }}>
            <TableCell sx={{ fontWeight: 700, py: 2, borderRight: '1px solid', borderColor: 'divider', width: '30%' }} align="center">
              เมนูหลัก
            </TableCell>
            <TableCell sx={{ fontWeight: 700, py: 2, borderRight: '1px solid', borderColor: 'divider', width: '30%' }} align="center">
              เมนูย่อย
            </TableCell>
            <TableCell sx={{ fontWeight: 700, color: 'primary.main', py: 2, borderBottom: '2px solid' }} align="center">
              {selectedRole}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                <Typography variant="body2">ไม่พบผลลัพธ์ที่ตรงกับ "{searchTerm}"</Typography>
              </TableCell>
            </TableRow>
          ) : (
            permissions.map((group) => (
              <React.Fragment key={group.id}>
                {group.subMenus.map((subMenu, subIndex) => (
                  <TableRow key={subMenu.id} hover>
                    {subIndex === 0 && (
                      <Tooltip title={`คลิกเพื่อเลือก/ยกเลิก "ทุกเมนู" ในกลุ่มนี้`} placement="left">
                        <TableCell 
                          rowSpan={group.subMenus.length} 
                          onClick={() => onToggleGroup(group.id)}
                          sx={{ 
                            fontWeight: 600, bgcolor: 'white', color: 'primary.main',
                            borderRight: '1px solid', borderColor: 'divider', verticalAlign: 'middle',
                            textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s',
                            '&:hover': { bgcolor: 'rgba(63, 106, 216, 0.04)' }
                          }}
                        >
                          {group.mainMenu}
                        </TableCell>
                      </Tooltip>
                    )}
                    <TableCell sx={{ 
                      bgcolor: subMenu.name === '' ? 'grey.50' : 'white',
                      color: subMenu.name === '' ? 'text.disabled' : 'text.primary',
                      borderRight: '1px solid', borderColor: 'divider',
                      fontStyle: subMenu.name === '' ? 'italic' : 'normal',
                      textAlign: 'center', py: 1.5, fontSize: '0.875rem'
                    }}>
                      {subMenu.name || 'ไม่มีเมนูย่อย'}
                    </TableCell>
                    <TableCell 
                      align="center" 
                      onClick={() => onToggle(group.id, subMenu.id)}
                      sx={{ 
                        bgcolor: 'white', cursor: 'pointer', transition: 'background-color 0.2s',
                        '&:hover': { bgcolor: 'rgba(63, 106, 216, 0.05)' }
                      }}
                    >
                      <Checkbox 
                        size="medium"
                        checked={subMenu.enabled}
                        onChange={() => onToggle(group.id, subMenu.id)}
                        sx={{ 
                          color: 'grey.300',
                          '&.Mui-checked': { color: 'primary.main' },
                          '&:hover': { bgcolor: 'transparent' }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PermissionTable;
