import React from 'react';
import ListItemAtom from '../atoms/ListItemAtom';
import ListItemIconAtom from '../atoms/ListItemIconAtom';
import ListItemTextAtom from '../atoms/ListItemTextAtom';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemButtonAtom from 'components/atoms/ListItemButtonAttom';

interface ListItemMoleculeProps {
  text: string;
  index: number;
}

function ListItemMolecule({ text, index }: ListItemMoleculeProps) {
  return (
    <ListItemAtom key={text} disablePadding>
      <ListItemButtonAtom>
        <ListItemIconAtom>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIconAtom>
        <ListItemTextAtom primary={text} />
      </ListItemButtonAtom>
    </ListItemAtom>
  );
}

export default ListItemMolecule;
