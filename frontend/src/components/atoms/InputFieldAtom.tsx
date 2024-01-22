import React from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
}

const InputFieldAtom: React.FC<InputFieldProps> = ({ label, value, onChange }) => (
  <TextField label={label} value={value} onChange={(e) => onChange(e.target.value)} />
);

export default InputFieldAtom;
