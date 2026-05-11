import React from 'react';
import { AuthLayout } from '@/features/auth/components';
import { LoginForm } from '@/features/auth/components';

export default function LoginPage() {
  return (
    <AuthLayout
      title="ยินดีต้อนรับเข้าสู่ระบบ"
      subtitle="พิสูจน์ตัวตนการเข้าใช้งานระบบ"
      footerText="ยังไม่มีบัญชีผู้ใช้งาน?"
      footerLinkText="ลงทะเบียนใหม่"
      footerLinkHref="/register"
      maxWidth="sm"
    >
      <LoginForm />
    </AuthLayout>
  );
}
