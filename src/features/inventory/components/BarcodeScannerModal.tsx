'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  Divider,
  InputAdornment,
  Fade,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CallMadeIcon from '@mui/icons-material/CallMade';
import InventoryIcon from '@mui/icons-material/Inventory';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import KeyboardIcon from '@mui/icons-material/Keyboard';

import { ModalShell } from '@components/ui';
import { InventoryItem } from '../data/inventoryData';
import CameraBarcodeScanner from './CameraBarcodeScanner';
import {
  useBarcodeScannerState,
  ScanMode,
  ScannedEntry,
} from '../hooks/useBarcodeScannerState';

/* ─── Config ──────────────────────────────────────────────── */

const MODE_CONFIG: Record<ScanMode, {
  label: string;
  headerColor: string;
  accentColor: string;
  accentHover: string;
  icon: React.ReactNode;
  confirmLabel: string;
}> = {
  'stock-in': {
    label: 'นำเข้าสต็อก',
    headerColor: '#3F6AD8',
    accentColor: '#3F6AD8',
    accentHover: '#3155b1',
    icon: <CallReceivedIcon fontSize="small" />,
    confirmLabel: 'ยืนยันการนำเข้า',
  },
  'stock-out': {
    label: 'เบิกจ่าย / ตัดสต็อก',
    headerColor: '#e67e22',
    accentColor: '#e67e22',
    accentHover: '#d35400',
    icon: <CallMadeIcon fontSize="small" />,
    confirmLabel: 'ยืนยันการเบิกจ่าย',
  },
};

type InputMethod = 'camera' | 'manual';

/* ─── Props ───────────────────────────────────────────────── */

interface BarcodeScannerModalProps {
  open: boolean;
  onClose: () => void;
  inventoryData: InventoryItem[];
  onConfirm: (mode: ScanMode, entries: ScannedEntry[]) => void;
}

/* ─── Component ───────────────────────────────────────────── */

