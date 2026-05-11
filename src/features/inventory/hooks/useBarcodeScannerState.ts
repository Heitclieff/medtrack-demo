import { useState, useCallback, useRef } from 'react';
import { InventoryItem } from '../data/inventoryData';

export type ScanMode = 'stock-in' | 'stock-out';

export interface ScannedEntry {
  id: string;
  item: InventoryItem;
  quantity: number;
  scannedAt: Date;
}

interface UseBarcodeScannerStateOptions {
  inventoryData: InventoryItem[];
  open: boolean;
}

export function useBarcodeScannerState({ inventoryData, open }: UseBarcodeScannerStateOptions) {
  const [mode, setMode] = useState<ScanMode>('stock-in');
  const [scannedEntries, setScannedEntries] = useState<ScannedEntry[]>([]);
  const [lastScanResult, setLastScanResult] = useState<{ success: boolean; message: string } | null>(null);
  const entryIdRef = useRef(0);

  const lookupByBarcode = useCallback(
    (barcode: string): InventoryItem | undefined => {
      const normalizedBarcode = barcode.trim().toLowerCase();
      return inventoryData.find(
        (item) =>
          item.barcode.toLowerCase() === normalizedBarcode ||
          item.code.toLowerCase() === normalizedBarcode
      );
    },
    [inventoryData]
  );

  const addScannedItem = useCallback(
    (barcode: string): boolean => {
      const item = lookupByBarcode(barcode);
      if (!item) {
        setLastScanResult({ success: false, message: `ไม่พบเวชภัณฑ์สำหรับบาร์โค้ด "${barcode}"` });
        return false;
      }

      setScannedEntries((prev) => {
        const existing = prev.find((e) => e.item.id === item.id);
        if (existing) {
          return prev.map((e) =>
            e.item.id === item.id ? { ...e, quantity: e.quantity + 1 } : e
          );
        }
        entryIdRef.current += 1;
        return [
          ...prev,
          {
            id: `scan-${entryIdRef.current}`,
            item,
            quantity: 1,
            scannedAt: new Date(),
          },
        ];
      });

      setLastScanResult({ success: true, message: `เพิ่ม "${item.name}" สำเร็จ` });
      return true;
    },
    [lookupByBarcode]
  );

  const updateQuantity = useCallback((entryId: string, quantity: number) => {
    if (quantity < 1) return;
    setScannedEntries((prev) =>
      prev.map((e) => (e.id === entryId ? { ...e, quantity } : e))
    );
  }, []);

  const removeEntry = useCallback((entryId: string) => {
    setScannedEntries((prev) => prev.filter((e) => e.id !== entryId));
  }, []);

  const clearAll = useCallback(() => {
    setScannedEntries([]);
    setLastScanResult(null);
    entryIdRef.current = 0;
  }, []);

  const resetState = useCallback(() => {
    setMode('stock-in');
    clearAll();
  }, [clearAll]);

  const totalItems = scannedEntries.reduce((sum, e) => sum + e.quantity, 0);
  const totalEntries = scannedEntries.length;

  return {
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
  };
}
