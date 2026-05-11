import React from 'react';
import { Box, Typography } from '@mui/material';

interface AuthLogoProps {
  size?: number;
  fontSize?: number;
}

const AuthLogo: React.FC<AuthLogoProps> = ({ size = 64 }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
      <Box 
        sx={{ 
          width: size, 
          height: size, 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 1
        }}
      >
        <svg width={size} height={size} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="8" width="12" height="38" rx="6" fill="#3F6AD8" />
          <rect x="30" y="8" width="12" height="38" rx="6" fill="#3F6AD8" />
          <path d="M12 20C12 15.5817 15.5817 12 20 12H34C38.4183 12 42 15.5817 42 20V34C42 38.4183 38.4183 42 34 42H20C15.5817 42 12 38.4183 12 34V20Z" fill="#3F6AD8" fillOpacity="0.1" />
        </svg>
      </Box>
    </Box>
  );
};

export default AuthLogo;
