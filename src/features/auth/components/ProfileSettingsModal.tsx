'use client';

import React, { useRef, useMemo } from 'react';
import {
  Button,
  TextField,
  Box,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  FormHelperText,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormRow } from '@components/ui';
import { SectionHeader } from '@components/ui';
import { ModalShell } from '@components/ui';

const profileSchema = z.object({
  prefix: z.string().min(1, 'กรุณาเลือกคำนำหน้า'),
  firstName: z.string().min(1, 'กรุณาระบุชื่อ'),
  lastName: z.string().min(1, 'กรุณาระบุนามสกุล'),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  unit: z.string().optional(),
  role: z.string().optional(),
  avatarUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileData {
  prefix: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  unit: string;
  role: string;
  avatarUrl: string;
}

interface ProfileSettingsModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProfileData) => void;
  initialData?: ProfileData;
}

export default function ProfileSettingsModal({
  open,
  onClose,
  onSave,
  initialData,
}: ProfileSettingsModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultValues = useMemo(() => initialData || {
    prefix: 'นาย', firstName: 'กิตติทัช', lastName: 'พูลประเสริฐ',
    email: 'kittituch@example.com', phone: '0812345678',
    unit: 'พัสดุ', role: 'ผู้ดูแลระบบ',
    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
  }, [initialData]);

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const avatarUrl = watch('avatarUrl');

  const handlePhotoClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setValue('avatarUrl', reader.result as string, { shouldValidate: true });
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProfileFormValues) => {
    onSave(data as ProfileData);
    onClose();
  };

  const prefixes = ['นาย', 'นาง', 'นางสาว', 'ดร.', 'นพ.', 'พญ.'];

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="ตั้งค่าโปรไฟล์"
      contentSx={{ p: 4, mt: 2 }}
      actions={
        <>
          <Button onClick={onClose} variant="text" sx={{ textTransform: 'none', color: '#6B7280', fontWeight: 500 }}>
            ยกเลิก
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              textTransform: 'none', fontWeight: 600, boxShadow: 'none', bgcolor: '#3F6AD8', px: 3,
              '&:hover': { bgcolor: '#3155b1', boxShadow: 'none' },
            }}
          >
            บันทึกการตั้งค่า
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 1 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar src={avatarUrl} sx={{ width: 100, height: 100, border: '4px solid #F3F4F6' }} />
            <IconButton
              onClick={handlePhotoClick}
              sx={{
                position: 'absolute', bottom: -4, right: -4, bgcolor: '#3F6AD8', color: 'white',
                '&:hover': { bgcolor: '#3155b1' }, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', p: 0.75,
              }}
              size="small"
              aria-label="เปลี่ยนรูปโปรไฟล์"
            >
              <PhotoCameraIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
          </Box>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionHeader title="ข้อมูลส่วนตัวพื้นฐาน" />

          <FormRow label="คำนำหน้า" required labelWidth="180px">
            <Controller name="prefix" control={control} render={({ field }) => (
              <FormControl fullWidth size="small" error={!!errors.prefix}>
                <Select {...field}>
                  {prefixes.map((p) => (<MenuItem key={p} value={p}>{p}</MenuItem>))}
                </Select>
                <FormHelperText>{errors.prefix?.message}</FormHelperText>
              </FormControl>
            )} />
          </FormRow>

          <FormRow label="ชื่อ" required labelWidth="180px">
            <Controller name="firstName" control={control} render={({ field }) => (
              <TextField {...field} fullWidth size="small" error={!!errors.firstName} helperText={errors.firstName?.message} />
            )} />
          </FormRow>

          <FormRow label="นามสกุล" required labelWidth="180px">
            <Controller name="lastName" control={control} render={({ field }) => (
              <TextField {...field} fullWidth size="small" error={!!errors.lastName} helperText={errors.lastName?.message} />
            )} />
          </FormRow>

          <SectionHeader title="ข้อมูลการติดต่อและงาน" />

          <FormRow label="เบอร์โทรศัพท์" labelWidth="180px">
            <Controller name="phone" control={control} render={({ field }) => (
              <TextField {...field} fullWidth size="small" placeholder="08xxxxxxxx" error={!!errors.phone} helperText={errors.phone?.message} />
            )} />
          </FormRow>

          <FormRow label="อีเมล" labelWidth="180px">
            <Controller name="email" control={control} render={({ field }) => (
              <TextField {...field} fullWidth disabled size="small" placeholder="example@mail.com" />
            )} />
          </FormRow>

          <FormRow label="หน่วยงาน / แผนก" hint="ติดต่อผู้ดูแลระบบหากข้อมูลหน่วยงานไม่ถูกต้อง" labelWidth="180px">
            <Controller name="unit" control={control} render={({ field }) => (
              <TextField {...field} fullWidth size="small" disabled />
            )} />
          </FormRow>

          <FormRow label="สิทธิการใช้งาน" labelWidth="180px">
            <Controller name="role" control={control} render={({ field }) => (
              <TextField {...field} fullWidth size="small" disabled />
            )} />
          </FormRow>
        </form>
      </Box>
    </ModalShell>
  );
}
