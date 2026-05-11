'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function MapCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Real-Time
          </Typography>
          <IconButton size="small">
            <MoreVertIcon sx={{ color: '#9CA3AF' }} />
          </IconButton>
        </Box>

        <Box sx={{ position: 'relative', flex: 1, backgroundColor: '#F0F4FC', borderRadius: 2, overflow: 'hidden', minHeight: 300 }}>
          {/* Zoom controls */}
          <Box sx={{ position: 'absolute', left: 16, top: 16, display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: 1, boxShadow: 1, zIndex: 2 }}>
            <IconButton size="small" sx={{ borderRadius: 0, borderBottom: '1px solid #E5E7EB' }}>
              <AddIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" sx={{ borderRadius: 0 }}>
              <RemoveIcon fontSize="small" />
            </IconButton>
          </Box>
          
          {/* Faux map representation using standard SVG shapes as a placeholder connecting dots */}
          <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.6 }}>
            {/* Extremely simplified faux map paths for visual effect */}
            <path d="M 150 150 Q 200 100 250 150 T 400 100 T 550 150 T 700 80" stroke="#D1D5DB" strokeWidth="2" fill="none" />
            <path d="M 100 250 Q 150 200 200 280 T 350 220 T 500 280 T 650 200" stroke="#D1D5DB" strokeWidth="2" fill="none" />
            {/* Dots representing active users */}
            {[ 
              { x: 220, y: 140 }, { x: 250, y: 160 }, { x: 180, y: 240 },
              { x: 380, y: 120 }, { x: 420, y: 130 }, { x: 400, y: 180 },
              { x: 500, y: 140 }, { x: 550, y: 160 }, { x: 480, y: 260 },
              { x: 650, y: 120 }, { x: 700, y: 150 }
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r={8} fill="rgba(59, 130, 246, 0.3)" />
                <circle cx={pt.x} cy={pt.y} r={4} fill="#3B82F6" />
              </g>
            ))}
          </svg>
        </Box>
      </CardContent>
    </Card>
  );
}
