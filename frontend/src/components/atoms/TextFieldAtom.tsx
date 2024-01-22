import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

function TextFieldAtom(props: TextFieldProps) {
  return <TextField { ...props } />;
}

export default TextFieldAtom;