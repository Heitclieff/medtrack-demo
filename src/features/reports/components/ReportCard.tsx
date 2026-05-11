import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';

interface ReportCardProps {
  id: string;
  title: string;
  description: string;
  color?: string;
  onClick: (id: string) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ id, title, description, color = '#3F6AD8', onClick }) => (
  <Card 
    onClick={() => onClick(id)}
    sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1.5,
      boxShadow: 'none',
      overflow: 'hidden',
      '&:hover': {
        boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.08)',
        borderColor: 'primary.light',
        '& .arrow-btn': {
          color: 'primary.main',
          transform: 'translateX(4px)'
        }
      }
    }}
  >
    <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', gap: 2 }}>
      <Box 
        sx={{ 
          color: 'primary.main', 
          display: 'flex', 
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <DescriptionIcon sx={{ fontSize: 22 }} />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5, fontSize: '0.925rem' }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5, display: 'block', mb: 1 }}>
          {description}
        </Typography>
        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
          <Typography variant="caption" sx={{ fontSize: '0.7rem', color: 'text.disabled', fontWeight: 600 }}>เปิดรายงาน</Typography>
          <ChevronRightIcon className="arrow-btn" sx={{ fontSize: 16, color: 'divider', transition: 'transform 0.2s' }} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default ReportCard;
