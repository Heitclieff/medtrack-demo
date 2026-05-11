'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
// import React, { useState, useMemo, useEffect } from 'react';
import { 
  Box, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Tooltip, 
  CircularProgress 
} from '@mui/material';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { Toolbar } from '@components/ui';
import { SearchField } from '@components/ui';
import { Snackbar } from '@components/ui';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const RolePermissionModal = dynamic(() => import('@/features/admin/components').then(mod => mod.RolePermissionModal), { ssr: false });

import { PermissionTable } from '@/features/admin/components';

import { 
  INITIAL_ROLES, 
  generateInitialPermissionData,
  RolePermissions 
} from '@/features/admin/data/permissionData';
import { usePermissionsList, useUpdatePermissions } from '@/features/admin/hooks/useAdminQueries';

export default function PermissionsPageClient() {
  const { data: dbPermissions, isLoading } = usePermissionsList();
  const updateMutation = useUpdatePermissions();

  const [rolesList, setRolesList] = useState<string[]>(INITIAL_ROLES);
  const [selectedRole, setSelectedRole] = useState(INITIAL_ROLES[0]);
  const [allRolePermissions, setAllRolePermissions] = useState<RolePermissions>(
    generateInitialPermissionData(INITIAL_ROLES)
  );
  
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [editingRoleName, setEditingRoleName] = useState('');

  const currentPermissions = allRolePermissions[selectedRole] || [];

  const handleToggle = (groupId: string, subMenuId: string) => {
    setAllRolePermissions(prev => ({
      ...prev,
      [selectedRole]: prev[selectedRole].map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            subMenus: group.subMenus.map(sub => 
              sub.id === subMenuId ? { ...sub, enabled: !sub.enabled } : sub
            )
          };
        }
        return group;
      })
    }));
  };

  const handleToggleGroup = (groupId: string) => {
    setAllRolePermissions(prev => {
      const group = prev[selectedRole].find(g => g.id === groupId);
      if (!group) return prev;

      const allEnabled = group.subMenus.every(s => s.enabled);
      
      return {
        ...prev,
        [selectedRole]: prev[selectedRole].map(g => {
          if (g.id === groupId) {
            return {
              ...g,
              subMenus: g.subMenus.map(s => ({ ...s, enabled: !allEnabled }))
            };
          }
          return g;
        })
      };
    });
  };

  const handleOpenRoleDialog = (mode: 'create' | 'edit', role?: string) => {
    setDialogMode(mode);
    setEditingRoleName(role || '');
    setIsRoleDialogOpen(true);
  };

  const handleCreateOrUpdateRole = (roleName: string, copyFrom?: string) => {
    if (!roleName.trim()) return;

    if (dialogMode === 'create') {
      if (rolesList.includes(roleName)) return alert('ชื่อกลุ่มนี้มีอยู่แล้ว');
      setRolesList([...rolesList, roleName]);
      
      const newPermissions = copyFrom 
        ? JSON.parse(JSON.stringify(allRolePermissions[copyFrom]))
        : generateInitialPermissionData([roleName])[roleName];

      setAllRolePermissions(prev => ({ ...prev, [roleName]: newPermissions }));
      setSelectedRole(roleName);
    } else {
      if (roleName === editingRoleName) {
        setIsRoleDialogOpen(false);
        return;
      }
      if (rolesList.includes(roleName)) return alert('ชื่อกลุ่มนี้มีอยู่แล้ว');
      
      setRolesList(rolesList.map(r => r === editingRoleName ? roleName : r));
      setAllRolePermissions(prev => {
        const newData = { ...prev };
        newData[roleName] = newData[editingRoleName];
        delete newData[editingRoleName];
        return newData;
      });
      if (selectedRole === editingRoleName) setSelectedRole(roleName);
    }
    setIsRoleDialogOpen(false);
  };

  const handleDeleteRole = (roleToDelete: string) => {
    if (roleToDelete === 'ผู้ดูแลระบบ') return alert('ไม่สามารถลบกลุ่มผู้ดูแลระบบได้');
    if (confirm(`คุณต้องการลบกลุ่มสิทธิ์ "${roleToDelete}" ใช่หรือไม่?`)) {
      setRolesList(rolesList.filter(r => r !== roleToDelete));
      setAllRolePermissions(prev => {
        const newData = { ...prev };
        delete newData[roleToDelete];
        return newData;
      });
      if (selectedRole === roleToDelete) setSelectedRole('ผู้ดูแลระบบ');
    }
  };

  const handleSave = () => {
    updateMutation.mutate({ role: selectedRole, data: currentPermissions }, {
      onSuccess: () => {
        setSnackbar({ open: true, message: 'บันทึกการตั้งค่าสิทธิ์เรียบร้อยแล้ว!', severity: 'success' });
      },
      onError: () => {
        setSnackbar({ open: true, message: 'เกิดข้อผิดพลาดในการบันทึก', severity: 'error' });
      }
    });
  };

  const filteredPermissions = useMemo(() => {
    if (!searchTerm) return currentPermissions;
    return currentPermissions.filter(group => 
      group.mainMenu.includes(searchTerm) || 
      group.subMenus.some(sub => sub.name.includes(searchTerm))
    );
  }, [currentPermissions, searchTerm]);

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 2, md: 2 } }}>
        <PageHeader 
          title="การจัดการสิทธิ์แบบกลุ่ม"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'การจัดการสิทธิ์แบบกลุ่ม' }]}
        />

        <Toolbar
          actions={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              <FormControl size="small" sx={{ minWidth: 220 }}>
                <InputLabel>เลือกกลุ่ม</InputLabel>
                <Select label="เลือกกลุ่ม" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                  {rolesList.map(role => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedRole !== 'ผู้ดูแลระบบ' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Tooltip title="แก้ไขชื่อกลุ่มสิทธิ์">
                    <Box 
                      onClick={() => handleOpenRoleDialog('edit', selectedRole)}
                      sx={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        p: 0.75, borderRadius: 1, border: '1px solid', borderColor: 'divider', cursor: 'pointer',
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main', bgcolor: 'primary.light', borderColor: 'primary.main', opacity: 0.1 }
                      }}
                    >
                      <EditIcon sx={{ fontSize: 18 }} />
                    </Box>
                  </Tooltip>
                  <Tooltip title="ลบกลุ่มสิทธิ์">
                    <Box 
                      onClick={() => handleDeleteRole(selectedRole)}
                      sx={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        p: 0.75, borderRadius: 1, border: '1px solid', borderColor: 'divider', cursor: 'pointer',
                        color: 'text.secondary',
                        '&:hover': { color: 'error.main', bgcolor: 'error.light', borderColor: 'error.main', opacity: 0.1 }
                      }}
                    >
                      <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                    </Box>
                  </Tooltip>
                </Box>
              )}

              <Button
                variant="text"
                startIcon={<AddIcon />}
                onClick={() => handleOpenRoleDialog('create')}
                sx={{ textTransform: 'none', color: 'primary.main', fontWeight: 600 }}
              >
                สร้างสิทธิ์ใหม่
              </Button>
            </Box>
          }
          search={
            <SearchField label="ค้นหา" 
              placeholder="ค้นหาเมนู..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 250 }}
            />
          }
        />

        <Box sx={{ '& .MuiPaper-root': { borderTopLeftRadius: 0, borderTopRightRadius: 0, borderTop: 'none' }, position: 'relative' }}>
          {isLoading && (
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.7)', zIndex: 10 }}>
              <CircularProgress />
            </Box>
          )}
          
          <PermissionTable 
            permissions={filteredPermissions}
            selectedRole={selectedRole}
            searchTerm={searchTerm}
            onToggle={handleToggle}
            onToggleGroup={handleToggleGroup}
          />

          <Box sx={{ 
            display: 'flex', justifyContent: 'flex-end', gap: 2, p: 3, 
            bgcolor: 'grey.50', border: '1px solid', borderColor: 'divider', borderTop: 'none',
            borderBottomLeftRadius: 8, borderBottomRightRadius: 8
          }}>
            <Button variant="outlined" sx={{ textTransform: 'none', color: 'text.secondary', borderColor: 'divider', px: 3, fontWeight: 600 }}>
              ยกเลิก
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSave}
              disabled={updateMutation.isPending}
              startIcon={updateMutation.isPending ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
              sx={{ textTransform: 'none', px: 4, fontWeight: 600, boxShadow: 'none', minWidth: 160 }}
            >
              {updateMutation.isPending ? 'กำลังบันทึก...' : 'บันทึกการตั้งค่า'}
            </Button>
          </Box>
        </Box>
      </Box>

      <RolePermissionModal 
        open={isRoleDialogOpen}
        onClose={() => setIsRoleDialogOpen(false)}
        onSave={handleCreateOrUpdateRole}
        mode={dialogMode}
        initialRoleName={editingRoleName}
        rolesList={rolesList}
      />

      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      />
    </DashboardLayout>
  );
}
