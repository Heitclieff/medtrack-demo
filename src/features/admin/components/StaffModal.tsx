'use client';

import React, { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { AddCircle } from '@mui/icons-material';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormRow } from '@components/ui';
import { SectionHeader } from '@components/ui';
import { ModalShell } from '@components/ui';

const staffSchema = z.object({
  gender: z.enum(['ชาย', 'หญิง']),
  prefix: z.string().min(1, 'กรุณาเลือกคำนำหน้า'),
  firstName: z.string().min(1, 'กรุณาระบุชื่อ'),
  lastName: z.string().min(1, 'กรุณาระบุนามสกุล'),
  email: z.string().email('อีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  phone: z.string().optional(),
  unit: z.string().min(1, 'กรุณาเลือกหน่วยงาน'),
  role: z.string().min(1, 'กรุณาเลือกสิทธิการใช้งาน'),
  username: z.string().min(1, 'กรุณาระบุชื่อผู้ใช้งาน'),
  password: z.string().optional(),
  status: z.enum(['active', 'inactive']),
}).refine(() => true, { message: "ข้อมูลไม่ถูกต้อง", path: ["password"] });

type StaffFormValues = z.infer<typeof staffSchema>;

interface StaffModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Partial<StaffFormValues>) => void;
  initialData?: any | null;
}

const defaultValues: StaffFormValues = {
  gender: 'ชาย', prefix: '', firstName: '', lastName: '',
  email: '', phone: '', unit: '', role: '',
  username: '', password: '', status: 'active',
};

const prefixes = ['นาย', 'นาง', 'นางสาว', 'ดร.', 'นพ.', 'พญ.'];
const units = ['พัสดุ', 'ER', 'ICU', 'OPD', 'LAB'];
const roles = ['ผู้ดูแลระบบ', 'แพทย์', 'พยาบาล', 'เจ้าหน้าที่พัสดุ'];

