import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: '240px',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '240px',
    boxSizing: 'border-box',
  },
}));
