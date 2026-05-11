import { Paper, Box, Typography, TextField, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder';

interface CategorySidebarProps {
  categories: string[];
  activeCategory: string | null;
  onSelect: (cat: string | null) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
}

const CategorySidebar = ({ 
  categories, 
  activeCategory, 
  onSelect,
  searchTerm,
  onSearchChange
}: CategorySidebarProps) => (
  <Paper elevation={0} sx={{ border: '1px solid #E5E7EB', borderRadius: 1.5, overflow: 'hidden', height: 'fit-content', position: 'sticky', top: 20 }}>
    <Box sx={{ p: 2, bgcolor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
      <Typography variant="caption" sx={{ fontWeight: 800, color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', mb: 1.5 }}>
        ค้นหารายงาน
      </Typography>
      <TextField
        fullWidth
        placeholder="ชื่อรายงาน..."
        size="small"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ 
          '& .MuiInputBase-root': { bgcolor: 'white', fontSize: '0.85rem' }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary', fontSize: 16 }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
    <Box sx={{ p: 2, pb: 1 }}>
      <Typography variant="caption" sx={{ fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        หมวดหมู่
      </Typography>
    </Box>
    <List sx={{ p: 0, pb: 1 }}>
      <ListItem disablePadding>
        <ListItemButton 
          selected={activeCategory === null} 
          onClick={() => onSelect(null)}
          sx={{ py: 1, px: 2, '&.Mui-selected': { bgcolor: 'rgba(63, 106, 216, 0.08)', color: '#3F6AD8', borderLeft: '4px solid #3F6AD8' } }}
        >
          <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}><FolderIcon sx={{ fontSize: 16 }} /></ListItemIcon>
          <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>ทั้งหมด</Typography>} />
        </ListItemButton>
      </ListItem>
      {categories.map((cat) => (
        <ListItem key={cat} disablePadding>
          <ListItemButton 
            selected={activeCategory === cat} 
            onClick={() => onSelect(cat)}
            sx={{ py: 1, px: 2, '&.Mui-selected': { bgcolor: 'rgba(63, 106, 216, 0.08)', color: '#3F6AD8', borderLeft: '4px solid #3F6AD8' } }}
          >
            <ListItemIcon sx={{ minWidth: 28, color: 'inherit' }}><FolderIcon sx={{ fontSize: 16 }} /></ListItemIcon>
            <ListItemText primary={<Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>{cat}</Typography>} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Paper>
);

export default CategorySidebar;
