'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Typography,
  CircularProgress
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InfoIcon from '@mui/icons-material/Info';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/features/auth/hooks/useAuthQueries';

const loginSchema = z.object({
  email: z.string().min(1, 'กรุณาระบุอีเมล').email('รูปแบบอีเมลไม่ถูกต้อง'),
  password: z.string().min(1, 'กรุณาระบุรหัสผ่าน'),
  rememberMe: z.boolean().optional().default(true),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const loginMutation = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'demo@dev.io',
      password: 'unsafepassword',
      rememberMe: true,
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (data: LoginFormValues) => {
    setErrorMsg('');
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push('/'); // Redirect to dashboard
      },
      onError: (err: any) => {
        setErrorMsg(err.message || 'รหัสผ่านหรืออีเมลไม่ถูกต้อง');
      }
    });
  };

  return (
    <Box>
      <Alert
        icon={<InfoIcon fontSize="small" />}
        sx={{
          mb: 4,
          bgcolor: '#EFF6FF',
          color: '#1E40AF',
          '& .MuiAlert-icon': { color: '#3B82F6' },
          fontSize: '0.85rem',
          border: '1px solid #DBEAFE',
          borderRadius: 1.5
        }}
      >
        ทดลองใช้งานด้วยอีเมล <strong>demo@dev.io</strong> และรหัสผ่าน <strong>unsafepassword</strong>
      </Alert>

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="อีเมล"
                variant="outlined"
                placeholder="name@example.com"
                InputLabelProps={{ shrink: true }}
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={loginMutation.isPending}
                sx={{ '& .MuiInputBase-root': { fontSize: '0.875rem' } }}
              />
            )}
          />

          <Box>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="รหัสผ่าน"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={loginMutation.isPending}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end" size="small" disabled={loginMutation.isPending}>
                          {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Link
                href="#"
                underline="hover"
                sx={{ fontSize: '0.8125rem', color: 'primary.main', fontWeight: 500 }}
              >
                ลืมรหัสผ่าน?
              </Link>
            </Box>
          </Box>

          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    size="small"
                    disabled={loginMutation.isPending}
                    sx={{ color: 'divider', '&.Mui-checked': { color: 'primary.main' } }}
                  />
                }
                label={<Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>จดจำการใช้งาน</Typography>}
              />
            )}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loginMutation.isPending}
            sx={{
              bgcolor: 'primary.main',
              '&:hover': { bgcolor: 'primary.dark' },
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(63, 106, 216, 0.2)',
            }}
          >
            {loginMutation.isPending ? <CircularProgress size={24} color="inherit" /> : 'เข้าสู่ระบบ'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
