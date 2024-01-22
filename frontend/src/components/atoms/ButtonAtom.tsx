import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

function ButtonAtom(props: ButtonProps) {
  return <Button { ...props } />;
}

export default ButtonAtom;
