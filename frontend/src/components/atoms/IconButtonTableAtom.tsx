import React from 'react';
import IconButton from '@mui/material/IconButton';

interface ButtonIconProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const ButtonIconTableAtom: React.FC<ButtonIconProps> = ({ icon, onClick }) => (
  <IconButton onClick={onClick}>
    {icon}
  </IconButton>
);

export default ButtonIconTableAtom;