'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Badge,
  ListSubheader,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import BusinessIcon from '@mui/icons-material/Business';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HistoryIcon from '@mui/icons-material/History';
import ReplyIcon from '@mui/icons-material/Reply';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import TuneIcon from '@mui/icons-material/Tune';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';

import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
// System icons
import PersonIcon from '@mui/icons-material/Person';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CategoryIcon from '@mui/icons-material/Category';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import DescriptionIcon from '@mui/icons-material/Description';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 260;
const collapsedWidth = 65;

interface SidebarProps {
  isCollapsed: boolean;
  isHovered: boolean;
  onHover: (hovered: boolean) => void;
  isExpanded: boolean;
}

export default function Sidebar({ isCollapsed, isHovered, onHover, isExpanded }: SidebarProps) {
  const pathname = usePathname();
  const [openQuotas, setOpenQuotas] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  const sidebarBgColor = '#323a46'; 
  const sidebarTextColor = '#acbbceff'; // Slightly softer gray for inactive icons
  const sidebarActiveBgColor = '#3F6AD8'; // Bright vibrant blue from screenshot
  const sidebarActiveTextColor = '#FFFFFF';

  const NavItem = ({ href, icon, label, badgeCount = 0 }: any) => {
    const isActive = pathname === href;

    return (
      <ListItem disablePadding sx={{ mb: 0.5 }}>
        <Link href={href} passHref style={{ width: '100%', textDecoration: 'none' }}>
          <ListItemButton
            sx={{
              borderRadius: isExpanded ? 1.5 : 1.5, // Keep consistent 12px
              mx: isExpanded ? 1 : 0, // Keep margin
              justifyContent: isExpanded ? 'initial' : 'center',
              minHeight: 48,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              ...(isActive && {
                backgroundColor: sidebarActiveBgColor,
                color: sidebarActiveTextColor,
                boxShadow: isExpanded ? 'none' : '0px 4px 12px rgba(59, 130, 246, 0.4)', // Shadow from screenshot
                '&:hover': {
                  backgroundColor: sidebarActiveBgColor,
                },
              }),
              '&:hover': {
                backgroundColor: isActive ? sidebarActiveBgColor : 'rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ 
              color: isActive ? sidebarActiveTextColor : sidebarTextColor, 
              minWidth: isExpanded  ? 0 : undefined ,
              mr: isExpanded ? 2 : 0,
              justifyContent: 'center'
            }}>
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={label}
              sx={{ 
                opacity: isExpanded ? 1 : 0,
                transition: 'opacity 0.2s',
                '& .MuiListItemText-primary': { 
                  fontSize: '0.835rem', 
                  fontWeight: isActive ? 600 : 500, 
                  color: isActive ? sidebarActiveTextColor : sidebarTextColor,
                  whiteSpace: 'nowrap'
                } 
              }}
            />
            {isExpanded && badgeCount > 0 && (
              <Badge badgeContent={badgeCount} color="error" sx={{ mr: 1, '& .MuiBadge-badge': { backgroundColor: '#e53935' } }} />
            )}
          </ListItemButton>
        </Link>
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      sx={{
        width: isExpanded ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        transition: (theme) => theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        '& .MuiDrawer-paper': {
          width: isExpanded ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          backgroundColor: sidebarBgColor,
          color: sidebarTextColor,
          borderRight: 'none',
          borderRadius: 0,
          border: 'none',
          overflowX: 'hidden',
          transition: (theme) => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box sx={{ 
        p: isExpanded ? 3 : 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: isExpanded ? 'flex-start' : 'center',
        gap: 1.5, 
        borderBottom: '1px solid rgba(255,255,255,0.05)', 
        mb: 2,
        minHeight: 80,
        transition: 'all 0.2s'
      }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: '#4caf50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0
          }}
        >
          <BusinessIcon fontSize="small" />
        </Box>
        {isExpanded && (
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', opacity: isExpanded ? 1 : 0, transition: 'opacity 0.2s' }}>
            Medical Inventory
          </Typography>
        )}
      </Box>

      {/* User Info from screenshot */}
      <Box sx={{ px: isExpanded ? 3: 1.5, my: 1.5, display: 'flex', alignItems: 'center', gap: 2, overflow: 'hidden' , minHeight: 60}}>
        <Box sx={{ 
          width: 40, 
          height: 40, 
          borderRadius: '50%', 
          bgcolor: '#ffb74d', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: '#fff', 
          fontWeight: 'bold',
          flexShrink: 0
        }}>
          ร
        </Box>
        {isExpanded && (
          <Box sx={{ opacity: isExpanded ? 1 : 0, transition: 'opacity 0.2s' }}>
            <Typography variant="subtitle2" sx={{ color: '#fff', whiteSpace: 'nowrap' }}>กิตติธัช พูลประเสริฐ</Typography>
            <Typography variant="caption" sx={{ color: '#FFE0B2', display: 'block', whiteSpace: 'nowrap' }}>หน่วยงาน: พัสดุ</Typography>
            <Typography variant="caption" sx={{ color: '#FFE0B2', fontStyle: 'italic', whiteSpace: 'nowrap' }}>(ผู้ดูแลระบบ)</Typography>
          </Box>
        )}
      </Box>

      <List sx={{ px: 1 }}>
        <NavItem href="/" icon={<HomeIcon fontSize="small" />} label="แดชบอร์ด" />
        <NavItem href="/inventory/main" icon={<ApartmentIcon fontSize="small" />} label="คลังเวชภัณฑ์พัสดุ (คลังใหญ่)" />
        <NavItem href="/inventory/ward" icon={<LocalHospitalIcon fontSize="small" />} label="คลังวอร์ด" />
        
        <NavItem href="/requisition/pending" icon={<ListAltIcon fontSize="small" />} label="รายการขอเบิกเวชภัณฑ์" badgeCount={5} />
        <NavItem href="/history/requisition" icon={<HistoryIcon fontSize="small" />} label="ประวัติการเบิกเวชภัณฑ์" />
        
        <NavItem href="/use-item" icon={<SyncAltIcon fontSize="small" />} label="นำไปใช้" />
        <NavItem href="/history/usage" icon={<HistoryIcon fontSize="small" />} label="ประวัติการนำไปใช้" />
        
        <NavItem href="/inventory/return-item" icon={<AssignmentReturnIcon fontSize="small" />} label="คืนเวชภัณฑ์พัสดุ" />

        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton 
            onClick={() => setOpenQuotas(!openQuotas)} 
            sx={{ 
              borderRadius: 1.5, 
              mx:  isExpanded ? 1 : 0,              
              justifyContent: isExpanded ? 'initial' : 'center',
              minHeight: 48,

              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ 
              color: sidebarTextColor, 
              minWidth: 0,
              mr: isExpanded ? 2 : 0,
              justifyContent: 'center'
            }}>
              <TuneIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary="กำหนดเวชภัณฑ์คงคลัง" 
              sx={{ 
                opacity: isExpanded ? 1 : 0,
                transition: 'opacity 0.2s',
                '& .MuiListItemText-primary': { 
                  fontSize: '0.875rem', 
                  fontWeight: 500, 
                  color: sidebarTextColor,
                  whiteSpace: 'nowrap'
                } 
              }} 
            />
            {isExpanded && (openQuotas ? <ExpandLess fontSize="small" sx={{ color: sidebarTextColor }} /> : <ExpandMore fontSize="small" sx={{ color: sidebarTextColor }} />)}
          </ListItemButton>
        </ListItem>
        <Collapse in={openQuotas} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <NavItem href="/quotas/general" icon={<span/>} label="คลังใหญ่" />
            <NavItem href="/quotas/ward" icon={<span/>} label="คลังวอร์ด" />
          </List>
        </Collapse>

        {isExpanded && (
          <ListSubheader disableSticky sx={{ bgcolor: 'transparent', color: '#9CA3AF', fontWeight: 600, lineHeight: 'normal', px: 2, mt: 3, mb: 1, display: 'block', opacity: isExpanded ? 1 : 0 }}>
            ระบบ
          </ListSubheader>
        )}

        <NavItem href="/admin/staff" icon={<PersonIcon fontSize="small" />} label="จัดการเจ้าหน้าที่" />
        <NavItem href="/admin/staff/pending" icon={<HowToRegIcon fontSize="small" />} label="รายการรออนุมัติเจ้าหน้าที่" badgeCount={1} />
        <NavItem href="/admin/units" icon={<ApartmentIcon fontSize="small" />} label="จัดการหน่วยงาน" />
        <NavItem href="/admin/packaging" icon={<Inventory2Icon fontSize="small" />} label="จัดการหน่วยบรรจุเวชภัณฑ์" />
        <NavItem href="/admin/categories" icon={<ScienceRoundedIcon fontSize="small" />} label="จัดการหมวดหมู่เวชภัณฑ์พัสดุ" />
        {/* <NavItem href="/admin/devices" icon={<SettingsRemoteIcon fontSize="small" />} label="จัดการอุปกรณ์" /> */}
        <NavItem href="/logs" icon={<InsertCommentIcon fontSize="small" />} label="Log" />

        <NavItem href="/reports" icon={<DescriptionIcon fontSize="small" />} label="รายงานและสถิติ" />

        <NavItem href="/admin/permissions" icon={<GroupIcon fontSize="small" />} label="การจัดการสิทธิ์แบบกลุ่ม" />
        <NavItem href="/login" icon={<LogoutIcon fontSize="small" />} label="ออกจากระบบ" />

      </List>
    </Drawer>
  );
}

