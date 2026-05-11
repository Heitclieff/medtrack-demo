'use client';

import React from 'react';
import { AuthLayout } from '@/features/auth/components';
import { RegistrationForm } from '@/features/auth/components';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="ลงทะเบียน"
      subtitle="เจ้าหน้าที่โรงพยาบาลราชพิพัฒน์"
      footerText="มีบัญชีผู้ใช้งานอยู่แล้ว?"
      footerLinkText="เข้าสู่ระบบ"
      footerLinkHref="/login"
    >
      <RegistrationForm />
    </AuthLayout>
  );
}
