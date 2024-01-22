import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

function TypographyAtom(props: TypographyProps) {
  return <Typography { ...props } />;
}

export default TypographyAtom;