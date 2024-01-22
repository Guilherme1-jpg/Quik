import React from 'react';
import { Typography as MuiTypography } from '@mui/material';

const Typography: React.FC<{ variant: string }> = ({ variant, children }) => {
  return <MuiTypography variant={variant}>{children}</MuiTypography>;
};

export default Typography;
