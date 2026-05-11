'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const handleHover = (hovered: boolean) => setIsHovered(hovered);

  // Expanded if (not toggled to collapse) OR (toggled to collapse but hovered)
  const isExpanded = !isCollapsed || isHovered;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F5F7FA' }}>
      <Sidebar 
        isCollapsed={isCollapsed} 
        isHovered={isHovered} 
        onHover={handleHover} 
        isExpanded={isExpanded}
      />
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          flexGrow: 1, 
          minWidth: 0,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          // No need for margin if using flex, but we might want fixed sidebar in the future
        }}
      >
        <Header onToggleSidebar={toggleSidebar} />
        <Box component="main" sx={{ p: { xs: 2, md: 2 }, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
