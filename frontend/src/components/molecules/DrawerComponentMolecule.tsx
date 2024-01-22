import { Drawer } from '@mui/material';
import { StyledDrawer } from 'components/themes/styles/DrawerStyle.styles';
import React from 'react';

interface DrawerComponentProps {
  open: boolean;
  children: React.ReactNode;
}

const DrawerComponentMolecule: React.FC<DrawerComponentProps> = ({ open, children }) => {
  return <StyledDrawer variant="persistent" anchor="left" open={open}>{children}</StyledDrawer>;
};

export default DrawerComponentMolecule;
