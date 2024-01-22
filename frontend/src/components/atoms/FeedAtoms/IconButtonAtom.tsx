import React from 'react';
import { IconButton as MuiIconButton } from '@mui/material';

const IconButtonAttomFeed: React.FC<{ onClick: () => void }> = ({ onClick, children }) => {
  return <MuiIconButton edge="end" onClick={onClick}>{children}</MuiIconButton>;
};

export default IconButtonAttomFeed;
