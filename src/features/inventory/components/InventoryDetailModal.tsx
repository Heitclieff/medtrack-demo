'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { ModalShell } from '@components/ui';
import { SectionHeader } from '@components/ui';

// --- Interfaces ---

interface ImportHistory {
  id: string;
  transactionId: string;
  importQuantity: string;
  balanceQuantity: string;
  expiryDate: string;
  importDate: string;
  type: 'ซื้อ' | 'บริจาค' | 'อื่นๆ';
  importer: string;
  note: string;
  attachment?: string;
}

interface InventoryItemDetail {
  id: string;
  category: string;
  name: string;
  code: string;
  unit: string;
  balance: string;
  price: string;
  minStockPercent: string;
  maxStock: string;
  maxWardStock: string;
  barcode: string;
  expiryDate: string;
  expiryThresholdDays: number;
  note: string;
  importHistory?: ImportHistory[];
}

interface InventoryDetailModalProps {
  open: boolean;
  onClose: () => void;
  item: InventoryItemDetail | null;
  onPrintBarcode?: (item: any) => void;
}

// --- Sub-components ---

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`detail-tabpanel-${index}`}
      aria-labelledby={`detail-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const DetailRow = ({
  label,
  value,
  isImage = false,
  isBarcode = false,
  noDivider = false,
  onPrint,
}: {
  label: string;
  value: string | React.ReactNode;
  highlight?: boolean;
  isImage?: boolean;
  isBarcode?: boolean;
  noDivider?: boolean;
  onPrint?: () => void;
}) => (
  <Box sx={{
    display: 'flex',
    py: 2,
    px: 1.5,
    borderBottom: noDivider ? 'none' : '1px solid #E5E7EB',
    alignItems: (isImage || isBarcode) ? 'flex-start' : 'center',
    minHeight: '50px',
    gap: 1,
  }}>
    <Typography variant="body2" sx={{ width: '130px', color: 'text.secondary', fontWeight: 500, flexShrink: 0 }}>
      {label}
    </Typography>
    <Box sx={{ flexGrow: 1 }}>
      {isImage ? (
        <Box sx={{ width: 100, height: 100, bgcolor: '#F3F4F6', borderRadius: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #D1D5DB' }}>
          <Typography variant="caption" color="text.secondary">ไม่มีรูปภาพ</Typography>
        </Box>
      ) : isBarcode ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: 320, height: 100, bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 1.5, mb: 0.5 }}>
              <Box sx={{
                width: '100%', height: 80,
                backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px, #000 4px, #000 5px, transparent 5px, transparent 7px)',
                backgroundSize: '25px 100%',
              }} />
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 700, letterSpacing: 2 }}>
              {value || '-'}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={<PrintIcon />}
            onClick={onPrint}
            aria-label="พิมพ์บาร์โค้ด"
            sx={{ textTransform: 'none', borderRadius: 0.5 }}
          >
            พิมพ์
          </Button>
        </Box>
      ) : (
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
          {value || '-'}
        </Typography>
      )}
    </Box>
  </Box>
);

// --- Table cell shared sx ---
const headerCellSx = { fontWeight: 600, border: '1px solid #E0E0E0', fontSize: '0.75rem', py: 0.75 };
const bodyCellSx = { border: '1px solid #E0E0E0', fontSize: '0.75rem', py: 1 };

// --- Main Component ---

export default function InventoryDetailModal({ open, onClose, item, onPrintBarcode }: InventoryDetailModalProps) {
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleTabChange = useCallback((_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const history = item?.importHistory || [];
  const paginatedHistory = useMemo(
    () => history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [history, page, rowsPerPage]
  );

  if (!item) return null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="รายละเอียดเวชภัณฑ์และพัสดุ"
      maxWidth="md"
      contentSx={{ p: 0, minHeight: '500px', bgcolor: '#fff' }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#fff' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="รายละเอียดเวชภัณฑ์">
          <Tab label="ข้อมูลเวชภัณฑ์" sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.85rem', minHeight: '50px' }} />
          <Tab label="ประวัติการนำเข้า" sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.85rem', minHeight: '50px' }} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ maxWidth: '650px', mx: 'auto', px: 1, pb: 4 }}>
          <SectionHeader title="ข้อมูลเวชภัณฑ์พื้นฐาน" />
          <DetailRow label="ชื่อเวชภัณฑ์ / พัสดุ" value={item.name} highlight />
          <DetailRow label="หน่วยบรรจุ" value={item.unit} />
          <DetailRow label="SKU" value={item.code} />
          <DetailRow label="Barcode" value={item.barcode} isBarcode onPrint={() => onPrintBarcode?.(item)} />
          <DetailRow label="รูปภาพเวชภัณฑ์พัสดุ" value="" isImage noDivider />

          <SectionHeader title="สต็อกและราคา" />
          <DetailRow label="จำนวนคงคลังปัจจุบัน" value={`${item.balance} ${item.unit}`} />
          <DetailRow label="ราคาต่อหน่วย" value={`${item.price} บาท`} />
          <DetailRow label="ระดับการเตือน ขั้นต่ำ (%)" value={`${item.minStockPercent}%`} />
          <DetailRow label="จำนวนคงคลังสูงสุด" value={item.maxStock} />
          <DetailRow label="ค่าเริ่มต้น จำนวนคงคลังวอร์ดสูงสุด" value={item.maxWardStock} noDivider />

          <SectionHeader title="อื่นๆ" />
          <DetailRow label="หมายเหตุ" value={item.note || '-'} noDivider />
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mx: 'auto', px: 1, pb: 4 }}>
          <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 0.5 }}>
            <Table size="small" sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow sx={{ bgcolor: '#F3F4F6' }}>
                  <TableCell sx={headerCellSx}>รหัส</TableCell>
                  <TableCell sx={{ ...headerCellSx, width: '90px' }} align="center">จำนวนนำเข้า</TableCell>
                  <TableCell sx={{ ...headerCellSx, width: '90px' }} align="center">จำนวนคงเหลือ</TableCell>
                  <TableCell sx={headerCellSx}>วันหมดอายุ</TableCell>
                  <TableCell sx={headerCellSx}>วันที่/เวลานำเข้า</TableCell>
                  <TableCell sx={headerCellSx}>หมายเหตุ</TableCell>
                  <TableCell sx={headerCellSx}>ผู้นำเข้า</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedHistory.length > 0 ? (
                  paginatedHistory.map((h) => (
                    <TableRow key={h.id} hover>
                      <TableCell sx={bodyCellSx}>{h.transactionId}</TableCell>
                      <TableCell sx={{ ...bodyCellSx, width: '80px' }} align="center">{h.importQuantity}</TableCell>
                      <TableCell sx={{ ...bodyCellSx, width: '80px' }} align="center">{h.balanceQuantity}</TableCell>
                      <TableCell sx={bodyCellSx}>{h.expiryDate}</TableCell>
                      <TableCell sx={bodyCellSx}>{h.importDate}</TableCell>
                      <TableCell sx={bodyCellSx}>{h.note || '-'}</TableCell>
                      <TableCell sx={bodyCellSx}>{h.importer}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary', border: '1px solid #E0E0E0' }}>
                      ไม่มีประวัติการนำเข้า
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={history.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="แสดง:"
            sx={{ borderTop: 'none' }}
          />
        </Box>
      </TabPanel>
    </ModalShell>
  );
}
