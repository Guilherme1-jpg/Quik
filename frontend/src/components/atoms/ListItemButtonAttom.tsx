import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

function ListItemButtonAtom(props: ButtonProps) {
  return <Button { ...props } />;
}

export default ListItemButtonAtom;
