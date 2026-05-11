import React from 'react';
import { Box, Typography, Button, Breadcrumbs, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface PageHeaderProps {
  title: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
  actionLabel?: string;
  actionPanel?: React.ReactNode;
  onActionClick?: () => void;
}

const PageHeader = ({
  title,
  breadcrumbs,
  actionLabel,
  actionPanel,
  onActionClick,
}: PageHeaderProps) => {
  return (
    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
          {title}
        </Typography>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ '& .MuiBreadcrumbs-separator': { mx: 0.5 } }}
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return isLast ? (
              <Typography key={index} color="text.primary" variant="body2" sx={{ fontWeight: 500 }}>
                {crumb.label}
              </Typography>
            ) : (
              <Link
                key={index}
                underline="hover"
                color="primary"
                href={crumb.href || '#'}
                variant="body2"
                sx={{ fontWeight: 500 }}
              >
                {crumb.label}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>

      {actionPanel && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {actionPanel}
        </Box>
      )}

      {actionLabel && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onActionClick}
          sx={{
            py: 1,
            px: 2,
            boxShadow: '0 4px 10px rgba(55, 111, 255, 0.24)',
            '&:hover': {
              boxShadow: '0 6px 14px rgba(55, 111, 255, 0.32)',
            },
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default PageHeader;
