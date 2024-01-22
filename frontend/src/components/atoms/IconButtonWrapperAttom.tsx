import React from 'react';
import IconButton from '@mui/material/IconButton';

interface IconButtonWrapperProps {
  onClick: () => void;
  children: React.ReactElement;
}

const IconButtonWrapper = ({ onClick, children }: IconButtonWrapperProps) => (
  <IconButton aria-label="expand row" size="small" onClick={onClick}>
    {children}
  </IconButton>
);

export default IconButtonWrapper;
