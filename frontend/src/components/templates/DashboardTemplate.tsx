import CollapsibleTable from 'components/organisms/CollapsibleTable';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import useTheme from '@mui/material/styles/useTheme';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DrawerHeaderMolecule from 'components/molecules/DrawerHeaderMolecule';
import DrawerContent from './DrawerContent';
import { Main } from 'components/themes/styles/Dashboard.styles';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DrawerHeader from 'components/atoms/DrawerHeader';
import PostFormMolecule from 'components/organisms/ContentFormOrganism/ContentForm';
import axios from 'axios';

const drawerWidth = 240;

interface DashboardTemplateProps {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  rows: Array<{
    nome: string;
    endereco: string;
    email: string;
    statusEntrega: string;
    editar: string;
  }>;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ open, handleDrawerOpen, handleDrawerClose, rows }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            QuikDev
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader onClick={handleDrawerClose} />
        <DrawerContent />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
};

export default DashboardTemplate;