export default function BarcodeScannerModal({
  open,
  onClose,
  inventoryData,
  onConfirm,
}: BarcodeScannerModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    mode,
    setMode,
    scannedEntries,
    lastScanResult,
    setLastScanResult,
    addScannedItem,
    updateQuantity,
    removeEntry,
    clearAll,
    resetState,
    totalItems,
    totalEntries,
  } = useBarcodeScannerState({ inventoryData, open });

  const [barcodeInput, setBarcodeInput] = useState('');
  const [inputMethod, setInputMethod] = useState<InputMethod>('camera');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens or after actions (only in manual mode)
  useEffect(() => {
    if (open && inputMethod === 'manual') {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
    if (!open) {
      resetState();
      setBarcodeInput('');
      setInputMethod('camera');
    }
  }, [open, resetState, inputMethod]);

  // Auto-clear feedback message
  useEffect(() => {
    if (!lastScanResult) return;
    const timer = setTimeout(() => setLastScanResult(null), 3000);
    return () => clearTimeout(timer);
  }, [lastScanResult, setLastScanResult]);

  // Handle barcode from camera scan
  const handleCameraScan = useCallback(
    (decodedText: string) => {
      addScannedItem(decodedText);
    },
    [addScannedItem]
  );

  const handleScanSubmit = useCallback(() => {
    const trimmed = barcodeInput.trim();
    if (!trimmed) return;
    addScannedItem(trimmed);
    setBarcodeInput('');
    inputRef.current?.focus();
  }, [barcodeInput, addScannedItem]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleScanSubmit();
      }
    },
    [handleScanSubmit]
  );

  const handleConfirm = () => {
    if (scannedEntries.length === 0) return;
    onConfirm(mode, scannedEntries);
    onClose();
  };

  const handleModeSwitch = (newMode: ScanMode) => {
    if (newMode === mode) return;
    clearAll();
    setMode(newMode);
    setBarcodeInput('');
    if (inputMethod === 'manual') {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const config = MODE_CONFIG[mode];

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="สแกนบาร์โค้ด"
      maxWidth="md"
      fullScreen={isMobile}
      headerColor={config.headerColor}
      contentSx={{ p: 0, overflow: 'hidden' }}
      actions={
        <>
          <Button
            onClick={onClose}
            variant="text"
            sx={{ textTransform: 'none', color: 'text.secondary', mr: 1 }}
          >
            ยกเลิก
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={scannedEntries.length === 0}
            startIcon={<CheckCircleIcon />}
            sx={{
              bgcolor: config.accentColor,
              '&:hover': { bgcolor: config.accentHover },
              textTransform: 'none',
              px: 4,
              fontWeight: 700,
              boxShadow: 'none',
              '&.Mui-disabled': { bgcolor: '#d1d5db', color: '#9ca3af' },
            }}
          >
            {config.confirmLabel} {totalItems > 0 && `(${totalItems})`}
          </Button>
        </>
      }
    >
      {/* ─── Mode Toggle (Stock-In / Stock-Out) ─────────────── */}
      <Box
        sx={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid #e5e7eb',
          bgcolor: '#f9fafb',
        }}
      >
        {(Object.keys(MODE_CONFIG) as ScanMode[]).map((modeKey) => {
          const cfg = MODE_CONFIG[modeKey];
          const isActive = mode === modeKey;
          return (
            <Box
              key={modeKey}
              onClick={() => handleModeSwitch(modeKey)}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                py: 1.5,
                px: 2,
                cursor: 'pointer',
                borderBottom: isActive ? `3px solid ${cfg.accentColor}` : '3px solid transparent',
                bgcolor: isActive ? 'white' : 'transparent',
                color: isActive ? cfg.accentColor : '#6b7280',
                fontWeight: isActive ? 700 : 500,
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: isActive ? 'white' : '#f3f4f6',
                  color: cfg.accentColor,
                },
                userSelect: 'none',
              }}
            >
              {cfg.icon}
              <Typography variant="body2" sx={{ fontWeight: 'inherit', color: 'inherit' }}>
                {cfg.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* ─── Content ──────────────────────────────────────────── */}
      <Box sx={{ p: 3 }}>
        {/* ─── Input Method Toggle (Camera / Manual) ──────── */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mb: 2,
            p: 0.5,
            bgcolor: '#f3f4f6',
            borderRadius: 2,
          }}
        >
          {[
            { key: 'camera' as InputMethod, label: 'สแกนด้วยกล้อง', icon: <CameraAltIcon sx={{ fontSize: 18 }} /> },
            { key: 'manual' as InputMethod, label: 'พิมพ์รหัส', icon: <KeyboardIcon sx={{ fontSize: 18 }} /> },
          ].map((tab) => (
            <Box
              key={tab.key}
              onClick={() => setInputMethod(tab.key)}
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.75,
                py: 1,
                borderRadius: 1.5,
                cursor: 'pointer',
                bgcolor: inputMethod === tab.key ? 'white' : 'transparent',
                color: inputMethod === tab.key ? config.accentColor : '#6b7280',
                fontWeight: inputMethod === tab.key ? 700 : 500,
                boxShadow: inputMethod === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: config.accentColor,
                },
                userSelect: 'none',
              }}
            >
              {tab.icon}
              <Typography variant="body2" sx={{ fontWeight: 'inherit', color: 'inherit', fontSize: '0.825rem' }}>
                {tab.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* ─── Camera Scanner ─────────────────────────────── */}
        {inputMethod === 'camera' && (
          <Box sx={{ mx: -3, mt: -1, mb: 2 }}>
            <CameraBarcodeScanner
              active={open && inputMethod === 'camera'}
              accentColor={config.accentColor}
              onScan={handleCameraScan}
              scanFeedback={lastScanResult}
            />
          </Box>
        )}

        {/* ─── Manual Input ───────────────────────────────── */}
        {inputMethod === 'manual' && (
          <Box
            sx={{
              border: `2px dashed ${config.accentColor}40`,
              borderRadius: 2,
              bgcolor: `${config.accentColor}08`,
              p: 3,
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <QrCodeScannerIcon sx={{ color: config.accentColor, fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#374151' }}>
                กรอกรหัสบาร์โค้ด
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                inputRef={inputRef}
                fullWidth
                size="small"
                placeholder="กรอกรหัสบาร์โค้ด แล้วกด Enter..."
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <QrCodeScannerIcon sx={{ color: '#9ca3af', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: barcodeInput && (
                    <InputAdornment position="end">
                      <Chip
                        label="Enter ↵"
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem', height: 22, color: '#9ca3af', borderColor: '#d1d5db' }}
                      />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d1d5db',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: config.accentColor,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: config.accentColor,
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleScanSubmit}
                disabled={!barcodeInput.trim()}
                sx={{
                  minWidth: 80,
                  bgcolor: config.accentColor,
                  '&:hover': { bgcolor: config.accentHover },
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&.Mui-disabled': { bgcolor: '#e5e7eb', color: '#9ca3af' },
                }}
              >
                <KeyboardReturnIcon sx={{ mr: 0.5 }} />
                เพิ่ม
              </Button>
            </Box>

            <Typography variant="caption" sx={{ color: '#9ca3af', mt: 1, display: 'block' }}>
              * ใช้เครื่องสแกนบาร์โค้ด หรือพิมพ์รหัสเวชภัณฑ์ เช่น INV45612578, INCA001
            </Typography>
          </Box>
        )}

        {/* Feedback Alert */}
        <Fade in={!!lastScanResult} timeout={300}>
          <Box sx={{ mb: 2 }}>
            {lastScanResult && (
              <Alert
                severity={lastScanResult.success ? 'success' : 'error'}
                variant="filled"
                sx={{
                  borderRadius: 1.5,
                  py: 0,
                  '& .MuiAlert-message': { fontWeight: 600, fontSize: '0.825rem' },
                  bgcolor: lastScanResult.success ? '#00b894' : '#e74c3c',
                }}
              >
                {lastScanResult.message}
              </Alert>
            )}
          </Box>
        </Fade>

        {/* ─── Scanned Items List ─────────────────────────── */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InventoryIcon sx={{ color: config.accentColor, fontSize: 18 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#374151' }}>
              รายการที่สแกน
            </Typography>
            {totalEntries > 0 && (
              <Chip
                label={`${totalEntries} รายการ / ${totalItems} ชิ้น`}
                size="small"
                sx={{
                  bgcolor: `${config.accentColor}15`,
                  color: config.accentColor,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: 24,
                }}
              />
            )}
          </Box>
          {totalEntries > 0 && (
            <Button
              size="small"
              startIcon={<ClearAllIcon />}
              onClick={clearAll}
              sx={{
                textTransform: 'none',
                color: '#9ca3af',
                fontSize: '0.8rem',
                '&:hover': { color: '#ef4444', bgcolor: '#fef2f2' },
              }}
            >
              ล้างทั้งหมด
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 1.5 }} />

        {/* Items List */}
        <Box
          sx={{
            maxHeight: inputMethod === 'camera' ? 200 : 280,
            overflowY: 'auto',
            '&::-webkit-scrollbar': { width: 6 },
            '&::-webkit-scrollbar-thumb': { bgcolor: '#d1d5db', borderRadius: 3 },
          }}
        >
          {scannedEntries.length === 0 ? (
            <Box
              sx={{
                py: inputMethod === 'camera' ? 3 : 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#9ca3af',
              }}
            >
              <QrCodeScannerIcon sx={{ fontSize: 40, mb: 1, opacity: 0.4 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                ยังไม่มีรายการที่สแกน
              </Typography>
              <Typography variant="caption">
                {inputMethod === 'camera'
                  ? 'เล็งกล้องไปที่บาร์โค้ดเพื่อสแกนอัตโนมัติ'
                  : 'สแกนบาร์โค้ดหรือพิมพ์รหัสเวชภัณฑ์เพื่อเริ่มต้น'}
              </Typography>
            </Box>
          ) : (
            scannedEntries.map((entry, idx) => (
              <ScannedItemRow
                key={entry.id}
                entry={entry}
                index={idx}
                accentColor={config.accentColor}
                onUpdateQuantity={updateQuantity}
                onRemove={removeEntry}
              />
            ))
          )}
        </Box>
      </Box>
    </ModalShell>
  );
}

/* ─── Scanned Item Row (Sub-component) ────────────────────── */

interface ScannedItemRowProps {
  entry: ScannedEntry;
  index: number;
  accentColor: string;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

const ScannedItemRow = React.memo(function ScannedItemRow({
  entry,
  index,
  accentColor,
  onUpdateQuantity,
  onRemove,
}: ScannedItemRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 1.5,
        px: 1.5,
        borderRadius: 1.5,
        mb: 0.5,
        bgcolor: index % 2 === 0 ? '#fafafa' : 'transparent',
        transition: 'background-color 0.15s ease',
        '&:hover': { bgcolor: '#f3f4f6' },
      }}
    >
      {/* Index */}
      <Typography
        variant="caption"
        sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          bgcolor: `${accentColor}15`,
          color: accentColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '0.7rem',
          flexShrink: 0,
        }}
      >
        {index + 1}
      </Typography>

      {/* Item Info */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: '#111827', lineHeight: 1.3 }}
          noWrap
        >
          {entry.item.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.25, flexWrap: 'wrap' }}>
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            {entry.item.code}
          </Typography>
          <Typography variant="caption" sx={{ color: '#d1d5db' }}>|</Typography>
          <Typography variant="caption" sx={{ color: '#6b7280' }}>
            คงเหลือ: {entry.item.balance} {entry.item.unit}
          </Typography>
        </Box>
      </Box>

      {/* Quantity Controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          bgcolor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: 1,
          px: 0.5,
        }}
      >
        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(entry.id, entry.quantity - 1)}
          disabled={entry.quantity <= 1}
          sx={{ color: '#9ca3af', '&:hover': { color: '#ef4444' }, p: 0.5 }}
        >
          <RemoveCircleOutlineIcon sx={{ fontSize: 18 }} />
        </IconButton>

        <TextField
          size="small"
          value={entry.quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val) && val >= 1) onUpdateQuantity(entry.id, val);
          }}
          inputProps={{
            min: 1,
            style: {
              textAlign: 'center',
              width: 40,
              padding: '4px 0',
              fontWeight: 700,
              fontSize: '0.875rem',
            },
          }}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          }}
        />

        <IconButton
          size="small"
          onClick={() => onUpdateQuantity(entry.id, entry.quantity + 1)}
          sx={{ color: '#9ca3af', '&:hover': { color: accentColor }, p: 0.5 }}
        >
          <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Unit */}
      <Typography variant="caption" sx={{ color: '#6b7280', fontWeight: 500, minWidth: 30 }}>
        {entry.item.unit}
      </Typography>

      {/* Delete */}
      <IconButton
        size="small"
        onClick={() => onRemove(entry.id)}
        sx={{
          color: '#d1d5db',
          '&:hover': { color: '#ef4444', bgcolor: '#fef2f2' },
          p: 0.5,
        }}
      >
        <DeleteOutlineIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  );
});
