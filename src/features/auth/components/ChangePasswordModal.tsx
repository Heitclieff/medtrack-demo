'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  Divider,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormRow } from '@components/ui';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'กรุณาระบุรหัสผ่านปัจจุบัน'),
  newPassword: z.string().min(8, 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร'),
  confirmPassword: z.string().min(1, 'กรุณายืนยันรหัสผ่านใหม่'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (passwords: PasswordFormValues) => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
  onSave,
}: ChangePasswordModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [open, reset]);

  const onSubmit = (data: PasswordFormValues) => {
    onSave(data);
    onClose();
  };

  const LABEL_WIDTH = '180px';

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: { borderRadius: 1.5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 0, 
        bgcolor: '#3F6AD8',
        color: 'white',
      }}>
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            เปลี่ยนรหัสผ่าน
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 4, mt: 2 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
            รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรและตัวเลข
        </Alert>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormRow label="รหัสผ่านปัจจุบัน" required labelWidth={LABEL_WIDTH}>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }: { field: ControllerRenderProps<PasswordFormValues, 'currentPassword'> }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  size="small"
                  placeholder="••••••••"
                  error={!!errors.currentPassword}
                  helperText={errors.currentPassword?.message}
                />
              )}
            />
          </FormRow>

          <Divider sx={{ my: 1, mb : 3, borderColor: '#F3F4F6' }} />

          <FormRow label="รหัสผ่านใหม่" required labelWidth={LABEL_WIDTH}>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }: { field: ControllerRenderProps<PasswordFormValues, 'newPassword'> }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  size="small"
                  placeholder="••••••••"
                  error={!!errors.newPassword}
                  helperText={errors.newPassword?.message}
                />
              )}
            />
          </FormRow>

          <FormRow label="ยืนยันรหัสผ่านใหม่" required labelWidth={LABEL_WIDTH}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }: { field: ControllerRenderProps<PasswordFormValues, 'confirmPassword'> }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  size="small"
                  placeholder="••••••••"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              )}
            />
          </FormRow>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2.5, px: 4, borderTop: '1px solid #F3F4F6', justifyContent: 'flex-end', gap: 1 }}>
        <Button 
          onClick={onClose}
          variant="text"
          sx={{ textTransform: 'none', color: '#6B7280', fontWeight: 500 }}
        >
          ยกเลิก
        </Button>
        <Button 
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          startIcon={<VpnKeyIcon sx={{ fontSize: 18 }} />}
          sx={{ 
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            bgcolor: '#3F6AD8',
            px: 3,
            '&:hover': { 
              bgcolor: '#3155b1', 
              boxShadow: 'none' 
            }
          }}
        >
          ยืนยันการเปลี่ยนรหัสผ่าน
        </Button>
      </DialogActions>
    </Dialog>
  );
}
