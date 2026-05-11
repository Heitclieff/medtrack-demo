'use client';

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Grid,
  Card, 
  CardContent, 
  IconButton, 
  Switch, 
  Slider, 
  Stack,
  Divider,
  Chip,
  Tooltip,
  CircularProgress
} from '@mui/material';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import SensorsIcon from '@mui/icons-material/Sensors';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import DashboardLayout from '@components/layout/DashboardLayout';
import { PageHeader } from '@components/ui';
import { DataTable } from '@components/ui';
import { SearchField } from '@components/ui';

import { Device, AlarmLog, initialAlarmLogMockData } from '@/features/admin/data/deviceData';
import { alarmLogColumns } from '@/features/admin/components/alarmLogColumns';
import { useDeviceList, useUpdateDevice } from '@/features/admin/hooks/useAdminQueries';

export default function DevicesPageClient() {
  const { data: response, isLoading } = useDeviceList();
  const devices: Device[] = response?.data || [];
  const updateMutation = useUpdateDevice();

  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [logSearchTerm, setLogSearchTerm] = useState('');
  
  // Set default selected device
  useEffect(() => {
    if (devices.length > 0 && !selectedDeviceId) {
      setSelectedDeviceId(devices[0].id);
    }
  }, [devices, selectedDeviceId]);

  const selectedDevice = devices.find(d => d.id === selectedDeviceId) || devices[0];

  const handleStatusToggle = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Offline' ? 'Online' : 'Offline';
    updateMutation.mutate({ id, data: { status: newStatus } });
  };

  const handleSensitivityChange = (newValue: number) => {
    if (!selectedDevice) return;
    updateMutation.mutate({ id: selectedDevice.id, data: { sensitivity: newValue } });
  };

  const handleVolumeChange = (newValue: number) => {
    if (!selectedDevice) return;
    updateMutation.mutate({ id: selectedDevice.id, data: { volume: newValue } });
  };

  const filteredLogs = initialAlarmLogMockData.filter(log => {
    if (!logSearchTerm) return true;
    return log.deviceName.toLowerCase().includes(logSearchTerm.toLowerCase()) || 
           log.details.toLowerCase().includes(logSearchTerm.toLowerCase());
  });

  const getStatusChip = (status: Device['status']) => {
    switch (status) {
      case 'Online': return <Chip label="Online" size="small" color="success" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />;
      case 'Offline': return <Chip label="Offline" size="small" color="default" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />;
      case 'Alarm': return <Chip label="Alarm" size="small" color="error" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />;
    }
  };

  return (
    <DashboardLayout>
      <Box sx={{ maxWidth: '100%', mx: 'auto', p: 2 }}>
        <PageHeader 
          title="จัดการอุปกรณ์และฮาร์ดแวร์"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'จัดการอุปกรณ์' }
          ]}
        />

        <Grid container spacing={3} sx={{ position: 'relative' }}>
          {isLoading && (
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'rgba(255,255,255,0.7)', zIndex: 10 }}>
              <CircularProgress />
            </Box>
          )}
          
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>เลือกอุปกรณ์ที่ต้องการจัดการ</Typography>
                <Button variant="contained" sx={{ height: 40 }}>เพิ่มอุปกรณ์ใหม่</Button>
              </Box>
              <Grid container spacing={1.5}>
                {devices.map((device) => (
                  <Grid key={device.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                    <Card 
                      variant="outlined"
                      onClick={() => setSelectedDeviceId(device.id)}
                      sx={{ 
                        p: 1.5, 
                        cursor: 'pointer',
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: selectedDeviceId === device.id ? 'primary.main' : 'divider',
                        bgcolor: selectedDeviceId === device.id ? 'primary.light' : 'background.paper',
                        transition: 'all 0.2s',
                        '&:hover': { transform: 'translateY(-2px)' }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Box sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: 1, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          bgcolor: device.type === 'Gate' ? 'primary.main' : 'success.main',
                          color: 'white'
                        }}>
                          {device.type === 'Gate' ? <SensorsIcon sx={{ fontSize: 18 }} /> : <SettingsRemoteIcon sx={{ fontSize: 18 }} />}
                        </Box>
                        {getStatusChip(device.status)}
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }} noWrap>{device.name}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>{device.location}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

          {selectedDevice && (
            <Grid size={{ xs: 12, lg: 7 }}>
              <Card variant="outlined" sx={{ borderRadius: 1.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SettingsRemoteIcon color="primary" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>การตั้งค่า: {selectedDevice.name}</Typography>
                  </Box>
                  <Tooltip title="รีสตาร์ทอุปกรณ์">
                    <IconButton size="small"><RestartAltIcon /></IconButton>
                  </Tooltip>
                </Box>
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2, border: '1px solid', borderColor: 'divider', mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>เปิดใช้งานอุปกรณ์</Typography>
                            <Typography variant="caption" color="text.secondary">ควบคุมการตรวจจับสัญญาณ</Typography>
                          </Box>
                          <Switch 
                            checked={selectedDevice.status !== 'Offline'} 
                            onChange={() => handleStatusToggle(selectedDevice.id, selectedDevice.status)}
                            color="success"
                          />
                        </Box>
                      </Box>

                      <Box sx={{ mt: 2 }}>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', mb: 2, display: 'block' }}>ข้อมูลเครื่อง</Typography>
                        <Stack spacing={1.5}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption">Device ID:</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{selectedDevice.id}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption">Firmware Version:</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>v2.4.1-stable</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="caption">Last Active:</Typography>
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{selectedDevice.lastActive}</Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>ความไวการตรวจจับ (Sensitivity)</Typography>
                          <Typography variant="body2" color="primary" sx={{ fontWeight: 800 }}>{selectedDevice.sensitivity}%</Typography>
                        </Box>
                        <Slider 
                          value={selectedDevice.sensitivity} 
                          onChange={(_, v) => handleSensitivityChange(v as number)}
                          valueLabelDisplay="auto"
                          disabled={selectedDevice.status === 'Offline'}
                        />
                      </Box>
                      
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>ระดับเสียง (Alarm Volume)</Typography>
                          <Typography variant="body2" color="primary" sx={{ fontWeight: 800 }}>{selectedDevice.volume}%</Typography>
                        </Box>
                        <Slider 
                          value={selectedDevice.volume} 
                          onChange={(_, v) => handleVolumeChange(v as number)} 
                          color="secondary"
                          valueLabelDisplay="auto"
                          disabled={selectedDevice.status === 'Offline'}
                        />
                      </Box>

                      <Button 
                        variant="outlined" 
                        fullWidth 
                        startIcon={<SignalCellularAltIcon />}
                        sx={{ mt: 1, py: 1 }}
                        disabled={selectedDevice.status === 'Offline'}
                      >
                        ทดสอบการเชื่อมต่อ (Diagnostic)
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}

          <Grid size={{ xs: 12, lg: 5 }}>
            <Card variant="outlined" sx={{ borderRadius: 1.5, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 1.5, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'grey.50', flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <NotificationsActiveIcon color="error" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>ประวัติการแจ้งเตือนล่าสุด</Typography>
                </Box>
                <SearchField label="ค้นหา" 
                  placeholder="ค้นหา..."
                  value={logSearchTerm}
                  onChange={(e) => setLogSearchTerm(e.target.value)}
                  sx={{ width: 180, '& .MuiInputBase-root': { height: 32 } }}
                />
              </Box>
              
              <Box sx={{ overflow: 'auto' }}>
                <DataTable 
                  columns={alarmLogColumns}
                  data={filteredLogs}
                  showControls={false}
                  hideInternalSearch={true}
                  selectable={false}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
