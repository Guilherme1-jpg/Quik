import React from 'react';
import { DrawerHeader } from 'components/themes/styles/DrawerHeader.styles';
import IconButtonAttom from 'components/atoms/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface DrawerHeaderAtomProps {
  handleDrawerClose: () => void;
}

function DrawerHeaderMolecule ({handleDrawerClose}: DrawerHeaderAtomProps) {
  return(
    <DrawerHeader>
      <IconButtonAttom onClick={handleDrawerClose}>
        <ChevronLeftIcon/>
      </IconButtonAttom>
    </DrawerHeader>
  ) 
}

export default DrawerHeaderMolecule;