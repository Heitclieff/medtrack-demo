'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, IconButton, Chip, CircularProgress, Button } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FlashOffIcon from '@mui/icons-material/FlashOff';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LockIcon from '@mui/icons-material/Lock';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import RefreshIcon from '@mui/icons-material/Refresh';

import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';
import { BarcodeFormat, DecodeHintType } from '@zxing/library';

const SCANNER_VIDEO_ID = 'barcode-camera-video';

type ErrorType = 'permission' | 'not-found' | 'generic';

interface ScanFeedback {
  success: boolean;
  message: string;
}

interface CameraBarcodeScannerProps {
  active: boolean;
  accentColor: string;
  onScan: (decodedText: string) => void;
  /** Real-time scan result to display as overlay on the camera */
  scanFeedback?: ScanFeedback | null;
}

export default function CameraBarcodeScanner({
  active,
  accentColor,
  onScan,
  scanFeedback,
}: CameraBarcodeScannerProps) {
  const controlsRef = useRef<IScannerControls | null>(null);
  const [status, setStatus] = useState<'idle' | 'starting' | 'scanning' | 'error'>('idle');
  const [errorType, setErrorType] = useState<ErrorType>('generic');
  const [rawErrorMessage, setRawErrorMessage] = useState('');
  const [retryKey, setRetryKey] = useState(0); // bump to force restart
  const [torchOn, setTorchOn] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);

  // Debounce scans (2 seconds cooldown for the EXACT same barcode)
  const lastScanRef = useRef<{ text: string; time: number }>({ text: '', time: 0 });

  const handleScanSuccess = useCallback(
    (decodedText: string) => {
      const now = Date.now();
      const last = lastScanRef.current;
      if (decodedText === last.text && now - last.time < 2000) return;
      lastScanRef.current = { text: decodedText, time: now };
      onScan(decodedText);
    },
    [onScan]
  );

  const safeStopScanner = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!active) {
      safeStopScanner();
      setStatus('idle');
      setTorchOn(false);
      setHasTorch(false);
      return;
    }

    let cancelled = false;

    const startScanner = async () => {
      setStatus('starting');
      setRawErrorMessage('');

      try {
        if (!navigator?.mediaDevices?.getUserMedia) {
          throw Object.assign(new Error('getUserMedia not supported'), { name: 'NotSupportedError' });
        }

        const videoElement = document.getElementById(SCANNER_VIDEO_ID) as HTMLVideoElement;
        if (!videoElement) throw new Error('Video element not found');

        // Configure ZXing for 1D barcodes
        const hints = new Map();
        const formats = [
          BarcodeFormat.EAN_13,
          BarcodeFormat.EAN_8,
          BarcodeFormat.CODE_128,
          BarcodeFormat.CODE_39,
          BarcodeFormat.UPC_A,
          BarcodeFormat.UPC_E,
        ];
        hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);
        // WARNING: TRY_HARDER destroys CPU and slows down scanning on mobile when using high res.
        // It's better to process a 1080p frame quickly without try_harder.
        
        const codeReader = new BrowserMultiFormatReader(hints);

        // 🔥 THE REAL FIX: Request HIGH DEFINITION (1080p) stream from the camera.
        // Browsers default to 480p, which makes thin 1D barcodes extremely pixelated and unreadable.
        const constraints: MediaStreamConstraints = {
          video: {
            facingMode: 'environment',
            width: { ideal: 1920, min: 1280 }, // Force crisp resolution
            height: { ideal: 1080, min: 720 }
          }
        };

        const controls = await codeReader.decodeFromConstraints(
          constraints,
          videoElement,
          (result, error, ctrls) => {
            if (result && !cancelled) {
              handleScanSuccess(result.getText());
            }
          }
        );

        if (cancelled) {
          controls.stop();
          return;
        }

        controlsRef.current = controls;
        setStatus('scanning');

        // Check for flashlight capability
        try {
          const stream = videoElement.srcObject as MediaStream;
          const track = stream.getVideoTracks()[0];
          const capabilities = track.getCapabilities?.();
          if (capabilities && 'torch' in capabilities) {
            setHasTorch(true);
          }
        } catch {
          // ignore
        }
        
      } catch (err: any) {
        if (cancelled) return;
        console.error('[CameraBarcodeScanner] Error:', err);
        setStatus('error');

        const errStr = String(err).toLowerCase();
        if (
          errStr.includes('notallowederror') || 
          errStr.includes('permission') || 
          errStr.includes('denied') || 
          err?.name === 'NotAllowedError'
        ) {
          setErrorType('permission');
        } else if (
          errStr.includes('notfounderror') || 
          errStr.includes('device') || 
          err?.name === 'NotFoundError'
        ) {
          setErrorType('not-found');
        } else {
          setErrorType('generic');
          setRawErrorMessage(err?.message || errStr);
        }
      }
    };

    const timer = setTimeout(startScanner, 200);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      safeStopScanner();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, retryKey, handleScanSuccess, safeStopScanner]);

  const toggleTorch = useCallback(async () => {
    try {
      const videoElement = document.getElementById(SCANNER_VIDEO_ID) as HTMLVideoElement;
      if (!videoElement) return;
      const stream = videoElement.srcObject as MediaStream;
      const track = stream.getVideoTracks()[0];
      const newTorchState = !torchOn;
      await track.applyConstraints({
         advanced: [{ torch: newTorchState } as any]
      });
      setTorchOn(newTorchState);
    } catch {
      // silent fail
    }
  }, [torchOn]);

  const handleRetry = useCallback(() => {
    safeStopScanner();
    setStatus('idle');
    setRetryKey(k => k + 1);
  }, [safeStopScanner]);

  // Vibrate on mobile when scan result changes
  const prevFeedbackRef = useRef<ScanFeedback | null | undefined>(undefined);
  useEffect(() => {
    if (!scanFeedback) return;
    if (scanFeedback === prevFeedbackRef.current) return;
    prevFeedbackRef.current = scanFeedback;
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(scanFeedback.success ? [80] : [60, 40, 60]);
    }
  }, [scanFeedback]);

  if (!active) return null;

  /* ─── Error UI helpers ───────────────────────────────────── */
  const ERROR_CONFIG: Record<ErrorType, {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    action?: React.ReactNode;
  }> = {
    permission: {
      icon: <LockIcon sx={{ fontSize: 48, color: '#f59e0b' }} />,
      title: 'ยังไม่ได้อนุญาตกล้อง',
      subtitle: 'เปิดการตั้งค่า Browser → ค้นหา localhost → เปลี่ยน Camera เป็น "Allow"',
      action: (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', mt: 0.5 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRetry}
            sx={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.4)',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            ลองอีกครั้ง
          </Button>
          <Typography variant="caption" sx={{ color: '#fbbf24', textAlign: 'center', px: 2 }}>
            💡 Chrome: คลิกไอคอนกุญแจ 🔒 ข้างซ้าย URL แล้วเปลี่ยน Camera เป็น Allow
          </Typography>
        </Box>
      ),
    },
    'not-found': {
      icon: <VideocamOffIcon sx={{ fontSize: 48, color: '#9ca3af' }} />,
      title: 'ไม่พบกล้องบนอุปกรณ์นี้',
      subtitle: 'อุปกรณ์นี้ไม่มีกล้อง หรือกล้องถูกปิดการใช้งาน',
      action: (
        <Button
          size="small"
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRetry}
          sx={{
            mt: 0.5,
            color: 'white',
            borderColor: 'rgba(255,255,255,0.4)',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
          }}
        >
          ลองอีกครั้ง
        </Button>
      ),
    },
    generic: {
      icon: <ErrorOutlineIcon sx={{ fontSize: 48, color: '#ef4444' }} />,
      title: 'เปิดกล้องไม่ได้',
      subtitle: rawErrorMessage || 'เกิดข้อผิดพลาด กรุณาลองอีกครั้ง',
      action: (
        <Button
          size="small"
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRetry}
          sx={{
            mt: 0.5,
            color: 'white',
            borderColor: 'rgba(255,255,255,0.4)',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
          }}
        >
          ลองอีกครั้ง
        </Button>
      ),
    },
  };

  const errCfg = ERROR_CONFIG[errorType];

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#000', height: 380 }}>

      {/* Video element for ZXing */}
      {status !== 'error' && (
        <video 
          id={SCANNER_VIDEO_ID} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      )}

      {/* Scan feedback toast — overlaid directly on camera, no scrolling needed */}
      {status === 'scanning' && scanFeedback && (
        <Box
          key={`${scanFeedback.success}-${scanFeedback.message}`}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2,
            py: 1.25,
            borderRadius: 2,
            bgcolor: scanFeedback.success
              ? 'rgba(0, 184, 148, 0.93)'
              : 'rgba(231, 76, 60, 0.93)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
            animation: 'feedbackSlideIn 0.2s ease',
            '@keyframes feedbackSlideIn': {
              from: { opacity: 0, transform: 'translateY(-10px) scale(0.97)' },
              to:   { opacity: 1, transform: 'translateY(0) scale(1)' },
            },
          }}
        >
          <Typography sx={{ fontSize: '1.3rem', lineHeight: 1, flexShrink: 0 }}>
            {scanFeedback.success ? '✅' : '❌'}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.4 }}
          >
            {scanFeedback.message}
          </Typography>
        </Box>
      )}

      {/* Viewfinder overlay — only while scanning */}
      {status === 'scanning' && (
        <Box
          sx={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            pointerEvents: 'none', zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Dark mask with "hole" in the center */}
          <Box
            sx={{
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              background: `
                linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)) top / 100% calc(50% - 72px) no-repeat,
                linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)) bottom / 100% calc(50% - 72px) no-repeat,
                linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)) left / calc(50% - 144px) 144px no-repeat,
                linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)) right / calc(50% - 144px) 144px no-repeat
              `,
            }}
          />

          {/* Viewfinder box (adjusted to be wider for 1D barcodes) */}
          <Box sx={{ position: 'relative', width: 288, height: 144, zIndex: 2 }}>
            {/* Corners */}
            {[
              { top: -4, left: -4, borderLeft: '4px solid white', borderTop: '4px solid white', borderRadius: '4px 0 0 0' },
              { top: -4, right: -4, borderRight: '4px solid white', borderTop: '4px solid white', borderRadius: '0 4px 0 0' },
              { bottom: -4, left: -4, borderLeft: '4px solid white', borderBottom: '4px solid white', borderRadius: '0 0 0 4px' },
              { bottom: -4, right: -4, borderRight: '4px solid white', borderBottom: '4px solid white', borderRadius: '0 0 4px 0' },
            ].map((sx, i) => (
              <Box key={i} sx={{ position: 'absolute', width: 28, height: 28, ...sx }} />
            ))}

            {/* Animated scan line */}
            <Box
              sx={{
                position: 'absolute', left: 8, right: 8, height: 2,
                bgcolor: '#fff',
                boxShadow: `0 0 10px #fff, 0 0 18px ${accentColor}`,
                opacity: 0.9, zIndex: 3,
                animation: 'scanLine 2.5s ease-in-out infinite',
                '@keyframes scanLine': {
                  '0%': { top: '8%' },
                  '50%': { top: '88%' },
                  '100%': { top: '8%' },
                },
              }}
            />
          </Box>
        </Box>
      )}

      {/* Loading overlay */}
      {status === 'starting' && (
        <Box
          sx={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.88)', zIndex: 10, gap: 2,
          }}
        >
          <CircularProgress size={40} sx={{ color: accentColor }} />
          <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
            กำลังเปิดกล้อง...
          </Typography>
        </Box>
      )}

      {/* Error overlay */}
      {status === 'error' && (
        <Box
          sx={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            bgcolor: 'rgba(0,0,0,0.88)', zIndex: 10, gap: 1.5, px: 3,
          }}
        >
          {errCfg.icon}
          <Typography variant="body1" sx={{ color: 'white', fontWeight: 700, textAlign: 'center' }}>
            {errCfg.title}
          </Typography>
          <Typography variant="caption" sx={{ color: '#9ca3af', textAlign: 'center', lineHeight: 1.6 }}>
            {errCfg.subtitle}
          </Typography>
          {errCfg.action}
        </Box>
      )}

      {/* Torch button */}
      {status === 'scanning' && hasTorch && (
        <Box sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', zIndex: 10 }}>
          <IconButton
            size="small"
            onClick={toggleTorch}
            sx={{
              bgcolor: 'rgba(255,255,255,0.15)',
              color: torchOn ? '#fbbf24' : 'white',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {torchOn ? <FlashOnIcon /> : <FlashOffIcon />}
          </IconButton>
        </Box>
      )}

      {/* Bottom hint badge */}
      {status === 'scanning' && (
        <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <Chip
            icon={<CameraAltIcon sx={{ fontSize: 15, color: 'white !important' }} />}
            label="เล็งบาร์โค้ดให้อยู่ในกรอบสีขาว"
            sx={{
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white', fontWeight: 600, fontSize: '0.78rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              px: 0.5,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
