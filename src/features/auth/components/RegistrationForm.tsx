'use client';

import React, { useState, useCallback, useMemo } from 'react';
import {
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  IconButton,
  Grid,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormRow } from '@components/ui';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormHelperText } from '@mui/material';

const registrationSchema = z.object({
  gender: z.enum(['ชาย', 'หญิง']),
  prefix: z.string().min(1, 'กรุณาเลือกคำนำหน้า'),
  firstName: z.string().min(1, 'กรุณาระบุชื่อ'),
  lastName: z.string().min(1, 'กรุณาระบุนามสกุล'),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  phone: z.string().optional(),
  unit: z.string().min(1, 'กรุณาเลือกหน่วยงาน'),
  role: z.string().min(1, 'กรุณาเลือกสิทธิการใช้งาน'),
  username: z.string().min(4, 'ชื่อผู้ใช้งานต้องมีอย่างน้อย 4 ตัวอักษร'),
  password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const prefixes = useMemo(() => ['นาย', 'นาง', 'นางสาว', 'ดร.', 'นพ.', 'พญ.'], []);
  const units = useMemo(() => ['พัสดุ', 'ER', 'ICU', 'OPD', 'LAB'], []);
  const roles = useMemo(() => ['ผู้ดูแลระบบ', 'แพทย์', 'พยาบาล', 'เจ้าหน้าที่พัสดุ'], []);

  const LABEL_WIDTH = '140px';

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      gender: 'ชาย',
      prefix: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      unit: '',
      role: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = useCallback((data: RegistrationFormValues) => {
    console.log('Registration Data:', data);
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={1}>
        {/* Gender and Prefix */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormRow label="เพศ" required layout="vertical">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  row
                  sx={{ gap: 4, height: 40, alignItems: 'center' }}
                >
                  <FormControlLabel 
                    value="ชาย" 
                    control={<Radio size="small" />} 
                    label={<Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>ชาย</Typography>} 
                  />
                  <FormControlLabel 
                    value="หญิง" 
                    control={<Radio size="small" />} 
                    label={<Typography variant="body2" sx={{ color: '#374151', fontWeight: 500 }}>หญิง</Typography>} 
                  />
                </RadioGroup>
              )}
            />
          </FormRow>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormRow label="คำนำหน้า" required layout="vertical">
            <FormControl fullWidth size="small" error={!!errors.prefix}>
              <Controller
                name="prefix"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>เลือกคำนำหน้า...</MenuItem>
                    {prefixes.map((p) => (
                      <MenuItem key={p} value={p}>{p}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.prefix?.message}</FormHelperText>
            </FormControl>
          </FormRow>
        </Grid>

        {/* First Name and Last Name */}
        <Grid size={{ xs: 12, md: 6 }}>
          <FormRow label="ชื่อ" required layout="vertical">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="ระบุชื่อ"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </FormRow>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormRow label="นามสกุล" required layout="vertical">
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="ระบุนามสกุล"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </FormRow>
        </Grid>

        {/* Email */}
        <Grid size={{ xs: 12 }}>
          <FormRow label="อีเมล" layout="vertical">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="example@mail.com"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </FormRow>
        </Grid>

        {/* Phone */}
        <Grid size={{ xs: 12 }}>
          <FormRow label="โทรศัพท์มือถือ" layout="vertical">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="08xxxxxxxx"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
        
                />
              )}
            />
          </FormRow>
        </Grid>

        {/* Unit */}
        <Grid size={{ xs: 12 }}>
          <FormRow label="หน่วยงาน" required layout="vertical">
            <FormControl fullWidth size="small" error={!!errors.unit}>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>เลือกหน่วยงาน...</MenuItem>
                    {units.map((u) => (
                      <MenuItem key={u} value={u}>{u}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.unit?.message}</FormHelperText>
            </FormControl>
          </FormRow>
        </Grid>

        {/* Role */}
        <Grid size={{ xs: 12 }}>
          <FormRow label="สิทธิการใช้งาน" required layout="vertical">
            <FormControl fullWidth size="small" error={!!errors.role}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    sx={{ borderRadius: 1.5, bgcolor: 'white' }}
                  >
                    <MenuItem value="" disabled>เลือกสิทธิการใช้งาน...</MenuItem>
                    {roles.map((r) => (
                      <MenuItem key={r} value={r}>{r}</MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FormHelperText>{errors.role?.message}</FormHelperText>
            </FormControl>
          </FormRow>
        </Grid>

        {/* Username */}
        <Grid size={{ xs: 12 }}>
          <FormRow label="ชื่อผู้ใช้งาน" required layout="vertical">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="ระบุชื่อผู้ใช้งาน"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />
          </FormRow>
        </Grid>

        {/* Password */}
        <Grid size={{ xs: 12 }}>
          <FormRow label="รหัสผ่าน" required layout="vertical">
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  size="small"
                  placeholder="ระบุรหัสผ่าน"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end" size="small">
                          {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </FormRow>
        </Grid>

        {/* Submit Button */}
        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            ลงทะเบียน
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(RegistrationForm);
