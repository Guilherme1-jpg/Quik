import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface SelectFieldAtomProps {
  label: string;
  value: any;
  options: { label: string; value: any }[];
  onChange: (value: any) => void;
}

const SelectFieldAtom: React.FC<SelectFieldAtomProps> = ({ label, value, options, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectFieldAtom;
