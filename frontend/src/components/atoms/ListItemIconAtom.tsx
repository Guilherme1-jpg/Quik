import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';

interface ListItemIconAtomProps {
  children: React.ReactNode;
}

const ListItemIconAtom: React.FC<ListItemIconAtomProps> = ({ children }) => {
  return <ListItemIcon>{children}</ListItemIcon>;
};

export default ListItemIconAtom;
