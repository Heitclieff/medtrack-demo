import React from 'react';
import { Box, Container, Card, CardContent, Typography, Link } from '@mui/material';
import AuthLogo from './AuthLogo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  maxWidth = 'sm'
}) => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: '#F5F7FA',
        pt: 4,
        pb: 4
      }}
    >
      <Container maxWidth={maxWidth}>
        <AuthLogo />

        <Card 
          elevation={0} 
          sx={{ 
            mx: 'auto', 
            borderRadius: 1.5,
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 1 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>

            {children}
          </CardContent>
        </Card>

        {(footerText || footerLinkText) && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {footerText}{' '}
              {footerLinkText && footerLinkHref && (
                <Link href={footerLinkHref} underline="hover" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  {footerLinkText}
                </Link>
              )}
            </Typography>
          </Box>
        )}
        
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            © {new Date().getFullYear()} ระบบบริหารจัดการคลังบริเวชภัณฑ์ โรงพยาบาลราชพิพัฒน์
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
