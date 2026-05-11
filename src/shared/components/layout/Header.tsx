'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';
import DescriptionIcon from '@mui/icons-material/Description';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { ProfileSettingsModal } from '@/features/auth/components';
import { ChangePasswordModal } from '@/features/auth/components';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElNotif, setAnchorElNotif] = React.useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [passwordOpen, setPasswordOpen] = React.useState(false);
  
  const open = Boolean(anchorEl);
  const openNotif = Boolean(anchorElNotif);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotif(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotifClose = () => {
    setAnchorElNotif(null);
  };

  const handleLogout = () => {
    handleClose();
    // Simulate logout logic
    router.push('/login');
  };

  const handleSaveProfile = (data: any) => {
    console.log('Saving profile:', data);
    // Logic to save profile data would go here
  };

  const handleSavePassword = (data: any) => {
    console.log('Saving password:', data);
    // Logic to save password would go here
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#FFFFFF',
        color: '#1F2937',
        boxShadow: 'none',
        borderBottom: '1px solid #E5E7EB',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton aria-label="Toggle sidebar" onClick={onToggleSidebar} size="small" sx={{ color: '#6B7280' }}>
            <MenuIcon />
          </IconButton>
          
          <Typography variant="body2" sx={{ color: '#9CA3AF', fontWeight: 500 }}>
            แดชบอร์ด
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Action Buttons from Screenshot */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', '&:hover': { opacity: 0.7 } }}>
            <DescriptionIcon sx={{ fontSize: 18, color: '#6B7280' }} />
            <Typography variant="caption" sx={{ fontWeight: 500, color: '#4B5563' }}>คู่มือการใช้งาน</Typography>
          </Box>
          <Box sx={{ borderLeft: '1px solid #E5E7EB', height: 24, mx: 1 }} />
          <IconButton aria-label="Notifications" size="small" onClick={handleNotifClick}>
            <Badge badgeContent={7} color="primary" sx={{ '& .MuiBadge-badge': { backgroundColor: '#3F6AD8', minWidth: 16, height: 16, fontSize: '0.65rem' } }}>
              <NotificationsNoneIcon sx={{ color: '#6B7280', fontSize: 22 }} />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={anchorElNotif}
            id="notif-menu"
            open={openNotif}
            onClose={handleNotifClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                minWidth: 300,
              },
            }}
          >
            <Box sx={{ p: 1.5, textAlign: 'center', borderBottom: '1px solid #F3F4F6' }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                7 การแจ้งเตือนใหม่
              </Typography>
            </Box>
            <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
              {[
                { title: 'Update complete', desc: 'Restart server to complete update.' },
                { title: 'New connection', desc: 'Anna accepted your request.' },
                { title: 'Lorem ipsum', desc: 'Aliquam ex eros, imperdiet vulputate hendrerit et' },
                { title: 'New login', desc: 'Login from 192.186.1.1.' },
              ].map((notif, index) => (
                <MenuItem 
                  key={index} 
                  onClick={handleNotifClose}
                  sx={{ 
                    py: 1.5, 
                    px: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start',
                    borderBottom: '1px solid #F3F4F6',
                    '&:hover': { bgcolor: 'rgba(63, 106, 216, 0.05)' }
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151', mb: 0.5 }}>
                    {notif.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6B7280', lineHeight: 1.4 }}>
                    {notif.desc}
                  </Typography>
                </MenuItem>
              ))}
            </Box>
            <Box sx={{pt : 1,textAlign: 'center' }}>
              <Button 
                fullWidth 
                size="small" 
                sx={{ textTransform: 'none', fontWeight: 600, color: '#3F6AD8' }}
                onClick={handleNotifClose}
              >
                ดูการแจ้งเตือนทั้งหมด
              </Button>
            </Box>
          </Menu>

          <Avatar
            alt="User"
            onClick={handleProfileClick}
            sx={{ width: 34, height: 34, cursor: 'pointer', ml: 1, border: '2px solid #F3F4F6', position: 'relative', overflow: 'hidden' }}
          >
            <Image
              src="https://mui.com/static/images/avatar/2.jpg"
              alt="User"
              fill
              sizes="34px"
              style={{ objectFit: 'cover' }}
              priority
            />
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 4px 20px rgba(0,0,0,0.08))',
                mt: 1.5,
                borderRadius: 1.5,
                minWidth: 220,
                border: '1px solid #F3F4F6',
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
          >
            <Box>
              <MenuItem 
                onClick={() => {
                  handleClose();
                  setProfileOpen(true);
                }} 
                sx={{ py: 1.25, borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(63, 106, 216, 0.05)' } }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: '#4B5563' }}>
                  <PersonOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="ตั้งค่าโปรไฟล์" primaryTypographyProps={{ variant: 'body2', fontWeight: 500, color: '#374151' }} />
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  handleClose();
                  setPasswordOpen(true);
                }} 
                sx={{ py: 1.25, borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(63, 106, 216, 0.05)' } }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: '#4B5563' }}>
                  <VpnKeyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="เปลี่ยนรหัสผ่าน" primaryTypographyProps={{ variant: 'body2', fontWeight: 500, color: '#374151' }} />
              </MenuItem>
              <Box sx={{ my: 0.5 }}>
                <Divider sx={{ borderColor: '#F3F4F6', mx: 1 }} />
              </Box>
              <MenuItem onClick={handleLogout} sx={{ py: 1.25, borderRadius: 1.5, color: '#EF4444', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.05)' } }}>
                <ListItemIcon sx={{ minWidth: 36, color: '#EF4444' }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="ออกจากระบบ" primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} />
              </MenuItem>
            </Box>
          </Menu>

          <ProfileSettingsModal 
            open={profileOpen} 
            onClose={() => setProfileOpen(false)} 
            onSave={handleSaveProfile} 
          />
          <ChangePasswordModal 
            open={passwordOpen} 
            onClose={() => setPasswordOpen(false)} 
            onSave={handleSavePassword} 
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