export default function StaffModal({ open, onClose, onSave, initialData }: StaffModalProps) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<StaffFormValues>({
    resolver: zodResolver(staffSchema),
    defaultValues,
  });

  const [changePassword, setChangePassword] = useState(false);

  React.useEffect(() => {
    if (open) {
      if (initialData) {
        reset(initialData);
        setChangePassword(false);
      } else {
        reset(defaultValues);
        setChangePassword(true);
      }
    }
  }, [initialData, open, reset]);

  const onSubmit = (data: StaffFormValues) => {
    onSave(data);
    onClose();
  };

  const isEdit = Boolean(initialData);
  const LABEL_WIDTH = '200px';

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={isEdit ? 'แก้ไขข้อมูลเจ้าหน้าที่' : 'เพิ่มเจ้าหน้าที่ใหม่'}
      actions={
        <>
          <Button onClick={onClose} variant="text" sx={{ textTransform: 'none', color: 'text.secondary', mr: 1 }}>
            ยกเลิก
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            startIcon={isEdit ? <SaveIcon /> : <AddCircle />}
            sx={{
              textTransform: 'none', fontWeight: 600, boxShadow: 'none', bgcolor: '#3F6AD8',
              '&:hover': { bgcolor: '#3155b1', boxShadow: 'none' },
            }}
          >
            {isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มเจ้าหน้าที่'}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <SectionHeader title="ข้อมูลเจ้าหน้าที่พื้นฐาน" />

        <FormRow label="เพศ" required labelWidth={LABEL_WIDTH}>
          <Controller name="gender" control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'gender'> }) => (
              <RadioGroup {...field} row>
                <FormControlLabel value="ชาย" control={<Radio size="small" />} label={<Typography variant="body2">ชาย</Typography>} />
                <FormControlLabel value="หญิง" control={<Radio size="small" />} label={<Typography variant="body2">หญิง</Typography>} />
              </RadioGroup>
            )}
          />
        </FormRow>

        <FormRow label="คำนำหน้า" required labelWidth={LABEL_WIDTH}>
          <FormControl fullWidth size="small" error={!!errors.prefix}>
            <Controller name="prefix" control={control}
              render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'prefix'> }) => (
                <Select {...field} displayEmpty>
                  <MenuItem value="" disabled>เลือกคำนำหน้า...</MenuItem>
                  {prefixes.map((p) => (<MenuItem key={p} value={p}>{p}</MenuItem>))}
                </Select>
              )}
            />
            <FormHelperText>{errors.prefix?.message}</FormHelperText>
          </FormControl>
        </FormRow>

        <FormRow label="ชื่อ" required labelWidth={LABEL_WIDTH}>
          <Controller name="firstName" control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'firstName'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="ระบุชื่อ" error={!!errors.firstName} helperText={errors.firstName?.message} />
            )}
          />
        </FormRow>

        <FormRow label="นามสกุล" required labelWidth={LABEL_WIDTH}>
          <Controller name="lastName" control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'lastName'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="ระบุนามสกุล" error={!!errors.lastName} helperText={errors.lastName?.message} />
            )}
          />
        </FormRow>

        <FormRow label="อีเมล" labelWidth={LABEL_WIDTH}>
          <Controller name="email" control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'email'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="example@mail.com" error={!!errors.email} helperText={errors.email?.message} />
            )}
          />
        </FormRow>

        <FormRow label="โทรศัพท์มือถือ" labelWidth={LABEL_WIDTH}>
          <Controller name="phone" control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'phone'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="08xxxxxxxx" />
            )}
          />
        </FormRow>

        <SectionHeader title="หน่วยงานและสิทธิ์" />

        <FormRow label="หน่วยงาน" required labelWidth={LABEL_WIDTH}>
          <FormControl fullWidth size="small" error={!!errors.unit}>
            <Controller name="unit" control={control}
              render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'unit'> }) => (
                <Select {...field} displayEmpty>
                  <MenuItem value="" disabled>เลือกหน่วยงาน...</MenuItem>
                  {units.map((u) => (<MenuItem key={u} value={u}>{u}</MenuItem>))}
                </Select>
              )}
            />
            <FormHelperText>{errors.unit?.message}</FormHelperText>
          </FormControl>
        </FormRow>

        <FormRow label="สิทธิการใช้งาน" required labelWidth={LABEL_WIDTH}>
          <FormControl fullWidth size="small" error={!!errors.role}>
            <Controller name="role" control={control}
              render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'role'> }) => (
                <Select {...field} displayEmpty>
                  <MenuItem value="" disabled>เลือกสิทธิการใช้งาน...</MenuItem>
                  {roles.map((r) => (<MenuItem key={r} value={r}>{r}</MenuItem>))}
                </Select>
              )}
            />
            <FormHelperText>{errors.role?.message}</FormHelperText>
          </FormControl>
        </FormRow>

        <SectionHeader title="ข้อมูลการเข้าใช้งานระบบ" />

        <FormRow label="ชื่อผู้ใช้งาน" required labelWidth={LABEL_WIDTH}>
          <Controller name="username" control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'username'> }) => (
              <TextField {...field} fullWidth size="small" placeholder="ระบุชื่อผู้ใช้งาน" error={!!errors.username} helperText={errors.username?.message} />
            )}
          />
        </FormRow>

        <FormRow label="รหัสผ่าน" required labelWidth={LABEL_WIDTH}>
          <Controller name="password" control={control}
            render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'password'> }) => (
              <TextField {...field} fullWidth type="password" size="small" placeholder="ระบุรหัสผ่าน" disabled={isEdit && !changePassword} />
            )}
          />
        </FormRow>

        <FormRow label="การตั้งค่าสถานะ" labelWidth={LABEL_WIDTH}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {isEdit && (
              <FormControlLabel
                control={<Checkbox size="small" checked={changePassword} onChange={(e) => setChangePassword(e.target.checked)} />}
                label={<Typography variant="body2">เปลี่ยนรหัสผ่าน</Typography>}
              />
            )}
            <Controller name="status" control={control}
              render={({ field }: { field: ControllerRenderProps<StaffFormValues, 'status'> }) => (
                <FormControlLabel
                  control={<Checkbox size="small" checked={field.value === 'inactive'} onChange={(e) => field.onChange(e.target.checked ? 'inactive' : 'active')} />}
                  label={<Typography variant="body2">ระงับการใช้งาน</Typography>}
                />
              )}
            />
          </Box>
        </FormRow>
      </Box>
    </ModalShell>
  );
}
