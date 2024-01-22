import React from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface DrawerHeaderProps {
  onClick: () => void;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ onClick }) => (
  <div>
    <IconButton onClick={onClick}>
      <ChevronLeftIcon />
    </IconButton>
  </div>
);

export default DrawerHeader;